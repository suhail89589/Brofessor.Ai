export const getRelevantChunks = (question, chunks) => {
  if (!question || !chunks) return [];

  const q = question.toLowerCase();

  // Safely convert Mongoose documents to plain JS objects if necessary
  const plainChunks = chunks.map((c) =>
    typeof c.toObject === "function" ? c.toObject() : c
  );

  const scored = plainChunks
    .map((c) => ({
      ...c,
      score: c.content && c.content.toLowerCase().includes(q) ? 1 : 0,
    }))
    .filter((c) => c.score > 0);

  return scored.length > 0 ? scored : plainChunks.slice(0, 3);
};

