"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ChefFace from "@/components/chef-face";
import PackShot from "@/components/pack-shot";
import { Star, SpiceIcon } from "@/components/spice-icons";
import { RECIPES } from "@/lib/recipes";
import { getProduct } from "@/lib/products";

/**
 * Sunder ji ka menu — pick a dish and he cooks it with you.
 *
 * He hands you the menu, you choose, and he walks the method one step at a
 * time: speaking in Hindi with an English gloss underneath, changing
 * expression as the dish goes on, and ending with the blends you needed.
 *
 * Steps come from lib/recipes.js, so the walkthrough and the printed recipe
 * below it can never drift apart.
 */

/* What he says while working — indexed by step, cycling if a recipe is longer. */
const PATTER = [
  { hi: "पहले ये कर लीजिए।", en: "Start here.", face: "talking" },
  { hi: "हाँ, अब ध्यान से।", en: "Yes — carefully now.", face: "thinking" },
  { hi: "बस, ख़ुशबू आने लगी!", en: "There — the aroma is coming.", face: "cooking" },
  { hi: "और आख़िर में...", en: "And finally...", face: "cooking" },
];

const OPENER = { hi: "आज क्या बनाएँ?", en: "What shall we cook today?", face: "talking" };
const DONE = { hi: "लीजिए! बन गया।", en: "There you are — it is done.", face: "proud" };

export default function ChefMenu() {
  const [slug, setSlug] = useState(null);
  const [step, setStep] = useState(-1); // -1 = menu, 0..n-1 = steps, n = done

  const recipe = useMemo(() => RECIPES.find((r) => r.slug === slug) ?? null, [slug]);
  const total = recipe?.steps.length ?? 0;
  const finished = recipe && step >= total;

  const line = !recipe ? OPENER : finished ? DONE : PATTER[Math.min(step, PATTER.length - 1)];

  const pick = (s) => {
    setSlug(s);
    setStep(0);
  };
  const backToMenu = () => {
    setSlug(null);
    setStep(-1);
  };

  return (
    <section className="relative isolate overflow-hidden bg-forest section text-ghee">
      <div className="tex-sunburst pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="shell relative">
        <div className="max-w-2xl" data-reveal="up">
          <p
            className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
            style={{ "--plaque-bg": "var(--color-sun)", "--plaque-fg": "var(--color-ink)" }}
          >
            <Star className="w-3.5" />
            Sunder ji ka menu
          </p>
          <p className="font-deva mt-4 text-[clamp(1.15rem,2vw,1.6rem)] leading-tight text-marigold" lang="hi">
            आइए, साथ में बनाते हैं।
          </p>
          <h2 className="h-editorial mt-1.5">Pick a dish. He will cook it with you.</h2>
        </div>

        <div className="section-body grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          {/* ── the chef ── */}
          <div
            className="card-poster card-pad flex flex-col bg-oxblood text-paper"
            data-reveal="left"
            style={{ "--card-shadow": "var(--color-marigold)" }}
          >
            <div className="mx-auto w-full max-w-[240px]">
              <ChefFace expression={line.face} className="w-full" label={line.en} />
            </div>

            {/* speech */}
            <div key={`${slug}-${step}`} className="anim-swap relative mt-5">
              <div className="rounded-[1.2rem] border-2 border-ink bg-paper px-5 py-4 text-center text-ink shadow-[4px_4px_0_var(--color-ink)]">
                <p className="font-deva text-[clamp(1.2rem,2.6vw,1.6rem)] leading-tight text-rani-ink" lang="hi">
                  {line.hi}
                </p>
                <p className="mt-1.5 text-copy text-ink-soft" aria-live="polite">
                  {line.en}
                </p>
              </div>
            </div>

            {recipe ? (
              <p className="label-micro mt-auto pt-6 text-center text-marigold">
                {finished ? recipe.title : `${recipe.title} · step ${step + 1} of ${total}`}
              </p>
            ) : (
              <p className="label-micro mt-auto pt-6 text-center text-paper/60">
                {RECIPES.length} dishes on the menu
              </p>
            )}
          </div>

          {/* ── menu / walkthrough ── */}
          <div
            className="card-poster card-pad bg-paper text-ink"
            data-reveal="right"
            style={{ "--card-shadow": "var(--color-cobalt)" }}
          >
            {!recipe ? (
              <>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="label-micro text-chilli-ink">Aaj ka menu</p>
                  <p className="font-deva text-copy text-ink-mute" lang="hi">आज का मेन्यू</p>
                </div>
                <div className="rule-dots mt-3 text-ink/25" aria-hidden="true" />

                <ul className="mt-4 divide-y divide-ink/12">
                  {RECIPES.map((r) => (
                    <li key={r.slug}>
                      <button
                        type="button"
                        onClick={() => pick(r.slug)}
                        className="group flex w-full items-center gap-4 py-3.5 text-left transition-colors hover:text-chilli-ink"
                      >
                        <SpiceIcon
                          name={getProduct(r.uses[0])?.icon ?? "starAnise"}
                          className="w-9 shrink-0"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-baseline gap-x-2.5">
                            <span className="h-card">{r.title}</span>
                            <span className="font-deva text-copy text-ink-mute" lang="hi">{r.hi}</span>
                          </span>
                          <span className="label-micro mt-1 block text-ink-mute">
                            {r.kicker} · {r.time}
                          </span>
                        </span>
                        <span className="label-micro shrink-0 text-ink-mute transition-transform group-hover:translate-x-1">
                          Cook →
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="label-micro text-chilli-ink">{recipe.kicker}</p>
                    <h3 className="h-poster-xs mt-1.5">{recipe.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={backToMenu}
                    className="label-micro shrink-0 rounded-full border-2 border-ink px-3.5 py-2 transition-colors hover:bg-ink hover:text-paper"
                  >
                    ← Menu
                  </button>
                </div>

                {/* progress */}
                <ol className="mt-5 flex gap-1.5" aria-label="Recipe progress">
                  {recipe.steps.map((_, i) => (
                    <li
                      key={i}
                      className={`h-2 flex-1 rounded-full border border-ink/30 ${
                        i < step ? "bg-kiwi" : i === step ? "bg-sun" : "bg-sand"
                      }`}
                    />
                  ))}
                </ol>

                {!finished ? (
                  <div key={step} className="anim-swap mt-6">
                    <p className="font-deva text-[2rem] leading-none text-rani-ink" lang="hi">
                      {["१", "२", "३", "४", "५"][step]}
                    </p>
                    <p className="lede mt-3 text-ink">{recipe.steps[step]}</p>
                  </div>
                ) : (
                  <div className="anim-swap mt-6">
                    <p className="lede text-ink">{recipe.tip}</p>
                    <p className="label-micro mt-5 text-ink-mute">You used</p>
                    <ul className="mt-3 flex flex-wrap items-end gap-3">
                      {recipe.uses.map((u) => {
                        const p = getProduct(u);
                        if (!p) return null;
                        return (
                          <li key={u} className="w-[26%] min-w-[84px]">
                            <Link href={`/shop/${p.slug}`} className="group block">
                              <PackShot product={p} size="sm" tilt={false} />
                              <span className="label-micro mt-2 block truncate text-ink-soft group-hover:text-chilli-ink">
                                {p.name}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  {step > 0 && !finished ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="btn btn-ghost btn-sm text-ink"
                    >
                      ← Back
                    </button>
                  ) : null}

                  {!finished ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s + 1)}
                      className="btn btn-hot btn-sm"
                    >
                      {step === total - 1 ? "Taste it" : "Next step"} →
                    </button>
                  ) : (
                    <>
                      <button type="button" onClick={() => setStep(0)} className="btn btn-ghost btn-sm text-ink">
                        Cook it again
                      </button>
                      <Link href="/shop" className="btn btn-hot btn-sm">
                        <SpiceIcon mono name="jar" className="w-4" />
                        Get the blends
                      </Link>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
