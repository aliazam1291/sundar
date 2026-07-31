/**
 * Small colour utilities so per-product accents stay legible.
 *
 * The range hues are chosen to look good as *fills*. Several of them
 * (saffron, turmeric) are far too light to use as text on cream, so we derive
 * an accessible variant instead of hard-coding one per product.
 */

const LIGHTEST_SURFACE = [235, 220, 189]; // --color-sand, the darkest "light" bg we set text on
const INK = [20, 16, 12];
const PAPER = [253, 246, 232];

export function hexToRgb(hex) {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

export const rgbToHex = (rgb) =>
  "#" + rgb.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("");

/** Blend two hexes. `t` of 0 is all `a`, 1 is all `b`. */
export function mix(a, b, t) {
  const from = hexToRgb(a);
  const to = hexToRgb(b);
  const k = Math.min(1, Math.max(0, t));
  return rgbToHex(from.map((v, i) => v + (to[i] - v) * k));
}

const channel = (v) => {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};

export const luminance = (rgb) =>
  0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);

export function contrast(a, b) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

/** Ink or paper — whichever is more readable on the given fill. */
export function readableOn(hex) {
  const bg = hexToRgb(hex);
  return contrast(INK, bg) >= contrast(PAPER, bg) ? "var(--color-ink)" : "var(--color-paper)";
}

/**
 * Walk a hue darker along its own ramp until it meets `target` contrast
 * against our lightest surface. Preserves hue, only drops value.
 */
export function inkVariant(hex, target = 4.5) {
  const base = hexToRgb(hex);
  for (let k = 100; k >= 0; k -= 1) {
    const c = base.map((v) => (v * k) / 100);
    if (contrast(c, LIGHTEST_SURFACE) >= target) return rgbToHex(c);
  }
  return "#000000";
}

/**
 * Darken a fill just enough that paper-coloured text sits legibly on it.
 * Used for the product hero, where the design wants light type over the
 * product's own colour — several hues are far too bright as-is.
 */
export function fillFor(hex, target = 4.5) {
  const base = hexToRgb(hex);
  for (let k = 100; k >= 0; k -= 1) {
    const c = base.map((v) => (v * k) / 100);
    if (contrast(PAPER, c) >= target) return rgbToHex(c);
  }
  return "#000000";
}
