export const getRelevantChunks = (question, chunks) => {
  if (!question || !chunks) return [];

  const q = question.toLowerCase();

  const scored = chunks
    .map((c) => ({
      ...c,
      score: c.content.toLowerCase().includes(q) ? 1 : 0,
    }))
    .filter((c) => c.score > 0);

  return scored.length > 0 ? scored : chunks.slice(0, 3);
};
