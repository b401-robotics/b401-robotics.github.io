import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSections } from "./hooks/useSections";
import { useUndoRedo } from "./hooks/useUndoRedo";
import { useAutoSaveDraft } from "./hooks/useAutoSaveDraft";
import { useDirtyState } from "./hooks/useDirtyState";
import {
  fetchSectionData,
  saveSectionData,
  fetchSectionDiff,
  validateProject,
} from "./api";
import type { ValidationReport } from "../server/types";
import { Sidebar } from "./components/Sidebar";
import { Toolbar } from "./components/Toolbar";
import { SectionEditor } from "./components/SectionEditor";
import { ValidationPanel } from "./components/ValidationPanel";
import { DiffView } from "./components/DiffView";
import { PreviewPane } from "./components/PreviewPane";
import { NewSectionDialog } from "./components/NewSectionDialog";
import { ToastProvider, useToast } from "./components/Toast";
import { deepClone } from "./lib/format";

function EditorApp() {
  const {
    sections,
    loading: loadingSections,
    selectedKey,
    selectedSection,
    setSelectedKey,
    refresh,
  } = useSections();

  const { showToast } = useToast();

  // Server-synced state
  const [serverValue, setServerValue] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Undo/Redo state
  const undoRedo = useUndoRedo<any>(null);

  // Panels
  const [isValidationOpen, setIsValidationOpen] = useState(false);
  const [validationReport, setValidationReport] = useState<ValidationReport | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const [diffText, setDiffText] = useState("");

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isNewSectionOpen, setIsNewSectionOpen] = useState(false);

  // Theme
  const [darkMode, setDarkMode] = useState(() => {
    return (
      localStorage.getItem("b401_theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("b401_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("b401_theme", "light");
    }
  }, [darkMode]);

  // Load section data
  const loadActiveSection = useCallback(async () => {
    if (!selectedSection) return;
    setLoadingData(true);
    try {
      const res = await fetchSectionData(selectedSection.key);
      setServerValue(res.value);
      undoRedo.reset(res.value);
    } catch (err: any) {
      showToast("error", "Failed to load section data", err.message);
    } finally {
      setLoadingData(false);
    }
  }, [selectedSection]);

  useEffect(() => {
    loadActiveSection();
  }, [selectedKey]);

  // Draft handling
  const draft = useAutoSaveDraft(selectedKey, undoRedo.state, serverValue);

  // Dirty state
  const isDirty = useDirtyState(undoRedo.state, serverValue);

  const dirtyKeys = useMemo(() => {
    const s = new Set<string>();
    if (selectedKey && isDirty) s.add(selectedKey);
    return s;
  }, [selectedKey, isDirty]);

  // Save handler
  const handleSave = async () => {
    if (!selectedSection || !isDirty || isSaving) return;

    try {
      setIsSaving(true);
      await saveSectionData(selectedSection.key, undoRedo.state);
      setServerValue(deepClone(undoRedo.state));
      draft.clearDraft();
      showToast("success", "Saved & Validated!", `Successfully saved ${selectedSection.key}`);
    } catch (err: any) {
      showToast("error", "Save Failed (Rolled Back)", err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Discard handler
  const handleDiscard = () => {
    undoRedo.reset(serverValue);
    draft.clearDraft();
    showToast("info", "Changes discarded", "Reset to current file state on disk.");
  };

  // Diff update
  const updateDiff = async () => {
    if (!selectedSection) return;
    try {
      const res = await fetchSectionDiff(selectedSection.key, undoRedo.state);
      setDiffText(res.diff);
    } catch (err: any) {
      setDiffText(`Error loading diff: ${err.message}`);
    }
  };

  useEffect(() => {
    if (isDiffOpen) {
      updateDiff();
    }
  }, [isDiffOpen, undoRedo.state]);

  // Validation
  const handleRunValidation = async () => {
    setIsValidating(true);
    setIsValidationOpen(true);
    try {
      const report = await validateProject();
      setValidationReport(report);
      if (report.valid) {
        showToast("success", "All checks passed!", "No translations or type errors.");
      } else {
        showToast("warning", "Validation issues found", `${report.issues.length} issue(s) detected.`);
      }
    } catch (err: any) {
      showToast("error", "Validation error", err.message);
    } finally {
      setIsValidating(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        if (e.shiftKey) {
          e.preventDefault();
          undoRedo.redo();
        } else {
          e.preventDefault();
          undoRedo.undo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave, undoRedo]);

  const isReadOnly = selectedSection?.kind === "read-only";

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-sans">
      <Sidebar
        sections={sections}
        selectedKey={selectedKey}
        onSelect={(key) => setSelectedKey(key)}
        onOpenNewSectionModal={() => setIsNewSectionOpen(true)}
        onRefresh={refresh}
        dirtyKeys={dirtyKeys}
        loading={loadingSections}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Toolbar
          onSave={handleSave}
          onDiscard={handleDiscard}
          onUndo={undoRedo.undo}
          onRedo={undoRedo.redo}
          onToggleValidate={handleRunValidation}
          onTogglePreview={() => setIsPreviewOpen(!isPreviewOpen)}
          onToggleDiff={() => setIsDiffOpen(!isDiffOpen)}
          canSave={isDirty}
          canDiscard={isDirty}
          canUndo={undoRedo.canUndo}
          canRedo={undoRedo.canRedo}
          isSaving={isSaving}
          isReadOnly={isReadOnly}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          hasValidationIssues={validationReport ? !validationReport.valid : false}
          isPreviewOpen={isPreviewOpen}
          isDiffOpen={isDiffOpen}
        />

        <div className="flex-1 flex min-h-0 overflow-hidden relative">
          {loadingData ? (
            <div className="flex-1 flex items-center justify-center text-zinc-400">
              <p className="text-xs animate-pulse">Loading section data...</p>
            </div>
          ) : selectedSection ? (
            <SectionEditor
              section={selectedSection}
              enValue={selectedSection.kind === "standalone" ? null : undoRedo.state}
              standaloneValue={selectedSection.kind === "standalone" ? undoRedo.state : null}
              onChangeEn={(val) => undoRedo.set(val)}
              onChangeStandalone={(val) => undoRedo.set(val)}
              hasDraft={draft.hasDraft}
              onRestoreDraft={() => {
                if (draft.draftValue) undoRedo.set(draft.draftValue);
              }}
              onDiscardDraft={() => draft.clearDraft()}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-zinc-400">
              <p className="text-xs">Select a section to begin editing.</p>
            </div>
          )}

          {isDiffOpen && (
            <DiffView
              diff={diffText}
              onClose={() => setIsDiffOpen(false)}
              title={`Diff: ${selectedKey}`}
            />
          )}

          {isPreviewOpen && selectedSection && (
            <PreviewPane
              sectionKey={selectedSection.key}
              value={undoRedo.state}
              onClose={() => setIsPreviewOpen(false)}
            />
          )}

          {isValidationOpen && (
            <ValidationPanel
              report={validationReport}
              loading={isValidating}
              onRevalidate={handleRunValidation}
              onClose={() => setIsValidationOpen(false)}
              onSelectSection={(key) => setSelectedKey(key)}
            />
          )}
        </div>
      </div>

      <NewSectionDialog
        isOpen={isNewSectionOpen}
        onClose={() => setIsNewSectionOpen(false)}
        onSuccess={(newKey) => {
          refresh();
          setSelectedKey(newKey);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <EditorApp />
    </ToastProvider>
  );
}