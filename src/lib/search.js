/**
 * One index over everything a visitor might be looking for.
 *
 * People arrive knowing a dish ("pav bhaji"), a spice ("haldi"), or a problem
 * ("what do I put in dal") — not a URL. So products and recipes are flattened
 * into the same shape and scored together, and a recipe can be found by an
 * ingredient it uses just as easily as by its name.
 *
 * Deliberately no search library. The catalogue is 32 SKUs and 12 recipes;
 * shipping a fuzzy-search dependency to rank 44 records would cost more than
 * it earns.
 */

import { PRODUCTS, RANGES } from "@/lib/products";
import { RECIPES, kickerOf } from "@/lib/recipes";

const norm = (s) =>
  String(s ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9ऀ-ॿ\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Devanagari names, by slug.
 *
 * The catalogue's `hindi` field is a marketing line ("एक चुटकी, पूरा तड़का।"),
 * not the name of the thing — so without this, a customer typing हल्दी gets
 * nothing back. Half this audience reaches for the Hindi keyboard first, so
 * these are search vocabulary rather than copy: they never render.
 */
const DEVA = {
  "shahi-hing": "शाही हींग",
  "asafoetida-hing": "हींग",
  "dal-masala": "दाल मसाला",
  jaljira: "जलजीरा",
  "achar-masala": "अचार मसाला",
  "sambhar-masala": "सांबर मसाला सांभर",
  "pav-bhaji-masala": "पाव भाजी मसाला",
  "chaat-masala": "चाट मसाला",
  "chole-masala": "छोले मसाला चना",
  "jeeravan-poha-masala": "जीरावन पोहा मसाला",
  "methi-dana-whole": "मेथी दाना",
  "rai-whole": "राई सरसों",
  "ajwain-whole": "अजवाइन",
  "sauf-whole": "सौंफ",
  "jeera-whole": "जीरा",
  "laung-whole": "लौंग",
  "kali-mirch-whole": "काली मिर्च साबुत",
  "elaichi-whole": "इलायची",
  "kitchen-king": "किचन किंग मसाला",
  "raita-masala": "रायता मसाला",
  "kasuri-methi": "कसूरी मेथी",
  "shahi-paneer-masala": "शाही पनीर मसाला",
  "garam-masala": "गरम मसाला",
  "kuti-teja-mirch": "कुटी तेजा मिर्च",
  "sunth-powder": "सोंठ अदरक",
  "kali-mirch-powder": "काली मिर्च",
  "safed-mirch-powder": "सफ़ेद मिर्च",
  "kashmiri-mirchi-powder": "कश्मीरी मिर्च",
  "amchur-powder": "अमचूर आमचूर",
  "dhaniya-powder": "धनिया",
  "haldi-powder": "हल्दी",
  "lal-mirch-powder": "लाल मिर्च",
};

/**
 * Every entry carries:
 *   title    what we show
 *   sub      the line under it
 *   terms    everything it can be found by, already normalised
 *   href     where it goes
 */
function buildIndex() {
  const entries = [];

  for (const p of PRODUCTS) {
    entries.push({
      id: `product-${p.slug}`,
      kind: "product",
      title: p.name,
      sub: p.kind,
      hindi: p.hindi,
      icon: p.icon,
      meta: `${RANGES[p.range]?.name ?? ""} · ${p.size}`,
      href: `/shop/${p.slug}`,
      terms: norm(
        [p.name, p.kind, DEVA[p.slug], p.hindi, p.tagline, RANGES[p.range]?.name, p.slug.replace(/-/g, " ")].join(" ")
      ),
    });
  }

  for (const r of RECIPES) {
    /* A recipe should surface when you search the spice it needs, or an
       ingredient in it — that is how people actually look for a recipe. */
    const usedNames = r.uses
      .map((slug) => PRODUCTS.find((p) => p.slug === slug))
      .filter(Boolean)
      .map((p) => `${p.name} ${p.hindi} ${p.kind}`)
      .join(" ");

    entries.push({
      id: `recipe-${r.slug}`,
      kind: "recipe",
      title: r.title,
      sub: r.dish,
      hindi: r.hi,
      icon: PRODUCTS.find((p) => p.slug === r.uses[0])?.icon ?? "starAnise",
      meta: `${kickerOf(r)} · ${r.time}`,
      href: `/recipes#${r.slug}`,
      terms: norm(
        [
          r.title,
          r.hi,
          r.dish,
          r.course,
          r.region,
          r.blurb,
          r.ingredients.join(" "),
          usedNames,
          r.slug.replace(/-/g, " "),
        ].join(" ")
      ),
    });
  }

  return entries;
}

export const INDEX = buildIndex();

/**
 * Score one entry against the query.
 *
 * Ranked the way a person would expect: something that *starts* with what you
 * typed beats something that merely contains it, and a hit on the title beats
 * a hit on an ingredient buried in the method.
 */
function score(entry, tokens, raw) {
  const title = norm(entry.title);
  let total = 0;

  if (title === raw) total += 1000;
  else if (title.startsWith(raw)) total += 500;
  else if (title.includes(raw)) total += 220;
  else if (entry.terms.includes(raw)) total += 90;

  for (const t of tokens) {
    if (!t) continue;
    if (title.startsWith(t)) total += 120;
    else if (new RegExp(`\\b${t}`).test(title)) total += 80;
    else if (title.includes(t)) total += 40;
    else if (new RegExp(`\\b${t}`).test(entry.terms)) total += 30;
    else if (entry.terms.includes(t)) total += 12;
    else return 0; // every token has to land somewhere
  }

  /* Nudge products ahead of recipes on an exact tie — someone typing a spice
     name usually wants the spice. */
  if (entry.kind === "product") total += 4;
  return total;
}

/** Ranked matches, best first. */
export function search(query, limit = 8) {
  const raw = norm(query);
  if (raw.length < 2) return [];

  const tokens = raw.split(" ");
  const hits = [];

  for (const entry of INDEX) {
    const s = score(entry, tokens, raw);
    if (s > 0) hits.push({ ...entry, score: s });
  }

  return hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, limit);
}

/* Shown before anyone types — the things most people are actually after. */
export const SUGGESTED = [
  "garam masala",
  "pav bhaji",
  "haldi",
  "dal tadka",
  "chaat masala",
  "chai",
];
