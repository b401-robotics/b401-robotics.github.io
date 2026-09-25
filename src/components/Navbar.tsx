import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "../contents/translations";
import LogoLight from "../assets/logo/B401_transparent.png";
import LogoDark from "../assets/logo/B401_white_cutout.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const t = translations.nav;
  const { section } = useParams<{ section?: string }>();
  const activeSection = section || "home";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Check initial dark mode state
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
      }
      return next;
    });
  };

  const navLinks = [
    { label: "Home", path: "home" },
    { label: t.highlight, path: "highlight" },
    { label: t.facility, path: "equipment" },
    { label: t.practicums, path: "practicums" },
    { label: t.members, path: "members" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 ${
        scrolled
          ? "bg-white dark:bg-zinc-900 shadow-sm dark:shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="w-full nav-edge-px flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 group min-h-[44px]">
          <img
            src={LogoLight}
            alt="B401 Logo"
            className="w-10 h-10 object-contain rounded-xl drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300 dark:hidden"
          />
          <img
            src={LogoDark}
            alt="B401 Logo"
            className="w-10 h-10 object-contain rounded-xl drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300 hidden dark:block"
          />
          <span className="font-display font-semibold text-zinc-900 dark:text-zinc-100 text-sm hidden sm:block leading-tight whitespace-pre-line">
            {t.labName}
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path === "home" ? "/" : `/${link.path}`}
                  className={`group relative px-4 py-2 min-h-[44px] flex items-center text-sm transition-colors duration-200 font-medium focus:outline-none ${
                    isActive
                      ? "text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-700 hover:text-zinc-900 dark:text-zinc-100"
                  }`}
                >
                  {link.label}
                  {/* Underline — scales in on hover, always visible when active */}
                  <span
                    className={`absolute bottom-1 left-4 right-4 h-0.5 origin-left rounded-full bg-zinc-900 dark:bg-zinc-100 transition-transform duration-300 ease-out ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side: Dark mode toggle (desktop) */}
        <div className="hidden md:flex items-center gap-3">
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
        </div>

        {/* Mobile: dark mode + hamburger */}
        <div className="md:hidden flex items-center gap-2">
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
              {navLinks.map((link) => {
                const isActive = activeSection === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path === "home" ? "/" : `/${link.path}`}
                    onClick={() => setMenuOpen(false)}
                    className={`group relative px-4 py-3 min-h-[44px] flex items-center text-sm transition-colors duration-200 font-medium focus:outline-none ${
                      isActive
                        ? "text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-700 hover:text-zinc-900 dark:text-zinc-100"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-1 left-4 right-4 h-0.5 origin-left rounded-full bg-zinc-900 dark:bg-zinc-100 transition-transform duration-300 ease-out ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
