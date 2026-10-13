import rawData from "./knowledge.json";

export interface KnowledgeChunk {
  id: string;
  category: string;
  title: string;
  content: string;
  embedding?: number[];
}

interface KnowledgeBase {
  vocabulary: string[];
  chunks: KnowledgeChunk[];
}

const kb = rawData as unknown as KnowledgeBase;
const vocabIndex = new Map<string, number>(kb.vocabulary.map((w, i) => [w, i]));

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "that", "this", "are", "who", "from", "has", "have",
  "you", "can", "our", "all", "was", "were", "been", "will", "what", "how", "when",
  "where", "why", "which", "about", "into", "their", "them", "then", "there", "some",
  "yang", "dan", "untuk", "dari", "ini", "itu", "pada", "adalah", "b401"
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .map((w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w))
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

export function searchRelevantChunks(query: string, topK: number = 3): KnowledgeChunk[] {
  const tokens = tokenize(query);

  const qVec = new Array(kb.vocabulary.length).fill(0);
  let matched = 0;
  for (const t of tokens) {
    const pos = vocabIndex.get(t);
    if (pos !== undefined) {
      qVec[pos] += 1;
      matched++;
    }
  }

  // If no specific vocab words match, return general lab chunks
  if (matched === 0) {
    return kb.chunks.slice(0, topK);
  }

  // Normalize query vector
  const mag = Math.sqrt(qVec.reduce((sum, v) => sum + v * v, 0)) || 1;
  const normQ = qVec.map((v) => v / mag);

  // Compute cosine similarity (chunks are already unit-normalized)
  const scored = kb.chunks.map((chunk) => {
    let score = 0;
    if (chunk.embedding) {
      for (let i = 0; i < normQ.length; i++) {
        const qVal = normQ[i];
        const cVal = chunk.embedding[i];
        if (qVal !== undefined && cVal !== undefined && qVal > 0 && cVal > 0) {
          score += qVal * cVal;
        }
      }
    }
    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map((s) => s.chunk);
}
