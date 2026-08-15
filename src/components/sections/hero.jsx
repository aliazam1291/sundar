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

/* The claims that used to only live in Sourcing, restated short enough to
   fit under the fold — the first screen a visitor sees should carry at
   least one reason to trust the pack, not just the brand line. */
const HERO_CLAIMS = [
  "100% Pure Spices",
  "No Artificial Colour",
  "Hygienically Packed",
  "Cold-milled Under 40°C",
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

          <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ghee/20 pt-5">
            {HERO_CLAIMS.map((claim) => (
              <li key={claim} className="label-micro text-ghee/75">
                {claim}
              </li>
            ))}
          </ul>
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
    </section>
  );
}
