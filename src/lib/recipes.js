/**
 * Rasoi — the recipe corner.
 *
 * Every recipe names the actual SKUs it needs by slug, so the cards can link
 * straight into the shop and nothing drifts if the catalogue changes.
 */

export const RECIPES = [
  {
    slug: "indori-poha",
    title: "Indori Poha",
    hi: "इंदौरी पोहा",
    kicker: "Breakfast · Indore",
    dish: "The one the city argues about",
    time: "15 min",
    serves: "2",
    heat: 2,
    blurb:
      "Fifty-six shops, one breakfast, zero consensus. What they agree on is the jeeravan that goes over the top at the last second — never stirred in.",
    uses: ["jeeravan-poha-masala", "haldi-powder", "lal-mirch-powder"],
    steps: [
      "Rinse thick poha in a colander until just soft. Never soak it — it turns to paste.",
      "Temper mustard, curry leaf and green chilli in hot oil. Add haldi and a pinch of lal mirch.",
      "Fold the poha through off the heat, with sugar and lemon. Do not stir it hard.",
      "Sprinkle jeeravan over the top at the table. Sev, onion, coriander, done.",
    ],
    tip: "Jeeravan goes on at the end. Cook it in and you lose the whole point of it.",
    hero: true,
    tone: "marigold",
  },
  {
    slug: "dal-tadka",
    title: "Dal Tadka",
    hi: "दाल तड़का",
    kicker: "Weeknight · Everywhere",
    dish: "The two-second bloom",
    time: "35 min",
    serves: "4",
    heat: 2,
    blurb:
      "The whole dish turns on two seconds. Hot ghee, one chutki, and the oils wake up. Five seconds and you have burnt what you paid for.",
    uses: ["dal-masala", "haldi-powder", "lal-mirch-powder", "shahi-hing"],
    steps: [
      "Pressure-cook tuar dal with haldi and salt until it collapses.",
      "Heat ghee until it shimmers. Cumin, then a pinch of hing — count to two.",
      "Garlic, dried chilli and lal mirch off the heat so the chilli does not blacken.",
      "Pour the tadka over the dal. Dal masala last, and let it sit two minutes.",
    ],
    tip: "Cold fat mutes everything. If the cumin does not sizzle on contact, wait.",
    tone: "kiwi",
  },
  {
    slug: "chole-bhature",
    title: "Chole Bhature",
    hi: "छोले भटूरे",
    kicker: "Sunday · Old Delhi",
    dish: "Dark, sour and unapologetic",
    time: "1 hr + soak",
    serves: "4",
    heat: 3,
    blurb:
      "The colour comes from tea, not from chilli powder. The sourness comes from amchur. Everything else is patience.",
    uses: ["chole-masala", "amchur-powder", "garam-masala"],
    steps: [
      "Soak kabuli chana overnight. Boil with a tea bag until the skins give.",
      "Brown onion properly — past golden, to the edge of catching.",
      "Chole masala into the masala base, then the chana with its dark water.",
      "Amchur and garam masala at the end. Taste. It should be sour before it is hot.",
    ],
    tip: "If it tastes flat, it needs amchur, not salt.",
    tone: "oxblood",
  },
  {
    slug: "pav-bhaji",
    title: "Pav Bhaji",
    hi: "पाव भाजी",
    kicker: "Evening · Mumbai",
    dish: "Chowpatty, on your tawa",
    time: "40 min",
    serves: "4",
    heat: 3,
    blurb:
      "A bhaji-wala seasons last, not first, and keeps mashing long after you think it is done. That is the whole technique.",
    uses: ["pav-bhaji-masala", "kashmiri-mirchi-powder", "lal-mirch-powder"],
    steps: [
      "Boil potato, cauliflower and peas together. Keep the water.",
      "Cook onion, tomato and capsicum down to a jam on a wide tawa.",
      "Add the vegetables and mash on the heat, loosening with the cooking water.",
      "Pav bhaji masala and kashmiri mirchi now. Butter, lemon, more butter.",
    ],
    tip: "Kashmiri mirchi for the red, lal mirch for the heat. They are two different jobs.",
    tone: "tomato",
  },
  {
    slug: "masala-chai",
    title: "Kadak Masala Chai",
    hi: "कड़क मसाला चाय",
    kicker: "Any hour · Everywhere",
    dish: "Boiled, not steeped",
    time: "10 min",
    serves: "2",
    heat: 1,
    blurb:
      "Chai is boiled. Crush the whole spices in your palm first — an unbruised cardamom pod gives you nothing at all.",
    uses: ["elaichi-whole", "sunth-powder", "laung-whole"],
    steps: [
      "Crush elaichi and laung. Add to water with a slice of ginger and a pinch of sunth.",
      "Boil hard for two minutes before the tea goes anywhere near it.",
      "Add leaves, boil again, then milk and sugar. Let it rise three times.",
      "Strain from a height. It aerates and it looks better.",
    ],
    tip: "Sunth is the winter version. In summer leave it out and add more elaichi.",
    tone: "brown",
  },
  {
    slug: "jeera-aloo",
    title: "Jeera Aloo",
    hi: "जीरा आलू",
    kicker: "Fifteen minutes · Everywhere",
    dish: "Four ingredients, no hiding",
    time: "15 min",
    serves: "2",
    heat: 1,
    blurb:
      "Nothing to hide behind. If the jeera is stale or the potato is wet, you will taste exactly that.",
    uses: ["jeera-whole", "haldi-powder", "amchur-powder"],
    steps: [
      "Boil potatoes the day before and chill them. Cold potato holds its edges.",
      "Bloom whole jeera in hot ghee until it darkens a shade — no further.",
      "Potatoes in, haldi, salt. Leave them alone so a crust forms.",
      "Amchur and coriander off the heat.",
    ],
    tip: "Dry the potato properly. Wet potato steams instead of frying.",
    tone: "cobalt",
  },
];

export const getRecipe = (slug) => RECIPES.find((r) => r.slug === slug);
export const heroRecipe = () => RECIPES.find((r) => r.hero) ?? RECIPES[0];

/* Tailwind-safe tone map — these class strings must appear literally so the
   compiler keeps them. */
export const RECIPE_TONE = {
  marigold: { bg: "bg-marigold", text: "text-ink", accent: "text-oxblood" },
  kiwi: { bg: "bg-kiwi", text: "text-ink", accent: "text-forest" },
  oxblood: { bg: "bg-oxblood", text: "text-paper", accent: "text-marigold" },
  tomato: { bg: "bg-tomato", text: "text-paper", accent: "text-sun" },
  brown: { bg: "bg-brown", text: "text-ivory", accent: "text-sun" },
  cobalt: { bg: "bg-cobalt", text: "text-paper", accent: "text-sun" },
};
