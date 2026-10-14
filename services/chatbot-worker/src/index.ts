import { Hono } from "hono";
import { cors } from "hono/cors";
import { validateWithJevGuardrails } from "./guardrails";
import { searchRelevantChunks } from "./vectorSearch";
import { askCodeCraft } from "./codecraft";
import { askGemini } from "./gemini";

type Bindings = {
  CODECRAFT_API_KEY?: string;
  GEMINI_API_KEY?: string;
  TYPESAFE_API_KEY?: string;
  MAX_PROMPT_LENGTH?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (c) => {
  return c.json({
    service: "B401 Robotics Laboratory Chatbot Service",
    status: "online",
  });
});

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.post("/api/chat", async (c) => {
  try {
    const body = await c.req.json().catch(() => null);
    if (!body || typeof body.prompt !== "string") {
      return c.json(
        { error: "Invalid request payload. Please provide a 'prompt' string." },
        400
      );
    }

    const prompt = body.prompt.trim();
    const maxLen = Number(c.env?.MAX_PROMPT_LENGTH) || 500;

    if (!prompt) {
      return c.json({ error: "Prompt cannot be empty." }, 400);
    }

    if (prompt.length > maxLen) {
      return c.json(
        { error: `Prompt length exceeds maximum allowed limit of ${maxLen} characters.` },
        400
      );
    }

    // 1. Guardrail inspection (TypeSafe Jev + Local heuristics)
    const guardrail = await validateWithJevGuardrails(prompt, c.env?.TYPESAFE_API_KEY);
    if (!guardrail.passed) {
      return c.json({
        answer:
          guardrail.reason || "Please only ask topics related to this Laboratory.",
        flagged: true,
        sources: [],
      });
    }

    // 2. In-Worker Vector Similarity Search
    const relevantChunks = searchRelevantChunks(prompt, 3);

    // 3. Multi-Provider Generation (Gemini prioritized, CodeCraft fallback)
    let result = await askGemini(prompt, relevantChunks, c.env?.GEMINI_API_KEY);

    if (!result) {
      result = await askCodeCraft(prompt, relevantChunks, c.env?.CODECRAFT_API_KEY);
    }

    if (!result) {
      result = {
        answer:
          "All AI services are temporarily busy. Please try again in a few moments.",
        modelUsed: "service-fallback",
      };
    }

    return c.json({
      answer: result.answer,
      model: result.modelUsed,
      sources: relevantChunks.map((c) => ({
        id: c.id,
        title: c.title,
        category: c.category,
      })),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Chatbot worker error:", err);
    return c.json({ error: message }, 500);
  }
});

export default app;
