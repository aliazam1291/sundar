"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ChefTasting from "@/components/chef-tasting";
import { Star, SpiceIcon } from "@/components/spice-icons";
import { getProduct } from "@/lib/products";
import { DABBA, DISHES, axes, getDish, getSpice, judge, totalPinches } from "@/lib/tasting";
import * as kitchen from "@/lib/kitchen-audio";

/**
 * Chakhne wala — the taste tester.
 *
 * Pick a bowl, season it, and only then does he taste it. You cannot take a
 * pinch back out of a real dal, so there is no undo here either — the only way
 * out of a mistake is to empty the bowl and start again. That commitment is
 * what makes restraint cost something.
 *
 * Nothing is scripted. The verdict is computed in lib/tasting.js from what is
 * actually in the bowl against what the dish actually wants, which is why the
 * same amchur is right in the aloo and ruinous in the chai. Every spice is a
 * real SKU, and the happiest he gets is when you have used the least.
 */

/* What he says while you are still seasoning — he will warn you, but he will
   not tell you whether it is any good until he has tasted it. */
const WHILE_SEASONING = [
  { upto: 0, mood: "talking", hi: "क्या डालेंगे?", en: "What are we putting in?" },
  { upto: 2, mood: "curious", hi: "हाँ... और?", en: "Yes. And?" },
  { upto: 5, mood: "thinking", hi: "बस? या और डालेंगे?", en: "Enough — or more?" },
  { upto: 8, mood: "unimpressed", hi: "हाथ ज़रा हल्का रखिए।", en: "Go easy with that hand." },
  { upto: Infinity, mood: "overwhelmed", hi: "अरे अरे अरे...", en: "Steady on." },
];

const PICK_A_DISH = { mood: "talking", hi: "कौन सा कटोरा?", en: "Which bowl are we doing?" };

/* How long the spoon takes to get to his mouth. */
const TASTE_MS = 620;

export default function TasteTester() {
  const [dishSlug, setDishSlug] = useState(null);
  const [bowl, setBowl] = useState({});
  const [verdict, setVerdict] = useState(null);
  const [tasting, setTasting] = useState(false);
  const [muted, setMuted] = useState(false);

  const started = useRef(false);
  const timer = useRef(null);

  const dish = useMemo(() => (dishSlug ? getDish(dishSlug) : null), [dishSlug]);
  const pinches = totalPinches(bowl);
  const t = useMemo(() => axes(bowl), [bowl]);

  const patter = dish
    ? WHILE_SEASONING.find((p) => pinches <= p.upto) ?? WHILE_SEASONING[0]
    : PICK_A_DISH;
  const line = verdict ?? patter;

  const begin = useCallback(() => {
    started.current = true;
    kitchen.unlock();
  }, []);

  const say = useCallback(
    (name) => {
      if (name && !muted && started.current) kitchen.play(name);
    },
    [muted]
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  const pickDish = (slug) => {
    begin();
    clearTimeout(timer.current);
    setDishSlug(slug);
    setBowl({});
    setVerdict(null);
    setTasting(false);
  };

  const addPinch = (slug) => {
    begin();
    setBowl((b) => ({ ...b, [slug]: (b[slug] ?? 0) + 1 }));
    /* A new pinch makes the last verdict stale — he has to taste it again. */
    setVerdict(null);
    say("pinch");
  };

  const tasteIt = () => {
    begin();
    clearTimeout(timer.current);
    setTasting(true);
    say("taste");

    const result = judge(dish, bowl);
    timer.current = setTimeout(() => {
      setVerdict(result);
      setTasting(false);
      if (result.sound) say(result.sound);
    }, TASTE_MS);
  };

  const empty = () => {
    begin();
    clearTimeout(timer.current);
    kitchen.stop();
    setBowl({});
    setVerdict(null);
    setTasting(false);
  };

  const changeDish = () => {
    clearTimeout(timer.current);
    kitchen.stop();
    setDishSlug(null);
    setBowl({});
    setVerdict(null);
    setTasting(false);
  };

  const toggleMute = () => {
    begin();
    setMuted((m) => {
      if (!m) kitchen.stop();
      return !m;
    });
  };

  /* What to offer once he has had his say: the thing that went wrong if
     something did, otherwise everything you got right. */
  const offer = verdict?.culprit
    ? []
    : Object.keys(bowl).filter((s) => bowl[s] > 0);
  const fix = verdict?.hint ?? null;

  return (
    <section id="chakhne-wala" className="relative isolate overflow-hidden bg-cream section">
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
          <h2 className="h-editorial mt-1.5 text-ink">Season the bowl. Then let him taste it.</h2>
          <p className="lede mt-4 max-w-xl text-ink-soft">
            Pick a bowl and season it blind — he will not tell you a thing until the spoon is in
            his mouth. There is no undo, because there is no undo in a real kitchen. The happiest
            he gets is when you have used the least.
          </p>
        </div>

        {/* items-start so the dabba card sizes to its contents — the bowl
            picker is much shorter than the seasoning grid and stretching it
            leaves a dead half-card. */}
        <div className="section-body grid items-start gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          {/* ── the man and the bowl ── */}
          <div
            className="card-poster flex flex-col overflow-hidden bg-forest text-ghee"
            data-reveal="left"
            style={{ "--card-shadow": "var(--color-marigold)" }}
          >
            <div className="relative border-b-2 border-ink">
              <ChefTasting
                dish={dish}
                bowl={bowl}
                verdict={verdict}
                mood={verdict ? null : patter.mood}
                tasting={tasting}
                className="block w-full"
              />

              {dish ? (
                <p
                  className="plaque label-micro absolute bottom-3 left-3 inline-flex items-center gap-2 !py-1.5"
                  style={{ "--plaque-bg": "var(--color-sun)", "--plaque-fg": "var(--color-ink)" }}
                >
                  <span className="font-deva text-[0.95rem] leading-none" lang="hi">
                    {dish.hi}
                  </span>
                  <span>· {pinches} {pinches === 1 ? "chutki" : "chutki"}</span>
                </p>
              ) : null}

              <button
                type="button"
                onClick={toggleMute}
                aria-pressed={muted}
                className="absolute right-3 bottom-3 grid h-10 w-10 shrink-0 place-content-center rounded-full border-2 border-ink bg-paper text-ink shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
                title={muted ? "Turn the sound on" : "Mute him"}
              >
                <span className="sr-only">{muted ? "Unmute" : "Mute"}</span>
                <svg viewBox="0 0 24 24" className="w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 5 6 9H3v6h3l5 4z" />
                  {muted ? <path d="m16 9 5 6M21 9l-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
                </svg>
              </button>
            </div>

            <div className="card-pad-sm">
              <div key={verdict?.key ?? `say-${patter.upto}-${Boolean(dish)}`} className="anim-swap">
                <div className="rounded-[1.2rem] border-2 border-ink bg-paper px-5 py-4 text-center text-ink shadow-[4px_4px_0_var(--color-ink)]">
                  <p className="font-deva text-[clamp(1.25rem,2.6vw,1.7rem)] leading-tight text-rani-ink" lang="hi">
                    {line.hi}
                  </p>
                  <p className="mt-1.5 text-copy-lg text-ink-soft" aria-live="polite">
                    {line.en}
                  </p>
                  {verdict ? (
                    <p className="label-micro mt-3 text-ink-mute">{verdict.note}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* ── the dabba ── */}
          <div
            className="card-poster card-pad bg-paper text-ink"
            data-reveal="right"
            style={{ "--card-shadow": "var(--color-cobalt)" }}
          >
            {!dish ? (
              <>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="label-micro text-chilli-ink">Choose a bowl</p>
                  <p className="font-deva text-copy text-ink-mute" lang="hi">कौन सा कटोरा?</p>
                </div>
                <div className="rule-dots mt-3 text-ink/25" aria-hidden="true" />

                <ul className="mt-4 divide-y divide-ink/12">
                  {DISHES.map((d) => (
                    <li key={d.slug}>
                      <button
                        type="button"
                        onClick={() => pickDish(d.slug)}
                        className="group flex w-full items-center gap-4 py-4 text-left transition-colors hover:text-chilli-ink"
                      >
                        <span
                          className="grid h-12 w-12 shrink-0 place-content-center rounded-full border-2 border-ink"
                          style={{ background: d.base }}
                        >
                          <SpiceIcon mono name="jar" className="w-5 text-ink" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-baseline gap-x-2.5">
                            <span className="h-card">{d.name}</span>
                            <span className="font-deva text-copy text-ink-mute" lang="hi">{d.hi}</span>
                          </span>
                          <span className="mt-1 block text-meta text-ink-mute">{d.note}</span>
                        </span>
                        <span className="label-micro shrink-0 text-ink-mute transition-transform group-hover:translate-x-1">
                          Season →
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                <p className="label-micro mt-5 text-ink-mute">
                  Every bowl wants different things. The same pinch is right in one and ruinous in
                  another.
                </p>
              </>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="label-micro text-chilli-ink">Seasoning</p>
                    <h3 className="h-poster-xs mt-1.5">{dish.name}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={changeDish}
                    className="label-micro shrink-0 rounded-full border-2 border-ink px-3.5 py-2 transition-colors hover:bg-ink hover:text-paper"
                  >
                    ← Bowls
                  </button>
                </div>

                {/* the nine-compartment dabba */}
                <ul className="mt-5 grid grid-cols-3 gap-2.5">
                  {DABBA.map((s) => {
                    const n = bowl[s.slug] ?? 0;
                    const blamed = verdict?.culprit === s.slug;
                    const wanted = fix === s.slug;
                    return (
                      <li key={s.slug}>
                        <button
                          type="button"
                          onClick={() => addPinch(s.slug)}
                          className={`group relative flex w-full flex-col items-center gap-1.5 rounded-[1rem] border-2 px-2 py-3 transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--color-ink)] active:translate-y-0 active:shadow-none ${
                            blamed
                              ? "border-chilli bg-chilli/15"
                              : wanted
                                ? "border-kiwi bg-kiwi/15"
                                : "border-ink bg-cream"
                          }`}
                          style={{ borderBottomColor: s.tint, borderBottomWidth: "5px" }}
                        >
                          {n > 0 ? (
                            <span className="absolute -top-2 -right-2 grid h-6 w-6 place-content-center rounded-full border-2 border-ink bg-sun text-micro font-bold text-ink">
                              {n}
                            </span>
                          ) : null}
                          <SpiceIcon name={s.icon} className="w-8 transition-transform group-hover:scale-110" />
                          <span className="label-micro text-ink">{s.label}</span>
                          <span className="font-deva text-meta leading-none text-ink-mute" lang="hi">
                            {s.hi}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* what is in the bowl */}
                <div className="mt-6">
                  <p className="label-micro text-ink-mute">In the bowl</p>
                  <dl className="mt-3 space-y-2.5">
                    {[
                      ["Heat", "तीखा", t.heat, "var(--color-tomato)"],
                      ["Aroma", "ख़ुशबू", t.aroma, "var(--color-kiwi)"],
                      ["Tang", "खटास", t.tang, "var(--color-carrot)"],
                      ["Body", "गहराई", t.earth, "var(--color-brown)"],
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
                  <button
                    type="button"
                    onClick={tasteIt}
                    disabled={tasting}
                    className="btn btn-hot btn-sm disabled:opacity-70"
                  >
                    <span className="font-deva text-[0.95rem] leading-none" lang="hi">चखिए</span>
                    <span>· Taste it</span>
                  </button>
                  <button type="button" onClick={empty} className="btn btn-ghost btn-sm text-ink">
                    Empty the bowl
                  </button>
                </div>

                {/* what he leaves you with */}
                {verdict && verdict.key !== "empty" ? (
                  <div key={verdict.key} className="anim-swap mt-6 border-t-2 border-ink/15 pt-5">
                    {fix ? (
                      <p className="text-copy text-ink-soft">
                        It wants{" "}
                        <Link
                          href={`/shop/${fix}`}
                          className="link-sweep font-bold text-chilli-ink"
                        >
                          {getSpice(fix)?.label}
                        </Link>
                        .
                      </p>
                    ) : null}

                    {offer.length ? (
                      <>
                        <p className="label-micro text-ink-mute">
                          {verdict.key === "perfect" ? "Exactly this, and no more" : "What you used"}
                        </p>
                        <ul className="mt-2.5 flex flex-wrap gap-2">
                          {offer.map((slug) => {
                            const p = getProduct(slug);
                            const s = getSpice(slug);
                            if (!p || !s) return null;
                            return (
                              <li key={slug}>
                                <Link
                                  href={`/shop/${p.slug}`}
                                  className="chip !py-2.5 text-ink-soft transition-colors hover:border-current hover:text-chilli-ink"
                                >
                                  <SpiceIcon mono name={s.icon} className="w-3.5" />
                                  {p.name}
                                  <span className="text-ink-mute">×{bowl[slug]}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    ) : null}
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
