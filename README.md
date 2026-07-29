# Sunder Masala

Rebrand site for **Sunder Masala** — *Local Hero Masala, since 1975.*

Built for the repositioning in the Hue Cycle brand strategy decks: three ranges
(Heritage · Regions · Essentials), the "kam masala, poora swaad" idea, and the
founder's story from *A Heritage Film*.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS v4** (`@theme` design tokens in `src/app/globals.css`)
- `next/font` — Anton, Hanken Grotesk, Cinzel, Baloo 2 (the brand type spec)
- Real packaging shots in `public/packs/` (32 PNG cutouts, scraped from
  sundermasala.com and background-knocked-out); every illustration, texture and
  ornament is still vector/CSS

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
    shop/[slug]/page.js   product detail (SSG, 32 routes)
    story/page.js         heritage + the film reel
    regions/page.js       regional map + Regions range
    globals.css           design system: tokens, textures, pack shot, motion
  components/
    sections/             hero, chutki, ranges, featured, journey,
                          sourcing, region-map, ritual, find-us
    spice-icons.jsx       flat folk-poster illustration set + sunburst + ornament
    pack-shot.jsx         vector carton mockup
    logo.jsx              Sunder lockup
    reveal-root.jsx       one IntersectionObserver for all scroll reveals
  lib/
    products.js           the live 32-SKU catalogue, mapped to 3 ranges
    content.js            journey, timeline, regions, ritual, pillars
```

## Design notes

- **Palette** — truck-art poster brights: deep forest, oxblood, chilli, turmeric
  and marigold, plus **rani pink and cobalt**, which carry the sections the spice
  colours can't (they are what stops the page going all-warm). The journey section
  switches to the film's sepia palette as a deliberate tonal break.
- **Type** — per the brand font spec: **Anton** display, **Hanken Grotesk** for
  sub-headings and body, **Cinzel** as the Heritage accent and **Baloo 2** as the
  Regional accent (and all Devanagari). The two accents appear only on range
  headings. Anton sits at `line-height: 0.88`+ — below that its caps collide on
  wrapped lines.
- **Layout** — one container (`.shell`) and one vertical scale (`.section`,
  `.section-body`, `.card-pad`). Nothing sets its own gutters; the page gutter is
  fluid so inner card padding is never wider than the space outside it.
- **Type scale** — five body steps (`text-micro` … `text-copy-lg`) and four
  display steps. No arbitrary `text-[0.94rem]` values.
- **Illustration** — `spice-icons.jsx` is a flat folk-poster set: filled shapes,
  heavy ink outline, per-illustration palette. Pass `mono` for the single-colour
  silhouette used in watermarks and inside buttons.
- **Textures** — riso grain, sunburst rays, halftone dots, ledger grid, barber
  stripes, bead trim, dotted frames, painted plaques and corner ornaments.
- **Motion** — CSS-only. Scroll reveals are progressive enhancement: the hidden
  state is applied by JS (`.reveal-ready`), so the page renders in full without it.

## Notes

Names, kinds, pack sizes, prices, descriptions and packaging shots are the real
catalogue from sundermasala.com. The brand layer on top — taglines, Hindi lines,
heat ratings, range assignment — is written for the rebrand. There is no
provenance data in the source catalogue, so the product page does not claim any.
The India map is a stylised silhouette, not cartographic.
