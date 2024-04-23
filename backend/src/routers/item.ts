import express from "express"
import Item from "../services/item";
import { CustomRequest, jwtAuthMiddleware } from "../middlewares/authentication";

const item = express.Router();

item.get("/items", async (req, res, next) => {
  console.log("get all items api..");
  try {
    const items = await Item.getAll();
    res.status(200).json({ status: "success", items, total: items.length });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

item.get("/items/:id", async (req, res, next) => {
  console.log("get one item api..");
  try {
    const { id } = req.params;
    const data = await Item.getOne(id);
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

item.post("/items", jwtAuthMiddleware, async (req: CustomRequest, res, next) => {
  console.log("create item api..");
  try {
    const { description, name, price, stock } = req.body;
    const { role, user_id } = req.locals.user;
    if (role !== "admin") {
      throw new Error("Unauthorized");
    };
    const data = await new Item({ user_id }).create({ description, name, price, stock });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

// item.post("/items/:id/images", async (req, res, next) => {
//   console.log("create item api..");
//   try {
//     const { description, name, price, stock } = req.body;
//     const data = await Item.create({ description, name, price, stock });
//     res.status(200).json({ status: "success", data });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ status: "error", message: error.message });
//   }
// });

item.patch("/items/:id", jwtAuthMiddleware, async (req: CustomRequest, res, next) => {
  console.log("create item api..");
  try {
    const { id } = req.params;
    const { description, name, price, stock, status } = req.body;
    const { role, user_id } = req.locals.user;
    if (role !== "admin") {
      throw new Error("Unauthorized");
    };
    const data = await new Item({ user_id }).edit({ id, description, name, price, status, stock });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

item.delete("/items/:id", jwtAuthMiddleware, async (req: CustomRequest, res, next) => {
  console.log("delete item api..");
  try {
    const { id } = req.params;
    const { role, user_id } = req.locals.user;
    if (role !== "admin") {
      throw new Error("Unauthorized");
    };
    const data = await new Item({ user_id }).delete(id);
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

export { item };