import React, { useMemo } from "react";
import type { DiscoveredSection } from "../../server/types";
import { inferSchema } from "../lib/schema";
import { FieldEditor } from "./FieldEditor";
import { ArrayFieldEditor } from "./ArrayFieldEditor";
import { Lock, Sparkles } from "lucide-react";

interface SectionEditorProps {
  section: DiscoveredSection;
  enValue: any;
  standaloneValue: any;
  onChangeEn: (val: any) => void;
  onChangeStandalone: (val: any) => void;
  hasDraft: boolean;
  onRestoreDraft: () => void;
  onDiscardDraft: () => void;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  enValue,
  standaloneValue,
  onChangeEn,
  onChangeStandalone,
  hasDraft,
  onRestoreDraft,
  onDiscardDraft,
}) => {
  const enSchema = useMemo(() => inferSchema(enValue, section.key), [enValue, section.key]);
  const standaloneSchema = useMemo(
    () => inferSchema(standaloneValue, section.key),
    [standaloneValue, section.key]
  );

  const DraftBanner = hasDraft ? (
    <div className="px-6 py-2.5 bg-amber-50 dark:bg-amber-950/60 border-b border-amber-200 dark:border-amber-800/80 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <span>Unsaved draft was restored from your browser cache for this section.</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onRestoreDraft}
          className="px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-800 text-xs font-semibold hover:bg-amber-300 transition"
        >
          Restore
        </button>
        <button
          onClick={onDiscardDraft}
          className="text-amber-700 dark:text-amber-400 hover:underline text-xs"
        >
          Discard
        </button>
      </div>
    </div>
  ) : null;

  // 1. Read-only section (e.g. a .tsx file)
  if (section.kind === "read-only") {
    return (
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 flex items-start gap-3 text-amber-900 dark:text-amber-200">
            <Lock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm">Read-Only Section</h3>
              <p className="text-xs mt-1 leading-relaxed">
                {section.readOnlyReason ||
                  "This file contains JSX or non-literal expressions and must be edited directly in source code."}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
            <pre>{enValue?.code || "// No content"}</pre>
          </div>
        </div>
      </div>
    );
  }

  // 2. Standalone section (e.g. lecturers, assistants, alumni)
  if (section.kind === "standalone") {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        {DraftBanner}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {section.key}
                </h2>
                <p className="text-xs text-zinc-400">
                  Data export from <code>{section.files.standalone}</code>
                </p>
              </div>
            </div>

            {Array.isArray(standaloneValue) ? (
              <ArrayFieldEditor
                schema={standaloneSchema}
                value={standaloneValue}
                onChange={onChangeStandalone}
              />
            ) : typeof standaloneValue === "object" && standaloneSchema.properties ? (
              <div className="space-y-4">
                {Object.entries(standaloneSchema.properties).map(([k, s]) => (
                  <FieldEditor
                    key={k}
                    schema={s}
                    value={standaloneValue ? standaloneValue[k] : undefined}
                    onChange={(val) =>
                      onChangeStandalone({
                        ...(standaloneValue || {}),
                        [k]: val,
                      })
                    }
                  />
                ))}
              </div>
            ) : (
              <FieldEditor
                schema={standaloneSchema}
                value={standaloneValue}
                onChange={onChangeStandalone}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. Content section (EN-only)
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {DraftBanner}

      <div className="px-6 py-2 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
          Editing Section:{" "}
          <span className="font-mono text-blue-600 dark:text-blue-400">{section.key}</span>
        </span>
        <span className="font-mono text-zinc-400">{section.folder}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        <div className="max-w-3xl mx-auto w-full">
          {enValue && typeof enValue === "object" ? (
            <div className="space-y-4">
              {Object.entries(enValue).map(([key, val]) => {
                const schema = enSchema.properties?.[key] || inferSchema(val, key);
                if (schema.type === "stringArray" || schema.type === "objectArray") {
                  return (
                    <ArrayFieldEditor
                      key={key}
                      schema={schema}
                      value={val as any[]}
                      onChange={(newArr) => onChangeEn({ ...enValue, [key]: newArr })}
                    />
                  );
                }
                return (
                  <FieldEditor
                    key={key}
                    schema={schema}
                    value={val}
                    onChange={(newVal) => onChangeEn({ ...enValue, [key]: newVal })}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-zinc-400 text-xs">No content loaded.</p>
          )}
        </div>
      </div>
    </div>
  );
};