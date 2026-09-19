import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

async function walk(dir: string, callback: (filepath: string) => Promise<void>) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const res = path.join(dir, file.name);
    if (file.isDirectory()) {
      await walk(res, callback);
    } else {
      await callback(res);
    }
  }
}

async function run() {
  const srcDir = path.join(process.cwd(), "src");
  
  // 1. Process TSX files
  await walk(srcDir, async (filepath) => {
    if (filepath.endsWith(".tsx")) {
      let content = await fs.readFile(filepath, "utf-8");
      
      // Remove unused React imports
      content = content.replace(/import React from "react";\r?\n/g, "");
      content = content.replace(/import React, {/g, "import {");
      
      // Dark mode classes
      content = content.replace(/text-zinc-900(?!\s+dark:)/g, "text-zinc-900 dark:text-zinc-100");
      content = content.replace(/text-zinc-600(?!\s+dark:)/g, "text-zinc-600 dark:text-zinc-400");
      content = content.replace(/bg-white(?!\s+dark:|\/)/g, "bg-white dark:bg-zinc-800");
      content = content.replace(/bg-zinc-100(?!\s+dark:|\/)/g, "bg-zinc-100 dark:bg-zinc-800/50");
      
      // Update image imports
      content = content.replace(/\.png"/g, ".webp\"");
      
      await fs.writeFile(filepath, content, "utf-8");
    }
  });
  
  console.log("Updated all TSX files.");

  // 2. Process PNG images
  const assetsDir = path.join(srcDir, "assets");
  await walk(assetsDir, async (filepath) => {
    if (filepath.endsWith(".png")) {
      const webpPath = filepath.replace(/\.png$/, ".webp");
      await sharp(filepath).webp({ quality: 80 }).toFile(webpPath);
      await fs.unlink(filepath);
      console.log(`Converted: ${path.basename(filepath)} -> ${path.basename(webpPath)}`);
    }
  });
  
  console.log("All done!");
}

run().catch(console.error);
