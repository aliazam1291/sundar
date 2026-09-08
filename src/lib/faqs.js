/**
 * The questions people actually ask a masala brand.
 *
 * Written to be useful first and findable second — these are the queries that
 * bring someone to a spice website in the first place ("is hing gluten free",
 * "kashmiri vs regular chilli", "how long does garam masala last"), so the
 * answers are real answers rather than keyword bait. The same list renders
 * the page and the FAQPage structured data, so what Google quotes is exactly
 * what a visitor reads.
 *
 * `group` drives the on-page sections. Keep answers to a short paragraph:
 * rich results truncate, and nobody reads a wall on a phone.
 */

export const FAQ_GROUPS = [
  { id: "the-blends", label: "The blends", hi: "मसालों के बारे में" },
  { id: "using-them", label: "Using them", hi: "इस्तेमाल" },
  { id: "buying", label: "Buying & delivery", hi: "ख़रीदारी" },
];

export const FAQS = [
  {
    group: "the-blends",
    q: "What does “kam masala, poora swaad” actually mean?",
    a: "Less masala, full flavour. Our blends are ground slower and sieved finer, so one pinch carries what a spoonful of a coarser blend would. It is the whole argument of the brand: if you are adding three spoons to taste anything, you are paying for filler.",
  },
  {
    group: "the-blends",
    q: "Are Sunder masalas pure, or are they blended with fillers?",
    a: "No artificial colours, no added preservatives and no starch or husk bulking. A ground spice should be the spice. Our compounded hing is the one deliberate exception — hing is never sold pure because pure asafoetida resin is overpowering and near-impossible to dose.",
  },
  {
    group: "the-blends",
    q: "What is the difference between Kashmiri mirchi and regular red chilli powder?",
    a: "They do two different jobs. Kashmiri mirchi is for colour — deep red, very mild. Lal mirch is for heat. Most restaurant-red dishes use Kashmiri for the colour and a small amount of hot chilli for the burn, which is why doubling your chilli powder makes a dish painful without making it redder.",
  },
  {
    group: "the-blends",
    q: "Is your hing (asafoetida) gluten free?",
    a: "Compounded hing is traditionally cut with wheat flour, so standard hing is not gluten free. Check the pack you are buying: where a variant is compounded on a rice base rather than wheat, it says so on the label. If you are cooking for coeliac disease, read the specific pack rather than trusting the category.",
  },
  {
    group: "the-blends",
    q: "Are the spices vegetarian and vegan?",
    a: "Every product is vegetarian and carries the green dot. All of them are vegan too — they are ground spices and spice blends, with no dairy or honey in any formulation.",
  },
  {
    group: "using-them",
    q: "How much of a blend should I actually use?",
    a: "Start with a quarter teaspoon per serving and taste before adding more. Ground spice keeps releasing for a couple of minutes after it goes in, so a dish that tastes right the second you stir it will usually be over-spiced by the time it reaches the table.",
  },
  {
    group: "using-them",
    q: "When do I add garam masala — at the start or the end?",
    a: "At the end, off the heat. Garam masala is a finishing blend: its aromatics are volatile and cooking them for twenty minutes boils away exactly what you bought it for. Whole spices go in early, ground finishing blends go in last.",
  },
  {
    group: "using-them",
    q: "Why does my tadka taste bitter?",
    a: "The ghee was too hot, or the spice sat in it too long. Cumin needs about two seconds in shimmering fat, and chilli powder should go in off the heat entirely. Burnt spice cannot be rescued by adding more of anything — start the tadka again.",
  },
  {
    group: "using-them",
    q: "How should I store ground masala, and how long does it last?",
    a: "Airtight, out of the light, away from the stove. Heat and daylight are what kill a blend, not time on its own. Ground blends hold their aroma for about six months once opened; whole spices keep well past a year. If it smells of nothing, it will taste of nothing.",
  },
  {
    group: "using-them",
    q: "Can I use these blends in an air fryer or for grilling?",
    a: "Yes, but add them in a marinade with oil or curd rather than dusting them on dry. Dry ground spice on a hot dry surface scorches before the food is cooked; suspended in fat it clings and blooms instead.",
  },
  {
    group: "buying",
    q: "Where can I buy Sunder Masala?",
    a: "Across roughly 50,000 kirana stores, and shipped nationwide from this site. If your local store does not stock a blend, ask them for it by name — most of our range travels on those shelves.",
  },
  {
    group: "buying",
    q: "Do you ship outside India?",
    a: "Not directly at the moment. Ground spices carry import restrictions that vary by country, and we would rather not sell you something customs will destroy. International stockists are the next thing on the list.",
  },
  {
    group: "buying",
    q: "How is Sunder different from the big national masala brands?",
    a: "Two things. We grind for potency rather than volume, so the pack is smaller and lasts longer — we would rather sell you 50g you finish than 500g that goes stale in the cupboard. And we sell the whole spice as well as the blend, so you can buy jeera as seed for the tadka and as part of a masala, from the same mill.",
  },
  {
    group: "buying",
    q: "How long has Sunder Masala been going?",
    a: "Since 1975, out of Indore, Madhya Pradesh. It started with one man, a bicycle and a stone chakki, and the mill is still the reason the blends taste the way they do.",
  },
];

export const faqsIn = (group) => FAQS.filter((f) => f.group === group);

/** schema.org FAQPage — the shape Google reads for rich results. */
export const faqJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
