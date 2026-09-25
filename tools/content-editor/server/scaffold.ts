import fs from "node:fs";
import path from "node:path";
import prettier from "prettier";
import { Project, SyntaxKind } from "ts-morph";
import { getContentsDir, getProjectRoot, discoverSections } from "./discoverSections";
import { readSection } from "./readSection";
import { serialize } from "./serialize";

function cloneWithEmptyStrings(val: any): any {
  if (typeof val === "string") return "";
  if (typeof val === "number") return 0;
  if (typeof val === "boolean") return false;
  if (Array.isArray(val)) {
    return val.map(cloneWithEmptyStrings);
  }
  if (typeof val === "object" && val !== null) {
    const res: Record<string, any> = {};
    for (const [k, v] of Object.entries(val)) {
      res[k] = cloneWithEmptyStrings(v);
    }
    return res;
  }
  return val;
}

export async function createIdForSection(sectionKey: string): Promise<void> {
  const { section, value: enVal } = await readSection(sectionKey, "en");
  const folderPath = path.dirname(section.files.en!);
  const idFilePath = path.join(folderPath, "id.ts");

  if (fs.existsSync(idFilePath)) {
    throw new Error(`id.ts already exists in ${folderPath}`);
  }

  const exportNameId = `${sectionKey}ID`;
  const emptyVal = cloneWithEmptyStrings(enVal);
  const rawCode = `export const ${exportNameId} = ${serialize(emptyVal)} as const;\n`;
  const formatted = await prettier.format(rawCode, { parser: "typescript" });

  fs.writeFileSync(idFilePath, formatted, "utf-8");

  // Verify with tsc
  const rootDir = getProjectRoot();
  const proc = Bun.spawn(["bunx", "tsc", "--noEmit"], { cwd: rootDir, stdout: "pipe", stderr: "pipe" });
  const exitCode = await proc.exited;
  if (exitCode !== 0) {
    fs.unlinkSync(idFilePath);
    const errText = await new Response(proc.stderr).text();
    throw new Error(`TypeScript error after creating id.ts:\n${errText}`);
  }
}

export async function scaffoldSection(options: {
  folderName: string;
  key: string;
  label?: string;
}): Promise<void> {
  const { folderName, key, label } = options;
  const contentsDir = getContentsDir();
  const folderPath = path.join(contentsDir, folderName);

  if (fs.existsSync(folderPath)) {
    throw new Error(`Folder "${folderName}" already exists in src/contents/`);
  }

  fs.mkdirSync(folderPath, { recursive: true });

  const exportEn = `${key}EN`;
  const exportId = `${key}ID`;

  const defaultEnVal = {
    sectionLabel: label || key,
    heading: "Section Heading",
    headingAccent: "Accent",
    body: "Description text goes here.",
  };

  const defaultIdVal = {
    sectionLabel: label || key,
    heading: "Judul Bagian",
    headingAccent: "Aksen",
    body: "Teks deskripsi di sini.",
  };

  const enRaw = `export const ${exportEn} = ${serialize(defaultEnVal)} as const;\n`;
  const idRaw = `export const ${exportId} = ${serialize(defaultIdVal)} as const;\n`;

  const enFormatted = await prettier.format(enRaw, { parser: "typescript" });
  const idFormatted = await prettier.format(idRaw, { parser: "typescript" });

  const enPath = path.join(folderPath, "en.ts");
  const idPath = path.join(folderPath, "id.ts");

  fs.writeFileSync(enPath, enFormatted, "utf-8");
  fs.writeFileSync(idPath, idFormatted, "utf-8");

  // Update translations.ts
  const translationsPath = path.join(contentsDir, "translations.ts");
  if (fs.existsSync(translationsPath)) {
    const originalTranslations = fs.readFileSync(translationsPath, "utf-8");
    try {
      const project = new Project({ useInMemoryFileSystem: true });
      const sf = project.createSourceFile("translations.ts", originalTranslations);

      // Add imports
      sf.addImportDeclaration({
        moduleSpecifier: `./${folderName}/en`,
        namedImports: [exportEn],
      });
      sf.addImportDeclaration({
        moduleSpecifier: `./${folderName}/id`,
        namedImports: [exportId],
      });

      // Find translations variable declaration
      const varDecl = sf.getVariableDeclaration("translations");
      if (varDecl) {
        const init = varDecl.getInitializer();
        if (init) {
          const text = init.getText();
          // We can insert key: exportEn into en object and key: exportId into id object
          // AST-based:
          const obj = init.asKind(project.getProgram().getTypeChecker() ? 0 : 0) || init;
          // Or insert via ts-morph AST nodes
          const objLiteral = varDecl.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

          if (objLiteral) {
            const enProp = objLiteral.getProperty("en");
            const idProp = objLiteral.getProperty("id");
            if (enProp && "getInitializer" in enProp) {
              const enObj = (enProp as any).getInitializer();
              if (enObj && "addPropertyAssignment" in enObj) {
                enObj.addPropertyAssignment({ name: key, initializer: exportEn });
              }
            }
            if (idProp && "getInitializer" in idProp) {
              const idObj = (idProp as any).getInitializer();
              if (idObj && "addPropertyAssignment" in idObj) {
                idObj.addPropertyAssignment({ name: key, initializer: exportId });
              }
            }
          }
        }
      }

      const updatedCode = sf.getFullText();
      const formattedCode = await prettier.format(updatedCode, { parser: "typescript" });
      fs.writeFileSync(translationsPath, formattedCode, "utf-8");

      // Verify with tsc
      const rootDir = getProjectRoot();
      const proc = Bun.spawn(["bunx", "tsc", "--noEmit"], { cwd: rootDir, stdout: "pipe", stderr: "pipe" });
      const exitCode = await proc.exited;
      if (exitCode !== 0) {
        // Rollback
        fs.writeFileSync(translationsPath, originalTranslations, "utf-8");
        fs.rmSync(folderPath, { recursive: true, force: true });
        const errText = await new Response(proc.stderr).text();
        throw new Error(`TypeScript check failed after scaffolding: ${errText}`);
      }
    } catch (err) {
      fs.writeFileSync(translationsPath, originalTranslations, "utf-8");
      fs.rmSync(folderPath, { recursive: true, force: true });
      throw err;
    }
  }
}
