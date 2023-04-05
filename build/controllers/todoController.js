"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todoModel_1 = __importDefault(require("models/todoModel"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield todoModel_1.default.find({ user: req.user._id });
    return res.status(200).json(todos);
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield todoModel_1.default.create(Object.assign(Object.assign({}, req.body), { user: req.user._id }));
    return res.status(200).json(todo);
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTodo = yield todoModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    return res.status(200).json(updatedTodo);
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield todoModel_1.default.findByIdAndDelete(req.params.id);
    return res.status(200).json(response);
});
exports.deleteTodo = deleteTodo;
