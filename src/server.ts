import connectDB from "config/db";
import { app } from "app";

connectDB();

process
  .on("unhandledRejection", (reason, p) => {
    return { reason, message: "Unhandled Rejection occured", p };
  })
  .on("uncaughtException", (err) => {
    return { err, message: "Uncaught Exception thrown" };
  });

app.listen(process.env.PORT);
