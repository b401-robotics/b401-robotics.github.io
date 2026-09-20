import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../contents/translations";
import { handleHeroHeading } from "../contents/HeroContent/handleHeading";
import { AnimatedCounter } from "./AnimatedCounter";

export function HeroSection() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center pt-16 pb-32 overflow-hidden"
    >
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-zinc-100 dark:bg-white/5 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-zinc-600/10 blur-3xl animate-float pointer-events-none" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-zinc-200/50 blur-3xl animate-float pointer-events-none" style={{ animationDelay: "1.5s" }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse" />
          {t.badge}
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {handleHeroHeading(lang)}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-zinc-600 dark:text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to={`/${lang}/research`}
            id="hero-explore-btn"
            className="px-8 py-3.5 rounded-xl bg-zinc-900 text-white font-semibold hover:opacity-90 hover:shadow-xl hover:shadow-black/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            {t.exploreResearch}
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {t.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-3xl text-zinc-900 dark:text-zinc-100"><AnimatedCounter value={stat.value} /></div>
              <div className="text-zinc-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}