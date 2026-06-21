import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = ["JWT_SECRET", "MONGO_URI", "GROQ_API_KEY"];

console.log("=========================================");
console.log("  ENVIRONMENT VARIABLES STARTUP CHECK  ");
console.log("=========================================");

let hasMissing = false;

requiredEnvVars.forEach((envVar) => {
  const isLoaded = !!process.env[envVar];
  console.log(`${envVar} loaded: ${isLoaded}`);
  if (!isLoaded) {
    hasMissing = true;
  }
});

console.log("=========================================");

if (hasMissing) {
  throw new Error("FATAL: Missing one or more required environment variables! Server shutdown initiated.");
}
