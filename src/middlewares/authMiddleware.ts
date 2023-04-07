import jwt from "jsonwebtoken";
import User from "models/userModel";
import { NextFunction, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

export const protect = expressAsyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    if (!req.headers.authorization?.startsWith("Bearer")) {
      res.status(StatusCodes.UNAUTHORIZED);
      next(new Error("Token Required"));
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      res.status(StatusCodes.UNAUTHORIZED);
      next(new Error("User not Authorized"));
    }
    next();
  }
);
