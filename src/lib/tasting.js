/**
 * Chakhne wala — the tasting game.
 *
 * You pick a dish, season it blind, and only then does he taste it. The
 * commitment is the point: you cannot take a pinch back out of a real dal, so
 * you should not be able to take one back here either.
 *
 * Every judgement is computed from what is actually in the bowl against what
 * the dish actually wants — nothing is scripted. That is what makes the same
 * spice read as right in one bowl and absurd in another, which is the lesson
 * worth teaching: a spice is not good or bad, it belongs somewhere or it does
 * not.
 *
 * Tints are literal hex rather than CSS tokens because the bowl mixes them to
 * work out what colour the food has gone.
 */

/* The nine-compartment dabba. Every one is a real SKU. */
export const DABBA = [
  { slug: "lal-mirch-powder", label: "Lal Mirch", hi: "लाल मिर्च", icon: "chilli", tint: "#d03821", add: { heat: 2.2 } },
  { slug: "haldi-powder", label: "Haldi", hi: "हल्दी", icon: "turmeric", tint: "#f2b30a", add: { earth: 1.6 } },
  { slug: "dhaniya-powder", label: "Dhaniya", hi: "धनिया", icon: "coriander", tint: "#7fa928", add: { earth: 1.3, aroma: 0.7 } },
  { slug: "jeera-whole", label: "Jeera", hi: "जीरा", icon: "cumin", tint: "#6b3e2e", add: { earth: 1.2, aroma: 1 } },
  { slug: "amchur-powder", label: "Amchur", hi: "अमचूर", icon: "jar", tint: "#e8601c", add: { tang: 2.4 } },
  { slug: "shahi-hing", label: "Hing", hi: "हींग", icon: "pinch", tint: "#e58c1a", add: { aroma: 1.8 } },
  { slug: "elaichi-whole", label: "Elaichi", hi: "इलायची", icon: "cardamom", tint: "#4b5d22", add: { aroma: 2.2 } },
  { slug: "laung-whole", label: "Laung", hi: "लौंग", icon: "clove", tint: "#3a2a22", add: { aroma: 2, heat: 0.4 } },
  { slug: "kali-mirch-powder", label: "Kali Mirch", hi: "काली मिर्च", icon: "peppercorn", tint: "#241b13", add: { heat: 1.2, aroma: 0.9 } },
];

export const getSpice = (slug) => DABBA.find((s) => s.slug === slug);

/**
 * Three bowls with genuinely different right answers.
 *
 * `essential` is what the dish cannot do without, `good` is what it welcomes,
 * and anything in `wrong` gets its own line — those are the ones worth getting
 * wrong on purpose.
 */
export const DISHES = [
  {
    slug: "dal",
    name: "Dal",
    hi: "दाल",
    note: "Tuar dal, boiled soft. Waiting on its tadka.",
    base: "#dfa524",
    hot: true,
    essential: ["haldi-powder", "shahi-hing"],
    good: ["jeera-whole", "lal-mirch-powder", "dhaniya-powder"],
    wrong: {
      "elaichi-whole": { hi: "इलायची? ये दाल है, खीर नहीं।", en: "Elaichi? This is dal, not kheer.", face: "overwhelmed" },
      "laung-whole": { hi: "लौंग सब कुछ दबा देगी।", en: "Laung will flatten everything else in the pot.", face: "overwhelmed" },
    },
  },
  {
    slug: "aloo",
    name: "Jeera Aloo",
    hi: "जीरा आलू",
    note: "Cold-boiled potato, dried and crisping in ghee.",
    base: "#d8bb84",
    hot: true,
    essential: ["jeera-whole", "amchur-powder"],
    good: ["haldi-powder", "lal-mirch-powder", "dhaniya-powder"],
    wrong: {
      "elaichi-whole": { hi: "इलायची आलू में? नहीं जी।", en: "Elaichi, on potatoes? No.", face: "overwhelmed" },
      "laung-whole": { hi: "लौंग बहुत भारी है इसके लिए।", en: "Laung is far too heavy for four ingredients.", face: "overwhelmed" },
    },
  },
  {
    slug: "chai",
    name: "Kadak Chai",
    hi: "कड़क चाय",
    note: "Boiling hard. Milk and leaves already in.",
    base: "#bd8a5e",
    hot: true,
    essential: ["elaichi-whole"],
    good: ["laung-whole", "kali-mirch-powder"],
    wrong: {
      "lal-mirch-powder": { hi: "मिर्च?! चाय में?!", en: "Chilli. In tea. Why would you.", face: "burning" },
      "haldi-powder": { hi: "ये चाय है, हल्दी दूध नहीं।", en: "This is chai, not haldi doodh.", face: "overwhelmed" },
      "amchur-powder": { hi: "खट्टी चाय? दूध फट जाएगा।", en: "Sour tea. The milk will split and you will deserve it.", face: "sour" },
      "shahi-hing": { hi: "हींग?! पूरी चाय गई।", en: "Hing?! The entire pot is finished.", face: "overwhelmed" },
      "jeera-whole": { hi: "जीरा चाय में नहीं जाता।", en: "Jeera does not go anywhere near chai.", face: "overwhelmed" },
      "dhaniya-powder": { hi: "धनिया? ये सब्ज़ी नहीं है।", en: "Dhaniya? This is not a sabzi.", face: "overwhelmed" },
    },
  },
];

export const getDish = (slug) => DISHES.find((d) => d.slug === slug);

/* A chutki is one pinch. Past this many and the argument makes itself. */
const FISTFUL = 9;
/* One spice this far ahead of the rest has taken the bowl over. */
const DOMINANT = 4;

/** What the bowl tastes of, for the meters. */
export function axes(bowl) {
  const out = { heat: 0, aroma: 0, tang: 0, earth: 0 };
  for (const [slug, n] of Object.entries(bowl)) {
    const spice = getSpice(slug);
    if (!spice) continue;
    for (const [k, v] of Object.entries(spice.add)) out[k] = +(out[k] + v * n).toFixed(2);
  }
  return out;
}

export const totalPinches = (bowl) => Object.values(bowl).reduce((a, b) => a + b, 0);

/**
 * What he says when he tastes it.
 *
 * Ordered by what a cook would actually complain about first: something that
 * does not belong beats too much of something, which beats not enough of
 * anything. The first match wins.
 */
export function judge(dish, bowl) {
  const pinches = totalPinches(bowl);
  const t = axes(bowl);

  if (pinches === 0) {
    return {
      key: "empty",
      face: "flat",
      hi: "अभी तो कुछ डाला ही नहीं।",
      en: "You have not put anything in yet.",
      note: "Add a pinch at a time, then let him taste it.",
      sound: null,
    };
  }

  /* Something in here does not belong in this bowl at all. */
  const offenders = Object.keys(bowl)
    .filter((slug) => bowl[slug] > 0 && dish.wrong[slug])
    .sort((a, b) => bowl[b] - bowl[a]);

  if (offenders.length) {
    const slug = offenders[0];
    const line = dish.wrong[slug];
    return {
      key: `wrong-${slug}`,
      face: line.face ?? "overwhelmed",
      hi: line.hi,
      en: line.en,
      note: `${getSpice(slug)?.label} has no business in ${dish.name}. Empty it and start again.`,
      sound: line.face === "burning" ? "gulp" : "ruined",
      culprit: slug,
    };
  }

  if (pinches >= FISTFUL) {
    return {
      key: "fistful",
      face: "overwhelmed",
      hi: "अरे! ये तो मुट्ठी भर हो गया!",
      en: "That is a fistful, not a chutki.",
      note: "This is the mistake the whole brand is about. Kam masala, poora swaad.",
      sound: "ruined",
    };
  }

  /* One spice has taken the whole bowl over. */
  const heavy = Object.keys(bowl).find((slug) => bowl[slug] >= DOMINANT);
  if (heavy) {
    const spice = getSpice(heavy);
    const hot = (spice.add.heat ?? 0) > 1;
    const sour = (spice.add.tang ?? 0) > 1;
    return {
      key: `heavy-${heavy}`,
      face: hot ? "burning" : sour ? "sour" : "overwhelmed",
      hi: hot ? "बाप रे! पानी लाओ, जल्दी!" : sour ? "उई! बहुत खट्टा हो गया।" : `बहुत ज़्यादा ${spice.hi} है।`,
      en: hot
        ? "Good grief — bring water, quickly."
        : sour
          ? "Oof. That has gone very sour."
          : `That is far too much ${spice.label}.`,
      note: `${bowl[heavy]} pinches of ${spice.label}. One would have done it.`,
      sound: hot ? "gulp" : "ruined",
      culprit: heavy,
    };
  }

  const missing = dish.essential.filter((slug) => !bowl[slug]);

  if (missing.length === dish.essential.length) {
    return {
      key: "flat",
      face: "unimpressed",
      hi: "हम्म... कुछ तो रह गया।",
      en: "Hmm. Something is missing.",
      note: `${dish.name} does not start until the ${missing.map((s) => getSpice(s)?.label).join(" and ")} is in.`,
      sound: "ruined",
      hint: missing[0],
    };
  }

  if (missing.length) {
    return {
      key: "nearly",
      face: "curious",
      hi: "ठीक है... पर पूरा नहीं।",
      en: "Close. Not finished though.",
      note: `It still wants the ${missing.map((s) => getSpice(s)?.label).join(" and ")}.`,
      sound: "taste",
      hint: missing[0],
    };
  }

  /* Everything it needs is in. Now — how much did it take? */
  if (pinches <= 5) {
    return {
      key: "perfect",
      face: "delighted",
      hi: "वाह! एकदम सही। यही तो चुटकी है।",
      en: "Perfect. This is what a chutki means.",
      note: `Everything ${dish.name} wanted, in ${pinches} ${pinches === 1 ? "pinch" : "pinches"}.`,
      sound: "praise",
    };
  }

  return {
    key: "heavy-hand",
    face: t.heat > t.aroma ? "burning" : "dreamy",
    hi: "सही है, पर हाथ भारी है।",
    en: "Right idea. Heavy hand.",
    note: `All the correct things, but ${pinches} pinches of them. It would taste cleaner with half.`,
    sound: "taste",
  };
}
