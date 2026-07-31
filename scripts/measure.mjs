/**
 * Measure specific elements against the viewport.
 *
 * When the audit says something is clipped, this says by how much and by
 * whom — which is the difference between a decorative bleed working as
 * designed and a control being cut in half.
 *
 *   node scripts/measure.mjs /  390  "[role=tablist]" ".anim-spin-slow"
 */

import { chromium } from "playwright";

const [path = "/", width = "390", ...selectors] = process.argv.slice(2);
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: 1000 } });
await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);

for (const sel of selectors) {
  const found = await page.evaluate((s) => {
    const out = [];
    for (const el of document.querySelectorAll(s)) {
      const r = el.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;

      let clipper = null;
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        const cs = getComputedStyle(p);
        if (cs.overflow !== "visible" || cs.overflowX !== "visible") {
          const pr = p.getBoundingClientRect();
          clipper = {
            tag: p.tagName.toLowerCase(),
            cls: String(p.className).slice(0, 60),
            left: Math.round(pr.left),
            right: Math.round(pr.right),
          };
          break;
        }
      }

      out.push({
        rect: { left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width) },
        vw,
        scrollW: el.scrollWidth,
        clientW: el.clientWidth,
        clipper,
      });
    }
    return out;
  }, sel);

  console.log(`\n${sel}`);
  if (!found.length) console.log("  (not found)");
  found.forEach((f) => {
    console.log(`  box ${f.rect.left}..${f.rect.right} (w ${f.rect.w})  viewport 0..${f.vw}`);
    if (f.scrollW > f.clientW + 1) console.log(`  content ${f.scrollW} in a ${f.clientW} box — ${f.scrollW - f.clientW}px cut`);
    if (f.rect.right > f.vw) console.log(`  ! ${Math.round(f.rect.right - f.vw)}px past the right edge`);
    if (f.clipper) console.log(`  clipped by ${f.clipper.tag}.${f.clipper.cls} (${f.clipper.left}..${f.clipper.right})`);
  });
}

await browser.close();
