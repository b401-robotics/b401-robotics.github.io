import { useLanguage } from "../context/LanguageContext";
import { translations } from "../contents/translations";

export function ActivityLabSection() {
  const { lang } = useLanguage();
  const t = translations[lang].activity;

  return (
    <section
      id="activity"
      className="section-padding max-h-[calc(100vh-4.75rem)] flex flex-col"
    >
      <div className="max-w-[85rem] w-full mx-auto flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="mb-10 shrink-0">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 mb-3">
            {t.heading}{" "}
            <span className="text-zinc-900 dark:text-zinc-100">{t.headingAccent}</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg max-w-2xl leading-relaxed">
            {t.body}
          </p>
          <div className="mt-6 h-px w-full bg-zinc-200 dark:bg-white/10" />
        </div>

        {/* Activity list — image left, text right, scrollable on overflow */}
        <div className="flex flex-col overflow-y-auto scrollbar-fade flex-1 min-h-0">
          {t.items.map((item, idx) => (
            <article
              key={item.title}
              className={`flex flex-col md:flex-row gap-4 md:gap-6 py-6 ${
                idx !== 0 ? "border-t border-zinc-200/70 dark:border-white/10" : ""
              }`}
            >
              {/* Image on the left */}
              <div className="w-full md:w-64 shrink-0 aspect-video bg-zinc-200/60 dark:bg-white/5 overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : null}
              </div>

              {/* Title + paragraph on the right */}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 mb-1">
                  {item.tag} <span className="text-zinc-400 dark:text-zinc-500">•</span> {item.date}
                </div>

                <h3 className="font-display font-bold text-xl md:text-2xl text-zinc-900 dark:text-zinc-100 mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}