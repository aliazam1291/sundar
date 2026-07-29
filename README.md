# Sunder Masala

Rebrand site for **Sunder Masala** — *Local Hero Masala, since 1975.*

Built for the repositioning in the Hue Cycle brand strategy decks: three ranges
(Heritage · Regions · Essentials), the "kam masala, poora swaad" idea, and the
founder's story from *A Heritage Film*.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS v4** (`@theme` design tokens in `src/app/globals.css`)
- `next/font` — Anton, Fraunces, Familjen Grotesk, Tiro Devanagari Hindi
- No image assets: every pack shot, spice icon and texture is vector/CSS

## Run

```bash
cd app
npm install
npm run dev
```

Build: `npm run build` · Serve: `npm run start`

## Structure

```
app/src/
  app/
    page.js               home
    shop/page.js          range-filtered grid (?range=heritage|regions|essentials)
    shop/[slug]/page.js   product detail (SSG, 18 routes)
    story/page.js         heritage + the film reel
    regions/page.js       regional map + Regions range
    globals.css           design system: tokens, textures, pack shot, motion
  components/
    sections/             hero, chutki, ranges, featured, journey,
                          sourcing, region-map, ritual, find-us
    spice-icons.jsx       hand-drawn spice line-art set + sunburst
    pack-shot.jsx         vector carton mockup
    logo.jsx              Sunder lockup
    reveal-root.jsx       one IntersectionObserver for all scroll reveals
  lib/
    products.js           18 blends, 3 ranges
    content.js            journey, timeline, regions, ritual, pillars
```

## Design notes

- **Palette** — deep forest, oxblood, chilli, saffron/marigold on cream paper.
  The journey section switches to the film's sepia palette (terracotta, ivory,
  pitch black) as a deliberate tonal break.
- **Type** — Anton for poster headlines, Fraunces (SOFT/WONK axes) for editorial,
  Familjen Grotesk for body, Tiro Devanagari for Hindi.
- **Textures** — animated riso grain, sunburst rays, halftone dots, ledger grid.
- **Motion** — CSS-only. Scroll reveals are progressive enhancement: the hidden
  state is applied by JS (`.reveal-ready`), so the page renders in full without it.

## Notes

Product copy, pricing and provenance are illustrative placeholders for the
rebrand — replace with real catalogue data before launch. The India map is a
stylised silhouette, not cartographic.
