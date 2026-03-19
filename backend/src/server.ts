import http from "http";

import dotenv from "dotenv";
import { Server } from "socket.io";

import app from "./app";
import connectDB from "./config/mongoose";

dotenv.config();

// ─── HTTP & Socket.io Setup ───────────────────────────────────────────────────

const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
  },
});

// ─── Socket.io Events ─────────────────────────────────────────────────────────

io.on("connection", (socket) => {
  console.log(`🔌 Socket connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`🔌 Socket disconnected: ${socket.id}`);
  });
});

// ─── Boot ─────────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

const start = async (): Promise<void> => {
  await connectDB();

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

start();