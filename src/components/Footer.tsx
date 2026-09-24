import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../contents/translations";
import Logo from "../assets/logo/Logo.webp";

const SOCIALS = [
  {
    name: "Email",
    href: "mailto:b401robotics@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6l-10 7L2 6" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/itsb401lab/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/b401-robotics/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://www.linkedin.com/company/b401-robotics/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.4.6.1.82-.26.82-.58v-2.2c-3.34.72-4.04-1.42-4.04-1.42-.55-1.4-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74 1.21.09 1.85 1.24 1.85 1.24 1.08 1.85 2.83 1.31 3.52 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.05.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12.01 12.01 0 0024 12.5C24 5.87 18.63.5 12 .5z" />
      </svg>
    ),
  },
];

export function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900">
      <div className="max-w-[85rem] mx-auto px-6 md:px-10 lg:px-14 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-10">
          {/* Column 1 — Brand: logo + slogan */}
          <div>
            <Link
              to={`/${lang}`}
              onClick={() => window.scrollTo(0, 0)}
              className="flex items-center gap-3 mb-4 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-500/20 rounded-lg"
            >
              <img
                src={Logo}
                alt="B401 Logo"
                className="w-10 h-10 object-contain rounded-xl drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-300"
                loading="lazy"
              />
              <span className="font-display font-semibold text-zinc-900 dark:text-zinc-100 text-sm leading-tight whitespace-pre-line group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                {t.labName}
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">{t.tagline}</p>
          </div>

          {/* Column 2 — Find Us: address */}
          <div>
            <h4 className="font-display font-semibold text-zinc-700 dark:text-zinc-300 text-sm uppercase tracking-wider mb-4">
              {t.findUsLabel}
            </h4>
            <address className="not-italic text-zinc-500 text-sm space-y-1 leading-relaxed">
              {t.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </address>
          </div>

          {/* Column 3 — Contact Us: socials */}
          <div>
            <h4 className="font-display font-semibold text-zinc-700 dark:text-zinc-300 text-sm uppercase tracking-wider mb-4">
              {t.contactLabel}
            </h4>
            <div className="flex items-center gap-3 flex-wrap">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <p className="mt-6">
              <a
                href="https://www.its.ac.id/komputer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-100 text-sm transition-colors duration-200"
              >
                its.ac.id/komputer ↗
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-200 dark:border-white/10 pt-8 flex flex-col items-center justify-center">
          <p className="text-zinc-600 dark:text-zinc-300 text-sm">
            © {year} {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}