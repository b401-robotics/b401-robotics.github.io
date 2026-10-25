import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { translations } from "../contents/translations";
import { PdfViewerModal } from "./PdfViewerModal";

interface PracticumsSectionProps {
  preview?: boolean;
}

export function PracticumsSection({ preview = false }: PracticumsSectionProps = {}) {
  const t = translations.practicums;
  const [activePdf, setActivePdf] = useState<{ title: string; url: string } | null>(null);

  if (preview) {
    return (
      <section id="practicums" className="section-padding flex flex-col justify-center">
        <div className="max-w-[85rem] w-full mx-auto">
          {/* Header */}
          <div className="mb-10 shrink-0 animate-fade-in relative" style={{ animationDelay: "0.1s" }}>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="section-heading text-4xl md:text-6xl">
                  {t.heading} <span className="fg-muted">{t.headingAccent}</span>
                </h2>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg dark:text-zinc-300">
                {t.body}
              </p>
            </div>
            <div className="mt-6 h-px w-full bg-zinc-200 dark:bg-white/10" />
          </div>

          {/* Asymmetric Hardware Specimen + Curriculum Tracks Ledger — Zero Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 mb-10 items-start animate-fade-in" style={{ animationDelay: "0.15s" }}>
            {/* Left Column: Physical Hardware Specimen Frame */}
            <div className="lg:col-span-5">
              <div className="corner-frame aspect-[4/3] w-full">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.heading}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
              </div>
            </div>

            {/* Right Column: Open Continuous Syllabus Ledger (Hairline Strips) */}
            <div className="lg:col-span-7 border-t border-zinc-200 dark:border-white/10 flex flex-col">
              {t.items.map((p) => (
                <div
                  key={p.code}
                  className="py-5 border-b border-zinc-200/80 dark:border-white/10 flex flex-col gap-2 hover:bg-zinc-900/[0.02] dark:hover:bg-white/[0.02] transition-colors px-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-900 dark:text-zinc-100 font-bold">
                      {p.code}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] fg-muted">
                      {p.sessions ? `${p.sessions} ${t.sessions}` : "Development"}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-lg md:text-xl text-zinc-900 dark:text-zinc-100 leading-snug">
                    {p.title}
                  </h3>

                  <p className="fg-meta text-sm leading-relaxed">
                    {p.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/practicums"
              className="inline-flex items-center gap-3 border border-zinc-900 bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-[opacity,transform] duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 group dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:focus:ring-zinc-100"
            >
              {t.viewAll}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a
              href={t.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-zinc-300 dark:border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors"
            >
              {t.registerLabel} ↗
            </a>
          </div>
        </div>

        {activePdf && (
          <PdfViewerModal
            title={activePdf.title}
            url={activePdf.url}
            onClose={() => setActivePdf(null)}
          />
        )}
      </section>
    );
  }

  return (
    <section
      id="practicums"
      className="relative min-h-[calc(100vh-4.75rem)] flex flex-col px-6 md:px-10 lg:px-14 pt-12 pb-8 md:pt-16 md:pb-12"
    >
      <div className="max-w-[85rem] w-full mx-auto">
        {/* Header */}
        <header className="section-header animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div>
            <h2 className="section-heading text-4xl md:text-6xl">
              {t.heading} <span className="fg-muted">{t.headingAccent}</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg dark:text-zinc-300">
            {t.body}
          </p>
        </header>

        <div className="flex flex-col gap-16 md:gap-24">
          {t.items.map((item) => {
            const selected = item;
            const images = item.images;
            return (
        <article key={item.code} className="animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Specimen + its record strip */}
          <div className="lg:col-span-6">
            <ImageCarousel images={images} alt={selected.title} />

            <div className="flex items-baseline justify-between gap-4 mt-4 pt-3 border-t border-zinc-200 dark:border-white/10">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-900 dark:text-zinc-100 font-bold">
                {selected.code}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] fg-muted">
                {selected.sessions ? `${selected.sessions} ${t.sessions}` : "Development"}
              </span>
            </div>

          </div>

          {/* Brief */}
          <div className="lg:col-span-6">
            <div className="mb-5 flex flex-wrap items-center gap-4">
              <h3 className="section-heading text-2xl md:text-3xl">
                {selected.title}
              </h3>
              <a
                href={t.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-zinc-900 bg-zinc-900 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-opacity duration-300 group dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:focus:ring-zinc-100"
              >
                {t.registerLabel}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            <p className="fg-muted text-sm md:text-base leading-relaxed">
              {selected.description}
            </p>

            {/* Guidebook link / trigger */}
            {"guidebookUrl" in selected && selected.guidebookUrl ? (
              <button
                type="button"
                onClick={() =>
                  setActivePdf({
                    title: `${selected.title} — Guidebook`,
                    url: selected.guidebookUrl as string,
                  })
                }
                className="mt-6 border border-zinc-300 dark:border-white/20 p-4 flex items-center justify-between gap-4 w-full text-left transition-colors hover:border-zinc-900 dark:hover:border-zinc-100 hover:bg-zinc-900/[0.02] dark:hover:bg-white/[0.02] cursor-pointer group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-zinc-900 dark:text-zinc-100">
                    <path d="M4 4h9l7 7v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
                    <path d="M13 4v7h7" />
                  </svg>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-900 dark:text-zinc-100 font-semibold">
                      Practicum guidebook
                    </p>
                    <p className="text-sm fg-meta">
                      Click to read guidebook PDF
                    </p>
                  </div>
                </div>
                <span aria-hidden="true" className="font-mono text-xs fg-meta group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
              </button>
            ) : (
              <div className="mt-6 border border-dashed border-zinc-300 dark:border-white/20 p-4 flex items-center gap-4">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="shrink-0 fg-meta">
                  <path d="M4 4h9l7 7v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
                  <path d="M13 4v7h7" />
                </svg>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] fg-muted">
                    Practicum guidebook
                  </p>
                  <p className="text-sm fg-meta">
                    Coming soon
                  </p>
                </div>
              </div>
            )}

            {selected.topics.length > 0 && (
              <ul className="mt-8 border-y border-zinc-200 dark:border-white/10 divide-y divide-zinc-200 dark:divide-white/10">
                {selected.topics.map((topic, i) => {
                  const label = topic.label;
                  const url = "url" in topic ? topic.url : undefined;
                  const rowClass =
                    "group flex items-center gap-4 py-3.5 min-h-[44px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100";
                  const inner = (
                    <>
                      <span className="font-mono text-[11px] tabular-nums fg-meta">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display font-semibold text-sm md:text-base text-zinc-900 dark:text-zinc-100 leading-snug">
                        {label}
                      </span>
                      {url && (
                        <span aria-hidden="true" className="ml-auto fg-meta transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                          ↗
                        </span>
                      )}
                    </>
                  );

                  return (
                    <li key={label}>
                      {url ? (
                        <button
                          type="button"
                          onClick={() => setActivePdf({ title: `${selected.title} — ${label}`, url })}
                          className={`w-full text-left ${rowClass} hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer`}
                        >
                          {inner}
                        </button>
                      ) : (
                        <span className={rowClass}>{inner}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

          </div>
        </article>
            );
          })}
        </div>
      </div>

      {activePdf && (
        <PdfViewerModal
          title={activePdf.title}
          url={activePdf.url}
          onClose={() => setActivePdf(null)}
        />
      )}
    </section>
  );
}

const ROTATION_MS = 5000;

interface ImageCarouselProps {
  images: readonly string[];
  alt: string;
}

function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  // Auto-advance. Uses setTimeout (not setInterval) so that each index change
  // — whether triggered by the timer or by the arrows — restarts the full
  // delay, preventing an arrow click from being followed by a near-instant
  // automatic advance.
  useEffect(() => {
    if (count <= 1) return;
    const id = setTimeout(() => {
      setIndex((prev) => (prev + 1) % count);
    }, ROTATION_MS);
    return () => clearTimeout(id);
  }, [count, index]);

  if (count === 0) return null;

  return (
    <div className="corner-frame group relative aspect-[4/3] w-full">
      {/* object-cover fills the frame edge to edge. */}
      <img
        src={images[index]}
        alt={alt}
        width={800}
        height={600}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />

      {count > 1 && (
        <>
          {/* Arrow controls — visible on touch devices, hover-gated on desktop. */}
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev - 1 + count) % count)}
            aria-label="Previous image"
            className="absolute top-1/2 left-3 -translate-y-1/2 w-11 h-11 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white opacity-100 pointer-events-auto sm:opacity-0 sm:pointer-events-none sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto focus:opacity-100 focus:pointer-events-auto"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setIndex((prev) => (prev + 1) % count)}
            aria-label="Next image"
            className="absolute top-1/2 right-3 -translate-y-1/2 w-11 h-11 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white opacity-100 pointer-events-auto sm:opacity-0 sm:pointer-events-none sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto focus:opacity-100 focus:pointer-events-auto"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          {/* Index dots — one per image, active one filled. */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center px-1.5 py-0.5 rounded-full bg-black/40 backdrop-blur-xs transition-all duration-300 opacity-100 pointer-events-auto sm:opacity-0 sm:pointer-events-none sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto">
            {images.map((_, i) => (
              <button
                key={`dot-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                className="w-11 h-11 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
              >
                <span
                  className={`block h-2 rounded-full transition-colors duration-200 ${
                    i === index
                      ? "bg-white w-4"
                      : "bg-white/50 w-2 hover:bg-white/80"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}