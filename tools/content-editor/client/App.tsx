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
  createIdForSection,
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
  const [serverEn, setServerEn] = useState<any>(null);
  const [serverId, setServerId] = useState<any>(null);
  const [serverStandalone, setServerStandalone] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Undo/Redo state
  const enUndoRedo = useUndoRedo<any>(null);
  const idUndoRedo = useUndoRedo<any>(null);
  const standaloneUndoRedo = useUndoRedo<any>(null);

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
      if (selectedSection.kind === "read-only") {
        const res = await fetchSectionData(selectedSection.key, "standalone");
        setServerStandalone(res.value);
        standaloneUndoRedo.reset(res.value);
      } else if (selectedSection.kind === "standalone") {
        const res = await fetchSectionData(selectedSection.key, "standalone");
        setServerStandalone(res.value);
        standaloneUndoRedo.reset(res.value);
      } else {
        // Paired or EN-only
        const resEn = await fetchSectionData(selectedSection.key, "en");
        setServerEn(resEn.value);
        enUndoRedo.reset(resEn.value);

        if (selectedSection.hasId) {
          const resId = await fetchSectionData(selectedSection.key, "id");
          setServerId(resId.value);
          idUndoRedo.reset(resId.value);
        } else {
          setServerId(null);
          idUndoRedo.reset(null);
        }
      }
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
  const draftEn = useAutoSaveDraft(selectedKey, "en", enUndoRedo.state, serverEn);
  const draftId = useAutoSaveDraft(selectedKey, "id", idUndoRedo.state, serverId);

  // Dirty state
  const isEnDirty = useDirtyState(enUndoRedo.state, serverEn);
  const isIdDirty = useDirtyState(idUndoRedo.state, serverId);
  const isStandaloneDirty = useDirtyState(standaloneUndoRedo.state, serverStandalone);

  const isCurrentDirty = isEnDirty || isIdDirty || isStandaloneDirty;

  const dirtyKeys = useMemo(() => {
    const s = new Set<string>();
    if (selectedKey && isCurrentDirty) {
      s.add(selectedKey);
    }
    return s;
  }, [selectedKey, isCurrentDirty]);

  // Save handler
  const handleSave = async () => {
    if (!selectedSection || !isCurrentDirty || isSaving) return;

    try {
      setIsSaving(true);
      if (selectedSection.kind === "standalone") {
        await saveSectionData(selectedSection.key, "standalone", standaloneUndoRedo.state);
        setServerStandalone(deepClone(standaloneUndoRedo.state));
        showToast("success", "Saved!", `Saved ${selectedSection.key} successfully.`);
      } else {
        let changedAny = false;
        if (isEnDirty) {
          await saveSectionData(selectedSection.key, "en", enUndoRedo.state);
          setServerEn(deepClone(enUndoRedo.state));
          draftEn.clearDraft();
          changedAny = true;
        }
        if (isIdDirty && selectedSection.hasId) {
          await saveSectionData(selectedSection.key, "id", idUndoRedo.state);
          setServerId(deepClone(idUndoRedo.state));
          draftId.clearDraft();
          changedAny = true;
        }
        if (changedAny) {
          showToast("success", "Saved & Validated!", `Successfully saved ${selectedSection.key}`);
        }
      }
    } catch (err: any) {
      showToast("error", "Save Failed (Rolled Back)", err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Discard handler
  const handleDiscard = () => {
    if (selectedSection?.kind === "standalone") {
      standaloneUndoRedo.reset(serverStandalone);
    } else {
      enUndoRedo.reset(serverEn);
      idUndoRedo.reset(serverId);
      draftEn.clearDraft();
      draftId.clearDraft();
    }
    showToast("info", "Changes discarded", "Reset to current file state on disk.");
  };

  // Diff update
  const updateDiff = async () => {
    if (!selectedSection) return;
    try {
      let combinedDiff = "";
      if (selectedSection.kind === "standalone") {
        const res = await fetchSectionDiff(
          selectedSection.key,
          "standalone",
          standaloneUndoRedo.state
        );
        combinedDiff = res.diff;
      } else {
        if (selectedSection.hasEn) {
          const resEn = await fetchSectionDiff(selectedSection.key, "en", enUndoRedo.state);
          if (resEn.diff) combinedDiff += `=== English (EN) ===\n${resEn.diff}\n\n`;
        }
        if (selectedSection.hasId) {
          const resId = await fetchSectionDiff(selectedSection.key, "id", idUndoRedo.state);
          if (resId.diff) combinedDiff += `=== Indonesian (ID) ===\n${resId.diff}\n\n`;
        }
      }
      setDiffText(combinedDiff);
    } catch (err: any) {
      setDiffText(`Error loading diff: ${err.message}`);
    }
  };

  useEffect(() => {
    if (isDiffOpen) {
      updateDiff();
    }
  }, [isDiffOpen, enUndoRedo.state, idUndoRedo.state, standaloneUndoRedo.state]);

  // Validation
  const handleRunValidation = async () => {
    setIsValidating(true);
    setIsValidationOpen(true);
    try {
      const report = await validateProject();
      setValidationReport(report);
      if (report.valid) {
        showToast("success", "All checks passed!", "No schema, translations, or type errors.");
      } else {
        showToast("warning", "Validation issues found", `${report.issues.length} issue(s) detected.`);
      }
    } catch (err: any) {
      showToast("error", "Validation error", err.message);
    } finally {
      setIsValidating(false);
    }
  };

  // Copy all EN -> ID
  const handleCopyAllEnToId = () => {
    if (enUndoRedo.state) {
      idUndoRedo.set(deepClone(enUndoRedo.state));
      showToast("info", "Copied EN to ID", "Replaced Indonesian content with English draft.");
    }
  };

  // Create ID action
  const handleCreateId = async (key: string) => {
    try {
      await createIdForSection(key);
      showToast("success", "ID Created!", `Generated id.ts for ${key}.`);
      await refresh();
      loadActiveSection();
    } catch (err: any) {
      showToast("error", "Failed to create ID", err.message);
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
          if (selectedSection?.kind === "standalone") standaloneUndoRedo.redo();
          else {
            enUndoRedo.redo();
            idUndoRedo.redo();
          }
        } else {
          e.preventDefault();
          if (selectedSection?.kind === "standalone") standaloneUndoRedo.undo();
          else {
            enUndoRedo.undo();
            idUndoRedo.undo();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave, selectedSection, enUndoRedo, idUndoRedo, standaloneUndoRedo]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-sans">
      {/* Left Sidebar */}
      <Sidebar
        sections={sections}
        selectedKey={selectedKey}
        onSelect={(key) => setSelectedKey(key)}
        onOpenNewSectionModal={() => setIsNewSectionOpen(true)}
        onRefresh={refresh}
        onCreateId={handleCreateId}
        dirtyKeys={dirtyKeys}
        loading={loadingSections}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Toolbar
          onSave={handleSave}
          onDiscard={handleDiscard}
          onUndo={() => {
            if (selectedSection?.kind === "standalone") standaloneUndoRedo.undo();
            else {
              enUndoRedo.undo();
              idUndoRedo.undo();
            }
          }}
          onRedo={() => {
            if (selectedSection?.kind === "standalone") standaloneUndoRedo.redo();
            else {
              enUndoRedo.redo();
              idUndoRedo.redo();
            }
          }}
          onToggleValidate={handleRunValidation}
          onTogglePreview={() => setIsPreviewOpen(!isPreviewOpen)}
          onToggleDiff={() => setIsDiffOpen(!isDiffOpen)}
          onCopyAllEnToId={handleCopyAllEnToId}
          canSave={isCurrentDirty}
          canDiscard={isCurrentDirty}
          canUndo={
            selectedSection?.kind === "standalone"
              ? standaloneUndoRedo.canUndo
              : enUndoRedo.canUndo || idUndoRedo.canUndo
          }
          canRedo={
            selectedSection?.kind === "standalone"
              ? standaloneUndoRedo.canRedo
              : enUndoRedo.canRedo || idUndoRedo.canRedo
          }
          isSaving={isSaving}
          isPaired={selectedSection?.kind === "paired"}
          isReadOnly={selectedSection?.kind === "read-only"}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          hasValidationIssues={validationReport ? !validationReport.valid : false}
          isPreviewOpen={isPreviewOpen}
          isDiffOpen={isDiffOpen}
        />

        {/* Section Editor / Loading View */}
        <div className="flex-1 flex min-h-0 overflow-hidden relative">
          {loadingData ? (
            <div className="flex-1 flex items-center justify-center text-zinc-400">
              <p className="text-xs animate-pulse">Loading section data...</p>
            </div>
          ) : selectedSection ? (
            <SectionEditor
              section={selectedSection}
              enValue={enUndoRedo.state}
              idValue={idUndoRedo.state}
              standaloneValue={standaloneUndoRedo.state}
              onChangeEn={(val) => enUndoRedo.set(val)}
              onChangeId={(val) => idUndoRedo.set(val)}
              onChangeStandalone={(val) => standaloneUndoRedo.set(val)}
              hasDraftEn={draftEn.hasDraft}
              hasDraftId={draftId.hasDraft}
              onRestoreDraftEn={() => {
                if (draftEn.draftValue) enUndoRedo.set(draftEn.draftValue);
              }}
              onRestoreDraftId={() => {
                if (draftId.draftValue) idUndoRedo.set(draftId.draftValue);
              }}
              onDiscardDraftEn={() => draftEn.clearDraft()}
              onDiscardDraftId={() => draftId.clearDraft()}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-zinc-400">
              <p className="text-xs">Select a section to begin editing.</p>
            </div>
          )}

          {/* Right Rail: Diff View */}
          {isDiffOpen && (
            <DiffView
              diff={diffText}
              onClose={() => setIsDiffOpen(false)}
              title={`Diff: ${selectedKey}`}
            />
          )}

          {/* Right Rail: Preview Pane */}
          {isPreviewOpen && selectedSection && (
            <PreviewPane
              sectionKey={selectedSection.key}
              enValue={enUndoRedo.state}
              idValue={idUndoRedo.state}
              standaloneValue={standaloneUndoRedo.state}
              isStandalone={selectedSection.kind === "standalone"}
              onClose={() => setIsPreviewOpen(false)}
            />
          )}

          {/* Right Rail: Validation Panel */}
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

      {/* New Section Modal */}
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
