"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Star, SpiceIcon } from "@/components/spice-icons";

/**
 * The back of the lorry — HORN OK PLEASE, as an interactive panel.
 *
 * Press the horn and the whole tailgate reacts: it sounds, the bulb string
 * flashes, the panel jolts, sound arcs fly out and the slogan board flips.
 *
 * The horn is synthesised with Web Audio rather than shipped as an audio
 * file — a pressure horn is just a detuned chord through a lowpass, so there
 * is no asset to license, download or cache.
 */

/* An Indian pressure horn is a musical triad, not a single tone. */
const HORN_CHORD = [370, 466, 554]; // F#4 major-ish
const HORN_MIX = [0.5, 0.34, 0.28];
const HORN_LEN = 0.75;

/* Slogans the board cycles through — the real ones you read on GT Road. */
const SLOGANS = [
  { hi: "मेरा भारत महान", en: "Buri nazar wale, tera muh kala" },
  { hi: "कम मसाला, पूरा स्वाद", en: "Less masala, full flavour" },
  { hi: "दूर के रिश्तेदार", en: "Keep distance, we brake for spice" },
  { hi: "अपना रीजन, अपनी थाली", en: "Your region, your plate" },
  { hi: "एक चुटकी, फुल फायर", en: "One pinch, full fire" },
];

/* Bulb string across the top rail. */
const BULBS = Array.from({ length: 17 }, (_, i) => ({
  x: 42 + i * 33,
  tone: ["var(--color-sun)", "var(--color-raspberry)", "var(--color-sky)", "var(--color-kiwi)"][i % 4],
  delay: (i % 5) * 0.16,
}));

export default function HornOkPlease() {
  const [slogan, setSlogan] = useState(0);
  const [honking, setHonking] = useState(false);
  const [honks, setHonks] = useState(0);
  const [muted, setMuted] = useState(false);
  const timer = useRef(null);
  const audio = useRef(null);

  /* Built lazily on the click, which is also what satisfies the browser's
     autoplay policy — an AudioContext created before a gesture starts
     suspended and stays silent. */
  const sound = useCallback(() => {
    if (typeof window === "undefined") return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;

    let ctx = audio.current;
    if (!ctx) {
      ctx = new Ctx();
      audio.current = ctx;
    }
    if (ctx.state === "suspended") ctx.resume();

    const t = ctx.currentTime;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, t);
    master.gain.exponentialRampToValueAtTime(0.26, t + 0.045);
    master.gain.setValueAtTime(0.26, t + 0.48);
    master.gain.exponentialRampToValueAtTime(0.0001, t + HORN_LEN);

    /* Tame the sawtooth buzz into something brassy rather than harsh. */
    const tone = ctx.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.setValueAtTime(2600, t);
    tone.Q.value = 0.6;

    tone.connect(master);
    master.connect(ctx.destination);

    HORN_CHORD.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, t);
      // the pitch sags as the air lets go, like the real thing
      osc.frequency.setValueAtTime(freq, t + 0.5);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.94, t + HORN_LEN);

      const mix = ctx.createGain();
      mix.gain.value = HORN_MIX[i];

      osc.connect(mix);
      mix.connect(tone);
      osc.start(t);
      osc.stop(t + HORN_LEN + 0.02);
    });
  }, []);

  const honk = useCallback(() => {
    if (!muted) sound();
    setHonking(true);
    setHonks((n) => n + 1);
    setSlogan((s) => (s + 1) % SLOGANS.length);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setHonking(false), 700);
  }, [muted, sound]);

  useEffect(
    () => () => {
      clearTimeout(timer.current);
      audio.current?.close?.();
    },
    []
  );

  const line = SLOGANS[slogan];

  return (
    <section className="relative isolate overflow-hidden bg-derbyshire section text-paper">
      <div className="tex-sunburst pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="shell relative grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        {/* ── copy ── */}
        <div data-reveal="up">
          <p
            className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
            style={{ "--plaque-bg": "var(--color-sun)", "--plaque-fg": "var(--color-ink)" }}
          >
            <Star className="w-3.5" />
            Press the horn
          </p>

          <h2 className="h-poster-sm text-drop mt-4" style={{ "--drop": "var(--color-dragonfruit)" }}>
            Horn <span className="text-sun">OK</span> Please.
          </h2>

          <p className="lede mt-5 max-w-md text-paper/80">
            Fifty years of Sunder has travelled on the back of trucks like this one — mandi to
            mill, mill to kirana, kirana to your tawa. Give it a honk.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <button type="button" onClick={honk} className="btn btn-gold">
              <SpiceIcon mono name="truck" className="w-4" />
              Honk
            </button>

            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-pressed={muted}
              className="grid h-11 w-11 shrink-0 place-content-center rounded-full border-2 border-paper/40 text-paper/70 transition-colors hover:border-sun hover:text-sun"
              title={muted ? "Unmute the horn" : "Mute the horn"}
            >
              <span className="sr-only">{muted ? "Unmute the horn" : "Mute the horn"}</span>
              <svg viewBox="0 0 24 24" className="w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H3v6h3l5 4z" />
                {muted ? (
                  <path d="m16 9 5 6M21 9l-5 6" />
                ) : (
                  <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
                )}
              </svg>
            </button>
            <Link href="/regions" className="btn btn-ghost text-sun">
              Follow the route
            </Link>
          </div>

          <p className="label-micro mt-6 text-paper/55" aria-live="polite">
            {honks === 0
              ? "The board changes every honk"
              : `${honks} honk${honks === 1 ? "" : "s"} · ${line.en}`}
          </p>
        </div>

        {/* ── the tailgate ── */}
        <div className="relative" data-reveal="scale">
          <button
            type="button"
            onClick={honk}
            aria-label="Sound the horn"
            className={`block w-full cursor-pointer rounded-2xl focus-visible:outline-offset-8 ${
              honking ? "anim-jolt" : ""
            }`}
          >
            <svg viewBox="0 0 640 470" className="w-full" role="img" aria-label="Truck tailgate reading Horn OK Please">
              {/* body */}
              <rect x="8" y="8" width="624" height="380" rx="14" fill="var(--color-tomato)" stroke="var(--color-ink)" strokeWidth="5" />
              <rect x="24" y="24" width="592" height="348" rx="8" fill="none" stroke="var(--color-sun)" strokeWidth="3" strokeDasharray="9 7" />

              {/* bulb rail */}
              <rect x="30" y="34" width="580" height="30" rx="6" fill="var(--color-ink)" opacity="0.35" />
              {BULBS.map((b, i) => (
                <circle
                  key={i}
                  cx={b.x}
                  cy="49"
                  r="7"
                  fill={b.tone}
                  stroke="var(--color-ink)"
                  strokeWidth="2"
                  className="anim-bulb"
                  style={{ "--delay": `${b.delay}s`, animationDuration: honking ? "0.22s" : "1.7s" }}
                />
              ))}

              {/* slogan board */}
              <rect x="42" y="78" width="556" height="74" rx="8" fill="var(--color-cobalt)" stroke="var(--color-ink)" strokeWidth="4" />
              <rect x="52" y="88" width="536" height="54" rx="4" fill="none" stroke="var(--color-sun)" strokeWidth="2" strokeDasharray="6 5" />
              <text
                key={slogan}
                x="320"
                y="126"
                textAnchor="middle"
                className="font-deva anim-flip"
                fill="var(--color-sun)"
                style={{ fontSize: "40px", fontWeight: 700 }}
              >
                {line.hi}
              </text>

              {/* HORN · OK · PLEASE */}
              <g>
                <rect x="42" y="168" width="196" height="96" rx="8" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="4" />
                <text x="140" y="236" textAnchor="middle" className="font-poster" fill="var(--color-tomato)" style={{ fontSize: "62px" }}>
                  HORN
                </text>

                <rect x="402" y="168" width="196" height="96" rx="8" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="4" />
                <text x="500" y="232" textAnchor="middle" className="font-poster" fill="var(--color-tomato)" style={{ fontSize: "50px" }}>
                  PLEASE
                </text>

                {/* the OK roundel — spins on hover, jumps on honk */}
                <g className={honking ? "anim-pop" : ""} style={{ transformOrigin: "320px 216px" }}>
                  <circle cx="320" cy="216" r="62" fill="var(--color-dragonfruit)" stroke="var(--color-ink)" strokeWidth="5" />
                  <circle cx="320" cy="216" r="50" fill="none" stroke="var(--color-sun)" strokeWidth="3" strokeDasharray="7 6" />
                  <text x="320" y="240" textAnchor="middle" className="font-poster" fill="var(--color-paper)" style={{ fontSize: "58px" }}>
                    OK
                  </text>
                </g>
              </g>

              {/* lower banner */}
              <rect x="42" y="284" width="556" height="60" rx="8" fill="var(--color-kiwi)" stroke="var(--color-ink)" strokeWidth="4" />
              <text x="320" y="323" textAnchor="middle" className="font-poster" fill="var(--color-ink)" style={{ fontSize: "30px" }}>
                SUNDER MASALA · SINCE 1975
              </text>

              {/* side floral columns */}
              {[26, 614].map((x) => (
                <g key={x}>
                  {[110, 200, 290].map((y) => (
                    <circle key={y} cx={x} cy={y} r="9" fill="var(--color-raspberry)" stroke="var(--color-ink)" strokeWidth="2.5" />
                  ))}
                </g>
              ))}

              {/* mudflaps */}
              <rect x="70" y="388" width="132" height="54" rx="6" fill="var(--color-cobalt)" stroke="var(--color-ink)" strokeWidth="4" />
              <text x="136" y="422" textAnchor="middle" className="font-poster" fill="var(--color-sun)" style={{ fontSize: "22px" }}>
                SPEED
              </text>
              <rect x="438" y="388" width="132" height="54" rx="6" fill="var(--color-cobalt)" stroke="var(--color-ink)" strokeWidth="4" />
              <text x="504" y="422" textAnchor="middle" className="font-poster" fill="var(--color-sun)" style={{ fontSize: "22px" }}>
                LIMIT
              </text>

              {/* wheels */}
              {[248, 392].map((cx) => (
                <g key={cx}>
                  <circle cx={cx} cy="410" r="46" fill="var(--color-ink)" />
                  <circle cx={cx} cy="410" r="36" fill="none" stroke="var(--color-soot)" strokeWidth="7" />
                  <circle cx={cx} cy="410" r="23" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="4" />
                  <g
                    className={honking ? "anim-spin-fast" : ""}
                    style={{ transformOrigin: `${cx}px 410px` }}
                  >
                    {[0, 45, 90, 135].map((r) => (
                      <rect
                        key={r}
                        x={cx - 2.4}
                        y="389"
                        width="4.8"
                        height="42"
                        rx="2"
                        fill="var(--color-ink)"
                        transform={`rotate(${r} ${cx} 410)`}
                      />
                    ))}
                  </g>
                  <circle cx={cx} cy="410" r="7" fill="var(--color-tomato)" stroke="var(--color-ink)" strokeWidth="3" />
                </g>
              ))}

              {/* horn arcs, on honk */}
              {honking ? (
                <g fill="none" stroke="var(--color-sun)" strokeWidth="6" strokeLinecap="round" className="anim-arc">
                  <path d="M604 150c26 22 26 62 0 84" />
                  <path d="M622 132c40 34 40 96 0 130" />
                  <path d="M36 150c-26 22-26 62 0 84" />
                  <path d="M18 132c-40 34-40 96 0 130" />
                </g>
              ) : null}
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
