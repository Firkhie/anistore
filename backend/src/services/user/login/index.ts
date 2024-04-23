import { pool } from "../../../database/pool";
import { database, schema } from "../../../zapatos";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { GenerateJwtTokenParams, UserLoginParams } from "./types";

export default class Login {
  private email?: string;
  private password?: string;
  constructor(params: UserLoginParams) {
    this.email = params.email;
    this.password = params.password;
  }
  async execute() {
    const data = await this.checkUser();
    await this.updateLastLogin();
    const token = await this.generateJwtToken({ name: data.name, role: data.role, user_id: data.id });
    return token;
  }
  private async checkUser() {
    if (!this.email || !this.password) {
      throw new Error("Enter your email and password");
    }
    const data = await database.selectOne("user", { email: this.email }).run(pool);
    if (!data) {
      throw new Error("Incorrect email or password");
    }
    if (data.status !== "active") {
      throw new Error("Activate your account first");
    }
    const check = await bcrypt.compare(this.password, data.password);
    if (!check) {
      throw new Error("Incorrect email or password");
    }
    return data;
  }
  private async updateLastLogin() {
    const payload: schema.user.Updatable = {
      updated_at: new Date(),
      last_login: new Date()
    }
    await database.update("user", payload, { email: this.email }).run(pool);
  }
  private async generateJwtToken(params: GenerateJwtTokenParams) {
    const { name, role, user_id } = params;
    const token = jwt.sign(
      { 
        user_id,
        email: this.email,
        name, 
        role 
      },
      process.env.JWT_PRIVATE_KEY!,
      { 
        algorithm: "HS256",
        expiresIn: process.env.JWT_EXPIRY_DAYS
      }
    );
    return token;
  }
}