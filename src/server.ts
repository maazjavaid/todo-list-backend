import express from "express";
import cors from "cors";
import connectDB from "config/db";
import todoRoutes from "routes/todoRoutes";
import userRoutes from "routes/userRoutes";
import dotenv from "dotenv";
import { errorHandler } from "middlewares/errorHandler";
const env = dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use("/todos", todoRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

app.listen(process.env.PORT);
