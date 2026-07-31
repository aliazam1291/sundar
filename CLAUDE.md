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
```

Full-page shots of this site are 15–20k pixels tall and unreadable once scaled.
For layout review use `--width 390 --scroll <y>` and step down the page in
viewport-sized slices instead.

`scripts/shot.mjs` also reports console errors and page errors — a silent
screenshot with a clean console is the actual pass condition. Output goes to
`shots/`, which is gitignored.

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
