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
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        [
          "https://brofessor-ai-frontend-fld47d4td-mohd-suhails-projects-af24a2a9.vercel.app/",
          "http://localhost:5173",
        ].includes(origin)
      ) {
        callback(null, true);
      } else {
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
    const PORT = process.env.PORT || 7000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
};

startServer();

// 5. 404 HANDLER (MUST BE LAST)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
