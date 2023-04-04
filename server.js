const express = require("express");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const dotenv = require("dotenv").config();
const cors = require("cors");

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

app.listen(process.env.PORT);
