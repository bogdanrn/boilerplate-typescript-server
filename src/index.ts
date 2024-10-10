import express from "express";
import { APP_PORT, APP_HOST } from "@lib/env";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.APP_PORT, () => {
  console.log(`App available at http://${APP_HOST}:${APP_PORT}`);
});
