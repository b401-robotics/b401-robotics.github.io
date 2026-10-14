import { translations } from "../contents/translations";

export function HighlightHero() {
  const t = translations.highlight;

  return (
    <section
      id="highlight-hero"
      className="px-6 md:px-10 lg:px-14 pt-12 pb-10 md:pt-16 md:pb-16"
    >
      <div className="max-w-[85rem] w-full mx-auto">
        <header
          className="flex flex-col gap-4 border-b border-zinc-200 pb-10 animate-fade-in md:flex-row md:items-end md:justify-between dark:border-white/10"
          style={{ animationDelay: "0.1s" }}
        >
          <div>
            <p className="kicker mb-3">{t.sectionLabel}</p>
            <h1 className="section-heading text-4xl md:text-6xl">
              {t.heading}{" "}
              <span className="text-zinc-400 dark:text-zinc-600">{t.headingAccent}</span>
            </h1>
          </div>
          <p className="max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
            {t.body}
          </p>
        </header>
      </div>
    </section>
  );
}