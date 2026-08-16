"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ChefKitchen from "@/components/chef-kitchen";
import PackShot from "@/components/pack-shot";
import { Star, SpiceIcon } from "@/components/spice-icons";
import { RECIPES, COURSES, COOK_ACTIONS, DEVA_NUM, getAction, kickerOf } from "@/lib/recipes";
import { getProduct } from "@/lib/products";
import * as kitchen from "@/lib/kitchen-audio";

/**
 * Sunder ji ka menu — pick a dish and he cooks it with you.
 *
 * He hands you the menu, you choose, and he actually cooks it: the vessel on
 * his chulha changes with the step, the flame comes up for a tadka, and the
 * kitchen makes the right noise — seeds popping, a cooker whistling, a ladle
 * against steel — all synthesised on the spot rather than downloaded.
 *
 * Steps come from lib/recipes.js and each one names its own action, so the
 * walkthrough, the drawing, the sound and the printed recipe below can never
 * drift apart.
 */

/* What he says mid-action. Keyed by the step's own action. */
const PATTER = {
  prep: { hi: "पहले तैयारी कर लीजिए।", en: "Get your prep done first." },
  temper: { hi: "अब तड़का — दो सेकंड, बस!", en: "Now the tadka — two seconds, no more." },
  fry: { hi: "भूनते रहिए, रंग आने दीजिए।", en: "Keep it moving. Let the colour come." },
  boil: { hi: "अब उबलने दीजिए। जल्दी नहीं।", en: "Let it boil. No hurrying it." },
  stir: { hi: "धीरे-धीरे चलाइए।", en: "Gently does it." },
  mash: { hi: "और मसलिए — हाँ, और।", en: "Mash it more. Yes — more." },
  sprinkle: { hi: "बस एक चुटकी। उतनी ही।", en: "One pinch. Exactly that much." },
  pour: { hi: "अब ऊपर से डाल दीजिए।", en: "Now pour it over the top." },
};

const OPENER = { hi: "आज क्या बनाएँ?", en: "What shall we cook today?" };
const DONE = { hi: "लीजिए! बन गया।", en: "There you are — it is done." };

/* How long the autoplay lingers on a step before moving on. */
const WATCH_MS = 4600;

/**
 * @param {string} [dish] — a recipe slug. Given one, the chef skips his own
 *   menu and cooks that dish, and "back to the menu" becomes "start again".
 *   That is how he is used on a recipe page: the dish is already chosen, and
 *   offering a second list of twelve there would just compete with the page
 *   the reader is already on.
 */
export default function ChefMenu({ dish = null }) {
  const [slug, setSlug] = useState(dish);
  const [step, setStep] = useState(dish ? 0 : -1); // -1 = menu, 0..n-1 = steps, n = done
  const [course, setCourse] = useState(null); // null = the whole menu
  const [muted, setMuted] = useState(false);
  const [watching, setWatching] = useState(false);

  /* Sound only after the first click — before that there is no unlocked
     AudioContext, and firing at nothing would just look broken. */
  const started = useRef(false);
  const timer = useRef(null);

  const recipe = useMemo(() => RECIPES.find((r) => r.slug === slug) ?? null, [slug]);
  const listed = useMemo(
    () => (course ? RECIPES.filter((r) => r.course === course) : RECIPES),
    [course]
  );
  const total = recipe?.steps.length ?? 0;
  const finished = Boolean(recipe) && step >= total;

  const action = !recipe ? "idle" : finished ? "serve" : recipe.steps[step].act;
  const line = !recipe ? OPENER : finished ? DONE : PATTER[action] ?? OPENER;
  const act = getAction(action);

  /* ── sound ── */
  useEffect(() => {
    if (!started.current || muted || !recipe) return;
    kitchen.play(action);
  }, [action, muted, recipe, step]);

  /* ── autoplay ──
     The run ends itself on the last step, in the timer rather than in a
     follow-up effect, so there is no cascading render to clean up after. */
  useEffect(() => {
    if (!watching || !recipe || finished) return undefined;

    timer.current = setTimeout(() => {
      const next = step + 1;
      setStep(next);
      if (next >= total) setWatching(false);
    }, WATCH_MS);

    return () => clearTimeout(timer.current);
  }, [watching, recipe, finished, step, total]);

  /* Leave nothing sounding behind. */
  useEffect(() => () => kitchen.dispose(), []);

  const begin = useCallback(() => {
    started.current = true;
    kitchen.unlock();
  }, []);

  const pick = (s) => {
    begin();
    setSlug(s);
    setStep(0);
  };

  /* Locked to one dish, there is no menu to go back to — it restarts instead. */
  const backToMenu = () => {
    kitchen.stop();
    setWatching(false);
    setSlug(dish);
    setStep(dish ? 0 : -1);
  };

  const go = (delta) => {
    begin();
    setWatching(false);
    setStep((s) => s + delta);
  };

  const toggleMute = () => {
    begin();
    setMuted((m) => {
      if (!m) kitchen.stop();
      return !m;
    });
  };

  const toggleWatch = () => {
    begin();
    setWatching((w) => !w);
  };

  const replay = () => {
    begin();
    if (!muted) kitchen.play(action);
  };

  return (
    <section id="kitchen" className="relative isolate overflow-hidden bg-forest section text-ghee">
      <div className="tex-sunburst pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="shell relative">
        <div className="max-w-2xl" data-reveal="up">
          <p
            className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
            style={{ "--plaque-bg": "var(--color-sun)", "--plaque-fg": "var(--color-ink)" }}
          >
            <Star className="w-3.5" />
            {dish ? "Saath mein banaate hain" : "Sunder ji ka menu"}
          </p>
          <p className="font-deva mt-4 text-[clamp(1.15rem,2vw,1.6rem)] leading-tight text-marigold" lang="hi">
            आइए, साथ में बनाते हैं।
          </p>
          <h2 className="h-editorial mt-1.5">
            {dish ? "Cook it with him, step by step." : "Pick a dish. He will cook it with you."}
          </h2>
          <p className="lede mt-4 max-w-xl text-ghee/80">
            He works a real chulha — the vessel changes with the step, the flame comes up for a
            tadka, and you can hear the whole thing. Sound on.
          </p>
        </div>

        <div className="section-body grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          {/* ── the kitchen ── */}
          <div
            className="card-poster flex flex-col overflow-hidden bg-oxblood text-paper"
            data-reveal="left"
            style={{ "--card-shadow": "var(--color-marigold)" }}
          >
            <div className="relative border-b-2 border-ink">
              <ChefKitchen
                action={action}
                recipe={recipe}
                step={finished ? total : step}
                className="block w-full"
              />

              {/* What he is doing, stamped on the scene. Only once he is
                  actually doing something — idle has no action to name. */}
              {recipe ? (
                <p
                  className="plaque label-micro absolute bottom-3 left-3 inline-flex items-center gap-2 !py-1.5"
                  style={{ "--plaque-bg": "var(--color-sun)", "--plaque-fg": "var(--color-ink)" }}
                >
                  <span className="font-deva text-[0.95rem] leading-none" lang="hi">
                    {act.hi}
                  </span>
                  <span>· {act.en}</span>
                </p>
              ) : null}

              {/* sound */}
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                {recipe ? (
                  <button
                    type="button"
                    onClick={replay}
                    className="label-micro rounded-full border-2 border-ink bg-paper px-3 py-2 text-ink shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
                    title="Hear that again"
                  >
                    Again
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-pressed={muted}
                  className="grid h-10 w-10 shrink-0 place-content-center rounded-full border-2 border-ink bg-paper text-ink shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
                  title={muted ? "Turn the kitchen sound on" : "Mute the kitchen"}
                >
                  <span className="sr-only">{muted ? "Unmute the kitchen" : "Mute the kitchen"}</span>
                  <svg viewBox="0 0 24 24" className="w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M11 5 6 9H3v6h3l5 4z" />
                    {muted ? <path d="m16 9 5 6M21 9l-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
                  </svg>
                </button>
              </div>
            </div>

            {/* speech */}
            <div className="card-pad-sm">
              <div key={`${slug}-${step}`} className="anim-swap">
                <div className="rounded-[1.2rem] border-2 border-ink bg-paper px-5 py-4 text-center text-ink shadow-[4px_4px_0_var(--color-ink)]">
                  <p className="font-deva text-[clamp(1.2rem,2.4vw,1.55rem)] leading-tight text-rani-ink" lang="hi">
                    {line.hi}
                  </p>
                  <p className="mt-1.5 text-copy text-ink-soft" aria-live="polite">
                    {line.en}
                  </p>
                </div>
              </div>

              <p className="label-micro mt-4 text-center text-marigold">
                {recipe
                  ? finished
                    ? `${recipe.title} · served`
                    : `${recipe.title} · step ${step + 1} of ${total}`
                  : `${RECIPES.length} dishes on the menu`}
              </p>
            </div>
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

                {/* course filter — twelve dishes in one list is a scroll, not a menu */}
                <ul className="mt-4 flex flex-wrap gap-2">
                  {[null, ...COURSES].map((c) => {
                    const on = course === c;
                    const n = c ? RECIPES.filter((r) => r.course === c).length : RECIPES.length;
                    return (
                      <li key={c ?? "all"}>
                        <button
                          type="button"
                          onClick={() => setCourse(c)}
                          aria-pressed={on}
                          className={`chip transition-colors ${
                            on
                              ? "border-ink bg-ink text-paper"
                              : "border-ink/30 text-ink-soft hover:border-ink"
                          }`}
                        >
                          {c ?? "Everything"}
                          <span className={on ? "text-paper/60" : "text-ink-mute"}>{n}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="rule-dots mt-4 text-ink/25" aria-hidden="true" />

                <ul className="mt-2 divide-y divide-ink/12">
                  {listed.map((r) => (
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
                            {kickerOf(r)} · {r.time} · {r.steps.length} steps
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
                    <p className="label-micro text-chilli-ink">{kickerOf(recipe)}</p>
                    <h3 className="h-poster-xs mt-1.5">{recipe.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={backToMenu}
                    className="label-micro shrink-0 rounded-full border-2 border-ink px-3.5 py-2 transition-colors hover:bg-ink hover:text-paper"
                  >
                    {dish ? "↻ Start again" : "← Menu"}
                  </button>
                </div>

                {/* progress */}
                <ol className="mt-5 flex gap-1.5" aria-label="Recipe progress">
                  {recipe.steps.map((s, i) => (
                    <li
                      key={i}
                      title={COOK_ACTIONS[s.act]?.en}
                      className={`h-2 flex-1 rounded-full border border-ink/30 ${
                        i < step ? "bg-kiwi" : i === step ? "bg-sun" : "bg-sand"
                      }`}
                    />
                  ))}
                </ol>

                {!finished ? (
                  <div key={step} className="anim-swap mt-6">
                    <div className="flex items-baseline gap-3">
                      <p className="font-deva text-[2rem] leading-none text-rani-ink" lang="hi">
                        {DEVA_NUM[step]}
                      </p>
                      <p className="label-micro text-chilli-ink">
                        {act.en} · <span className="font-deva" lang="hi">{act.hi}</span>
                      </p>
                    </div>
                    <p className="lede mt-3 text-ink">{recipe.steps[step].text}</p>
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
                    <button type="button" onClick={() => go(-1)} className="btn btn-ghost btn-sm text-ink">
                      ← Back
                    </button>
                  ) : null}

                  {!finished ? (
                    <>
                      <button type="button" onClick={() => go(1)} className="btn btn-hot btn-sm">
                        {step === total - 1 ? "Taste it" : "Next step"} →
                      </button>
                      <button
                        type="button"
                        onClick={toggleWatch}
                        aria-pressed={watching}
                        className="btn btn-ghost btn-sm text-ink"
                      >
                        {watching ? "❚❚ Pause" : "▶ Watch him cook"}
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => go(-total)} className="btn btn-ghost btn-sm text-ink">
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
