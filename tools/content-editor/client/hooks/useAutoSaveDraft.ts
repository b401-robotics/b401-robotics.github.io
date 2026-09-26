import { useEffect, useRef, useState } from "react";
import { deepEqual } from "../lib/format";

export function useAutoSaveDraft<T>(
  sectionKey: string | null,
  currentValue: T,
  serverValue: T | null
) {
  const [hasDraft, setHasDraft] = useState(false);
  const [draftValue, setDraftValue] = useState<T | null>(null);

  const storageKey = sectionKey ? `b401_draft_${sectionKey}` : null;
  const isInitialMount = useRef(true);

  // Check for existing draft on section / serverValue load
  useEffect(() => {
    if (!storageKey || !serverValue) return;

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!deepEqual(parsed, serverValue)) {
          setHasDraft(true);
          setDraftValue(parsed);
          return;
        }
      }
    } catch {}

    setHasDraft(false);
    setDraftValue(null);
  }, [storageKey, serverValue]);

  // Debounced auto-save to localStorage
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!storageKey || currentValue === null || currentValue === undefined) return;

    const timer = setTimeout(() => {
      if (serverValue && deepEqual(currentValue, serverValue)) {
        localStorage.removeItem(storageKey);
        setHasDraft(false);
      } else {
        localStorage.setItem(storageKey, JSON.stringify(currentValue));
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [storageKey, currentValue, serverValue]);

  const clearDraft = () => {
    if (storageKey) {
      localStorage.removeItem(storageKey);
      setHasDraft(false);
      setDraftValue(null);
    }
  };

  return {
    hasDraft,
    draftValue,
    clearDraft,
  };
}