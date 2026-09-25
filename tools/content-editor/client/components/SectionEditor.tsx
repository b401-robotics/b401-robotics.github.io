import React, { useRef, useState, useMemo } from "react";
import type { DiscoveredSection } from "../../server/types";
import { inferSchema } from "../lib/schema";
import { FieldEditor } from "./FieldEditor";
import { ArrayFieldEditor } from "./ArrayFieldEditor";
import {
  FileText,
  Lock,
  ArrowRightLeft,
  Copy,
  AlertCircle,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface SectionEditorProps {
  section: DiscoveredSection;
  enValue: any;
  idValue: any;
  standaloneValue: any;
  onChangeEn: (val: any) => void;
  onChangeId: (val: any) => void;
  onChangeStandalone: (val: any) => void;
  hasDraftEn: boolean;
  hasDraftId: boolean;
  onRestoreDraftEn: () => void;
  onRestoreDraftId: () => void;
  onDiscardDraftEn: () => void;
  onDiscardDraftId: () => void;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  enValue,
  idValue,
  standaloneValue,
  onChangeEn,
  onChangeId,
  onChangeStandalone,
  hasDraftEn,
  hasDraftId,
  onRestoreDraftEn,
  onRestoreDraftId,
  onDiscardDraftEn,
  onDiscardDraftId,
}) => {
  const enScrollRef = useRef<HTMLDivElement>(null);
  const idScrollRef = useRef<HTMLDivElement>(null);
  const isSyncingScroll = useRef(false);
  const [syncScroll, setSyncScroll] = useState(true);

  const handleScroll = (source: "en" | "id") => {
    if (!syncScroll || isSyncingScroll.current) return;
    isSyncingScroll.current = true;

    if (source === "en" && enScrollRef.current && idScrollRef.current) {
      idScrollRef.current.scrollTop = enScrollRef.current.scrollTop;
    } else if (source === "id" && idScrollRef.current && enScrollRef.current) {
      enScrollRef.current.scrollTop = idScrollRef.current.scrollTop;
    }

    requestAnimationFrame(() => {
      isSyncingScroll.current = false;
    });
  };

  // Infer schemas
  const enSchema = useMemo(() => inferSchema(enValue, section.key), [enValue, section.key]);
  const idSchema = useMemo(() => inferSchema(idValue, section.key), [idValue, section.key]);
  const standaloneSchema = useMemo(
    () => inferSchema(standaloneValue, section.key),
    [standaloneValue, section.key]
  );

  // 1. Read-only section (e.g. handleHeading.tsx)
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
            <pre>{standaloneValue?.code || "// No content"}</pre>
          </div>
        </div>
      </div>
    );
  }

  // 2. Standalone section (e.g. memberList.ts exports: lecturers, assistants, alumni)
  if (section.kind === "standalone") {
    return (
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
    );
  }

  // 3. Paired Section (Side by side EN | ID)
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Draft recovery notices */}
      {(hasDraftEn || hasDraftId) && (
        <div className="px-6 py-2.5 bg-amber-50 dark:bg-amber-950/60 border-b border-amber-200 dark:border-amber-800/80 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Unsaved drafts were restored from your browser cache for this section.</span>
          </div>
          <div className="flex items-center gap-2">
            {hasDraftEn && (
              <button
                onClick={onRestoreDraftEn}
                className="px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-800 text-xs font-semibold hover:bg-amber-300 transition"
              >
                Restore EN
              </button>
            )}
            {hasDraftId && (
              <button
                onClick={onRestoreDraftId}
                className="px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-800 text-xs font-semibold hover:bg-amber-300 transition"
              >
                Restore ID
              </button>
            )}
            <button
              onClick={() => {
                if (hasDraftEn) onDiscardDraftEn();
                if (hasDraftId) onDiscardDraftId();
              }}
              className="text-amber-700 dark:text-amber-400 hover:underline text-xs"
            >
              Discard Drafts
            </button>
          </div>
        </div>
      )}

      {/* Synchronized scroll indicator toolbar */}
      <div className="px-6 py-2 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
          Editing Section: <span className="font-mono text-blue-600 dark:text-blue-400">{section.key}</span>
        </span>

        <button
          onClick={() => setSyncScroll(!syncScroll)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition ${
            syncScroll
              ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40"
              : "text-zinc-400 hover:text-zinc-700"
          }`}
          title="Toggle Synchronized Scrolling"
        >
          <ArrowRightLeft className="w-3 h-3" />
          <span>Sync Scroll {syncScroll ? "ON" : "OFF"}</span>
        </button>
      </div>

      {/* Side-by-side EN | ID columns */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800 min-h-0">
        {/* EN Column */}
        <div
          ref={enScrollRef}
          onScroll={() => handleScroll("en")}
          className="overflow-y-auto p-6 space-y-5"
        >
          <div className="sticky top-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xs pb-3 pt-1 border-b border-zinc-200 dark:border-zinc-800 z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                EN
              </span>
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                English Content
              </h3>
            </div>
          </div>

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
                      counterpartValue={idValue ? idValue[key] : undefined}
                      isIdColumn={false}
                    />
                  );
                }
                return (
                  <FieldEditor
                    key={key}
                    schema={schema}
                    value={val}
                    onChange={(newVal) => onChangeEn({ ...enValue, [key]: newVal })}
                    counterpartValue={idValue ? idValue[key] : undefined}
                    isIdColumn={false}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-zinc-400 text-xs">No EN content loaded.</p>
          )}
        </div>

        {/* ID Column */}
        <div
          ref={idScrollRef}
          onScroll={() => handleScroll("id")}
          className="overflow-y-auto p-6 space-y-5 bg-zinc-50/20 dark:bg-zinc-950/20"
        >
          <div className="sticky top-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xs pb-3 pt-1 border-b border-zinc-200 dark:border-zinc-800 z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                ID
              </span>
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                Indonesian Content
              </h3>
            </div>
          </div>

          {idValue && typeof idValue === "object" ? (
            <div className="space-y-4">
              {Object.entries(idValue).map(([key, val]) => {
                const schema = idSchema.properties?.[key] || inferSchema(val, key);
                if (schema.type === "stringArray" || schema.type === "objectArray") {
                  return (
                    <ArrayFieldEditor
                      key={key}
                      schema={schema}
                      value={val as any[]}
                      onChange={(newArr) => onChangeId({ ...idValue, [key]: newArr })}
                      counterpartValue={enValue ? enValue[key] : undefined}
                      isIdColumn={true}
                    />
                  );
                }
                return (
                  <FieldEditor
                    key={key}
                    schema={schema}
                    value={val}
                    onChange={(newVal) => onChangeId({ ...idValue, [key]: newVal })}
                    counterpartValue={enValue ? enValue[key] : undefined}
                    onCopyFromCounterpart={() => {
                      if (enValue && enValue[key] !== undefined) {
                        onChangeId({ ...idValue, [key]: enValue[key] });
                      }
                    }}
                    isIdColumn={true}
                  />
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl space-y-2">
              <p className="text-xs text-zinc-400">
                No Indonesian (ID) translation file found for this section.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
