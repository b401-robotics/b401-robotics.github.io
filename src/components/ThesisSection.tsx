import { useState } from "react";
import { translations } from "../contents/translations";

export function ThesisSection() {
  const t = translations.thesis;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="thesis"
      className="section-padding flex flex-col"
    >
      <div className="max-w-[85rem] w-full mx-auto flex flex-col">
        {/* Header */}
        <div className="mb-8 md:mb-10 shrink-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h2 className="section-heading mb-3 text-2xl md:text-3xl">
            {t.heading} {t.headingAccent}
          </h2>
          <p className="fg-muted text-sm md:text-base max-w-2xl leading-relaxed">
            {t.body}
          </p>
        </div>

        {/* Thesis archive — hairline-divided rows with expandable abstracts */}
        <ul
          className="list-none m-0 p-0 border-t border-zinc-200 dark:border-white/10 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {t.items.map((item, i) => {
            const open = openIndex === i;
            const abstractId = `thesis-abstract-${i}`;

            return (
              <li
                key={item.title}
                className="relative border-b border-zinc-200 dark:border-white/10"
              >
                <article
                  className={`group relative transition-colors duration-300 ${
                    open
                      ? "bg-zinc-900/[0.03] dark:bg-white/[0.04]"
                      : "hover:bg-zinc-900/[0.02] dark:hover:bg-white/[0.03]"
                  }`}
                >
                  <h3 className="m-0">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={abstractId}
                      className="w-full text-left bg-transparent cursor-pointer grid grid-cols-[1fr_auto] items-start gap-4 md:gap-6 py-6 md:py-8 px-1"
                    >
                      {/* Title + author */}
                      <span className="min-w-0">
                        <span className="block font-display font-bold text-lg md:text-2xl text-zinc-900 dark:text-zinc-100 leading-snug">
                          {item.title}
                        </span>
                        <span className="kicker mt-2.5 flex items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            className="inline-block h-px w-5 shrink-0 bg-zinc-400/70 dark:bg-zinc-500/70"
                          />
                          {item.author}
                          {item.year && (
                            <>
                              <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-600">•</span>
                              <span className="tabular-nums">{item.year}</span>
                            </>
                          )}
                        </span>
                      </span>

                      {/* Toggle indicator */}
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 shrink-0 grid place-items-center size-8 border font-display font-normal text-xl leading-none transition-[transform,color,border-color] duration-300 ${
                          open
                            ? "rotate-45 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100"
                            : "border-zinc-300 dark:border-white/15 fg-muted"
                        }`}
                      >
                        +
                      </span>
                    </button>
                  </h3>

                  {/* Animated underline at the bottom of the thesis area on hover (when not open) */}
                  <span
                    className={`absolute bottom-0 left-1 right-1 h-0.5 origin-left rounded-full bg-zinc-900 dark:bg-zinc-100 transition-transform duration-300 ease-out ${
                      open ? "scale-x-0" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />

                  {/* Collapsible abstract */}
                  <div
                    id={abstractId}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-1 pb-7 md:pb-9">
                        <div className="max-w-3xl border-l-2 border-zinc-900 dark:border-zinc-100 bg-white dark:bg-white/[0.05] px-5 md:px-6 py-5">
                          <p className="kicker m-0 mb-2">
                            Abstract
                          </p>
                          <p className="m-0 fg-muted text-sm md:text-base leading-relaxed">
                            {item.abstract}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
