"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Star, SpiceIcon } from "@/components/spice-icons";

/**
 * The chakki — grind it yourself.
 *
 * Drag the top stone round (or hold the button, or use arrow keys) and whole
 * spice becomes powder: the stone turns, the bed fills, aroma lifts off it.
 * The rumble is synthesised filtered noise, so there is no audio asset.
 *
 * The point it makes is the brand's own: past a certain heat you are burning
 * off the oil you paid for, so the mill has to stay slow.
 */

const FULL = 100;

/* What the mill tells you as it fills. */
const STAGES = [
  { at: 0, hi: "साबुत मसाला", en: "Whole spice, cold and dry" },
  { at: 25, hi: "दरदरा", en: "Coarse — the oil is still locked in" },
  { at: 55, hi: "बारीक होता हुआ", en: "Breaking down, aroma starting to lift" },
  { at: 85, hi: "एकदम बारीक", en: "Fine, and still under 40°C" },
  { at: 100, hi: "तैयार", en: "Ground. Now use a pinch, not a fistful." },
];

/* Powder bed — deterministic so server and client agree. */
const GRAINS = Array.from({ length: 46 }, (_, i) => {
  const a = Math.sin(i * 12.9898) * 43758.5453;
  const b = Math.sin(i * 78.233) * 12345.6789;
  return {
    x: 14 + ((a - Math.floor(a)) * 72).toFixed(2) * 1,
    y: ((b - Math.floor(b)) * 100).toFixed(2) * 1,
    r: 1.1 + ((a - Math.floor(a)) * 1.9).toFixed(2) * 1,
  };
});

export default function ChakkiMill() {
  const [turn, setTurn] = useState(0); // degrees turned, cumulative
  const [grinding, setGrinding] = useState(false);
  const [muted, setMuted] = useState(false);

  const audio = useRef(null);
  const noise = useRef(null);
  const dragging = useRef(false);
  const lastAngle = useRef(null);
  const holdRaf = useRef(null);

  const pct = Math.min(FULL, Math.round(turn / 14.4)); // 1440° = a full grind
  const done = pct >= FULL;
  const label = [...STAGES].reverse().find((s) => pct >= s.at);

  /* ── the rumble: filtered noise, gated while the stone moves ── */
  const startNoise = useCallback(() => {
    if (muted || typeof window === "undefined") return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    let ctx = audio.current;
    if (!ctx) {
      ctx = new Ctx();
      audio.current = ctx;
    }
    if (ctx.state === "suspended") ctx.resume();
    if (noise.current) return; // already running

    const secs = 2;
    const buf = ctx.createBuffer(1, ctx.sampleRate * secs, ctx.sampleRate);
    const d = buf.getChannelData(0);
    // brown-ish noise: heavier and stonier than white
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02;
      d[i] = last * 3.2;
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 780;
    lp.Q.value = 0.8;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 0.12);

    src.connect(lp);
    lp.connect(g);
    g.connect(ctx.destination);
    src.start();
    noise.current = { src, g };
  }, [muted]);

  const stopNoise = useCallback(() => {
    const n = noise.current;
    if (!n) return;
    noise.current = null;
    const ctx = audio.current;
    try {
      const t = ctx.currentTime;
      n.g.gain.cancelScheduledValues(t);
      n.g.gain.setValueAtTime(Math.max(0.0001, n.g.gain.value), t);
      n.g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
      n.src.stop(t + 0.2);
    } catch {
      /* context already closed */
    }
  }, []);

  const advance = useCallback((deg) => {
    if (deg <= 0) return;
    setTurn((v) => Math.min(FULL * 14.4, v + deg));
  }, []);

  /* ── drag the stone ── */
  const angleFrom = (el, e) => {
    const r = el.getBoundingClientRect();
    return (
      (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) /
      Math.PI
    );
  };

  const onDown = (e) => {
    dragging.current = true;
    lastAngle.current = angleFrom(e.currentTarget, e);
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setGrinding(true);
    startNoise();
  };

  const onMove = (e) => {
    if (!dragging.current) return;
    const a = angleFrom(e.currentTarget, e);
    let delta = a - lastAngle.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    lastAngle.current = a;
    advance(Math.abs(delta));
  };

  const endDrag = () => {
    dragging.current = false;
    setGrinding(false);
    stopNoise();
  };

  /* ── or just hold the button ── */
  const startHold = () => {
    setGrinding(true);
    startNoise();
    const step = () => {
      advance(5);
      holdRaf.current = requestAnimationFrame(step);
    };
    holdRaf.current = requestAnimationFrame(step);
  };
  const endHold = () => {
    cancelAnimationFrame(holdRaf.current);
    setGrinding(false);
    stopNoise();
  };

  useEffect(
    () => () => {
      cancelAnimationFrame(holdRaf.current);
      stopNoise();
      audio.current?.close?.();
    },
    [stopNoise]
  );

  useEffect(() => {
    if (muted) stopNoise();
  }, [muted, stopNoise]);

  return (
    <section className="relative isolate overflow-hidden bg-sepia section text-ivory">
      <div className="tex-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
      <div
        className="tex-stripe pointer-events-none absolute inset-x-0 top-0 h-2"
        style={{ "--stripe": "var(--color-tangerine)" }}
        aria-hidden="true"
      />
      <div className="beads pointer-events-none absolute inset-x-0 bottom-0 h-2.5 text-sun/60" aria-hidden="true" />

      <div className="shell relative grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        {/* ── copy ── */}
        <div data-reveal="up">
          <p
            className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
            style={{ "--plaque-bg": "var(--color-sun)", "--plaque-fg": "var(--color-ink)" }}
          >
            <Star className="w-3.5" />
            Grind it yourself
          </p>

          <p className="font-deva mt-4 text-[clamp(1.15rem,2vw,1.6rem)] leading-tight text-terracotta" lang="hi">
            पत्थर की चक्की, धीमी रफ़्तार।
          </p>

          <h2 className="h-poster-sm text-drop mt-1.5" style={{ "--drop": "var(--color-brown)" }}>
            One stone,
            <br />
            <span className="text-sun">one speed.</span>
          </h2>

          <p className="lede mt-5 max-w-md text-ivory/80">
            Turn the stone. Grind too fast and the bed heats, and heat is what carries the
            aroma out of the spice and into the mill room. Fifty years on, we still run it slow.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onPointerDown={startHold}
              onPointerUp={endHold}
              onPointerLeave={endHold}
              onPointerCancel={endHold}
              onKeyDown={(e) => {
                if ((e.key === " " || e.key === "Enter") && !e.repeat) startHold();
              }}
              onKeyUp={(e) => {
                if (e.key === " " || e.key === "Enter") endHold();
              }}
              className="btn btn-gold select-none"
            >
              <SpiceIcon mono name="chakki" className="w-4" />
              {done ? "Ground" : "Hold to grind"}
            </button>

            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-pressed={muted}
              title={muted ? "Unmute the mill" : "Mute the mill"}
              className="grid h-11 w-11 shrink-0 place-content-center rounded-full border-2 border-ivory/40 text-ivory/70 transition-colors hover:border-sun hover:text-sun"
            >
              <span className="sr-only">{muted ? "Unmute the mill" : "Mute the mill"}</span>
              <svg viewBox="0 0 24 24" className="w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H3v6h3l5 4z" />
                {muted ? <path d="m16 9 5 6M21 9l-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
              </svg>
            </button>

            {pct > 0 ? (
              <button
                type="button"
                onClick={() => setTurn(0)}
                className="label-micro text-ivory/60 underline underline-offset-4 transition-colors hover:text-sun"
              >
                Empty the bed
              </button>
            ) : null}
          </div>

          {/* progress */}
          <div className="mt-7 max-w-md">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-deva text-copy-lg text-terracotta" lang="hi">{label.hi}</span>
              <span className="font-poster text-[1.6rem] leading-none text-sun">{pct}%</span>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full border-2 border-ivory/25 bg-ivory/10">
              <div
                className="h-full rounded-full bg-linear-to-r from-terracotta to-sun transition-[width] duration-200"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="label-micro mt-2.5 text-ivory/65" aria-live="polite">
              {label.en}
            </p>
          </div>
        </div>

        {/* ── the mill ── */}
        <div className="relative mx-auto w-full max-w-[420px]" data-reveal="scale">
          <svg
            viewBox="0 0 200 200"
            className={`w-full touch-none ${grinding ? "cursor-grabbing" : "cursor-grab"}`}
            role="slider"
            tabIndex={0}
            aria-label="Grind the chakki"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-valuetext={`${pct} percent — ${label.en}`}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowUp") { advance(40); startNoise(); setGrinding(true); }
              if (e.key === "ArrowLeft" || e.key === "ArrowDown") setTurn((v) => Math.max(0, v - 40));
            }}
            onKeyUp={() => { setGrinding(false); stopNoise(); }}
          >
            {/* the bed, filling with powder */}
            <circle cx="100" cy="100" r="92" fill="var(--color-oxblood)" stroke="var(--color-ink)" strokeWidth="5" />
            <circle cx="100" cy="100" r="83" fill="var(--color-charcoal)" />

            <g opacity={Math.min(1, pct / 60)}>
              {GRAINS.map((g, i) => (
                <circle
                  key={i}
                  cx={100 + (g.x - 50) * 1.5}
                  cy={100 + (g.y - 50) * 1.5}
                  r={g.r * (0.7 + pct / 55)}
                  fill={i % 3 === 0 ? "var(--color-tangerine)" : "var(--color-sun)"}
                  opacity={0.9}
                />
              ))}
            </g>

            {/* aroma lifting off, only while it turns */}
            {grinding ? (
              <g aria-hidden="true">
                {[38, 62, 100, 138, 162].map((x, i) => (
                  <circle
                    key={x}
                    cx={x}
                    cy="60"
                    r="3.5"
                    fill="var(--color-ivory)"
                    opacity="0.5"
                    className="anim-sprinkle"
                    style={{ "--delay": `${i * 0.22}s`, "--dur": "1.9s" }}
                  />
                ))}
              </g>
            ) : null}

            {/* whole spice waiting in the hopper — it visibly runs out */}
            <g opacity={Math.max(0, 1 - pct / 85)} aria-hidden="true">
              {[
                ["starAnise", 74, 74],
                ["cardamom", 126, 74],
                ["clove", 74, 126],
                ["peppercorn", 126, 126],
              ].map(([n, x, y]) => (
                <g key={n} transform={`translate(${x - 11} ${y - 11}) scale(${22 / 48})`}>
                  <SpiceIcon name={n} width="48" height="48" />
                </g>
              ))}
            </g>

            {/* the turning top stone */}
            <g
              style={{ transform: `rotate(${turn}deg)`, transformOrigin: "100px 100px" }}
              className={grinding ? "chakki-shake" : undefined}
            >
              <circle cx="100" cy="100" r="62" fill="var(--color-sand)" stroke="var(--color-ink)" strokeWidth="5" />
              <circle cx="100" cy="100" r="52" fill="none" stroke="var(--color-ink)" strokeWidth="2" opacity="0.35" />
              {/* dressing grooves */}
              {Array.from({ length: 12 }).map((_, i) => (
                <path
                  key={i}
                  d="M100 52 Q112 76 100 100"
                  fill="none"
                  stroke="var(--color-oxblood)"
                  strokeWidth="3.2"
                  opacity="0.7"
                  transform={`rotate(${i * 30} 100 100)`}
                />
              ))}
              {/* feed hole */}
              <circle cx="100" cy="100" r="13" fill="var(--color-charcoal)" stroke="var(--color-ink)" strokeWidth="3" />
              {/* the wooden peg you actually grab — drawn as a graspable
                  handle so the affordance is obvious without instructions */}
              <g>
                <rect x="95" y="34" width="10" height="26" rx="5" fill="var(--color-brown)" stroke="var(--color-ink)" strokeWidth="3" />
                <circle cx="100" cy="34" r="13" fill="var(--color-tomato)" stroke="var(--color-ink)" strokeWidth="4" />
                <circle cx="100" cy="34" r="5" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="2" />
                <path d="M92 30a9 9 0 0 1 7-7" stroke="var(--color-paper)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
              </g>
            </g>

            <circle cx="100" cy="100" r="92" fill="none" stroke="var(--color-sun)" strokeWidth="3" strokeDasharray="7 9" opacity="0.85" />
          </svg>

          <p className="label-micro mt-4 text-center text-ivory/55">
            Drag the stone · or hold the button
          </p>
        </div>
      </div>
    </section>
  );
}
