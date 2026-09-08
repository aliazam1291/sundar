@AGENTS.md

# Sunder Masala — working notes

Truck-art poster site for a masala brand. Next.js 16 App Router, React 19,
Tailwind v4. `README.md` has the stack and the design rationale; this file is
about how to *work* on it. Read the README's "Design notes" before touching
anything visual.

## The rule that matters most

**Nothing here is verified by a build.** The page is hand-drawn SVG, hard
shadows and hand-tuned coordinates. `next build` passing tells you the JSX
parsed, not that the chef has both arms attached. Any change to artwork,
layout or motion must be looked at in a browser before you call it done.

## Verifying visually

Playwright and Chromium are installed. The dev server must be running.

```bash
npm run dev                                        # terminal 1

npm run shot -- /recipes                           # whole page
npm run shot -- /recipes --sel "#kitchen"          # one section
npm run shot -- / --full --out shots/home.png      # full-page
npm run shot -- / --width 390 --scroll 620         # a readable mobile slice
npm run shot -- /recipes --click "text=Dal Tadka" --click "text=Next step"
npm run walk                                       # every kitchen pose at once
npm run audit                                      # every page at 390/768/1440
npm run search-check                               # drive the navbar search
npm run packs                                      # re-pull + cut the pack shots
npm run a11y                                       # axe, every page + the menus
npm run seo                                        # structured data + head tags
```

`a11y` and `seo` need a production server (see below), not `next dev`.

Full-page shots of this site are 15–20k pixels tall and unreadable once scaled.
For layout review use `--width 390 --scroll <y>` and step down the page in
viewport-sized slices instead.

`scripts/shot.mjs` also reports console errors and page errors — a silent
screenshot with a clean console is the actual pass condition. Output goes to
`shots/`, which is gitignored.

### Replacing a file in `public/` does not invalidate the image cache

`next/image` caches its optimised output, so overwriting a file under
`public/` without renaming it leaves every screenshot showing the *old*
picture. Nothing errors; the page just quietly lies to you. After
`npm run packs` or `npm run photos`, clear it:

```bash
rm -rf .next/dev/cache/images        # dev; Next 16 moved it here from .next/cache/images
```

Two things made this expensive to diagnose. The path moved in Next 16, so the
obvious `rm -rf .next/cache/images` silently deletes nothing — check that the
directory you are deleting actually exists. And the cache is keyed on `Accept`,
so `curl` (which gets JPEG) can return the new image while the browser (which
gets AVIF) still gets the old one — verifying with `curl` alone will tell you
it is fixed when it is not. To confirm what the page really loaded, read
`img.currentSrc` and `img.naturalWidth` in the browser, or check for
`X-Nextjs-Cache: HIT` with a browser-like `Accept: image/avif,...` header.

### Verify navigation against a production build, not `next dev`

Fast Refresh rebuilds mid-test and silently swallows `router.push`, so a
client-side navigation check will fail intermittently in dev and send you
hunting a bug that is not there. It cost several wrong diagnoses once already.

```bash
npm run build && npx next start -p 3100
BASE_URL=http://localhost:3100 npm run search-check
```

Everything visual is fine in dev. Only routing needs the production server.

`scripts/walk-recipes.mjs` drives both interactive pieces on `/recipes` — nine
cooking poses at the stove, then three bowls and the verdicts at the tasting
bench — and leaves one picture per state in `shots/walk/` (`k-*` for the
kitchen, `t-*` for the tasting). Run it after any change to `chef-kitchen.jsx`,
`chef-tasting.jsx`, `chef-face.jsx` or the `anim-k-*` rules; there are far more
combinations than you can hold in your head and it is easy to break one while
fixing another.

### Layout faults

`scripts/audit-layout.mjs` walks every page at 390/768/1440 and separates two
things that look alike:

- **Faults** — the page scrolls sideways, or something escaped the viewport.
  Always a bug.
- **Crops** (reported as "review only") — a box hiding content bigger than
  itself. Usually *intentional* here: the watermark spice icons are placed
  past the card edge (`-right-5`, `-bottom-8 -right-6`) precisely so the card
  crops them. Read these; don't assume they are broken.

`scripts/measure.mjs <path> <width> <selector>...` gives the exact numbers for
one element and names whichever ancestor is clipping it.

The trap that produced the one real fault so far: **a grid item defaults to
`min-width: auto`**, so a non-wrapping flex row inside one does not merely
overflow itself — it widens the whole grid track past the viewport and drags
its absolutely-positioned siblings out with it. If something unrelated is
hanging off the right edge, look for an unwrapped row nearby.

### Colour — never fade text with `opacity`

This is the single biggest source of accessibility failures this design has
had, by a wide margin. `opacity-85` on text over a saturated card blends the
text *toward its own background*, so a pairing that measures fine at full
strength quietly drops under 4.5:1. `text-paper` on carrot measured **2.54**
at 80%. The colour was never the problem; the fade was.

- Text: no `opacity-*`. Pick a colour that already passes.
- Decoration (dividers, watermark icons, `rule-dots`): fade freely.

The palette carries `*-ink` and `*-deep` variants precisely for this. The
bright fills are for *fills* — `rani`, `carrot`, `dragonfruit`, `violet` and
`tomato` cannot carry `text-paper` (paper on rani is 4.22, on carrot 3.19), so
anything with text on it uses `rani-deep`, `carrot-ink`, `dragonfruit-ink`,
`violet-ink`, `chilli-ink` instead. `RECIPE_TONE` in `lib/recipes.js` lists
the measured ratio beside every pairing; keep that up to date if you add one.

`lib/color.js` has `contrast()` and `readableOn()` — use them rather than
guessing which of ink/paper to put on a given accent.

### SVG transforms — the trap

CSS transforms on SVG elements default to `transform-box: view-box`, so
`rotate()` and `scale()` pivot around the centre of the **whole drawing**, not
the shape. A falling grain of chilli will fly clear across the kitchen.

- Loose shapes (steam, sparks, spice, bubbles) → `transform-box: fill-box`,
  already applied to the `.anim-k-*` effect classes in `globals.css`.
- Groups positioned in user units (arms, flame, cooker weight) → give an
  explicit `transformOrigin` in viewBox coordinates and do **not** set
  `transform-box`, which would re-base those numbers onto the shape.

### Hydration

Illustrations render on the server first. Never call `Math.random()` in one —
use a fixed jitter table (see `SPARKS` / `DUST` in `chef-kitchen.jsx`).

## Sound

All audio is synthesised with Web Audio at play time; there are no audio
assets in this repo and there should not be any.

- `src/lib/kitchen-audio.js` — the nine cooking sounds (sizzle, seed pops,
  bubbles, cooker whistle, ladle clank, chop, masher thud, pouring, brass bell)
- `src/components/sections/horn-ok-please.jsx` — the lorry pressure horn

An `AudioContext` built before a user gesture starts suspended and stays
silent, so it is always created lazily inside a click handler. Keep a visible
mute control on anything that makes noise.

To check sound in a headless browser, instrument the constructor rather than
listening for it — patch `window.AudioContext` in `page.addInitScript` and
count `createOscillator` / `createBufferSource` calls.

## Pack shots

`public/packs/*.webp` are cutouts derived from the live Shopify store, not
hand-made assets. `npm run packs` rebuilds them end to end; the intermediates
in `packs-src/` and `packs-backup/` are gitignored.

Two things that already went wrong and will again if the pipeline is edited
carelessly:

- **Do not pick the biggest image.** Most SKUs carry the flat back-of-pack
  recipe artwork at a higher resolution than the actual product shot. They are
  told apart by border whiteness — a real pack shot sits on white (100%), flat
  artwork fills the frame (~32%).
- **The knockout tolerance is tight for a reason.** The studio background is
  exactly 255; a carton's own white panel is 247 and its highlight 240. A
  generous tolerance floods through the pack and deletes its white face. The
  contact shadow is taken by a second, distance-capped pass instead.

`npm run packs` ends with a magenta contact sheet in `shots/packs-qa/` —
white-on-white hides both failures, magenta shows them instantly.

## Content lives in `src/lib`

`products.js` (32 real SKUs), `recipes.js`, `tasting.js`, `content.js`.
Components read from these; never inline a product name, price or recipe step
in JSX. Everything names its SKUs by slug so the cards can link into the shop
and nothing drifts when the catalogue changes.

Each recipe step carries an `act` from `COOK_ACTIONS` — that one word drives
the pose, the vessel and the sound at once. Adding a step means giving it an
action that already exists, or adding the action in all three places:
`COOK_ACTIONS`, `SCENES` in `chef-kitchen.jsx`, `SCENES` in `kitchen-audio.js`.

`tasting.js` holds the tasting game. Verdicts are **computed**, never scripted:
`judge()` weighs what is in the bowl against what the dish declares it wants,
which is why the same amchur is right in the aloo and ruinous in the chai. A
new dish is a `DISHES` entry with `essential` / `good` / `wrong` — no component
changes. Keep the order of checks in `judge()` as it is: something that does
not belong beats too much of something, which beats not enough of anything,
because that is the order a cook would complain in.

## Skills

Invoke with `/<name>`.

| Skill | Use it for |
| --- | --- |
| `run` | Launching the dev server and driving the app to confirm a change |
| `simplify` | After a feature lands — reuse, dead code, altitude cleanups |
| `security-review` | Before shipping anything that takes user input |
| `review` | Reviewing a GitHub PR (`/code-review` for the working diff) |
| `dataviz` | Any chart or graph, before writing the first line of chart code |
| `artifact-design` | Required before publishing an HTML/MD Artifact |
| `update-config` | Editing `settings.json`, permissions, hooks |
| `init` | Regenerating this file |

Skip `claude-api` and the Agent SDK skills — there is no LLM code in this repo.

## MCP servers

`.mcp.json` is checked in and registers one project-scoped server:

- **playwright** — drives a real Chromium: navigate, click, snapshot the
  accessibility tree, screenshot. Reach for it when you want to *explore* the
  running site interactively; reach for `npm run shot` when you want a
  repeatable check. Screenshots land in `shots/mcp/`.

Available from the account, not the repo — useful here but optional:

- **Figma** — the brand decks are the design source of truth. Use
  `get_design_context` / `get_screenshot` when implementing a comp, and load
  the `/figma-use` skill before any `use_figma` call.
- **Slack**, **Gmail**, **Google Drive**, **ClickUp** — sharing work and
  tracking tasks, not for building.

Some connectors need authorising in claude.ai connector settings before their
tools work; that cannot be done from a non-interactive session.

## Housekeeping

- `npm run lint` — `site-header.jsx:54` has a known pre-existing
  `set-state-in-effect` error. Do not add new ones: for "end this on the last
  step" logic, decide in the timer or the handler, not in a follow-up effect.
- The two `*.pdf` brand decks are gitignored — large and client-confidential.
- Commit only when asked.
