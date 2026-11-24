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
  embeddingModel?: string;
  chunks: KnowledgeChunk[];
}

const kb = rawData as unknown as KnowledgeBase;

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "that", "this", "are", "who", "from", "has", "have",
  "you", "can", "our", "all", "was", "were", "been", "will", "what", "how", "when",
  "where", "why", "which", "about", "into", "their", "them", "then", "there", "some",
  "yang", "dan", "untuk", "dari", "ini", "itu", "pada", "adalah", "b401", "apa", "saja"
]);

function normalizeWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function tokenize(text: string): string[] {
  return normalizeWords(text)
    .map((w) => {
      // Irregular plural normalization
      if (w === "theses") return "thesi";
      if (w === "thesis") return "thesi";
      if (w.length > 3 && w.endsWith("s")) return w.slice(0, -1);
      return w;
    })
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

// Reusable 1D buffers for bounded Levenshtein distance (avoids per-call allocations)
let prevRow = new Uint8Array(64);
let currRow = new Uint8Array(64);

function levenshtein(a: string, b: string, maxDist: number): number {
  if (a === b) return 0;
  const alen = a.length;
  const blen = b.length;
  if (Math.abs(alen - blen) > maxDist) return maxDist + 1;
  if (alen === 0) return blen;
  if (blen === 0) return alen;

  // Keep shorter string as columns so buffers stay compact
  if (alen > blen) {
    const tmp = a;
    a = b;
    b = tmp;
  }
  const shortLen = a.length;
  const longLen = b.length;

  if (prevRow.length < shortLen + 1) {
    prevRow = new Uint8Array(shortLen + 16);
    currRow = new Uint8Array(shortLen + 16);
  }

  for (let j = 0; j <= shortLen; j++) prevRow[j] = j;

  for (let i = 1; i <= longLen; i++) {
    currRow[0] = i;
    let rowMin = i;
    const bChar = b.charCodeAt(i - 1);

    for (let j = 1; j <= shortLen; j++) {
      const cost = a.charCodeAt(j - 1) === bChar ? 0 : 1;
      const val = Math.min(
        prevRow[j]! + 1,
        currRow[j - 1]! + 1,
        prevRow[j - 1]! + cost
      );
      currRow[j] = val;
      if (val < rowMin) rowMin = val;
    }

    if (rowMin > maxDist) return maxDist + 1;
    const swap = prevRow;
    prevRow = currRow;
    currRow = swap;
  }

  return prevRow[shortLen]!;
}

interface Posting {
  chunkIdx: number;
  weight: number;
}

interface SearchIndex {
  postings: Map<string, Posting[]>;
  idf: Map<string, number>;
  vocabTerms: string[];
}

let searchIndex: SearchIndex | null = null;

// Build inverted postings + IDF index lazily on first offline keyword search
function getSearchIndex(): SearchIndex {
  if (searchIndex) return searchIndex;

  const chunks = kb.chunks || [];
  const postings = new Map<string, Posting[]>();
  const docFreq = new Map<string, number>();

  for (let chunkIdx = 0; chunkIdx < chunks.length; chunkIdx++) {
    const chunk = chunks[chunkIdx]!;
    const termCounts = new Map<string, number>();

    for (const t of tokenize(chunk.title)) {
      termCounts.set(t, (termCounts.get(t) || 0) + 4);
    }
    for (const t of tokenize(chunk.aliases || "")) {
      termCounts.set(t, (termCounts.get(t) || 0) + 3);
    }
    for (const t of tokenize(chunk.content)) {
      termCounts.set(t, (termCounts.get(t) || 0) + 1);
    }

    let sumSq = 0;
    for (const count of termCounts.values()) {
      sumSq += count * count;
    }
    const mag = Math.sqrt(sumSq) || 1;

    for (const [term, count] of termCounts.entries()) {
      docFreq.set(term, (docFreq.get(term) || 0) + 1);
      let list = postings.get(term);
      if (!list) {
        list = [];
        postings.set(term, list);
      }
      list.push({ chunkIdx, weight: count / mag });
    }
  }

  const N = chunks.length || 1;
  const idf = new Map<string, number>();
  for (const [term, df] of docFreq.entries()) {
    idf.set(term, Math.log((N + 1) / (df + 1)) + 1);
  }

  searchIndex = {
    postings,
    idf,
    vocabTerms: Array.from(postings.keys()),
  };
  return searchIndex;
}

const AGGREGATION_WORDS = new Set([
  "all", "every", "list", "semua", "daftar", "seluruh", "kumpulan", "roster", "batch"
]);

// Fallback search: Option 1 (bilingual aliases) + Option 2 (bounded typo tolerance + IDF)
export function searchKeywordChunks(query: string, topK: number = 6): KnowledgeChunk[] {
  const chunks = kb.chunks || [];
  if (chunks.length === 0) return [];

  // Check aggregation words before stop-word removal (e.g. "all" is in STOP_WORDS)
  const rawWords = normalizeWords(query);
  const isAggregation = rawWords.some((w) => AGGREGATION_WORDS.has(w));

  const rawTokens = tokenize(query);
  if (rawTokens.length === 0) {
    return chunks.slice(0, topK);
  }

  const queryTerms = new Map<string, number>();
  for (const t of rawTokens) {
    queryTerms.set(t, (queryTerms.get(t) || 0) + 1);
  }

  let sumSq = 0;
  for (const count of queryTerms.values()) {
    sumSq += count * count;
  }
  const mag = Math.sqrt(sumSq) || 1;

  const { postings, idf, vocabTerms } = getSearchIndex();
  const scores = new Float64Array(chunks.length);
  let fuzzyChecks = 0;

  for (const [qTerm, count] of queryTerms.entries()) {
    const qWeight = count / mag;

    // 1. Exact match via inverted index
    const exactList = postings.get(qTerm);
    if (exactList) {
      const termIdf = idf.get(qTerm) || 1;
      for (const p of exactList) {
        scores[p.chunkIdx] = (scores[p.chunkIdx] ?? 0) + qWeight * p.weight * termIdf;
      }
      continue;
    }

    // 2. Typo tolerance: scan unique global vocab once per missed token (capped at 15)
    if (fuzzyChecks >= 15) continue;
    const maxDist = qTerm.length >= 6 ? 2 : qTerm.length >= 4 ? 1 : 0;
    if (maxDist === 0) continue;
    fuzzyChecks++;

    let bestTerm: string | null = null;
    let bestDist = maxDist + 1;
    let bestIdf = 0;

    for (const cTerm of vocabTerms) {
      if (Math.abs(cTerm.length - qTerm.length) > maxDist) continue;
      const dist = levenshtein(qTerm, cTerm, maxDist);
      if (dist <= maxDist) {
        const cIdf = idf.get(cTerm) || 1;
        if (dist < bestDist || (dist === bestDist && cIdf > bestIdf)) {
          bestDist = dist;
          bestTerm = cTerm;
          bestIdf = cIdf;
        }
      }
    }

    if (bestTerm) {
      const discount = bestDist === 1 ? 0.85 : 0.7;
      const fuzzyList = postings.get(bestTerm)!;
      for (const p of fuzzyList) {
        scores[p.chunkIdx] = (scores[p.chunkIdx] ?? 0) + qWeight * p.weight * bestIdf * discount;
      }
    }
  }

  const scored: Array<{ chunk: KnowledgeChunk; score: number }> = [];
  for (let i = 0; i < chunks.length; i++) {
    let score = scores[i] ?? 0;
    if (score <= 0) continue;
    const chunk = chunks[i]!;
    if (isAggregation && chunk.id.includes("overview")) {
      score *= 2.5;
    }
    scored.push({ chunk, score });
  }

  if (scored.length === 0) {
    return chunks.slice(0, topK);
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map((s) => s.chunk);
}

// Fetch embedding from Gemini API matching the pre-computed knowledge base model
async function fetchQueryEmbedding(
  query: string,
  apiKey: string,
  model: string
): Promise<number[] | null> {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedContent`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      signal: AbortSignal.timeout(4000),
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
    } else {
      const errBody = (await res.text().catch(() => "")).slice(0, 200);
      console.warn(`Gemini embedding ${model} HTTP ${res.status}: ${errBody}`);
    }
  } catch (err) {
    console.warn(`Gemini embedding ${model} request failed:`, err);
  }
  return null;
}

// Main search: attempts Gemini Embedding matching kb.embeddingModel, cascades to offline keyword search
export async function searchRelevantChunks(
  query: string,
  topK: number = 6,
  geminiApiKey?: string
): Promise<KnowledgeChunk[]> {
  const trimmedKey = geminiApiKey?.trim();
  const hasEmbeddings = kb.chunks.some((c) => Array.isArray(c.embedding) && c.embedding.length > 0);
  const embeddingModel = kb.embeddingModel || "gemini-embedding-2";

  if (trimmedKey && hasEmbeddings) {
    try {
      const queryVec = await fetchQueryEmbedding(query, trimmedKey, embeddingModel);
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

  return searchKeywordChunks(query, topK);
}
