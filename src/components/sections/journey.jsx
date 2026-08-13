"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { JOURNEY, FOUNDER } from "@/lib/content";
import { Star, SpiceIcon } from "@/components/spice-icons";
import { Deva, MixedLabel } from "@/components/bilingual";

/**
 * "A Heritage Film", as a scroll reel.
 *
 * The reel is driven by scroll: a sprocketed film strip down the side tracks
 * how far through you are and lights each chapter as it passes, so scrolling
 * reads as running the projector rather than just revealing text.
 *
 * The score is a synthesised tanpura-ish drone — a tonic and fifth under a
 * slow low-pass — so there is no audio file. It is opt-in and off by default:
 * autoplayed background music is blocked by browsers anyway, and unwanted
 * where it is not.
 */
export default function Journey() {
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const sectionRef = useRef(null);
  const audio = useRef(null);
  const voices = useRef(null);

  /* Scroll position through the reel, 0..1. rAF-throttled so the listener
     never does layout work more than once a frame. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? (0 - r.top) / span : r.top < 0 ? 1 : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* ── the score ── */
  const stopScore = useCallback(() => {
    const v = voices.current;
    voices.current = null;
    if (!v) return;
    try {
      const t = audio.current.currentTime;
      v.master.gain.cancelScheduledValues(t);
      v.master.gain.setValueAtTime(Math.max(0.0001, v.master.gain.value), t);
      v.master.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
      v.oscs.forEach((o) => o.stop(t + 1.2));
    } catch {
      /* context already gone */
    }
  }, []);

  const startScore = useCallback(() => {
    if (typeof window === "undefined") return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    let ctx = audio.current;
    if (!ctx) {
      ctx = new Ctx();
      audio.current = ctx;
    }
    if (ctx.state === "suspended") ctx.resume();
    if (voices.current) return;

    const t = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, t);
    master.gain.exponentialRampToValueAtTime(0.09, t + 2.2);

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 900;
    lp.Q.value = 0.5;
    lp.connect(master);
    master.connect(ctx.destination);

    /* tonic, octave, fifth — a drone, not a tune */
    const oscs = [110, 220, 164.81, 329.63].map((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 ? "sine" : "triangle";
      o.frequency.value = f * (1 + (i - 1.5) * 0.0016); // slight detune to breathe
      const g = ctx.createGain();
      g.gain.value = [0.5, 0.22, 0.3, 0.12][i];
      o.connect(g);
      g.connect(lp);
      o.start(t);
      return o;
    });

    /* slow swell so it never sits perfectly still */
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 260;
    lfo.connect(lfoGain);
    lfoGain.connect(lp.frequency);
    lfo.start(t);
    oscs.push(lfo);

    voices.current = { master, oscs };
  }, []);

  const toggleScore = () => {
    if (playing) {
      stopScore();
      setPlaying(false);
    } else {
      startScore();
      setPlaying(true);
    }
  };

  useEffect(
    () => () => {
      stopScore();
      audio.current?.close?.();
    },
    [stopScore]
  );

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-reel text-ivory"
    >
      {/* film grain */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.09] mix-blend-screen" aria-hidden="true" preserveAspectRatio="none">
        <filter id="reelGrain">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="9" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#reelGrain)" />
      </svg>

      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 50% 45%, transparent 45%, rgba(0,0,0,0.72) 100%)" }}
      />

      {/* letterbox */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-7 bg-black sm:h-9" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-7 bg-black sm:h-9" />

      {/* ── the film strip: how far through the reel you are ── */}
      <div
        className="pointer-events-none absolute inset-y-0 left-2 z-30 hidden w-7 lg:block"
        aria-hidden="true"
      >
        <div className="absolute inset-y-9 left-1/2 w-px -translate-x-1/2 bg-ivory/15" />
        {/* sprocket holes */}
        <div
          className="absolute inset-y-9 left-1/2 w-3 -translate-x-1/2 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, var(--color-ivory) 0 6px, transparent 6px 22px)",
            maskImage: "linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)",
          }}
        />
        {/* the played portion */}
        <div
          className="absolute left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-terracotta"
          style={{ top: "2.25rem", height: `calc((100% - 4.5rem) * ${progress})` }}
        />
        {/* the playhead */}
        <div
          className="absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-reel bg-sun shadow-[0_0_14px_var(--color-sun)]"
          style={{ top: `calc(2.25rem + (100% - 4.5rem) * ${progress} - 0.4375rem)` }}
        />
      </div>

      {/* ── projector controls ── */}
      <div className="absolute right-3 top-12 z-30 flex flex-col items-end gap-2 sm:right-5">
        <button
          type="button"
          onClick={toggleScore}
          aria-pressed={playing}
          className="flex items-center gap-2 rounded-full border-2 border-ivory/35 bg-reel/70 px-3.5 py-2 text-ivory/75 backdrop-blur transition-colors hover:border-terracotta hover:text-terracotta"
        >
          <svg viewBox="0 0 24 24" className="w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {playing ? <path d="M10 5v14M14 5v14" /> : <path d="M8 5v14l11-7z" />}
          </svg>
          <span className="label-micro">{playing ? "Pause score" : "Play score"}</span>
        </button>

        <span className="label-micro rounded-full bg-reel/70 px-2.5 py-1 text-dune/60 backdrop-blur">
          {Math.round(progress * 100)}%
        </span>
      </div>

      <div className="shell-narrow relative section-lg">
        {/* title card */}
        <header className="text-center" data-reveal="up">
          <p className="font-body text-micro uppercase tracking-[0.55em] text-dune/60">
            MMXXVI · A film in one reel
          </p>

          <h2 className="font-poster mt-9 text-[clamp(4.5rem,17vw,13rem)] leading-[0.82] text-terracotta">
            1975
          </h2>

          <p className="font-body mt-5 text-micro uppercase tracking-[0.42em] text-ivory/50">
            <Deva>भारत</Deva> · India
          </p>

          <div className="mx-auto mt-12 max-w-md">
            <p className="font-body text-micro uppercase tracking-[0.4em] text-dune/50">
              His name
            </p>
            <p className="font-editorial mt-3 text-[clamp(1.5rem,4vw,2.4rem)] leading-tight text-ivory">
              {FOUNDER.name}
            </p>
            <p className="font-body mt-3 text-micro uppercase tracking-[0.34em] text-terracotta-2">
              {FOUNDER.role} · <Deva>{FOUNDER.roleHi}</Deva>
            </p>
          </div>
        </header>

        {/* chapters */}
        <ol className="mt-28 space-y-28 lg:mt-36 lg:space-y-36">
          {JOURNEY.map((ch) => (
            <li key={ch.id} className="relative">
              {/* chapter numeral */}
              <div className="mb-8 flex items-baseline gap-5" data-reveal="up">
                <span className="font-poster text-outline text-[2.6rem] leading-none text-terracotta/70">
                  {ch.chapter}
                </span>
                <span className="font-body text-micro uppercase tracking-[0.42em] text-dune/55">
                  {ch.label}
                </span>
                <span className="ml-auto font-body text-micro tracking-[0.3em] text-ivory/35">
                  {ch.year}
                </span>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-terracotta/45 via-ivory/12 to-transparent" />

              {/* lines */}
              <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
                <div>
                  {ch.lines.map((line, i) => (
                    <p
                      key={i}
                      data-reveal="up"
                      style={{ "--reveal-delay": `${i * 170}ms` }}
                      className={`font-editorial italic leading-[1.04] ${
                        ch.negative ? "text-ivory/55" : "text-ivory"
                      } ${
                        ch.lines.length > 2
                          ? "text-[clamp(1.7rem,4.6vw,3.1rem)]"
                          : "text-[clamp(2.1rem,6vw,4.4rem)]"
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <div className="lg:pt-3" data-reveal="up" style={{ "--reveal-delay": "260ms" }}>
                  {ch.devanagari ? (
                    <>
                      <p className="font-deva text-[clamp(1.5rem,4vw,2.3rem)] leading-snug text-terracotta">
                        {ch.body}
                      </p>
                      <p className="font-body mt-4 text-micro uppercase tracking-[0.28em] text-ivory/45">
                        {ch.bodyEn}
                      </p>
                    </>
                  ) : (
                    <p className="text-copy-lg leading-relaxed text-ivory/62">{ch.body}</p>
                  )}

                  <p className="font-body mt-6 text-micro uppercase tracking-[0.34em] text-terracotta-2/80">
                    <MixedLabel text={ch.meta} />
                  </p>
                </div>
              </div>

              {/* The years strip. It scrolls sideways on a phone, and its
                  children are plain spans — nothing focusable — so a keyboard
                  user could never reach the years past the fold. tabIndex
                  makes the region itself scrollable by arrow key, which needs
                  a role and a name to go with it. */}
              {ch.marks ? (
                <div
                  className="no-scrollbar edge-fade-r mt-12 flex gap-8 overflow-x-auto border-y border-ivory/12 py-6 pe-8 sm:pe-0"
                  data-reveal="up"
                  tabIndex={0}
                  role="group"
                  aria-label={`${ch.title} — timeline`}
                >
                  {ch.marks.map((m, i) => (
                    <span
                      key={m}
                      className={`font-poster shrink-0 text-[1.9rem] leading-none transition-colors sm:text-[2.4rem] ${
                        i === ch.marks.length - 1 ? "text-terracotta" : "text-ivory/30"
                      }`}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ol>

        {/* end card */}
        <footer className="mt-32 border-t border-ivory/12 pt-16 text-center" data-reveal="up">
          <p className="font-editorial text-[clamp(1.4rem,3.4vw,2rem)] italic text-ivory/80">
            For every kitchen. For every generation.
          </p>

          <div className="mt-12 flex items-center justify-center gap-4">
            <SpiceIcon mono name="chakki" className="w-8 text-terracotta" />
            <span className="font-poster text-[clamp(2.6rem,8vw,4.6rem)] leading-none text-ivory">
              Sunder
            </span>
            <SpiceIcon mono name="chakki" className="w-8 -scale-x-100 text-terracotta" />
          </div>

          <p className="font-body mt-4 text-micro uppercase tracking-[0.7em] text-ivory/50">
            Spices
          </p>
          <p className="font-body mt-3 text-micro uppercase tracking-[0.6em] text-dune/45">
            Since · 1975
          </p>

          <Link href="/story" className="btn btn-ghost mt-11 border-ivory/40 text-ivory">
            <Star className="w-3.5" />
            Read the full story
          </Link>
        </footer>
      </div>
    </section>
  );
}
