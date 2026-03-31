import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, relative } from 'path';

const SRC_DIR = 'public/images';
const MAX_SIZE = 1400;
const WEBP_QUALITY = 85;

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return null;

  const before = (await stat(filePath)).size;
  const image = sharp(filePath);
  const meta = await image.metadata();

  // Resize: fit longest side to MAX_SIZE, keep aspect ratio
  const needsResize = (meta.width > MAX_SIZE || meta.height > MAX_SIZE);
  let pipeline = sharp(filePath);

  if (needsResize) {
    pipeline = pipeline.resize({
      width: MAX_SIZE,
      height: MAX_SIZE,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  // PNG with transparency → lossless WebP, others → lossy WebP
  const isPng = ext === '.png';
  const outPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  if (isPng) {
    await pipeline.webp({ lossless: true }).toFile(outPath);
  } else {
    await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outPath);
  }

  const after = (await stat(outPath)).size;
  const rel = relative(SRC_DIR, filePath);
  const pct = ((1 - after / before) * 100).toFixed(1);
  console.log(`${rel}: ${fmt(before)} → ${fmt(after)} (${pct}% reduced)`);

  return { before, after };
}

function fmt(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

async function main() {
  const files = await getFiles(SRC_DIR);
  const results = [];

  for (const file of files) {
    const result = await optimizeImage(file);
    if (result) results.push(result);
  }

  const totalBefore = results.reduce((s, r) => s + r.before, 0);
  const totalAfter = results.reduce((s, r) => s + r.after, 0);
  const pct = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
  console.log(`\n=== Total: ${fmt(totalBefore)} → ${fmt(totalAfter)} (${pct}% reduced) ===`);
  console.log(`${results.length} files processed`);
}

main().catch(console.error);
