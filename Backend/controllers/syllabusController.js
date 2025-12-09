// src/controllers/syllabusController.js
import Syllabus from "../Models/syllabusModel.js";
import { cleanText } from "../utils/textCleaner.js";
import { createChunks } from "../utils/chunker.js";
import { extractTopicsFromText } from "../utils/topicExtractor.js";

export const pasteSyllabus = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "Syllabus text is required" });
    }

    // Process text
    const cleaned = cleanText(text);
    const chunks = createChunks(cleaned, 1200, 200);
    const topics = extractTopicsFromText(cleaned);

    const syllabus = await Syllabus.create({
      user: req.user.id,
      originalName: "Pasted Syllabus",
      mimeType: "text/plain",
      text: cleaned,
      topics,
      chunks,
    });

    return res.status(200).json({
      message: "Syllabus processed successfully",
      syllabusId: syllabus._id,
      text: cleaned,
      topics,
    });
  } catch (error) {
    console.error("Paste Syllabus Error:", error);
    return res.status(500).json({
      message: "Server error while processing syllabus",
    });
  }
};
export const getLatestSyllabus = async (req, res) => {
  try {
    const latest = await Syllabus.findOne({ user: req.user.id }).sort({
      createdAt: -1,
    });

    if (!latest) return res.status(404).json({ message: "No syllabus found" });

    res.status(200).json({ syllabus: latest });
  } catch (error) {
    console.error("Latest syllabus error:", error);
    res.status(500).json({ message: "Failed to fetch syllabus" });
  }
};
