"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controllers/todoController");
const router = express_1.default.Router();
const authMiddleware_1 = require("../middlewares/authMiddleware");
router.route("/").get(authMiddleware_1.protect, todoController_1.getTodos).post(authMiddleware_1.protect, todoController_1.addTodo);
router.route("/:id").put(authMiddleware_1.protect, todoController_1.updateTodo).delete(authMiddleware_1.protect, todoController_1.deleteTodo);
exports.default = router;
