import { useLanguage } from "../context/LanguageContext";
import { translations } from "../contents/translations";
import Logo from "../assets/logo/Logo.webp";

export function AboutSection() {
  const { lang } = useLanguage();
  const tAbout = translations[lang].about;
  const tNav = translations[lang].nav;

  return (
    <section id="about" className="section-padding min-h-[calc(100vh-4.75rem)] flex flex-col">
      <div className="max-w-[85rem] w-full mx-auto mt-16 md:mt-28">
        <div className="text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-zinc-900 dark:text-zinc-100 mb-10">
            {tAbout.heading}{" "}
            <span className="text-zinc-900 dark:text-zinc-100">{tAbout.headingAccent}</span>
          </h2>

          <div className="flex items-center justify-center gap-4 md:gap-6 mb-10">
            <img
              src={Logo}
              alt="B401 Logo"
              className="w-20 h-20 md:w-28 md:h-28 object-contain shrink-0"
              loading="lazy"
            />
            <span className="font-display font-semibold text-zinc-900 dark:text-zinc-100 text-left text-xl md:text-2xl leading-tight whitespace-pre-line">
              {tNav.labName}
            </span>
          </div>

          <p className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            {tAbout.body}
          </p>
        </div>
      </div>
    </section>
  );
}