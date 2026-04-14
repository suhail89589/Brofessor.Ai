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
  "https://brofessor-ai2.vercel.app", // Your Production Frontend
  "http://localhost:5173", // Local Vite Development
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS policy"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    credentials: true,
    optionsSuccessStatus: 204,
  }),
);

/**
 * 3. EXPLICIT PRE-FLIGHT HANDSHAKE
 * FIXED: Uses "/*any" instead of "*" to comply with Express 5 path-to-regexp rules.
 */
app.options("/*any", (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

// 4. PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. API ROUTES
app.use("/api/user", userRoutes);
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/studyplan", studyPlanRoutes);

// Root route (Health Check)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "online",
    message: "AI Tutor Backend Running...",
  });
});

/**
 * 6. 404 HANDLER
 * FIXED: Uses "/*path" to avoid the PathError in Express 5.
 */
app.use("/*path", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 7000;

/**
 * For Vercel, we export the app.
 * We only call app.listen if we are running locally.
 */
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
