import path from "node:path";
import { discoverSections, getProjectRoot } from "./discoverSections";
import { readSection } from "./readSection";
import type { ValidationIssue, ValidationReport } from "./types";

function compareShapes(
  enVal: any,
  idVal: any,
  currentPath = "",
  sectionKey = ""
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (enVal === undefined || idVal === undefined) {
    if (enVal !== undefined && idVal === undefined) {
      issues.push({
        type: "mismatch",
        severity: "error",
        section: sectionKey,
        path: currentPath,
        message: `Field "${currentPath || sectionKey}" exists in EN but is missing in ID`,
      });
    } else if (enVal === undefined && idVal !== undefined) {
      issues.push({
        type: "mismatch",
        severity: "warning",
        section: sectionKey,
        path: currentPath,
        message: `Field "${currentPath || sectionKey}" exists in ID but is missing in EN`,
      });
    }
    return issues;
  }

  const typeEn = Array.isArray(enVal) ? "array" : typeof enVal;
  const typeId = Array.isArray(idVal) ? "array" : typeof idVal;

  if (typeEn !== typeId) {
    issues.push({
      type: "mismatch",
      severity: "error",
      section: sectionKey,
      path: currentPath,
      message: `Type mismatch at "${currentPath}": EN is ${typeEn}, ID is ${typeId}`,
    });
    return issues;
  }

  if (typeEn === "array") {
    if (enVal.length !== idVal.length) {
      issues.push({
        type: "mismatch",
        severity: "warning",
        section: sectionKey,
        path: currentPath,
        message: `Array length mismatch at "${currentPath}": EN has ${enVal.length} items, ID has ${idVal.length} items`,
      });
    }
    const minLen = Math.min(enVal.length, idVal.length);
    for (let i = 0; i < minLen; i++) {
      issues.push(
        ...compareShapes(enVal[i], idVal[i], `${currentPath}[${i}]`, sectionKey)
      );
    }
  } else if (typeEn === "object" && enVal !== null && idVal !== null) {
    const keysEn = new Set(Object.keys(enVal));
    const keysId = new Set(Object.keys(idVal));

    for (const k of keysEn) {
      const childPath = currentPath ? `${currentPath}.${k}` : k;
      if (!keysId.has(k)) {
        issues.push({
          type: "mismatch",
          severity: "error",
          section: sectionKey,
          path: childPath,
          message: `Field "${childPath}" is missing in ID`,
        });
      } else {
        issues.push(...compareShapes(enVal[k], idVal[k], childPath, sectionKey));
      }
    }

    for (const k of keysId) {
      if (!keysEn.has(k)) {
        const childPath = currentPath ? `${currentPath}.${k}` : k;
        issues.push({
          type: "mismatch",
          severity: "warning",
          section: sectionKey,
          path: childPath,
          message: `Unexpected field "${childPath}" in ID (not in EN)`,
        });
      }
    }
  }

  return issues;
}

export async function validateContent(): Promise<ValidationReport> {
  const issues: ValidationIssue[] = [];
  const sections = discoverSections();

  // 1. Cross-language shape comparison
  for (const s of sections) {
    if (s.kind === "paired") {
      try {
        const { value: enVal } = await readSection(s.key, "en");
        const { value: idVal } = await readSection(s.key, "id");
        const shapeIssues = compareShapes(enVal, idVal, "", s.key);
        issues.push(...shapeIssues);
      } catch (err: any) {
        issues.push({
          type: "mismatch",
          severity: "error",
          section: s.key,
          message: `Failed to compare EN/ID for ${s.key}: ${err.message}`,
        });
      }
    } else if (s.kind === "en-only") {
      issues.push({
        type: "mismatch",
        severity: "warning",
        section: s.key,
        message: `Section "${s.key}" only has EN translation; ID translation is missing.`,
      });
    }
  }

  // 2. translations.ts check
  try {
    const rootDir = getProjectRoot();
    const transPath = path.join(rootDir, "src/contents/translations.ts");
    const transMod = await import(`${transPath}?t=${Date.now()}`);
    const { translations } = transMod;

    if (translations) {
      const enKeys = Object.keys(translations.en || {});
      const idKeys = Object.keys(translations.id || {});

      for (const s of sections) {
        if (s.kind === "paired") {
          if (!enKeys.includes(s.key)) {
            issues.push({
              type: "translations",
              severity: "warning",
              section: s.key,
              message: `Paired section "${s.key}" is not registered in translations.en`,
            });
          }
          if (!idKeys.includes(s.key)) {
            issues.push({
              type: "translations",
              severity: "warning",
              section: s.key,
              message: `Paired section "${s.key}" is not registered in translations.id`,
            });
          }
        }
      }
    }
  } catch (err: any) {
    issues.push({
      type: "translations",
      severity: "error",
      message: `Failed to inspect translations.ts: ${err.message}`,
    });
  }

  // 3. TypeScript compiler check
  try {
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
      const rawOutput = (stdout || stderr).trim();

      const lines = rawOutput.split("\n");
      for (const line of lines) {
        if (line.includes("error TS")) {
          issues.push({
            type: "typescript",
            severity: "error",
            message: line.trim(),
          });
        }
      }
      if (issues.filter((i) => i.type === "typescript").length === 0 && rawOutput) {
        issues.push({
          type: "typescript",
          severity: "error",
          message: rawOutput,
        });
      }
    }
  } catch (err: any) {
    issues.push({
      type: "typescript",
      severity: "error",
      message: `Failed to run tsc: ${err.message}`,
    });
  }

  const hasErrors = issues.some((i) => i.severity === "error");
  return {
    valid: !hasErrors,
    issues,
  };
}
