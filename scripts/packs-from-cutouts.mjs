/**
 * Build public/packs/*.webp from the pre-cut studio PNGs in
 * `public/SUNDAR PACKET BG REMOVE` (Photoroom knockouts supplied by the
 * client). These already carry a clean alpha channel, so none of the
 * knockout machinery in process-packs.mjs applies — this only trims,
 * downscales and re-encodes.
 *
 *   node scripts/packs-from-cutouts.mjs
 *
 * The mapping below is by hand and stays that way: the filenames do not
 * match the catalogue slugs, and two of them do not match their own
 * contents either. Verified by eye, 2026-08-30:
 *
 *   - "Sunder_Red Chilli Powder-01 " (note the trailing space) is a
 *     TURMERIC pouch, not red chilli. It is the only haldi shot there is.
 *   - "Sunder-Hing_Kuti Teja-Mirch Powder-500g-01" is a plain HING pouch;
 *     the kuti teja half of the name is wrong.
 *
 * Sources with no SKU (Patna Mirch, the garam masala box and jar) are left
 * out. SKUs with no source here — the eight whole spices and shahi-hing —
 * keep the cutouts already in public/packs.
 */

import { readdir } from "node:fs/promises";
import sharp from "sharp";

const SRC = "public/SUNDAR PACKET BG REMOVE";
const OUT = "public/packs";
const MAX_EDGE = 1000;
const QUALITY = 90;

/* Matches optimise-packs: puts back edge definition lost to downscaling. */
const SHARPEN = { sigma: 0.7, m1: 0.4, m2: 0.9 };

/** Alpha below this is background fringe, not pack. */
const TRIM_THRESHOLD = 12;

/** source basename (without "-Photoroom.png") -> catalogue filename */
const MAP = {
  "Sunder-Achar Masala (Pouch)-1": "sunder-achar-masala",
  "Sunder-Chaat Masala-1": "sunder-chaat-masala",
  "Sunder-Chhole Masala-1": "sunder-chole-masala-chana-masala",
  "Sunder-Dal Masala-1": "sunder-dal-masala",
  "Sunder-Garam Masala (Pouch)-2": "sunder-garam-masala",
  "Sunder-Hing_Kuti Teja-Mirch Powder-500g-01": "asafoetida-hing",
  "Sunder-Jaljira-1": "sunder-jaljira",
  "Sunder-Jeeravan (poha masala) -1": "sunder-jeeravan-poha-masala",
  "Sunder-Kitchen King Masala-1": "sunder-kitchen-king-masala",
  "Sunder-Pav Bhaji Masala-1": "sunder-pav-bhaji-masala",
  "Sunder-Raita Masala-1": "sunder-raita-masala",
  "Sunder-Sambhar Masala-1": "sunder-sambar-masala",
  "Sunder-Shahi Paneer Masala-1": "sunder-shahi-paneer-masala",
  "Sunder_Amchur Powder-01": "sunder-amchur-powder",
  "Sunder_Black Pepper Powder-01": "sunder-black-pepper-powder-kali-mirch-powder",
  "Sunder_Coriander Powder-01": "sunder-coriander-powder-dhaniya-powder",
  "Sunder_Dry Ginger Powder-01": "sunder-dry-ginger-powder-sunth-powder",
  "Sunder_Kashmiri Mirchi-01": "sunder-kashmiri-mirchi-powder",
  "Sunder_Kasuri Methi-01": "sunder-kasuri-methi",
  "Sunder_Kuti Teja-Mirch Powder-500g-01": "sunder-kuti-teja-mirch-powder",
  "Sunder_Red Chilli Powder-01": "sunder-red-chilli-powder-lal-mirch-powder",
  "Sunder_Red Chilli Powder-01 ": "sunder-turmeric-powder-haldi-powder",
  "Sunder_White Pepper Powder-01": "sunder-white-pepper-powder-safed-mirch-powder",
};

const present = new Set(
  (await readdir(SRC)).filter((f) => f.endsWith("-Photoroom.png")).map((f) => f.slice(0, -"-Photoroom.png".length)),
);

for (const key of Object.keys(MAP)) {
  if (!present.has(key)) throw new Error(`mapped source missing: ${key}`);
}
const skipped = [...present].filter((k) => !(k in MAP));

let bytes = 0;
for (const [key, name] of Object.entries(MAP)) {
  const info = await sharp(`${SRC}/${key}-Photoroom.png`)
    .trim({ threshold: TRIM_THRESHOLD })
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .sharpen(SHARPEN)
    .webp({ quality: QUALITY, alphaQuality: 100, effort: 6 })
    .toFile(`${OUT}/${name}.webp`);

  bytes += info.size;
  console.log(`  ${String(info.width).padStart(4)}x${String(info.height).padEnd(4)} ${String(Math.round(info.size / 1024)).padStart(4)}KB  ${name}.webp`);
}

console.log(`\n${Object.keys(MAP).length} packs rebuilt, ${Math.round((bytes / 1024 / 1024) * 10) / 10}MB`);
if (skipped.length) console.log(`skipped (no SKU): ${skipped.join(", ")}`);
