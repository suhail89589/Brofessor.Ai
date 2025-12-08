import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema({
  index: Number,
  content: String,
});

const syllabusSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalName: { type: String },
    mimeType: { type: String },

    text: { type: String, required: true },

    chunks: [chunkSchema],

    topics: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Syllabus", syllabusSchema);
