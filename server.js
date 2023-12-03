import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";

//DB
import mongoose from "mongoose";

//Middleware
import errHandlerMiddleWare from "./middleware/errHandlerMiddleWare.js";
import { authenticateUser } from "./middleware/authMiddleWare.js";

//Routers
import jobRouter from "./routes/JobRouters.js";
import authRouter from "./routes/authRouter.js";

const app = express();

import * as dotnev from "dotenv";
dotnev.config();

import morgan from "morgan";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT || 5100;

app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.use("/api/v1/auth", authRouter);

app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "Not Found" });
});

app.use(errHandlerMiddleWare);

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
} catch (err) {
  console.log(err);
  process.exit(1);
}
