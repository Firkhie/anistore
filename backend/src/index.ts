import dotenv from "dotenv";
import path from "path";
import express from "express";
import { initSequelize } from "./database/sequelize";
import { user, otp } from "./routers";
import bodyParser from "body-parser"

const env = process.env.NODE_ENV || "development";
if (env === "development" || env === "test") {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
}

(async function() {
  try {
    await initSequelize(env);
    const app = express();
    app.use((req, res, next) => {
      if (process.env.IS_MAINTENANCE === "true") {
        console.log("Server in maintenance");
        return res.status(503).json({ status: "maintenance", message: "Server in maintenance" });
      }
      next();
    });
    app.use(bodyParser.urlencoded({ limit: "250mb", extended: true }));
    app.use(bodyParser.json({ limit: "250mb" }));
    app.use(bodyParser.text());
    app.use(user);
    app.use(otp);
    app.listen(process.env.BACKEND_SERVER_PORT, () => {
      if (env === "development") {
        console.log(`server ready at http://localhost:${process.env.BACKEND_SERVER_PORT}`);
      }
    })
  } catch (error) {
    console.log(error);
  }
})();