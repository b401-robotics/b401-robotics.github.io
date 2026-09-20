import { Link } from "react-router-dom";

interface PreviewSideCTAProps {
  to: string;
  label: string;
}

export function PreviewSideCTA({ to, label }: PreviewSideCTAProps) {
  return (
    <div className="flex lg:w-64 shrink-0 items-stretch justify-center">
      <Link
        to={to}
        className="group flex flex-col items-center justify-center w-full card-glass rounded-2xl p-8 text-center border border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-zinc-500 hover:ring-2 hover:ring-zinc-300/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 min-h-[200px]"
      >
        <div className="w-14 h-14 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
        <div className="font-display font-semibold text-zinc-900 dark:text-zinc-100 text-base leading-snug">
          {label}
        </div>
      </Link>
    </div>
  );
}