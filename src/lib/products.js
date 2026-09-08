/**
 * Sunder Masala — catalogue + shop taxonomy.
 *
 * CATEGORIES is the taxonomy the shop runs on: the four collections the live
 * store actually sells under. RANGES is the brand's own framing and now holds
 * only the one range that ships.
 */

import { fillFor, inkVariant, readableOn } from "@/lib/color";
import { SKU_DETAILS, leadVariant } from "@/lib/sku-details";

/* Only Essentials ships. The Heritage and Regions ranges were announced in
   the brand deck and carried here as empty, "coming soon" shelves — they are
   no longer surfaced anywhere on the site, so they are no longer modelled.
   The real shop taxonomy is CATEGORIES below. */
export const RANGES = {
  essentials: {
    id: "essentials",
    name: "Essentials",
    full: "Sunder Essentials · Express",
    who: "The everyday cook",
    line: "Ek chutki, full fire.",
    blurb:
      "Pure, potent, quick-commerce ready. The staple that lives at the front of the spice box.",
    voice: ["Fast", "Punny", "Pure"],
    bg: "var(--color-chilli)",
    ink: "var(--color-paper)",
    accent: "var(--color-marigold)",
    accentHex: "#ffc740",
    tw: { bg: "bg-chilli", text: "text-paper", accent: "text-marigold" },
    font: "font-poster",
    icon: "pinch",
  },
};

export const RANGE_LIST = [RANGES.essentials];

/* ── Categories — the real shop taxonomy ──────────────────
   These are the four collections the live sundermasala.com store actually
   sells under, and they partition the catalogue exactly: 13 + 9 + 8 + 2 = 32.

   A category is a shelf fact ("what is in the packet"), so every SKU has one
   and every category has SKUs — which is why this, and not RANGES, is what
   the shop filters, the nav and the footer are built from. */
export const CATEGORIES = {
  blended: {
    id: "blended",
    name: "Blended Spices",
    full: "Sunder Blended Spices",
    line: "Poora masala, ek packet mein.",
    blurb:
      "The ground-and-mixed shelf. Many spices, roasted and milled to one recipe, so a dish takes one spoon instead of nine jars.",
    bg: "var(--color-oxblood)",
    ink: "var(--color-marigold)",
    icon: "jar",
  },
  pure: {
    id: "pure",
    name: "Pure Spices",
    full: "Sunder Pure Spices",
    line: "Ek cheez. Bas woh cheez.",
    blurb:
      "Single spices, ground and nothing else. No filler, no colour, no bulking agent — haldi that is only haldi.",
    bg: "var(--color-saffron)",
    ink: "var(--color-ink)",
    icon: "turmeric",
  },
  whole: {
    id: "whole",
    name: "Whole Spices",
    full: "Sunder Whole Spices",
    line: "Sabut. Jaisa ped se aaya.",
    blurb:
      "Uncut seed and pod, for the tadka and the grinder at home. The oil is still inside — it comes out in the pan, not in the packet.",
    bg: "var(--color-forest)",
    ink: "var(--color-ghee)",
    icon: "cumin",
  },
  asafoetida: {
    id: "asafoetida",
    name: "Hing",
    full: "Sunder Hing",
    line: "Ek chutki, poora tadka.",
    blurb:
      "Hing on its own shelf, because it behaves like nothing else in the box — a pinch does the work of a handful.",
    bg: "var(--color-cobalt)",
    ink: "var(--color-marigold)",
    icon: "pinch",
  },
};

/* Shelf order: biggest shelf first, hing last — it is two SKUs and a
   specialist buy, not somewhere to start browsing. */
export const CATEGORY_LIST = [
  CATEGORIES.blended,
  CATEGORIES.pure,
  CATEGORIES.whole,
  CATEGORIES.asafoetida,
];

/* Membership by slug rather than a `category:` line inside each of the 32
   literals — kept here it can be read as a whole and checked against the
   live collection pages in one glance, and the assertion below catches a
   typo or a missed SKU at import time instead of on a silently short shelf. */
const CATEGORY_MEMBERS = {
  blended: [
    "garam-masala",
    "kitchen-king",
    "shahi-paneer-masala",
    "pav-bhaji-masala",
    "chole-masala",
    "sambhar-masala",
    "raita-masala",
    "chaat-masala",
    "jaljira",
    "kasuri-methi",
    "dal-masala",
    "jeeravan-poha-masala",
    "achar-masala",
  ],
  pure: [
    "lal-mirch-powder",
    "kuti-teja-mirch",
    "haldi-powder",
    "dhaniya-powder",
    "amchur-powder",
    "kashmiri-mirchi-powder",
    "kali-mirch-powder",
    "safed-mirch-powder",
    "sunth-powder",
  ],
  whole: [
    "jeera-whole",
    "rai-whole",
    "kali-mirch-whole",
    "laung-whole",
    "methi-dana-whole",
    "ajwain-whole",
    "elaichi-whole",
    "sauf-whole",
  ],
  asafoetida: ["shahi-hing", "asafoetida-hing"],
};

export const PRODUCTS = [
  {
    slug: "shahi-hing",
    name: "Shahi Hing",
    kind: "Hing",
    range: "essentials",
    tagline: "The pinch that runs the kitchen.",
    hindi: "एक चुटकी, पूरा तड़का।",
    badge: "Purest grade",
    heat: 0,
    icon: "pinch",
    hue: ["#6f1a10", "#8b2517"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-shahi-hing.webp",
    story:
      "Shahi Hing from the Sunder range — processed and packed in a hygienic plant, with no artificial colours or preservatives.",
    featured: true,
  },
  {
    slug: "asafoetida-hing",
    name: "Hing",
    /* Kept distinct from `name` on purpose — the two render right on top of
       each other on the product page (title, then subtitle) and the site's
       own tasting-bench AROMA table keys off this string, so it also has to
       stay in sync there if it ever changes again. */
    kind: "Hing Powder",
    range: "essentials",
    tagline: "Ninety-nine percent sell compound. We do not.",
    hindi: "असली हींग, बिना मिलावट।",
    badge: "100% pure",
    heat: 0,
    icon: "jar",
    hue: ["#8b2517", "#b4301c"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/asafoetida-hing.webp",
    story:
      "Sunder The purest Hing Available in the market as 99% of companies are selling compounded Hing containing a mixture of wheat flour and gum. A very littel quantity of sunder hing gives best teste to your food. 100% Pure Highly Aromatic",
  },
  {
    slug: "dal-masala",
    name: "Dal Masala",
    kind: "Dal Masala",
    range: "essentials",
    tagline: "Chana, tuar, makhani — all three.",
    hindi: "हर दाल का अपना मसाला।",
    heat: 2,
    icon: "fenugreek",
    hue: ["#b36d14", "#f2b30a"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-dal-masala.webp",
    story:
      "Make every bite aromatic and full of flavor with its rich taste. Sourced from the best of farms, the spices contain naturally rich flavors.",
    uses: "It can be used for making chana dal, tuar dal, dal mahni",
  },
  {
    slug: "jaljira",
    name: "Jaljira",
    kind: "Jaljira",
    range: "essentials",
    tagline: "Relief, for the heat of summer.",
    hindi: "गर्मी का इलाज, एक गिलास में।",
    heat: 1,
    icon: "cumin",
    hue: ["#4b5d22", "#7fa928"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-jaljira.webp",
    story:
      "Sunder Jaljeera Masala is a unique blend of fresh",
    uses: "Sprinkle on fruits, salad, soup, raita, tikka, chaat, barbeque, popcorn, fried snacks, chutneys, fruit juices, sugarcane juice, Pani puri, etc.",
  },
  {
    slug: "achar-masala",
    name: "Achar",
    kind: "Achar Masala",
    range: "essentials",
    tagline: "Ready to use. No mixing required.",
    hindi: "दादी वाला अचार, बिना मेहनत।",
    heat: 3,
    icon: "chilli",
    hue: ["#d5231a", "#f13a59"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-achar-masala.webp",
    story:
      "Sunder achar masala is made of purely natural",
    uses: "Mango Aam ka achar, Lemon achar, Mirch achar, Mix Vegetables achar etc. Ready to Use Instant Achar Masala No Need to Mix Any Other Spices.",
  },
  {
    slug: "sambhar-masala",
    name: "Sambhar",
    kind: "Sambhar Masala",
    range: "essentials",
    tagline: "Idli, dosa, appam — all of it.",
    hindi: "दक्षिण का असली स्वाद।",
    heat: 3,
    icon: "fenugreek",
    hue: ["#b36d14", "#e58c1a"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-sambar-masala.webp",
    story:
      "With our Sunder Sambhar Masala, you can enhance the flavor of your go-to side dish for Idlis, Dosas, and Appams.",
  },
  {
    slug: "pav-bhaji-masala",
    name: "Pav Bhaji",
    kind: "Pav Bhaji Masala",
    range: "essentials",
    tagline: "Chowpatty, on your tawa.",
    hindi: "मुंबई का स्वाद, घर पर।",
    heat: 3,
    icon: "chilli",
    hue: ["#d5231a", "#e8563a"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-pav-bhaji-masala.webp",
    story:
      "Sunder pav bhaji masala is 100% natural, with no added preservatives.",
    uses: "Best for the pav bhaji but you can also use it in Aalu, Gobhi, palak, Shimla Mirch, sabzi masala, etc.",
  },
  {
    slug: "chaat-masala",
    name: "Chaat",
    kind: "Chaat Masala",
    range: "essentials",
    tagline: "The sprinkle that fixes anything.",
    hindi: "ऊपर से छिड़का, बात बन गई।",
    heat: 2,
    icon: "mustard",
    hue: ["#7a6b4d", "#c9a97b"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-chaat-masala.webp",
    story:
      "A perfect blend of premium",
    uses: "It h as the ability to transform the flavor profile of any fruit, vegetable, juice, appetizer, or entrée.",
  },
  {
    slug: "chole-masala",
    name: "Chole",
    kind: "Chole Masala",
    range: "essentials",
    tagline: "Purani Dilli, under pressure.",
    hindi: "छोले ऐसे, जैसे दिल्ली में।",
    heat: 3,
    icon: "starAnise",
    hue: ["#6f1a10", "#8b2517"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-chole-masala-chana-masala.webp",
    story:
      "Sunder Chole masala has an authentic taste and flavor. Chhole masala is a perfect blend of all spices and enhances the taste of your dish. Lip-smacking taste, super convenient & cooks in minutes.",
    uses: "I t is rich in spices which makes food tasty and delicious.",
  },
  {
    slug: "jeeravan-poha-masala",
    name: "Jeeravan",
    kind: "Jeeravan",
    range: "essentials",
    tagline: "Indori poha ki jaan.",
    hindi: "इंदौर, अब हर थाली में।",
    badge: "MP special",
    heat: 2,
    icon: "cumin",
    hue: ["#e58c1a", "#f2b30a"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-jeeravan-poha-masala.webp",
    story:
      "Sunder Poha Masala is 100% natural and best suitable for chatpata dishes. Just a Pinch is Enough to add Rich Flavour & Aroma to your food dishes.",
    uses: "Sprinkle the Jeeravan on sandwiches, fruits, salads, sprouts, Chaat papdi, Poha & many more and enjoy the tongue-smacking taste.",
  },
  {
    slug: "methi-dana-whole",
    name: "Methi Dana",
    kind: "Methi Dana",
    range: "essentials",
    tagline: "Bitter on purpose.",
    hindi: "कड़वा है, पर ज़रूरी है।",
    heat: 0,
    icon: "fenugreek",
    hue: ["#7a6b4d", "#b36d14"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-methi-dana-fenu-greek.webp",
    story:
      "Sunder Organic Methi dana is a common ingredient in vegetables, pickles, and different types of masalas. It is a good source of soluble fiber and is excellent for digestion. It also aids in curing heartburn, fever, and sore throat.",
    uses: "Used in boosting the immune system and ensuring good health as well. Processed & Packed in Hygienic Environment.",
  },
  {
    slug: "rai-whole",
    name: "Rai",
    kind: "Mustard Seeds",
    range: "essentials",
    tagline: "The crackle that starts the dish.",
    hindi: "चटकती है, तभी तो स्वाद।",
    heat: 2,
    icon: "mustard",
    hue: ["#b36d14", "#f2b30a"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-rai-mustard-seeds.webp",
    story:
      "Sunder mustard seeds contain a higher proportion of the volatile mustard oil and the strongest flavor. Mustard seed, one of the oldest old spices, adds warmth and heat to your dishes.",
    uses: "Used as a health-benefiting spice, exotica mustard seeds are indeed very rich in a phytonutrient, minerals, vitamins, and antioxidants. Processed & Packed in Hygienic Environment.",
  },
  {
    slug: "ajwain-whole",
    name: "Ajwain",
    kind: "Carom Seeds",
    range: "essentials",
    tagline: "A distinct aroma in the tadka.",
    hindi: "तड़के में डालो, ख़ुशबू आ जाए।",
    heat: 1,
    icon: "cumin",
    hue: ["#4b5d22", "#7a6b4d"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-ajwain-carom-seeds.webp",
    story:
      "Sunder Ajwain has a unique texture and adds a pleasing & distinct aroma when added in Tadkaa.",
    uses: "Used for gastritis and indigestion, this seed is perfect for those that want to improve their digestion. Processed & Packed in Hygienic Environment.",
  },
  {
    slug: "sauf-whole",
    name: "Sauf",
    kind: "Fennel Seeds",
    range: "essentials",
    tagline: "Curry, sweet, or the end of the meal.",
    hindi: "खाने के बाद, मुँह मीठा।",
    heat: 0,
    icon: "coriander",
    hue: ["#4b5d22", "#7fa928"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-fennel-seeds-sauf.webp",
    story:
      "Sunder fennel seeds have an a uthentic aroma and flavor that enhances the taste of your dishes.",
    uses: "Ideal for traditional dishes like curries, sweets, and other veg or non- veg dishes; can also be used as a mouth freshener",
  },
  {
    slug: "jeera-whole",
    name: "Jeera",
    kind: "Cumin Seeds",
    range: "essentials",
    tagline: "Consistency, all year round.",
    hindi: "हर तड़के की शुरुआत।",
    heat: 1,
    icon: "cumin",
    hue: ["#6b3e2e", "#b36d14"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-cumin-seeds-jeera.webp",
    story:
      "Consistency In Taste, Aroma, And",
    uses: "It Helps You To Add An Earthy And Warming To Food, Making It A Staple In Certain Stews And Soups.",
  },
  {
    slug: "laung-whole",
    name: "Laung",
    kind: "Cloves",
    range: "essentials",
    tagline: "Strong taste, right aroma.",
    hindi: "एक लौंग, पूरा असर।",
    heat: 2,
    icon: "clove",
    hue: ["#6b3e2e", "#8b2517"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-laung-cloves.webp",
    story:
      "It has a strong Taste and the Right aroma. We provide High-",
    uses: "Cloves offer many health benefits, some of which include providing aid in digestion and having antimicrobial properties.",
  },
  {
    slug: "kali-mirch-whole",
    name: "Kali Mirch Sabut",
    kind: "Kali Mirch",
    range: "essentials",
    tagline: "High in piperine. You will notice.",
    hindi: "साबुत, ताज़ा पिसी।",
    heat: 3,
    icon: "peppercorn",
    hue: ["#241b13", "#4a3a29"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-kali-mirch-black-pepper.webp",
    story:
      "Naturally & Sustainably grown and Processed. High in Essential Oil, Piperine. Dark peppercorns signify a Flavorful Taste & Peppery Heat.",
    uses: "Black Pepper can be used in Curries, Soups & all types of vegetarian and non-vegetarian dishes.",
  },
  {
    slug: "elaichi-whole",
    name: "Elaichi",
    kind: "Elaichi",
    range: "essentials",
    tagline: "Sweet, and a natural mouth freshener.",
    hindi: "मिठास और ख़ुशबू, दोनों।",
    heat: 0,
    icon: "cardamom",
    hue: ["#4b5d22", "#7fa928"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-elaichi-green-cardamom.webp",
    story:
      "Sunder Cardamom is 100% Pure & Natural. Elaichi or cardamom is one of the most common spices seen in an Indian household.",
    uses: "It has a sweet taste and unique flavor to your dishes, it is also widely used as a natural mouth freshener.",
  },
  {
    slug: "kitchen-king",
    name: "Kitchen King",
    kind: "Kitchen King Masala",
    range: "essentials",
    tagline: "One blend, the whole raj.",
    hindi: "एक डिब्बा, पूरी रसोई।",
    heat: 2,
    icon: "jar",
    hue: ["#0e3b2c", "#1e6b4c"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-kitchen-king-masala.webp",
    story:
      "Rich in taste and aroma. An exotic blend made from the choicest of",
    uses: "Can be used while cooking to enhance the taste. Ideal for vegetable dishes with soft curry.",
    featured: true,
  },
  {
    slug: "raita-masala",
    name: "Raita",
    kind: "Raita Masala",
    range: "essentials",
    tagline: "Curd without it is just curd.",
    hindi: "रायते की जान।",
    heat: 1,
    icon: "cumin",
    hue: ["#7a6b4d", "#c9a97b"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-raita-masala.webp",
    story:
      "Fresh, Healthy, and 100% Natural product. Tasty and Good for Your Health.",
    uses: "An Essential Condiment for all Indian kitchens.",
  },
  {
    slug: "kasuri-methi",
    name: "Kasuri Methi",
    kind: "Kasuri Methi",
    range: "essentials",
    tagline: "Crush it between your palms.",
    hindi: "हथेली में मसलो, ख़ुशबू छोड़ो।",
    heat: 0,
    icon: "fenugreek",
    hue: ["#4b5d22", "#7fa928"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-kasuri-methi.webp",
    /* The scraped copy for this one arrived as the single word "Fine", which
       is what the product page and its description both printed. Rewritten
       from what kasuri methi actually is — no claims added that the pack
       does not make. Ten more products still carry truncated stories. */
    story:
      "Dried fenugreek leaves, left whole so they keep their aroma until you want it. Crushed between the palms straight over the pan, they give the deep, faintly bitter note that makes a dal or a paneer gravy taste finished instead of flat.",
    uses: "Crush a pinch between your palms and add it at the end — to dal, methi malai paneer, butter gravies, or worked into paratha dough.",
  },
  {
    slug: "shahi-paneer-masala",
    name: "Shahi Paneer",
    kind: "Shahi Paneer Masala",
    range: "essentials",
    tagline: "Instant premix, with cashew.",
    hindi: "मलाई जैसी, शाही असली।",
    heat: 1,
    icon: "cardamom",
    hue: ["#16523c", "#1e6b4c"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-shahi-paneer-masala.webp",
    story:
      "Sunder Shahi Paneer masala is an Instant premix with Cashews. Add an amazing taste, color, and flavor to the dish. To make food tasty and delicious. An exquisite blend of rich and premium spices.",
  },
  {
    slug: "garam-masala",
    name: "Garam Masala",
    kind: "Garam Masala Powder",
    range: "essentials",
    tagline: "The one jar every kitchen trusts.",
    hindi: "हर रसोई का भरोसा।",
    badge: "Best seller",
    heat: 3,
    icon: "starAnise",
    hue: ["#6f1a10", "#8b2517"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-garam-masala.webp",
    story:
      "Sunder Garam masala is the perfect spice mix for all your Indian cooking needs. Sunder Garam Masala is a unique blend of spices that has been carefully crafted over centuries. Our Garam masala is deeper in color and spicier in taste. It's the perfect addition to any dinner or curry and is nice on everything from vegetables to salads. This Garam Masala adds the perfect burst of flavor to your everyday meals.",
    uses: "This spice blend is a vital ingredient found in almost all Indian kitchens and used in daily cooking.",
    featured: true,
  },
  {
    slug: "kuti-teja-mirch",
    name: "Kuti Teja",
    kind: "Kuti Teja Mirch Powder",
    range: "essentials",
    tagline: "For the ones who ask for it hotter.",
    hindi: "और तीखा? ये लीजिए।",
    badge: "Extra hot",
    heat: 5,
    icon: "flame",
    hue: ["#8b2517", "#d5231a"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-kuti-teja-mirch-powder.webp",
    story:
      "Fresh, Healthy, and 100% Natural organic red Kuti Teja Mirchi has a unique flavor give yourself something with a naturally rich and smooth taste, featuring a perfectly balanced flavor, and a nice texture.",
    uses: "It is used to add heat or spice to dishes. Prepare the most authentic and flavourful dishes with our Kuta Teja Mirchi powder.",
  },
  {
    slug: "sunth-powder",
    name: "Sonth",
    kind: "Dry Ginger Powder",
    range: "essentials",
    tagline: "Winter in a spoon.",
    hindi: "सर्दी का इलाज, रसोई में।",
    heat: 2,
    icon: "sprig",
    hue: ["#b36d14", "#e58c1a"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-dry-ginger-powder-sunth-powder.webp",
    story:
      "100% Certified Organic Product. Every Pure Tree Organic product can be traced back to its origin.",
    uses: "Use it as a seasoning agent while preparing gingerbreads, cakes, cookies, and ginger beer.",
  },
  {
    slug: "kali-mirch-powder",
    name: "Kali Mirch",
    kind: "Black Pepper Powder",
    range: "essentials",
    tagline: "The table's oldest argument-settler.",
    hindi: "हर मेज़ पर, हर वक़्त।",
    heat: 3,
    icon: "peppercorn",
    hue: ["#241b13", "#4a3a29"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-black-pepper-powder-kali-mirch-powder.webp",
    story:
      "Black pepper powder in the sprinkler is a staple dinner-table condiment. 100% Pure Black peppercorns ground. Made from the best",
    uses: "It is also helpful in medicinal aspects since it is a basis of manganese, iron, vitamin C, potassium, and dietary fiber.",
  },
  {
    slug: "safed-mirch-powder",
    name: "Safed Mirch",
    kind: "White Pepper Powder",
    range: "essentials",
    tagline: "Heat you taste but never see.",
    hindi: "दिखे नहीं, लगे ज़रूर।",
    heat: 3,
    icon: "peppercorn",
    hue: ["#7a6b4d", "#c9a97b"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-white-pepper-powder-safed-mirch-powder.webp",
    story:
      "Unbleached Natural White Pepper. Sunder white pepper is sourced directly from the farmers and then is washed, dried, dehydrated, and then controlled for humidity and temperature before packaging.",
    uses: "Use as per taste or as directed in various recipes.",
  },
  {
    slug: "kashmiri-mirchi-powder",
    name: "Kashmiri Mirchi",
    kind: "Kashmiri Mirchi Powder",
    range: "essentials",
    tagline: "All the colour. Almost none of the fight.",
    hindi: "रंग पूरा, तीखा ज़रा भी नहीं।",
    heat: 1,
    icon: "chilli",
    hue: ["#b4301c", "#d03821"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-kashmiri-mirchi-powder.webp",
    story:
      "Sunder Kashmiri Chilli Powder has negligible pungency and is rich in flavor. Our Kashmiri Chilly Powder gives a deep red color to the dishes and can complement cuisines.",
    uses: "It is used for its color and does not add much heat to the dish. Prepare the most authentic and flavourful dishes with our Kashmiri Laal Mirchi powder.",
  },
  {
    slug: "amchur-powder",
    name: "Amchur",
    kind: "Amchur Powder",
    range: "essentials",
    tagline: "Sourness without the squeeze.",
    hindi: "खटास, बिना निचोड़े।",
    heat: 0,
    icon: "jar",
    hue: ["#e58c1a", "#f2b30a"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-amchur-powder.webp",
    story:
      "Veg and non-veg dishes are also enhanced with the help of Amchur Powder. It has Tenderising Qualities, similar to lime and lemon juice.",
    uses: "U sed to Add More Flavour to Curries, Chutneys, Soups & Marinades.",
  },
  {
    slug: "dhaniya-powder",
    name: "Dhaniya",
    kind: "Coriander Powder",
    range: "essentials",
    tagline: "The seed no one notices.",
    hindi: "हर ग्रेवी की बुनियाद।",
    heat: 0,
    icon: "coriander",
    hue: ["#4b5d22", "#1e6b4c"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-coriander-powder-dhaniya-powder.webp",
    story:
      "Sunder Coriander Powder is rich in flavor and taste, a must-have ingredient. Our Coriander Powder gives a distinct aroma and color to dishes.",
    uses: "Very Soft Textured Powder that has high nutritional value.",
    featured: true,
  },
  {
    slug: "haldi-powder",
    name: "Haldi",
    kind: "Turmeric Powder",
    range: "essentials",
    tagline: "Rasoi ka sona.",
    hindi: "रसोई का सोना।",
    heat: 0,
    icon: "turmeric",
    hue: ["#f2b30a", "#ffc740"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-turmeric-powder-haldi-powder.webp",
    story:
      "Enjoy the rich taste of Sunder Turmeric Powder in all your favorite dishes. 100% Natural, Pure & Healthy Turmeric Powder.",
    uses: "Very Soft Textured Powder that has high nutritional value and also boosts Immune System.",
    featured: true,
  },
  {
    slug: "lal-mirch-powder",
    name: "Lal Mirch",
    kind: "Red Chilli Powder",
    range: "essentials",
    tagline: "Ek chutki, full fire.",
    hindi: "थोड़ी सी, पूरी आग।",
    badge: "Best seller",
    heat: 4,
    icon: "chilli",
    hue: ["#d5231a", "#e8563a"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-red-chilli-powder-lal-mirch-powder.webp",
    story:
      "Natural red chili powder. Sunder red chili powder has made from top-notch",
    uses: "You can use it in the dal, vegetables, meat preparation, and other delicacies in the kitchen.",
    featured: true,
  },
];

/* ── Pack sizes, MRP and ingredients ──────────────────────
   The brand's master sheet is the authority for what a pack costs and what is
   in it, so those fields are read off SKU_DETAILS rather than typed here — the
   two sets of numbers drifted badly while they were maintained separately
   (haldi read ₹24 against a real MRP of ₹46, Shahi Hing ₹410 against ₹310).

   `price` and `size` stay on the product so every existing caller keeps
   working; they now describe the lead pack instead of a hand-entered guess. */
for (const p of PRODUCTS) {
  const detail = SKU_DETAILS[p.slug];
  if (!detail) continue;

  p.variants = detail.variants;
  p.ingredients = detail.ingredients;
  p.variety = detail.variety;

  const lead = leadVariant(p.slug);
  p.price = lead.mrp;
  p.size = lead.size;
  p.sizes = detail.variants.map((v) => v.size);
}

/* Same reasoning as the orphan check below: a SKU with no sheet entry would
   silently keep whatever stale price was typed into the catalogue. */
if (process.env.NODE_ENV !== "production") {
  const undocumented = PRODUCTS.filter((p) => !SKU_DETAILS[p.slug]).map((p) => p.slug);
  if (undocumented.length) {
    throw new Error(`products.js: no sku-details entry for ${undocumented.join(", ")}`);
  }
}

/* ── Derived accessible colours ───────────────────────────
   `hue` is tuned for fills. Text needs different values, so derive them
   once here rather than eyeballing a second hex per product. */
for (const p of PRODUCTS) {
  // The hue as readable text on cream — also doubles as a dark fill for pills.
  p.hueInk = inkVariant(p.hue[0], 4.5);
  // Hero gradient, deepened so light type stays legible on the yellow blends.
  p.hueFill = [fillFor(p.hue[0], 4.6), fillFor(p.hue[1], 4.6)];
  // The pack front keeps its true, unmuddied hue and flips the type instead —
  // a bright haldi pack with ink type, not a darkened haldi pack with white.
  p.packText = readableOn(p.hue[0]);
  p.packMuted =
    p.packText === "var(--color-ink)" ? "rgba(20,16,12,0.68)" : "rgba(253,246,232,0.78)";
}

/* ── Category assignment ──────────────────────────────────
   Inverted from CATEGORY_MEMBERS once, then written onto each product so the
   rest of the app reads `p.category` exactly the way it reads `p.range`. */
const CATEGORY_OF = Object.fromEntries(
  Object.entries(CATEGORY_MEMBERS).flatMap(([id, slugs]) => slugs.map((s) => [s, id]))
);

for (const p of PRODUCTS) {
  p.category = CATEGORY_OF[p.slug];
}

/* A SKU with no shelf would vanish from every category filter while still
   showing in "Everything" — the kind of fault that reads as a missing product
   rather than a data error. Fail loudly at import instead. */
if (process.env.NODE_ENV !== "production") {
  const orphans = PRODUCTS.filter((p) => !p.category).map((p) => p.slug);
  if (orphans.length) {
    throw new Error(`products.js: no category for ${orphans.join(", ")}`);
  }
  const unknown = Object.keys(CATEGORY_OF).filter((s) => !PRODUCTS.some((p) => p.slug === s));
  if (unknown.length) {
    throw new Error(`products.js: CATEGORY_MEMBERS names unknown slug ${unknown.join(", ")}`);
  }
}

/* ── Helpers ──────────────────────────────────────────── */

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);

export const productsByRange = (range) =>
  range === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.range === range);

export const productsByCategory = (category) =>
  category === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

/* Kept for any caller that still guards on it: with the unstocked ranges
   gone this is always false, but a range added later with no SKUs in it
   would light the "coming soon" states back up on its own. */
export const isComingSoon = (range) => productsByRange(range).length === 0;

export const featuredProducts = () => PRODUCTS.filter((p) => p.featured);

/* The shop's "start here" row. Named explicitly rather than taken off the top
   of `featured`, which is in catalogue order and leads with a ₹410 hing — the
   last thing to hand someone who has never bought from us. */
export const starterProducts = () =>
  ["garam-masala", "haldi-powder", "lal-mirch-powder"].map(getProduct).filter(Boolean);

/* Was `p.range === product.range`, which is every one of the 32 packs — so
   "more like this" under a whole jeera offered chaat masala. Category is the
   shelf a shopper is actually standing at, so it goes first; the rest of the
   catalogue backfills only when a shelf is smaller than `limit`. */
export const relatedProducts = (product, limit = 3) => {
  const others = PRODUCTS.filter((p) => p.slug !== product.slug);
  const sameShelf = others.filter((p) => p.category === product.category);
  const rest = others.filter((p) => p.category !== product.category);
  return [...sameShelf, ...rest].slice(0, limit);
};

export const formatPrice = (n) => `₹${n.toLocaleString("en-IN")}`;
