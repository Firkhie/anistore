import express from "express";
import Register from "../services/user/register";
import Login from "../services/user/login";
import { CustomRequest, jwtAuthMiddleware } from "../middlewares/authentication";
import User from "../services/user";
import multer, { Multer } from "multer";
import MinioStorage from "../services/storage/minio";
import { v4 } from "uuid";
import UploadData, { UploadDataParams } from "../services/upload";

const upload = multer({
  dest: "tmp/resources/",
  limits: { fileSize: 100000000 }
});
const user = express.Router();

user.post("/register", async (req, res, next) => {
  console.log("user register api..");
  try {
    const { name, email, password, password_confirmation } = req.body;
    const data = await new Register({ name, email, password, password_confirmation }).execute();
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

user.post("/login", async (req, res, next) => {
  console.log("user login api..");
  try {
    const { email, password } = req.body;
    const data = await new Login({ email, password }).execute();
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

// user.get("/me", async (req, res, next) => {
//   console.log("jwt payload api..");
//   try {
    
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ status: "error", message: error.message });
//   }
// });

user.get("/user", jwtAuthMiddleware, async (req: CustomRequest, res, next) => {
  console.log("user detail api..");
  try {
    const id = req.locals.user.user_id
    const data = await new User({ id }).getDetail();
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
})

user.patch("/user/:id/picture", jwtAuthMiddleware, upload.single("file"), async (req: CustomRequest, res, next) => {
  console.log("profile pict patch api..");
  try {
    const { id } = req.params;
    const { user_id } = req.locals.user
    const file = req.file as Express.Multer.File;
    const { originalname } = file;
    const fileName = `${v4()}_${originalname}`;
    const params: UploadDataParams = {
      fileName,
      file
    };
    const filePath = await new UploadData(params).execute();
    const data = await new MinioStorage({ directory: "profile_picture", user_id }).uploadFile({ fileName, filePath, type: "profile_pict" });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
})

user.patch("/user", jwtAuthMiddleware, async (req: CustomRequest, res, next) => {
  console.log("user patch api..");
  try {
    const id = req.locals.user.user_id
    const { phone_number, birth_date, gender, address_line_1, address_line_2, city, state, country, postal_code } = req.body;
    const data = await new User({ id }).edit({ phone_number, birth_date, gender, address_line_1, address_line_2, city, state, country, postal_code });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

user.delete("/user", jwtAuthMiddleware, async (req: CustomRequest, res, next) => {
  console.log("user delete api..");
  try {
    const id = req.locals.user.user_id
    const data = await new User({ id }).delete();
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

export { user };