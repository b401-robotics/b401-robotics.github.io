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
  key: string
): Promise<{ section: DiscoveredSection; value: any }> {
  return request<{ section: DiscoveredSection; value: any }>(
    `/section/${encodeURIComponent(key)}`
  );
}

export async function saveSectionData(
  key: string,
  value: any
): Promise<{ success: boolean; changed: boolean }> {
  return request<{ success: boolean; changed: boolean }>(
    `/section/${encodeURIComponent(key)}`,
    {
      method: "PUT",
      body: JSON.stringify({ value }),
    }
  );
}

export async function fetchSectionDiff(
  key: string,
  value: any
): Promise<{ diff: string; changed: boolean }> {
  return request<{ diff: string; changed: boolean }>(
    `/section/${encodeURIComponent(key)}/diff`,
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

/**
 * Build a URL for the asset-image serving endpoint. Each path segment is
 * encoded individually so nested paths like "rooms/tw2-901.webp" keep their
 * slash separators intact.
 */
export function getAssetImagePreviewUrl(relPath: string): string {
  const encoded = relPath
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  return `${API_BASE}/assets/images/${encoded}`;
}