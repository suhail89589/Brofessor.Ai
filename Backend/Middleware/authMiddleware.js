import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Check Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Get user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user; // attach user to request for controllers

    next();
  } catch (error) {
    console.error("AuthMiddleware Error:", error);
    return res.status(401).json({ message: "Unauthorized: Token invalid" });
  }
};
