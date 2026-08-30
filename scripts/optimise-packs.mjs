/**
 * Re-encode the pack cutouts as WebP and point the catalogue at them.
 *
 * PNG is the wrong container for a photograph. The cutouts come out of
 * process-packs at ~27MB across 32 files; the same pixels as WebP with alpha
 * are an order of magnitude smaller with no visible difference on a product
 * shot. next/image re-encodes for delivery either way, so this is about repo
 * weight and how long the optimiser takes on a cold request.
 *
 * Also caps the long edge: the largest a pack is ever displayed is ~310 CSS px
 * (the hero), so 1000px covers a 3x screen with room to spare.
 *
 *   node scripts/optimise-packs.mjs
 */

import { readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import sharp from "sharp";

const DIR = "public/packs";
const CATALOGUE = "src/lib/products.js";
const MAX_EDGE = 1000;
const QUALITY = 90;

/**
 * The originals are store JPEGs, so every cutout arrives already carrying
 * compression softness, and cropping to the pack throws away the white margin
 * that made it look sharp in the frame. A light unsharp puts back the edge
 * definition on the printed type without haloing the pack's outline.
 *
 * This does not invent detail — see the note in fetch-packs about the source
 * ceiling. It only stops the last encode from compounding the softness.
 */
const SHARPEN = { sigma: 0.7, m1: 0.4, m2: 0.9 };

const pngs = (await readdir(DIR)).filter((f) => f.endsWith(".png"));
if (!pngs.length) {
  console.log("no PNGs left to convert");
  process.exit(0);
}

let before = 0;
let after = 0;

for (const file of pngs) {
  const src = `${DIR}/${file}`;
  let source;
  try {
    source = await stat(src);
  } catch (error) {
    if (error.code === "ENOENT") continue;
    throw error;
  }
  before += source.size;

  const out = src.replace(/\.png$/, ".webp");
  await rm(out, { force: true });
  const info = await sharp(src)
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .sharpen(SHARPEN)
    .webp({ quality: QUALITY, alphaQuality: 100, effort: 6 })
    .toFile(out);

  after += info.size;
  await rm(src);
  console.log(`  ${String(info.width).padStart(4)}x${String(info.height).padEnd(4)} ${String(Math.round(info.size / 1024)).padStart(4)}KB  ${file.replace(/\.png$/, ".webp")}`);
}

/* Point the catalogue at the new files. */
const catalogue = await readFile(CATALOGUE, "utf8");
const updated = catalogue.replace(/(\/packs\/[a-z0-9-]+)\.png/g, "$1.webp");
const changed = (catalogue.match(/\/packs\/[a-z0-9-]+\.png/g) ?? []).length;
await writeFile(CATALOGUE, updated);

console.log(`\n${pngs.length} files  ${Math.round(before / 1024 / 1024)}MB -> ${Math.round((after / 1024 / 1024) * 10) / 10}MB`);
console.log(`${changed} catalogue references repointed to .webp`);
