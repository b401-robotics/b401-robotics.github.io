import type { KnowledgeChunk } from "./vectorSearch";
import { SYSTEM_INSTRUCTION } from "./gemini";

const RELAYER_MODELS = [
  "deepseek-v4.1-flash",
];

export async function askRelayer(
  prompt: string,
  contextChunks: KnowledgeChunk[],
  apiKey?: string
): Promise<{ answer: string; modelUsed: string } | null> {
  const trimmedKey = apiKey?.trim();
  if (!trimmedKey) {
    return null;
  }

  const contextText = contextChunks
    .map((c, i) => `=== [SOURCE ${i + 1}: ${c.title} (${c.category})] ===\n${c.content}`)
    .join("\n\n");

  const userContent = `Lab Documentation Context:\n${contextText}\n\nUser Question:\n${prompt}`;

  for (const model of RELAYER_MODELS) {
    try {
      const res = await fetch("https://api.relayer.id/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${trimmedKey}`,
        },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content: SYSTEM_INSTRUCTION,
            },
            {
              role: "user",
              content: userContent,
            },
          ],
          temperature: 0.3,
          max_tokens: 800,
        }),
      });

      if (res.status === 429 || res.status >= 500) {
        console.warn(`Relayer model ${model} unavailable (HTTP ${res.status}), trying next model...`);
        continue;
      }

      if (!res.ok) {
        const errorText = await res.text();
        console.warn(`Relayer model ${model} error (HTTP ${res.status}): ${errorText}`);
        continue;
      }

      const data = (await res.json()) as {
        choices?: Array<{
          message?: {
            content?: string;
          };
        }>;
      };

      const text = data.choices?.[0]?.message?.content;
      if (text) {
        return {
          answer: text.trim(),
          modelUsed: model,
        };
      }
    } catch (err) {
      console.warn(`Relayer call to ${model} failed or timed out:`, err);
    }
  }

  console.warn("All Relayer models failed or timed out.");
  return null;
}
