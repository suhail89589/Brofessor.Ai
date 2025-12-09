// src/routes/chatRoutes.js
import express from "express";
import { askTutor } from "../controllers/chatController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/ask", authMiddleware, askTutor);

export default router;
