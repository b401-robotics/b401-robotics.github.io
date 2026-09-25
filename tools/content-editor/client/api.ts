import type { DiscoveredSection, ValidationReport } from "../server/types";

const API_BASE = "/api";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}: ${res.statusText}`);
  }
  return data;
}

export async function fetchSections(): Promise<DiscoveredSection[]> {
  return request<DiscoveredSection[]>("/sections");
}

export async function fetchSectionData(
  key: string,
  lang: "en" | "id" | "standalone"
): Promise<{ section: DiscoveredSection; value: any }> {
  return request<{ section: DiscoveredSection; value: any }>(`/section/${encodeURIComponent(key)}/${lang}`);
}

export async function saveSectionData(
  key: string,
  lang: "en" | "id" | "standalone",
  value: any
): Promise<{ success: boolean; changed: boolean }> {
  return request<{ success: boolean; changed: boolean }>(
    `/section/${encodeURIComponent(key)}/${lang}`,
    {
      method: "PUT",
      body: JSON.stringify({ value }),
    }
  );
}

export async function fetchSectionDiff(
  key: string,
  lang: "en" | "id" | "standalone",
  value: any
): Promise<{ diff: string; changed: boolean }> {
  return request<{ diff: string; changed: boolean }>(
    `/section/${encodeURIComponent(key)}/${lang}/diff`,
    {
      method: "POST",
      body: JSON.stringify({ value }),
    }
  );
}

export async function validateProject(): Promise<ValidationReport> {
  return request<ValidationReport>("/validate", { method: "POST" });
}

export async function reloadSections(): Promise<{ success: boolean; sections: DiscoveredSection[] }> {
  return request<{ success: boolean; sections: DiscoveredSection[] }>("/reload", { method: "POST" });
}

export async function createIdForSection(
  key: string
): Promise<{ success: boolean; sections: DiscoveredSection[] }> {
  return request<{ success: boolean; sections: DiscoveredSection[] }>(
    `/section/${encodeURIComponent(key)}/create-id`,
    { method: "POST" }
  );
}

export async function scaffoldNewSection(data: {
  folderName: string;
  key: string;
  label?: string;
}): Promise<{ success: boolean; sections: DiscoveredSection[] }> {
  return request<{ success: boolean; sections: DiscoveredSection[] }>("/section", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function fetchAssetsImages(): Promise<string[]> {
  const res = await request<{ images: string[] }>("/assets/images");
  return res.images;
}

export function getAssetImagePreviewUrl(filename: string): string {
  return `${API_BASE}/assets/images/${encodeURIComponent(filename)}`;
}