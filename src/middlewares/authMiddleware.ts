import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { NextFunction, Request, Response } from "express";

export const protect = async (req: any, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
      req.user = await User.findById(decoded.id, { password: 0 });
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }
};
