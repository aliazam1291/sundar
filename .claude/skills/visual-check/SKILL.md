---
name: visual-check
description: Look at this site in a real browser before calling a visual change done. Use whenever a change touches SVG illustration, layout, colour, motion or an interactive section — the chef kitchen, pack shots, spice icons, hero, tailgate, any `anim-*` rule or anything in globals.css. Also use when asked to "check how it looks", "screenshot the page", or to verify a section renders correctly.
---

# Visual check

`next build` passing proves the JSX parsed. It does not prove the chef has two
arms, that the flame is in front of the burner, or that a falling grain of
chilli did not fly across the room. This site is hand-drawn SVG on hand-tuned
coordinates — you have to look at it.

## 1. Get the server up

```bash
npm run dev
```

Run it in the background and confirm `✓ Ready` before shooting. On Windows use
PowerShell for this — npm scripts do not always find `node` on PATH under Git
Bash here.

## 2. Shoot the thing you changed

```bash
npm run shot -- /recipes --sel "#kitchen"      # one section, tightly cropped
npm run shot -- /recipes                       # viewport
npm run shot -- /story --full                  # whole page
```

Interactive states need clicks, in order:

```bash
npm run shot -- /recipes --sel "#kitchen" \
  --click "text=Dal Tadka" --click "text=Next step" --out shots/tadka.png
```

Useful flags: `--out`, `--sel`, `--click` (repeatable), `--wait`, `--width`,
`--height`, `--full`, `--base`.

For the two interactive pieces on `/recipes`, `npm run walk` drives them both
in one browser session and writes a picture per state to `shots/walk/` —
`k-*` for the chef at the stove, `t-*` for the tasting bench.

## 3. Read the output, not just the image

`scripts/shot.mjs` prints every console error and page error it saw and exits
non-zero if there were any. A screenshot that looks fine with a hydration
warning underneath is not a pass.

## 4. Actually open the PNGs

Read the image files. Look for:

- **Layers in the wrong order** — a hand behind a counter it should rest on, a
  flame hidden behind the pan it is meant to heat.
- **Floating parts** — anything with a gap where it should join. Arms drawn as
  two straight segments read as broken elbows; use a quadratic curve.
- **Escaped effects** — a particle far from its source almost always means an
  SVG `transform-box` problem, not bad coordinates. See CLAUDE.md.
- **Text collisions** — steam over the chalkboard, a plaque running off its
  card, Devanagari clipped by a chip.
- **Missing whitespace between JSX children** — JSX strips whitespace-only
  lines between an element and an expression, so `<span/>{value}` renders with
  no gap. Put in an explicit separator.

## 5. Fix, re-shoot, repeat

Change one thing at a time and re-run the same command. Two fixes in one pass
and you cannot tell which one worked.

## Interactive poking

When you want to explore rather than check a known state, use the `playwright`
MCP server registered in `.mcp.json` — it drives the same Chromium and can
snapshot the accessibility tree, which is the fastest way to find the selector
for a control. Use `npm run shot` for anything you want to repeat later.

## Sound

Audio is synthesised, so there is nothing to listen to in headless Chromium.
Verify it by counting nodes instead: patch `window.AudioContext` in
`page.addInitScript`, then check that a step schedules sources, that muting
schedules none, and that nothing is created before the first click.
