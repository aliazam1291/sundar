/**
 * Drawing maths shared by the illustrated scenes.
 *
 * Both the kitchen and the tasting bench need a flame and a rising curl of
 * steam, and they have to be the same flame and the same steam — the two
 * drawings are the same man in the same shop.
 */

/** A flame tongue: fat at the base, drawn to a point. */
export function tongue(cx, baseY, w, h) {
  return `M${cx - w} ${baseY}
          C${cx - w} ${baseY - h * 0.5} ${cx - w * 0.85} ${baseY - h * 0.78} ${cx} ${baseY - h}
          C${cx + w * 0.85} ${baseY - h * 0.78} ${cx + w} ${baseY - h * 0.5} ${cx + w} ${baseY} Z`;
}

/** A rising curl of steam, `h` tall from (x, y) upwards. */
export function curl(x, y, h) {
  const s = h / 3;
  return `M${x} ${y} c-11 -${s} 11 -${s * 1.15} 0 -${s * 2.1} c-11 -${s} 11 -${s * 1.15} 0 -${s * 2.1}`;
}

/** A little heaped mound of powder, `r` wide, sitting on (x, y). */
export function mound(x, y, r) {
  return `M${x - r} ${y} q${r} -${r * 0.82} ${r * 2} 0 Z`;
}

/**
 * Where a thumb sits relative to a palm. `dir` is -1 for a thumb on the left,
 * 1 for the right, so a hand reads as gripping the thing beside it rather
 * than resting on it. Drawn as its own shape behind the palm — a thumb as a
 * second subpath of one filled path fights the fill rule and disappears.
 */
export function thumbAt(x, y, r = 13, dir = -1) {
  return { cx: x + dir * r * 0.78, cy: y - r * 0.22, rx: r * 0.46, ry: r * 0.62, angle: dir * 34 };
}
