# B401 Lab Chatbot — API & Backend Setup Guide

This guide explains how to configure, run locally, and deploy the B401 Laboratory internal Q&A Chatbot backend on **Cloudflare Workers** (100% Free Tier, zero maintenance cost).

---

## 1. Prerequisites & API Keys

### 1.1 Google AI Studio API Key (Primary Provider)

1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click **"Get API key"** and create a key (Free Tier).
4. Save this key as `GEMINI_API_KEY`.
   > The backend prioritizes Google Gemini models (`gemini-3.1-flash-lite` → `gemini-3-flash-preview` → `gemini-3.5-flash-lite` → `gemini-3.1-flash-lite-preview`). If Gemini is unavailable or rate-limited, it automatically falls back to Relayer.

### 1.2 Relayer API Key (Fallback Provider)

1. Obtain your API key from [Relayer](https://relayer.id/).
2. Save this key as `RELAYER_API_KEY`.
   > Serves as the backup provider running `deepseek-v4.1-flash`.

### 1.3 TypeSafe AI Jev Guardrail API Key (Optional)

1. Visit [TypeSafe AI](https://typesafe.ai/).
2. Obtain a free API key for the **Jev System One** screening service.
3. Save this key as `TYPESAFE_API_KEY`.
   > _Note:_ If omitted, the worker automatically runs built-in local heuristic regex filters for prompt injection and abuse prevention.

---

## 2. Knowledge Base Generation

The knowledge base extracts all lab contents from `src/contents/` into granular per-item chunks (theses, projects, achievements, facilities, people, practicums, research areas).

To refresh or regenerate the knowledge base whenever you update website contents:

```bash
bun run sync:knowledge
```

This outputs:

- Clean per-item knowledge chunks in `services/chatbot-worker/src/knowledge.json`
- Content Editor (`bun run tools/content-editor`) also calls this automatically whenever a section is saved.

---

## 3. Local Development & Testing

You can run the backend worker locally on your machine without deploying:

### 3.1 Install Dependencies

```bash
cd services/chatbot-worker
bun install
```

### 3.2 Configure Local Environment Variables

Create a file named `services/chatbot-worker/.dev.vars` (this file is ignored by git):

```env
RELAYER_API_KEY=your_relayer_api_key_here
GEMINI_API_KEY=your_actual_gemini_api_key_here
TYPESAFE_API_KEY=your_optional_typesafe_key_here
```

### 3.3 Start the Worker Local Server

```bash
bun run dev
```

The worker starts at `http://127.0.0.1:8787`.

### 3.4 Test with `curl`

```bash
curl -X POST http://127.0.0.1:8787/api/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "What research areas does B401 lab focus on?"}'
```

Expected JSON response:

```json
{
  "answer": "B401 Laboratory focuses on Autonomous Systems & Robotics, Embedded Systems & IoT, and Intelligent Systems...",
  "model": "gpt-5.6-luna",
  "sources": [
    {
      "id": "research-areas",
      "title": "Research Focus & Areas of Expertise",
      "category": "Research"
    }
  ]
}
```

---

## 4. Deploying to Cloudflare Workers (Free Tier)

Cloudflare Workers provides 100,000 requests per day for free with a hard daily quota cutoff (it will never charge your credit card).

### 4.1 Login to Cloudflare

From `services/chatbot-worker`:

```bash
bunx wrangler login
```

A browser window will open to authorize the Wrangler CLI with your Cloudflare account.

### 4.2 Set Production Secrets

Store your API keys encrypted in Cloudflare's secret manager:

```bash
bunx wrangler secret put GEMINI_API_KEY
# (Primary) Paste your Gemini API key when prompted

bunx wrangler secret put RELAYER_API_KEY
# (Fallback) Paste your Relayer API key when prompted

bunx wrangler secret put TYPESAFE_API_KEY
# (Optional) Paste your TypeSafe key when prompted
```

### 4.3 Deploy

Whenever lab content is modified, always regenerate the knowledge base first so the deployed worker bundles the latest chunks:

```bash
# 1. Regenerate knowledge chunks from src/contents/
bun run sync:knowledge

# 2. Commit updated knowledge
git add services/chatbot-worker/src/knowledge.json
git commit -m "sync chatbot knowledge base"

# 3. Deploy worker to Cloudflare
cd services/chatbot-worker
bunx wrangler deploy
```

Upon successful deployment, Wrangler will print your public worker URL:

```text
Uploaded b401-chatbot (1.80 sec)
Deployed b401-chatbot triggers (0.35 sec)
  https://b401-chatbot.<your-subdomain>.workers.dev
```

---

## 5. Connecting the Website Frontend

In the project root (`/`), configure the environment variable to connect the frontend to your deployed worker:

### 5.1 Create `.env.local` in project root:

```env
VITE_CHATBOT_API_URL=https://b401-chatbot.<your-subdomain>.workers.dev/api/chat
```

_(During local development, you can point it to `http://127.0.0.1:8787/api/chat`)_

### 5.2 Build the Frontend

```bash
bun run build
```

The Chatbot component on the Home tab will automatically send requests to your configured endpoint.

---

## 6. Architecture & Safety Summary

```
User Question (Max 500 chars)
  │
  ▼
[ChatbotSection.tsx] (Home Tab UI)
  │ POST /api/chat
  ▼
[Cloudflare Worker] (services/chatbot-worker)
  │
  ├─► 1. Guardrails Check: TypeSafe Jev API + Regex injection screen
  │      (Rejects malicious prompts or prompts > 500 chars)
  │
  ├─► 2. Offline Vector Search: Cosine similarity in-memory (< 1ms)
  │      (Picks top 3 relevant chunks from knowledge.json)
  │
  └─► 3. Google AI Studio: Free Gemini API
         (Multi-model fallback: 3.5-flash-lite -> 3.1-flash-lite -> 2.5-flash-lite)
```
