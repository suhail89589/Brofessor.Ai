export const cleanText = (text) => {
  if (!text) return "";

  return text
    .replace(/\r/g, " ")
    .replace(/\n+/g, "\n")
    .replace(/\t+/g, " ")
    .replace(/\s\s+/g, " ")
    .replace(/[^\S\r\n]+/g, " ")
    .trim();
};
