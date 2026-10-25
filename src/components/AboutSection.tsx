import { translations } from "../contents/translations";
import LogoLight from "../assets/logo/B401_transparent.png";

export function AboutSection() {
  const tAbout = translations.about;
  const tNav = translations.nav;

  return (
    <section id="about" className="section-padding flex flex-col">
      <div className="max-w-[85rem] w-full mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <header className="mb-14 flex flex-col gap-4 border-b border-zinc-200 pb-10 md:flex-row md:items-end md:justify-between dark:border-white/10">
          <h2 className="section-heading max-w-2xl text-4xl md:text-6xl">
            {tAbout.heading}{" "}
            <span className="fg-muted">{tAbout.headingAccent}</span>
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg dark:text-zinc-300">
            {tAbout.body}
          </p>
        </header>

        <div className="text-center">
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-10">
            <img
              src={LogoLight}
              alt="B401 Robotics logo"
              width={112}
              height={112}
              className="w-20 h-20 md:w-28 md:h-28 object-contain shrink-0 dark:invert"
              loading="lazy"
              decoding="async"
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