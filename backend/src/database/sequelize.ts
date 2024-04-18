import { Sequelize } from "sequelize-typescript";
import { generateDatabaseConfig } from "../database";
import path from "path";

let sequelizeClient: Sequelize;

export const initSequelize = async (env: string) => {
  if (!sequelizeClient) {
    sequelizeClient = await new Sequelize({
      ...generateDatabaseConfig(env),
      models: [path.resolve(__dirname, "../models")]
    })
  }
  sequelizeClient.validate();
}