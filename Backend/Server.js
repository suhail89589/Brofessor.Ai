import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

// Routes
import userRoutes from "./Routes/userRoutes.js";
import syllabusRoutes from "./Routes/syllabusRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import studyPlanRoutes from "./Routes/studyPlanRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();




// API ROUTES
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
