/**
 * Sunder Masala — catalogue + range taxonomy.
 * Three ranges, three appetites (per the brand strategy deck).
 */

import { fillFor, inkVariant, readableOn } from "@/lib/color";

export const RANGES = {
  heritage: {
    id: "heritage",
    name: "Heritage",
    full: "Sunder Heritage",
    who: "The occasion cook",
    line: "From the courts of Awadh, to your table.",
    blurb:
      "Slow-ground, festive, inherited. Recipes handed down — never invented for a trend.",
    voice: ["Heritage", "Hereditary", "Confident", "Sourced"],
    bg: "var(--color-forest)",
    ink: "var(--color-ghee)",
    accent: "var(--color-marigold)",
    tw: { bg: "bg-forest", text: "text-ghee", accent: "text-marigold" },
    /* accent type, per the brand font spec */
    font: "font-heritage",
    icon: "starAnise",
  },
  regions: {
    id: "regions",
    name: "Regions",
    full: "Sunder Regions",
    who: "The rooted foodie",
    line: "Apna region, apni thali.",
    blurb:
      "Hyper-local blends you cannot find on a national shelf. One region, one hero dish, one masala.",
    voice: ["Sarcastic", "Punny", "Intentional"],
    bg: "var(--color-saffron)",
    ink: "var(--color-ink)",
    accent: "var(--color-oxblood)",
    tw: { bg: "bg-saffron", text: "text-ink", accent: "text-oxblood" },
    font: "font-regional",
    icon: "thela",
  },
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
    tw: { bg: "bg-chilli", text: "text-paper", accent: "text-marigold" },
    font: "font-poster",
    icon: "pinch",
  },
};

export const RANGE_LIST = [RANGES.heritage, RANGES.regions, RANGES.essentials];

export const PRODUCTS = [
  {
    slug: "shahi-hing",
    name: "Shahi Hing",
    kind: "Asafoetida (Hing)",
    range: "heritage",
    tagline: "The pinch that runs the kitchen.",
    hindi: "एक चुटकी, पूरा तड़का।",
    badge: "Purest grade",
    price: 410,
    size: "50g",
    sizes: ["50g"],
    heat: 0,
    icon: "pinch",
    hue: ["#6f1a10", "#8b2517"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-shahi-hing.webp",
    imagePlate: true,
    story:
      "Shahi Hing from the Sunder range — processed and packed in a hygienic plant, with no artificial colours or preservatives.",
  },
  {
    slug: "asafoetida-hing",
    name: "Asafoetida",
    kind: "Asafoetida (Hing)",
    range: "heritage",
    tagline: "Ninety-nine percent sell compound. We do not.",
    hindi: "असली हींग, बिना मिलावट।",
    badge: "Bulk pack",
    price: 1750,
    size: "50 GM ( 5 x 10 Packs )",
    sizes: ["50 GM ( 5 x 10 Packs )"],
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
    range: "regions",
    tagline: "Chana, tuar, makhani — all three.",
    hindi: "हर दाल का अपना मसाला।",
    price: 40,
    size: "50 GM",
    sizes: ["50 GM"],
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
    range: "regions",
    tagline: "Relief, for the heat of summer.",
    hindi: "गर्मी का इलाज, एक गिलास में।",
    price: 50,
    size: "100 GM",
    sizes: ["100 GM"],
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
    range: "regions",
    tagline: "Ready to use. No mixing required.",
    hindi: "दादी वाला अचार, बिना मेहनत।",
    price: 56,
    size: "200 GM",
    sizes: ["200 GM", "500 GM"],
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
    range: "regions",
    tagline: "Idli, dosa, appam — all of it.",
    hindi: "दक्षिण का असली स्वाद।",
    price: 36,
    size: "50 GM",
    sizes: ["50 GM", "100 GM"],
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
    range: "regions",
    tagline: "Chowpatty, on your tawa.",
    hindi: "मुंबई का स्वाद, घर पर।",
    price: 40,
    size: "50 GM",
    sizes: ["50 GM", "100 GM"],
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
    range: "regions",
    tagline: "The sprinkle that fixes anything.",
    hindi: "ऊपर से छिड़का, बात बन गई।",
    price: 34,
    size: "50 GM",
    sizes: ["50 GM", "100 GM"],
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
    range: "regions",
    tagline: "Purani Dilli, under pressure.",
    hindi: "छोले ऐसे, जैसे दिल्ली में।",
    price: 40,
    size: "50 GM",
    sizes: ["50 GM", "100 GM"],
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
    range: "regions",
    tagline: "Indori poha ki jaan.",
    hindi: "इंदौर, अब हर थाली में।",
    badge: "MP special",
    price: 25,
    size: "100 GM",
    sizes: ["100 GM", "500 GM"],
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
    price: 10,
    size: "5 GM",
    sizes: ["5 GM"],
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
    price: 10,
    size: "5 GM",
    sizes: ["5 GM"],
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
    price: 10,
    size: "5 GM",
    sizes: ["5 GM"],
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
    price: 10,
    size: "5 GM",
    sizes: ["5 GM"],
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
    price: 10,
    size: "5 GM",
    sizes: ["5 GM"],
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
    price: 10,
    size: "5 GM",
    sizes: ["5 GM"],
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
    price: 90,
    size: "50 GM",
    sizes: ["50 GM", "100 GM"],
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
    price: 10,
    size: "5 GM",
    sizes: ["5 GM"],
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
    price: 44,
    size: "50 GM",
    sizes: ["50 GM", "100 GM"],
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
    price: 38,
    size: "50 GM",
    sizes: ["50 GM", "100 GM"],
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
    price: 28,
    size: "25 GM",
    sizes: ["25 GM", "100 GM"],
    heat: 0,
    icon: "fenugreek",
    hue: ["#4b5d22", "#7fa928"],
    /* real packaging shot, from sundermasala.com */
    image: "/packs/sunder-kasuri-methi.webp",
    story:
      "Fine",
    uses: "Flavorsome dishes with Kasuri Methi.",
  },
  {
    slug: "shahi-paneer-masala",
    name: "Shahi Paneer",
    kind: "Shahi Paneer Masala",
    range: "essentials",
    tagline: "Instant premix, with cashew.",
    hindi: "मलाई जैसी, शाही असली।",
    price: 51,
    size: "50 GM",
    sizes: ["50 GM", "100 GM"],
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
    price: 38,
    size: "50 GM",
    sizes: ["50 GM", "100 GM", "200 GM", "500 GM"],
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
    price: 202,
    size: "500 GM",
    sizes: ["500 GM"],
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
    name: "Sunth",
    kind: "Dry Ginger Powder",
    range: "essentials",
    tagline: "Winter in a spoon.",
    hindi: "सर्दी का इलाज, रसोई में।",
    price: 40,
    size: "50 GM",
    sizes: ["50 GM", "100 GM"],
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
    price: 90,
    size: "50 GM",
    sizes: ["50 GM", "100 GM"],
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
    price: 146,
    size: "50 GM",
    sizes: ["50 GM", "100 GM"],
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
    price: 52,
    size: "50 GM",
    sizes: ["50 GM", "100 GM"],
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
    price: 35,
    size: "100 GM",
    sizes: ["100 GM", "500 GM"],
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
    price: 29,
    size: "100 GM",
    sizes: ["100 GM", "200 GM", "500 GM"],
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
    price: 24,
    size: "100 GM",
    sizes: ["100 GM", "200 GM", "500 GM"],
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
    price: 46,
    size: "100 GM",
    sizes: ["100 GM", "200 GM", "500 GM", "1 KG"],
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

/* ── Helpers ──────────────────────────────────────────── */

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);

export const productsByRange = (range) =>
  range === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.range === range);

export const featuredProducts = () => PRODUCTS.filter((p) => p.featured);

export const relatedProducts = (product, limit = 3) =>
  PRODUCTS.filter((p) => p.range === product.range && p.slug !== product.slug).slice(0, limit);

export const formatPrice = (n) => `₹${n.toLocaleString("en-IN")}`;
