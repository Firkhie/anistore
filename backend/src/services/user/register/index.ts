import { parseOneAddress } from "email-addresses";
import { database, schema } from "../../../zapatos"
import { pool } from "../../../database/pool";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import Otp from "../../otp";
import { RegisterUserParams } from "./types";

export default class Register {
  private user: RegisterUserParams
  constructor(params: RegisterUserParams) {
    this.user = params;
  }
  async execute() {
    const { email } = this.user;
    await this.validate();
    const data = await this.insertUser();
    await new Otp({ email }).generate({ minute: 5, subject: "Anistore Email Activation", type: "email_activation" });
    return data;
  }
  //validate
  private async validate() {
    await this.checkRegisterInput();
    await this.checkEmailFormat();
    await this.checkPassword();
    await this.checkExistingEmail();
  }
  private async checkRegisterInput() {
    const { name, email, password, password_confirmation } = this.user; 
    if (!name || !email || !password || !password_confirmation) {
      throw new Error("Enter all the registration field");
    }
  }
  private checkEmailFormat() {
    const { email } = this.user
    const isValid = parseOneAddress({
      input: email,
      rfc6532: false,
      simple: true
    });
    if (!isValid) {
      throw new Error("Invalid email format");
    }
  }
  private checkPassword() {
    const { password, password_confirmation } = this.user;
    if (password !== password_confirmation) {
      throw new Error("Invalid password confirmation")
    }
  }
  private async checkExistingEmail() {
    const { email } = this.user;
    const data = await database.selectOne("user", { email }).run(pool);
    if (data) {
      throw new Error("Email already taken by other user")
    }
  }
  //insert
  private async insertUser() {
    const { name, email, password } = this.user;
    const pass = await bcrypt.hash(password, 5);
    const payload: schema.user.Insertable = {
      name,
      email,
      password: pass,
      role: "customer",
      status: "pending"
    }
    const data = await database.insert("user", payload, { returning: ["id"] }).run(pool);
    await database.insert("user_detail", { user_id: data.id }).run(pool);
    return data;
  }
}