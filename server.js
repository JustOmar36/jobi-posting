import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";

//pubic
import path, { dirname } from "path";
import { fileURLToPath } from "url";
//DB
import mongoose from "mongoose";

//Middleware
import errHandlerMiddleWare from "./middleware/errHandlerMiddleWare.js";
import { authenticateUser } from "./middleware/authMiddleWare.js";

//Routers
import jobRouter from "./routes/JobRouters.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/authUser.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.static(path.resolve(__dirname, "./public")));

import * as dotnev from "dotenv";
dotnev.config();

import morgan from "morgan";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT || 5100;

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test" });
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.use("/api/v1/users", authenticateUser, userRouter);

app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "Not Found" });
});

app.use(errHandlerMiddleWare);

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
} catch (err) {
  console.log(err);
  process.exit(1);
}
