export const extractTopicsFromText = (text) => {
  if (!text) return [];

  const words = text
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3);

  const freq = {};
  words.forEach((w) => {
    freq[w.toLowerCase()] = (freq[w.toLowerCase()] || 0) + 1;
  });

  const topics = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));

  return topics;
};
