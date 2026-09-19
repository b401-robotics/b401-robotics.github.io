import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../contents/translations";
import { handleHeroHeading } from "../contents/HeroContent/handleHeading";
import { AnimatedCounter } from "./AnimatedCounter";

const ICONS = [
  <svg key="research" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01-1.8 2.25v.002a2.25 2.25 0 01-2.243 2.25H8.243A2.25 2.25 0 016 17.252v-.002A2.25 2.25 0 014.2 15m15.6 0l-5.4-5.3M4.2 15l5.4-5.3m0 0a2.25 2.25 0 012.7 0" />
  </svg>,
  <svg key="practicum" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>,
  <svg key="community" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>,
  <svg key="equipment" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
  </svg>,
];

export function HeroSection() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const tAbout = translations[lang].about;

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center pt-16 pb-32 overflow-hidden"
    >
      {/* Solid background subtle grid pattern could go here, but keeping it clean for matte dark */}

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

        {/* About Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-32 text-left"
        >
          <div className="text-center mb-16 relative">
            <span className="inline-block px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 text-sm font-medium mb-4">
              {tAbout.sectionLabel}
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-zinc-100 mb-5">
              {tAbout.heading}{" "}
              <span className="text-zinc-900 dark:text-zinc-100">{tAbout.headingAccent}</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 text-lg max-w-3xl mx-auto leading-relaxed">
              {tAbout.body}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tAbout.highlights.map((item, idx) => (
              <div
                key={item.title}
                className="card-glass rounded-2xl p-6 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:border-zinc-200 dark:hover:border-zinc-700 hover:ring-2 hover:ring-zinc-300/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 mb-4 group-hover:scale-110 group-hover:ring-2 group-hover:ring-zinc-300/50 transition-all duration-300">
                  {ICONS[idx]}
                </div>
                <h3 className="font-display font-semibold text-zinc-900 dark:text-zinc-100 text-lg mb-2">{item.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
