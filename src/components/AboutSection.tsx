import { translations } from "../contents/translations";
import LogoLight from "../assets/logo/B401_transparent.png";
import LogoDark from "../assets/logo/B401_white_cutout.png";

export function AboutSection() {
  const tAbout = translations.about;
  const tNav = translations.nav;

  return (
    <section id="about" className="section-padding min-h-[calc(100vh-4.75rem)] flex flex-col">
      <div className="max-w-[85rem] w-full mx-auto mt-16 md:mt-28 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <header className="mb-14 flex flex-col gap-4 border-b border-zinc-200 pb-10 md:flex-row md:items-end md:justify-between dark:border-white/10">
          <h2 className="section-heading max-w-2xl text-4xl md:text-6xl">
            {tAbout.heading}{" "}
            <span className="text-zinc-400 dark:text-zinc-600">{tAbout.headingAccent}</span>
          </h2>
          <p className="max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
            {tAbout.body}
          </p>
        </header>

        <div className="text-center">
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-10">
            <img
              src={LogoLight}
              alt="B401 Logo"
              className="w-20 h-20 md:w-28 md:h-28 object-contain shrink-0 dark:hidden"
              loading="lazy"
            />
            <img
              src={LogoDark}
              alt="B401 Logo"
              className="w-20 h-20 md:w-28 md:h-28 object-contain shrink-0 hidden dark:block"
              loading="lazy"
            />
            <span className="font-display font-semibold text-zinc-900 dark:text-zinc-100 text-left text-xl md:text-2xl leading-tight whitespace-pre-line">
              {tNav.labName}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}