import { SequelizeOptions } from "sequelize-typescript";
import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || "development";
if (env === "development" || env === "test") {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

const PORT = Number(process.env.DB_PORT) || 5432;

const config: { [key: string]: SequelizeOptions } = {
  development: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    logging: console.log,
    port: PORT,
    pool: {
      max: 20,
      min: 5,
      acquire: 15000,
      idle: 10000
    }
  }
}

export function generateDatabaseConfig(env: string): SequelizeOptions {
  return config[env];
}