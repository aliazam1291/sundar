/**
 * Pack sizes, MRP and ingredients, straight from the brand's master sheet
 * ("Ingredient list + MRP sku wise.xlsx", July 2026).
 *
 * This is the authority for price and pack size. `products.js` derives its
 * `price`, `size` and `sizes` fields from the variants here rather than
 * carrying its own numbers, because the two drifted badly when they were kept
 * separately — the catalogue was showing ₹24 for haldi against a real MRP of
 * ₹46, and ₹410 for Shahi Hing against ₹310.
 *
 * Two conventions from the sheet, kept deliberately:
 *
 *   - A "size" that reads like a price (₹10, ₹20) is a price-point pack — the
 *     sachets and small jars sold by the coin rather than by the gram. They
 *     carry `pricePoint: true` so the UI can label them as such instead of
 *     printing "₹10 · ₹10".
 *   - HORECA rows are the 1kg catering packs. They are marked `horeca` so the
 *     shop can show them without implying a retail shelf carries them.
 *
 * `ingredients` is the printed declaration, title-cased from the sheet's caps.
 * `variety` is the specific raw material where the sheet names one — this is
 * what answers "which dhaniya, which Kashmiri mirchi": Teja chillies, Rajapuri
 * turmeric, Gondal/Kumbhraj coriander.
 */

/** @typedef {{ size: string, mrp: number, pack: string, pricePoint?: boolean, horeca?: boolean }} Variant */

export const SKU_DETAILS = {
  /* ── Hing ── */
  "shahi-hing": {
    variety: "Compounded asafoetida",
    ingredients: "Wheat flour, edible gum, asafoetida (edible starch approx. 50%)",
    variants: [
      { size: "10 GM", mrp: 66, pack: "Jar" },
      { size: "50 GM", mrp: 310, pack: "Jar" },
      { size: "₹10", mrp: 10, pack: "Sachet", pricePoint: true },
      { size: "₹20", mrp: 20, pack: "Sachet", pricePoint: true },
      { size: "₹50", mrp: 50, pack: "Jar", pricePoint: true },
    ],
  },
  "asafoetida-hing": {
    variety: "100% pure hing",
    ingredients: "Asafoetida (100% pure hing)",
    variants: [
      { size: "5 GM", mrp: 175, pack: "Zip-lock pouch" },
      { size: "₹50", mrp: 50, pack: "Zip-lock pouch", pricePoint: true },
    ],
  },

  /* ── Blended masala ── */
  "dal-masala": {
    ingredients:
      "Dry mango, coriander, black pepper, red chilli, cumin, dry ginger, black salt, salt, black cardamom, cinnamon, long pepper, bay leaf, clove, nutmeg, asafoetida",
    variants: [{ size: "100 GM", mrp: 100, pack: "Monocarton box" }],
  },
  jaljira: {
    ingredients:
      "Rock salt, black salt, dry ginger, cumin, mint, dry mango, citric acid, black pepper",
    variants: [
      { size: "100 GM", mrp: 56, pack: "Monocarton box" },
      { size: "₹2", mrp: 2, pack: "Sachet", pricePoint: true },
    ],
  },
  "achar-masala": {
    ingredients:
      "Rai dal (mustard), sarson dal (mustard), methi dal (fenugreek), red chilli, fennel, turmeric, asafoetida, common salt, kalonji",
    variants: [
      { size: "200 GM", mrp: 72, pack: "Pillow pouch" },
      { size: "500 GM", mrp: 176, pack: "Pillow pouch" },
    ],
  },
  "sambhar-masala": {
    ingredients:
      "Coriander, chilli, cumin, tamarind, toovar/arhar dal, chana dal, fenugreek, salt, turmeric, dry ginger, cassia leaf, cinnamon, nutmeg, mace",
    variants: [
      { size: "50 GM", mrp: 38, pack: "Monocarton box" },
      { size: "100 GM", mrp: 70, pack: "Monocarton box" },
      { size: "₹10", mrp: 10, pack: "Monocarton box", pricePoint: true },
    ],
  },
  "pav-bhaji-masala": {
    ingredients:
      "Coriander, cumin, chilli, dry mango, dry ginger, black salt, star anise, cassia leaf, black pepper, asafoetida, nutmeg, cinnamon",
    variants: [
      { size: "50 GM", mrp: 48, pack: "Monocarton box" },
      { size: "100 GM", mrp: 90, pack: "Monocarton box" },
      { size: "₹10", mrp: 10, pack: "Monocarton box", pricePoint: true },
    ],
  },
  "chaat-masala": {
    ingredients:
      "Rock salt, black salt, dry mango, kachri, cumin, coriander, black pepper, pomegranate, dry ginger, cloves, fennel, nutmeg, mint",
    variants: [
      { size: "50 GM", mrp: 44, pack: "Monocarton box" },
      { size: "100 GM", mrp: 82, pack: "Monocarton box" },
      { size: "₹10", mrp: 10, pack: "Monocarton box", pricePoint: true },
    ],
  },
  "chole-masala": {
    ingredients:
      "Coriander, chilli, dry mango, kachri, cassia leaf, sesame, black salt, rock salt, cloves, cumin, black cardamom, fennel, fenugreek, mustard, black pepper, dry ginger, cinnamon, nutmeg, mace, asafoetida",
    variants: [
      { size: "50 GM", mrp: 48, pack: "Monocarton box" },
      { size: "100 GM", mrp: 90, pack: "Monocarton box" },
      { size: "₹10", mrp: 10, pack: "Monocarton box", pricePoint: true },
    ],
  },
  "jeeravan-poha-masala": {
    ingredients:
      "Red chilli, dry mango, coriander, turmeric, cassia leaf, citric acid, black pepper, cloves, dry ginger, cumin, cinnamon, asafoetida",
    variants: [
      { size: "100 GM", mrp: 38, pack: "Pillow pouch" },
      { size: "500 GM", mrp: 160, pack: "Pillow pouch" },
      { size: "₹10", mrp: 10, pack: "Pillow pouch", pricePoint: true },
    ],
  },
  "kitchen-king": {
    ingredients:
      "Red chilli, coriander, bay leaves, turmeric, cloves, cumin, black cardamom, fennel, fenugreek leaf, mustard, common salt, green cardamom, black pepper, dry ginger, caraway, nutmeg, mace, cassia",
    variants: [
      { size: "50 GM", mrp: 54, pack: "Monocarton box" },
      { size: "100 GM", mrp: 100, pack: "Monocarton box" },
      { size: "₹10", mrp: 10, pack: "Monocarton box", pricePoint: true },
    ],
  },
  "raita-masala": {
    ingredients:
      "Black salt, rock salt, cumin, coriander, dry ginger, black pepper, cloves, carom seeds, nutmeg",
    variants: [
      { size: "50 GM", mrp: 48, pack: "Monocarton box" },
      { size: "100 GM", mrp: 92, pack: "Monocarton box" },
      { size: "₹10", mrp: 10, pack: "Monocarton box", pricePoint: true },
    ],
  },
  "shahi-paneer-masala": {
    ingredients:
      "Red chilli, coriander, cassia leaf, turmeric, cloves, cumin, black cardamom, green cardamom, salt, black pepper, cinnamon, citric acid",
    variants: [
      { size: "50 GM", mrp: 60, pack: "Monocarton box" },
      { size: "100 GM", mrp: 115, pack: "Monocarton box" },
      { size: "₹10", mrp: 10, pack: "Monocarton box", pricePoint: true },
    ],
  },
  "garam-masala": {
    variety: "Shahi Garam Masala",
    ingredients:
      "Coriander, chilli, cassia leaves, black salt, edible soya oil, dry mango, mustard, groundnut, aniseed, fenugreek, cardamomum amomum, curry leaf, stone flower, star anise, cinnamon, black pepper, cloves, dry ginger, nutmeg, mace",
    variants: [
      { size: "50 GM", mrp: 45, pack: "Monocarton box" },
      { size: "100 GM", mrp: 76, pack: "Sprinkler jar" },
      { size: "200 GM", mrp: 150, pack: "Sprinkler jar" },
      { size: "500 GM", mrp: 304, pack: "Pillow pouch" },
      { size: "₹10", mrp: 10, pack: "Jar", pricePoint: true },
      { size: "₹20", mrp: 20, pack: "Jar", pricePoint: true },
    ],
  },

  /* ── Pure and CTC spices ── */
  "kuti-teja-mirch": {
    variety: "Teja chillies",
    ingredients: "Teja chillies",
    variants: [
      { size: "50 GM", mrp: 28, pack: "Pillow pouch" },
      { size: "200 GM", mrp: 112, pack: "Pillow pouch" },
      { size: "500 GM", mrp: 276, pack: "Pillow pouch" },
    ],
  },
  "sunth-powder": {
    variety: "Dry ginger",
    ingredients: "Dry ginger",
    variants: [
      { size: "50 GM", mrp: 65, pack: "Monocarton box" },
      { size: "100 GM", mrp: 120, pack: "Monocarton box" },
    ],
  },
  "kali-mirch-powder": {
    variety: "Black pepper",
    ingredients: "Black pepper",
    variants: [
      { size: "50 GM", mrp: 110, pack: "Monocarton box" },
      { size: "100 GM", mrp: 218, pack: "Monocarton box" },
    ],
  },
  "safed-mirch-powder": {
    variety: "White pepper",
    ingredients: "White pepper",
    variants: [
      { size: "50 GM", mrp: 160, pack: "Monocarton box" },
      { size: "100 GM", mrp: 320, pack: "Monocarton box" },
    ],
  },
  "kashmiri-mirchi-powder": {
    variety: "Kashmiri red chillies",
    ingredients: "Red chillies",
    variants: [
      { size: "50 GM", mrp: 75, pack: "Monocarton box" },
      { size: "100 GM", mrp: 140, pack: "Monocarton box" },
      { size: "₹10", mrp: 10, pack: "Sachet", pricePoint: true },
    ],
  },
  "amchur-powder": {
    variety: "Dry mango",
    ingredients: "Dry mango",
    variants: [
      { size: "100 GM", mrp: 39, pack: "Pillow pouch" },
      { size: "500 GM", mrp: 192, pack: "Pillow pouch" },
      { size: "₹10", mrp: 10, pack: "Pillow pouch", pricePoint: true },
    ],
  },
  "dhaniya-powder": {
    variety: "Gondal / Kumbhraj coriander seeds",
    ingredients: "Gondal/Kumbhraj coriander seeds",
    variants: [
      { size: "100 GM", mrp: 44, pack: "Pillow pouch" },
      { size: "200 GM", mrp: 88, pack: "Pillow pouch" },
      { size: "500 GM", mrp: 216, pack: "Pillow pouch" },
      { size: "1 KG", mrp: 432, pack: "Pillow pouch", horeca: true },
      { size: "₹10", mrp: 10, pack: "Pillow pouch", pricePoint: true },
    ],
  },
  "haldi-powder": {
    variety: "Rajapuri turmeric",
    ingredients: "Rajapuri turmeric",
    variants: [
      { size: "100 GM", mrp: 46, pack: "Pillow pouch" },
      { size: "200 GM", mrp: 91, pack: "Pillow pouch" },
      { size: "500 GM", mrp: 224, pack: "Pillow pouch" },
      { size: "1 KG", mrp: 448, pack: "Pillow pouch", horeca: true },
      { size: "₹10", mrp: 10, pack: "Pillow pouch", pricePoint: true },
    ],
  },
  "lal-mirch-powder": {
    variety: "Teja chillies",
    ingredients: "Teja chillies",
    variants: [
      { size: "100 GM", mrp: 56, pack: "Pillow pouch" },
      { size: "200 GM", mrp: 112, pack: "Pillow pouch" },
      { size: "500 GM", mrp: 276, pack: "Pillow pouch" },
      { size: "1 KG", mrp: 552, pack: "Pillow pouch", horeca: true },
      { size: "₹10", mrp: 10, pack: "Pillow pouch", pricePoint: true },
    ],
  },
  "kasuri-methi": {
    variety: "Dried fenugreek leaves",
    ingredients: "Dried fenugreek leaves",
    variants: [
      { size: "25 GM", mrp: 30, pack: "Monocarton box" },
      { size: "100 GM", mrp: 80, pack: "Zip-lock standy pouch" },
    ],
  },

  /* ── Whole spices — all sold as ₹10 price-point pouches ── */
  "sauf-whole": {
    variety: "Fennel seeds",
    ingredients: "Fennel seeds",
    variants: [{ size: "₹10", mrp: 10, pack: "Pillow pouch", pricePoint: true }],
  },
  "ajwain-whole": {
    variety: "Carom seeds",
    ingredients: "Carom seeds",
    variants: [{ size: "₹10", mrp: 10, pack: "Pillow pouch", pricePoint: true }],
  },
  "methi-dana-whole": {
    variety: "Fenugreek",
    ingredients: "Fenugreek",
    variants: [{ size: "₹10", mrp: 10, pack: "Pillow pouch", pricePoint: true }],
  },
  "elaichi-whole": {
    variety: "Green cardamom",
    ingredients: "Green cardamom",
    variants: [{ size: "₹10", mrp: 10, pack: "Pillow pouch", pricePoint: true }],
  },
  "kali-mirch-whole": {
    variety: "Black pepper",
    ingredients: "Black pepper",
    variants: [{ size: "₹10", mrp: 10, pack: "Pillow pouch", pricePoint: true }],
  },
  "jeera-whole": {
    variety: "Cumin",
    ingredients: "Cumin",
    variants: [{ size: "₹10", mrp: 10, pack: "Pillow pouch", pricePoint: true }],
  },
  "rai-whole": {
    variety: "Mustard seeds",
    ingredients: "Mustard seeds",
    variants: [{ size: "₹10", mrp: 10, pack: "Pillow pouch", pricePoint: true }],
  },
  "laung-whole": {
    variety: "Cloves",
    ingredients: "Cloves",
    variants: [{ size: "₹10", mrp: 10, pack: "Pillow pouch", pricePoint: true }],
  },
};

/**
 * The variant a product leads with: the cheapest weighed pack, or the
 * price-point sachet when that is all there is (the whole spices).
 *
 * Leading with a price-point pack where a weighed one exists would put "₹10"
 * against a product whose real shelf pack is 100g, which is the sort of
 * mismatch the catalogue had before.
 */
export function leadVariant(slug) {
  const detail = SKU_DETAILS[slug];
  if (!detail) return null;
  const weighed = detail.variants.filter((v) => !v.pricePoint && !v.horeca);
  const pool = weighed.length ? weighed : detail.variants;
  return pool.reduce((a, b) => (b.mrp < a.mrp ? b : a));
}
