import { useLanguage } from "../context/LanguageContext";
import { translations } from "../contents/translations";

export function AchievementSection() {
  const { lang } = useLanguage();
  const t = translations[lang].achievements;

  return (
    <section id="achievements" className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in relative" style={{ animationDelay: "0.1s" }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 text-sm font-medium mb-4">
            {t.sectionLabel}
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-zinc-100 mb-5">
            {t.heading} <span className="text-zinc-900 dark:text-zinc-100">{t.headingAccent}</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-lg max-w-2xl mx-auto">
            {t.body}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((item, idx) => (
            <div
              key={item.title}
              className="card-glass rounded-2xl p-6 border border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-zinc-500 hover:ring-2 hover:ring-zinc-300/50 dark:hover:ring-zinc-700/50 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-xl animate-fade-in"
              style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
            >
              <div className="text-sm font-bold text-amber-600 dark:text-amber-400 mb-2">
                {item.year}
              </div>
              <h3 className="font-display font-semibold text-zinc-900 dark:text-zinc-100 text-lg mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
