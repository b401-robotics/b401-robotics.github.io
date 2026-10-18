import { useState, type ReactNode } from "react";

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

function renderInlineMarkdown(text: string): ReactNode[] {
  // Regex tokenizes markdown links [text](url), bold/italic combinations (***text***, **text**, *text*), code `code`
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    // Link: [label](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      return (
        <a
          key={idx}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-900 dark:text-zinc-100 underline decoration-zinc-400 hover:decoration-zinc-900 dark:hover:decoration-zinc-100 font-medium break-all"
        >
          {label}
        </a>
      );
    }

    // Bold + Italic: ***text***
    if (part.startsWith("***") && part.endsWith("***") && part.length >= 6) {
      return (
        <strong key={idx} className="font-semibold italic text-zinc-900 dark:text-zinc-100">
          {part.slice(3, -3)}
        </strong>
      );
    }

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={idx} className="font-semibold text-zinc-900 dark:text-zinc-100">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic: *text*
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      return (
        <em key={idx} className="italic text-zinc-800 dark:text-zinc-200">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Inline Code: `code`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono text-[0.88em] border border-zinc-200 dark:border-zinc-700"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return <span key={idx}>{part}</span>;
  });
}

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: ReactNode[] = [];

  let currentList: { ordered: boolean; items: ReactNode[] } | null = null;

  function flushList() {
    if (currentList) {
      const { ordered, items } = currentList;
      const ListTag = ordered ? "ol" : "ul";
      elements.push(
        <ListTag
          key={`list-${elements.length}`}
          className={`space-y-1.5 pl-5 my-2 ${
            ordered
              ? "list-decimal marker:text-zinc-500 dark:marker:text-zinc-400"
              : "list-disc marker:text-zinc-500 dark:marker:text-zinc-400"
          }`}
        >
          {items.map((item, i) => (
            <li key={i} className="pl-1">
              {item}
            </li>
          ))}
        </ListTag>
      );
      currentList = null;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i] ?? "";
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Header 1-4: # Heading
    const headerMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (headerMatch) {
      flushList();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!;
      const inline = renderInlineMarkdown(text);
      if (level === 1) {
        elements.push(
          <h3 key={i} className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-4 mb-2">
            {inline}
          </h3>
        );
      } else if (level === 2) {
        elements.push(
          <h4 key={i} className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mt-3 mb-1.5">
            {inline}
          </h4>
        );
      } else {
        elements.push(
          <h5 key={i} className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-2 mb-1">
            {inline}
          </h5>
        );
      }
      continue;
    }

    // Unordered List: * or -
    const bulletMatch = rawLine.match(/^(\s*)([-*])\s+(.+)$/);
    if (bulletMatch) {
      const text = bulletMatch[3]!;
      const inline = renderInlineMarkdown(text);
      if (!currentList || currentList.ordered) {
        flushList();
        currentList = { ordered: false, items: [inline] };
      } else {
        currentList.items.push(inline);
      }
      continue;
    }

    // Ordered List: 1. or 2.
    const orderedMatch = rawLine.match(/^(\s*)(\d+)\.\s+(.+)$/);
    if (orderedMatch) {
      const text = orderedMatch[3]!;
      const inline = renderInlineMarkdown(text);
      if (!currentList || !currentList.ordered) {
        flushList();
        currentList = { ordered: true, items: [inline] };
      } else {
        currentList.items.push(inline);
      }
      continue;
    }

    // Regular Paragraph
    flushList();
    elements.push(
      <p key={i} className="text-zinc-800 dark:text-zinc-200">
        {renderInlineMarkdown(trimmed)}
      </p>
    );
  }

  flushList();

  return <div className="space-y-2">{elements}</div>;
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
        <header className="mb-10 flex flex-col gap-4 border-b border-zinc-200 pb-8 animate-fade-in md:flex-row md:items-end md:justify-between dark:border-white/10">
          <div>
            <p className="kicker mb-3 flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-900 dark:bg-zinc-100" />
              AI Lab Assistant
            </p>
            <h2 className="section-heading text-4xl md:text-6xl">
              Ask About B401 Robotics Lab
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-zinc-600 md:text-base dark:text-zinc-300">
            Get instant answers on our research, facilities, equipment, team, and practicums.
            Queries are guarded for lab relevance and processed without saving history.
          </p>
        </header>

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
              className="border border-zinc-300 px-3 py-1.5 text-left text-xs text-zinc-600 transition-colors hover:border-zinc-900 hover:text-zinc-900 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Prompt Input Box */}
        <div className="mb-8 border border-zinc-300 bg-white p-4 dark:border-white/10 dark:bg-white/[0.04]">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about B401 Laboratory (e.g., What research projects are underway?)..."
            rows={3}
            maxLength={600}
            disabled={loading}
            className="w-full resize-none bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 text-sm md:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40 dark:focus-visible:ring-zinc-100/40"
          />

          <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <span
              className={`text-xs ${
                isOverLimit
                  ? "text-danger font-bold"
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
                className="inline-flex items-center gap-2 border border-zinc-900 bg-zinc-900 px-5 py-2 font-mono text-xs uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
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
          <div className="surface-danger p-4 text-sm mb-6 flex items-start justify-between">
            <div>
              <p className="font-semibold mb-1">Could not complete request</p>
              <p>{error}</p>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-danger hover:opacity-80 text-xs ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Current Q&A Result */}
        {result && (
          <div className="border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]">
            {lastQuestion && (
              <div className="mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <span className="kicker block mb-1">
                  Question
                </span>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium text-base">
                  {lastQuestion}
                </p>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="kicker">
                  {result.flagged ? "Notice" : "Assistant Response"}
                </span>
              </div>

              {/* Formatted Answer Body */}
              <div className="text-zinc-800 dark:text-zinc-200 text-sm md:text-base leading-relaxed">
                <MarkdownRenderer content={result.answer} />
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
                        className="inline-flex items-center gap-1.5 border border-zinc-300 px-2.5 py-1 text-[11px] text-zinc-600 dark:border-white/15 dark:text-zinc-300"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
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
