import Link from "next/link";
import PackShot from "@/components/pack-shot";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import { getProduct } from "@/lib/products";

/**
 * Landing hero.
 *
 * This used to be a three-way range switcher. It stopped making sense once
 * the whole catalogue moved under Essentials — two of its three tabs would
 * have switched to an empty range and a pack that is not actually sold in
 * it. One flagship pack on the lit plinth, one CTA, and the claims that
 * earn the click.
 */

/**
 * The four reasons to trust the pack.
 *
 * These were a row of faint micro-labels tucked under the buttons, which at
 * 390px wrapped onto two ragged lines and read as legal small print. They are
 * the only reasons-to-believe above the fold, so they get their own band under
 * the hero: four equal panels, each one a claim, in the brand's own voice.
 */
const TRUST = [
  { title: "100% Pure Spices", note: "The spice, and nothing bulking it out", icon: "sprig" },
  { title: "No Artificial Colour", note: "The red is the chilli. Nothing else.", icon: "chilli" },
  { title: "Hygienically Packed", note: "Sealed the day it is ground", icon: "jar" },
  { title: "Cold-milled Under 40°C", note: "Slow and cool, so the oil stays in the spice", icon: "chakki" },
];

/* Garam masala rather than lal mirch: the red chilli cutout is a composite
   that carries its own "RED CHILLI POWDER" banner and a 500g flash, so at
   hero size it fought the headline and got clipped by the plinth. The jar
   is a clean single object, and it is the blend most people arrive for. */
const HERO_PACK = "garam-masala";

/* deterministic sprinkle field — no hydration mismatch */
const SPRINKLES = [
  { l: 18, d: 0, s: 2.4 }, { l: 32, d: 0.5, s: 3.0 }, { l: 46, d: 1.1, s: 2.6 },
  { l: 58, d: 0.3, s: 3.3 }, { l: 70, d: 1.5, s: 2.2 }, { l: 80, d: 0.9, s: 2.9 },
];

export default function Hero() {
  const hero = getProduct(HERO_PACK);

  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-forest-2 via-forest to-forest text-ghee">
      <Sunburst
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[120%] w-full text-marigold"
        rays={56}
        opacity={0.11}
      />
      <div className="tex-grid pointer-events-none absolute inset-0 opacity-[0.35]" />

      <div className="pointer-events-none absolute inset-0 text-marigold/20" aria-hidden="true">
        <SpiceIcon mono name="starAnise" className="anim-float absolute left-[2%] top-[8%] w-14 md:w-20" style={{ "--dur": "8s", "--r": "-12deg" }} />
        <SpiceIcon mono name="chilli" className="anim-float absolute bottom-[8%] left-[3%] w-12 md:w-16" style={{ "--dur": "7.4s", "--delay": "0.6s", "--r": "8deg" }} />
      </div>

      <div className="shell relative grid items-center gap-10 pb-12 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-16 lg:pt-12">
        {/* ── copy ── */}
        <div className="anim-rise">
          <p
            className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
            style={{ animationDelay: "60ms", "--plaque-bg": "var(--color-dragonfruit)", "--plaque-fg": "var(--color-paper)" }}
          >
            <Star className="w-3.5" />
            Since 1975 · Indore, Madhya Pradesh
          </p>

          <h1
            className="font-poster text-drop mt-4 text-[clamp(2.6rem,5.6vw,4.8rem)] leading-[0.94] text-ghee"
            style={{ "--drop": "var(--color-oxblood)" }}
          >
            Kam Masala,
            <br />
            <span className="text-marigold">Poora Swaad.</span>
          </h1>

          <p className="lede mt-4 max-w-lg text-ghee/80">
            50 saal se har khane mein.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/shop" className="btn btn-gold">
              <SpiceIcon mono name="jar" className="w-4" />
              Shop Now
            </Link>
            <Link href="/story" className="btn btn-ghost text-marigold">
              A boy, a bicycle, 1975
            </Link>
          </div>

        </div>

        {/* ── the stage ── */}
        <div className="relative">
          {/* The plinth encloses the pack and its caption and nothing else.
              Capped and centred: the stage column is far wider than the pack,
              so an arch sized off the column left a huge empty green field
              with a 310px jar marooned in the middle of it. */}
          <div className="relative mx-auto w-full max-w-108">
          {/* plinth: a lit arch the pack stands on, so it is somewhere */}
          <div className="pointer-events-none absolute inset-x-[4%] top-[3%] -bottom-1 arch-top rounded-b-2xl border-2 border-marigold/40 bg-linear-to-b from-marigold/[0.14] to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[62%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-marigold/15 blur-3xl" aria-hidden="true" />

          {/* Rotating seal, parked top-LEFT. The pack's own "Best seller"
              roundel sits top-right, and once the stage was capped to 27rem
              the two overlapped and shredded each other's type. Opposite
              corners is the only arrangement where both stay readable.
              Still hidden on the narrowest screens, where there is no room
              for either flourish beside the jar. */}
          <div className="anim-spin-slow absolute -left-4 top-[6%] z-20 hidden w-16 sm:block sm:w-20" style={{ "--dur": "34s" }}>
            <svg viewBox="0 0 120 120" className="w-full text-marigold" aria-hidden="true">
              <defs>
                <path id="seal-path" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" fill="none" />
              </defs>
              <text className="font-body" fill="currentColor" style={{ fontSize: "12.5px", letterSpacing: "0.19em", fontWeight: 700 }}>
                <textPath href="#seal-path" startOffset="0%">
                  SLOW-GROUND · SINGLE-ORIGIN · SINCE 1975 ·
                </textPath>
              </text>
            </svg>
            <Star className="absolute left-1/2 top-1/2 w-4 -translate-x-1/2 -translate-y-1/2 text-marigold" />
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-[8%] z-10 h-28" aria-hidden="true">
            {SPRINKLES.map((p, i) => (
              <span
                key={i}
                className="anim-sprinkle absolute top-0 block h-1.5 w-1.5 rounded-full bg-marigold"
                style={{ left: `${p.l}%`, "--delay": `${p.d}s`, "--dur": `${p.s}s` }}
              />
            ))}
          </div>

          {/* the pack */}
          <div className="relative mx-auto w-full max-w-[268px] px-2 pt-7 sm:max-w-[310px]">
            <div className="anim-swap">
              <PackShot product={hero} size="lg" priority />
            </div>
          </div>

          {/* caption */}
          <div className="anim-swap relative mt-5 pb-5 text-center">
            <p className="h-card text-ghee">{hero.tagline}</p>
            <p className="font-deva mt-1 text-copy text-marigold" lang="hi">{hero.hindi}</p>
          </div>
          </div>
        </div>
      </div>

      <div className="beads relative h-3 w-full text-marigold/50" aria-hidden="true" />

      {/* ── the four reasons ──
          Its own band rather than a line of small print: equal panels, real
          contrast, and each claim carrying the sentence that backs it up. */}
      <div className="relative border-t-2 border-marigold/25 bg-forest-2">
        <div className="shell">
          {/* One rule between panels, drawn by the grid's own gap showing the
              band colour through — simpler and less breakable than per-item
              border classes that have to know their own position. */}
          <ul className="grid gap-px bg-marigold/20 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map((t) => (
              <li
                key={t.title}
                className="flex items-start gap-3.5 bg-forest-2 px-1 py-6 sm:px-5 lg:px-6"
              >
                <SpiceIcon mono name={t.icon} className="mt-0.5 w-6 shrink-0 text-marigold" />
                <span className="min-w-0">
                  <span className="label-micro block text-marigold">{t.title}</span>
                  <span className="mt-1.5 block text-copy leading-snug text-ghee">{t.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
