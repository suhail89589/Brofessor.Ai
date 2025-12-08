// src/controllers/chatController.js
import Syllabus from "../Models/syllabusModel.js";
import { getRelevantChunks } from "../utils/chunkRetriever.js";
import { buildChatPrompt } from "../utils/chatPrompt.js";
import { generateAIResponse } from "../utils/aiClient.js";

export const askTutor = async (req, res) => {
  try {
    const { question, syllabusId } = req.body;
    const userId = req.user.id;

    if (!question)
      return res.status(400).json({ message: "Question is required" });

    let context = "";

    if (syllabusId) {
      const syllabus = await Syllabus.findOne({
        _id: syllabusId,
        user: userId,
      });
      if (syllabus) {
        const chunks = getRelevantChunks(question, syllabus.chunks);
        context = chunks.map((c) => c.content).join("\n\n");
      }
    }

    const prompt = buildChatPrompt(question, context);
    const reply = await generateAIResponse(prompt);

    return res.status(200).json({ answer: reply });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({ message: "Chat request failed" });
  }
};
