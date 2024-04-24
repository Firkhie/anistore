import express from "express";
import { CustomRequest, jwtAuthMiddleware } from "../middlewares/authentication";
import Review from "../services/review";

const review = express.Router();

review.get("/reviews/:item_id", async (req, res, next) => {
  console.log("get all reviews api..");
  try {
    const { item_id } = req.params;
    const items = await new Review({ item_id }).getAll();
    res.status(200).json({ status: "success", items, total: items.length });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

review.post("/reviews/:item_id", jwtAuthMiddleware, async (req: CustomRequest, res, next) => {
  console.log("create review api..");
  try {
    const { user_id } = req.locals.user;
    const { item_id } = req.params;
    const { user_rating, user_review } = req.body;
    const data = await new Review({ item_id }).create({ user_id, user_rating, user_review });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

export { review };