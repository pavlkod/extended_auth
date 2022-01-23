import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";

config();

const app = express();

(async () => {
  await mongoose.connect(process.env.DB_URL);
  app.listen(process.env.PORT, () => console.log("Server started"));
})();
