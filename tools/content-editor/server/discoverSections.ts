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

export function listAssetImages(): string[] {
  const dir = getAssetsImgDir();
  if (!fs.existsSync(dir)) return [];
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isFile() && IMAGE_EXT_REGEX.test(e.name))
      .map((e) => e.name)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

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
    if (!entry.isDirectory()) continue;
    const folderName = entry.name;
    const folderPath = path.join(contentsDir, folderName);

    const filesInFolder = fs.readdirSync(folderPath);

    const enFile = filesInFolder.find((f) => f === "en.ts");
    const idFile = filesInFolder.find((f) => f === "id.ts");

    const enFilePath = enFile ? path.join(folderPath, enFile) : undefined;
    const idFilePath = idFile ? path.join(folderPath, idFile) : undefined;

    const enExports: string[] = [];
    const idExports: string[] = [];

    if (enFilePath) {
      const sf = project.addSourceFileAtPath(enFilePath);
      for (const stmt of sf.getVariableStatements()) {
        if (stmt.hasExportKeyword()) {
          for (const decl of stmt.getDeclarations()) {
            enExports.push(decl.getName());
          }
        }
      }
    }

    if (idFilePath) {
      const sf = project.addSourceFileAtPath(idFilePath);
      for (const stmt of sf.getVariableStatements()) {
        if (stmt.hasExportKeyword()) {
          for (const decl of stmt.getDeclarations()) {
            idExports.push(decl.getName());
          }
        }
      }
    }

    // Pair <x>EN and <x>ID
    const pairedKeys = new Set<string>();

    for (const expEn of enExports) {
      if (expEn.endsWith("EN")) {
        const baseKey = expEn.slice(0, -2);
        const expId = `${baseKey}ID`;
        if (idExports.includes(expId)) {
          pairedKeys.add(baseKey);
          sections.push({
            key: baseKey,
            folder: folderName,
            kind: "paired",
            files: {
              en: enFilePath,
              id: idFilePath,
            },
            exportNameEn: expEn,
            exportNameId: expId,
            hasEn: true,
            hasId: true,
          });
        } else {
          // EN-only section
          sections.push({
            key: baseKey,
            folder: folderName,
            kind: "en-only",
            files: {
              en: enFilePath,
            },
            exportNameEn: expEn,
            hasEn: true,
            hasId: false,
          });
        }
      } else {
        // standalone export in en.ts
        sections.push({
          key: expEn,
          folder: folderName,
          kind: "standalone",
          files: {
            standalone: enFilePath,
          },
          standaloneExport: expEn,
          hasEn: true,
          hasId: false,
        });
      }
    }

    // Check for other .ts files (e.g. memberList.ts)
    for (const fileName of filesInFolder) {
      if (fileName === "en.ts" || fileName === "id.ts") continue;
      if (fileName.endsWith(".ts") && !fileName.endsWith(".d.ts")) {
        const otherFilePath = path.join(folderPath, fileName);
        const sf = project.addSourceFileAtPath(otherFilePath);
        for (const stmt of sf.getVariableStatements()) {
          if (stmt.hasExportKeyword()) {
            for (const decl of stmt.getDeclarations()) {
              const exportName = decl.getName();
              sections.push({
                key: exportName,
                folder: folderName,
                kind: "standalone",
                files: {
                  standalone: otherFilePath,
                },
                standaloneExport: exportName,
                hasEn: true,
                hasId: true,
              });
            }
          }
        }
      } else if (fileName.endsWith(".tsx")) {
        // Read-only file e.g. handleHeading.tsx
        const baseName = fileName.replace(/\.tsx$/, "");
        sections.push({
          key: baseName,
          folder: folderName,
          kind: "read-only",
          files: {
            standalone: path.join(folderPath, fileName),
          },
          hasEn: true,
          hasId: true,
          readOnly: true,
          readOnlyReason: "JSX component — must be edited directly in source code.",
        });
      }
    }
  }

  return sections;
}
