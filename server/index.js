import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

config();

const app = express();

app.use(express.json());
app.use(cookieParser());

(async () => {
  await mongoose.connect(process.env.DB_URL);
  app.listen(process.env.PORT, () => console.log("Server started"));
})();
