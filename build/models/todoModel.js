"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const todoSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
        ref: "User",
    },
    completed: Boolean,
});
exports.default = mongoose_1.default.model("Todo", todoSchema);
