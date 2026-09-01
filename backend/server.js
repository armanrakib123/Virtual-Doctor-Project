const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { Server } = require("socket.io");
const { connectDB } = require("./config/db");
const apiRoutes = require("./routes/index");
const logger = require("./utils/logger");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(helmet());

const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS ? parseInt(process.env.RATE_LIMIT_WINDOW_MS) : 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX_REQUESTS ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) : 100, 
  message: "Too many requests from this IP, please try again later."
});
app.use("/api", limiter);

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000", credentials: true }));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Connect to Database
connectDB();

// API Routes
app.use("/api", apiRoutes);

// Socket.io integration
io.on("connection", (socket) => {
  logger.info(`A user connected: ${socket.id}`);

  socket.on("join-room", ({ roomId, userId, role }) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", { userId, role, socketId: socket.id });
    logger.info(`User ${userId} (${role}) joined room ${roomId}`);
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
    logger.info(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
