import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoute from "./routes/api.route.ts";
import mongoose from "mongoose";
import config from "./config.ts";
import { PORT } from "./constants/constants.ts";

const app: Express = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
dotenv.config();
app.use("/api", apiRoute);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found :D",
  });
});

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch((error) => console.error(error));
