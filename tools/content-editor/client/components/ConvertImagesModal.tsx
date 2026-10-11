import React, { useState, useEffect } from "react";
import {
  FileImage,
  RefreshCw,
  X,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import { fetchConversionStats, convertAssetsToWebp } from "../api";
import { formatBytes } from "../lib/format";

interface ConvertImagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConverted?: () => void;
}

export const ConvertImagesModal: React.FC<ConvertImagesModalProps> = ({
  isOpen,
  onClose,
  onConverted,
}) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [converting, setConverting] = useState(false);
  const [force, setForce] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await fetchConversionStats();
      setStats(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadStats();
      setMessage(null);
    }
  }, [isOpen]);

  const handleConvert = async () => {
    setConverting(true);
    setMessage(null);
    try {
      const res = await convertAssetsToWebp({ force });
      setMessage(
        `Successfully converted! Total savings: ${formatBytes(res.totalSavedBytes || 0)}`
      );
      await loadStats();
      if (onConverted) onConverted();
    } catch (err: any) {
      setMessage(`Error: ${err.message || "Failed to convert images"}`);
    } finally {
      setConverting(false);
    }
  };

  if (!isOpen) return null;

  const totalSource = stats?.totalSource ?? 0;
  const pendingCount = stats?.pendingCount ?? 0;
  const totalSourceBytes = stats?.totalSourceBytes ?? 0;
  const totalWebpBytes = stats?.totalWebpBytes ?? 0;
  const savings = Math.max(0, totalSourceBytes - totalWebpBytes);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <div>
              <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                WebP Image Converter & Optimizer
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Converts raw images from <code>src/assets/img/</code> into optimized WebP format in <code>src/assets/webp/</code>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-zinc-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Overview Stats */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 border-b border-zinc-200 dark:border-zinc-800 grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-zinc-400">Total Raw Images</span>
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
              {totalSource} <span className="text-xs font-normal text-zinc-500">({formatBytes(totalSourceBytes)})</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-zinc-400">Pending Conversion</span>
            <div className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-0.5">
              {pendingCount}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-zinc-400">Estimated Savings</span>
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {formatBytes(savings)}
            </div>
          </div>
        </div>

        {/* Message Banner */}
        {message && (
          <div className="p-3 mx-4 mt-3 rounded-lg text-xs bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {message}
          </div>
        )}

        {/* List of files */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-zinc-400 gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              <p className="text-xs">Analyzing images...</p>
            </div>
          ) : stats?.items?.length === 0 ? (
            <div className="text-center py-12 text-xs text-zinc-400">
              No images found in <code>src/assets/img</code>.
            </div>
          ) : (
            stats?.items?.map((item: any) => (
              <div
                key={item.sourceRel}
                className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileImage className="w-4 h-4 text-zinc-400 shrink-0" />
                  <div className="truncate">
                    <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                      {item.sourceRel}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                      <span>{formatBytes(item.sourceSize)}</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                      <span>{item.targetRel}</span>
                      {item.webpSize !== undefined && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          ({formatBytes(item.webpSize)})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {item.needsConversion ? (
                    <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-medium border border-amber-200 dark:border-amber-900/60">
                      <AlertCircle className="w-3 h-3" /> Needs conversion
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-200 dark:border-emerald-900/60">
                      <CheckCircle className="w-3 h-3" /> Optimized
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer controls */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900">
          <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={force}
              onChange={(e) => setForce(e.target.checked)}
              className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
            />
            <span>Force re-convert all images</span>
          </label>

          <div className="flex items-center gap-2">
            <button
              onClick={loadStats}
              disabled={loading || converting}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleConvert}
              disabled={converting || totalSource === 0}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-xs transition"
            >
              {converting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span>{converting ? "Converting..." : "Convert to WebP"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
