const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { connectDB } = require("./config/db");
const apiRoutes = require("./routes/index");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000", credentials: true }));
app.use(express.json());

// Connect to Database
connectDB();

// API Routes
app.use("/api", apiRoutes);

// Socket.io integration
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join-room", ({ roomId, userId, role }) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", { userId, role, socketId: socket.id });
    console.log(`User ${userId} (${role}) joined room ${roomId}`);
  });

  socket.on("incoming-call", (data) => {
    socket.to(data.roomId).emit("incoming-call", data);
  });

  socket.on("accept-call", (data) => {
    socket.to(data.roomId).emit("accept-call", data);
  });

  socket.on("reject-call", (data) => {
    socket.to(data.roomId).emit("reject-call", data);
  });

  socket.on("offer", (data) => {
    socket.to(data.roomId).emit("offer", data);
  });

  socket.on("answer", (data) => {
    socket.to(data.roomId).emit("answer", data);
  });

  socket.on("ice-candidate", (data) => {
    socket.to(data.roomId).emit("ice-candidate", data);
  });

  socket.on("toggle-camera", (data) => {
    socket.to(data.roomId).emit("toggle-camera", data);
  });

  socket.on("toggle-mic", (data) => {
    socket.to(data.roomId).emit("toggle-mic", data);
  });

  socket.on("start-screen-share", (data) => {
    socket.to(data.roomId).emit("start-screen-share", data);
  });

  socket.on("stop-screen-share", (data) => {
    socket.to(data.roomId).emit("stop-screen-share", data);
  });

  socket.on("send-message", (data) => {
    io.to(data.roomId).emit("receive-message", { ...data, createdAt: new Date() });
  });

  socket.on("end-call", (data) => {
    socket.to(data.roomId).emit("end-call", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
