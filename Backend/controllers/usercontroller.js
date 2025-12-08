// src/controllers/userController.js
import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// --------------------------------------------------
// REGISTER
// --------------------------------------------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password });
    const token = user.getSignedToken();

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token, // ✅ FIXED — token now returned at root level
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------------------------------------
// LOGIN
// --------------------------------------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = user.getSignedToken();

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token, // ✅ FIXED — same format as register
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------------------------------------
// GET PROFILE (protected)
// --------------------------------------------------
export const getUserProfile = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------------------------------------
// UPDATE PROFILE (protected)
// --------------------------------------------------
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists)
        return res.status(400).json({ message: "Email already in use" });
      user.email = email;
    }

    if (name) user.name = name;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------------------------------------
// CHANGE PASSWORD (protected)
// --------------------------------------------------
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    user.password = newPassword; // pre-save hook hashes automatically
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
