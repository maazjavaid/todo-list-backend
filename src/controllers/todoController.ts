import Todo from "models/todoModel";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const getTodos = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const request: any = req;
    const todos: any = await Todo.find({ user: request.user._id });

    if (todos.length == 0) {
      res.status(404);
      throw new Error("Todos not Found");
    }

    res.status(200).json(todos);
  }
);

export const addTodo = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const request: any = req;
    const todo = await Todo.create({ ...req.body, user: request.user._id });
    res.status(201).json(todo);
  }
);

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
    res.status(204).json(response);
  }
);
