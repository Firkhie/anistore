import { pool } from "../../database/pool";
import { database, schema } from "../../zapatos";
import { CartParams, EditDeleteCartParams } from "./types";

export default class Cart {
  private user_id: string;
  constructor(params: CartParams) {
    this.user_id = params.user_id;
  }
  async getAll() {
    const data = await database.sql`
      SELECT
        i.name,
        i.price,
        c.quantity,
        ii.image_url
      FROM cart c
      LEFT JOIN item i ON i.id = c.item_id
      LEFT JOIN item_image ii ON ii.item_id = c.item_id
      WHERE c.user_id = ${database.param(this.user_id)} AND ii.display_order = 1;
    `.run(pool);
    return data;
  }
  async create(params: { item_id: string }) {
    const { item_id } = params;
    const payload: schema.cart.Insertable = {
      item_id,
      user_id: this.user_id,
      quantity: 1
    }
    const data = await database.insert("cart", payload, { returning: ["id"] }).run(pool);
    return data;
  }
  async edit(params: EditDeleteCartParams) {
    const { id, quantity } = params;
    const payload: schema.cart.Updatable = {
      updated_at: new Date()
    }
    if (quantity) payload.quantity = quantity;
    const data = await database.update("cart", payload, { id }).run(pool);
    if (!data) {
      throw new Error(`cart with id ${id} is not found`);
    }
    return { id };
  }
  async delete(params: EditDeleteCartParams) {
    const { id } = params;
    const data = await database.deletes("cart", { id }).run(pool);
    if (!data) {
      throw new Error(`cart with id ${id} is not found`);
    }
    return { id };
  }
}