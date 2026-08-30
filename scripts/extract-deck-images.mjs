/**
 * Pull the embedded bitmaps out of the brand decks so we can see whether they
 * hold pack artwork at a higher resolution than the Shopify originals.
 *
 * The store's product photography tops out at 1201x1201 (13 SKUs only exist at
 * 800x800), and cropping to the pack leaves 505-675px for a slot that renders
 * over 1500 device pixels. No amount of sharpening invents that detail, so the
 * only real fix is a better source. The decks report images up to 3540x2534,
 * which would be ample — if any of them are actually packs and not mood shots.
 *
 * Output lands in shots/ because that is gitignored: the decks are
 * client-confidential and their contents must not end up committed.
 *
 *   node scripts/extract-deck-images.mjs
 */

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { inflateSync } from "node:zlib";
import sharp from "sharp";

const OUT = "shots/deck-images";
const MIN_PIXELS = 700 * 700; // ignore icons, rules and logo chips

await mkdir(OUT, { recursive: true });

const num = (dict, key) => {
  const m = new RegExp(`/${key}\\s+(\\d+)`).exec(dict);
  return m ? Number(m[1]) : null;
};

let kept = 0;

for (const file of (await readdir(".")).filter((f) => f.toLowerCase().endsWith(".pdf"))) {
  const buf = await readFile(file);
  const s = buf.toString("latin1");
  const tag = file.replace(/[^a-z0-9]+/gi, "-").slice(0, 28).toLowerCase();

  let idx = 0;
  let n = 0;

  while ((idx = s.indexOf("/Subtype", idx)) !== -1) {
    const head = idx;
    idx += 8;
    if (!/^\s*\/Image/.test(s.slice(head + 8, head + 20))) continue;

    /* The dict runs from the enclosing "obj" to the "stream" that follows. */
    const objStart = s.lastIndexOf(" obj", head);
    const streamAt = s.indexOf("stream", head);
    if (objStart < 0 || streamAt < 0) continue;
    const dict = s.slice(objStart, streamAt);

    const w = num(dict, "Width");
    const h = num(dict, "Height");
    if (!w || !h || w * h < MIN_PIXELS) continue;

    /* Byte offsets: skip the EOL that must follow the "stream" keyword. */
    let start = streamAt + 6;
    if (s[start] === "\r") start += 1;
    if (s[start] === "\n") start += 1;
    const end = s.indexOf("endstream", start);
    if (end < 0) continue;
    const raw = buf.subarray(start, end);

    const jpeg = /\/DCTDecode/.test(dict);
    const flate = /\/FlateDecode/.test(dict);
    const gray = /\/DeviceGray/.test(dict);
    const cmyk = /\/DeviceCMYK/.test(dict);
    const name = `${OUT}/${tag}-${String(n).padStart(3, "0")}-${w}x${h}`;
    n += 1;

    try {
      if (jpeg) {
        await writeFile(`${name}.jpg`, raw);
        kept += 1;
      } else if (flate) {
        const px = inflateSync(raw);
        const channels = cmyk ? 4 : gray ? 1 : 3;
        /* Anything that does not match w*h*channels is a mask or a predictor
           layout we are not going to guess at — skip rather than write mush. */
        if (px.length < w * h * channels) continue;
        if (cmyk) continue; // sharp cannot take raw CMYK
        await sharp(px.subarray(0, w * h * channels), { raw: { width: w, height: h, channels } })
          .png()
          .toFile(`${name}.png`);
        kept += 1;
      }
    } catch {
      /* Encrypted, predictor-encoded or otherwise not worth chasing. */
    }
  }
}

console.log(`${kept} images >= ${Math.round(MIN_PIXELS / 1000)}k px written to ${OUT}`);
