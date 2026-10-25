import { translations } from "../contents/translations";

export function ResearchHero() {
  const t = translations.research;

  return (
    <section
      id="research-hero"
      className="px-6 md:px-10 lg:px-14 pt-12 pb-0 md:pt-16"
    >
      <div className="max-w-[85rem] w-full mx-auto">
        <header
          className="section-header animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div>
            <h1 className="section-heading text-4xl md:text-6xl">
              {t.heading}{" "}
              <span className="fg-muted">{t.headingAccent}</span>
            </h1>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg dark:text-zinc-300">
            {t.body}
          </p>
        </header>
      </div>
    </section>
  );
}
