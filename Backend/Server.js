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

// 2. CORS CONFIG (FINAL CLEAN ✅)
const allowedOrigins = [
  "https://brofessor-ai-frontend.vercel.app",

  "http://localhost:5173",
];

// Add this to app.js
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (like curl, Postman, or server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Policy Violation: Origin not allowed."));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// ❌ REMOVED app.options() (it was causing crash + not needed)

// 3. PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. API ROUTES
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

// 5. 404 HANDLER
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
