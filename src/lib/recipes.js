/**
 * Rasoi — the recipe corner.
 *
 * Every recipe names the actual SKUs it needs by slug, so the cards can link
 * straight into the shop and nothing drifts if the catalogue changes. The rest
 * of the ingredients are listed plainly — a recipe page that only tells you
 * which masala to buy is an advert, not a recipe.
 *
 * Each step also names the *action* it performs. That one word drives three
 * things at once — the pose Sunder ji strikes, the vessel on his chulha and
 * the sound the kitchen makes — so the walkthrough cooks the same dish the
 * printed method describes. Valid actions live in COOK_ACTIONS below.
 *
 * `course` and `region` are the only things the page groups by; nothing here
 * stores a display string like "Weeknight · Indore" because that would be two
 * places to change one fact. Use kickerOf().
 */

export const RECIPES = [
  {
    slug: "indori-poha",
    title: "Indori Poha",
    hi: "इंदौरी पोहा",
    dish: "The one the city argues about",
    course: "Quick",
    region: "Indore",
    time: "15 min",
    serves: "2",
    heat: 2,
    difficulty: "Easy",
    blurb:
      "Fifty-six shops, one breakfast, zero consensus. What they agree on is the jeeravan that goes over the top at the last second — never stirred in.",
    uses: ["jeeravan-poha-masala", "haldi-powder", "lal-mirch-powder"],
    ingredients: [
      "2 cups thick poha",
      "1 onion, fine chopped",
      "1 tsp mustard seeds",
      "8–10 curry leaves",
      "2 green chillies, slit",
      "1 tsp sugar",
      "Juice of half a lemon",
      "Sev, coriander and raw onion to finish",
    ],
    steps: [
      {
        act: "prep",
        text: "Rinse thick poha in a colander until just soft. Never soak it — it turns to paste.",
      },
      {
        act: "temper",
        text: "Temper mustard, curry leaf and green chilli in hot oil. Add haldi and a pinch of lal mirch.",
      },
      {
        act: "stir",
        text: "Fold the poha through off the heat, with sugar and lemon. Do not stir it hard.",
      },
      {
        act: "sprinkle",
        text: "Sprinkle jeeravan over the top at the table. Sev, onion, coriander, done.",
      },
    ],
    tip: "Jeeravan goes on at the end. Cook it in and you lose the whole point of it.",
    serveWith: "Hot jalebi, if you are doing it properly.",
    hero: true,
    tone: "marigold",
  },
  {
    slug: "dal-tadka",
    title: "Dal Tadka",
    hi: "दाल तड़का",
    dish: "The two-second bloom",
    course: "Weeknight",
    region: "Everywhere",
    time: "35 min",
    serves: "4",
    heat: 2,
    difficulty: "Easy",
    blurb:
      "The whole dish turns on two seconds. Hot ghee, one chutki, and the oils wake up. Five seconds and you have burnt what you paid for.",
    uses: ["dal-masala", "haldi-powder", "lal-mirch-powder", "shahi-hing"],
    ingredients: [
      "1 cup tuar dal",
      "3 tbsp ghee",
      "1 tsp cumin seeds",
      "4 garlic cloves, sliced",
      "2 dried red chillies",
      "1 tomato, chopped",
      "Coriander to finish",
    ],
    steps: [
      { act: "boil", text: "Pressure-cook tuar dal with haldi and salt until it collapses." },
      { act: "temper", text: "Heat ghee until it shimmers. Cumin, then a pinch of hing — count to two." },
      { act: "fry", text: "Garlic, dried chilli and lal mirch off the heat so the chilli does not blacken." },
      { act: "pour", text: "Pour the tadka over the dal. Dal masala last, and let it sit two minutes." },
    ],
    tip: "Cold fat mutes everything. If the cumin does not sizzle on contact, wait.",
    serveWith: "Rice, and a raw onion cut into quarters.",
    tone: "kiwi",
  },
  {
    slug: "rajma-chawal",
    title: "Rajma Chawal",
    hi: "राजमा चावल",
    dish: "Sunday, and nothing else planned",
    course: "Weekend",
    region: "Delhi",
    time: "1 hr 30 + soak",
    serves: "4",
    heat: 2,
    difficulty: "Patient",
    blurb:
      "You cannot hurry rajma and you cannot fake it. The gravy thickens because you mashed a spoonful of the beans into it, not because you added anything.",
    uses: ["garam-masala", "dhaniya-powder", "kashmiri-mirchi-powder"],
    ingredients: [
      "1 cup rajma, soaked overnight",
      "2 onions, fine chopped",
      "3 tomatoes, pureed",
      "1 tbsp ginger-garlic paste",
      "2 tbsp ghee or oil",
      "1 bay leaf",
      "Rice, to serve",
    ],
    steps: [
      {
        act: "prep",
        text: "Soak rajma overnight in plenty of water. It doubles, so use a bigger pot than you think you need.",
      },
      {
        act: "boil",
        text: "Pressure-cook with salt until a bean crushes between two fingers with no resistance at all.",
      },
      {
        act: "fry",
        text: "Brown onion, ginger and garlic properly, then tomato until the oil separates and pools at the edge.",
      },
      {
        act: "stir",
        text: "Rajma in with its dark cooking water. Dhaniya and kashmiri mirchi now. Simmer twenty minutes.",
      },
      {
        act: "sprinkle",
        text: "Garam masala off the heat. Mash a spoonful of beans against the side of the pot to thicken it.",
      },
    ],
    tip: "Undercooked rajma cannot be rescued later. Test one before the masala goes anywhere near it.",
    serveWith: "Plain rice, and raw onion in vinegar.",
    tone: "oxblood",
  },
  {
    slug: "chole-bhature",
    title: "Chole Bhature",
    hi: "छोले भटूरे",
    dish: "Dark, sour and unapologetic",
    course: "Weekend",
    region: "Old Delhi",
    time: "1 hr + soak",
    serves: "4",
    heat: 3,
    difficulty: "Patient",
    blurb:
      "The colour comes from tea, not from chilli powder. The sourness comes from amchur. Everything else is patience.",
    uses: ["chole-masala", "amchur-powder", "garam-masala"],
    ingredients: [
      "1 cup kabuli chana, soaked overnight",
      "1 black tea bag",
      "2 onions, sliced",
      "2 tomatoes, chopped",
      "1 tbsp ginger-garlic paste",
      "Bhature dough, rested 2 hours",
    ],
    steps: [
      { act: "boil", text: "Soak kabuli chana overnight. Boil with a tea bag until the skins give." },
      { act: "fry", text: "Brown onion properly — past golden, to the edge of catching." },
      { act: "stir", text: "Chole masala into the masala base, then the chana with its dark water." },
      {
        act: "sprinkle",
        text: "Amchur and garam masala at the end. Taste. It should be sour before it is hot.",
      },
    ],
    tip: "If it tastes flat, it needs amchur, not salt.",
    serveWith: "Bhature, sliced onion and a green chilli on the side.",
    tone: "tomato",
  },
  {
    slug: "shahi-paneer",
    title: "Shahi Paneer",
    hi: "शाही पनीर",
    dish: "The one you make for guests",
    course: "Weekend",
    region: "Punjab",
    time: "45 min",
    serves: "4",
    heat: 1,
    difficulty: "Steady",
    blurb:
      "Shahi means royal, and royal here means smooth. Everything hangs on passing the gravy through a sieve, which is the step everybody skips.",
    uses: ["shahi-paneer-masala", "kashmiri-mirchi-powder", "kasuri-methi"],
    ingredients: [
      "400g paneer, cubed",
      "2 onions, roughly chopped",
      "12 cashews, soaked",
      "3 tomatoes",
      "3 tbsp cream",
      "2 tbsp ghee",
    ],
    steps: [
      {
        act: "fry",
        text: "Onion, cashew and tomato cooked down soft, then blended smooth and passed through a sieve.",
      },
      {
        act: "stir",
        text: "Back on low heat with shahi paneer masala, and kashmiri mirchi for colour rather than heat.",
      },
      { act: "pour", text: "Cream in off the heat, or it will split. Stir it through slowly." },
      {
        act: "sprinkle",
        text: "Kasuri methi crushed between your palms over the top. Paneer in last, off the heat.",
      },
    ],
    tip: "Paneer goes in at the end. Boil it and you get rubber, every single time.",
    serveWith: "Naan, or a jeera pulao.",
    tone: "rani",
  },
  {
    slug: "pav-bhaji",
    title: "Pav Bhaji",
    hi: "पाव भाजी",
    dish: "Chowpatty, on your tawa",
    course: "Street",
    region: "Mumbai",
    time: "40 min",
    serves: "4",
    heat: 3,
    difficulty: "Easy",
    blurb:
      "A bhaji-wala seasons last, not first, and keeps mashing long after you think it is done. That is the whole technique.",
    uses: ["pav-bhaji-masala", "kashmiri-mirchi-powder", "lal-mirch-powder"],
    ingredients: [
      "3 potatoes, boiled",
      "1 cup cauliflower and peas, boiled",
      "2 onions, fine chopped",
      "3 tomatoes, chopped",
      "1 capsicum, chopped",
      "100g butter, and then more",
      "8 pav",
    ],
    steps: [
      { act: "boil", text: "Boil potato, cauliflower and peas together. Keep the water." },
      { act: "fry", text: "Cook onion, tomato and capsicum down to a jam on a wide tawa." },
      {
        act: "mash",
        text: "Add the vegetables and mash on the heat, loosening with the cooking water.",
      },
      {
        act: "sprinkle",
        text: "Pav bhaji masala and kashmiri mirchi now. Butter, lemon, more butter.",
      },
    ],
    tip: "Kashmiri mirchi for the red, lal mirch for the heat. They are two different jobs.",
    serveWith: "Pav toasted in butter, and raw onion with lemon.",
    tone: "derbyshire",
  },
  {
    slug: "sambhar",
    title: "Sambhar",
    hi: "साम्बर",
    dish: "Sour, then hot, in that order",
    course: "Weeknight",
    region: "Tamil Nadu",
    time: "45 min",
    serves: "4",
    heat: 2,
    difficulty: "Steady",
    blurb:
      "Sambhar is a tamarind dish that happens to contain dal, not a dal that happens to be sour. Get that the right way round and the rest follows.",
    uses: ["sambhar-masala", "shahi-hing", "haldi-powder"],
    ingredients: [
      "3/4 cup tuar dal",
      "Lemon-sized ball of tamarind",
      "1 drumstick, cut in fingers",
      "1 small brinjal, cubed",
      "10 shallots, peeled",
      "1 tsp mustard seeds",
      "10 curry leaves",
    ],
    steps: [
      {
        act: "boil",
        text: "Cook tuar dal with haldi until it collapses completely. It should pour, not sit.",
      },
      {
        act: "prep",
        text: "Drumstick, brinjal and shallots in rough pieces — sambhar wants vegetables you can still identify.",
      },
      {
        act: "stir",
        text: "Tamarind water and sambhar masala into the vegetables. Simmer until they give, then the dal.",
      },
      {
        act: "temper",
        text: "Rai, curry leaf and a pinch of hing in hot oil, poured over at the very last second.",
      },
    ],
    tip: "Boil the tamarind before the dal goes in. Raw tamarind stays sharp and never settles down.",
    serveWith: "Rice and a spoon of ghee, or idli.",
    tone: "forest",
  },
  {
    slug: "kadhi-pakora",
    title: "Kadhi Pakora",
    hi: "कढ़ी पकोड़ा",
    dish: "Forty minutes of not hurrying",
    course: "Weeknight",
    region: "Rajasthan",
    time: "1 hr",
    serves: "4",
    heat: 2,
    difficulty: "Patient",
    blurb:
      "Two things ruin kadhi: lumps, and impatience. Whisk until there is nothing left to whisk, then simmer far longer than feels reasonable.",
    uses: ["haldi-powder", "methi-dana-whole", "shahi-hing", "lal-mirch-powder"],
    ingredients: [
      "2 cups sour curd",
      "1/2 cup besan, plus more for the pakoras",
      "1 onion, sliced, for the pakoras",
      "1 tsp fenugreek seeds",
      "1 tsp mustard seeds",
      "3 tbsp ghee",
      "Oil, to fry",
    ],
    steps: [
      {
        act: "prep",
        text: "Whisk sour curd, besan and haldi until there is not one lump left. Lumps never leave later.",
      },
      { act: "temper", text: "Methi dana, rai and a pinch of hing in hot ghee until the methi darkens." },
      {
        act: "boil",
        text: "Kadhi in, and now leave it — forty minutes at a bare simmer, stirred whenever you pass.",
      },
      {
        act: "fry",
        text: "Fry the onion pakoras separately and drop them in ten minutes before you serve.",
      },
      {
        act: "sprinkle",
        text: "A second tadka of lal mirch in ghee, poured over at the table so it is still crackling.",
      },
    ],
    tip: "The curd must be properly sour. Fresh curd makes a kadhi that tastes of nothing at all.",
    serveWith: "Steamed rice. Nothing else is needed.",
    tone: "sun",
  },
  {
    slug: "baingan-bharta",
    title: "Baingan Bharta",
    hi: "बैंगन भरता",
    dish: "Smoke you cannot fake",
    course: "Weeknight",
    region: "Punjab",
    time: "40 min",
    serves: "3",
    heat: 2,
    difficulty: "Easy",
    blurb:
      "The whole dish is one flavour: smoke. There is no shortcut, no liquid smoke, no oven that will do it. It is the open flame or it is a different dish.",
    uses: ["dhaniya-powder", "lal-mirch-powder", "garam-masala"],
    ingredients: [
      "1 large baingan",
      "2 onions, fine chopped",
      "2 tomatoes, chopped",
      "4 garlic cloves, crushed",
      "2 green chillies",
      "3 tbsp mustard oil",
    ],
    steps: [
      {
        act: "prep",
        text: "Char the baingan whole on an open flame until the skin blisters black the whole way round.",
      },
      { act: "mash", text: "Peel it while it is still hot and mash it rough. Bharta is not a puree." },
      { act: "fry", text: "Onion and tomato browned hard, then dhaniya and lal mirch straight into the oil." },
      {
        act: "stir",
        text: "The mashed baingan in. Cook until it stops giving off water. Garam masala at the end.",
      },
    ],
    tip: "Char it further than looks sensible. Underdone baingan tastes green and no masala hides it.",
    serveWith: "Hot phulka and a spoon of white butter.",
    tone: "violet",
  },
  {
    slug: "masala-chai",
    title: "Kadak Masala Chai",
    hi: "कड़क मसाला चाय",
    dish: "Boiled, not steeped",
    course: "Quick",
    region: "Everywhere",
    time: "10 min",
    serves: "2",
    heat: 1,
    difficulty: "Easy",
    blurb:
      "Chai is boiled. Crush the whole spices in your palm first — an unbruised cardamom pod gives you nothing at all.",
    uses: ["elaichi-whole", "sunth-powder", "laung-whole"],
    ingredients: [
      "1.5 cups water",
      "1 cup full-fat milk",
      "2 tsp strong tea leaves",
      "4 green cardamom pods",
      "2 cloves",
      "A slice of fresh ginger",
      "Sugar, to taste",
    ],
    steps: [
      {
        act: "prep",
        text: "Crush elaichi and laung. Add to water with a slice of ginger and a pinch of sunth.",
      },
      { act: "boil", text: "Boil hard for two minutes before the tea goes anywhere near it." },
      { act: "stir", text: "Add leaves, boil again, then milk and sugar. Let it rise three times." },
      { act: "pour", text: "Strain from a height. It aerates and it looks better." },
    ],
    tip: "Sonth is the winter version. In summer leave it out and add more elaichi.",
    serveWith: "Whatever is in the tin. Preferably a rusk.",
    tone: "brown",
  },
  {
    slug: "aloo-chaat",
    title: "Aloo Chaat",
    hi: "आलू चाट",
    dish: "Eaten standing up, always",
    course: "Street",
    region: "Delhi",
    time: "20 min",
    serves: "2",
    heat: 2,
    difficulty: "Easy",
    blurb:
      "Chaat is a balance of sour, hot and salt held together by something crisp. Lose the crisp and you are eating a sad potato salad.",
    uses: ["chaat-masala", "jaljira", "amchur-powder"],
    ingredients: [
      "3 potatoes, boiled and cooled",
      "1 onion, fine chopped",
      "1 green chilli, chopped",
      "Green chutney",
      "Tamarind chutney",
      "Coriander, and a lemon",
      "Oil, to shallow-fry",
    ],
    steps: [
      {
        act: "prep",
        text: "Boil, cool and cube the potatoes. Cold cubes keep their edges instead of falling apart.",
      },
      { act: "fry", text: "Shallow-fry until the outside is properly crisp. Do not crowd the pan." },
      { act: "sprinkle", text: "Chaat masala and jaljira over the hot potatoes, off the heat." },
      {
        act: "stir",
        text: "Toss through amchur, both chutneys, onion and coriander. Serve it immediately.",
      },
    ],
    tip: "Dress it at the last second. Chaat that has been sitting is just wet potato.",
    serveWith: "Nothing. It is the whole thing.",
    tone: "dragonfruit",
  },
  {
    slug: "jeera-aloo",
    title: "Jeera Aloo",
    hi: "जीरा आलू",
    dish: "Four ingredients, no hiding",
    course: "Quick",
    region: "Everywhere",
    time: "15 min",
    serves: "2",
    heat: 1,
    difficulty: "Easy",
    blurb:
      "Nothing to hide behind. If the jeera is stale or the potato is wet, you will taste exactly that.",
    uses: ["jeera-whole", "haldi-powder", "amchur-powder"],
    ingredients: [
      "4 potatoes, boiled the day before",
      "1 tbsp cumin seeds",
      "2 tbsp ghee",
      "1 green chilli, slit",
      "Coriander, chopped",
    ],
    steps: [
      {
        act: "prep",
        text: "Boil potatoes the day before and chill them. Cold potato holds its edges.",
      },
      { act: "temper", text: "Bloom whole jeera in hot ghee until it darkens a shade — no further." },
      { act: "fry", text: "Potatoes in, haldi, salt. Leave them alone so a crust forms." },
      { act: "sprinkle", text: "Amchur and coriander off the heat." },
    ],
    tip: "Dry the potato properly. Wet potato steams instead of frying.",
    serveWith: "Dal and rice, or rolled into a paratha.",
    tone: "cobalt",
  },
];

export const getRecipe = (slug) => RECIPES.find((r) => r.slug === slug);
export const heroRecipe = () => RECIPES.find((r) => r.hero) ?? RECIPES[0];

/** The line every card shows above its title. Built, never stored twice. */
export const kickerOf = (r) => `${r.course} · ${r.region}`;

/** Devanagari step numerals. Long enough for the longest method we hold. */
export const DEVA_NUM = ["१", "२", "३", "४", "५", "६", "७"];

/* How the menu groups. Order matters — this is the order of the filter row. */
export const COURSES = ["Quick", "Weeknight", "Weekend", "Street"];

export const countByCourse = (course) =>
  course ? RECIPES.filter((r) => r.course === course).length : RECIPES.length;

/** Small numbers read better as words in this voice. */
const WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
];
export const spellOut = (n) => WORDS[n] ?? String(n);

/**
 * The nine things that happen in a kitchen.
 *
 * `serve` never appears in a recipe's steps — it is what he does once the
 * last one is finished.
 */
export const COOK_ACTIONS = {
  prep: { hi: "तैयारी", en: "Prep", verb: "chopping" },
  temper: { hi: "तड़का", en: "Tadka", verb: "tempering" },
  fry: { hi: "भूनना", en: "Bhuno", verb: "frying" },
  boil: { hi: "उबालना", en: "Boil", verb: "boiling" },
  stir: { hi: "चलाना", en: "Stir", verb: "stirring" },
  mash: { hi: "मसलना", en: "Mash", verb: "mashing" },
  sprinkle: { hi: "चुटकी", en: "Chutki", verb: "seasoning" },
  pour: { hi: "डालना", en: "Pour", verb: "pouring" },
  serve: { hi: "परोसना", en: "Serve", verb: "serving" },
};

export const getAction = (act) => COOK_ACTIONS[act] ?? COOK_ACTIONS.stir;

/**
 * Tailwind-safe tone map — these class strings must appear literally so the
 * compiler keeps them. One per recipe, so the grid never repeats a colour.
 *
 * Every pairing below clears 4.5:1, measured, not eyeballed. The bright
 * fills (rani, dragonfruit, violet, tomato, carrot) do NOT: paper on rani is
 * 4.22 and paper on carrot is 3.19, so those cards use the palette's darker
 * `-deep` / `-ink` variants as the ground instead. That is exactly what those
 * variants exist for.
 *
 * The other half of the rule lives in the card markup: never fade this text
 * with `opacity-*`. Opacity blends toward the background, so `text-paper` at
 * 80% on carrot measured 2.54 even though the colour itself is fine.
 */
export const RECIPE_TONE = {
  /* light grounds — dark text */
  marigold: { bg: "bg-marigold", text: "text-ink", accent: "text-oxblood" }, // 12.17 / 7.37
  sun: { bg: "bg-sun", text: "text-ink", accent: "text-oxblood" }, //            11.42 / 6.92
  kiwi: { bg: "bg-kiwi", text: "text-ink", accent: "text-forest" }, //            6.86 / 4.53

  /* dark grounds — light text */
  forest: { bg: "bg-forest", text: "text-ghee", accent: "text-marigold" }, //    9.63 / 8.03
  oxblood: { bg: "bg-oxblood", text: "text-paper", accent: "text-marigold" }, // 10.66 / 7.37
  brown: { bg: "bg-brown", text: "text-ivory", accent: "text-sun" }, //           8.30 / 5.38
  cobalt: { bg: "bg-cobalt", text: "text-paper", accent: "text-sun" }, //         7.12 / 4.62
  violet: { bg: "bg-violet-ink", text: "text-paper", accent: "text-marigold" }, // 7.82 / 5.41
  dragonfruit: { bg: "bg-dragonfruit-ink", text: "text-paper", accent: "text-marigold" }, // 6.87 / 4.75
  rani: { bg: "bg-rani-deep", text: "text-paper", accent: "text-marigold" }, //   6.75 / 4.67
  tomato: { bg: "bg-chilli-ink", text: "text-paper", accent: "text-ghee" }, //    5.78 / 4.79
  /* Was carrot. Every orange in the palette fails as a ground for a light
     accent — carrot-ink tops out at 4.21 with ghee — so the twelfth card
     takes the deep green instead. */
  derbyshire: { bg: "bg-derbyshire", text: "text-paper", accent: "text-marigold" }, // 8.31 / 5.75
};
