import { useEffect, useState } from "react";
import { translations } from "../contents/translations";
import { PreviewSectionLayout } from "./PreviewSectionLayout";

interface PracticumsSectionProps {
  preview?: boolean;
}

export function PracticumsSection({ preview = false }: PracticumsSectionProps = {}) {
  const t = translations.practicums;
  const [selectedCode, setSelectedCode] = useState<string>(t.items[0]?.code ?? "");

  if (preview) {
    return (
      <PreviewSectionLayout
        id="practicums"
        sectionLabel={t.sectionLabel}
        heading={t.heading}
        headingAccent={t.headingAccent}
        body={t.body}
        ctaTo="/practicums"
        ctaLabel={t.viewAll}
        imagePosition="left"
        image={t.image}
        imageAlt={t.heading}
      />
    );
  }

  const selected = t.items.find((p) => p.code === selectedCode) ?? t.items[0];
  if (!selected) return null;

  const images: readonly string[] = selected.images;

  return (
    <section
      id="practicums"
      className="relative min-h-[calc(100vh-4.75rem)] flex flex-col px-6 md:px-10 lg:px-14 pt-12 pb-8 md:pt-16 md:pb-12"
    >
      <div className="max-w-[85rem] w-full mx-auto">
        {/* Header */}
        <header className="section-header animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div>
            <p className="kicker mb-3">{t.sectionLabel}</p>
            <h2 className="section-heading text-4xl md:text-6xl">
              {t.heading} <span className="text-zinc-400 dark:text-zinc-600">{t.headingAccent}</span>
            </h2>
          </div>
          <p className="max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
            {t.body}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-10 items-start">
          {/* Left: seamless practicum list */}
          <div className="flex flex-col">
            {t.items.map((p, idx) => {
              const isActive = p.code === selected.code;
              return (
                <button
                  key={p.code}
                  type="button"
                  onClick={() => setSelectedCode(p.code)}
                  className={`group relative text-left w-full flex items-start gap-3 py-4 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 animate-fade-in ${
                    idx !== 0 ? "border-t border-zinc-200/70 dark:border-white/10" : ""
                  }`}
                  style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                >
                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <div
                      className={`font-display font-bold text-base mb-1 leading-snug transition-colors duration-200 ${
                        isActive
                          ? "text-zinc-900 dark:text-zinc-100"
                          : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
                      }`}
                    >
                      {p.title}
                    </div>
                    <div
                      className={`text-xs leading-relaxed transition-colors duration-200 ${
                        isActive
                          ? "text-zinc-600 dark:text-zinc-300"
                          : "text-zinc-400 dark:text-zinc-500"
                      }`}
                    >
                      {p.summary}
                    </div>
                  </div>

                  {/* Active indicator bar */}
                  <div
                    className={`w-[3px] self-stretch transition-colors duration-300 {
                      isActive
                        ? "bg-zinc-900 dark:bg-zinc-100"
                        : "bg-transparent group-hover:bg-zinc-300 dark:group-hover:bg-white/20"
                    }`}
                  />

                  {/* Bottom underline animation */}
                  <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-zinc-900 dark:bg-zinc-100 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </button>
              );
            })}
          </div>

          {/* Right: selected practicum detail */}
          <div key={selected.code} className="animate-fade-in">
            {/* Image carousel — auto-advances every 5s, or manually via the arrows */}
            <ImageCarousel images={images} alt={selected.title} />

            <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight text-zinc-900 dark:text-zinc-100 mb-2 leading-tight">
              {selected.title}
            </h3>

            <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed mb-4">
              {selected.description}
            </p>

            {selected.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selected.topics.map((topic) => {
                  const label = topic.label;
                  const url = "url" in topic ? topic.url : undefined;
                  const baseClass =
                    "px-2.5 py-1 border font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200";

                  return url ? (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${baseClass} border-zinc-300 dark:border-white/15 text-zinc-700 dark:text-zinc-200 hover:border-zinc-900 dark:hover:border-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/5 cursor-pointer`}
                    >
                      {label} ↗
                    </a>
                  ) : (
                    <span
                      key={label}
                      className={`${baseClass} border-zinc-300 dark:border-white/15 text-zinc-600 dark:text-zinc-300`}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            )}

            <div className="pt-4 border-t border-zinc-200 dark:border-white/10">
              <a
                href={t.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-zinc-900 bg-zinc-900 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-opacity duration-300 group dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:focus:ring-zinc-100"
              >
                {t.registerLabel}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
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
    <div className="corner-frame group relative aspect-video w-full mb-4">
      {/* object-contain keeps the whole image inside the frame — nothing
          is cropped and nothing overflows the placeholder bounds. */}
      <img
        src={images[index]}
        alt={alt}
        className="w-full h-full object-contain"
        loading="lazy"
      />

      {count > 1 && (
        <>
          {/* Arrow controls — hidden until the frame is hovered. On touch
              devices there is no hover, so the group-hover classes leave
              them permanently visible. */}
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev - 1 + count) % count)}
            aria-label="Previous image"
            className="absolute top-1/2 left-3 -translate-y-1/2 w-11 h-11 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto focus:opacity-100 focus:pointer-events-auto"
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
            className="absolute top-1/2 right-3 -translate-y-1/2 w-11 h-11 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto focus:opacity-100 focus:pointer-events-auto"
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

          {/* Index dots — one per image, active one filled. Same hover-gated
              visibility as the arrows. Clicking a dot jumps to that image. */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 transition-all duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
            {images.map((_, i) => (
              <button
                key={`dot-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/60 ${
                  i === index
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}