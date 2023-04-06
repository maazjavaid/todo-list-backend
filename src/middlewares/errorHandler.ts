import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status ? res.status : res.status(500);
  res.json({
    message: err.message,
  });
};
