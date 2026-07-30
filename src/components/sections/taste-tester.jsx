"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Star, SpiceIcon } from "@/components/spice-icons";
import { getProduct } from "@/lib/products";
import ChefFace from "@/components/chef-face";

/**
 * Chakhne Wala — the taste tester.
 *
 * Season the bowl and he tells you, in Hindi, exactly what you have done to
 * it. Every spice is a real SKU; the verdict is computed from what you added,
 * not scripted, so over-chilli and over-amchur read differently.
 *
 * He is the brand's argument with a face on it: the happiest verdict is the
 * one where you have used the least.
 */

/* slug -> what a pinch of it does */
const SPICES = [
  { slug: "lal-mirch-powder", label: "Lal Mirch", hi: "लाल मिर्च", icon: "chilli", tint: "var(--color-tomato)", add: { heat: 2.2 } },
  { slug: "haldi-powder", label: "Haldi", hi: "हल्दी", icon: "turmeric", tint: "var(--color-sun)", add: { earth: 1.6 } },
  { slug: "dhaniya-powder", label: "Dhaniya", hi: "धनिया", icon: "coriander", tint: "var(--color-kiwi)", add: { earth: 1.3, aroma: 0.7 } },
  { slug: "garam-masala", label: "Garam Masala", hi: "गरम मसाला", icon: "starAnise", tint: "var(--color-dragonfruit)", add: { aroma: 2.2, heat: 0.6 } },
  { slug: "amchur-powder", label: "Amchur", hi: "अमचूर", icon: "jar", tint: "var(--color-carrot)", add: { tang: 2.4 } },
  { slug: "kali-mirch-powder", label: "Kali Mirch", hi: "काली मिर्च", icon: "peppercorn", tint: "var(--color-soot)", add: { heat: 1.4, aroma: 0.8 } },
];

const EMPTY = { heat: 0, aroma: 0, tang: 0, earth: 0 };

/* Ordered by priority — the first match wins, so "too much of everything"
   beats "nicely balanced". */
function verdict(t, pinches) {
  const total = t.heat + t.aroma + t.tang + t.earth;

  if (pinches === 0)
    return { key: "bland", face: "flat", hi: "अभी तो कुछ भी नहीं डाला।", en: "You have not put anything in yet.", note: "Start with one pinch." };

  if (total > 15)
    return { key: "fistful", face: "overwhelmed", hi: "अरे! ये तो मुट्ठी भर हो गया!", en: "That is a fistful, not a chutki.", note: "This is the mistake the whole brand is about." };

  if (t.heat >= 6)
    return { key: "burning", face: "burning", hi: "बाप रे! पानी लाओ, जल्दी!", en: "Good grief — bring water, quickly!", note: "Too much chilli. Kashmiri mirchi gives colour without this." };

  if (t.tang >= 5)
    return { key: "sour", face: "sour", hi: "उई! बहुत खट्टा हो गया।", en: "Oof — that has gone very sour.", note: "Amchur is a finisher. One pinch, at the end." };

  if (t.aroma >= 5 && t.heat < 2)
    return { key: "perfumed", face: "dreamy", hi: "वाह! ख़ुशबू ही ख़ुशबू है।", en: "Wonderful — pure aroma.", note: "Rich and warm. It could take a little heat." };

  if (total >= 4 && t.heat >= 1 && t.aroma >= 1)
    return { key: "perfect", face: "delighted", hi: "वाह! एकदम सही। यही तो चुटकी है।", en: "Perfect. This is what a chutki means.", note: "Balanced — heat, aroma and body all present." };

  if (total < 3)
    return { key: "flat", face: "unimpressed", hi: "हम्म... थोड़ा फीका है।", en: "Hmm — a little flat.", note: "It needs one more thing." };

  return { key: "getting", face: "curious", hi: "ठीक है... और थोड़ा?", en: "Not bad — a little more?", note: "Nearly there." };
}

export default function TasteTester() {
  const [taste, setTaste] = useState(EMPTY);
  const [pinches, setPinches] = useState(0);
  const [last, setLast] = useState(null);

  const v = useMemo(() => verdict(taste, pinches), [taste, pinches]);

  const addSpice = (s) => {
    setTaste((t) => {
      const next = { ...t };
      for (const [k, n] of Object.entries(s.add)) next[k] = +(next[k] + n).toFixed(2);
      return next;
    });
    setPinches((n) => n + 1);
    setLast(s.slug);
  };

  const reset = () => {
    setTaste(EMPTY);
    setPinches(0);
    setLast(null);
  };

  const lastProduct = last ? getProduct(last) : null;

  return (
    <section className="relative isolate overflow-hidden bg-cream section">
      <div className="tex-paper pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="shell relative">
        <div className="max-w-2xl" data-reveal="up">
          <p
            className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
            style={{ "--plaque-bg": "var(--color-dragonfruit)", "--plaque-fg": "var(--color-paper)" }}
          >
            <Star className="w-3.5" />
            Chakhne wala
          </p>
          <p className="font-deva mt-4 text-[clamp(1.15rem,2vw,1.6rem)] leading-tight text-rani-ink" lang="hi">
            ज़रा चख के बताइए।
          </p>
          <h2 className="h-editorial mt-1.5 text-ink">Season the bowl. He will tell you.</h2>
          <p className="lede mt-4 max-w-xl text-ink-soft">
            Add a pinch at a time and watch his face. Every spice here is one you can actually
            buy — and the happiest he gets is when you have used the least.
          </p>
        </div>

        <div className="section-body grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          {/* ── the man himself ── */}
          <div
            className="card-poster card-pad bg-forest text-ghee"
            data-reveal="left"
            style={{ "--card-shadow": "var(--color-marigold)" }}
          >
            <div className="relative mx-auto w-full max-w-[300px]">
              <ChefFace expression={v.face} className="w-full" label={v.en} />
            </div>

            {/* what he says */}
            <div key={v.key} className="anim-swap mt-5 text-center">
              <p className="font-deva text-[clamp(1.3rem,3vw,1.9rem)] leading-tight text-marigold" lang="hi">
                {v.hi}
              </p>
              <p className="mt-2 text-copy-lg text-ghee" aria-live="polite">
                {v.en}
              </p>
              <p className="label-micro mt-3 text-ghee/60">{v.note}</p>
            </div>
          </div>

          {/* ── the spice box ── */}
          <div
            className="card-poster card-pad bg-paper text-ink"
            data-reveal="right"
            style={{ "--card-shadow": "var(--color-cobalt)" }}
          >
            <div className="flex items-baseline justify-between gap-4">
              <p className="label-micro text-cobalt-ink">The spice box</p>
              <p className="label-micro text-ink-mute">
                {pinches} {pinches === 1 ? "pinch" : "pinches"}
              </p>
            </div>

            <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {SPICES.map((s) => (
                <li key={s.slug}>
                  <button
                    type="button"
                    onClick={() => addSpice(s)}
                    className="group flex w-full flex-col items-center gap-2 rounded-[1rem] border-2 border-ink bg-cream px-2 py-3.5 transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--color-ink)] active:translate-y-0 active:shadow-none"
                    style={{ borderBottomColor: s.tint, borderBottomWidth: "5px" }}
                  >
                    <SpiceIcon name={s.icon} className="w-9 transition-transform group-hover:scale-110" />
                    <span className="label-micro text-ink">{s.label}</span>
                    <span className="font-deva text-copy text-ink-mute" lang="hi">{s.hi}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* what is in the bowl */}
            <div className="mt-6">
              <p className="label-micro text-ink-mute">In the bowl</p>
              <dl className="mt-3 space-y-2.5">
                {[
                  ["Heat", "तीखा", taste.heat, "var(--color-tomato)"],
                  ["Aroma", "ख़ुशबू", taste.aroma, "var(--color-kiwi)"],
                  ["Tang", "खटास", taste.tang, "var(--color-carrot)"],
                  ["Body", "गहराई", taste.earth, "var(--color-brown)"],
                ].map(([en, hi, val, tint]) => (
                  <div key={en} className="flex items-center gap-3">
                    <dt className="label-micro w-24 shrink-0 text-ink-soft">
                      {en} <span className="font-deva text-ink-mute" lang="hi">{hi}</span>
                    </dt>
                    <dd className="h-2.5 flex-1 overflow-hidden rounded-full border border-ink/25 bg-sand">
                      <div
                        className="h-full rounded-full transition-[width] duration-300"
                        style={{ width: `${Math.min(100, (val / 8) * 100)}%`, background: tint }}
                      />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button type="button" onClick={reset} className="btn btn-ghost btn-sm text-ink">
                Empty the bowl
              </button>
              {lastProduct ? (
                <Link href={`/shop/${lastProduct.slug}`} className="btn btn-hot btn-sm">
                  Buy {lastProduct.name}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
