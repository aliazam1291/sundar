/**
 * Scaling cooking quantities.
 *
 * Ingredients are written the way a cook writes them — "2 cups thick poha",
 * "8–10 curry leaves", "400g paneer, cubed" — so scaling a recipe means
 * parsing those strings rather than looking up a number.
 *
 * The rule that keeps this honest: **only a quantity at the very start of the
 * line is scaled.** "Bhature dough, rested 2 hours" contains a 2 that is a
 * resting time, and doubling a recipe must never turn it into 4 hours. Lines
 * with no leading quantity — "Sugar, to taste", "Oil, to fry", "Juice of half
 * a lemon" — pass through untouched, which is also what a cook would do.
 */

/* Vulgar fractions that turn up in recipes, and what they are worth. */
const GLYPH_VALUE = {
  "½": 0.5,
  "¼": 0.25,
  "¾": 0.75,
  "⅓": 1 / 3,
  "⅔": 2 / 3,
  "⅛": 0.125,
};

/* Rendered back the other way, longest-odds first so 0.5 never prints as 4/8. */
const VALUE_GLYPH = [
  [0.5, "½"],
  [1 / 3, "⅓"],
  [2 / 3, "⅔"],
  [0.25, "¼"],
  [0.75, "¾"],
  [0.125, "⅛"],
];

/** "1", "1.5", "3/4", "½" -> a number. Returns null if it is not a quantity. */
function parseNumber(token) {
  if (!token) return null;
  if (GLYPH_VALUE[token] != null) return GLYPH_VALUE[token];

  const frac = /^(\d+)\/(\d+)$/.exec(token);
  if (frac) return Number(frac[1]) / Number(frac[2]);

  const n = Number(token);
  return Number.isFinite(n) ? n : null;
}

/**
 * A number as a cook would write it: 1.5 -> "1½", 0.333 -> "⅓", 2 -> "2".
 *
 * Anything that does not land near a familiar fraction is rounded to one
 * decimal rather than printed as 0.6666666666666666.
 */
export function formatQuantity(n) {
  if (!Number.isFinite(n) || n <= 0) return "";

  const whole = Math.floor(n + 1e-9);
  const rest = n - whole;

  if (rest < 0.02) return String(whole);

  for (const [value, glyph] of VALUE_GLYPH) {
    if (Math.abs(rest - value) < 0.02) {
      return whole > 0 ? `${whole}${glyph}` : glyph;
    }
  }

  const rounded = Math.round(n * 10) / 10;
  return String(Number.isInteger(rounded) ? rounded : rounded.toFixed(1));
}

/*
 * A leading quantity, optionally a range ("8–10"), optionally with the unit
 * stuck to it ("400g"). The lookahead is what stops it matching the "2" in
 * "2 hours" halfway down a line — the pattern is anchored at the start.
 */
const LEADING = /^(\d+(?:\.\d+)?|\d+\/\d+|[½¼¾⅓⅔⅛])(?:\s*[–—-]\s*(\d+(?:\.\d+)?|\d+\/\d+))?(?=(\s|[a-zA-Z]))/;

/**
 * Scale one ingredient line.
 *
 * Returns `{ text, scaled }` so the caller can mark which lines actually
 * changed — a list where half the numbers moved and half did not is confusing
 * unless you can see which is which.
 */
export function scaleIngredient(line, factor) {
  if (factor === 1) return { text: line, scaled: false };

  const m = LEADING.exec(line);
  if (!m) return { text: line, scaled: false };

  const low = parseNumber(m[1]);
  if (low == null) return { text: line, scaled: false };

  const high = m[2] ? parseNumber(m[2]) : null;
  const rest = line.slice(m[0].length);

  const next =
    high != null
      ? `${formatQuantity(low * factor)}–${formatQuantity(high * factor)}`
      : formatQuantity(low * factor);

  if (!next) return { text: line, scaled: false };
  return { text: `${next}${rest}`, scaled: true };
}

/** Every line of a recipe, scaled to a new number of servings. */
export function scaleIngredients(ingredients, factor) {
  return ingredients.map((line) => scaleIngredient(line, factor));
}

/** `serves` is authored as a string ("2", "4"); fall back to 2 if it is odd. */
export function baseServes(recipe) {
  const n = parseInt(String(recipe.serves), 10);
  return Number.isFinite(n) && n > 0 ? n : 2;
}
