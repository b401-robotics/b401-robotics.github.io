import { Link } from "react-router-dom";

interface PreviewSectionLayoutProps {
  id: string;
  sectionLabel: string;
  heading: string;
  headingAccent: string;
  body: string;
  ctaTo: string;
  ctaLabel: string;
  imagePosition: "left" | "right";
}

export function PreviewSectionLayout({
  id,
  sectionLabel,
  heading,
  headingAccent,
  body,
  ctaTo,
  ctaLabel,
  imagePosition,
}: PreviewSectionLayoutProps) {
  return (
    <section id={id} className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`flex flex-col gap-10 lg:gap-16 items-center ${
            imagePosition === "left" ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
        >
          {/* Summary column */}
          <div className="w-full lg:w-1/2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 text-sm font-medium mb-4">
              {sectionLabel}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-zinc-900 dark:text-zinc-100 mb-5 leading-tight">
              {heading} <span className="text-zinc-900 dark:text-zinc-100">{headingAccent}</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              {body}
            </p>
            <Link
              to={ctaTo}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 dark:hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:ring-offset-2 transition-all duration-300 group"
            >
              {ctaLabel}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Image placeholder column (empty for now) */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div
              className="aspect-square w-full max-w-md rounded-full bg-zinc-200/50 dark:bg-white/5 border border-zinc-300/60 dark:border-white/10"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}