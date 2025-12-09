// src/routes/syllabusRoutes.js
import express from "express";
import { pasteSyllabus,getLatestSyllabus, } from "../controllers/syllabuscontroller.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

// No multer
// No upload
// Simple text endpoint

router.post("/paste", authMiddleware, pasteSyllabus);
router.get("/latest", authMiddleware, getLatestSyllabus);



export default router;
