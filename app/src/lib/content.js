/**
 * Editorial content — regions, provenance, timeline, rituals.
 */

/* Regional heroes, plotted on a stylised India. x/y are % of the map box. */
export const REGIONS = [
  {
    id: "indore",
    city: "Indore",
    state: "Madhya Pradesh",
    dish: "Poha & Jeeravan",
    blend: "Jeeravan",
    slug: "jeeravan-poha-masala",
    note: "Fifty-six shops, one breakfast, zero consensus.",
    x: 33,
    y: 47,
    home: true,
  },
  {
    id: "mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    dish: "Pav Bhaji",
    blend: "Pav Bhaji Masala",
    slug: "pav-bhaji-masala",
    note: "Chowpatty on a tawa, seasoned last.",
    x: 22,
    y: 60,
  },
  {
    id: "delhi",
    city: "Old Delhi",
    state: "Delhi",
    dish: "Chole Bhature",
    blend: "Chole Masala",
    slug: "chole-masala",
    note: "Lip-smacking, and cooked in minutes.",
    x: 33,
    y: 26,
  },
  {
    id: "chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    dish: "Idli, Dosa & Appam",
    blend: "Sambhar Masala",
    slug: "sambhar-masala",
    note: "Fenugreek, hing and chilli — the go-to side.",
    x: 45,
    y: 88,
  },
  {
    id: "varanasi",
    city: "Varanasi",
    state: "Uttar Pradesh",
    dish: "Galli Chaat",
    blend: "Chaat Masala",
    slug: "chaat-masala",
    note: "It transforms any fruit, vegetable or plate.",
    x: 52,
    y: 37,
  },
  {
    id: "jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    dish: "Aam ka Achar",
    blend: "Achar Masala",
    slug: "achar-masala",
    note: "Ready to use. No other spices needed.",
    x: 28,
    y: 30,
  },
  {
    id: "amritsar",
    city: "Amritsar",
    state: "Punjab",
    dish: "Dal Makhani",
    blend: "Dal Masala",
    slug: "dal-masala",
    note: "Chana, tuar or makhani — one tin covers it.",
    x: 28,
    y: 16,
  },
  {
    id: "ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    dish: "Summer Jaljeera",
    blend: "Jaljira",
    slug: "jaljira",
    note: "Relief in a glass, through a long hot May.",
    x: 18,
    y: 45,
  },
];;

/* The founder */
export const FOUNDER = {
  name: "Bharat Kumar Jain",
  nameHi: "भरत कुमार जैन",
  role: "Founder",
  roleHi: "संस्थापक",
  year: "1975",
  departure: "04:18 a.m.",
};

/* The heritage film, as a scrollable reel.
   Beats lifted from "Sunder Spices — A Heritage Film". */
export const JOURNEY = [
  {
    id: "one",
    chapter: "I",
    label: "Day one · the route",
    year: "1975",
    lines: ["A boy.", "A bicycle.", "A bag of chillies."],
    body: "He left the shop at 04:18 in the morning, before the city had decided to wake, with the day's grind strapped behind him.",
    meta: "Indore · भारत",
  },
  {
    id: "nothing",
    chapter: "II",
    label: "What he did not have",
    year: "1975",
    lines: ["No factory.", "No machine.", "No company."],
    body: "Only a recipe. And a promise.",
    meta: "Only a recipe",
    negative: true,
  },
  {
    id: "work",
    chapter: "III",
    label: "The work",
    year: "1975—1982",
    lines: ["He ground spice by stone.", "He slept on the sacks.", "He delivered before sunrise."],
    body: "Day. After day. After day. After day.",
    meta: "Day after day",
  },
  {
    id: "years",
    chapter: "IV",
    label: "The years",
    year: "50",
    lines: ["Fifty years."],
    body: "1975 · 1982 · 1989 · 1996 · 2003 · 2010 · 2017 · 2026 — one recipe carried the whole distance.",
    meta: "वर्ष · years",
    marks: ["1975", "1982", "1989", "1996", "2003", "2010", "2017", "2026"],
  },
  {
    id: "edge",
    chapter: "V",
    label: "The edge",
    year: "2026",
    lines: ["The bicycle", "is now", "a factory."],
    body: "One man. A thousand hands. One bag of chillies. A hundred spices.",
    meta: "The works · MMXXVI",
  },
  {
    id: "taste",
    chapter: "VI",
    label: "The taste remains",
    year: "—",
    lines: ["But the taste—", "—has not changed."],
    body: "स्वाद वही, कहानी नई।",
    bodyEn: "The taste the same. The story new.",
    meta: "The story continues",
    devanagari: true,
  },
];

/* Since 1975 — the making */
export const TIMELINE = [
  {
    year: "1975",
    title: "One stone chakki",
    body: "Sunder starts as one grinding stone in Indore, blending garam masala for the families on a single street.",
    icon: "chakki",
  },
  {
    year: "1989",
    title: "The Jeeravan years",
    body: "The poha sprinkle Indore argues about becomes our most-asked-for blend. We stop calling it a side line.",
    icon: "cumin",
  },
  {
    year: "2003",
    title: "Straight from the farm",
    body: "We cut the mandi middlemen and buy at source — Byadgi for chilli, Unjha for cumin, Kota for coriander.",
    icon: "sprig",
  },
  {
    year: "2017",
    title: "Cold-milling",
    body: "Below 40°C, so the volatile oils stay in the powder instead of evaporating into the mill room.",
    icon: "mortar",
  },
  {
    year: "2026",
    title: "Local hero, everywhere",
    body: "Fifty years on: three ranges, thirty-two blends, and a promise that has not moved — kam masala, poora swaad.",
    icon: "truck",
  },
];

/* Sourcing pillars */
export const PILLARS = [
  {
    title: "Single-origin, named",
    body: "Every pack names the district it came from. If provenance is the flex, it belongs on the front, not the back.",
    icon: "sprig",
    stat: "12",
    statLabel: "sourcing districts",
  },
  {
    title: "Cold-milled under 40°C",
    body: "Heat is the enemy of aroma. We mill slow and cool so the oil stays in the spice, not in the air.",
    icon: "chakki",
    stat: "<40°C",
    statLabel: "mill temperature",
  },
  {
    title: "Nothing added, ever",
    body: "No colours, no anti-caking agents, no fillers, no preservatives. It is a short ingredient list on purpose.",
    icon: "mortar",
    stat: "0",
    statLabel: "additives",
  },
  {
    title: "Harvest-dated packs",
    body: "Spice is produce. Each batch carries its harvest season so you know exactly how fresh the grind is.",
    icon: "jar",
    stat: "100%",
    statLabel: "batch traced",
  },
];

/* The chutki ritual — the brand's core idea, as steps */
export const RITUAL = [
  {
    step: "१",
    title: "Heat the fat first",
    body: "Ghee or oil, until it shimmers. Cold fat mutes everything you are about to add.",
  },
  {
    step: "२",
    title: "One chutki, not a fistful",
    body: "A pinch of the right blend beats a spoon of the wrong one. Restraint is the whole technique.",
  },
  {
    step: "३",
    title: "Count to two",
    body: "Two seconds in hot fat wakes the oils. Five seconds burns them. This is the entire margin.",
  },
  {
    step: "४",
    title: "Taste, then decide",
    body: "Season at the end, never at the start. You can always add. You can never take back.",
  },
];

/* Marquee phrases — the brand's voice, on loop */
/* Hinglish and Hindi alternate — the ticker should read like a lorry rail,
   not a press release. */
export const TICKER = [
  "Kam masala, poora swaad",
  "कम मसाला, पूरा स्वाद",
  "Local hero masala",
  "मसालों का सिकंदर",
  "Since 1975",
  "Ek chutki, full fire",
  "एक चुटकी, फुल फायर",
  "Apna region, apni thali",
  "अपना रीजन, अपनी थाली",
  "Single-origin, cold-milled",
  "Bland? Not on our watch",
];

/* Journal / IP content */
export const JOURNAL = [
  {
    title: "Khana OK Please",
    kicker: "Film series",
    body: "Local chefs cooking real dhaba food, one region an episode. Horn OK, Khana OK.",
    icon: "truck",
    tone: "forest",
  },
  {
    title: "The Bachpan Thela",
    kicker: "On-ground",
    body: "A street cart that rebuilds the snacks of your childhood — and lets you add the last pinch yourself.",
    icon: "thela",
    tone: "chilli",
  },
  {
    title: "Dhaba Diaries",
    kicker: "Documentary",
    body: "Mapping the country's hero dishes, and the one spice hiding behind each of them.",
    icon: "flame",
    tone: "saffron",
  },
];
