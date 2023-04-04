const Todo = require("../models/todoModel");

const getTodos = async (req, res) => {
  const todos = await Todo.find();
  return res.status(200).json(todos);
};

const addTodo = async (req, res) => {
  const todo = await Todo.create(req.body);
  return res.status(200).json(todo);
};

const updateTodo = async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(200).json(updatedTodo);
};

const deleteTodo = async (req, res) => {
  const response = await Todo.findByIdAndDelete(req.params.id);
  return res.status(200).json(response);
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
