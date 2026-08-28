import { chromium } from "playwright";
const BASE = "http://localhost:3000";
const PAGES = ["/", "/shop", "/shop?category=blended", "/shop/dal-masala", "/recipes", "/recipes/indori-poha", "/story", "/faq", "/where-to-buy"];
const WIDTHS = [390, 768, 1024, 1440, 1832, 1920];
const b = await chromium.launch();
let problems = 0;
for (const width of WIDTHS) {
  const p = await b.newPage({ viewport: { width, height: 1000 } });
  for (const path of PAGES) {
    await p.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    await p.waitForTimeout(400);
    const info = await p.evaluate(() => {
      const cw = document.documentElement.clientWidth;
      const rows = [];
      for (const el of document.querySelectorAll(".shell, .shell-narrow")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0) continue;
        rows.push({ left: Math.round(r.left), right: Math.round(cw - r.right), narrow: el.classList.contains("shell-narrow") });
      }
      const de = document.documentElement;
      return { rows, scrollW: de.scrollWidth, clientW: de.clientWidth };
    });
    const normal = info.rows.filter(r => !r.narrow);
    const lefts = [...new Set(normal.map(r => r.left))];
    const rights = [...new Set(normal.map(r => r.right))];
    const asym = lefts[0] !== undefined && rights[0] !== undefined && Math.abs(lefts[0] - rights[0]) > 1;
    const overflow = info.scrollW > info.clientW;
    if (lefts.length > 1 || rights.length > 1 || asym || overflow) {
      problems++;
      console.log(`!! ${width}px ${path}  lefts=${JSON.stringify(lefts)} rights=${JSON.stringify(rights)} overflow=${overflow}`);
    }
  }
  await p.close();
}
console.log(problems ? `\n${problems} problem(s)` : "\nclean on port 3000: symmetric margins, no overflow, at every width tested");
await b.close();
