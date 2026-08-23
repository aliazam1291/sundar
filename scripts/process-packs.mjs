/**
 * Knock the studio background out of the originals in public/packs-src and
 * write high-resolution cutouts to public/packs.
 *
 * The trap: several packs have a WHITE panel as part of the artwork (the Dal
 * Masala carton is half white). Deleting every white pixel punches a hole
 * straight through the product. So this floods in from the border instead and
 * only clears white that is *connected to the edge* — the pack's own white
 * stays because it is fenced in by the printed border.
 *
 * The baked contact shadow goes with the background, which is what we want:
 * `.pack--photo .pack__photo` applies its own drop-shadow so the pouch can sit
 * on any colour.
 *
 *   node scripts/fetch-packs.mjs      # originals first
 *   node scripts/process-packs.mjs
 */

import { mkdir, readdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const SRC = "public/packs-src";
const OUT = "public/packs";

/**
 * The studio background is *exactly* 255,255,255. The carton's own white
 * panel measures 247 and its highlight 240. That 8-point gap is the whole
 * game: a generous tolerance floods straight through the pack's white face
 * and deletes it, which is what happened the first time round.
 *
 * So the hard cut is deliberately tight, and the soft contact shadow — which
 * is genuinely darker than the pack's white — is taken by a second pass that
 * is only allowed to creep a short distance in from the real background. That
 * distance limit is what stops it eating into a white panel that happens to
 * touch the frame edge.
 */
const TOLERANCE = 5; // preserve white packaging panels while clearing edge-connected studio white
const SHADOW_REACH = 0; // CSS supplies the shadow; never retain the studio floor
const SHADOW_MIN = 255; // disable source contact-shadow retention
const NEUTRAL = 9; // max channel spread for "grey, not printed colour"

const isBackground = (r, g, b) =>
  r >= 255 - TOLERANCE && g >= 255 - TOLERANCE && b >= 255 - TOLERANCE;

/** Grey rather than printed ink — a contact shadow, not artwork. */
const isShadow = (r, g, b) =>
  Math.max(r, g, b) - Math.min(r, g, b) <= NEUTRAL && Math.min(r, g, b) >= SHADOW_MIN;

async function cut(file) {
  const src = `${SRC}/${file}`;
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h } = info;
  const px = (x, y) => (y * w + x) * 4;

  /* Flood from every border pixel, four-connected. A typed queue rather than
     recursion — these are 1200x1200 and recursion blows the stack. */
  const outside = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let head = 0;
  let tail = 0;

  const push = (x, y) => {
    const i = y * w + x;
    if (outside[i]) return;
    const o = px(x, y);
    if (!isBackground(data[o], data[o + 1], data[o + 2])) return;
    outside[i] = 1;
    queue[tail++] = i;
  };

  for (let x = 0; x < w; x += 1) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y += 1) {
    push(0, y);
    push(w - 1, y);
  }

  while (head < tail) {
    const i = queue[head++];
    const x = i % w;
    const y = (i / w) | 0;
    if (x > 0) push(x - 1, y);
    if (x < w - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < h - 1) push(x, y + 1);
  }

  /* Second pass: creep into the contact shadow. Seeded from the true
     background and hard-capped at SHADOW_REACH pixels, so a white panel that
     runs to the edge of frame cannot be eaten from the outside in. */
  const depth = new Uint8Array(w * h);
  const soft = new Int32Array(w * h);
  let sHead = 0;
  let sTail = 0;

  for (let i = 0; i < w * h; i += 1) {
    if (!outside[i]) continue;
    const x = i % w;
    const y = (i / w) | 0;
    const near = [
      x > 0 ? i - 1 : -1,
      x < w - 1 ? i + 1 : -1,
      y > 0 ? i - w : -1,
      y < h - 1 ? i + w : -1,
    ];
    for (const j of near) {
      if (j < 0 || outside[j] || depth[j]) continue;
      const o = j * 4;
      if (!isShadow(data[o], data[o + 1], data[o + 2])) continue;
      depth[j] = 1;
      soft[sTail++] = j;
    }
  }

  while (sHead < sTail) {
    const i = soft[sHead++];
    const d = depth[i];
    if (d >= SHADOW_REACH) continue;
    const x = i % w;
    const y = (i / w) | 0;
    const near = [
      x > 0 ? i - 1 : -1,
      x < w - 1 ? i + 1 : -1,
      y > 0 ? i - w : -1,
      y < h - 1 ? i + w : -1,
    ];
    for (const j of near) {
      if (j < 0 || outside[j] || depth[j]) continue;
      const o = j * 4;
      if (!isShadow(data[o], data[o + 1], data[o + 2])) continue;
      depth[j] = d + 1;
      soft[sTail++] = j;
    }
  }

  /* Shadow pixels fade out rather than cut, so the pack keeps a soft foot. */
  for (let i = 0; i < w * h; i += 1) {
    if (!depth[i] || outside[i]) continue;
    const o = i * 4;
    const lum = Math.min(data[o], data[o + 1], data[o + 2]);
    /* 255 -> gone, SHADOW_MIN -> mostly kept */
    const a = Math.round(255 * Math.min(1, Math.max(0, (255 - lum) / (255 - SHADOW_MIN))));
    if (a < 40) outside[i] = 1;
    else data[o + 3] = Math.min(data[o + 3], a);
  }

  /* Clear the background, and feather anything on the boundary. */
  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const i = y * w + x;
      const o = px(x, y);

      if (outside[i]) {
        data[o + 3] = 0;
        continue;
      }

      /* A kept pixel touching a cleared one is usually JPEG ringing — a
         near-white halo the codec smeared around the product. Soften only
         those. Anything with real tone in it stays fully opaque, or the
         pack's own white edge goes translucent again. */
      const edge =
        (x > 0 && outside[i - 1]) ||
        (x < w - 1 && outside[i + 1]) ||
        (y > 0 && outside[i - w]) ||
        (y < h - 1 && outside[i + w]);
      if (edge && Math.min(data[o], data[o + 1], data[o + 2]) >= 248) {
        data[o + 3] = 96;
      }

      if (data[o + 3] > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0) throw new Error("everything was background");

  /* Trim to the pack with a hair of margin so the drop-shadow has room. */
  const pad = 6;
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const right = Math.min(w - 1, maxX + pad);
  const bottom = Math.min(h - 1, maxY + pad);

  const out = `${OUT}/${file.replace(/\.(jpe?g|png|webp)$/i, "")}.png`;
  const info2 = await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left, top, width: right - left + 1, height: bottom - top + 1 })
    .png({ compressionLevel: 9, palette: false })
    .toFile(out);

  return { out, w: info2.width, h: info2.height, kb: Math.round(info2.size / 1024) };
}

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

let done = 0;
for (const f of files) {
  try {
    const r = await cut(f);
    done += 1;
    console.log(`  ${String(r.w).padStart(4)}x${String(r.h).padEnd(4)} ${String(r.kb).padStart(4)}KB  ${r.out}`);
  } catch (e) {
    console.log(`  FAILED ${f}: ${e.message}`);
  }
}
console.log(`\n${done}/${files.length} cut out`);
