/**
 * Drive the navbar search and prove it actually finds things.
 *
 * A search box that renders is not a search box that works. This checks the
 * cases that matter: a spice by name, a dish by name, a recipe found through
 * an ingredient it uses, keyboard navigation, and that Enter lands on a real
 * page rather than a 404.
 *
 *   npm run dev
 *   node scripts/walk-search.mjs
 */

import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = "shots/search";
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const problems = [];
let failures = 0;

for (const width of [390, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });
  page.on("pageerror", (e) => problems.push(`[${width}] pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") problems.push(`[${width}] console: ${m.text()}`);
  });

  await page.goto(BASE, { waitUntil: "networkidle" });

  const open = async () => {
    await page.getByRole("button", { name: /Search products and recipes/i }).first().click();
    await page.waitForSelector("[role=dialog]");
  };

  const type = async (text) => {
    await page.locator("[role=dialog] input").fill(text);
    await page.waitForTimeout(260);
    return page.locator("[role=dialog] [role=option]").allInnerTexts();
  };

  await open();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/${width}-open.png` });

  /* A spice by name. */
  let rows = await type("haldi");
  if (!rows.join(" ").toLowerCase().includes("haldi")) {
    console.log(`[${width}] FAIL "haldi" ->`, rows.slice(0, 3));
    failures += 1;
  } else console.log(`[${width}] ok  haldi -> ${rows.length} hits, first: ${rows[0].split("\n")[0]}`);

  /* A dish by name. */
  rows = await type("pav bhaji");
  if (!rows.join(" ").toLowerCase().includes("pav bhaji")) {
    console.log(`[${width}] FAIL "pav bhaji" ->`, rows.slice(0, 3));
    failures += 1;
  } else console.log(`[${width}] ok  pav bhaji -> ${rows.length} hits`);

  /* A recipe reached through one of its ingredients, not its name. */
  rows = await type("tamarind");
  if (!rows.join(" ").toLowerCase().includes("sambhar")) {
    console.log(`[${width}] FAIL "tamarind" should reach Sambhar ->`, rows.slice(0, 3));
    failures += 1;
  } else console.log(`[${width}] ok  tamarind -> Sambhar via ingredients`);

  /* Devanagari. */
  rows = await type("हल्दी");
  console.log(`[${width}] ${rows.length ? "ok " : "FAIL"} हल्दी -> ${rows.length} hits`);
  if (!rows.length) failures += 1;

  /* Nonsense should say so, not explode. */
  rows = await type("zzzqqq");
  console.log(`[${width}] ${rows.length === 0 ? "ok " : "FAIL"} nonsense -> ${rows.length} hits`);
  if (rows.length) failures += 1;

  await type("garam");
  await page.screenshot({ path: `${OUT}/${width}-results.png` });

  /* Both ways of choosing a result have to actually navigate. The click path
     is the one that broke: the row unmounted under its own click. */
  for (const how of ["enter", "click"]) {
    await page.goto(BASE, { waitUntil: "networkidle" });
    await open();
    await page.locator("[role=dialog] input").fill("garam");
    await page.waitForTimeout(280);

    let target;
    if (how === "enter") {
      await page.locator("[role=dialog] input").press("ArrowDown");
      await page.waitForTimeout(140);
      target = await page.locator("[role=dialog] [role=option][aria-selected=true]").getAttribute("href");
      await page.locator("[role=dialog] input").press("Enter");
    } else {
      const row = page.locator("[role=dialog] [role=option]").nth(1);
      target = await row.getAttribute("href");
      await row.click();
    }

    await page.waitForTimeout(1200);
    const landed = page.url().replace(BASE, "") || "/";
    if (landed !== target) {
      console.log(`[${width}] FAIL ${how} -> wanted ${target}, landed ${landed}`);
      failures += 1;
    } else console.log(`[${width}] ok  ${how} -> ${landed}`);
  }

  await page.close();
}

await browser.close();

if (problems.length) {
  console.log(`\n${problems.length} console problem(s):`);
  problems.forEach((p) => console.log(`  ${p}`));
}
console.log(failures ? `\n${failures} check(s) failed` : "\nall search checks passed");
if (failures || problems.length) process.exitCode = 1;
