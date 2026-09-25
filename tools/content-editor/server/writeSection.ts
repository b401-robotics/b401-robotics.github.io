import fs from "node:fs";
import path from "node:path";
import { Project, SyntaxKind } from "ts-morph";
import prettier from "prettier";
import * as Diff from "diff";
import { discoverSections, getProjectRoot } from "./discoverSections";
import { readSection } from "./readSection";
import { serialize } from "./serialize";
import type { DiscoveredSection } from "./types";

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a !== "object" || a === null || b === null) return false;

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}

function resolveTarget(
  section: DiscoveredSection,
  lang: "en" | "id" | "standalone"
): { targetFile: string; targetExport: string } {
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
    throw new Error(`Target file or export missing for section "${section.key}" (${lang}).`);
  }

  return { targetFile, targetExport };
}

export async function computeUpdatedSource(
  targetFile: string,
  targetExport: string,
  newValue: any
): Promise<{ originalContent: string; newContent: string; changed: boolean }> {
  const originalContent = fs.readFileSync(targetFile, "utf-8");

  const project = new Project({
    useInMemoryFileSystem: true,
  });

  const sourceFile = project.createSourceFile(path.basename(targetFile), originalContent);
  const varDecl = sourceFile.getVariableDeclaration(targetExport);

  if (!varDecl) {
    throw new Error(`Export declaration "${targetExport}" not found in ${targetFile}`);
  }

  const init = varDecl.getInitializer();
  const isAsConst = init?.getKind() === SyntaxKind.AsExpression;

  const serialized = serialize(newValue);
  varDecl.setInitializer(isAsConst ? `${serialized} as const` : serialized);

  const updatedRaw = sourceFile.getFullText();
  const formatted = await prettier.format(updatedRaw, { parser: "typescript" });

  const changed = formatted !== originalContent;
  return { originalContent, newContent: formatted, changed };
}

export async function generateSectionDiff(
  sectionKey: string,
  lang: "en" | "id" | "standalone",
  newValue: any
): Promise<{ diff: string; changed: boolean }> {
  const { section } = await readSection(sectionKey, lang);
  const { targetFile, targetExport } = resolveTarget(section, lang);

  const { originalContent, newContent, changed } = await computeUpdatedSource(
    targetFile,
    targetExport,
    newValue
  );

  if (!changed) {
    return { diff: "", changed: false };
  }

  const patch = Diff.createPatch(path.basename(targetFile), originalContent, newContent);
  return { diff: patch, changed: true };
}

export async function writeSection(
  sectionKey: string,
  lang: "en" | "id" | "standalone",
  newValue: any
): Promise<{ success: boolean; changed: boolean }> {
  const { section, value: currentValue } = await readSection(sectionKey, lang);

  // If nothing changed in the data, do not touch the file (preserves round-trip guarantee)
  if (deepEqual(currentValue, newValue)) {
    return { success: true, changed: false };
  }

  const { targetFile, targetExport } = resolveTarget(section, lang);
  const { originalContent, newContent, changed } = await computeUpdatedSource(
    targetFile,
    targetExport,
    newValue
  );

  if (!changed) {
    return { success: true, changed: false };
  }

  const tmpFile = `${targetFile}.tmp`;
  fs.writeFileSync(tmpFile, newContent, "utf-8");

  try {
    // Atomic replace
    fs.renameSync(tmpFile, targetFile);

    // Run tsc --noEmit check
    const rootDir = getProjectRoot();
    const proc = Bun.spawn(["bunx", "tsc", "--noEmit"], {
      cwd: rootDir,
      stdout: "pipe",
      stderr: "pipe",
    });

    const exitCode = await proc.exited;
    if (exitCode !== 0) {
      const stdout = await new Response(proc.stdout).text();
      const stderr = await new Response(proc.stderr).text();
      const errorMsg = stdout || stderr || `tsc --noEmit exited with code ${exitCode}`;

      // Rollback to original content
      fs.writeFileSync(targetFile, originalContent, "utf-8");
      throw new Error(`TypeScript validation failed after write. Changes were rolled back.\n${errorMsg}`);
    }

    return { success: true, changed: true };
  } catch (err) {
    if (fs.existsSync(tmpFile)) {
      try {
        fs.unlinkSync(tmpFile);
      } catch {}
    }
    // Ensure original file content is restored
    fs.writeFileSync(targetFile, originalContent, "utf-8");
    throw err;
  }
}
