/**
 * Contact sheet + island report for the pack cutouts.
 *
 * Two things go wrong with an automatic knockout, and neither shows up
 * against a white page: leftover studio props (the reflective stand these
 * packs are photographed on is light grey, not white, so a flood fill stops
 * at it), and stray islands of kept pixels floating away from the product.
 *
 * Compositing onto magenta makes both obvious at a glance, and the island
 * count says which files to look at first.
 *
 *   node scripts/qa-packs.mjs
 */

import { mkdir, readdir } from "node:fs/promises";
import sharp from "sharp";

const DIR = "public/packs";
const OUT = "shots/packs-qa";
const CELL = 260;
const COLS = 8;

await mkdir(OUT, { recursive: true });

const files = (await readdir(DIR)).filter((f) => /\.(webp|png)$/i.test(f)).sort();
const cells = [];
const report = [];

for (const file of files) {
  const { data, info } = await sharp(`${DIR}/${file}`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;

  /* Label every connected run of opaque pixels; the product should be one
     big island and nothing else worth speaking of. */
  const seen = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  const islands = [];

  for (let start = 0; start < w * h; start += 1) {
    if (seen[start] || data[start * 4 + 3] < 24) continue;
    let head = 0;
    let tail = 0;
    seen[start] = 1;
    queue[tail++] = start;
    let size = 0;
    let minX = w;
    let minY = h;
    let maxX = 0;
    let maxY = 0;

    while (head < tail) {
      const i = queue[head++];
      const x = i % w;
      const y = (i / w) | 0;
      size += 1;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;

      const step = (nx, ny) => {
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) return;
        const j = ny * w + nx;
        if (seen[j] || data[j * 4 + 3] < 24) return;
        seen[j] = 1;
        queue[tail++] = j;
      };
      step(x - 1, y);
      step(x + 1, y);
      step(x, y - 1);
      step(x, y + 1);
    }
    islands.push({ size, box: [minX, minY, maxX, maxY] });
  }

  islands.sort((a, b) => b.size - a.size);
  const main = islands[0]?.size ?? 0;
  const strays = islands.filter((i) => i.size > 40 && i.size < main * 0.35);

  report.push({ file, w, h, islands: islands.length, strays: strays.length, biggestStray: strays[0]?.size ?? 0 });

  cells.push(
    await sharp(`${DIR}/${file}`)
      .resize(CELL - 16, CELL - 16, { fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .extend({
        top: 8,
        bottom: 8,
        left: 8,
        right: 8,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer()
  );
}

/* Lay them out on magenta. */
const rows = Math.ceil(cells.length / COLS);
const sheet = sharp({
  create: {
    width: COLS * CELL,
    height: rows * CELL,
    channels: 4,
    background: { r: 255, g: 0, b: 200, alpha: 1 },
  },
});

const composites = [];
for (let i = 0; i < cells.length; i += 1) {
  composites.push({
    input: cells[i],
    left: (i % COLS) * CELL,
    top: Math.floor(i / COLS) * CELL,
  });
}
await sheet.composite(composites).png().toFile(`${OUT}/sheet.png`);

report.sort((a, b) => b.biggestStray - a.biggestStray);
console.log("file".padEnd(52) + "size        islands  strays  biggest");
report.forEach((r) =>
  console.log(
    r.file.padEnd(52) +
      `${r.w}x${r.h}`.padEnd(12) +
      String(r.islands).padStart(6) +
      String(r.strays).padStart(8) +
      String(r.biggestStray).padStart(9)
  )
);
console.log(`\ncontact sheet: ${OUT}/sheet.png`);
