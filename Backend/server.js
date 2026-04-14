import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import userRoutes from "./Routes/userRoutes.js";
import syllabusRoutes from "./Routes/syllabusRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import studyPlanRoutes from "./Routes/studyPlanRoutes.js";

dotenv.config();

const app = express();

// 1. DATABASE CONNECTION
connectDB();

// 2. CORS CONFIGURATION
const allowedOrigins = [
  "https://brofessor-ai2.vercel.app",
  "http://localhost:5173",
];

app.use((req, res, next) => {
  const origin = req.headers.origin || "https://brofessor-ai2.vercel.app";
  res.setHeader("Access-Control-Allow-Origin", origin);
  
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  next();
});

// 4. PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. API ROUTES
app.use("/api/user", userRoutes);
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/studyplan", studyPlanRoutes);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "online",
    message: "AI Tutor Backend Running...",
  });
});

/**
 * 6. 404 HANDLER
 * Using a simple middleware at the end instead of a named path string.
 */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 7000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
