import React from "react";
import type { SchemaNode } from "../lib/schema";
import { ArrowRightLeft, Copy } from "lucide-react";
import { ImageUrlEditor } from "./ImageUrlEditor";
import { ArrayFieldEditor } from "./ArrayFieldEditor";

interface FieldEditorProps {
  schema: SchemaNode;
  value: any;
  onChange: (val: any) => void;
  path?: string[];
  counterpartValue?: any;
  onCopyFromCounterpart?: () => void;
  isIdColumn?: boolean;
  disabled?: boolean;
}

export const FieldEditor: React.FC<FieldEditorProps> = ({
  schema,
  value,
  onChange,
  counterpartValue,
  onCopyFromCounterpart,
  isIdColumn,
  disabled = false,
}) => {
  const label = schema.label || schema.key;

  // Bilingual String: { en: string, id: string }
  if (schema.type === "bilingualString") {
    const enVal = value?.en ?? "";
    const idVal = value?.id ?? "";

    return (
      <div className="space-y-1.5 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
        <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300">
          {label} <span className="text-[10px] text-zinc-400 font-normal">(Bilingual)</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <div className="text-[11px] font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center justify-between">
              <span>English (EN)</span>
            </div>
            <input
              type="text"
              disabled={disabled}
              value={enVal}
              onChange={(e) => onChange({ ...(value || {}), en: e.target.value })}
              className="w-full px-2.5 py-1.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-zinc-100"
            />
          </div>
          <div>
            <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mb-1 flex items-center justify-between">
              <span>Indonesian (ID)</span>
              {enVal && !idVal && (
                <button
                  type="button"
                  onClick={() => onChange({ ...(value || {}), id: enVal })}
                  className="text-[10px] text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 flex items-center gap-0.5"
                  title="Copy EN to ID"
                >
                  <Copy className="w-2.5 h-2.5" /> Copy EN
                </button>
              )}
            </div>
            <input
              type="text"
              disabled={disabled}
              value={idVal}
              onChange={(e) => onChange({ ...(value || {}), id: e.target.value })}
              className="w-full px-2.5 py-1.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-zinc-100"
            />
          </div>
        </div>
      </div>
    );
  }

  // Boolean
  if (schema.type === "boolean") {
    return (
      <div className="flex items-center gap-2 py-1">
        <input
          type="checkbox"
          id={schema.key}
          disabled={disabled}
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"
        />
        <label htmlFor={schema.key} className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
      </div>
    );
  }

  // Number
  if (schema.type === "number") {
    return (
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300">
          {label}
        </label>
        <input
          type="number"
          disabled={disabled}
          value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full px-2.5 py-1.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-zinc-100"
        />
      </div>
    );
  }

  // Image URL
  if (schema.type === "imageUrl") {
    return (
      <ImageUrlEditor
        schema={schema}
        value={typeof value === "string" ? value : ""}
        onChange={onChange}
        disabled={disabled}
      />
    );
  }

  // Array (stringArray / objectArray) — delegate to ArrayFieldEditor
  if (schema.type === "stringArray" || schema.type === "objectArray") {
    return (
      <ArrayFieldEditor
        schema={schema}
        value={Array.isArray(value) ? value : []}
        onChange={onChange}
        counterpartValue={counterpartValue}
        isIdColumn={isIdColumn}
        disabled={disabled}
      />
    );
  }

  // Multiline String
  if (schema.type === "multilineString") {
    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300">
            {label}
          </label>
          {isIdColumn && onCopyFromCounterpart && counterpartValue && (
            <button
              type="button"
              onClick={onCopyFromCounterpart}
              className="text-[11px] text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 flex items-center gap-1 transition"
              title="Copy counterpart value"
            >
              <Copy className="w-3 h-3" /> Copy EN
            </button>
          )}
        </div>
        <textarea
          rows={3}
          disabled={disabled}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-2.5 py-1.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-zinc-100 resize-y leading-relaxed"
        />
      </div>
    );
  }

  // Nested Object
  if (schema.type === "object" && schema.properties) {
    return (
      <div className="space-y-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <h4 className="text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
          {label}
        </h4>
        <div className="space-y-2.5">
          {Object.entries(schema.properties).map(([propKey, propSchema]) => (
            <FieldEditor
              key={propKey}
              schema={propSchema}
              value={value ? value[propKey] : undefined}
              onChange={(newPropVal) =>
                onChange({
                  ...(value || {}),
                  [propKey]: newPropVal,
                })
              }
              counterpartValue={counterpartValue ? counterpartValue[propKey] : undefined}
              onCopyFromCounterpart={
                onCopyFromCounterpart
                  ? () => {
                      if (counterpartValue && counterpartValue[propKey] !== undefined) {
                        onChange({
                          ...(value || {}),
                          [propKey]: counterpartValue[propKey],
                        });
                      }
                    }
                  : undefined
              }
              isIdColumn={isIdColumn}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    );
  }

  // Single-line String (default)
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300">
          {label}
        </label>
        {isIdColumn && onCopyFromCounterpart && counterpartValue && (
          <button
            type="button"
            onClick={onCopyFromCounterpart}
            className="text-[11px] text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 flex items-center gap-1 transition"
            title="Copy counterpart value"
          >
            <Copy className="w-3 h-3" /> Copy EN
          </button>
        )}
      </div>
      <input
        type="text"
        disabled={disabled}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2.5 py-1.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-zinc-100"
      />
    </div>
  );
};