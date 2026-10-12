import { useState } from "react";
import { translations } from "../contents/translations";

export function ThesisSection() {
  const t = translations.thesis;
  const [expandedTitles, setExpandedTitles] = useState<Record<string, boolean>>({});

  const toggleDetails = (title: string) => {
    setExpandedTitles((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <section
      id="thesis"
      className="section-padding flex flex-col"
    >
      <div className="max-w-[85rem] w-full mx-auto flex flex-col">
        {/* Header */}
        <div className="mb-10 shrink-0 animate-fade-in relative" style={{ animationDelay: "0.1s" }}>
          <div className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400 mb-2">
            {t.sectionLabel}
          </div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 mb-3">
            {t.heading} <span className="text-zinc-900 dark:text-zinc-100">{t.headingAccent}</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg max-w-2xl leading-relaxed">
            {t.body}
          </p>
          <div className="mt-6 h-px w-full bg-zinc-200 dark:bg-white/10" />
        </div>

        {/* Thesis list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          {t.items.map((item) => {
            const isExpanded = !!expandedTitles[item.title];

            return (
              <article
                key={item.title}
                className="border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.04] p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Author
                    </span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">•</span>
                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      {item.author}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-zinc-900 dark:text-zinc-100 mb-3 leading-snug">
                    {item.title}
                  </h3>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-white/5 animate-fade-in">
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1.5">
                        Abstract
                      </p>
                      <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                        {item.abstract}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleDetails(item.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300 transition-colors focus:outline-none"
                  >
                    <span>{isExpanded ? "Hide Details" : "Details"}</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
