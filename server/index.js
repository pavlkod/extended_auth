import express from "express";
import { config } from "dotenv";

config();

const app = express();

(async () => {
  app.listen(process.env.PORT, () => console.log("Server started"));
})();
