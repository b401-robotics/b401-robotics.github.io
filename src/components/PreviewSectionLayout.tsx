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
  image?: string;
  imageAlt?: string;
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
  image,
  imageAlt,
}: PreviewSectionLayoutProps) {
  return (
    <section id={id} className="section-padding flex flex-col">
      <div className="max-w-[85rem] w-full mx-auto">
        <div
          className={`flex flex-col gap-10 lg:gap-20 items-center animate-fade-in ${
            imagePosition === "left" ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
          style={{ animationDelay: "0.1s" }}
        >
          {/* Summary column */}
          <div className="w-full lg:w-5/12">
            <h2 className="section-heading text-4xl md:text-6xl mb-5">
              {heading} <span className="fg-muted">{headingAccent}</span>
            </h2>
            <p className="fg-muted text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              {body}
            </p>
            <Link
              to={ctaTo}
              className="inline-flex items-center gap-3 border border-zinc-900 bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-[opacity,transform] duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 group dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:focus:ring-zinc-100"
            >
              {ctaLabel}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Image column — square frame with corner ticks */}
          <div className="w-full lg:w-7/12 flex justify-center">
            <div className="corner-frame aspect-[4/3] w-full max-w-2xl" aria-hidden={!image}>
              {image ? (
                <img
                  src={image}
                  alt={imageAlt || heading}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
