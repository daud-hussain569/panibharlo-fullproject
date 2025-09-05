import express from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import bottleOrderRoutes from "./routes/bottleOrderRoutes.js";
import tankerOrderRoutes from "./routes/tankerOrderRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Error handlers
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

// --- MongoDB Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Exit process on DB error
  }
};

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  },
});

const __dirname = path.resolve(); // Get current directory

const userSockets = {}; // To map userId to socketId

// Middleware to attach io and userSockets to the request
app.use((req, res, next) => {
  req.io = io;
  req.userSockets = userSockets;
  next();
});


// ----------------------------
// Middleware
// ----------------------------
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cookieParser()); // ✅ Parse cookies for JWT auth

// CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true, // ✅ allow cookies to be sent
  exposedHeaders: ["X-Total-Count"],
};
app.use(cors(corsOptions));

// ----------------------------
// Routes
// ----------------------------
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/bottle-orders", bottleOrderRoutes);
app.use("/api/tanker-orders", tankerOrderRoutes);
app.use("/api/contact", contactRoutes); // This line was missing
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/admin", adminRoutes);

// --- Serve Frontend in Production ---
if (process.env.NODE_ENV === "production") {
  // Set frontend build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/panibharlo/dist")));

  // For any route that is not an API route, serve the index.html
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../frontend/panibharlo/dist", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("API is running in development mode..."));
}
// ----------------------------
// Error Middleware
// ----------------------------
app.use(notFound);
app.use(errorHandler);

// ----------------------------
// Socket.io Connection
// ----------------------------
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("register", (userId) => {
    if (userId) {
      socket.join(userId); // User joins a room with their own ID
      console.log(`User ${userId} joined room ${userId} with socket ${socket.id}`);
    }
  });

  socket.on("disconnect", () => {
    // No need to manually track rooms, socket.io handles it.
    // We can add logging here if needed by iterating over socket.rooms
    console.log("user disconnected");
  });
});

// ----------------------------
// Server Start
// ----------------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

// ----------------------------
// Example cURL for testing user route
// ----------------------------
// curl -i -H "Authorization: Bearer <ADMIN_TOKEN>" http://localhost:5000/api/users
