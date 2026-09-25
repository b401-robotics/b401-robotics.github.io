import React from "react";
import type { SchemaNode } from "../lib/schema";
import { FieldEditor } from "./FieldEditor";
import { Plus, Trash2, Copy, ArrowUp, ArrowDown, AlertCircle } from "lucide-react";
import { deepClone } from "../lib/format";

interface ArrayFieldEditorProps {
  schema: SchemaNode;
  value: any[];
  onChange: (val: any[]) => void;
  counterpartValue?: any[];
  isIdColumn?: boolean;
  disabled?: boolean;
}

export const ArrayFieldEditor: React.FC<ArrayFieldEditorProps> = ({
  schema,
  value = [],
  onChange,
  counterpartValue,
  isIdColumn,
  disabled = false,
}) => {
  const items = Array.isArray(value) ? value : [];
  const counterpartItems = Array.isArray(counterpartValue) ? counterpartValue : [];
  const label = schema.label || schema.key;
  const itemSchema = schema.itemSchema || { type: "string", key: "item", label: "Item" };

  const addItem = () => {
    let newItem: any = "";
    if (itemSchema.type === "object") {
      newItem = {};
      if (itemSchema.properties) {
        for (const [k, s] of Object.entries(itemSchema.properties)) {
          if (s.type === "string" || s.type === "multilineString") newItem[k] = "";
          else if (s.type === "number") newItem[k] = 0;
          else if (s.type === "boolean") newItem[k] = false;
          else if (s.type === "stringArray" || s.type === "objectArray") newItem[k] = [];
          else if (s.type === "bilingualString") newItem[k] = { en: "", id: "" };
        }
      }
    }
    onChange([...items, newItem]);
  };

  const duplicateItem = (idx: number) => {
    const target = deepClone(items[idx]);
    const next = [...items];
    next.splice(idx + 1, 0, target);
    onChange(next);
  };

  const deleteItem = (idx: number) => {
    const next = items.filter((_, i) => i !== idx);
    onChange(next);
  };

  const moveItem = (idx: number, direction: "up" | "down") => {
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === items.length - 1) return;
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    const next = [...items];
    const temp = next[idx]!;
    next[idx] = next[targetIdx]!;
    next[targetIdx] = temp;
    onChange(next);
  };

  const updateItem = (idx: number, updatedItem: any) => {
    const next = [...items];
    next[idx] = updatedItem;
    onChange(next);
  };

  const hasLengthMismatch =
    counterpartItems.length > 0 && items.length !== counterpartItems.length;

  return (
    <div className="space-y-3 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-200 uppercase tracking-wider">
            {label}
          </label>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={addItem}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-md transition"
        >
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>

      {hasLengthMismatch && (
        <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-2 text-xs text-amber-800 dark:text-amber-200">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
          <div className="flex-1">
            <span>
              Length mismatch: this language has {items.length} items, but counterpart has {counterpartItems.length} items.
            </span>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="p-6 text-center border border-dashed border-zinc-300 dark:border-zinc-800 rounded-lg">
          <p className="text-xs text-zinc-400">No items in this list.</p>
          <button
            type="button"
            disabled={disabled}
            onClick={addItem}
            className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Plus className="w-3 h-3" /> Add item
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs relative group"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-400">
                <span className="font-mono font-medium text-zinc-500 dark:text-zinc-400">
                  #{idx + 1}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={disabled || idx === 0}
                    onClick={() => moveItem(idx, "up")}
                    className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded disabled:opacity-30 transition"
                    title="Move up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={disabled || idx === items.length - 1}
                    onClick={() => moveItem(idx, "down")}
                    className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded disabled:opacity-30 transition"
                    title="Move down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => duplicateItem(idx)}
                    className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition"
                    title="Duplicate"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => deleteItem(idx)}
                    className="p-1 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-600 rounded transition"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {itemSchema.type === "object" && itemSchema.properties ? (
                <div className="space-y-2.5">
                  {Object.entries(itemSchema.properties).map(([fieldKey, fieldSchema]) => (
                    <FieldEditor
                      key={fieldKey}
                      schema={fieldSchema}
                      value={item ? item[fieldKey] : undefined}
                      onChange={(newFieldVal) =>
                        updateItem(idx, {
                          ...(item || {}),
                          [fieldKey]: newFieldVal,
                        })
                      }
                      counterpartValue={
                        counterpartItems[idx] ? counterpartItems[idx][fieldKey] : undefined
                      }
                      onCopyFromCounterpart={() => {
                        if (counterpartItems[idx] && counterpartItems[idx][fieldKey] !== undefined) {
                          updateItem(idx, {
                            ...(item || {}),
                            [fieldKey]: counterpartItems[idx][fieldKey],
                          });
                        }
                      }}
                      isIdColumn={isIdColumn}
                      disabled={disabled}
                    />
                  ))}
                </div>
              ) : (
                <FieldEditor
                  schema={itemSchema}
                  value={item}
                  onChange={(newVal) => updateItem(idx, newVal)}
                  counterpartValue={counterpartItems[idx]}
                  onCopyFromCounterpart={() => {
                    if (counterpartItems[idx] !== undefined) {
                      updateItem(idx, counterpartItems[idx]);
                    }
                  }}
                  isIdColumn={isIdColumn}
                  disabled={disabled}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
