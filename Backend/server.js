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

// 1. CORS CONFIGURATION (Must be at the TOP)
app.use(
  cors({
    origin: ["https://brofessor-ai2.vercel.app", "http://localhost:5173"], 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.options("*", cors());

// 2. PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. DATABASE
connectDB();

// 4. API ROUTES
app.use("/api/user", userRoutes);
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/studyplan", studyPlanRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("AI Tutor Backend Running...");
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
