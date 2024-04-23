import otpGenerator from "otp-generator";
import { database, schema } from "../../zapatos";
import { pool } from "../../database/pool";
import nodemailer from "nodemailer";
import { GenerateOtpParams, GenerateParams, OtpParams, SendOtpParams, VerifyParams } from "./types";

export default class Otp {
  private email: string;
  constructor(params: OtpParams) {
    this.email = params.email;
  }
  //generate otp
  async generate(params: GenerateParams) {
    const { minute, subject, type } = params;
    if (!minute || !subject || !type || !this.email) {
      throw new Error("Bad request");
    }
    const { data, otp } = await this.generateOtp({ minute, type });
    await this.sendOtp({ otp, subject });
    return data;
  }
  private async generateOtp(params: GenerateOtpParams) {
    const { minute, type } = params;
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    const payload: schema.otp.Insertable = {
      code: otp,
      email: this.email,
      type,
      expired_time: new Date(Date.now() + Number(minute) * 60 * 1000)
    }
    const data = await database.insert("otp", payload, { returning: ["id"] }).run(pool);
    return { otp, data };
  }
  private async sendOtp(params: SendOtpParams) {
    const { otp, subject } = params;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
      }
    });
    
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: this.email,
      subject,
      text: `OTP Code: ${otp}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
  //verify otp
  async verify(params: VerifyParams) {
    const { code, type } = params;
    const otp = await database.selectOne("otp", { email: this.email, code, type }, { order: { by: "created_at", direction: "DESC" } }).run(pool);
    if (!otp || !code || !type || !this.email) {
      throw new Error("Bad request");
    }
    const expiredTime = new Date(otp.expired_time!);
    if (expiredTime <= new Date()) {
      throw new Error("Your code is already expired");
    }
    switch (type) {
      case "email_activation":
        return await this.updateUserActive();
      case "forgot_password":
        return "";
    }
  }
  private async updateUserActive() {
    const payload: schema.user.Updatable = {
      status: "active",
      updated_at: new Date()
    }
    const data = await database.update("user", payload, { email: this.email }, { returning: ["id"] }).run(pool);
    return data[0];
  }
}