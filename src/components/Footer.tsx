import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../contents/translations";
import Logo from "../assets/logo/Logo.webp";

export function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;
  const navT = translations[lang].nav;
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: navT.research, path: "research" },
    { label: navT.practicums, path: "practicums" },
    { label: navT.projects, path: "projects" },
    { label: navT.members, path: "members" },
    { label: navT.achievements, path: "achievements" },
    { label: navT.contact, path: "contact" },
  ];

  return (
    <footer className="border-t border-zinc-200 bg-white dark:bg-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link to={`/${lang}`} onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-3 mb-4 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-500/20 rounded-lg">
              <img 
                src={Logo} 
                alt="B401 Logo" 
                className="w-10 h-10 object-contain rounded-xl drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-300"
                loading="lazy"
              />
              <span className="font-display font-semibold text-zinc-900 dark:text-zinc-100 text-sm leading-tight whitespace-pre-line group-hover:text-zinc-700 transition-colors">
                {t.labName}
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed">{t.tagline}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold text-zinc-700 text-sm uppercase tracking-wider mb-4">
              {t.quickLinksLabel}
            </h4>
            <ul className="grid grid-cols-3 gap-y-2 gap-x-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={`/${lang}/${link.path}`} className="text-zinc-500 hover:text-zinc-700 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 rounded-md px-1 -mx-1">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* University info */}
          <div>
            <h4 className="font-display font-semibold text-zinc-700 text-sm uppercase tracking-wider mb-4">
              {t.institutionLabel}
            </h4>
            <div className="space-y-2 text-zinc-500 text-sm">
              {t.institutionLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p className="pt-2">
                <a
                  href="https://www.its.ac.id/komputer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-700 transition-colors duration-200"
                >
                  its.ac.id/komputer↗
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-200 pt-8 flex flex-col items-center justify-center">
          <p className="text-zinc-600 dark:text-zinc-300 text-sm">
            © {year} {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
