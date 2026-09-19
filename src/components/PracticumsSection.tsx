import { useLanguage } from "../context/LanguageContext";
import { translations } from "../contents/translations";

export function PracticumsSection() {
  const { lang } = useLanguage();
  const t = translations[lang].practicums;

  return (
    <section id="practicums" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in relative" style={{ animationDelay: "0.1s" }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 text-sm font-medium mb-4">
            {t.sectionLabel}
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-zinc-100 mb-5">
            {t.heading} <span className="text-zinc-900 dark:text-zinc-100">{t.headingAccent}</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-lg max-w-2xl mx-auto">{t.body}</p>
        </div>

        {/* Practicum list */}
        <div className="space-y-4">
          {t.items.map((p, idx) => (
            <div
              key={p.code}
              className="card-glass rounded-2xl p-6 border border-zinc-200 dark:border-white/10 hover:border-zinc-300 hover:bg-zinc-100 dark:bg-white/5 hover:ring-2 hover:ring-zinc-300/50 transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-display font-semibold text-zinc-900 dark:text-zinc-100 text-xl">{p.title}</h3>
                  </div>
                  {p.desc && <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-3">{p.desc}</p>}
                  <div className="flex flex-wrap gap-2">
                    {p.topics.map((topic) => (
                      <span key={topic} className="px-2.5 py-1 rounded-lg bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sessions */}
                <div className="md:text-right shrink-0">
                  <div className="flex items-center gap-2 md:justify-end text-zinc-500 text-sm">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {p.sessions} {t.sessions}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
