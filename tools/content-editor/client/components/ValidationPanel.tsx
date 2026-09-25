import React from "react";
import type { ValidationIssue, ValidationReport } from "../../server/types";
import { AlertTriangle, XCircle, CheckCircle2, RefreshCw, X } from "lucide-react";

interface ValidationPanelProps {
  report: ValidationReport | null;
  loading: boolean;
  onRevalidate: () => void;
  onClose: () => void;
  onSelectSection?: (key: string) => void;
}

export const ValidationPanel: React.FC<ValidationPanelProps> = ({
  report,
  loading,
  onRevalidate,
  onClose,
  onSelectSection,
}) => {
  return (
    <div className="w-80 lg:w-96 border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col h-full shadow-lg">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
            Validation Report
          </h3>
          {report && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                report.valid
                  ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                  : "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
              }`}
            >
              {report.valid ? "PASSED" : `${report.issues.length} ISSUES`}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onRevalidate}
            disabled={loading}
            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
            title="Re-validate"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
            title="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-zinc-400 gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
            <p className="text-xs">Running cross-language, translations & tsc checks...</p>
          </div>
        ) : !report ? (
          <div className="text-center py-12 text-zinc-400">
            <p className="text-xs">Click Validate to run checks.</p>
          </div>
        ) : report.issues.length === 0 ? (
          <div className="text-center py-12 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              All Checks Passed
            </h4>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              Bilingual structures match, translations.ts entries are aligned, and TypeScript compiler reports no errors.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {report.issues.map((issue, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs flex flex-col gap-1.5 ${
                  issue.severity === "error"
                    ? "bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200"
                    : "bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold">
                    {issue.severity === "error" ? (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                    <span className="uppercase tracking-wider text-[10px]">
                      {issue.type}
                    </span>
                  </div>

                  {issue.section && (
                    <button
                      onClick={() => onSelectSection?.(issue.section!)}
                      className="text-[10px] px-2 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 font-mono hover:bg-zinc-300 transition"
                    >
                      {issue.section}
                    </button>
                  )}
                </div>

                <p className="leading-relaxed whitespace-pre-wrap font-mono text-[11px] break-all">
                  {issue.message}
                </p>

                {issue.path && (
                  <span className="text-[10px] opacity-75 font-mono">
                    Path: {issue.path}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
