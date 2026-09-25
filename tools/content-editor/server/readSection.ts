import fs from "node:fs";
import { discoverSections } from "./discoverSections";
import type { DiscoveredSection } from "./types";

export async function readSection(
  sectionKey: string,
  lang: "en" | "id" | "standalone" = "en"
): Promise<{ section: DiscoveredSection; value: any }> {
  const sections = discoverSections();
  const section = sections.find((s) => s.key === sectionKey);

  if (!section) {
    throw new Error(`Section "${sectionKey}" not found.`);
  }

  if (section.kind === "read-only") {
    const raw = section.files.standalone ? fs.readFileSync(section.files.standalone, "utf-8") : "";
    return { section, value: { _readOnly: true, code: raw } };
  }

  let targetFile: string | undefined;
  let targetExport: string | undefined;

  if (section.kind === "standalone") {
    targetFile = section.files.standalone;
    targetExport = section.standaloneExport;
  } else if (lang === "id") {
    targetFile = section.files.id;
    targetExport = section.exportNameId;
  } else {
    targetFile = section.files.en;
    targetExport = section.exportNameEn;
  }

  if (!targetFile || !targetExport) {
    throw new Error(`Section "${sectionKey}" has no ${lang} file or export.`);
  }

  // Import with timestamp to bust cache
  const fileUrl = `${targetFile}?t=${Date.now()}`;
  const mod = await import(fileUrl);

  if (!(targetExport in mod)) {
    throw new Error(`Export "${targetExport}" not found in ${targetFile}`);
  }

  return { section, value: mod[targetExport] };
}
