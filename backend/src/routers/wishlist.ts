import express from "express";
import { CustomRequest, jwtAuthMiddleware } from "../middlewares/authentication";
import Wishlist from "../services/wishlist";

const wishlist = express.Router();

wishlist.get("/wishlists", jwtAuthMiddleware, async (req: CustomRequest, res, next) => {
  console.log("get user wishlist api..");
  try {
    const { user_id } = req.locals.user;
    const items = await new Wishlist({ user_id }).getAll();
    res.status(200).json({ status: "success", items, total: items.length });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

wishlist.post("/wishlists", jwtAuthMiddleware, async (req: CustomRequest, res, next) => {
  console.log("create wishlist api..");
  try {
    const { user_id } = req.locals.user;
    const { item_id } = req.body;
    const data = await new Wishlist({ user_id }).create({ item_id });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

wishlist.delete("/wishlists/:id", jwtAuthMiddleware, async (req: CustomRequest, res, next) => {
  console.log("delete wishlist api..");
  try {
    const { user_id } = req.locals.user;
    const { wishlist_id } = req.body;
    const data = await new Wishlist({ user_id }).delete({ id: wishlist_id });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

export { wishlist };