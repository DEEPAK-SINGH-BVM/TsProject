import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import apiRouter from "./routes/index.routes";
import db from "./config/db";
import { Server } from "socket.io";
import { createServer } from "node:http";

dotenv.config();
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
const PORT = process.env.PORT || 1001;

app.use("/", apiRouter);

export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    console.log("Room Joined", roomId);

    socket.join(roomId.toString());
  });

  socket.on("disconnect", () => {
    console.log("New client disconnect:", socket.id);
  });
});

server.listen(PORT, async () => {
  try {
    await db();
    console.log(`Server Running Port ${PORT}`);
  } catch (error) {
    console.log("DB connection failed", error);
  }
});
