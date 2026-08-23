/* Screenshot a padded region around an element so we can see whether the
   paint is actually being sliced, and by what. */
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
const BASE = process.env.BASE_URL ?? "http://localhost:3200";
const [path, sel, width, out, padS] = process.argv.slice(2);
const pad = Number(padS ?? 26);
await mkdir("shots/crop", { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: Number(width), height: 1000 }, deviceScaleFactor: 3 });
await p.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
await p.waitForTimeout(900);
await p.evaluate(async () => {
  const step = Math.round(innerHeight * 0.7);
  for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
    scrollTo({ top: y, behavior: "instant" }); await new Promise(r => setTimeout(r, 70));
  }
});
await p.waitForTimeout(500);
const el = p.locator(sel).first();
await el.scrollIntoViewIfNeeded();
await p.waitForTimeout(500);
const box = await el.boundingBox();
await p.screenshot({ path: `shots/crop/${out}`, caret: "initial",
  clip: { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.width + pad * 2, height: box.height + pad * 2 } });
const info = await el.evaluate((e) => {
  const cs = getComputedStyle(e);
  const r = e.getBoundingClientRect();
  const pr = e.parentElement.getBoundingClientRect();
  return { display: cs.display, transform: cs.transform, lineHeight: cs.lineHeight, fontSize: cs.fontSize,
    overflowSelf: cs.overflow, box: [Math.round(r.width), Math.round(r.height)],
    parentTag: e.parentElement.tagName, parentClass: e.parentElement.className,
    parentBox: [Math.round(pr.width), Math.round(pr.height)],
    parentOverflow: getComputedStyle(e.parentElement).overflow };
});
console.log(JSON.stringify(info, null, 1));
await b.close();
