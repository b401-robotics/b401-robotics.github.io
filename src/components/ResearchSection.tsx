import { useLanguage } from "../context/LanguageContext";
import { translations } from "../contents/translations";

const AREA_STYLES = [
  { color: "from-zinc-400 to-zinc-500", badge: "bg-zinc-100 dark:bg-white/5 text-zinc-700 border-zinc-200", accent: "border-zinc-200 hover:border-zinc-400" },
  { color: "from-violet-500 to-purple-600", badge: "bg-zinc-200/50 text-zinc-700 border-zinc-300", accent: "border-zinc-300 hover:border-zinc-700/60" },
  { color: "from-zinc-600 to-zinc-800", badge: "bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border-zinc-200", accent: "border-zinc-200 hover:border-zinc-400" },
  { color: "from-orange-500 to-amber-500", badge: "bg-slate-200/50 text-slate-700 border-slate-300", accent: "border-slate-300 hover:border-slate-700/60" },
  { color: "from-emerald-500 to-green-600", badge: "bg-neutral-200/50 text-neutral-700 border-neutral-300", accent: "border-neutral-300 hover:border-neutral-700/60" },
  { color: "from-rose-500 to-pink-600", badge: "bg-gray-200/50 text-gray-700 border-gray-300", accent: "border-gray-300 hover:border-gray-700/60" },
];

export function ResearchSection() {
  const { lang } = useLanguage();
  const t = translations[lang].research;

  return (
    <section id="research" className="section-padding">
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.areas.map((area, idx) => {
            const style = AREA_STYLES[idx];
            return (
              <div
                key={area.title}
                className={`card-glass rounded-2xl p-6 border transition-all duration-300 group cursor-default hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-zinc-300/50 ${style!.accent} animate-fade-in`}
                style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
              >
                {/* Gradient top bar */}
                <div className={`h-1 w-12 rounded-full bg-zinc-600 mb-5 group-hover:w-full transition-all duration-500`} />

                <span className={`inline-block px-3 py-1 rounded-full border text-xs font-medium mb-3 ${style!.badge}`}>
                  {area.tag}
                </span>
                <h3 className="font-display font-semibold text-zinc-900 dark:text-zinc-100 text-xl mb-3 leading-snug">
                  {area.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">{area.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
