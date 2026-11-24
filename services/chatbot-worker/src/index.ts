import { Hono } from "hono";
import { cors } from "hono/cors";
import { validateWithJevGuardrails } from "./guardrails";
import { searchRelevantChunks } from "./vectorSearch";
import { askRelayer } from "./relayer";
import { askGemini } from "./gemini";

type Bindings = {
  RELAYER_API_KEY?: string;
  GEMINI_API_KEY?: string;
  TYPESAFE_API_KEY?: string;
  MAX_PROMPT_LENGTH?: string;
  CHAT_RATE_LIMITER?: RateLimit;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS - restrict to lab domain and local dev ports
function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return true;
  if (origin === "https://b401-robotics.github.io") return true;
  try {
    const url = new URL(origin);
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

app.use(
  "*",
  cors({
    origin: (origin) => (isAllowedOrigin(origin) ? origin : ""),
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
    if (c.env?.CHAT_RATE_LIMITER) {
      const ip =
        c.req.header("CF-Connecting-IP") ||
        c.req.header("X-Forwarded-For")?.split(",")[0]?.trim() ||
        "unknown";
      const { success } = await c.env.CHAT_RATE_LIMITER.limit({ key: ip });
      if (!success) {
        return c.json(
          { error: "Too many requests. Please wait a minute and try again." },
          429
        );
      }
    }

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
    const guardrail = await validateWithJevGuardrails(prompt, c.env?.TYPESAFE_API_KEY, maxLen);
    if (!guardrail.passed) {
      if (guardrail.unavailable) {
        return c.json(
          { error: guardrail.reason || "Service temporarily unavailable." },
          503
        );
      }
      return c.json({
        answer:
          guardrail.reason || "Please only ask topics related to this Laboratory.",
        flagged: true,
        sources: [],
      });
    }

    // 2. In-Worker Vector Similarity Search (Gemini Embedding with offline fallback)
    const relevantChunks = await searchRelevantChunks(prompt, 6, c.env?.GEMINI_API_KEY);

    // 3. Multi-Provider Generation (Gemini prioritized, Relayer fallback) under shared deadline
    const deadlineMs = Date.now() + 18000;
    let result = await askGemini(prompt, relevantChunks, c.env?.GEMINI_API_KEY, deadlineMs);

    if (!result) {
      result = await askRelayer(prompt, relevantChunks, c.env?.RELAYER_API_KEY, deadlineMs);
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
