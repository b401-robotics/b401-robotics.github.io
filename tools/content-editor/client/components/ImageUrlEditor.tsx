import React, { useState, useEffect } from "react";
import type { SchemaNode } from "../lib/schema";
import {
  Image as ImageIcon,
  FolderOpen,
  X,
  Loader2,
  Link2,
  Check,
} from "lucide-react";
import { fetchAssetsImages, getAssetImagePreviewUrl } from "../api";

interface ImageUrlEditorProps {
  schema: SchemaNode;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

const IMAGE_EXT_REGEX = /\.(png|jpe?g|gif|webp|svg|avif|bmp|ico)$/i;

function resolvePreviewUrl(value: string): string {
  if (!value) return "";
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  if (value.startsWith("/")) return value;
  const filename = value.split(/[\\/]/).pop() || "";
  if (filename && IMAGE_EXT_REGEX.test(filename)) {
    return getAssetImagePreviewUrl(filename);
  }
  return value;
}

export const ImageUrlEditor: React.FC<ImageUrlEditorProps> = ({
  schema,
  value = "",
  onChange,
  disabled = false,
}) => {
  const label = schema.label || schema.key;
  const [pickerOpen, setPickerOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState(false);

  const strVal = typeof value === "string" ? value : "";
  const previewUrl = resolvePreviewUrl(strVal);

  useEffect(() => {
    setPreviewError(false);
  }, [strVal]);

  const openPicker = async () => {
    setPickerOpen(true);
    if (images.length === 0 && !loading) {
      setLoading(true);
      setError(null);
      try {
        const list = await fetchAssetsImages();
        setImages(list);
      } catch (err: any) {
        setError(err.message || "Failed to load images");
      } finally {
        setLoading(false);
      }
    }
  };

  const pick = (filename: string) => {
    onChange(`../../assets/img/${filename}`);
    setPickerOpen(false);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300">
          {label}{" "}
          <span className="text-[10px] text-zinc-400 font-normal">(Image URL)</span>
        </label>
      </div>

      <div className="flex items-stretch gap-2">
        <div className="w-14 h-14 shrink-0 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/60 flex items-center justify-center overflow-hidden">
          {strVal && !previewError ? (
            <img
              src={previewUrl}
              alt={label}
              className="w-full h-full object-cover"
              onError={() => setPreviewError(true)}
            />
          ) : (
            <ImageIcon className="w-5 h-5 text-zinc-400" />
          )}
        </div>

        <div className="flex-1 flex flex-col gap-1.5">
          <div className="relative">
            <Link2 className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              disabled={disabled}
              value={strVal}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://... or pick from src/assets/img"
              className="w-full pl-8 pr-2.5 py-1.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-zinc-100"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={disabled}
              onClick={openPicker}
              className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-md transition disabled:opacity-50"
            >
              <FolderOpen className="w-3 h-3" /> Browse assets
            </button>
            {strVal && (
              <button
                type="button"
                disabled={disabled}
                onClick={() => onChange("")}
                className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {pickerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          onClick={() => setPickerOpen(false)}
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-500" />
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                  Pick image from src/assets/img
                </h3>
              </div>
              <button
                onClick={() => setPickerOpen(false)}
                className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-zinc-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-400 gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                  <p className="text-xs">Loading images...</p>
                </div>
              ) : error ? (
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200">
                  {error}
                </div>
              ) : images.length === 0 ? (
                <div className="text-center py-12 text-xs text-zinc-400">
                  No images found in <code>src/assets/img</code>.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {images.map((name) => {
                    const url = getAssetImagePreviewUrl(name);
                    const isSelected =
                      strVal === name || strVal.endsWith(`/${name}`);
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => pick(name)}
                        className={`group relative aspect-square rounded-xl border overflow-hidden bg-zinc-100 dark:bg-zinc-800 transition ${
                          isSelected
                            ? "border-blue-500 ring-2 ring-blue-500/40"
                            : "border-zinc-200 dark:border-zinc-800 hover:border-blue-400"
                        }`}
                        title={name}
                      >
                        <img
                          src={url}
                          alt={name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {isSelected && (
                          <div className="absolute top-1 right-1 p-0.5 rounded-full bg-blue-600 text-white">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[10px] px-1.5 py-0.5 truncate text-left">
                          {name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-400">
              Picked value will be inserted as{" "}
              <code>../../assets/img/&lt;filename&gt;</code>.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};