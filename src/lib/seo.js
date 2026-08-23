/**
 * Structured data.
 *
 * A note on keywords, since it gets asked: the `<meta name="keywords">` tag
 * has been ignored by Google since 2009, and stuffing competitor brand names
 * into it earns nothing while borrowing someone else's trademark. What does
 * move a food brand in search is this file — Product, Recipe, FAQPage and
 * Organization markup that makes pages eligible for rich results (price,
 * ratings, cook time, the FAQ accordion in the SERP) — plus honest comparison
 * content, which is why the FAQ answers "how is this different from the big
 * national brands" in plain words instead of in a meta tag.
 *
 * Everything here is generated from lib/products and lib/recipes, so the
 * markup cannot drift from what the page actually shows. Google penalises
 * exactly that mismatch.
 */

import { PRODUCTS, CATEGORIES, formatPrice } from "@/lib/products";
import { RECIPES, COOK_ACTIONS } from "@/lib/recipes";

export const SITE = "https://sundermasala.com";

const abs = (path) => `${SITE}${path}`;

/** The brand itself — claimed once, in the root layout. */
export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Sunder Masala",
  alternateName: "सुंदर मसाला",
  url: SITE,
  logo: abs("/sundar-logo.png"),
  foundingDate: "1975",
  slogan: "Kam masala, poora swaad",
  description:
    "Slow-ground Indian spices and masala blends from Indore, Madhya Pradesh. Blended masalas, pure ground spices, whole seed and hing.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },
});

/** Declares the site and tells Google the on-site search exists. */
export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: "Sunder Masala",
  publisher: { "@id": `${SITE}/#organization` },
  inLanguage: ["en-IN", "hi-IN"],
});

/** One SKU, with the trail above it. */
export function productJsonLd(product) {
  const category = CATEGORIES[product.category];

  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      alternateName: product.kind,
      description: product.tagline,
      image: abs(product.image),
      sku: product.slug,
      category: `Spices & Masala · ${category?.name ?? ""}`.trim(),
      brand: { "@type": "Brand", name: "Sunder Masala" },
      offers: {
        "@type": "Offer",
        url: abs(`/shop/${product.slug}`),
        price: String(product.price),
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        seller: { "@id": `${SITE}/#organization` },
      },
      additionalProperty: [
        { "@type": "PropertyValue", name: "Net weight", value: product.size },
        { "@type": "PropertyValue", name: "Heat", value: `${product.heat} of 5` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Shop", item: abs("/shop") },
        { "@type": "ListItem", position: 2, name: category?.name ?? "Shop", item: abs(`/shop?category=${product.category}`) },
        { "@type": "ListItem", position: 3, name: product.name },
      ],
    },
  ];
}

/** ISO 8601 duration from the loose strings the recipes carry. */
function isoDuration(time) {
  const hours = /(\d+)\s*hr/i.exec(time)?.[1];
  const mins = /(\d+)\s*min/i.exec(time)?.[1];
  if (!hours && !mins) return undefined;
  return `PT${hours ? `${hours}H` : ""}${mins ? `${mins}M` : ""}`;
}

/**
 * One dish, as a Recipe.
 *
 * `image` is a REQUIRED property for recipe rich results, and it has to be a
 * photograph of the finished dish. There is no food photography in this repo —
 * every image is a pack cutout — so the field is emitted only when a recipe
 * actually carries one, and is otherwise left off.
 *
 * That means these pages are correctly marked up but NOT yet eligible for a
 * recipe rich result. Pointing `image` at the pack shot would fill the field
 * and produce a search result showing a packet of spice captioned "Indori
 * Poha", which is both wrong and the kind of mismatch Google acts on. Add
 * `image: "/recipes/indori-poha.jpg"` to a recipe in lib/recipes.js and it
 * starts working for that dish, one photo at a time.
 */
export function recipeJsonLd(recipe) {
  const uses = recipe.uses
    .map((slug) => PRODUCTS.find((p) => p.slug === slug)?.name)
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    alternateName: recipe.hi,
    description: recipe.blurb,
    ...(recipe.image ? { image: abs(recipe.image) } : {}),
    url: abs(`/recipes/${recipe.slug}`),
    recipeCategory: recipe.course,
    recipeCuisine: `Indian · ${recipe.region}`,
    recipeYield: `${recipe.serves} servings`,
    totalTime: isoDuration(recipe.time),
    keywords: [recipe.title, recipe.hi, recipe.region, ...uses].join(", "),
    author: { "@id": `${SITE}/#organization` },
    recipeIngredient: [...recipe.ingredients, ...uses.map((n) => `Sunder ${n}`)],
    recipeInstructions: recipe.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: COOK_ACTIONS[s.act]?.en ?? `Step ${i + 1}`,
      text: s.text,
    })),
  };
}

/**
 * The recipe corner, as a summary page.
 *
 * Each ListItem carries a canonical `url` to the dish's own page rather than
 * embedding a whole Recipe object. That is what a host carousel wants — a hub
 * that points at real pages — and it is only possible now that each recipe has
 * a page to point at. While they all shared /recipes#slug this list described
 * twelve dishes at one address, which is not a thing a fragment can be.
 */
export const recipeCollectionJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Rasoi — the Sunder Masala recipe corner",
  numberOfItems: RECIPES.length,
  itemListElement: RECIPES.map((r, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: r.title,
    url: abs(`/recipes/${r.slug}`),
  })),
});

/** One dish, with the trail back up to Rasoi. */
export const recipeBreadcrumbJsonLd = (recipe) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Rasoi", item: abs("/recipes") },
    { "@type": "ListItem", position: 2, name: recipe.title },
  ],
});

/** The shop, as a collection of the real catalogue. */
export const shopJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Sunder Masala — every blend",
  numberOfItems: PRODUCTS.length,
  itemListElement: PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.name,
    url: abs(`/shop/${p.slug}`),
  })),
});

/** Drop-in <script> for any of the above. */
export const JsonLd = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export { formatPrice };
