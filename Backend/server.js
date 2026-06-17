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

// 1. CORS - MUST BE BEFORE ROUTES
const allowedOrigins = [
  "https://brofessor-ai-frontend-fld47d4td-mohd-suhails-projects-af24a2a9.vercel.app",
  "https://brofessor-ai-frontend-fld47d4td-mohd-suhails-projects-af24a2a9.vercel.app/",
  "https://brofessor-ai2.vercel.app",
  "https://brofessor-ai2.vercel.app/",
  "http://localhost:5173",
  "http://localhost:5173/"
];

if (process.env.FRONTEND_URL) {
  const customOrigins = process.env.FRONTEND_URL.split(",").map(o => o.trim());
  allowedOrigins.push(...customOrigins);
  customOrigins.forEach(o => {
    if (o.endsWith("/")) {
      allowedOrigins.push(o.slice(0, -1));
    } else {
      allowedOrigins.push(o + "/");
    }
  });
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`Blocked by CORS: ${origin}`);
        callback(new Error("CORS Policy Violation"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// 2. PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. ROUTES
app.use("/api/user", userRoutes);
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/studyplan", studyPlanRoutes);

app.get("/", (req, res) => res.status(200).json({ status: "online" }));

// 4. START SERVER (ONLY ONCE)
const startServer = async () => {
  try {
    await connectDB();
    if (!process.env.VERCEL) {
      const PORT = process.env.PORT || 7000;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } else {
      console.log("Running in serverless environment (Vercel). Listening skipped.");
    }
  } catch (err) {
    console.error("Failed to connect to database:", err);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
  }
};

startServer();

// 5. 404 HANDLER (MUST BE LAST)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
