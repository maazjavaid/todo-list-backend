import jwt from "jsonwebtoken";
import User from "models/userModel";
import { NextFunction, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const protect = expressAsyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    if (!req.headers.authorization?.startsWith("Bearer")) {
      res.status(401);
      throw new Error("Token Required");
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      res.status(401);
      throw new Error("User not Authorized");
    }
    next();
  }
);
