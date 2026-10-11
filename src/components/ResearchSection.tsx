import { translations } from "../contents/translations";

export function ResearchSection() {
  const r = translations.research;
  const p = translations.projects;

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "Completed":
        return p.statusCompleted;
      case "Active":
        return p.statusActive;
      case "Research":
        return p.statusResearch;
      default:
        return status;
    }
  };

  return (
    <section
      id="research"
      className="section-padding md:max-h-[calc(100vh-4.75rem)] flex flex-col"
    >
      <div className="max-w-[85rem] w-full mx-auto flex flex-col md:flex-1 md:min-h-0">
        {/* Research Focus Header */}
        <div
          className="mb-10 shrink-0 animate-fade-in relative"
          style={{ animationDelay: "0.1s" }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400 mb-3">
            {r.sectionLabel}
          </p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 mb-3">
            {r.heading} <span className="text-zinc-900 dark:text-zinc-100">{r.headingAccent}</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg max-w-2xl leading-relaxed">
            {r.body}
          </p>
          <div className="mt-6 h-px w-full bg-zinc-200 dark:bg-white/10" />
        </div>

        {/* Scrollable content */}
        <div className="md:overflow-y-auto scrollbar-fade md:flex-1 md:min-h-0">
          {/* Research Areas Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14 animate-fade-in"
            style={{ animationDelay: "0.15s" }}
          >
            {r.areas.map((area) => (
              <div
                key={area.title}
                className="border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.04] p-6 flex flex-col"
              >
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400 mb-2">
                  {area.tag}
                </span>
                <h3 className="font-display font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-2 leading-snug">
                  {area.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>

          {/* Lab Work Projects Showcase */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="font-display font-bold text-xl md:text-2xl text-zinc-900 dark:text-zinc-100">
                {p.heading} <span className="text-zinc-900 dark:text-zinc-100">{p.headingAccent}</span>
              </h3>
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
                {p.sectionLabel}
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
              {p.body}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 pb-2">
              {p.items.map((project) => (
                <article key={project.title} className="flex flex-col">
                  <div className="aspect-[16/10] w-full bg-zinc-200/60 dark:bg-white/5 overflow-hidden mb-4">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <div className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400 mb-3">
                    {p.sectionLabel} <span className="text-zinc-400 dark:text-zinc-500">•</span>{" "}
                    {getStatusLabel(project.status)}
                  </div>
                  <h4 className="font-display font-bold text-lg md:text-xl text-zinc-900 dark:text-zinc-100 mb-2 leading-snug">
                    {project.title}
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
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
      </div>
    </section>
  );
}