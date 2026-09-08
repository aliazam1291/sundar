/**
 * Build three public/packs/*.webp from newer monocarton-box shots the client
 * added straight to public/ on 2026-09-08 — not into the SUNDAR PACKET BG
 * REMOVE drop, so they are not in packs-from-cutouts.mjs's MAP (see the note
 * there on why the old mappings for these three SKUs were removed instead of
 * left to silently re-overwrite this on the next `packs:cutouts` run).
 *
 * Same shape as cut-garam-masala.mjs: each source already has a clean alpha
 * channel, so this is trim + downscale + re-encode, no knockout needed.
 * Collected into one script rather than three because all three are the
 * exact same box-shot treatment — a bowl of the ground spice, its whole form
 * scattered in front, on white/olive — differing only in file and slug.
 *
 *   node scripts/cut-monocarton-drops.mjs
 */

import { access, copyFile, mkdir } from "node:fs/promises";
import sharp from "sharp";

const MAX_EDGE = 1000;
const QUALITY = 90;
const TRIM_THRESHOLD = 12;
const SHARPEN = { sigma: 0.7, m1: 0.4, m2: 0.9 };

/** public/<source>.png -> catalogue slug */
const DROPS = {
  "Black.png": "sunder-black-pepper-powder-kali-mirch-powder",
  "White.png": "sunder-white-pepper-powder-safed-mirch-powder",
  "Dry GInger Powder.png": "sunder-dry-ginger-powder-sunth-powder",
};

await mkdir("packs-src", { recursive: true });

for (const [file, slug] of Object.entries(DROPS)) {
  const src = `public/${file}`;
  const backup = `packs-src/${slug}-source.png`;
  try {
    await access(backup);
  } catch {
    await copyFile(src, backup);
  }

  const info = await sharp(src)
    .trim({ threshold: TRIM_THRESHOLD })
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .sharpen(SHARPEN)
    .webp({ quality: QUALITY, alphaQuality: 100, effort: 6 })
    .toFile(`public/packs/${slug}.webp`);

  console.log(`  ${String(info.width).padStart(4)}x${String(info.height).padEnd(4)} ${String(Math.round(info.size / 1024)).padStart(4)}KB  ${slug}.webp`);
}

console.log(`\n${Object.keys(DROPS).length} packs rebuilt`);
