import mongoose from "mongoose";
import StudyPlan from "../Models/studyPlanModel.js";
import Syllabus from "../Models/syllabusModel.js";
import { generateAIResponse } from "../utils/aiClient.js";
import { buildStudyPlanPrompt } from "../utils/studyPlanPrompt.js";

// ----------------------------------------------------
// GENERATE STUDY PLAN
// ----------------------------------------------------
export const generateStudyPlan = async (req, res) => {
  try {
    const { days, difficulty, syllabusId } = req.body;

    if (!days || !difficulty || !syllabusId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Validate ObjectId structure to prevent Mongoose CastError
    if (!mongoose.Types.ObjectId.isValid(syllabusId)) {
      return res.status(400).json({ message: "Invalid syllabus ID format" });
    }

    // Validate days parameter (limit to a reasonable range)
    const daysNum = parseInt(days, 10);
    if (isNaN(daysNum) || daysNum < 1 || daysNum > 30) {
      return res.status(400).json({ message: "Days must be a valid number between 1 and 30" });
    }

    const syllabus = await Syllabus.findById(syllabusId);
    if (!syllabus) {
      return res.status(404).json({ message: "Syllabus not found" });
    }

    // Prevent IDOR: Ensure the syllabus belongs to the authenticated user
    if (syllabus.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Access forbidden: Syllabus does not belong to you" });
    }

    const prompt = buildStudyPlanPrompt(
      syllabus.text,
      syllabus.topics,
      daysNum,
      difficulty
    );

    const plan = await generateAIResponse(prompt);

    const saved = await StudyPlan.create({
      user: req.user.id,
      syllabusId,
      days: daysNum,
      difficulty,
      planText: plan,
    });

    return res.status(200).json({
      studyPlan: plan,
      savedPlanId: saved._id,
    });
  } catch (err) {
    console.error("StudyPlan Error:", err);
    return res.status(500).json({ message: "Study plan generation failed" });
  }
};

// ----------------------------------------------------
// GET ALL USER PLANS
// ----------------------------------------------------
export const getUserPlans = async (req, res) => {
  try {
    const plans = await StudyPlan.find({ user: req.user.id })
      .populate("syllabusId", "originalName topics")
      .sort({ createdAt: -1 });

    return res.status(200).json({ plans });
  } catch (err) {
    console.error("GetUserPlans Error:", err);
    return res.status(500).json({ message: "Failed to fetch study plans" });
  }
};

// ----------------------------------------------------
// GET SINGLE PLAN
// ----------------------------------------------------
export const getSinglePlan = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid study plan ID format" });
    }

    const plan = await StudyPlan.findById(id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Prevent IDOR: Ensure the study plan belongs to the authenticated user
    if (plan.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Access forbidden: Study plan does not belong to you" });
    }

    return res.status(200).json({ plan });
  } catch (err) {
    console.error("GetSinglePlan Error:", err);
    return res.status(500).json({ message: "Could not fetch plan" });
  }
};

