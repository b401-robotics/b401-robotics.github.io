import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, type Language } from "../context/LanguageContext";
import { translations } from "../contents/translations";
import Logo from "../assets/logo/Logo.webp";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang].nav;
  const navigate = useNavigate();
  const location = useLocation();
  const { section } = useParams<{ section?: string }>();
  const activeSection = section || "home";

  function switchLang(targetLang: Language) {
    const newPath = location.pathname.replace(/^\/(en|id)/, `/${targetLang}`);
    navigate(newPath + location.search + location.hash);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check initial dark mode state
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      }
      return next;
    });
  };

  const navLinks = [
    { label: "Home", path: "home" },
    { label: t.research, path: "research" },
    { label: t.practicums, path: "practicums" },
    { label: t.projects, path: "projects" },
    { label: t.members, path: "members" },
    { label: t.achievements, path: "achievements" },
    { label: t.contact, path: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 ${
        scrolled
          ? "bg-white/60 dark:bg-zinc-900/80 backdrop-blur-xl shadow-sm dark:shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to={`/${lang}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 group min-h-[44px]">
          <img 
            src={Logo} 
            alt="B401 Logo" 
            className="w-10 h-10 object-contain rounded-xl drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300"
          />
          <span className="font-display font-semibold text-zinc-900 dark:text-zinc-100 text-sm hidden sm:block leading-tight whitespace-pre-line">
            {t.labName}
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={`/${lang}/${link.path === "home" ? "" : link.path}`}
                className={`px-4 py-2 min-h-[44px] flex items-center text-sm rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-zinc-500/20 ${
                  activeSection === link.path
                    ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-white/5"
                    : "text-zinc-700 hover:text-zinc-900 dark:text-zinc-100 hover:bg-white/60"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: Lang switcher + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`no-invert relative flex items-center w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 ${
              isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-200 border-zinc-300"
            }`}
            aria-label="Toggle Dark Mode"
          >
            <div 
              className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform duration-300 ${
                isDarkMode ? "translate-x-6" : "translate-x-0"
              }`}
            >
              {isDarkMode ? (
                <svg className="w-3.5 h-3.5 text-zinc-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 4.22a1 1 0 011.415 1.415l-.708.708a1 1 0 01-1.414-1.414l.707-.708zM17 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-4.22 4.22a1 1 0 01-1.415 1.415l-.708-.708a1 1 0 011.414-1.414l.707.708zM10 17a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm-4.22-4.22a1 1 0 01-1.415-1.415l.708-.708a1 1 0 011.414 1.414l-.707.708zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zM5.78 5.78a1 1 0 011.414-1.414l.708.708a1 1 0 01-1.415 1.415l-.708-.708zM10 5a5 5 0 100 10 5 5 0 000-10z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </button>

          {/* Language Switcher */}
          <div className="relative flex items-center rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-100/80 p-1 min-h-[44px]">
            <div 
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-zinc-900 rounded-md transition-transform duration-300 ease-out ${
                lang === "en" ? "translate-x-0" : "translate-x-full"
              }`}
            />
            <button
              id="lang-en-btn"
              onClick={() => switchLang("en")}
              className={`relative z-10 w-11 py-1.5 text-xs font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 rounded-md ${
                lang === "en" ? "text-white" : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:text-zinc-100"
              }`}
            >
              EN
            </button>
            <button
              id="lang-id-btn"
              onClick={() => switchLang("id")}
              className={`relative z-10 w-11 py-1.5 text-xs font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 rounded-md ${
                lang === "id" ? "text-white" : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:text-zinc-100"
              }`}
            >
              ID
            </button>
          </div>

          {/* CTA */}
          <Link
            to={`/${lang}/contact`}
            className="px-5 py-2 min-h-[44px] flex items-center rounded-lg bg-zinc-900 text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-all duration-300"
          >
            {t.joinUs}
          </Link>
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          {/* Dark Mode Toggle (mobile) */}
          <button
            onClick={toggleDarkMode}
            className={`no-invert relative flex items-center w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 ${
              isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-200 border-zinc-300"
            }`}
            aria-label="Toggle Dark Mode"
          >
            <div 
              className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform duration-300 ${
                isDarkMode ? "translate-x-6" : "translate-x-0"
              }`}
            >
              {isDarkMode ? (
                <svg className="w-3.5 h-3.5 text-zinc-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 4.22a1 1 0 011.415 1.415l-.708.708a1 1 0 01-1.414-1.414l.707-.708zM17 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-4.22 4.22a1 1 0 01-1.415 1.415l-.708-.708a1 1 0 011.414-1.414l.707.708zM10 17a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm-4.22-4.22a1 1 0 01-1.415-1.415l.708-.708a1 1 0 011.414 1.414l-.707.708zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zM5.78 5.78a1 1 0 011.414-1.414l.708.708a1 1 0 01-1.415 1.415l-.708-.708zM10 5a5 5 0 100 10 5 5 0 000-10z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </button>

          {/* Language Switcher (mobile) */}
          <div className="relative flex items-center rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-100/80 p-1 min-h-[44px]">
            <div 
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-zinc-900 rounded-md transition-transform duration-300 ease-out ${
                lang === "en" ? "translate-x-0" : "translate-x-full"
              }`}
            />
            <button
              id="lang-en-btn-mobile"
              onClick={() => switchLang("en")}
              className={`relative z-10 w-11 py-1.5 text-xs font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 rounded-md ${
                lang === "en" ? "text-white" : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:text-zinc-100"
              }`}
            >
              EN
            </button>
            <button
              id="lang-id-btn-mobile"
              onClick={() => switchLang("id")}
              className={`relative z-10 w-11 py-1.5 text-xs font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 rounded-md ${
                lang === "id" ? "text-white" : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:text-zinc-100"
              }`}
            >
              ID
            </button>
          </div>

          {/* Hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center gap-1.5 p-3 min-h-[44px] min-w-[44px] rounded-lg hover:bg-zinc-100 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={`/${lang}/${link.path === "home" ? "" : link.path}`}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 min-h-[44px] flex items-center text-sm rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-zinc-500/20 ${
                    activeSection === link.path
                      ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-white/5"
                      : "text-zinc-700 hover:text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to={`/${lang}/contact`}
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-4 py-3 min-h-[44px] flex items-center justify-center rounded-lg bg-zinc-900 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-all duration-200"
              >
                {t.joinUs}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
