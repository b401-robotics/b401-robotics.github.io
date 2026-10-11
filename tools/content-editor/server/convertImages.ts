import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { getAssetsImgDir, getAssetsWebpDir } from "./discoverSections";

export const IMAGE_EXT_REGEX = /\.(png|jpe?g|gif|webp|svg|avif|bmp|tiff?)$/i;

export interface ConversionItemResult {
  sourceRel: string;
  targetRel: string;
  originalSize: number;
  webpSize: number;
  savedBytes: number;
  savedPercent: number;
  status: "converted" | "skipped" | "failed";
  error?: string;
}

export interface ConversionStats {
  totalSource: number;
  totalWebp: number;
  pendingCount: number;
  totalSourceBytes: number;
  totalWebpBytes: number;
  items: Array<{
    sourceRel: string;
    targetRel: string;
    existsInWebp: boolean;
    sourceSize: number;
    webpSize?: number;
    needsConversion: boolean;
  }>;
}

export interface ConvertOptions {
  force?: boolean;
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

/**
 * Scan raw images in src/assets/img/
 */
export function scanRawImages(): string[] {
  const rootDir = getAssetsImgDir();
  if (!fs.existsSync(rootDir)) return [];

  const out: string[] = [];
  const walk = (dir: string, prefix: string) => {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), rel);
      } else if (entry.isFile() && IMAGE_EXT_REGEX.test(entry.name)) {
        out.push(rel);
      }
    }
  };

  walk(rootDir, "");
  out.sort((a, b) => a.localeCompare(b));
  return out;
}

/**
 * Change file extension of a relative path to .webp
 */
export function toWebpRelPath(relPath: string): string {
  const ext = path.extname(relPath);
  return relPath.slice(0, -ext.length) + ".webp";
}

/**
 * Get conversion statistics and status comparison between src/assets/img and src/assets/webp
 */
export function getConversionStats(): ConversionStats {
  const imgDir = getAssetsImgDir();
  const webpDir = getAssetsWebpDir();
  const rawList = scanRawImages();

  let totalSourceBytes = 0;
  let totalWebpBytes = 0;
  let pendingCount = 0;
  let totalWebp = 0;

  const items = rawList.map((sourceRel) => {
    const sourcePath = path.join(imgDir, sourceRel);
    const targetRel = toWebpRelPath(sourceRel);
    const targetPath = path.join(webpDir, targetRel);

    let sourceSize = 0;
    let sourceMtime = 0;
    try {
      const sStat = fs.statSync(sourcePath);
      sourceSize = sStat.size;
      sourceMtime = sStat.mtimeMs;
      totalSourceBytes += sourceSize;
    } catch {}

    let existsInWebp = false;
    let webpSize: number | undefined;
    let webpMtime = 0;
    if (fs.existsSync(targetPath)) {
      try {
        const wStat = fs.statSync(targetPath);
        existsInWebp = true;
        webpSize = wStat.size;
        webpMtime = wStat.mtimeMs;
        totalWebpBytes += webpSize;
        totalWebp++;
      } catch {}
    }

    // Needs conversion if it doesn't exist in webp or source was modified after webp
    const needsConversion = !existsInWebp || sourceMtime > webpMtime;
    if (needsConversion) {
      pendingCount++;
    }

    return {
      sourceRel,
      targetRel,
      existsInWebp,
      sourceSize,
      webpSize,
      needsConversion,
    };
  });

  return {
    totalSource: rawList.length,
    totalWebp,
    pendingCount,
    totalSourceBytes,
    totalWebpBytes,
    items,
  };
}

/**
 * Convert a single image or all images from src/assets/img/ to src/assets/webp/
 */
export async function convertImages(options: ConvertOptions = {}): Promise<{
  success: boolean;
  results: ConversionItemResult[];
  totalSavedBytes: number;
}> {
  const imgDir = getAssetsImgDir();
  const webpDir = getAssetsWebpDir();
  const rawList = scanRawImages();

  if (!fs.existsSync(webpDir)) {
    fs.mkdirSync(webpDir, { recursive: true });
  }

  const quality = options.quality ?? 80;
  const maxWidth = options.maxWidth ?? 1920;
  const maxHeight = options.maxHeight ?? 1920;
  const force = Boolean(options.force);

  const results: ConversionItemResult[] = [];
  let totalSavedBytes = 0;

  for (const sourceRel of rawList) {
    const sourcePath = path.join(imgDir, sourceRel);
    const targetRel = toWebpRelPath(sourceRel);
    const targetPath = path.join(webpDir, targetRel);

    try {
      const sourceStat = fs.statSync(sourcePath);
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const targetExists = fs.existsSync(targetPath);
      if (targetExists && !force) {
        const targetStat = fs.statSync(targetPath);
        if (targetStat.mtimeMs >= sourceStat.mtimeMs) {
          results.push({
            sourceRel,
            targetRel,
            originalSize: sourceStat.size,
            webpSize: targetStat.size,
            savedBytes: Math.max(0, sourceStat.size - targetStat.size),
            savedPercent:
              sourceStat.size > 0
                ? Math.round(
                    ((sourceStat.size - targetStat.size) / sourceStat.size) * 100
                  )
                : 0,
            status: "skipped",
          });
          continue;
        }
      }

      // Read image with sharp
      let pipeline = sharp(sourcePath);
      const metadata = await pipeline.metadata();

      // Only resize down if larger than max dimensions, preserving aspect ratio
      if (
        metadata.width &&
        metadata.height &&
        (metadata.width > maxWidth || metadata.height > maxHeight)
      ) {
        pipeline = pipeline.resize({
          width: metadata.width > maxWidth ? maxWidth : undefined,
          height: metadata.height > maxHeight ? maxHeight : undefined,
          fit: "inside",
          withoutEnlargement: true,
        });
      }

      const tempTargetPath = `${targetPath}.tmp`;
      await pipeline.webp({ quality, effort: 4 }).toFile(tempTargetPath);
      fs.renameSync(tempTargetPath, targetPath);

      const targetStat = fs.statSync(targetPath);
      const savedBytes = sourceStat.size - targetStat.size;
      const savedPercent =
        sourceStat.size > 0
          ? Math.round((savedBytes / sourceStat.size) * 100)
          : 0;

      totalSavedBytes += Math.max(0, savedBytes);

      results.push({
        sourceRel,
        targetRel,
        originalSize: sourceStat.size,
        webpSize: targetStat.size,
        savedBytes,
        savedPercent,
        status: "converted",
      });
    } catch (err: any) {
      results.push({
        sourceRel,
        targetRel,
        originalSize: 0,
        webpSize: 0,
        savedBytes: 0,
        savedPercent: 0,
        status: "failed",
        error: err.message || "Conversion failed",
      });
    }
  }

  return {
    success: results.every((r) => r.status !== "failed"),
    results,
    totalSavedBytes,
  };
}
