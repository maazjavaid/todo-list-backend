import express from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";

const router = express.Router();

import { protect } from "../middlewares/authMiddleware";

router.route("/").get(protect, getTodos).post(protect, addTodo);
router.route("/:id").put(protect, updateTodo).delete(protect, deleteTodo);

export default router;
