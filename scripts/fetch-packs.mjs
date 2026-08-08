/**
 * Pull the original product photography from the live Shopify store.
 *
 * The pack shots in public/packs were 400x491 — soft on any retina screen, and
 * the hero shows one at ~310 CSS px which wants 930 device pixels. Shopify
 * keeps the untouched upload behind the same CDN path with no size suffix, so
 * the originals (mostly 1201x1201) are one request away.
 *
 * The catch that bit once already: most SKUs carry several images, and the
 * biggest is usually NOT the one we want — it is the flat back-of-pack recipe
 * artwork, which is square, saturated to the frame edge, and useless as a
 * product shot. The one we want is the 3/4 carton photographed on white.
 *
 * So this downloads every candidate and scores it: a real pack shot has a
 * near-white border, flat artwork does not. Highest white-border fraction
 * wins, resolution breaks ties. Anything that scores too low is left for the
 * caller to fall back on the existing asset rather than regress it.
 *
 *   node scripts/fetch-packs.mjs
 */

import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const OUT = "public/packs-src";
const STORE = "https://sundermasala.com";
const UA = { "user-agent": "Mozilla/5.0 (sunder-rebrand asset sync)" };

/* A pack shot needs at least this much clean border to be cut out. */
const MIN_BORDER_WHITE = 0.55;

await mkdir(OUT, { recursive: true });

/** Fraction of the outer frame that is near-white. */
async function borderWhiteness(buf) {
  const { data, info } = await sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  let white = 0;
  let total = 0;

  const test = (x, y) => {
    const o = (y * w + x) * c;
    total += 1;
    if (data[o] > 232 && data[o + 1] > 232 && data[o + 2] > 232) white += 1;
  };

  const band = Math.max(2, Math.round(Math.min(w, h) * 0.02));
  for (let x = 0; x < w; x += 2) {
    for (let d = 0; d < band; d += 1) {
      test(x, d);
      test(x, h - 1 - d);
    }
  }
  for (let y = 0; y < h; y += 2) {
    for (let d = 0; d < band; d += 1) {
      test(d, y);
      test(w - 1 - d, y);
    }
  }
  return white / total;
}

const res = await fetch(`${STORE}/products.json?limit=250`, { headers: UA });
if (!res.ok) throw new Error(`products.json: ${res.status}`);
const { products } = await res.json();
console.log(`${products.length} products listed\n`);

const chosen = [];
const rejected = [];

for (const p of products) {
  const candidates = [];

  for (const img of p.images ?? []) {
    const url = img.src.split("?")[0];
    const r = await fetch(url, { headers: UA });
    if (!r.ok) continue;
    const buf = Buffer.from(await r.arrayBuffer());
    candidates.push({ buf, w: img.width, h: img.height, url, white: await borderWhiteness(buf) });
  }

  if (!candidates.length) {
    rejected.push({ handle: p.handle, why: "no images" });
    continue;
  }

  /* Cut-outable first, then by resolution. */
  const usable = candidates
    .filter((c) => c.white >= MIN_BORDER_WHITE)
    .sort((a, b) => b.w * b.h - a.w * a.h);

  const detail = candidates
    .map((c) => `${c.w}x${c.h}:${Math.round(c.white * 100)}%`)
    .join(" ");

  if (!usable.length) {
    rejected.push({ handle: p.handle, why: `no shot on white (${detail})` });
    console.log(`  SKIP  ${p.handle}  [${detail}]`);
    continue;
  }

  const pick = usable[0];
  const ext = (pick.url.match(/\.(jpe?g|png|webp)$/i)?.[1] ?? "jpg").toLowerCase();
  await writeFile(`${OUT}/${p.handle}.${ext}`, pick.buf);
  chosen.push(p.handle);
  console.log(
    `  ${String(pick.w).padStart(4)}x${String(pick.h).padEnd(4)} border ${String(Math.round(pick.white * 100)).padStart(3)}%  ${p.handle}.${ext}   [${detail}]`
  );
}

console.log(`\n${chosen.length} usable originals in ${OUT}`);
if (rejected.length) {
  console.log(`${rejected.length} left to the existing asset:`);
  rejected.forEach((r) => console.log(`  ${r.handle} — ${r.why}`));
}
