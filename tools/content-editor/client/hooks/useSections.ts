import { useState, useEffect, useCallback } from "react";
import type { DiscoveredSection } from "../../server/types";
import { fetchSections, reloadSections } from "../api";

export function useSections() {
  const [sections, setSections] = useState<DiscoveredSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchSections();
      setSections(data);
      if (!selectedKey && data.length > 0) {
        // default select first non-readonly paired section
        const first = data.find((s) => s.kind === "paired") || data[0];
        if (first) setSelectedKey(first.key);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load sections");
    } finally {
      setLoading(false);
    }
  }, [selectedKey]);

  useEffect(() => {
    load();

    // Setup SSE listener
    const eventSource = new EventSource("/api/events");

    eventSource.addEventListener("sections_updated", (event) => {
      try {
        const updated = JSON.parse(event.data);
        setSections(updated);
      } catch (err) {
        console.error("Failed to parse SSE data:", err);
      }
    });

    return () => {
      eventSource.close();
    };
  }, []);

  const refresh = async () => {
    try {
      const res = await reloadSections();
      setSections(res.sections);
    } catch (err: any) {
      setError(err.message || "Failed to refresh sections");
    }
  };

  const selectedSection = sections.find((s) => s.key === selectedKey) || null;

  return {
    sections,
    loading,
    error,
    selectedKey,
    selectedSection,
    setSelectedKey,
    refresh,
    setSections,
  };
}
