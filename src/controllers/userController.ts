import User from "models/userModel";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import expressAsyncHandler from "express-async-handler";

export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user: any = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJwt(user._id),
    });
  }
);

export const loginUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user: any = await User.findOne({ email });
    if (await bcrypt.compare(password, user.password)) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateJwt(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  }
);

export const generateJwt = (id: ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "", {
    expiresIn: "1d",
  });
};
