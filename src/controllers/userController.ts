import User from "@/models/userModel";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const user: any = await User.create({
      name,
      email,
      password: password,
    });
    res.status(StatusCodes.OK).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  }
);

export const loginUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user: any = await User.findOne(
      { email },
      { password: 1, name: 1, email: 1 }
    );
    if (!user) {
      res.status(StatusCodes.NOT_FOUND);
      next(new Error("User Not found"));
    }

    const passCheck = await user.comparePassword(password);

    if (!passCheck) {
      res.status(StatusCodes.UNAUTHORIZED);
      next(new Error("Invalid Credentials"));
    }

    res.status(StatusCodes.OK).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJwt(user._id),
    });
  }
);

export const generateJwt = (id: ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "", {
    expiresIn: "1d",
  });
};
