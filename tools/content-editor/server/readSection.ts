import fs from "node:fs";
import path from "node:path";
import { Node, Project } from "ts-morph";
import { discoverSections } from "./discoverSections";
import { IMAGE_EXT_REGEX } from "./imports";
import type { DiscoveredSection } from "./types";

/**
 * After importing the module, we know each image import's *runtime* value is
 * a resolved URL (e.g. "/src/assets/img/ur5.webp"). The client prefers to see
 * the source-relative path form (e.g. "../assets/img/ur5.webp") so it can be
 * round-tripped back into an import on save.
 *
 * This function parses the source file statically, walks the target export's
 * initializer, and for every leaf that is an Identifier bound to an image
 * import, records the path so we can substitute the source path in place of
 * the runtime URL.
 */
function applyImportRefs(filePath: string, exportName: string, runtime: any): any {
  let content: string;
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch {
    return runtime;
  }

  const project = new Project({ useInMemoryFileSystem: true });
  const sf = project.createSourceFile(path.basename(filePath), content);

  // Collect image imports only.
  const importMap = new Map<string, string>(); // varName -> sourcePath
  for (const decl of sf.getImportDeclarations()) {
    const spec = decl.getModuleSpecifierValue();
    if (!IMAGE_EXT_REGEX.test(spec)) continue;
    const dflt = decl.getDefaultImport();
    if (!dflt) continue;
    importMap.set(dflt.getText(), spec);
  }
  if (importMap.size === 0) return runtime;

  // Find the target variable declaration by walking top-level statements.
  let targetDecl = undefined as
    | ReturnType<typeof sf.getVariableStatements>[number]["getDeclarations"] extends
        () => infer D
        ? D extends Array<infer V>
          ? V
          : never
        : never;
  for (const stmt of sf.getVariableStatements()) {
    for (const d of stmt.getDeclarations()) {
      if (d.getName() === exportName) {
        targetDecl = d as any;
        break;
      }
    }
    if (targetDecl) break;
  }
  if (!targetDecl) return runtime;

  let init = targetDecl.getInitializer();
  if (!init) return runtime;
  if (Node.isAsExpression(init)) init = init.getExpression();
  if (Node.isParenthesizedExpression(init)) init = init.getExpression();
  if (!init) return runtime;

  const pathKey = (p: string[]): string => p.join("\u0000");
  const overrides = new Map<string, string>();

  const walk = (node: Node, currentPath: string[]) => {
    if (Node.isIdentifier(node)) {
      const name = node.getText();
      const srcPath = importMap.get(name);
      if (srcPath) overrides.set(pathKey(currentPath), srcPath);
      return;
    }
    if (Node.isObjectLiteralExpression(node)) {
      for (const prop of node.getProperties()) {
        if (Node.isPropertyAssignment(prop)) {
          const pInit = prop.getInitializer();
          if (!pInit) continue;
          walk(pInit, [...currentPath, prop.getName()]);
        }
      }
      return;
    }
    if (Node.isArrayLiteralExpression(node)) {
      node.getElements().forEach((el, i) => walk(el, [...currentPath, String(i)]));
      return;
    }
    // Other node shapes (template literals, conditionals, function calls…)
    // are left as-is — the runtime value is used unchanged.
  };

  walk(init, []);

  if (overrides.size === 0) return runtime;

  const clone = (node: any, currentPath: string[]): any => {
    const over = overrides.get(pathKey(currentPath));
    if (over !== undefined) return over;
    if (Array.isArray(node)) {
      return node.map((v, i) => clone(v, [...currentPath, String(i)]));
    }
    if (node && typeof node === "object") {
      const out: any = {};
      for (const [k, v] of Object.entries(node)) out[k] = clone(v, [...currentPath, k]);
      return out;
    }
    return node;
  };

  return clone(runtime, []);
}

export async function readSection(
  sectionKey: string
): Promise<{ section: DiscoveredSection; value: any }> {
  const sections = discoverSections();
  const section = sections.find((s) => s.key === sectionKey);

  if (!section) {
    throw new Error(`Section "${sectionKey}" not found.`);
  }

  if (section.kind === "read-only") {
    const raw = section.files.standalone
      ? fs.readFileSync(section.files.standalone, "utf-8")
      : "";
    return { section, value: { _readOnly: true, code: raw } };
  }

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
    throw new Error(`Section "${sectionKey}" has no source file or export.`);
  }

  const fileUrl = `${targetFile}?t=${Date.now()}`;
  const mod = await import(fileUrl);

  if (!(targetExport in mod)) {
    throw new Error(`Export "${targetExport}" not found in ${targetFile}`);
  }

  const runtimeValue = mod[targetExport];
  const value = applyImportRefs(targetFile, targetExport, runtimeValue);

  return { section, value };
}