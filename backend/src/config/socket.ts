import { Server } from "socket.io";
import http from "http";
let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  // Jab koi client connect kare → ye run hoga.
  // socket.id → unique ID har client ka.
  io.on("connection", (socket) => {
    console.log("New Socket Connected", socket.id);

    // Client "joinRoom" event bheje → ye run hoga.
    // socket.join(userId) → client ko user-specific room mein daal diya.
    // Room ka use → sirf particular user ko message bhejne ke liye
    socket.on("joinRoom", (userId) => {
      socket.join(userId);
      console.log(`${socket.id} joined room: ${userId}`);
    });

    // Client disconnect hone par ye run hoga.
    socket.on("disconnect", () => {
      console.log("New client disconnect:", socket.id);
    });
  });
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("socket initSocket not Initialize");
  }
  return io;
};
