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

// ========================
// CORS
// ========================
app.use(
  cors({
    origin: ["https://brofessor-frontend.vercel.app", "http://localhost:5173"],
    credentials: true,
  }),
);

app.options(/.*/, (req, res) => {
  console.log("OPTIONS HIT:", req.path);

  res.header(
    "Access-Control-Allow-Origin",
    "https://brofessor-frontend.vercel.app"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  res.header(
    "Access-Control-Allow-Credentials",
    "true"
  );

  return res.sendStatus(200);
});

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
