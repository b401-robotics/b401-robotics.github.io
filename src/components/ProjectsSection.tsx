import { useLanguage } from "../context/LanguageContext";
import { translations } from "../contents/translations";

export function ProjectsSection() {
  const { lang } = useLanguage();
  const t = translations[lang].projects;

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "Completed": return t.statusCompleted;
      case "Active": return t.statusActive;
      case "Research": return t.statusResearch;
      default: return status;
    }
  };

  return (
    <section
      id="projects"
      className="section-padding max-h-[calc(100vh-4.75rem)] flex flex-col"
    >
      <div className="max-w-[85rem] w-full mx-auto flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="mb-10 shrink-0 animate-fade-in relative" style={{ animationDelay: "0.1s" }}>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 mb-3">
            {t.heading} <span className="text-zinc-900 dark:text-zinc-100">{t.headingAccent}</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg max-w-2xl leading-relaxed">
            {t.body}
          </p>
          <div className="mt-6 h-px w-full bg-zinc-200 dark:bg-white/10" />
        </div>

        {/* Project grid — news-style, scrollable when it overflows */}
        <div className="overflow-y-auto scrollbar-fade flex-1 min-h-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 pb-2">
            {t.items.map((project) => (
              <article key={project.title} className="flex flex-col">
                {/* Image on top */}
                <div className="aspect-[16/10] w-full bg-zinc-200/60 dark:bg-white/5 overflow-hidden mb-4">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>

                {/* Metadata line */}
                <div className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400 mb-3">
                  {t.sectionLabel} <span className="text-zinc-400 dark:text-zinc-500">•</span> {getStatusLabel(project.status)}
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl md:text-2xl text-zinc-900 dark:text-zinc-100 mb-3 leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed mb-4">
                  {project.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 border border-zinc-300 dark:border-white/15 text-zinc-600 dark:text-zinc-300 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}