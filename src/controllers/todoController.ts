import Todo from "models/todoModel";
import { Request, Response } from "express";

export const getTodos = async (req: any, res: Response) => {
  const todos = await Todo.find({ user: req.user._id });
  return res.status(200).json(todos);
};

export const addTodo = async (req: any, res: Response) => {
  const todo = await Todo.create({ ...req.body, user: req.user._id });
  return res.status(200).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(200).json(updatedTodo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const response = await Todo.findByIdAndDelete(req.params.id);
  return res.status(200).json(response);
};
