import fs from "node:fs";
import path from "node:path";
import prettier from "prettier";
import { Project, SyntaxKind } from "ts-morph";
import { getContentsDir, getProjectRoot } from "./discoverSections";
import { serialize } from "./serialize";

async function runTscCheck(): Promise<{ ok: boolean; stderr: string }> {
  const rootDir = getProjectRoot();
  const proc = Bun.spawn(["bunx", "tsc", "--noEmit"], {
    cwd: rootDir,
    stdout: "pipe",
    stderr: "pipe",
  });
  const exitCode = await proc.exited;
  if (exitCode === 0) return { ok: true, stderr: "" };
  const errText = await new Response(proc.stderr).text();
  return { ok: false, stderr: errText };
}

/**
 * Scaffold a new flat content file `src/contents/<folderName>.ts` with a
 * single `xxxEN` export, then register the export in translations.ts under
 * the given key. The `Content` suffix used by existing files is preserved
 * if the caller supplies it.
 */
export async function scaffoldSection(options: {
  folderName: string;
  key: string;
  label?: string;
}): Promise<void> {
  const { folderName, key, label } = options;
  const contentsDir = getContentsDir();

  const rawName = folderName.replace(/\.ts$/i, "").trim();
  if (!rawName) {
    throw new Error("A file name is required to scaffold a new section.");
  }

  const fileName = rawName;
  const filePath = path.join(contentsDir, `${fileName}.ts`);

  if (fs.existsSync(filePath)) {
    throw new Error(`File "${fileName}.ts" already exists in src/contents/`);
  }

  const exportEn = `${key}EN`;

  const defaultEnVal = {
    sectionLabel: label || key,
    heading: "Section Heading",
    headingAccent: "Accent",
    body: "Description text goes here.",
  };

  const raw = `export const ${exportEn} = ${serialize(defaultEnVal)} as const;\n`;
  const formatted = await prettier.format(raw, { parser: "typescript" });

  fs.writeFileSync(filePath, formatted, "utf-8");

  // Register the EN export in translations.ts.
  const translationsPath = path.join(contentsDir, "translations.ts");
  if (fs.existsSync(translationsPath)) {
    const originalTranslations = fs.readFileSync(translationsPath, "utf-8");
    try {
      const project = new Project({ useInMemoryFileSystem: true });
      const sf = project.createSourceFile("translations.ts", originalTranslations);

      sf.addImportDeclaration({
        moduleSpecifier: `./${fileName}`,
        namedImports: [exportEn],
      });

      const varDecl = sf.getVariableDeclaration("translations");
      if (varDecl) {
        const objLiteral = varDecl.getFirstDescendantByKind(
          SyntaxKind.ObjectLiteralExpression
        );
        if (objLiteral) {
          objLiteral.addPropertyAssignment({ name: key, initializer: exportEn });
        }
      }

      const updatedCode = sf.getFullText();
      const formattedCode = await prettier.format(updatedCode, { parser: "typescript" });
      fs.writeFileSync(translationsPath, formattedCode, "utf-8");

      const { ok, stderr } = await runTscCheck();
      if (!ok) {
        fs.writeFileSync(translationsPath, originalTranslations, "utf-8");
        if (fs.existsSync(filePath)) fs.rmSync(filePath, { force: true });
        throw new Error(`TypeScript check failed after scaffolding: ${stderr}`);
      }
    } catch (err) {
      fs.writeFileSync(translationsPath, originalTranslations, "utf-8");
      if (fs.existsSync(filePath)) fs.rmSync(filePath, { force: true });
      throw err;
    }
  }
}