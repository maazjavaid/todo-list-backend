import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status ? res.status : res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  res.json({
    message: err.message,
  });
};
