import rawData from "./knowledge.json";

export interface KnowledgeChunk {
  id: string;
  category: string;
  title: string;
  content: string;
  aliases?: string;
  embedding?: number[];
}

interface KnowledgeBase {
  chunks: KnowledgeChunk[];
}

const kb = rawData as unknown as KnowledgeBase;

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "that", "this", "are", "who", "from", "has", "have",
  "you", "can", "our", "all", "was", "were", "been", "will", "what", "how", "when",
  "where", "why", "which", "about", "into", "their", "them", "then", "there", "some",
  "yang", "dan", "untuk", "dari", "ini", "itu", "pada", "adalah", "b401", "apa", "saja"
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .map((w) => {
      // Irregular plural normalization
      if (w === "theses") return "thesi";
      if (w === "thesis") return "thesi";
      if (w.length > 3 && w.endsWith("s")) return w.slice(0, -1);
      return w;
    })
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

// Levenshtein distance for typo tolerance
function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  if (Math.abs(a.length - b.length) > 2) return 3;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0]![j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i]![j] = matrix[i - 1]![j - 1]!;
      } else {
        matrix[i]![j] = Math.min(
          matrix[i - 1]![j - 1]! + 1,
          matrix[i]![j - 1]! + 1,
          matrix[i - 1]![j]! + 1
        );
      }
    }
  }
  return matrix[b.length]![a.length]!;
}

interface IndexedChunk {
  chunk: KnowledgeChunk;
  postings: Map<string, number>;
  terms: string[];
}

// Build sparse TF postings index at worker startup (once per isolate)
const index: IndexedChunk[] = (kb.chunks || []).map((chunk) => {
  const titleTokens = tokenize(chunk.title);
  const aliasTokens = tokenize(chunk.aliases || "");
  const contentTokens = tokenize(chunk.content);
  const termCounts = new Map<string, number>();

  // Title terms boosted 4x
  for (const t of titleTokens) {
    termCounts.set(t, (termCounts.get(t) || 0) + 4);
  }
  // Bilingual aliases boosted 3x
  for (const t of aliasTokens) {
    termCounts.set(t, (termCounts.get(t) || 0) + 3);
  }
  // Body content 1x
  for (const t of contentTokens) {
    termCounts.set(t, (termCounts.get(t) || 0) + 1);
  }

  let sumSq = 0;
  for (const count of termCounts.values()) {
    sumSq += count * count;
  }
  const mag = Math.sqrt(sumSq) || 1;

  const postings = new Map<string, number>();
  for (const [term, count] of termCounts.entries()) {
    postings.set(term, count / mag);
  }

  return { chunk, postings, terms: Array.from(postings.keys()) };
});

const AGGREGATION_WORDS = new Set([
  "all", "every", "list", "semua", "daftar", "seluruh", "kumpulan", "roster", "batch"
]);

// Fallback search: Option 1 (bilingual aliases) + Option 2 (typo tolerance)
export function searchKeywordChunks(query: string, topK: number = 6): KnowledgeChunk[] {
  const rawTokens = tokenize(query);

  if (rawTokens.length === 0) {
    return kb.chunks.slice(0, topK);
  }

  const isAggregation = rawTokens.some((t) => AGGREGATION_WORDS.has(t));

  const queryTerms = new Map<string, number>();
  for (const t of rawTokens) {
    queryTerms.set(t, (queryTerms.get(t) || 0) + 1);
  }

  let sumSq = 0;
  for (const count of queryTerms.values()) {
    sumSq += count * count;
  }
  const mag = Math.sqrt(sumSq) || 1;

  const queryWeights = new Map<string, number>();
  for (const [term, count] of queryTerms.entries()) {
    queryWeights.set(term, count / mag);
  }

  const scored: Array<{ chunk: KnowledgeChunk; score: number }> = [];

  for (const item of index) {
    let score = 0;

    for (const [qTerm, qWeight] of queryWeights.entries()) {
      // 1. Exact match
      const cWeight = item.postings.get(qTerm);
      if (cWeight !== undefined) {
        score += qWeight * cWeight;
        continue;
      }

      // 2. Typo tolerance: Levenshtein distance <= 1 for 4-5 letter words, <= 2 for 6+ letters
      const maxDist = qTerm.length >= 6 ? 2 : qTerm.length >= 4 ? 1 : 0;
      if (maxDist > 0) {
        for (const cTerm of item.terms) {
          if (Math.abs(cTerm.length - qTerm.length) <= maxDist) {
            if (levenshtein(qTerm, cTerm) <= maxDist) {
              score += qWeight * (item.postings.get(cTerm) || 0) * 0.8; // 20% discount for typo
              break;
            }
          }
        }
      }
    }

    // Boost overview chunks if user asks aggregation query
    if (isAggregation && item.chunk.id.includes("overview")) {
      score *= 2.5;
    }

    if (score > 0) {
      scored.push({ chunk: item.chunk, score });
    }
  }

  if (scored.length === 0) {
    return kb.chunks.slice(0, topK);
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map((s) => s.chunk);
}

// Fetch embedding from Gemini API (embedding-2-preview -> embedding-001)
async function fetchQueryEmbedding(query: string, apiKey: string): Promise<number[] | null> {
  const models = ["gemini-embedding-2-preview", "gemini-embedding-001"];
  for (const m of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:embedContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(4000), // 4s timeout for embedding
        body: JSON.stringify({
          content: { parts: [{ text: query }] },
          outputDimensionality: 256,
        }),
      });

      if (res.ok) {
        const data = (await res.json()) as { embedding?: { values?: number[] } };
        if (data.embedding?.values && data.embedding.values.length > 0) {
          const vals = data.embedding.values;
          let sumSq = 0;
          for (const v of vals) sumSq += v * v;
          const mag = Math.sqrt(sumSq) || 1;
          return vals.map((v) => v / mag);
        }
      }
    } catch {
      // try next model
    }
  }
  return null;
}

// Main search: attempts Gemini Embedding first, cascades to offline bilingual+typo search
export async function searchRelevantChunks(
  query: string,
  topK: number = 6,
  geminiApiKey?: string
): Promise<KnowledgeChunk[]> {
  const trimmedKey = geminiApiKey?.trim();

  // Check if chunks have pre-computed embeddings
  const hasEmbeddings = kb.chunks.some((c) => Array.isArray(c.embedding) && c.embedding.length > 0);

  if (trimmedKey && hasEmbeddings) {
    try {
      const queryVec = await fetchQueryEmbedding(query, trimmedKey);
      if (queryVec) {
        // In-memory flat cosine similarity scan against pre-computed vectors
        const scored: Array<{ chunk: KnowledgeChunk; score: number }> = [];

        for (const chunk of kb.chunks) {
          if (chunk.embedding && chunk.embedding.length === queryVec.length) {
            let dot = 0;
            for (let i = 0; i < queryVec.length; i++) {
              dot += queryVec[i]! * chunk.embedding[i]!;
            }
            if (dot > 0) {
              scored.push({ chunk, score: dot });
            }
          }
        }

        if (scored.length > 0) {
          scored.sort((a, b) => b.score - a.score);
          return scored.slice(0, topK).map((s) => s.chunk);
        }
      }
    } catch (err) {
      console.warn("Gemini embedding search failed, falling back to offline keyword search:", err);
    }
  }

  // Fallback: Option 1 (bilingual aliases) + Option 2 (typo tolerance)
  return searchKeywordChunks(query, topK);
}
