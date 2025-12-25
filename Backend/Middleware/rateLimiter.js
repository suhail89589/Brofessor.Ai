import rateLimit from "express-rate-limit";

export const askLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 20, 
  message: {
    error: "Easy bro 😅 You’ve reached the limit. Try again in some time.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
