
import express from "express";
import { askTutor } from "../controllers/chatController.js";
import { askLimiter } from "../Middleware/rateLimiter.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/ask", authMiddleware, askLimiter, askTutor);

export default router;
