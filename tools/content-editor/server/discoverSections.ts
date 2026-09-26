import fs from "node:fs";
import path from "node:path";
import { Project } from "ts-morph";
import type { DiscoveredSection } from "./types";

export function getProjectRoot(): string {
  // tools/content-editor/server -> project root is 2 levels up from tools/content-editor
  return path.resolve(import.meta.dir, "../../..");
}

export function getContentsDir(): string {
  return path.join(getProjectRoot(), "src/contents");
}

export function getAssetsImgDir(): string {
  return path.join(getProjectRoot(), "src/assets/img");
}

const IMAGE_EXT_REGEX = /\.(png|jpe?g|gif|webp|svg|avif|bmp|ico)$/i;

/**
 * Recursively list every image file under `src/assets/img`, including files
 * nested inside subfolders. Returned paths are POSIX-relative to
 * `src/assets/img` — e.g. "ur5.webp" or "rooms/tw2-901.webp".
 */
export function listAssetImages(): string[] {
  const rootDir = getAssetsImgDir();
  if (!fs.existsSync(rootDir)) return [];

  const out: string[] = [];

  const walk = (dir: string, prefix: string) => {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), rel);
      } else if (entry.isFile() && IMAGE_EXT_REGEX.test(entry.name)) {
        out.push(rel);
      }
    }
  };

  walk(rootDir, "");
  out.sort((a, b) => a.localeCompare(b));
  return out;
}

const RESERVED_FILES = new Set(["translations.ts"]);

/**
 * Discover content sections from the flat `src/contents/*.ts` layout.
 *
 * - Exports ending in `EN` (e.g. `equipmentEN`) become editable content
 *   sections keyed by the base name (`equipment`). `ID` exports are
 *   ignored — the editor only edits the EN source now.
 * - Any other export (e.g. `lecturers`, `assistants`, `alumni`) becomes a
 *   standalone data section keyed by the export name.
 * - `.tsx` files surface as read-only.
 */
export function discoverSections(): DiscoveredSection[] {
  const contentsDir = getContentsDir();
  if (!fs.existsSync(contentsDir)) {
    return [];
  }

  const sections: DiscoveredSection[] = [];
  const project = new Project({
    skipAddingFilesFromTsConfig: true,
  });

  const entries = fs.readdirSync(contentsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const fileName = entry.name;
    if (RESERVED_FILES.has(fileName)) continue;
    if (fileName.endsWith(".d.ts")) continue;
    if (fileName.endsWith(".test.ts") || fileName.endsWith(".spec.ts")) continue;

    const filePath = path.join(contentsDir, fileName);
    const fallbackKey = fileName.replace(/\.(ts|tsx)$/, "");

    // Read-only JSX files
    if (fileName.endsWith(".tsx")) {
      sections.push({
        key: fallbackKey,
        folder: fileName,
        kind: "read-only",
        files: { standalone: filePath },
        readOnly: true,
        readOnlyReason: "JSX component — must be edited directly in source code.",
      });
      continue;
    }

    if (!fileName.endsWith(".ts")) continue;

    let exportNames: string[] = [];
    try {
      const sf = project.addSourceFileAtPath(filePath);
      for (const stmt of sf.getVariableStatements()) {
        if (stmt.hasExportKeyword()) {
          for (const decl of stmt.getDeclarations()) {
            exportNames.push(decl.getName());
          }
        }
      }
    } catch {
      // Skip files that fail to parse
      continue;
    }

    if (exportNames.length === 0) continue;

    for (const exp of exportNames) {
      if (exp.length > 2 && exp.endsWith("EN")) {
        const base = exp.slice(0, -2);
        sections.push({
          key: base,
          folder: fileName,
          kind: "en-only",
          files: { en: filePath },
          exportNameEn: exp,
        });
      } else if (exp.length > 2 && exp.endsWith("ID")) {
        // Legacy ID exports are ignored — the editor only edits EN now.
        continue;
      } else {
        sections.push({
          key: exp,
          folder: fileName,
          kind: "standalone",
          files: { standalone: filePath },
          standaloneExport: exp,
        });
      }
    }
  }

  return sections;
}