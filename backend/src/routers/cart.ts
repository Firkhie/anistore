import express from "express";
import { CustomRequest, jwtAuthMiddleware } from "../middlewares/authentication";
import Cart from "../services/cart";

const cart = express.Router();

cart.get("/carts", jwtAuthMiddleware, async (req: CustomRequest, res, next) => {
  console.log("get user cart api..");
  try {
    const { user_id } = req.locals.user;
    const items = await new Cart({ user_id }).getAll();
    res.status(200).json({ status: "success", items, total: items.length });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

cart.post("/carts", jwtAuthMiddleware, async (req: CustomRequest, res, next) => {
  console.log("create cart api..");
  try {
    const { user_id } = req.locals.user;
    const { item_id } = req.body;
    const data = await new Cart({ user_id }).create({ item_id });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

cart.patch("/carts/:id", jwtAuthMiddleware, async (req: CustomRequest, res, next) => {
  console.log("patch cart api..");
  try {
    const { user_id } = req.locals.user;
    const { cart_id, quantity } = req.body;
    const data = await new Cart({ user_id }).edit({ id: cart_id, quantity });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

cart.delete("/carts/:id", jwtAuthMiddleware, async (req: CustomRequest, res, next) => {
  console.log("delete cart api..");
  try {
    const { user_id } = req.locals.user;
    const { cart_id } = req.body;
    const data = await new Cart({ user_id }).delete({ id: cart_id });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

export { cart };