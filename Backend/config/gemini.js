import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY missing in environment variables. Gemini service will be unavailable.");
}

// Initialize Gemini client
export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Utility helper to call model easily
export const getGeminiModel = (model = "gemini-2.5-pro") => {
  return genAI.getGenerativeModel({
    model,
  });
};
