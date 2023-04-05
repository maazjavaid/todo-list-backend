import Todo from "models/todoModel";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const getTodos = expressAsyncHandler(async (req: any, res: Response) => {
  const todos: any = await Todo.find({ user: req.user._id });
  res.status(200).json(todos);
});

export const addTodo = expressAsyncHandler(async (req: any, res: Response) => {
  const todo = await Todo.create({ ...req.body, user: req.user._id });
  res.status(200).json(todo);
});

export const updateTodo = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTodo);
  }
);

export const deleteTodo = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const response = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json(response);
  }
);
