/* A/B the clip-path on revealed containers: measure how far each .plaque
   paints outside its clipping [data-reveal] ancestor's border box. */
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
const BASE = process.env.BASE_URL ?? "http://localhost:3200";
await mkdir("shots/ab", { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 3 });
await p.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
await p.waitForTimeout(900);
await p.evaluate(async () => {
  const step = Math.round(innerHeight * 0.7);
  for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
    scrollTo({ top: y, behavior: "instant" }); await new Promise(r => setTimeout(r, 70));
  }
});
await p.waitForTimeout(500);

const report = await p.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll(".plaque")) {
    const host = el.closest("[data-reveal]");
    if (!host) continue;
    const cs = getComputedStyle(host);
    const r = el.getBoundingClientRect();          // rotated AABB
    const h = host.getBoundingClientRect();
    out.push({
      text: el.textContent.trim().replace(/\s+/g, " ").slice(0, 26),
      clipPath: cs.clipPath,
      isIn: host.classList.contains("is-in"),
      overTop: +(h.top - r.top).toFixed(1),        // >0 => plaque paints above host box
      overLeft: +(h.left - r.left).toFixed(1),
      overRight: +(r.right + 3 - h.right).toFixed(1), // +3 hard shadow
      overBottom: +(r.bottom + 3 - h.bottom).toFixed(1),
    });
  }
  return out;
});
console.log("clip-path on revealed hosts, and plaque overhang (px, >0 = sliced):");
for (const r of report)
  console.log(`  "${r.text}"\n     clipPath=${r.clipPath} isIn=${r.isIn}\n     top +${r.overTop}  left +${r.overLeft}  right +${r.overRight}  bottom +${r.overBottom}`);

// Force the revealed state so we compare the state a real visitor ends on.
await p.evaluate(() => {
  document.querySelectorAll("[data-reveal]").forEach((e) => e.classList.add("is-in"));
});
await p.waitForTimeout(400);
const el = p.locator("#categories .plaque").first();
await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
const box = await el.boundingBox();
const clip = { x: box.x - 30, y: box.y - 30, width: box.width + 60, height: box.height + 60 };
await p.screenshot({ path: "shots/ab/A-with-clip.png", clip, caret: "initial" });
await p.addStyleTag({ content: `.reveal-ready [data-reveal].is-in { clip-path: none !important; }` });
await p.waitForTimeout(300);
await p.screenshot({ path: "shots/ab/B-no-clip.png", clip, caret: "initial" });
console.log("\nwrote shots/ab/A-with-clip.png and B-no-clip.png");
await b.close();
