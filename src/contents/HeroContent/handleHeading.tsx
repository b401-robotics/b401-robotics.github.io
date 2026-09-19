import { type Language } from "@/context/LanguageContext";

export function handleHeroHeading(lang: Language) {
    if(lang == "en")
    {
        return(
        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-tight mb-6 animate-fade-in">
          <span className="text-zinc-900 dark:text-zinc-100">B401</span>{" "}
          <span className="text-zinc-900 dark:text-zinc-100">Robotics</span>
          <br />
          <span className="text-zinc-900 dark:text-zinc-100">&amp; Intelligent Systems</span>
          <br />
          <span className="text-zinc-900 dark:text-zinc-100">
            Laboratory
          </span>
        </h1>)
    }
    else if(lang == "id")
      return(
        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-tight mb-6 animate-fade-in">
          <span className="text-zinc-900 dark:text-zinc-100">
            Laboratorium
          </span>
          <br />
          <span className="text-zinc-900 dark:text-zinc-100">B401</span>{" "}
          <span className="text-zinc-900 dark:text-zinc-100">Robotika</span>
          <br />
          <span className="text-zinc-900 dark:text-zinc-100">&amp; Sistem Cerdas</span>
        </h1>)
}