import { translations } from "../contents/translations";

export function AchievementSection() {
  const t = translations.achievements;

  return (
    <section
      id="achievements"
      className="section-padding flex flex-col pt-0"
    >
      <div className="max-w-[85rem] w-full mx-auto flex flex-col">
        {/* Achievement grid — full view, no scroll container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 pb-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t.items.map((item) => (
              <article key={item.title} className="flex flex-col">
                {/* Image on top */}
                <div className="aspect-[16/10] w-full bg-zinc-200/60 dark:bg-white/5 overflow-hidden mb-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>

                {/* Metadata line */}
                <div className="text-xs font-medium uppercase tracking-[0.12em] text-amber-600 dark:text-amber-400 mb-3">
                  {t.sectionLabel} <span className="text-zinc-400 dark:text-zinc-500">•</span> {item.year}
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl md:text-2xl text-zinc-900 dark:text-zinc-100 mb-3 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Team members */}
                {"members" in item && Array.isArray(item.members) && item.members.length > 0 ? (
                  <div className="mt-auto pt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mr-1">
                      Member:
                    </span>
                    {item.members.map((member: string) => (
                      <span
                        key={member}
                        className="inline-flex items-center text-xs px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
  );
}