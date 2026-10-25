import { Link } from "react-router-dom";
import { translations } from "../contents/translations";
import { PreviewSectionLayout } from "./PreviewSectionLayout";

interface ResearchSectionProps {
  preview?: boolean;
}

export function ResearchSection({ preview = false }: ResearchSectionProps = {}) {
  const r = translations.research;
  const p = translations.projects;

  if (preview) {
    return (
      <PreviewSectionLayout
        id="research"
        sectionLabel={r.sectionLabel}
        heading={r.heading}
        headingAccent={r.headingAccent}
        body={r.body}
        ctaTo="/research"
        ctaLabel={r.viewAll}
        imagePosition="right"
        image={r.image}
        imageAlt={r.heading}
      />
    );
  }

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
      className="section-padding flex flex-col"
    >
      <div className="max-w-[85rem] w-full mx-auto">
        {/* Research Focus Header */}
        <div
          className="mb-10 shrink-0 animate-fade-in relative"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="section-heading text-4xl md:text-6xl">
                {r.heading} <span className="fg-muted">{r.headingAccent}</span>
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg dark:text-zinc-300">
              {r.body}
            </p>
          </div>
          <div className="mt-6 h-px w-full bg-zinc-200 dark:bg-white/10" />
        </div>

        {/* Content */}
        <div>
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
                <span className="kicker mb-2">
                  {area.tag}
                </span>
                <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight text-zinc-900 dark:text-zinc-100 mb-2 leading-snug">
                  {area.title}
                </h3>
                <p className="fg-muted text-sm md:text-base leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>

          {/* Lab Work Projects Showcase */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight text-zinc-900 dark:text-zinc-100">
                {p.heading} <span className="fg-muted">{p.headingAccent}</span>
              </h3>
              <span className="kicker">
                {p.sectionLabel}
              </span>
            </div>
            <p className="fg-muted text-sm md:text-base leading-relaxed max-w-2xl mb-8">
              {p.body}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 pb-2">
              {p.items.map((project) => (
                <article key={project.title} className="group flex flex-col">
                  <div className="corner-frame aspect-[16/10] w-full mb-5">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        width={640}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                  </div>
                  <div className="kicker mb-3">
                    {p.sectionLabel} <span className="fg-meta">•</span>{" "}
                    {getStatusLabel(project.status)}
                  </div>
                  <h4 className="font-display font-bold text-lg md:text-xl tracking-tight text-zinc-900 dark:text-zinc-100 mb-2 leading-snug">
                    {project.title}
                  </h4>
                  <p className="fg-muted text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] border border-zinc-300 dark:border-white/15 fg-muted"
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