import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing in .env");
  process.exit(1);
}

// Initialize Gemini client
export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Utility helper to call model easily
export const getGeminiModel = (model = "gemini-2.5-pro") => {
  return genAI.getGenerativeModel({
    model,
  });
};
