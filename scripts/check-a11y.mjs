/**
 * Accessibility audit across every page, at phone and desktop.
 *
 * Runs axe-core in the real rendered page, then adds two checks axe cannot
 * make on its own:
 *
 *   - the interactive states. A menu that is closed is not audited, so the
 *     search overlay and the Shop menu are opened before the scan.
 *   - keyboard reachability. axe checks that a control *can* be focused, not
 *     that tabbing actually gets you to the main content past the header.
 *
 * Colour contrast matters here more than most sites: this palette is bright
 * fills on warm grounds, and the design system deliberately keeps separate
 * `*-ink` variants for text. This is what proves they are being used.
 *
 *   npm run build && npx next start -p 3100
 *   BASE_URL=http://localhost:3100 node scripts/check-a11y.mjs
 */

import { createRequire } from "node:module";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const PAGES = [
  "/",
  "/shop",
  "/shop/dal-masala",
  "/recipes",
  "/recipes/indori-poha",
  "/faq",
  "/story",
  "/where-to-buy",
];
const WIDTHS = [390, 1440];

/* Rules we judge rather than obey blindly are listed here with a reason.
   Nothing is disabled at the moment — kept so a future exemption has to be
   argued for in writing. */
const EXEMPT = {};

const browser = await chromium.launch();
let total = 0;

for (const width of WIDTHS) {
  for (const path of PAGES) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });

    /* Reveal everything — a section still at opacity 0 is not audited, and
       "hidden" content is exactly where contrast bugs hide. */
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      const step = Math.round(window.innerHeight * 0.7);
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForTimeout(400);

    await page.addScriptTag({ path: axePath });
    const result = await page.evaluate(
      async (exempt) =>
        window.axe
          .run(document, {
            resultTypes: ["violations"],
            rules: Object.fromEntries(Object.keys(exempt).map((k) => [k, { enabled: false }])),
          })
          .then((r) => r.violations),
      EXEMPT
    );

    if (result.length) {
      total += result.reduce((n, v) => n + v.nodes.length, 0);
      console.log(`\n${width}px  ${path}`);

      for (const v of result) {
        console.log(`  [${v.impact}] ${v.id} x${v.nodes.length} — ${v.help}`);

        /* Contrast is only actionable if you know which colour pair failed,
           and one page can fail several different pairs. Group them. */
        if (v.id === "color-contrast") {
          const pairs = new Map();
          for (const n of v.nodes) {
            const s = n.failureSummary ?? "";
            const fg = /foreground color: (#\w+)/.exec(s)?.[1];
            const bg = /background color: (#\w+)/.exec(s)?.[1];
            const ratio = /contrast of ([\d.]+)/.exec(s)?.[1];
            const key = `${fg} on ${bg} (${ratio})`;
            if (!pairs.has(key)) pairs.set(key, { n: 0, at: n.target?.join(" ")?.slice(0, 70) });
            pairs.get(key).n += 1;
          }
          [...pairs.entries()]
            .sort((a, b) => b[1].n - a[1].n)
            .forEach(([k, info]) => console.log(`      ${String(info.n).padStart(3)}x  ${k}  ${info.at}`));
        } else {
          v.nodes.slice(0, 2).forEach((n) => console.log(`      ${n.target?.join(" ")?.slice(0, 80)}`));
        }
      }
    } else {
      console.log(`${String(width).padStart(4)}px  ${path.padEnd(18)} clean`);
    }

    await page.close();
  }
}

/* The interactive layers, which are not in the DOM until opened.
 *
 * Scoped to the panel itself rather than the whole document. Scanning the
 * document here reported 46 contrast failures that were all artefacts: the
 * page behind was still un-revealed at opacity 0, and axe dutifully computed
 * the blended colour of invisible text. The panel is what is under test. */
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE, { waitUntil: "networkidle" });
await page.addScriptTag({ path: axePath });

for (const [label, open, scope] of [
  [
    "search overlay",
    async () => page.getByRole("button", { name: /Search products and recipes/i }).first().click(),
    "[role=dialog]",
  ],
  ["shop menu", async () => page.getByRole("button", { name: /^Shop$/ }).first().click(), "header nav"],
]) {
  await open();
  await page.waitForTimeout(400);
  const v = await page.evaluate(
    (sel) => window.axe.run(sel, { resultTypes: ["violations"] }).then((r) => r.violations),
    scope
  );
  if (v.length) {
    total += v.reduce((n, x) => n + x.nodes.length, 0);
    console.log(`\n${label}`);
    v.forEach((x) => {
      console.log(`  [${x.impact}] ${x.id} x${x.nodes.length} — ${x.help}`);
      /* Same grouping as the page scan — a bare count is not actionable. */
      const pairs = new Map();
      for (const n of x.nodes) {
        const s = n.failureSummary ?? "";
        const key =
          x.id === "color-contrast"
            ? `${/foreground color: (#\w+)/.exec(s)?.[1]} on ${/background color: (#\w+)/.exec(s)?.[1]} (${/contrast of ([\d.]+)/.exec(s)?.[1]})`
            : (n.target?.join(" ") ?? "").slice(0, 70);
        if (!pairs.has(key)) pairs.set(key, { n: 0, at: (n.target?.join(" ") ?? "").slice(0, 70) });
        pairs.get(key).n += 1;
      }
      [...pairs.entries()]
        .sort((a, b) => b[1].n - a[1].n)
        .slice(0, 8)
        .forEach(([k, info]) => console.log(`      ${String(info.n).padStart(3)}x  ${k}  ${info.at}`));
    });
  } else {
    console.log(`      ${label.padEnd(18)} clean`);
  }
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
}

/* Keyboard: the skip link has to be the first stop and has to work. */
await page.goto(BASE, { waitUntil: "networkidle" });
await page.keyboard.press("Tab");
const first = await page.evaluate(() => ({
  text: document.activeElement?.textContent?.trim().slice(0, 40),
  href: document.activeElement?.getAttribute("href"),
}));
if (first.href !== "#main") {
  console.log(`\n  ! first Tab stop is "${first.text}" (${first.href}), expected the skip link`);
  total += 1;
} else {
  console.log("      skip link          first Tab stop, ok");
}

await page.close();
await browser.close();

console.log(total ? `\n${total} accessibility issue(s)` : "\nno accessibility violations");
if (total) process.exitCode = 1;
