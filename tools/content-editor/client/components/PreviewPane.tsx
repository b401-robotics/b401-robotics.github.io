import React, { useState } from "react";
import { Eye, X, Code, Layout } from "lucide-react";

interface PreviewPaneProps {
  sectionKey: string;
  value: any;
  onClose: () => void;
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({
  sectionKey,
  value,
  onClose,
}) => {
  const [viewMode, setViewMode] = useState<"card" | "json">("card");

  const renderCardView = (data: any) => {
    if (!data) return <p className="text-zinc-400 text-xs">No data to preview.</p>;

    if (Array.isArray(data)) {
      return (
        <div className="space-y-4">
          <div className="text-xs font-semibold uppercase text-zinc-400">
            {data.length} items
          </div>
          <div className="grid grid-cols-1 gap-3">
            {data.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    {item.name || item.title || `Item #${idx + 1}`}
                  </span>
                  {item.initials && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold">
                      {item.initials}
                    </span>
                  )}
                </div>

                {item.role && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                    {item.role}
                  </p>
                )}

                {(item.description || item.summary || item.body || item.expertise || item.info) && (
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-2">
                    {item.description || item.summary || item.body || item.expertise || item.info}
                  </p>
                )}

                {item.topics && Array.isArray(item.topics) && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.topics.map((t: any, tidx: number) => (
                      <span
                        key={tidx}
                        className="px-2 py-0.5 rounded text-[11px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                      >
                        {typeof t === "string" ? t : t.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Section Header */}
        <div className="space-y-2">
          {data.sectionLabel && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50">
              {data.sectionLabel}
            </span>
          )}

          {(data.heading || data.headingAccent) && (
            <h2 className="text-2xl font-bold font-display text-zinc-900 dark:text-zinc-100">
              {data.heading} <span className="text-blue-600 dark:text-blue-400">{data.headingAccent}</span>
            </h2>
          )}

          {data.body && (
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {data.body}
            </p>
          )}
        </div>

        {/* Highlight list / items if any */}
        {(data.highlights || data.items || data.areas || data.labRooms || data.facilities) && (
          <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Items Preview
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {(data.highlights || data.items || data.areas || data.labRooms || data.facilities).map(
                (sub: any, sIdx: number) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                  >
                    <div className="font-semibold text-xs text-zinc-800 dark:text-zinc-200">
                      {sub.title || sub.name || `Entry ${sIdx + 1}`}
                    </div>
                    {(sub.description || sub.desc || sub.info) && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                        {sub.description || sub.desc || sub.info}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-80 lg:w-[480px] border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col h-full shadow-lg">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-blue-500" />
          <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
            Preview: {sectionKey}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5">
            <button
              onClick={() => setViewMode("card")}
              className={`p-1 rounded ${viewMode === "card" ? "bg-white dark:bg-zinc-700 shadow-xs" : "text-zinc-500"}`}
              title="Card view"
            >
              <Layout className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("json")}
              className={`p-1 rounded ${viewMode === "json" ? "bg-white dark:bg-zinc-700 shadow-xs" : "text-zinc-500"}`}
              title="JSON view"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 bg-zinc-50/50 dark:bg-zinc-950/50">
        {viewMode === "json" ? (
          <pre className="font-mono text-xs text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
            {JSON.stringify(value, null, 2)}
          </pre>
        ) : (
          renderCardView(value)
        )}
      </div>
    </div>
  );
};