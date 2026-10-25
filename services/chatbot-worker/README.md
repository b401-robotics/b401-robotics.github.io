# B401 Chatbot Worker

Cloudflare Worker backend service for the B401 Robotics Laboratory AI Assistant.

- Built with [Hono](https://hono.dev/)
- 100% Free Tier on Cloudflare Workers
- Zero external vector database cost (offline in-memory TF-IDF vector similarity)
- TypeSafe Jev guardrails for prompt safety
- Google AI Studio (Gemini) primary provider (`gemini-3.1-flash-lite`, `gemini-3-flash-preview`, `gemini-3.5-flash-lite`, `gemini-3.1-flash-lite-preview`)
- Relayer API fallback provider (`deepseek-v4.1-flash`)

For full setup, local testing, and deployment instructions, see the complete guide:
👉 **[CHATBOT_SETUP.md](../../CHATBOT_SETUP.md)**

## Quick Start

```bash
# 1. Install dependencies
bun install

# 2. Configure local secrets in .dev.vars
echo "GEMINI_API_KEY=your_gemini_key_here" >> .dev.vars
echo "RELAYER_API_KEY=your_relayer_key_here" >> .dev.vars

# 3. Start local development server
bun run dev

# 4. Deploy to Cloudflare Workers
bunx wrangler secret put GEMINI_API_KEY
bunx wrangler secret put RELAYER_API_KEY
bun run deploy
```
