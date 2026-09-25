import React from "react";
import { FileCode2, X } from "lucide-react";

interface DiffViewProps {
  diff: string;
  onClose: () => void;
  title?: string;
}

export const DiffView: React.FC<DiffViewProps> = ({ diff, onClose, title = "File Diff" }) => {
  const lines = diff ? diff.split("\n") : [];

  return (
    <div className="w-80 lg:w-[480px] border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col h-full shadow-lg">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCode2 className="w-4 h-4 text-blue-500" />
          <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{title}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 bg-zinc-950 font-mono text-xs text-zinc-200">
        {!diff.trim() ? (
          <div className="p-8 text-center text-zinc-500">
            No changes detected compared to disk.
          </div>
        ) : (
          <pre className="whitespace-pre">
            {lines.map((line, idx) => {
              let lineClass = "text-zinc-400";
              if (line.startsWith("+") && !line.startsWith("+++")) {
                lineClass = "bg-emerald-950/80 text-emerald-300 block px-1 -mx-1";
              } else if (line.startsWith("-") && !line.startsWith("---")) {
                lineClass = "bg-rose-950/80 text-rose-300 block px-1 -mx-1";
              } else if (line.startsWith("@")) {
                lineClass = "text-blue-400 block py-1 font-semibold";
              }

              return (
                <div key={idx} className={lineClass}>
                  {line || " "}
                </div>
              );
            })}
          </pre>
        )}
      </div>
    </div>
  );
};
