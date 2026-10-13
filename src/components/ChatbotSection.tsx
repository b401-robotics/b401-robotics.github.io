import { useState } from "react";

interface ChatSource {
  id: string;
  title: string;
  category: string;
}

interface ChatResponse {
  answer: string;
  sources?: ChatSource[];
  model?: string;
  flagged?: boolean;
  error?: string;
}

const SUGGESTED_QUESTIONS = [
  "What research areas does B401 focus on?",
  "What equipment is available in TW2-901?",
  "Who are the lecturers and supervisors?",
  "What practicum courses are offered?",
];

declare const __CHATBOT_API_URL__: string | undefined;

const CHATBOT_API_URL =
  typeof __CHATBOT_API_URL__ !== "undefined"
    ? __CHATBOT_API_URL__
    : "https://b401-chatbot.b431.workers.dev/api/chat";

export function ChatbotSection() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastQuestion, setLastQuestion] = useState<string | null>(null);
  const [result, setResult] = useState<ChatResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const characterCount = prompt.length;
  const isOverLimit = characterCount > 500;
  const canSubmit = prompt.trim().length > 0 && !isOverLimit && !loading;

  async function handleSubmit(questionToAsk?: string) {
    const question = (questionToAsk ?? prompt).trim();
    if (!question || question.length > 500 || loading) return;

    setLoading(true);
    setError(null);
    setLastQuestion(question);
    setResult(null);

    try {
      const res = await fetch(CHATBOT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question }),
      });

      const data = (await res.json()) as ChatResponse;

      if (!res.ok) {
        throw new Error(data.error || `Server responded with status ${res.status}`);
      }

      setResult(data);
      if (!questionToAsk) {
        setPrompt("");
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Unable to reach the assistant service. Please verify your connection.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSubmit) {
        void handleSubmit();
      }
    }
  }

  return (
    <section id="chatbot" className="section-padding relative border-t border-zinc-200 dark:border-white/10">
      <div className="max-w-4xl w-full mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            AI Lab Assistant
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 mb-3">
            Ask About B401 Robotics Lab
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-base max-w-xl mx-auto">
            Get instant answers on our research, facilities, equipment, team, and practicums.
            Queries are guarded for lab relevance and processed without saving history.
          </p>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="text-xs text-zinc-500 dark:text-zinc-400 mr-1">Suggestions:</span>
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => {
                setPrompt(q);
                void handleSubmit(q);
              }}
              disabled={loading}
              className="text-xs px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-300/60 dark:border-zinc-700/60 transition-colors disabled:opacity-50 text-left"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Prompt Input Box */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300/80 dark:border-zinc-800 shadow-sm p-4 mb-8">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about B401 Laboratory (e.g., What research projects are underway?)..."
            rows={3}
            maxLength={600}
            disabled={loading}
            className="w-full resize-none bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 text-sm md:text-base focus:outline-none"
          />

          <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <span
              className={`text-xs ${
                isOverLimit
                  ? "text-red-500 font-bold"
                  : characterCount > 450
                  ? "text-amber-500"
                  : "text-zinc-400 dark:text-zinc-500"
              }`}
            >
              {characterCount}/500 chars
            </span>

            <div className="flex items-center gap-2">
              {prompt && (
                <button
                  type="button"
                  onClick={() => setPrompt("")}
                  className="px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => void handleSubmit()}
                disabled={!canSubmit}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <span>Ask Bot</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm mb-6 flex items-start justify-between">
            <div>
              <p className="font-semibold mb-1">Could not complete request</p>
              <p>{error}</p>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-200 text-xs ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Current Q&A Result */}
        {result && (
          <div className="bg-zinc-50 dark:bg-zinc-900/90 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            {lastQuestion && (
              <div className="mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1">
                  Question
                </span>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium text-base">
                  {lastQuestion}
                </p>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
                  {result.flagged ? "Notice" : "Assistant Response"}
                </span>
              </div>

              {/* Formatted Answer Body */}
              <div className="text-zinc-800 dark:text-zinc-200 text-sm md:text-base leading-relaxed whitespace-pre-line space-y-2">
                {result.answer}
              </div>

              {/* Source Badges */}
              {result.sources && result.sources.length > 0 && (
                <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-2">
                    Verified Knowledge Sources:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {result.sources.map((s) => (
                      <span
                        key={s.id}
                        className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        {s.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
