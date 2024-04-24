import { pool } from "../../database/pool";
import { database, schema } from "../../zapatos";
import { CategoryParams } from "./types";

export default class Category {
  static async getAll() {
    const data = await database.select("category", {}, { columns: ["id", "name"] }).run(pool);
    return data;
  }
  static async create(params: CategoryParams) {
    const { name } = params;
    const payload: schema.category.Insertable = {
      name: name!
    }
    const data = await database.insert("category", payload, { returning: ["id"] }).run(pool);
    return data;
  }
  static async edit(params: CategoryParams) {
    const { id, name } = params;
    const payload: schema.category.Updatable = {
      updated_at: new Date()
    }
    if (name) payload.name = name;
    const data = await database.update("category", payload, { id }).run(pool);
    if (!data) {
      throw new Error(`category with id ${id} is not found`);
    }
    return { id };
  }
  static async delete(id: string) {
    const data = await database.deletes("category", { id }).run(pool);
    if (!data) {
      throw new Error(`category with id ${id} is not found`);
    }
    return { id };
  }
}