import mongoose from "mongoose";

const studyPlanSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    syllabusId: { type: mongoose.Schema.Types.ObjectId, ref: "Syllabus", required: true },
    days: Number,
    difficulty: String,
    planText: String,
  },
  { timestamps: true }
);

export default mongoose.model("StudyPlan", studyPlanSchema);
