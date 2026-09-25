import React, { useState, useMemo } from "react";
import type { DiscoveredSection } from "../../server/types";
import {
  FolderPlus,
  RefreshCw,
  Search,
  FileText,
  Database,
  Lock,
  PlusCircle,
  Folder,
} from "lucide-react";

interface SidebarProps {
  sections: DiscoveredSection[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
  onOpenNewSectionModal: () => void;
  onRefresh: () => void;
  onCreateId: (key: string) => void;
  dirtyKeys: Set<string>;
  loading: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  selectedKey,
  onSelect,
  onOpenNewSectionModal,
  onRefresh,
  onCreateId,
  dirtyKeys,
  loading,
}) => {
  const [search, setSearch] = useState("");

  const filteredSections = useMemo(() => {
    if (!search.trim()) return sections;
    const term = search.toLowerCase();
    return sections.filter(
      (s) =>
        s.key.toLowerCase().includes(term) ||
        s.folder.toLowerCase().includes(term) ||
        (s.standaloneExport && s.standaloneExport.toLowerCase().includes(term))
    );
  }, [sections, search]);

  const paired = filteredSections.filter((s) => s.kind === "paired");
  const enOnly = filteredSections.filter((s) => s.kind === "en-only");
  const standalone = filteredSections.filter((s) => s.kind === "standalone");
  const readOnly = filteredSections.filter((s) => s.kind === "read-only");

  const renderSectionItem = (s: DiscoveredSection) => {
    const isSelected = s.key === selectedKey;
    const isDirty = dirtyKeys.has(s.key);

    return (
      <div
        key={s.key}
        onClick={() => onSelect(s.key)}
        className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition ${
          isSelected
            ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold shadow-xs"
            : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {s.kind === "read-only" ? (
            <Lock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          ) : s.kind === "standalone" ? (
            <Database className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          ) : (
            <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          )}

          <div className="truncate">
            <span className="truncate">{s.key}</span>
            <span className="block text-[10px] text-zinc-400 font-normal truncate">
              {s.folder}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {isDirty && (
            <span
              className="w-2 h-2 rounded-full bg-amber-500 shrink-0 shadow-xs"
              title="Unsaved changes"
            />
          )}

          {s.kind === "en-only" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCreateId(s.key);
              }}
              className="opacity-80 group-hover:opacity-100 px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold flex items-center gap-0.5 hover:bg-emerald-200 transition"
              title="Create ID translation"
            >
              <PlusCircle className="w-2.5 h-2.5" /> ID
            </button>
          )}

          {s.kind === "read-only" && (
            <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-500 text-[9px]">
              JSX
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-64 lg:w-72 bg-zinc-50/70 dark:bg-zinc-950/70 border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-full shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              B4
            </div>
            <div>
              <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Content Editor
              </h2>
              <span className="text-[10px] text-zinc-400">B401 Lab Tool</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
              title="Refresh sections from disk"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={onOpenNewSectionModal}
              className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-xs"
              title="New Section"
            >
              <FolderPlus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sections (Ctrl+K)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-zinc-100"
          />
        </div>
      </div>

      {/* Sections List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {paired.length > 0 && (
          <div className="space-y-1">
            <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Paired Sections ({paired.length})
            </span>
            <div className="space-y-0.5">{paired.map(renderSectionItem)}</div>
          </div>
        )}

        {enOnly.length > 0 && (
          <div className="space-y-1">
            <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-amber-500">
              EN Only Sections ({enOnly.length})
            </span>
            <div className="space-y-0.5">{enOnly.map(renderSectionItem)}</div>
          </div>
        )}

        {standalone.length > 0 && (
          <div className="space-y-1">
            <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-indigo-500">
              Data Files ({standalone.length})
            </span>
            <div className="space-y-0.5">{standalone.map(renderSectionItem)}</div>
          </div>
        )}

        {readOnly.length > 0 && (
          <div className="space-y-1">
            <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Read-Only Code ({readOnly.length})
            </span>
            <div className="space-y-0.5">{readOnly.map(renderSectionItem)}</div>
          </div>
        )}

        {filteredSections.length === 0 && (
          <div className="p-4 text-center text-xs text-zinc-400">
            No sections found matching "{search}".
          </div>
        )}
      </div>
    </div>
  );
};
