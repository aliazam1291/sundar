/* For every .plaque: its own painted extent (border box + 3px hard shadow,
   after the tilt), versus the nearest ancestor that clips. Reports how many
   px of the plaque are being sliced on each edge. */
import { chromium } from "playwright";
const BASE = process.env.BASE_URL ?? "http://localhost:3200";
const PAGES = (process.env.PAGES ?? "/").split(",");
const WIDTHS = (process.env.WIDTHS ?? "390,1440").split(",").map(Number);
const b = await chromium.launch();
for (const width of WIDTHS) {
  const p = await b.newPage({ viewport: { width, height: 1000 } });
  for (const path of PAGES) {
    await p.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
    await p.waitForTimeout(900);
    await p.evaluate(async () => {
      const step = Math.round(innerHeight * 0.7);
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        scrollTo({ top: y, behavior: "instant" }); await new Promise(r => setTimeout(r, 70));
      }
      scrollTo({ top: 0, behavior: "instant" });
    });
    await p.waitForTimeout(400);
    const hits = await p.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll(".plaque")) {
        const r = el.getBoundingClientRect();           // already includes the rotation
        if (!r.width) continue;
        // the hard shadow paints 3px right and 3px down of the rotated box
        const paint = { top: r.top, left: r.left, right: r.right + 3, bottom: r.bottom + 3 };
        let a = el.parentElement, clip = null;
        while (a && a !== document.documentElement) {
          const cs = getComputedStyle(a);
          if (cs.overflow !== "visible" || cs.overflowX !== "visible" || cs.overflowY !== "visible") { clip = a; break; }
          a = a.parentElement;
        }
        if (!clip) continue;
        const c = clip.getBoundingClientRect();
        const cut = {
          top: Math.round(c.top - paint.top),
          left: Math.round(c.left - paint.left),
          right: Math.round(paint.right - c.right),
          bottom: Math.round(paint.bottom - c.bottom),
        };
        const sliced = Object.entries(cut).filter(([, v]) => v > 0);
        if (!sliced.length) continue;
        out.push({
          text: el.textContent.trim().slice(0, 30),
          cut: sliced.map(([k, v]) => `${k} +${v}px`).join(", "),
          by: (clip.className || clip.tagName).toString().split(/\s+/).slice(0, 4).join("."),
        });
      }
      return out;
    });
    if (hits.length) {
      console.log(`\n${width}px ${path}`);
      for (const h of hits) console.log(`   "${h.text}"  CUT ${h.cut}\n      by .${h.by}`);
    } else console.log(`${width}px ${path}  ok`);
  }
  await p.close();
}
await b.close();
