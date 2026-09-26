import path from "node:path";
import { discoverSections, getProjectRoot } from "./discoverSections";
import type { ValidationIssue, ValidationReport } from "./types";

export async function validateContent(): Promise<ValidationReport> {
  const issues: ValidationIssue[] = [];
  const sections = discoverSections();

  // 1. translations.ts check — every EN-only section should be registered.
  try {
    const rootDir = getProjectRoot();
    const transPath = path.join(rootDir, "src/contents/translations.ts");
    const transMod = await import(`${transPath}?t=${Date.now()}`);
    const { translations } = transMod;

    if (translations) {
      const registeredKeys = Object.keys(translations);

      for (const s of sections) {
        if (s.kind === "en-only" && !registeredKeys.includes(s.key)) {
          issues.push({
            type: "translations",
            severity: "warning",
            section: s.key,
            message: `Section "${s.key}" is not registered in translations`,
          });
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

  // 2. TypeScript compiler check
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