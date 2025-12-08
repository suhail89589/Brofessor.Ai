export const createChunks = (text, chunkSize = 1200, overlap = 200) => {
  if (!text) return [];

  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);

    chunks.push({
      index: chunks.length + 1,
      content: text.slice(start, end),
    });

    // If text is smaller than chunk size → break to avoid infinite loop
    if (end === text.length) break;

    start += chunkSize - overlap;
  }

  return chunks;
};
