/**
 * Screenshot a page of the running site.
 *
 * The site is nearly all drawn artwork and hand-tuned layout, so "does it
 * build" tells you almost nothing. This puts a real browser in front of it.
 *
 *   npm run dev                      # in another terminal
 *   node scripts/shot.mjs /recipes
 *   node scripts/shot.mjs /recipes --sel "#chef" --out chef.png
 *   node scripts/shot.mjs /recipes --click "text=Dal Tadka" --click "text=Next step"
 *
 * Flags:
 *   --out <file>     where to write (default: shots/<slugged path>.png)
 *   --sel <css>      clip to one element instead of the whole page
 *   --click <sel>    click something first; repeatable, in order
 *   --wait <ms>      settle time after the last click (default 900)
 *   --width <px>     viewport width (default 1440)
 *   --height <px>    viewport height (default 1000)
 *   --base <url>     dev server (default http://localhost:3000)
 *   --full           full-page rather than viewport
 */

import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { chromium } from "playwright";

function parseArgs(argv) {
  const out = { path: "/", clicks: [], wait: 900, width: 1440, height: 1000, base: "http://localhost:3000", full: false };
  const rest = [];

  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--full") out.full = true;
    else if (a === "--click") out.clicks.push(argv[++i]);
    else if (a === "--out") out.out = argv[++i];
    else if (a === "--sel") out.sel = argv[++i];
    else if (a === "--wait") out.wait = Number(argv[++i]);
    else if (a === "--width") out.width = Number(argv[++i]);
    else if (a === "--height") out.height = Number(argv[++i]);
    else if (a === "--base") out.base = argv[++i];
    else if (a === "--scroll") out.scroll = Number(argv[++i]);
    else rest.push(a);
  }

  if (rest[0]) out.path = rest[0].startsWith("/") ? rest[0] : `/${rest[0]}`;
  out.out ??= `shots/${out.path.replace(/\W+/g, "-").replace(/^-|-$/g, "") || "home"}.png`;
  return out;
}

const opts = parseArgs(process.argv.slice(2));
const url = `${opts.base}${opts.path}`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: opts.width, height: opts.height },
  deviceScaleFactor: 2,
});

/* Anything the page logs is usually the actual bug — surface it. */
const problems = [];
page.on("console", (m) => {
  if (m.type() === "error" || m.type() === "warning") problems.push(`[${m.type()}] ${m.text()}`);
});
page.on("pageerror", (e) => problems.push(`[pageerror] ${e.message}`));

await page.goto(url, { waitUntil: "networkidle" });

/* Scroll reveals are driven by an IntersectionObserver, so a full-page
   screenshot of an unscrolled page comes back mostly blank. Walk it down and
   back up first to let every section come in. The site sets
   `scroll-behavior: smooth`, which would animate every hop and leave the walk
   trailing far behind, so each jump is forced to land instantly. */
if (opts.full) {
  await page.evaluate(async () => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const step = Math.round(window.innerHeight * 0.7);
    for (let y = 0; y < root.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 140));
    }

    window.scrollTo({ top: 0, behavior: "instant" });
    root.style.scrollBehavior = previous;
  });
  await page.waitForTimeout(900);
}

for (const sel of opts.clicks) {
  await page.locator(sel).first().click();
  await page.waitForTimeout(450);
}

/* Scroll reveals are progressive enhancement, so an element shot without
   scrolling captures a section that is still at opacity 0 — which reads as a
   mysterious gap rather than "the observer never fired". Walk the page for
   --sel too, not just --full. */
if (opts.sel && !opts.scroll) {
  await page.evaluate(async () => {
    const root = document.documentElement;
    root.style.scrollBehavior = "auto";
    const step = Math.round(window.innerHeight * 0.7);
    for (let y = 0; y < root.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 110));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(600);
}

/* A viewport slice at a given offset — full-page shots of this site are far
   too tall to actually read. */
if (opts.scroll) {
  await page.evaluate(async (y) => {
    const root = document.documentElement;
    root.style.scrollBehavior = "auto";
    for (let at = 0; at <= y; at += Math.round(window.innerHeight * 0.7)) {
      window.scrollTo({ top: at, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo({ top: y, behavior: "instant" });
  }, opts.scroll);
  await page.waitForTimeout(700);
}

await page.waitForTimeout(opts.wait);

const target = opts.sel ? page.locator(opts.sel).first() : page;
const file = resolve(opts.out);
await mkdir(dirname(file), { recursive: true });
await target.screenshot({ path: file, ...(opts.sel ? {} : { fullPage: opts.full }) });

await browser.close();

console.log(`${url} -> ${opts.out}`);
if (problems.length) {
  console.log(`\n${problems.length} console problem(s):`);
  problems.forEach((p) => console.log(`  ${p}`));
  process.exitCode = 1;
}
