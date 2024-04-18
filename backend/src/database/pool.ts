import { Pool } from "pg"

const PORT = Number(process.env.DB_PORT) || 5432;

export const pool = new Pool({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.DATABASE_HOST,
  port: PORT,
  max: 100,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: parseInt(process.env.POSTGRES_TIMEOUT || "") || 2000
})