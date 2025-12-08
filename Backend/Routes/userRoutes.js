import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
} from "../controllers/usercontroller.js";

import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getUserProfile);
router.put("/update", authMiddleware, updateUserProfile);
router.put("/update", authMiddleware, changePassword);

export default router;
