"use client";

import { useState } from "react";
import Link from "next/link";
import PackShot from "@/components/pack-shot";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import { RANGE_LIST, getProduct, productsByRange, PRODUCTS } from "@/lib/products";

/**
 * Landing hero — an interactive range switcher.
 *
 * One pack on a void said nothing about a three-range brand, so the stage is
 * the control: pick a range and the pack, the line and the accent all change.
 * The pack sits on a lit plinth rather than floating.
 */

const STATS = [
  { n: "50", label: "years" },
  { n: String(PRODUCTS.length), label: "blends" },
  { n: "12", label: "districts" },
  { n: "0", label: "additives" },
];

/* One hero pack per range. */
const HERO_FOR = {
  heritage: "shahi-hing",
  regions: "jeeravan-poha-masala",
  essentials: "lal-mirch-powder",
};

/* deterministic sprinkle field — no hydration mismatch */
const SPRINKLES = [
  { l: 18, d: 0, s: 2.4 }, { l: 32, d: 0.5, s: 3.0 }, { l: 46, d: 1.1, s: 2.6 },
  { l: 58, d: 0.3, s: 3.3 }, { l: 70, d: 1.5, s: 2.2 }, { l: 80, d: 0.9, s: 2.9 },
];

export default function Hero() {
  const [rangeId, setRangeId] = useState("essentials");
  const range = RANGE_LIST.find((r) => r.id === rangeId);
  const hero = getProduct(HERO_FOR[rangeId]);
  const count = productsByRange(rangeId).length;

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

          <p className="font-deva mt-4 text-[clamp(1.15rem,2vw,1.6rem)] leading-tight text-marigold" lang="hi">
            अपना रीजन, अपनी थाली।
          </p>

          <h1
            className="font-poster text-drop mt-1.5 text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.94] text-ghee"
            style={{ "--drop": "var(--color-oxblood)" }}
          >
            Bring your region
            <br />
            <span className="text-marigold">back to your plate.</span>
          </h1>

          <p className="lede mt-4 max-w-lg text-ghee/80">
            <strong className="font-semibold text-marigold">Kam masala, poora swaad.</strong>{" "}
            Fifty years of slow-ground, single-origin blends — three ranges, one recipe book.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href={`/shop?range=${rangeId}`} className="btn btn-gold">
              <SpiceIcon mono name="jar" className="w-4" />
              Shop {range.name}
            </Link>
            <Link href="/story" className="btn btn-ghost text-marigold">
              A boy, a bicycle, 1975
            </Link>
          </div>

          {/* The number reads above its label, but a dl has to be dt-then-dd
              in the markup — so the source order is correct and the visual
              order is flipped in CSS. */}
          <dl className="mt-8 flex flex-wrap gap-x-9 gap-y-4 border-t border-ghee/20 pt-5">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="label-micro mt-1.5 text-ghee/75">{s.label}</dt>
                <dd className="font-poster text-[1.8rem] leading-none text-marigold">{s.n}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── the stage ── */}
        <div className="relative">
          {/* The plinth encloses the pack and its caption and nothing else.
              Sizing it off the whole column instead meant that once the
              switcher chips wrapped — which they do below ~640px — the arch's
              bottom edge came to rest straight through the chip row. */}
          <div className="relative">
          {/* plinth: a lit arch the pack stands on, so it is somewhere */}
          <div className="pointer-events-none absolute inset-x-[4%] top-[3%] -bottom-1 arch-top rounded-b-2xl border-2 border-marigold/40 bg-linear-to-b from-marigold/[0.14] to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[62%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-marigold/15 blur-3xl" aria-hidden="true" />

          {/* Rotating seal. Hidden on the narrowest screens: the pack is
              centred while the seal hugs the column's right edge, so once the
              column drops under ~640px the two converge and the seal's ring
              runs straight through the pack's roundel, costing both. The
              roundel carries the actual claim, so the flourish gives way. */}
          <div className="anim-spin-slow absolute right-[3%] top-[2%] z-20 hidden w-16 sm:block sm:w-20" style={{ "--dur": "34s" }}>
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

          {/* the pack — keyed so each switch replays the entrance */}
          <div className="relative mx-auto w-full max-w-[268px] px-2 pt-7 sm:max-w-[310px]">
            <div key={hero.slug} className="anim-swap">
              <PackShot product={hero} size="lg" />
            </div>
          </div>

          {/* caption */}
          <div key={`${hero.slug}-cap`} className="anim-swap relative mt-5 pb-5 text-center">
            <p className="h-card text-ghee">{hero.tagline}</p>
            <p className="font-deva mt-1 text-copy text-marigold" lang="hi">{hero.hindi}</p>
          </div>
          </div>

          {/* ── the switcher ──
              Must wrap. Three chips come to ~395px, and a grid item defaults
              to min-width:auto — so an unwrapped row does not just overflow
              itself, it widens the whole stage column past the viewport and
              takes the rotating seal off the right edge with it. */}
          <div
            className="relative mt-5 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Choose a range"
          >
            {RANGE_LIST.map((r) => {
              const on = r.id === rangeId;
              return (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setRangeId(r.id)}
                  className={`label-micro flex items-center gap-2 rounded-full border-2 px-3.5 py-2.5 transition-all duration-300 ${
                    on
                      ? "border-marigold bg-marigold text-ink shadow-[3px_3px_0_var(--color-oxblood)]"
                      : "border-ghee/30 text-ghee/70 hover:border-marigold hover:text-marigold"
                  }`}
                >
                  <SpiceIcon mono name={r.icon} className="w-4 shrink-0" />
                  {r.name}
                </button>
              );
            })}
          </div>

          <p className="label-micro mt-3 text-center text-ghee/55" aria-live="polite">
            {range.who} · {count} blends
          </p>
        </div>
      </div>

      <div className="beads relative h-3 w-full text-marigold/50" aria-hidden="true" />
    </section>
  );
}
