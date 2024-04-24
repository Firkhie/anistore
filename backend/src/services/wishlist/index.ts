import { pool } from "../../database/pool";
import { database, schema } from "../../zapatos";
import { WishlistParams } from "./types";

export default class Wishlist {
  private user_id: string;
  constructor(params: WishlistParams) {
    this.user_id = params.user_id;
  }
  async getAll() {
    const data = await database.sql`
      SELECT
        i.name,
        i.price,
        ii.image_url
      FROM wishlist c
      LEFT JOIN item i ON i.id = c.item_id
      LEFT JOIN item_image ii ON ii.item_id = c.item_id
      WHERE c.user_id = ${database.param(this.user_id)} AND ii.display_order = 1;
    `.run(pool);
    return data;
  }
  async create(params: { item_id: string }) {
    const { item_id } = params;
    const payload: schema.wishlist.Insertable = {
      item_id,
      user_id: this.user_id
    }
    const data = await database.insert("wishlist", payload, { returning: ["id"] }).run(pool);
    return data;
  }
  async delete(params: { id: string }) {
    const { id } = params;
    const data = await database.deletes("wishlist", { id }).run(pool);
    if (!data) {
      throw new Error(`wishlist with id ${id} is not found`);
    }
    return { id };
  }
}