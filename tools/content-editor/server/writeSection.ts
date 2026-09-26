import fs from "node:fs";
import path from "node:path";
import { Project, SyntaxKind, DiagnosticCategory, Node } from "ts-morph";
import prettier from "prettier";
import * as Diff from "diff";
import { readSection } from "./readSection";
import { serialize } from "./serialize";
import {
  IMAGE_EXT_REGEX,
  escapeRegex,
  extractImports,
  makeUniqueVarName,
} from "./imports";
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

function resolveTarget(section: DiscoveredSection): {
  targetFile: string;
  targetExport: string;
} {
  let targetFile: string | undefined;
  let targetExport: string | undefined;

  if (section.kind === "standalone") {
    targetFile = section.files.standalone;
    targetExport = section.standaloneExport;
  } else {
    targetFile = section.files.en;
    targetExport = section.exportNameEn;
  }

  if (!targetFile || !targetExport) {
    throw new Error(`Target file or export missing for section "${section.key}".`);
  }

  return { targetFile, targetExport };
}

/**
 * Compute the new source text for a section, promoting any local asset paths
 * (`../assets/img/...`) into import statements so Vite can hash and
 * cache-bust them at build time. External URLs remain plain string literals.
 */
export async function computeUpdatedSource(
  targetFile: string,
  targetExport: string,
  newValue: any
): Promise<{ originalContent: string; newContent: string; changed: boolean }> {
  const originalContent = fs.readFileSync(targetFile, "utf-8");

  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile(path.basename(targetFile), originalContent);

  // Existing image imports already declared in the file.
  const existingImports = extractImports(targetFile);
  const pathToVar = new Map<string, string>(); // sourcePath -> varName
  const usedNames = new Set<string>();
  for (const info of existingImports) {
    pathToVar.set(info.sourcePath, info.varName);
    usedNames.add(info.varName);
  }

  // Reserve names of every top-level declaration so new imports don't collide.
  for (const stmt of sourceFile.getVariableStatements()) {
    for (const d of stmt.getDeclarations()) usedNames.add(d.getName());
  }

  const newImports: { varName: string; sourcePath: string }[] = [];

  const resolveString = (s: string): string | null => {
    if (!s) return null;
    if (/^(https?:|data:|blob:)/i.test(s)) return null;

    const marker = "assets/img/";
    const idx = s.replace(/\\/g, "/").lastIndexOf(marker);
    if (idx < 0) return null;

    const rel = s.replace(/\\/g, "/").slice(idx + marker.length);
    if (!rel) return null;

    const normalized = `../assets/img/${rel}`;

    const existing = pathToVar.get(normalized);
    if (existing) return existing;

    const varName = makeUniqueVarName(normalized, usedNames);
    newImports.push({ varName, sourcePath: normalized });
    pathToVar.set(normalized, varName);
    usedNames.add(varName);
    return varName;
  };

  const varDecl = (() => {
    for (const stmt of sourceFile.getVariableStatements()) {
      for (const d of stmt.getDeclarations()) {
        if (d.getName() === targetExport) return d;
      }
    }
    return undefined;
  })();

  if (!varDecl) {
    throw new Error(`Export declaration "${targetExport}" not found in ${targetFile}`);
  }

  const init = varDecl.getInitializer();
  const isAsConst = init?.getKind() === SyntaxKind.AsExpression;

  const serialized = serialize(newValue, { resolveString });
  varDecl.setInitializer(isAsConst ? `${serialized} as const` : serialized);

  // Append any newly created imports.
  for (const { varName, sourcePath } of newImports) {
    sourceFile.addImportDeclaration({
      defaultImport: varName,
      moduleSpecifier: sourcePath,
    });
  }

  // Prune image imports that are no longer referenced anywhere in the file.
  // Non-image imports are left untouched.
  const imageImportDecls = sourceFile.getImportDeclarations().filter((decl) => {
    const spec = decl.getModuleSpecifierValue();
    return IMAGE_EXT_REGEX.test(spec) && !!decl.getDefaultImport();
  });

  for (const decl of imageImportDecls) {
    const dflt = decl.getDefaultImport();
    if (!dflt) continue;
    const varName = dflt.getText();
    const fullText = sourceFile.getFullText();
    const declText = decl.getFullText();
    const withoutDecl = fullText.replace(declText, "");
    const re = new RegExp(`\\b${escapeRegex(varName)}\\b`);
    if (!re.test(withoutDecl)) {
      decl.remove();
    }
  }

  const updatedRaw = sourceFile.getFullText();
  const formatted = await prettier.format(updatedRaw, { parser: "typescript" });

  const changed = formatted !== originalContent;
  return { originalContent, newContent: formatted, changed };
}

/**
 * Parse the candidate output with ts-morph and return any syntax-level
 * diagnostics (TS codes 1000-1999). Semantic diagnostics are deliberately
 * ignored because the in-memory parse cannot resolve imports to other
 * project files.
 */
function findSyntaxErrors(fileName: string, source: string): string[] {
  const project = new Project({ useInMemoryFileSystem: true });
  const sf = project.createSourceFile(fileName, source, { overwrite: true });

  return sf
    .getPreEmitDiagnostics()
    .filter(
      (d) =>
        d.getCategory() === DiagnosticCategory.Error &&
        d.getCode() >= 1000 &&
        d.getCode() < 2000
    )
    .map((d) => {
      const start = d.getStart() ?? 0;
      const { line, character } = sf.compilerNode.getLineAndCharacterOfPosition(start);
      return `${fileName}:${line + 1}:${character + 1} - TS${d.getCode()}: ${d.getMessageText()}`;
    });
}

export async function generateSectionDiff(
  sectionKey: string,
  newValue: any
): Promise<{ diff: string; changed: boolean }> {
  const { section } = await readSection(sectionKey);
  const { targetFile, targetExport } = resolveTarget(section);

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
  newValue: any
): Promise<{ success: boolean; changed: boolean }> {
  const { section, value: currentValue } = await readSection(sectionKey);

  if (deepEqual(currentValue, newValue)) {
    return { success: true, changed: false };
  }

  const { targetFile, targetExport } = resolveTarget(section);
  const { originalContent, newContent, changed } = await computeUpdatedSource(
    targetFile,
    targetExport,
    newValue
  );

  if (!changed) {
    return { success: true, changed: false };
  }

  const syntaxErrors = findSyntaxErrors(path.basename(targetFile), newContent);
  if (syntaxErrors.length > 0) {
    throw new Error(
      `Refusing to write: generated source has syntax errors.\n${syntaxErrors.join("\n")}`
    );
  }

  const tmpFile = `${targetFile}.tmp`;
  fs.writeFileSync(tmpFile, newContent, "utf-8");

  try {
    fs.renameSync(tmpFile, targetFile);
    return { success: true, changed: true };
  } catch (err) {
    if (fs.existsSync(tmpFile)) {
      try {
        fs.unlinkSync(tmpFile);
      } catch {}
    }
    fs.writeFileSync(targetFile, originalContent, "utf-8");
    throw err;
  }
}