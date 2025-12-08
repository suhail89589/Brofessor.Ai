import StudyPlan from "../Models/StudyPlanModel.js";
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

    const syllabus = await Syllabus.findById(syllabusId);
    if (!syllabus) {
      return res.status(404).json({ message: "Syllabus not found" });
    }

    const prompt = buildStudyPlanPrompt(
      syllabus.text,
      syllabus.topics,
      days,
      difficulty
    );

    const plan = await generateAIResponse(prompt);

    const saved = await StudyPlan.create({
      user: req.user.id,
      syllabusId,
      days,
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
    const plan = await StudyPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    return res.status(200).json({ plan });
  } catch (err) {
    console.error("GetSinglePlan Error:", err);
    return res.status(500).json({ message: "Could not fetch plan" });
  }
};
