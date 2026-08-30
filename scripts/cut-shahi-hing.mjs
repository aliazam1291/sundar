/**
 * Cut the Shahi Hing jar out of its poster render.
 *
 * Every other pack in public/packs is a studio shot on white, so the flood
 * fill in process-packs.mjs handles it. Shahi Hing is the one exception: the
 * only artwork the brand has for it is a marketing render — a black jar
 * standing on a wooden floor against a fiery orange-and-dark-red backdrop.
 * There is no background colour to key out, so it shipped as an opaque
 * rectangle and read as a poster stuck onto the card while every neighbour
 * floated.
 *
 *   node scripts/cut-shahi-hing.mjs
 *
 * Saturation is what separates them, not brightness. The backdrop is fire and
 * varnished wood — every pixel of it is warm and strongly saturated. The jar
 * is a near-neutral black body with a cream-gold label, all of it under 0.6.
 * The lettering, the red SUNDER banner and the 50g starburst are saturated
 * too, but they sit *inside* the silhouette, so filling each row between its
 * outermost edges puts them back and takes the dark-red backdrop showing
 * through the mask's holes out at the same time.
 *
 * The row spans are then median-filtered down the image. The jar's outline
 * changes smoothly from row to row; the lens flare beside the starburst does
 * not, and reaches the mask as a spike a dozen rows tall. Trying to remove it
 * with an erode instead ate the starburst — it is saturated, so it only
 * survives via the row fill and an erosion bit a notch out of the jar's side.
 */

import { access, copyFile, mkdir } from "node:fs/promises";
import sharp from "sharp";

const LIVE = "public/packs/sunder-shahi-hing.webp";
/** The render is the input, so keep a copy: the script overwrites its source. */
const BACKUP = "packs-src/sunder-shahi-hing-render.webp";

/** Above this saturation a warm pixel is backdrop, not jar or label. */
const SATURATION = 0.6;
/** Half-window, in rows, of the median that smooths the silhouette. */
const MEDIAN = 25;

await mkdir("packs-src", { recursive: true });
try {
  await access(BACKUP);
} catch {
  await copyFile(LIVE, BACKUP);
}

const { data, info } = await sharp(BACKUP).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

const unsaturated = new Uint8Array(W * H);
for (let i = 0; i < W * H; i++) {
  const r = data[i * C], g = data[i * C + 1], b = data[i * C + 2];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  unsaturated[i] = (max === 0 ? 0 : (max - min) / max) < SATURATION ? 1 : 0;
}

/* Largest connected run of those pixels — the jar body and lid. */
const label = new Int32Array(W * H).fill(-1);
const stack = new Int32Array(W * H);
let biggest = -1, biggestSize = 0, next = 0;
for (let seed = 0; seed < W * H; seed++) {
  if (!unsaturated[seed] || label[seed] !== -1) continue;
  let top = 0, size = 0;
  stack[top++] = seed;
  label[seed] = next;
  while (top) {
    const p = stack[--top];
    size++;
    const x = p % W, y = (p / W) | 0;
    if (x > 0 && unsaturated[p - 1] && label[p - 1] === -1) { label[p - 1] = next; stack[top++] = p - 1; }
    if (x < W - 1 && unsaturated[p + 1] && label[p + 1] === -1) { label[p + 1] = next; stack[top++] = p + 1; }
    if (y > 0 && unsaturated[p - W] && label[p - W] === -1) { label[p - W] = next; stack[top++] = p - W; }
    if (y < H - 1 && unsaturated[p + W] && label[p + W] === -1) { label[p + W] = next; stack[top++] = p + W; }
  }
  if (size > biggestSize) { biggestSize = size; biggest = next; }
  next++;
}

const left = new Array(H).fill(null);
const right = new Array(H).fill(null);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (label[y * W + x] !== biggest) continue;
    if (left[y] === null) left[y] = x;
    right[y] = x;
  }
}

const smooth = (edges) =>
  edges.map((edge, y) => {
    if (edge === null) return null;
    const window = [];
    for (let d = -MEDIAN; d <= MEDIAN; d++) {
      const near = edges[y + d];
      if (near != null) window.push(near);
    }
    window.sort((a, b) => a - b);
    return window[window.length >> 1];
  });

const l = smooth(left);
const r = smooth(right);

const out = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = y * W + x;
    out[i * 4] = data[i * C];
    out[i * 4 + 1] = data[i * C + 1];
    out[i * 4 + 2] = data[i * C + 2];
    out[i * 4 + 3] = l[y] != null && x >= l[y] && x <= r[y] ? 255 : 0;
  }
}

const written = await sharp(out, { raw: { width: W, height: H, channels: 4 } })
  .trim({ threshold: 12 })
  .webp({ quality: 90, alphaQuality: 100, effort: 6 })
  .toFile(LIVE);

console.log(`${written.width}x${written.height}  ${Math.round(written.size / 1024)}KB  ${LIVE}`);
