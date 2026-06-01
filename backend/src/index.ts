import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import apiRouter from "./routes/index.routes";
import db from "./config/db";
// import db from "./config/sqldb";

import { initSocket } from "./config/socket";

dotenv.config();
const app = express();
const server = http.createServer(app);
initSocket(server);
app.use(express.json());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   }),
// );
app.use(
  cors({
    origin: "*",
  }),
);
const PORT = process.env.PORT || 1001;

app.use("/", apiRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the E-Commerce API");
});
// export const io = new Server(server, {
//   cors: {
//     origin: process.env.CLIENT_URL,
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);

//   socket.on("joinRoom", (roomId) => {
//     console.log("Room Joined", roomId);

//     socket.join(roomId.toString());
//   });

//   socket.on("disconnect", () => {
//     console.log("New client disconnect:", socket.id);
//   });
// });

server.listen(PORT, async () => {
  try {
    await db(); 
    // const connection = await db.getConnection();
    // connection.release();
    console.log(`Server Running Port ${PORT}`);
  } catch (error) {
    console.log("DB connection failed", error);
  }
});
