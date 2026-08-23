"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PackShot from "@/components/pack-shot";
import { Star, SpiceIcon } from "@/components/spice-icons";
import { PRODUCTS, CATEGORIES, formatPrice } from "@/lib/products";

/**
 * The tasting bench — build a chutki, get a real blend back.
 *
 * Three dials scored against the actual catalogue: `heat` is a real field on
 * every product, and aroma/tang are derived from what a spice actually is, so
 * the recommendation is a genuine match rather than a random pick.
 *
 * It also enforces the brand's own argument: pile all three dials up and it
 * tells you that is a fistful, not a chutki.
 */

const DIALS = [
  { id: "heat", label: "Heat", hi: "तीखा", icon: "flame", tint: "var(--color-tomato)" },
  { id: "aroma", label: "Aroma", hi: "ख़ुशबू", icon: "cardamom", tint: "var(--color-kiwi)" },
  { id: "tang", label: "Tang", hi: "खटास", icon: "jar", tint: "var(--color-sun)" },
];

/* Aroma and tang are not stored on the catalogue, so derive them from what the
   spice is. Keyed on `kind`, which comes straight from the live product feed. */
const AROMA = {
  "Garam Masala Powder": 5, Elaichi: 5, Cloves: 5, "Kasuri Methi": 5, "Shahi Paneer Masala": 4,
  "Kitchen King Masala": 4, "Biryani Masala": 5, "Asafoetida (Hing)": 5, "Fennel Seeds": 4,
  "Carom Seeds": 4, "Coriander Powder": 3, "Cumin Seeds": 4, "Dry Ginger Powder": 3,
  "Sambhar Masala": 4, "Chole Masala": 4, "Pav Bhaji Masala": 4, "Dal Masala": 3,
  "Mustard Seeds": 2, "Methi Dana": 2, "Turmeric Powder": 2, "Red Chilli Powder": 1,
  "Kashmiri Mirchi Powder": 1, "Kuti Teja Mirch Powder": 1, "Kali Mirch": 4,
  "Black Pepper Powder": 4, "White Pepper Powder": 3, "Amchur Powder": 2,
  "Chaat Masala": 4, Jaljira: 4, "Achar Masala": 4, "Raita Masala": 3, Jeeravan: 4,
};
const TANG = {
  "Amchur Powder": 5, "Chaat Masala": 5, Jaljira: 5, "Achar Masala": 4, Jeeravan: 4,
  "Raita Masala": 3, "Chole Masala": 3, "Sambhar Masala": 2, "Kasuri Methi": 2,
};

const score = (p) => ({
  heat: p.heat,
  aroma: AROMA[p.kind] ?? 2,
  tang: TANG[p.kind] ?? 0,
});

export default function TastingBench() {
  const [mix, setMix] = useState({ heat: 3, aroma: 4, tang: 1 });

  const total = mix.heat + mix.aroma + mix.tang;
  const overdone = total >= 12;

  const match = useMemo(() => {
    let best = null;
    let bestD = Infinity;
    for (const p of PRODUCTS) {
      const s = score(p);
      // weight heat highest — it is the field we actually hold real data for
      const d =
        Math.pow(s.heat - mix.heat, 2) * 1.6 +
        Math.pow(s.aroma - mix.aroma, 2) * 1.1 +
        Math.pow(s.tang - mix.tang, 2);
      if (d < bestD) {
        bestD = d;
        best = p;
      }
    }
    return best;
  }, [mix]);

  /* The shelf, not the range — the range chip read "Essentials" whatever the
     bench handed back, which told the player nothing about what they built. */
  const category = CATEGORIES[match.category];

  return (
    <section className="relative isolate overflow-hidden bg-cobalt section text-paper">
      <div className="tex-dots pointer-events-none absolute inset-0 text-sky" aria-hidden="true" />

      <div className="shell relative">
        <div className="max-w-2xl" data-reveal="up">
          <p
            className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
            style={{ "--plaque-bg": "var(--color-sun)", "--plaque-fg": "var(--color-ink)" }}
          >
            <Star className="w-3.5" />
            The tasting bench
          </p>

          <p className="font-deva mt-4 text-[clamp(1.15rem,2vw,1.6rem)] leading-tight text-sun" lang="hi">
            अपनी चुटकी बनाइए।
          </p>
          <h2 className="h-editorial mt-1.5">Build a chutki. We will name it.</h2>
          <p className="lede mt-4 text-paper/90">
            Turn the three dials to the plate you have in your head. Every blend on the shelf is
            scored the same way, so whatever you land on is a real one.
          </p>
        </div>

        <div className="section-body grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          {/* ── the dials ── */}
          <div className="card-poster card-pad bg-paper text-ink" data-reveal="left">
            {DIALS.map((d) => (
              <div key={d.id} className="mb-7 last:mb-0">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor={`dial-${d.id}`} className="flex items-center gap-2.5">
                    <SpiceIcon name={d.icon} className="w-7 shrink-0" />
                    <span className="h-card">{d.label}</span>
                    <span className="font-deva text-copy text-ink-mute" lang="hi">{d.hi}</span>
                  </label>
                  <span className="font-poster text-[1.5rem] leading-none" style={{ color: d.tint }}>
                    {mix[d.id]}
                  </span>
                </div>

                <input
                  id={`dial-${d.id}`}
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={mix[d.id]}
                  onChange={(e) => setMix((m) => ({ ...m, [d.id]: Number(e.target.value) }))}
                  className="dial mt-3 w-full"
                  style={{ "--dial": d.tint, "--dial-pct": `${(mix[d.id] / 5) * 100}%` }}
                />

                <div className="mt-1.5 flex justify-between">
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <span key={n} className="label-micro text-ink-mute">{n}</span>
                  ))}
                </div>
              </div>
            ))}

            <p
              className={`mt-6 rounded-xl border-2 border-ink px-4 py-3 text-copy ${
                overdone ? "bg-tomato text-paper" : "bg-cream text-ink-soft"
              }`}
              aria-live="polite"
            >
              {overdone
                ? "That is a fistful, not a chutki. Pull something back — less masala, poora swaad."
                : "Balanced. One pinch of this would do the job."}
            </p>
          </div>

          {/* ── the match ── */}
          <div className="card-poster card-pad bg-forest text-ghee" data-reveal="right">
            <p className="label-micro text-marigold">Your blend</p>

            <div key={match.slug} className="anim-swap mt-4 flex items-center gap-5">
              <div className="w-[42%] shrink-0">
                <PackShot product={match} size="sm" tilt={false} />
              </div>

              <div className="min-w-0">
                <span
                  className="chip chip-solid"
                  /* Each category declares the foreground that is readable on
                     its own ground (measured 4.92–9.63:1), so the chip takes
                     the pair straight from the record instead of deriving one. */
                  style={{ "--chip-bg": category.bg, "--chip-fg": category.ink }}
                >
                  {category.name}
                </span>
                <h3 className="h-poster-xs mt-3">{match.name}</h3>
                <p className="label-micro mt-1.5 text-ghee/70">{match.kind}</p>
                <p className="font-deva mt-2 text-copy text-marigold" lang="hi">{match.hindi}</p>
              </div>
            </div>

            <p className="mt-5 text-copy text-ghee/75">{match.tagline}</p>

            <div className="mt-5 flex items-center justify-between gap-4 border-t border-ghee/20 pt-4">
              <span className="font-poster text-[1.5rem] leading-none text-marigold">
                {formatPrice(match.price)}
              </span>
              <Link href={`/shop/${match.slug}`} className="btn btn-gold btn-sm">
                See the blend
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
