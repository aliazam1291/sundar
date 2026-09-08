/**
 * Build public/packs/sunder-garam-masala.webp from the client's newer pouch
 * shot ("Shahi Garam Masala Pouch.png", added to public/ directly on
 * 2026-09-07 — not into the SUNDAR PACKET BG REMOVE drop, so it is not in
 * packs-from-cutouts.mjs's MAP).
 *
 * That earlier drop had its own "Sunder-Garam Masala (Pouch)-2-Photoroom.png"
 * mapped to this same slug. This pouch replaces it — same product, gold/dark
 * green "Shahi Garam Masala" 500g artwork instead of the yellow/white "Mix
 * Garam Masala" one — so the old mapping entry was removed rather than left
 * to silently re-overwrite this on the next `packs:cutouts` run.
 *
 * Unlike Shahi Hing's source, this one already has a clean alpha channel —
 * no poster background to key out, just trim, downscale and re-encode, the
 * same as every entry in packs-from-cutouts.mjs.
 *
 *   node scripts/cut-garam-masala.mjs
 */

import { access, copyFile, mkdir } from "node:fs/promises";
import sharp from "sharp";

const SRC = "public/Shahi Garam Masala Pouch.png";
const OUT = "public/packs/sunder-garam-masala.webp";
const BACKUP = "packs-src/sunder-garam-masala-source.png";

const MAX_EDGE = 1000;
const QUALITY = 90;
const TRIM_THRESHOLD = 12;
const SHARPEN = { sigma: 0.7, m1: 0.4, m2: 0.9 };

await mkdir("packs-src", { recursive: true });
try {
  await access(BACKUP);
} catch {
  await copyFile(SRC, BACKUP);
}

const info = await sharp(SRC)
  .trim({ threshold: TRIM_THRESHOLD })
  .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
  .sharpen(SHARPEN)
  .webp({ quality: QUALITY, alphaQuality: 100, effort: 6 })
  .toFile(OUT);

console.log(`${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB  ${OUT}`);
