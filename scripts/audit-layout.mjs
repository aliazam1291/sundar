/**
 * Walk every page at three widths and report layout faults.
 *
 * Padding and masking bugs are width-dependent — a section that looks fine at
 * 1440 can push a scrollbar at 390, and a mask or an overflow-hidden ancestor
 * can quietly crop content at one breakpoint only. This finds the mechanical
 * ones (things wider than the viewport, things hanging off the left edge,
 * things clipped by an ancestor) so the eye is only needed for the rest.
 *
 *   npm run dev        # in another terminal
 *   npm run audit
 */

import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = "shots/audit";

const PAGES = ["/", "/shop", "/shop/dal-masala", "/story", "/regions", "/recipes", "/faq"];

/* Real device widths, not round numbers. 320 is the narrowest phone still in
   use (SE 1st gen); 360 covers most budget Android; 390/430 the current
   iPhones; 768/1024 iPad portrait and landscape; 1920 a desktop monitor. */
const WIDTHS = [320, 360, 390, 430, 768, 1024, 1440, 1920];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
let faults = 0;

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });

  const problems = [];
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") problems.push(`console: ${m.text()}`);
  });

  for (const path of PAGES) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });

    /* let every reveal fire, so nothing is measured while hidden */
    await page.evaluate(async () => {
      const root = document.documentElement;
      root.style.scrollBehavior = "auto";
      const step = Math.round(window.innerHeight * 0.7);
      for (let y = 0; y < root.scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForTimeout(500);

    const report = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const out = {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: vw,
        overflowing: [],
        offLeft: [],
        clipped: [],
      };

      const describe = (el) => {
        const id = el.id ? `#${el.id}` : "";
        const cls = typeof el.className === "string" && el.className
          ? `.${el.className.trim().split(/\s+/).slice(0, 3).join(".")}`
          : "";
        return `${el.tagName.toLowerCase()}${id}${cls}`.slice(0, 90);
      };

      /* Things that are supposed to run past the edge: marquees (masked on
         purpose), anything inside an SVG (its own coordinate space), a
         deliberate horizontal scroller, decorative layers, and skip links. */
      const exempt = (el) => {
        if (el.closest("svg")) return true;
        if (el.closest(".marquee")) return true;
        if (el.classList.contains("sr-only")) return true;
        for (let p = el; p && p !== document.body; p = p.parentElement) {
          if (p.getAttribute?.("aria-hidden") === "true") return true;
          const s = getComputedStyle(p);
          if (s.overflowX === "auto" || s.overflowX === "scroll") return true;
        }
        return false;
      };

      /* Is anything between this element and the page already clipping it? If
         so it is contained, not overflowing the page. */
      const insideClip = (el) => {
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          const s = getComputedStyle(p);
          if (s.overflow !== "visible" || s.overflowX !== "visible") return true;
        }
        return false;
      };

      for (const el of document.body.querySelectorAll("*")) {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") continue;
        if (cs.position === "fixed") continue;
        if (exempt(el)) continue;

        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;

        if (!insideClip(el)) {
          if (r.right > vw + 1) {
            out.overflowing.push({ el: describe(el), right: Math.round(r.right), over: Math.round(r.right - vw) });
          }
          if (r.left < -1) {
            out.offLeft.push({ el: describe(el), left: Math.round(r.left) });
          }
        }

        /* Content bigger than its own scroll box, on a box that hides the
           overflow — that is content being silently cut off. */
        if (
          (cs.overflow === "hidden" || cs.overflowX === "hidden" || cs.overflowY === "hidden") &&
          (el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2) &&
          el.clientHeight > 0
        ) {
          out.clipped.push({
            el: describe(el),
            box: `${el.clientWidth}x${el.clientHeight}`,
            content: `${el.scrollWidth}x${el.scrollHeight}`,
          });
        }
      }

      /* de-dupe by selector, keep the worst */
      const squash = (list, key) => {
        const m = new Map();
        for (const item of list) if (!m.has(item.el) || item[key] > m.get(item.el)[key]) m.set(item.el, item);
        return [...m.values()].slice(0, 8);
      };
      out.overflowing = squash(out.overflowing, "over");
      out.offLeft = squash(out.offLeft, "left");
      out.clipped = out.clipped.slice(0, 8);
      return out;
    });

    const slug = path.replace(/\W+/g, "-").replace(/^-|-$/g, "") || "home";
    await page.screenshot({ path: `${OUT}/${width}-${slug}.png`, fullPage: true });

    const scrolls = report.scrollWidth > report.clientWidth + 1;

    /* Faults are unambiguous: the page scrolls sideways, or something has
       escaped the viewport. Clipping is reported separately because most of
       it on this site is deliberate — the watermark spice icons are placed
       past the card edge on purpose so the card crops them. Read those, do
       not assume they are broken. */
    const isFault = scrolls || report.overflowing.length || report.offLeft.length || problems.length;

    if (isFault) faults += 1;

    if (isFault || report.clipped.length) {
      console.log(`\n${width}px  ${path}${isFault ? "" : "  (review only)"}`);
      if (scrolls) console.log(`  ! horizontal scroll: ${report.scrollWidth} > ${report.clientWidth}`);
      report.overflowing.forEach((o) => console.log(`  ! past right edge by ${o.over}px: ${o.el}`));
      report.offLeft.forEach((o) => console.log(`  ! off left edge at ${o.left}px: ${o.el}`));
      problems.splice(0).forEach((p) => console.log(`  ! ${p}`));
      report.clipped.forEach((c) => console.log(`  · crops ${c.content} into ${c.box}: ${c.el}`));
    } else {
      console.log(`${width}px  ${path}  ok`);
    }
  }

  await page.close();
}

await browser.close();
console.log(
  faults
    ? `\n${faults} page/width combination(s) with faults`
    : "\nno faults — nothing overflows the viewport at any width"
);
