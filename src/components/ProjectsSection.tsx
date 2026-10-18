import { translations } from "../contents/translations";

export function ProjectsSection() {
  const t = translations.projects;

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
      className="section-padding md:max-h-[calc(100vh-4.75rem)] flex flex-col"
    >
      <div className="max-w-[85rem] w-full mx-auto flex flex-col md:flex-1 md:min-h-0">
        {/* Header */}
        <div className="mb-10 shrink-0 animate-fade-in relative" style={{ animationDelay: "0.1s" }}>
          <h2 className="section-heading mb-3 text-2xl md:text-3xl">
            {t.heading} {t.headingAccent}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base max-w-2xl leading-relaxed">
            {t.body}
          </p>
        </div>

        {/* Project grid — news-style, scrollable when it overflows */}
        <div className="md:overflow-y-auto scrollbar-fade md:flex-1 md:min-h-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 pb-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t.items.map((project) => (
              <article key={project.title} className="group flex flex-col">
                {/* Image on top */}
                <div className="corner-frame aspect-[16/10] w-full mb-5">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  ) : null}
                </div>

                {/* Metadata line */}
                <div className="kicker mb-3">
                  {t.sectionLabel} <span className="text-zinc-400 dark:text-zinc-500">•</span> {getStatusLabel(project.status)}
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight text-zinc-900 dark:text-zinc-100 mb-3 leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] border border-zinc-300 dark:border-white/15 text-zinc-500 dark:text-zinc-400"
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