import Groq from "groq-sdk";
import dotenv from "dotenv";
import { AI_PERSONALITY } from "./Personality.js";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateAIResponse = async (prompt) => {
  try {
    const completion = await groq.chat.completions.create({
      
      model: "openai/gpt-oss-120b", 
      messages: [
        {
          role: "system",
          content: AI_PERSONALITY,
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.85,
      max_tokens: 900,
      top_p: 0.9,
    });

    const reply = completion?.choices?.[0]?.message?.content;

    return reply || "Bruh... I think my brain lagged 😭. Try again.";
  } catch (err) {
    console.error("❌ Groq AI Error:", err);
    return "Bro I'm lagging 💀... Try again.";
  }
};