import fs from "node:fs";
import path from "node:path";
import { Project } from "ts-morph";

export const IMAGE_EXT_REGEX = /\.(png|jpe?g|gif|webp|svg|avif|bmp|ico)$/i;

export interface ImportInfo {
  varName: string;
  sourcePath: string;
}

/**
 * Extract default imports from a file that point at image assets.
 * Only image-extension module specifiers are returned, so unrelated imports
 * (React, other modules) are ignored.
 */
export function extractImports(filePath: string): ImportInfo[] {
  if (!fs.existsSync(filePath)) return [];
  let content: string;
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch {
    return [];
  }

  const project = new Project({ useInMemoryFileSystem: true });
  const sf = project.createSourceFile(path.basename(filePath), content);

  const out: ImportInfo[] = [];
  for (const decl of sf.getImportDeclarations()) {
    const spec = decl.getModuleSpecifierValue();
    if (!IMAGE_EXT_REGEX.test(spec)) continue;
    const dflt = decl.getDefaultImport();
    if (!dflt) continue;
    out.push({ varName: dflt.getText(), sourcePath: spec });
  }
  return out;
}

function toCamelBase(name: string): string {
  const withoutExt = name.replace(IMAGE_EXT_REGEX, "");
  const parts = withoutExt
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "asset";
  return parts
    .map((w, i) =>
      i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
    .join("");
}

/**
 * Generate a unique identifier for a new image import. The base name is
 * derived from the file's basename (e.g. "../assets/img/ur5.webp" →
 * "ur5Image"), suffixed with "Image" when not already present, and deduped
 * against `usedNames`.
 */
export function makeUniqueVarName(sourcePath: string, usedNames: Set<string>): string {
  const base = toCamelBase(path.basename(sourcePath));
  let candidate = /(Image|Img|Icon|Photo)$/i.test(base) ? base : `${base}Image`;
  candidate = candidate.replace(/[^a-zA-Z0-9_$]/g, "_");
  if (/^[0-9]/.test(candidate)) candidate = `_${candidate}`;
  if (!candidate) candidate = "assetImage";

  let result = candidate;
  let n = 2;
  while (usedNames.has(result)) {
    result = `${candidate}${n++}`;
  }
  return result;
}

export function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}