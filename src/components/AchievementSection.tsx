import { translations } from "../contents/translations";

export function AchievementSection() {
  const t = translations.achievements;

  return (
    <section
      id="achievements"
      className="section-padding flex flex-col"
    >
      <div className="max-w-[85rem] w-full mx-auto flex flex-col">
        {/* Achievement grid — full view, no scroll container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 pb-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t.items.map((item) => (
              <article key={item.title} className="group flex flex-col">
                {/* Image on top */}
                <div className="corner-frame aspect-[16/10] w-full mb-5">
                  <div className="absolute inset-2 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        width={640}
                        height={400}
                        className="absolute inset-0 block h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                  </div>
                </div>

                {/* Metadata line */}
                <div className="kicker mb-3">
                  {t.sectionLabel} <span className="fg-meta">•</span> {item.year}
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight text-zinc-900 dark:text-zinc-100 mb-3 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="fg-muted text-sm md:text-base leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Team members */}
                {"members" in item && Array.isArray(item.members) && item.members.length > 0 ? (
                  <div className="mt-auto pt-2 flex flex-wrap items-center gap-1.5">
                    <span className="kicker mr-1">
                      Member:
                    </span>
                    {item.members.map((member: string) => (
                      <span
                        key={member}
                        className="inline-flex items-center px-2.5 py-1 border border-zinc-300 text-[11px] text-zinc-600 dark:border-white/15 dark:text-zinc-300"
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