import { useLanguage } from "../context/LanguageContext";
import { translations } from "../contents/translations";

export function HighlightHero() {
  const { lang } = useLanguage();
  const t = translations[lang].highlight;

  return (
    <section
      id="highlight-hero"
      className="px-6 md:px-10 lg:px-14 pt-12 pb-10 md:pt-16 md:pb-16"
    >
      <div className="max-w-[85rem] w-full mx-auto">
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-zinc-900 dark:text-zinc-100 mb-3">
            {t.heading}{" "}
            <span className="text-zinc-900 dark:text-zinc-100">{t.headingAccent}</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg max-w-2xl leading-relaxed">
            {t.body}
          </p>
          <div className="mt-6 h-px w-full bg-zinc-200 dark:bg-white/10" />
        </div>
      </div>
    </section>
  );
}