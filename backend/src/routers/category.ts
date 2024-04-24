import express from "express";
import { CustomRequest, jwtAuthMiddleware } from "../middlewares/authentication";
import Category from "../services/category";

const category = express.Router();

category.get("/categories", async (req, res, next) => {
  console.log("get all categories api..");
  try {
    const items = await Category.getAll();
    res.status(200).json({ status: "success", items, total: items.length });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

category.post("/categories", jwtAuthMiddleware, async (req: CustomRequest, res, next) => {
  console.log("create category api..");
  try {
    const { role } = req.locals.user;
    if (role !== "admin") {
      throw new Error("Unauthorized");
    }
    const { name } = req.body;
    const data = await Category.create({ name });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

category.patch("/categories/:id", jwtAuthMiddleware, async (req: CustomRequest, res, next) => {
  console.log("patch category api..");
  try {
    const { role } = req.locals.user;
    if (role !== "admin") {
      throw new Error("Unauthorized");
    }
    const { id } = req.params;
    const { name } = req.body;
    const data = await Category.edit({ id, name });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

category.delete("/categories/:id", jwtAuthMiddleware, async (req: CustomRequest, res, next) => {
  console.log("delete category api..");
  try {
    const { role, user_id } = req.locals.user;
    if (role !== "admin") {
      throw new Error("Unauthorized");
    }
    const { id } = req.params;
    const data = await Category.delete(id);
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

export { category };