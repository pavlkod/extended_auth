import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router/index.js";

import errorMiddleware from "./middlewares/error.js";

config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use("/api", router);

app.use(errorMiddleware);
(async () => {
  await mongoose.connect(process.env.DB_URL);
  app.listen(process.env.PORT, () => console.log("Server started"));
})();
