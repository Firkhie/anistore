import { pool } from "../../database/pool";
import { database, schema } from "../../zapatos";
import { PatchUserParams, UserParams } from "./types";

export default class User {
  private id: string;
  constructor(params: UserParams) {
    this.id = params.id;
  }
  async getDetail() {
    const data = await database.sql`
    SELECT
      u.name,
      u.email,
      u.phone_number,
      u.role,
      ud.profile_picture,
      ud.birth_date,
      ud.gender,
      ud.address_line_1,
      ud.address_line_2,
      ud.city,
      ud.state,
      ud.country,
      ud.postal_code
    FROM "user" u
    LEFT JOIN user_detail ud ON ud.user_id = u.id
    WHERE u.id = ${database.param(this.id)};
    `.run(pool);
    return data[0];
  }
  // async patchPict(params: Express.Multer.File) {
  //   const { originalname } = params;

  // }
  async patch(params: PatchUserParams) {
    const { phone_number, birth_date, gender, address_line_1, address_line_2, city, state, country, postal_code } = params;
    let userPayload: schema.user.Updatable = {
      updated_at: new Date()
    }
    if (phone_number) userPayload.phone_number = phone_number;
    let userDetailPayload: schema.user_detail.Updatable = {
      updated_at: new Date()
    }
    if (birth_date) userDetailPayload.birth_date = birth_date;
    if (gender) userDetailPayload.gender = gender;
    if (address_line_1) userDetailPayload.address_line_1 = address_line_1;
    if (address_line_2) userDetailPayload.address_line_2 = address_line_2;
    if (city) userDetailPayload.city = city;
    if (state) userDetailPayload.state = state;
    if (country) userDetailPayload.country = country;
    if (postal_code) userDetailPayload.postal_code = postal_code;
    const data = await database.update("user", userPayload, { id: this.id }).run(pool);
    await database.update("user_detail", userDetailPayload, { user_id: this.id }).run(pool);
    if (!data) {
      throw new Error(`User with id ${this.id} is not found`);
    }
    return { id: data[0].id };
  }
  async delete() {
    const data = await database.update("user", { status: "inactive" }, { id: this.id }).run(pool);
    if (!data) {
      throw new Error(`User with id ${this.id} is not found`);
    }
    return this.id;
  }
}