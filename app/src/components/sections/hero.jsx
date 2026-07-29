import Link from "next/link";
import PackShot from "@/components/pack-shot";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import { getProduct } from "@/lib/products";

const STATS = [
  { n: "50", label: "years, one recipe" },
  { n: "18", label: "blends in the range" },
  { n: "12", label: "sourcing districts" },
  { n: "0", label: "additives, ever" },
];

/* deterministic sprinkle field — no hydration mismatch */
const SPRINKLES = [
  { l: 18, d: 0, s: 2.4 }, { l: 30, d: 0.5, s: 3.0 }, { l: 44, d: 1.1, s: 2.6 },
  { l: 55, d: 0.3, s: 3.3 }, { l: 66, d: 1.5, s: 2.2 }, { l: 76, d: 0.9, s: 2.9 },
  { l: 24, d: 1.9, s: 3.1 }, { l: 61, d: 2.2, s: 2.5 },
];

export default function Hero() {
  const hero = getProduct("darbari-garam-masala");

  return (
    <section className="relative isolate overflow-hidden bg-forest text-ghee">
      <Sunburst
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[120%] w-full text-marigold"
        rays={56}
        opacity={0.11}
      />
      <div className="tex-grid pointer-events-none absolute inset-0 opacity-[0.35]" />

      {/* floating spice glyphs */}
      <div className="pointer-events-none absolute inset-0 text-marigold/25" aria-hidden="true">
        <SpiceIcon name="starAnise" className="anim-float absolute left-[6%] top-[18%] w-14 md:w-20" style={{ "--dur": "8s", "--r": "-12deg" }} />
        <SpiceIcon name="cardamom" className="anim-float absolute right-[8%] top-[12%] w-10 md:w-14" style={{ "--dur": "6.5s", "--delay": "1.2s", "--r": "14deg" }} />
        <SpiceIcon name="chilli" className="anim-float absolute bottom-[16%] left-[11%] w-12 md:w-16" style={{ "--dur": "7.4s", "--delay": "0.6s", "--r": "8deg" }} />
        <SpiceIcon name="cinnamon" className="anim-float absolute bottom-[26%] right-[5%] w-12 md:w-16" style={{ "--dur": "9s", "--delay": "2s", "--r": "-18deg" }} />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8 lg:px-10 lg:pb-24 lg:pt-20">
        {/* ── copy ── */}
        <div className="anim-rise">
          <p
            className="eyebrow flex items-center gap-2.5 text-marigold"
            style={{ animationDelay: "60ms" }}
          >
            <Star className="w-3.5" />
            Since 1975 · Indore, Madhya Pradesh
          </p>

          <h1 className="h-poster mt-5 text-ghee" style={{ animationDelay: "140ms" }}>
            Bring your region
            <br />
            <span className="text-marigold">back to your plate.</span>
          </h1>

          <p
            className="lede mt-7 max-w-xl text-ghee/78"
            style={{ animationDelay: "240ms" }}
          >
            <strong className="font-semibold text-ghee">Kam masala, poora swaad.</strong>{" "}
            Fifty years of slow-ground, single-origin blends — Heritage for the occasion,
            Regions for the craving, Essentials for every night in between.
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-3.5"
            style={{ animationDelay: "340ms" }}
          >
            <Link href="/shop" className="btn btn-gold">
              <SpiceIcon name="jar" className="w-4" />
              Shop the range
            </Link>
            <Link href="/story" className="btn btn-ghost text-ghee">
              A boy, a bicycle, 1975
            </Link>
          </div>

          {/* stats */}
          <dl
            className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-6 border-t border-ghee/20 pt-8 sm:grid-cols-4"
            style={{ animationDelay: "440ms" }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <dd className="font-poster text-[2.4rem] leading-none text-marigold">{s.n}</dd>
                <dt className="mt-1.5 text-[0.72rem] uppercase tracking-[0.13em] text-ghee/55">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* ── pack stage ── */}
        <div className="relative mx-auto w-full max-w-[380px] lg:max-w-none">
          {/* halo */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-marigold/12 blur-3xl" />

          {/* rotating seal */}
          <div className="anim-spin-slow absolute -right-1 -top-3 z-10 w-24 sm:w-28 lg:-right-4" style={{ "--dur": "34s" }}>
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
            <Star className="absolute left-1/2 top-1/2 w-5 -translate-x-1/2 -translate-y-1/2 text-marigold" />
          </div>

          {/* sprinkle */}
          <div className="pointer-events-none absolute inset-x-0 top-[6%] z-10 h-32" aria-hidden="true">
            {SPRINKLES.map((p, i) => (
              <span
                key={i}
                className="anim-sprinkle absolute top-0 block h-1.5 w-1.5 rounded-full bg-marigold"
                style={{ left: `${p.l}%`, "--delay": `${p.d}s`, "--dur": `${p.s}s` }}
              />
            ))}
          </div>

          <div className="anim-float px-6 sm:px-10 lg:px-4" style={{ "--dur": "9s" }}>
            <PackShot product={hero} size="lg" />
          </div>

          <div className="mt-7 text-center">
            <p className="font-editorial text-[1.15rem] text-ghee">{hero.tagline}</p>
            <p className="font-deva mt-1.5 text-sm text-marigold">{hero.hindi}</p>
          </div>
        </div>
      </div>

      {/* bottom rule */}
      <div className="relative mx-auto max-w-[1400px] px-4 pb-8 sm:px-6 lg:px-10">
        <p className="rule-diamond text-ghee/40">
          <span className="whitespace-nowrap text-[0.68rem] uppercase tracking-[0.3em]">
            Scroll · मसालों का सिकंदर
          </span>
        </p>
      </div>
    </section>
  );
}
