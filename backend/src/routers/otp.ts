import express from "express";
import Otp from "../services/otp";

const otp = express.Router();

otp.post("/generate-otp", async (req, res, next) => {
  console.log("generate otp api..");
  try {
    const { email, minute, subject, type } = req.body;
    const data = await new Otp({ email }).generate({ minute, subject, type });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
})

otp.post("/verify-otp", async (req, res, next) => {
  console.log("verify otp api..");
  try {
    const { email, code, type } = req.body;
    const data = await new Otp({ email }).verify({ code, type });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
})

export { otp }