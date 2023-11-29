import express from "express";
const app = express();

import * as dotnev from "dotenv";
dotnev.config();

import morgan from "morgan";
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
const port = 5100;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.json({ message: "Data Recieved", data: req.body });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
