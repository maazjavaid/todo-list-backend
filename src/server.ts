import connectDB from "config/db";
import express from "express";
import cors from "cors";
import todoRoutes from "routes/todoRoutes";
import userRoutes from "routes/userRoutes";
import dotenv from "dotenv";
import { errorHandler } from "middlewares/errorHandler";
const env = dotenv.config();
connectDB();

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3003"],
  })
);

app.use("/todos", todoRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

process
  .on("unhandledRejection", (reason, p) => {
    return { reason, message: "Unhandled Rejection occured", p };
  })
  .on("uncaughtException", (err) => {
    return { err, message: "Uncaught Exception thrown" };
  });

app.listen(process.env.PORT);
