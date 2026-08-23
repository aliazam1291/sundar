import { chromium } from "playwright";
const BASE = process.env.BASE_URL ?? "http://localhost:3200";
const PAGES = (process.env.PAGES ?? "/").split(",");
const b = await chromium.launch();
for (const width of (process.env.WIDTHS ?? "390,1440").split(",").map(Number)) {
  const p = await b.newPage({ viewport: { width, height: 1000 } });
  for (const path of PAGES) {
    await p.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
    await p.waitForTimeout(800);
    await p.evaluate(async () => {
      const step = Math.round(innerHeight * 0.7);
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        scrollTo({ top: y, behavior: "instant" }); await new Promise(r => setTimeout(r, 60));
      }
      scrollTo({ top: 0, behavior: "instant" });
    });
    await p.waitForTimeout(300);
    const rows = await p.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll(".plaque, .eyebrow")) {
        const r = el.getBoundingClientRect();
        if (!r.width) continue;
        // nearest clipping ancestor and the margin to each of its edges
        let a = el.parentElement, clip = null;
        while (a && a !== document.documentElement) {
          const cs = getComputedStyle(a);
          if (cs.overflow !== "visible" || cs.overflowX !== "visible" || cs.overflowY !== "visible") { clip = a; break; }
          a = a.parentElement;
        }
        const c = clip ? clip.getBoundingClientRect() : null;
        out.push({
          kind: el.classList.contains("plaque") ? "plaque" : "eyebrow",
          text: el.textContent.trim().replace(/\s+/g, " ").slice(0, 28),
          h: Math.round(r.height),
          marginTop: c ? Math.round(r.top - c.top) : null,
          clip: clip ? (clip.className || clip.tagName).toString().split(/\s+/)[0] : "none",
        });
      }
      return out;
    });
    console.log(`\n===== ${width}px ${path} =====`);
    for (const r of rows) console.log(`  [${r.kind}] "${r.text}"  h=${r.h}  topMargin=${r.marginTop}  clip=${r.clip}`);
  }
  await p.close();
}
await b.close();
