import router from "./routes/JobRouters.js";
import express from "express";
const app = express();

import * as dotnev from "dotenv";
dotnev.config();

import morgan from "morgan";
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
const port = process.env.PORT || 5100;

app.use("/api/v1/jobs", router);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "Something went Wrong...Server Error" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
