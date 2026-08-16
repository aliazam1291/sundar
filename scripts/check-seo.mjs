/**
 * Check the SEO surface that actually matters, on a production build.
 *
 * Structured data is easy to emit and easy to emit *wrong* — a Product with
 * no price, a Recipe with no instructions, a JSON blob that does not parse.
 * None of that shows up in a screenshot or a build log, so this parses every
 * ld+json block on every page and checks the required fields are really there.
 *
 *   npm run build && npx next start -p 3100
 *   BASE_URL=http://localhost:3100 node scripts/check-seo.mjs
 */

import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
/* Sample every page *type*, not every page. The two templated routes are
   represented twice on purpose: /shop/kasuri-methi and /recipes/masala-chai
   are the thinnest records in each set, so if a template only holds up for
   its best-filled entry, these are what catch it. */
const PAGES = [
  "/",
  "/shop",
  "/shop/dal-masala",
  "/shop/kasuri-methi",
  "/recipes",
  "/recipes/indori-poha",
  "/recipes/masala-chai",
  "/faq",
  "/story",
  "/regions",
  "/where-to-buy",
];

/* type -> fields that must be present and non-empty */
const REQUIRED = {
  Organization: ["name", "url", "logo"],
  WebSite: ["url", "name"],
  Product: ["name", "image", "offers", "brand"],
  Recipe: ["name", "recipeIngredient", "recipeInstructions"],
  FAQPage: ["mainEntity"],
  BreadcrumbList: ["itemListElement"],
  ItemList: ["itemListElement"],
};

/**
 * Required by Google for the rich result, but blocked on something other than
 * code — so it is reported and does not fail the run. A suite that is red for
 * a reason nobody can action today is a suite people stop reading.
 *
 * Recipe.image must be a photograph of the finished dish. There is none in the
 * repo, and a pack shot is not a substitute. Until real food photography
 * exists, the recipe pages are correctly marked up and still ineligible.
 */
const ADVISORY = {
  Recipe: { image: "needs a photo of the finished dish — no rich result without it" },
};

const browser = await chromium.launch();
let failures = 0;

for (const path of PAGES) {
  const page = await browser.newPage();
  const res = await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });

  const head = await page.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('meta[name="description"]')?.content ?? "",
    canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
    og: document.querySelector('meta[property="og:title"]')?.content ?? "",
    h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()).length,
    blocks: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
  }));

  const notes = [];
  const advisories = [];
  if (res.status() !== 200) notes.push(`status ${res.status()}`);
  if (!head.title) notes.push("no <title>");
  if (head.desc.length < 60) notes.push(`thin description (${head.desc.length} chars)`);
  if (head.h1 !== 1) notes.push(`${head.h1} <h1> (want exactly 1)`);

  const isEmpty = (v) => v == null || (Array.isArray(v) && v.length === 0) || v === "";

  /* Walk every graph, including nested ItemList items. */
  const seen = new Set();
  const visit = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach(visit);
    const type = node["@type"];
    if (type && REQUIRED[type]) {
      seen.add(type);
      for (const field of REQUIRED[type]) {
        if (isEmpty(node[field])) notes.push(`${type} missing ${field}`);
      }
    }
    if (type && ADVISORY[type]) {
      for (const [field, why] of Object.entries(ADVISORY[type])) {
        if (isEmpty(node[field])) advisories.push(`${type}.${field} — ${why}`);
      }
    }
    Object.values(node).forEach(visit);
  };

  for (const raw of head.blocks) {
    try {
      visit(JSON.parse(raw));
    } catch (e) {
      notes.push(`unparseable ld+json: ${e.message}`);
    }
  }

  const types = [...seen].join(", ") || "none";
  const advice = [...new Set(advisories)];
  if (notes.length) {
    failures += 1;
    console.log(`\n${path}\n  schema: ${types}`);
    notes.forEach((n) => console.log(`  ! ${n}`));
    advice.forEach((a) => console.log(`  ~ ${a}`));
  } else {
    console.log(`${path.padEnd(24)} ok   schema: ${types}`);
    advice.forEach((a) => console.log(`${" ".repeat(24)} ~ ${a}`));
  }

  await page.close();
}

await browser.close();
console.log(failures ? `\n${failures} page(s) with findings` : "\nSEO surface clean");
if (failures) process.exitCode = 1;
