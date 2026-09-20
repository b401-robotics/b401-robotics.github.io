import { Link } from "react-router-dom";

interface SectionCTAProps {
  to: string;
  label: string;
}

export function SectionCTA({ to, label }: SectionCTAProps) {
  return (
    <div className="mt-10 flex justify-center">
      <Link
        to={to}
        className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 dark:hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:ring-offset-2 transition-all duration-300 group"
      >
        {label}
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}