import express from "express"
import { database } from "../zapatos";
import { pool } from "../database/pool";

const test = express.Router();

test.get("/testssss", async (req, res, next) => {
  try {
    // const data = await database.select("test", {}).run(pool);
    // res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
})

export { test };