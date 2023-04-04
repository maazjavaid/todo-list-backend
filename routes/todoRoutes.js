const express = require("express");
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

router.route("/").get(getTodos).post(addTodo);
router.route("/:id").put(updateTodo).delete(deleteTodo);

module.exports = router;
