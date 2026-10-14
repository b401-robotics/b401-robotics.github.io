import { translations } from "../contents/translations";

export function ActivityLabSection() {
  const t = translations.activity;

  return (
    <section
      id="activity"
      className="section-padding max-h-[calc(100vh-4.75rem)] flex flex-col"
    >
      <div className="max-w-[85rem] w-full mx-auto flex flex-col flex-1 min-h-0">
        {/* Header */}
        <header className="mb-10 shrink-0 flex flex-col gap-4 border-b border-zinc-200 pb-6 animate-fade-in md:flex-row md:items-end md:justify-between dark:border-white/10" style={{ animationDelay: "0.1s" }}>
          <div>
            <p className="kicker mb-3">{t.sectionLabel}</p>
            <h2 className="section-heading text-4xl md:text-6xl">
              {t.heading}{" "}
              <span className="text-zinc-400 dark:text-zinc-600">{t.headingAccent}</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-zinc-600 md:text-base dark:text-zinc-300">
            {t.body}
          </p>
        </header>

        {/* Activity list — image left, text right, scrollable on overflow */}
        <div className="flex flex-col overflow-y-auto scrollbar-fade flex-1 min-h-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          {t.items.map((item, idx) => (
            <article
              key={item.title}
              className={`flex flex-col md:flex-row gap-4 md:gap-6 py-6 ${
                idx !== 0 ? "border-t border-zinc-200/70 dark:border-white/10" : ""
              }`}
            >
              {/* Image on the left */}
              <div className="w-full md:w-64 shrink-0 aspect-video bg-zinc-200/60 dark:bg-white/5 overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : null}
              </div>

              {/* Title + paragraph on the right */}
              <div className="flex-1 min-w-0">
                <div className="kicker mb-1">
                  {item.tag} <span className="text-zinc-400 dark:text-zinc-500">•</span> {item.date}
                </div>

                <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight text-zinc-900 dark:text-zinc-100 mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}