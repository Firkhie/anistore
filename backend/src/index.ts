import dotenv from "dotenv";
import path from "path";
import express from "express";
import { initSequelize } from "./database/sequelize";
import { test } from "./routers";

const env = process.env.NODE_ENV || "development";
if (env === "development" || env === "test") {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
}

(async function() {
  try {
    await initSequelize(env);
    const app = express();
    app.use(test);
    app.listen(process.env.BACKEND_SERVER_PORT, () => {
      if (env === "development") {
        console.log(`server ready at http://localhost:${process.env.BACKEND_SERVER_PORT}`);
      }
    })
  } catch (error) {
    console.log(error);
  }
})();