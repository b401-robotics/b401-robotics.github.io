import React, { useState } from "react";
import { FolderPlus, X, Loader2 } from "lucide-react";
import { scaffoldNewSection } from "../api";
import { useToast } from "./Toast";

interface NewSectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newKey: string) => void;
}

export const NewSectionDialog: React.FC<NewSectionDialogProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [folderName, setFolderName] = useState("");
  const [key, setKey] = useState("");
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim() || !key.trim()) {
      showToast("error", "File name and section key are required.");
      return;
    }

    try {
      setLoading(true);
      await scaffoldNewSection({
        folderName: folderName.trim(),
        key: key.trim().toLowerCase(),
        label: label.trim() || undefined,
      });

      showToast(
        "success",
        "Section created!",
        `Scaffolded ${folderName} and updated translations.ts`
      );
      onSuccess(key.trim().toLowerCase());
      onClose();
    } catch (err: any) {
      showToast("error", "Failed to scaffold section", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95">
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
              Scaffold New Section
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-zinc-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              File Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. AwardsContent"
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
                if (!key) {
                  const cleaned = e.target.value.replace(/content$/i, "").toLowerCase();
                  setKey(cleaned);
                }
              }}
              required
              className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-zinc-100"
            />
            <p className="text-[11px] text-zinc-400 mt-1">
              Creates <code>src/contents/&lt;FileName&gt;.ts</code>
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Export Key <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. awards (generates awardsEN)"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-zinc-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Display Label (optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Awards & Recognition"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-zinc-100"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 transition disabled:opacity-50"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Create Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};