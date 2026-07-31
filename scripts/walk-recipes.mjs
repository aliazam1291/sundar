/**
 * Walk both interactive pieces on /recipes and shoot every state.
 *
 * The kitchen has nine cooking poses and four vessels; the tasting bench has
 * three bowls, nine spices and eight verdicts. None of that is caught by a
 * build or a lint, so this drives the real components in a real browser and
 * leaves a picture of each state in shots/walk/ to look at.
 *
 *   npm run dev            # in another terminal
 *   npm run walk
 */

import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const OUT = process.argv[2] ?? "shots/walk";
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1500, height: 1100 }, deviceScaleFactor: 2 });

const problems = [];
page.on("console", (m) => {
  if (m.type() === "error") problems.push(`[console] ${m.text()}`);
});
page.on("pageerror", (e) => problems.push(`[pageerror] ${e.message}`));

await page.goto(`${BASE}/recipes`, { waitUntil: "networkidle" });

/**
 * Always scope a click to its own section. Both pieces live on one page and
 * their labels genuinely collide — the kitchen menu lists a dish called Jeera
 * Aloo while the dabba has a Jeera tin, both sections have a mute button, and
 * both have something called "Taste it". An unscoped getByRole picks whichever
 * comes first in the DOM, which is the wrong one and fails silently.
 */
const inSection = (id) => (name) => page.locator(id).getByRole("button", { name }).first();

const kitchenBtn = inSection("#kitchen");
const benchBtn = inSection("#chakhne-wala");

/* ── the kitchen ─────────────────────────────────────────────────────── */

const kitchen = page.locator("#kitchen svg[role=img]").first();
const shootKitchen = async (name) => {
  await page.waitForTimeout(420);
  await kitchen.screenshot({ path: `${OUT}/${name}.png` });
};

const press = (name) => kitchenBtn(name).click();
const menu = () => press(/← Menu/);
const next = () => press(/Next step|Taste it/);

await shootKitchen("k-00-idle");

/* Dal Tadka covers boil, temper, fry, pour and the served plate. */
await press(/Dal Tadka/);
for (const name of ["k-dal-1-boil", "k-dal-2-temper", "k-dal-3-fry", "k-dal-4-pour", "k-dal-5-serve"]) {
  await shootKitchen(name);
  if (await page.getByRole("button", { name: /Next step|Taste it/ }).count()) await next();
}

/* Pav Bhaji covers the tawa and the masher. */
await menu();
await press(/Pav Bhaji/);
await next();
await next();
await shootKitchen("k-pav-3-mash");
await next();
await shootKitchen("k-pav-4-sprinkle");

/* Indori Poha covers the chopping board and the stir. */
await menu();
await press(/Indori Poha/);
await shootKitchen("k-poha-1-prep");
await next();
await next();
await shootKitchen("k-poha-3-stir");

/* Rajma is the five-step method — the chalk row has to divide by five and
   still fit inside the board. */
await menu();
await press(/Rajma Chawal/);
await next();
await next();
await shootKitchen("k-rajma-3-fry");
await next();
await next();
await shootKitchen("k-rajma-5-sprinkle");

/* The menu itself, filtered down to one course. Shot as a whole section
   because the filter lives in the panel beside the drawing. */
await menu();
await press(/^Weekend/);
await page.waitForTimeout(420);
await page.locator("#kitchen").first().screenshot({ path: `${OUT}/k-menu-weekend.png` });
await press(/^Everything/);

/* ── the tasting bench ───────────────────────────────────────────────── */

const bench = page.locator("#chakhne-wala").first();
const shootBench = async (name) => {
  await page.waitForTimeout(500);
  await bench.screenshot({ path: `${OUT}/${name}.png` });
};

const pinch = (name) => benchBtn(name).click();
const bowls = () => benchBtn(/← Bowls/).click();
const taste = async () => {
  await benchBtn(/Taste it/).click();
  await page.waitForTimeout(900); // the spoon has to reach his mouth
};

await bench.scrollIntoViewIfNeeded();
await shootBench("t-00-pick");

/* Dal, seasoned properly — the one he is meant to like. */
await pinch(/Tuar dal/);
await pinch(/Haldi/);
await pinch(/Hing/);
await pinch(/Jeera/);
await shootBench("t-dal-1-seasoned");
await taste();
await shootBench("t-dal-2-perfect");

/* The same bowl, buried. */
for (let i = 0; i < 8; i += 1) await pinch(/Lal Mirch/);
await taste();
await shootBench("t-dal-3-fistful");

/* Chilli in the chai — the joke the dish targets exist for. */
await bowls();
await pinch(/Boiling hard/);
await pinch(/Elaichi/);
await pinch(/Lal Mirch/);
await taste();
await shootBench("t-chai-1-wrong");

/* Aloo with nothing it actually wants. */
await bowls();
await pinch(/Cold-boiled potato/);
await pinch(/Haldi/);
await taste();
await shootBench("t-aloo-1-flat");

await browser.close();

console.log(`shots in ${OUT}`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  problems.forEach((p) => console.log(`  ${p}`));
  process.exitCode = 1;
}
