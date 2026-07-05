console.log("=== SERVER FILE LOADED ===");
console.log("VERCEL:", process.env.VERCEL);
console.log("NODE_ENV:", process.env.NODE_ENV);
import "./utils/envValidation.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./Routes/userRoutes.js";
import syllabusRoutes from "./Routes/syllabusRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import studyPlanRoutes from "./Routes/studyPlanRoutes.js";

dotenv.config();

const app = express();
app.set("trust proxy", 1);

const allowedOrigins = [
  
  "http://localhost:5173"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or serverless local invocations)
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// ========================
// BODY PARSERS
// ========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================
// DEBUG LOGS
// ========================
// ========================
// DATABASE MIDDLEWARE FOR SERVERLESS INVOCATIONS
// ========================
app.use(async (req, res, next) => {
  // Avoid database connection checks for health check route or favicon requests
  if (req.path === "/") {
    return next();
  }
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection middleware error:", error);
    res.status(500).json({ message: "Database connection failed", error: error.message });
  }
});

// ========================
// ROUTES
// ========================
app.use("/api/user", userRoutes);
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/studyplan", studyPlanRoutes);

console.log("ROUTES MOUNTED");

// ========================
// HEALTH CHECK
// ========================
app.get("/", (req, res) => {
  res.status(200).json({
    status: "online",
    message: "Backend working",
  });
});

// ========================
// SERVER LISTEN (LOCAL RUNS ONLY)
// ========================
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 7000;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch((err) => {
    console.error("Failed to connect to database on local startup:", err);
    process.exit(1);
  });
} else {
  console.log("Running on Vercel Serverless: Database connected on request demand.");
}

// ========================
// 404
// ========================
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// ========================
// ERROR HANDLER
// ========================
import { errorHandler } from "./Middleware/errorMiddleware.js";
app.use(errorHandler);

export default app;

