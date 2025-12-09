// src/routes/studyPlanRoutes.js
import express from "express";
import {
  generateStudyPlan,
  getUserPlans,
  getSinglePlan,
} from "../controllers/studyPlanController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", authMiddleware, generateStudyPlan);
router.get("/my-plans", authMiddleware, getUserPlans);
router.get("/:id", authMiddleware, getSinglePlan);

export default router;
