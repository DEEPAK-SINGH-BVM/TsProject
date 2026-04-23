import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiRouter from "./routes/index.routes";
import db from "./config/db";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true
}));
const PORT = process.env.PORT || 1001;

app.use("/", apiRouter);

app.listen(PORT, async () => {
  try {
    await db();
    console.log(`Server Running Port ${PORT}`);
  } catch (error) {
    console.log("DB connection failed", error);
  }
});
