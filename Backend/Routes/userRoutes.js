import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
} from "../controllers/userController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));
router.get("/me", authMiddleware, asyncHandler(getUserProfile));
router.put("/update", authMiddleware, asyncHandler(updateUserProfile));
router.put("/change-password", authMiddleware, asyncHandler(changePassword));

export default router;
