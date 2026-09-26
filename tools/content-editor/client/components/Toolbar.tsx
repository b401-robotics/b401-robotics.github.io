import React from "react";
import {
  Save,
  RotateCcw,
  Undo2,
  Redo2,
  CheckCircle,
  Eye,
  FileCode2,
  Sun,
  Moon,
  Loader2,
} from "lucide-react";

interface ToolbarProps {
  onSave: () => void;
  onDiscard: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onToggleValidate: () => void;
  onTogglePreview: () => void;
  onToggleDiff: () => void;
  canSave: boolean;
  canDiscard: boolean;
  canUndo: boolean;
  canRedo: boolean;
  isSaving: boolean;
  isReadOnly?: boolean;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  hasValidationIssues?: boolean;
  isPreviewOpen: boolean;
  isDiffOpen: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onSave,
  onDiscard,
  onUndo,
  onRedo,
  onToggleValidate,
  onTogglePreview,
  onToggleDiff,
  canSave,
  canDiscard,
  canUndo,
  canRedo,
  isSaving,
  isReadOnly,
  darkMode,
  onToggleDarkMode,
  hasValidationIssues,
  isPreviewOpen,
  isDiffOpen,
}) => {
  return (
    <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 flex items-center justify-between shrink-0">
      {/* Left controls: Undo, Redo */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onUndo}
          disabled={!canUndo || isReadOnly}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-300 disabled:opacity-30 transition"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo || isReadOnly}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-300 disabled:opacity-30 transition"
          title="Redo (Ctrl+Shift+Z)"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      {/* Right controls: Diff, Preview, Validate, Discard, Save, Theme */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleDiff}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            isDiffOpen
              ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
              : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
          title="Toggle Diff View"
        >
          <FileCode2 className="w-3.5 h-3.5 text-indigo-500" />
          <span className="hidden md:inline">Diff</span>
        </button>

        <button
          onClick={onTogglePreview}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            isPreviewOpen
              ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
              : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
          title="Toggle Preview"
        >
          <Eye className="w-3.5 h-3.5 text-blue-500" />
          <span className="hidden md:inline">Preview</span>
        </button>

        <button
          onClick={onToggleValidate}
          className="flex items-center gap-1.5 px-3 py-1.5 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-xs font-medium transition"
          title="Run project validation"
        >
          <CheckCircle className={`w-3.5 h-3.5 ${hasValidationIssues ? "text-amber-500" : "text-emerald-500"}`} />
          <span className="hidden md:inline">Validate</span>
        </button>

        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />

        <button
          onClick={onDiscard}
          disabled={!canDiscard || isSaving || isReadOnly}
          className="flex items-center gap-1.5 px-3 py-1.5 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-xs font-medium transition disabled:opacity-30"
          title="Discard unsaved changes"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Discard</span>
        </button>

        <button
          onClick={onSave}
          disabled={!canSave || isSaving || isReadOnly}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          title="Save to disk (Ctrl+S)"
        >
          {isSaving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>Save</span>
        </button>

        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />

        <button
          onClick={onToggleDarkMode}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
          title="Toggle Light/Dark Theme"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};