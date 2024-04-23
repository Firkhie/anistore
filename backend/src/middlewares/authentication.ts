import { Request } from "express";
import jwt from "jsonwebtoken";

export interface User {
  user_id: string;
  role: string;
}
export interface CustomRequest extends Request {
  locals: {
    user: User
  }
}

export const jwtAuthMiddleware = (req: CustomRequest, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const identity = verifyToken(authHeader);
    if (identity) {
      req.locals = {
        ...req.locals,
        user: identity as User
      }
      return next();
    }
  }
  return res.status(401).json({ status: "error", message: "Unauthorized" }); 
}

export function verifyToken(raw_token: string) {
  let identity;
  const token = raw_token.split(" ")[1];
  jwt.verify(token, process.env.JWT_PRIVATE_KEY!, (err, user) => {
    if (!err) {
      identity = user;
    }
  });
  return identity;
}