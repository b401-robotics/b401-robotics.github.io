import fs from "node:fs";
import path from "node:path";

const rootDir = path.resolve(import.meta.dir, "../../..");
const distDir = path.join(rootDir, "dist");
const srcDir = path.join(rootDir, "src");

let failed = false;

// 1. Check if any file in src/ imports tools/content-editor
function checkImports(dir: string) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkImports(fullPath);
    } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      if (content.includes("tools/content-editor")) {
        console.error(`[Guard Error] Forbidden import of tools/content-editor found in ${fullPath}`);
        failed = true;
      }
    }
  }
}

// 2. Check if dist/ contains forbidden strings
function checkDist(dir: string) {
  if (!fs.existsSync(dir)) {
    console.log(`[Guard] dist/ does not exist yet; skipping dist check.`);
    return;
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkDist(fullPath);
    } else {
      const content = fs.readFileSync(fullPath, "utf-8");
      if (content.includes("content-editor") || content.includes("api/sections")) {
        console.error(`[Guard Error] Deployed artifact ${fullPath} contains forbidden editor strings!`);
        failed = true;
      }
    }
  }
}

console.log("[Guard] Running deployment exclusion check...");
checkImports(srcDir);
checkDist(distDir);

if (failed) {
  console.error("[Guard FAILED] Deployment exclusion check failed!");
  process.exit(1);
} else {
  console.log("[Guard PASSED] Content Editor is safely excluded from deployment.");
}
