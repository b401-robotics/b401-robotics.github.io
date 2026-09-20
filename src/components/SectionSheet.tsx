import type { ReactNode } from "react";

interface SectionSheetProps {
  id: string;
  index: number;
  total: number;
  children: ReactNode;
}

export function SectionSheet({ id, index, total, children }: SectionSheetProps) {
  return (
    <div id={id} className="w-full px-4 py-2 flex justify-center">
      <div
        className="relative w-full bg-zinc-50 dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl shadow-zinc-900/10 dark:shadow-black/50 border border-zinc-200 dark:border-white/10 flex flex-col"
        style={{
          width: "min(100%, calc((100vh - 8rem) * 16 / 9))",
          height: "calc(100vh - 8rem)",
        }}
      >
        {/* Sheet counter badge */}
        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-zinc-900/80 dark:bg-white/10 text-white text-xs font-medium backdrop-blur-sm pointer-events-none">
          {index} / {total}
        </div>

        {/* Fitting sheet content — hidden scrollbar, content scaled to sheet */}
        <div className="absolute inset-0 scrollbar-hide overflow-y-auto overflow-x-hidden flex flex-col">
          <div className="flex-1 flex flex-col justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}