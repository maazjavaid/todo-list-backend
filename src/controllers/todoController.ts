import Todo from "models/todoModel";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

export const getTodos = expressAsyncHandler(
  async (req: Request, res: Response, next) => {
    const request: any = req;
    const todos: any = await Todo.find({ user: request.user._id });
    res.status(StatusCodes.OK).json(todos);
  }
);

export const addTodo = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const request: any = req;
    const todo = await Todo.create({ ...req.body, user: request.user._id });
    res.status(StatusCodes.CREATED).json(todo);
  }
);

export const updateTodo = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(StatusCodes.OK).json(updatedTodo);
  }
);

export const deleteTodo = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const response = await Todo.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.ACCEPTED).json(response);
  }
);
