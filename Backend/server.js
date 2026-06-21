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
console.log("MOUNTING ROUTES");

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
// DATABASE
// ========================
const startServer = async () => {
  try {
    console.log("CONNECTING DATABASE...");

    await connectDB();

    console.log("DATABASE CONNECTED");

    if (!process.env.VERCEL) {
      const PORT = process.env.PORT || 7000;

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } else {
      console.log("Running on Vercel Serverless");
    }
  } catch (error) {
    console.error("SERVER START ERROR:", error);

    if (!process.env.VERCEL) {
      process.exit(1);
    }
  }
};

startServer();

// ========================
// 404
// ========================
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

export default app;
