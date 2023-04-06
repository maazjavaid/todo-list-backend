import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Todo title is required"],
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "User id is required"],
    ref: "User",
  },
  completed: Boolean,
});

export default mongoose.model("Todo", todoSchema);
