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
 * So the hard cut is deliberately tight, and the soft contact shadow — whose
 * tones overlap the pack's own white and so cannot be told apart by colour —
 * is taken by a separate per-column pass below.
 */
const TOLERANCE = 5; // preserve white packaging panels while clearing edge-connected studio white
const SHADOW_MIN = 165; // darkest grey still treated as studio floor, not printed ink
const NEUTRAL = 9; // max channel spread for "grey, not printed colour"

/**
 * How much a column may brighten before the shadow walk calls it the pack.
 *
 * The depth cap alone was not a guard. Several pouches seal along the bottom
 * with a pale strip, and a column standing on one never meets a printed edge
 * to stop against, so the walk ran the full cap straight into the packaging
 * and sliced the seal off jeera, ajwain and the hing stand-up pouch.
 *
 * Tone cannot separate them — the floor fades through 170-250 and that seal
 * sits in the same range. Direction can: a cast shadow darkens toward the
 * object and is densest at contact, so a rise means the walk has climbed out
 * of the shadow and onto the pack. Small enough to catch the seal, wide
 * enough to ride out sensor noise in a smooth gradient.
 */
const SHADOW_RISE = 10;

/**
 * How far up each column the shadow pass may clear, as a fraction of height.
 *
 * Setting this to 0 (the previous value) did not mean "no shadow" — it meant
 * the shadow was never removed. The hard cut only clears 250 and above, so the
 * contact shadow's 170-250 gradient failed that test, was not background, and
 * survived as an opaque grey saucer spilling out under every pack, wider than
 * the pack itself. With `.pack__photo` adding its own drop-shadow on top, each
 * one sat on two, and the saucer also padded the crop by ~66px of nothing.
 *
 * Removing it cannot be done on colour alone: the floor fades through 170-250
 * and the carton's own white panel sits at 240-247, so the ranges overlap. Two
 * attempts flooding *connected* from the background both walked in along the
 * left edge — where the white panel meets the background with no printed
 * border to fence it — and shaved the panel off, costing chaat masala 18% of
 * its area. Confining that flood to the bottom fifth only shortened the notch.
 *
 * So the pass is per-column instead, walking up from the base: with no
 * sideways step it cannot reach a vertical edge at all, whatever the tone.
 * The cap bounds a column whose base is the pack's own white and so never
 * hits a printed edge to stop against. 4.5% clears the saucer several times
 * over while staying well inside the shortest pack's artwork.
 */
const SHADOW_REACH_RATIO = 0.045;

/**
 * Radius for closing the bites the flood chews out of the pack's own edge.
 *
 * A pack edge is not matte. Pouch film creases and the jar's shoulder throw
 * specular highlights that reach 250+, which is the studio white's own range,
 * so the flood walks into them and takes an irregular bite. The result is an
 * outline that dissolves into speckle — measured as alpha crossings per
 * scanline, a clean pack is 2.0 and the worst of these ran 3.45.
 *
 * De-fringing does not help: that repairs the *colour* of the boundary, and
 * this is damage to its *shape*. A morphological close (grow the pack, then
 * shrink it back) fills any bite narrower than twice this radius and returns
 * the silhouette to where it started. 2px clears the speckle while being far
 * too small to bridge the gap between the two objects in the red chilli shot
 * or to refill the contact shadow, which is an order of magnitude thicker.
 *
 * It runs before the de-fringe, so pixels this restores are still repainted
 * from the interior rather than kept at their washed-out highlight value.
 */
const CLOSE_RADIUS = 2;

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

  /* Second pass: lift the contact shadow off the base, one column at a time.
     Walk up from the first kept pixel in each column, clearing neutral grey
     until the printed edge stops it or the reach cap runs out. */
  const reach = Math.max(2, Math.round(h * SHADOW_REACH_RATIO));

  for (let x = 0; x < w; x += 1) {
    let y = h - 1;
    while (y >= 0 && outside[y * w + x]) y -= 1; // skip the cleared background

    /* A contact shadow only ever gets darker as it approaches the pack it is
       cast by — it is densest where the two meet. So climb while the column
       keeps darkening, and stop the moment it brightens again, because that
       upturn is the pack's own base catching the light. */
    let floor = 255;
    for (let n = 0; n < reach && y >= 0; n += 1, y -= 1) {
      const i = y * w + x;
      if (outside[i]) break;
      const o = i * 4;
      const r = data[o];
      const g = data[o + 1];
      const b = data[o + 2];
      if (!isShadow(r, g, b)) break;
      const lum = Math.min(r, g, b);
      if (lum > floor + SHADOW_RISE) break;
      if (lum < floor) floor = lum;
      outside[i] = 1;
    }
  }

  /* Close the bites chewed out of the pack edge (see CLOSE_RADIUS).
     Erode the background, then dilate it back: an intrusion narrower than
     2*r vanishes, while the outline as a whole returns to where it was.
     Anything off-frame counts as background, so the border stays clear. */
  if (CLOSE_RADIUS > 0) {
    const r = CLOSE_RADIUS;
    const shrunk = new Uint8Array(w * h);
    const grown = new Uint8Array(w * h);

    for (let y = 0; y < h; y += 1) {
      for (let x = 0; x < w; x += 1) {
        let all = 1;
        for (let dy = -r; dy <= r && all; dy += 1) {
          for (let dx = -r; dx <= r; dx += 1) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
            if (!outside[ny * w + nx]) {
              all = 0;
              break;
            }
          }
        }
        shrunk[y * w + x] = all;
      }
    }

    for (let y = 0; y < h; y += 1) {
      for (let x = 0; x < w; x += 1) {
        let any = 0;
        for (let dy = -r; dy <= r && !any; dy += 1) {
          for (let dx = -r; dx <= r; dx += 1) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
            if (shrunk[ny * w + nx]) {
              any = 1;
              break;
            }
          }
        }
        grown[y * w + x] = any;
      }
    }

    outside.set(grown);
  }

  /* De-fringe: repaint the boundary with the pack's own colour.
     ---------------------------------------------------------------
     The studio white does not stop dead at the pack. JPEG ringing smears it a
     couple of pixels inward, so the outline of every cutout carried a pale rim
     that the flood had no reason to clear — it is not background, it is the
     codec's blend of background and pack. Invisible on the cream page, obvious
     the moment a pack sits on a dark ground: the garam masala jar's red cap
     was ringed with white. It was not one bad pack either, it was the whole
     catalogue — 61% of edge pixels on average, 82% at worst.

     Fading those pixels (the previous fix) only made the halo translucent; the
     rim was still lighter than the pack. The rim has to take the colour of
     whatever it borders instead, so each fringe pixel is repainted from the
     nearest pixel far enough inside to be uncontaminated.

     This is safe on a white panel — the nearest interior pixel there is also
     white, so those edges are repainted with themselves and nothing moves. */
  const FRINGE = 2;
  const dist = new Int16Array(w * h).fill(-1);
  const from = new Int32Array(w * h).fill(-1);
  const walk = new Int32Array(w * h);
  const near = (i) => {
    const x = i % w;
    const y = (i / w) | 0;
    return [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1];
  };

  /* How deep each kept pixel sits under the cut edge, to FRINGE and no more. */
  let dHead = 0;
  let dTail = 0;
  for (let i = 0; i < w * h; i += 1) {
    if (outside[i]) walk[dTail++] = i;
  }
  while (dHead < dTail) {
    const i = walk[dHead++];
    const d = outside[i] ? 0 : dist[i];
    if (d >= FRINGE) continue;
    for (const j of near(i)) {
      if (j < 0 || outside[j] || dist[j] >= 0) continue;
      dist[j] = d + 1;
      walk[dTail++] = j;
    }
  }

  /* Carry interior colour outward into that band. */
  let cHead = 0;
  let cTail = 0;
  for (let i = 0; i < w * h; i += 1) {
    if (outside[i] || dist[i] >= 0) continue; // interior: deeper than FRINGE
    for (const j of near(i)) {
      if (j < 0 || outside[j] || dist[j] < 0 || from[j] >= 0) continue;
      from[j] = i;
      walk[cTail++] = j;
    }
  }
  while (cHead < cTail) {
    const i = walk[cHead++];
    for (const j of near(i)) {
      if (j < 0 || outside[j] || dist[j] < 0 || from[j] >= 0) continue;
      from[j] = from[i];
      walk[cTail++] = j;
    }
  }
  for (let i = 0; i < w * h; i += 1) {
    if (outside[i] || dist[i] < 0 || from[i] < 0) continue;
    const o = i * 4;
    const s = from[i] * 4;
    data[o] = data[s];
    data[o + 1] = data[s + 1];
    data[o + 2] = data[s + 2];
  }

  /* Clear the background and measure the pack. */
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
