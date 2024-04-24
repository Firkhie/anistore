import { pool } from "../../database/pool";
import { database, schema } from "../../zapatos";
import { CreateReviewParams, ReviewParams } from "./types";

export default class Review {
  private item_id: string;
  constructor(params: ReviewParams) {
    this.item_id = params.item_id
  }
  async getAll() {
    const items = await database.sql`
    SELECT
      r.user_review,
      r.user_rating,
      u.name
    FROM review r
    LEFT JOIN user u ON u.id = r.user_id
    WHERE r.item_id = ${database.param(this.item_id)};
    `.run(pool);
    return items;
  }
  async create(params: CreateReviewParams) {
    const { user_id, user_rating, user_review } = params;
    const payload: schema.review.Insertable = {
      item_id: this.item_id,
      user_id,
      user_rating,
      user_review
    }
    const data = await database.insert("review", payload, { returning: ["id"] }).run(pool);
    return data;
  }
}