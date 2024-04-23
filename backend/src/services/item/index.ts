import { pool } from "../../database/pool";
import { database, schema } from "../../zapatos";
import { CreateEditItemParams, ItemParams, updateItemHistoryParams } from "./types";

export default class Item {
  private user_id: string;
  constructor(params: ItemParams) {
    this.user_id = params.user_id;
  }
  static async getAll() {
    const items = await database.select("item", {}, { columns: ["id", "name", "price", "status", "description", "stock"] }).run(pool);
    return items;
  }
  static async getOne(id: string) {
    const data = await database.selectExactlyOne("item", { id }, { columns: ["id", "name", "price", "status", "description", "stock"] }).run(pool);
    return data;
  }
  async create(params: CreateEditItemParams) {
    const { description, name, price, stock } = params;
    let payload: schema.item.Insertable = {
      name: name!,
      description,
      price,
      stock,
      status: "ready_stock"
    }
    const data = await database.insert("item", payload, { returning: ["id"] }).run(pool);
    const updatePayload: updateItemHistoryParams = {
      item_id: data.id,
      user_id: this.user_id,
      action: "new_item",
      context: "",
      quantity: stock
    }
    await this.updateItemHistory(updatePayload)
    return data[0];
  }
  async edit(params: CreateEditItemParams) {
    const { id, description, name, price, status, stock } = params;
    let payload: schema.item.Updatable = {
      updated_at: new Date()
    }
    if (name) payload.name = name;
    if (description) payload.description = description;
    if (price) payload.price = price;
    if (status) payload.status = status;
    if (stock) payload.stock = stock;
    const data = await database.update("item", payload, { id }).run(pool);
    if (!data) {
      throw new Error(`item with id ${id} is not found`);
    }
    const updatePayload: updateItemHistoryParams = {
      item_id: id!,
      user_id: this.user_id,
      action: "edit_item",
      context: "",
      quantity: stock
    }
    await this.updateItemHistory(updatePayload)
    return { id };
  }
  async delete(id: string) {
    const data = await database.update("item", { status: "deleted" }, { id }).run(pool);
    if (!data) {
      throw new Error(`item with id ${id} is not found`);
    }
    const updatePayload: updateItemHistoryParams = {
      item_id: id,
      user_id: this.user_id,
      action: "delete_item",
      context: ""
    }
    await this.updateItemHistory(updatePayload)
    return { id };
  }
  private async updateItemHistory(params: updateItemHistoryParams) {
    const { item_id, user_id, action, context, quantity } = params;
    const payload: schema.item_history.Insertable = {
      item_id,
      user_id,
      action,
      context,
      quantity
    }
    await database.insert("item_history", payload).run(pool);
  }
}