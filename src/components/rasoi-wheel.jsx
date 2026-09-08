"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import FoodIllustration from "@/components/food-illustration";
import { photoFor, sourceNameOf } from "@/lib/recipe-photos";

/**
 * RasoiWheel — "Aaj Kya Banega?"
 *
 * V2: Redesigned for clarity and impact.
 *   - 8 segments (45° each) — wide enough for legible curved labels
 *   - 520×520 SVG, displayed up to 480px — visually substantial
 *   - curved <textPath> labels — text follows the arc naturally
 *   - multi-ring decorative border — truck-art medallion aesthetic
 *   - bold centre hub — Sunder branding
 *   - dark forest section background — wheel pops against it
 */

/* ─── Dish data ──────────────────────────────────────────────── */
const DISHES = [
  { slug: "indori-poha",    en: "Indori Poha",   hi: "इंदौरी पोहा",  fill: "#ffc740", ink: "#14100c", spot: "#6f1a10",  time: "15 min", course: "Quick"    },
  { slug: "pav-bhaji",      en: "Pav Bhaji",      hi: "पाव भाजी",    fill: "#d5231a", ink: "#fdf6e8", spot: "#ffc740",  time: "40 min", course: "Weekend"  },
  { slug: "chole-bhature",  en: "Chole Bhature",  hi: "छोले भटूरे",  fill: "#6f1a10", ink: "#fdf6e8", spot: "#ffc740",  time: "1 hr",   course: "Weekend"  },
  { slug: "dal-tadka",      en: "Dal Tadka",       hi: "दाल तड़का",   fill: "#f9c10f", ink: "#14100c", spot: "#6f1a10",  time: "35 min", course: "Weeknight"},
  { slug: "sambhar",        en: "Sambhar",          hi: "साम्बर",       fill: "#0e3b2c", ink: "#ffdf8c", spot: "#ffc740",  time: "45 min", course: "Weeknight"},
  { slug: "aloo-chaat",     en: "Aloo Chaat",      hi: "आलू चाट",     fill: "#a81246", ink: "#fdf6e8", spot: "#f9c10f",  time: "20 min", course: "Street"   },
  { slug: "shahi-paneer",   en: "Shahi Paneer",    hi: "शाही पनीर",   fill: "#1b4db1", ink: "#fdf6e8", spot: "#f9c10f",  time: "45 min", course: "Weekend"  },
  { slug: "kadhi-pakora",   en: "Kadhi Pakora",    hi: "कढ़ी पकोड़ा", fill: "#4b5d22", ink: "#ffdf8c", spot: "#ffc740",  time: "1 hr",   course: "Weeknight"},
];

const N     = DISHES.length;          // 8
const SLICE = 360 / N;                 // 45°
const CX    = 260;
const CY    = 260;
const R     = 218;                     // outer wheel radius

/* ─── Geometry helpers ───────────────────────────────────────── */
/** Polar → cartesian. angle = 0 at top, clockwise. */
function pt(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  // Browser and server engines round trigonometry at different final digits.
  // Quantising SVG coordinates avoids a React hydration mismatch without
  // changing the visible geometry.
  return {
    x: Number((cx + r * Math.cos(rad)).toFixed(4)),
    y: Number((cy + r * Math.sin(rad)).toFixed(4)),
  };
}

/** SVG `d` for one pie wedge. */
function wedge(cx, cy, r, a0, a1) {
  const s = pt(cx, cy, r, a0);
  const e = pt(cx, cy, r, a1);
  const lg = a1 - a0 > 180 ? 1 : 0;
  return `M${cx},${cy} L${s.x},${s.y} A${r},${r},0,${lg},1,${e.x},${e.y} Z`;
}

/**
 * Arc path for a textPath label.
 * Top-half arcs go clockwise (natural L→R reading).
 * Bottom-half arcs are reversed so text never appears upside-down.
 */
function arcPath(cx, cy, r, a0, a1) {
  const mid = (a0 + a1) / 2;
  const pad = 4;
  if (mid <= 180) {
    const s = pt(cx, cy, r, a0 + pad);
    const e = pt(cx, cy, r, a1 - pad);
    return `M${s.x},${s.y} A${r},${r},0,0,1,${e.x},${e.y}`;
  } else {
    // Reverse the arc so text faces outward on the bottom half
    const s = pt(cx, cy, r, a1 - pad);
    const e = pt(cx, cy, r, a0 + pad);
    return `M${s.x},${s.y} A${r},${r},0,0,0,${e.x},${e.y}`;
  }
}

/* ─── Component ─────────────────────────────────────────────── */
export default function RasoiWheel() {
  const [spinning,  setSpinning]  = useState(false);
  const [rotation,  setRotation]  = useState(0);
  const [landed,    setLanded]    = useState(null);
  const accumRef = useRef(0);

  function spin(target = Math.floor(Math.random() * N)) {
    if (spinning) return;

    const extraRevs = 6 + Math.floor(Math.random() * 5);          // 6–10 full turns
    const midOfSeg  = target * SLICE + SLICE / 2;
    const newRot    = accumRef.current
      + (extraRevs * 360)
      + ((360 - (accumRef.current % 360) - midOfSeg + 360) % 360);

    accumRef.current = newRot;
    setSpinning(true);
    setLanded(null);
    setRotation(newRot);

    setTimeout(() => { setSpinning(false); setLanded(target); }, 4000);
  }

  const winner = landed !== null ? DISHES[landed] : null;
  const winnerPhoto = winner ? photoFor(winner.slug) : null;

  return (
    <section
      className="relative isolate overflow-hidden section-lg"
      style={{ background: "var(--color-oxblood)" }}
      aria-label="Aaj Kya Banega? Rasoi Wheel"
    >
      {/* Faint sunburst watermark */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]">
        {Array.from({ length: 48 }).map((_, i) => {
          const a = (i * (360 / 48) * Math.PI) / 180;
          return (
            <line key={i} x1="50%" y1="50%"
              x2={`${(50 + 80 * Math.cos(a)).toFixed(4)}%`}
              y2={`${(50 + 80 * Math.sin(a)).toFixed(4)}%`}
              stroke="#ffc740" strokeWidth="1"
            />
          );
        })}
      </svg>

      <div className="shell relative">

        {/* ── Section heading ── */}
        <div className="mb-12 text-center" data-reveal="up">
          <p className="label-micro text-marigold inline-flex items-center gap-2 tracking-[0.2em]">
            ✦ &nbsp;Rasoi Ka Sawaal &nbsp; ✦
          </p>
          <h2 className="h-editorial mt-2 text-ghee">
            Aaj Kya Banega?
          </h2>
          <p className="font-deva text-[1.25rem] text-marigold mt-1 leading-snug" lang="hi">
            चक्र घुमाओ, थाली सजाओ।
          </p>
          <p className="lede mt-3 text-paper/70 max-w-lg mx-auto">
            Can&apos;t decide what to cook tonight? Spin the wheel and let the rasoi decide.
          </p>
        </div>

        {/* ── Main layout: wheel + result ── */}
        <div className="flex flex-col xl:flex-row items-center justify-center gap-10 xl:gap-16">

          {/* ── THE WHEEL ── */}
          <div className="relative flex flex-col items-center" data-reveal="scale">

            {/* Needle / pointer */}
            <div aria-hidden="true" className="absolute z-20" style={{ top: "-28px", left: "50%", transform: "translateX(-50%)" }}>
              <svg width="40" height="52" viewBox="0 0 40 52">
                {/* Shadow needle */}
                <polygon points="20,50 2,4 38,4" fill="#14100c" opacity="0.35" transform="translate(2,4)"/>
                {/* Outer oxblood */}
                <polygon points="20,48 3,6 37,6" fill="#6f1a10"/>
                {/* Inner marigold */}
                <polygon points="20,42 8,8 32,8" fill="#ffc740"/>
                {/* Tip dot */}
                <circle cx="20" cy="46" r="4" fill="#6f1a10"/>
                <circle cx="20" cy="46" r="2.5" fill="#ffc740"/>
              </svg>
            </div>

            {/* SVG Wheel */}
            <svg
              viewBox="0 0 520 520"
              style={{
                width: "clamp(280px, 85vw, 480px)",
                height: "auto",
                transform: `rotate(${rotation}deg)`,
                transition: spinning
                  ? "transform 4s cubic-bezier(0.15, 0.6, 0.1, 1.0)"
                  : "none",
                filter: "drop-shadow(0 12px 36px rgba(0,0,0,0.55))",
              }}
              aria-label="Spinning recipe wheel"
            >
              <defs>
                {/* TextPath arcs — one per segment */}
                {DISHES.map((_, i) => {
                  const a0 = i * SLICE;
                  const a1 = a0 + SLICE;
                  return (
                    <path
                      key={`tp-${i}`}
                      id={`arc-${i}`}
                      d={arcPath(CX, CY, R * 0.67, a0, a1)}
                      fill="none"
                    />
                  );
                })}
                {/* Inner (Hindi) arcs */}
                {DISHES.map((_, i) => {
                  const a0 = i * SLICE;
                  const a1 = a0 + SLICE;
                  return (
                    <path
                      key={`tp2-${i}`}
                      id={`arc2-${i}`}
                      d={arcPath(CX, CY, R * 0.82, a0, a1)}
                      fill="none"
                    />
                  );
                })}
              </defs>

              {/* ── Outer cream background circle ── */}
              <circle cx={CX} cy={CY} r="252" fill="#fdf6e8" />

              {/* ── Decorative border rings ── */}
              <circle cx={CX} cy={CY} r="252" fill="none" stroke="#14100c" strokeWidth="5" />
              <circle cx={CX} cy={CY} r="246" fill="none" stroke="#ffc740" strokeWidth="9" />
              <circle cx={CX} cy={CY} r="237" fill="none" stroke="#14100c" strokeWidth="4" />
              <circle cx={CX} cy={CY} r="232" fill="none" stroke="#fdf6e8" strokeWidth="2" />

              {/* ── Diamond markers at every segment boundary ── */}
              {DISHES.map((_, i) => {
                const angle = i * SLICE;
                const dOuter = pt(CX, CY, 246, angle);
                return (
                  <g key={`dm-${i}`}>
                    <circle cx={dOuter.x} cy={dOuter.y} r="5.5" fill="#fdf6e8" stroke="#14100c" strokeWidth="1.5" />
                    <circle cx={dOuter.x} cy={dOuter.y} r="2.5" fill="#14100c" />
                  </g>
                );
              })}

              {/* ── Coloured wedges ── */}
              {DISHES.map((dish, i) => {
                const a0 = i * SLICE;
                const a1 = a0 + SLICE;
                return (
                  <path
                    key={dish.slug}
                    d={wedge(CX, CY, R, a0, a1)}
                    fill={dish.fill}
                    stroke="#14100c"
                    strokeWidth="1.5"
                  />
                );
              })}

              {/* ── Spoke lines (bold gold, then thin dark) ── */}
              {DISHES.map((_, i) => {
                const angle = i * SLICE;
                const inner = pt(CX, CY, 68, angle);
                const outer = pt(CX, CY, R, angle);
                return (
                  <line key={`sp-${i}`}
                    x1={inner.x} y1={inner.y}
                    x2={outer.x} y2={outer.y}
                    stroke="#14100c" strokeWidth="2.5"
                  />
                );
              })}

              {/* ── English dish name (curved, outer arc) ── */}
              {DISHES.map((dish, i) => (
                <text
                  key={`en-${i}`}
                  fontFamily="'Bebas Neue', 'Outfit', sans-serif"
                  fontSize="11.5"
                  letterSpacing="0.07em"
                  fill={dish.ink}
                  fontWeight="700"
                >
                  <textPath href={`#arc-${i}`} startOffset="50%" textAnchor="middle">
                    {dish.en.toUpperCase()}
                  </textPath>
                </text>
              ))}

              {/* ── Hindi dish name (curved, inner arc, slightly closer to centre) ── */}
              {DISHES.map((dish, i) => {
                const mid = i * SLICE + SLICE / 2;
                return (
                  <text
                    key={`hi-${i}`}
                    fontFamily="'Baloo 2', sans-serif"
                    fontSize="11.5"
                    fill={dish.ink}
                    fontWeight="700"
                    opacity="0.85"
                  >
                    <textPath href={`#arc2-${i}`} startOffset="50%" textAnchor="middle">
                      {dish.hi}
                    </textPath>
                  </text>
                );
              })}

              {/* ── Small dot on each spoke at mid-rim ── */}
              {DISHES.map((_, i) => {
                const angle = i * SLICE + SLICE / 2;
                const d = pt(CX, CY, R - 14, angle);
                return <circle key={`rd-${i}`} cx={d.x} cy={d.y} r="3" fill="#fdf6e8" opacity="0.45" />;
              })}

              {/* ── Centre medallion ── */}
              <circle cx={CX} cy={CY} r="70"  fill="#6f1a10" />
              <circle cx={CX} cy={CY} r="65"  fill="none" stroke="#ffc740" strokeWidth="2.5" />
              <circle cx={CX} cy={CY} r="60"  fill="#ffc740" />
              <circle cx={CX} cy={CY} r="55"  fill="none" stroke="#6f1a10" strokeWidth="2" />
              <circle cx={CX} cy={CY} r="50"  fill="#6f1a10" />
              <circle cx={CX} cy={CY} r="46"  fill="none" stroke="#fdf6e8" strokeWidth="1" />

              {/* Stars in the gold ring */}
              {[0, 72, 144, 216, 288].map((a) => {
                const s = pt(CX, CY, 57.5, a);
                return (
                  <text key={`cs-${a}`} x={s.x} y={s.y}
                    textAnchor="middle" dominantBaseline="central"
                    fontSize="7" fill="#6f1a10" fontWeight="900"
                  >★</text>
                );
              })}

              {/* Brand text */}
              <text x={CX} y={CY - 9}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontFamily="'Bebas Neue', 'Outfit', sans-serif"
                fontWeight="900" letterSpacing="0.14em"
                fill="#fdf6e8"
              >SUNDER</text>

              <text x={CX} y={CY + 8}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="9.5" fontFamily="'Baloo 2', sans-serif"
                fontWeight="700"
                fill="#ffc740"
                lang="hi"
              >मसाला</text>

              {/* Needle mount dot at centre */}
              <circle cx={CX} cy={CY} r="5.5" fill="#ffc740" />
              <circle cx={CX} cy={CY} r="2.5" fill="#6f1a10" />

            </svg>

            {/* ── Spin button ── */}
            <button
              onClick={spin}
              disabled={spinning}
              className="mt-8 btn btn-gold"
              style={{
                fontSize: "1.05rem",
                letterSpacing: "0.08em",
                padding: "0.9rem 2.8rem",
                "--btn-shadow": "#14100c",
              }}
            >
              {spinning ? (
                <span className="flex items-center gap-2.5">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                  </svg>
                  Ghoom raha hai…
                </span>
              ) : (
                <span className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="font-deva text-[1.4em] leading-none" lang="hi">✦</span>
                  Chakra Ghumaao!
                </span>
              )}
            </button>

            {!spinning && landed === null && (
              <p className="mt-3 text-paper/45 text-sm text-center font-deva" lang="hi">
                घुमाओ और देखो — आज क्या बनेगा
              </p>
            )}
          </div>

          {/* ── RESULT PANEL ── */}
          <div className="w-full xl:w-[420px] flex items-center justify-center min-h-[360px]">
            {winner ? (
              <div
                className="w-full rounded-[1.6rem] overflow-hidden"
                style={{
                  boxShadow: `0 6px 0 6px #14100c, 0 12px 0 8px ${winner.spot}`,
                  animation: "wheel-pop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both",
                }}
              >
                {/* Card header — a menu-board card: the dish photographed like
                    a café would plate it, priced with a course · time tag,
                    the drawn dish signing the corner underneath its name. */}
                {winnerPhoto && (
                  <div className="relative">
                    <Image
                      src={winnerPhoto.src}
                      alt={`${winner.en} — cooked dish`}
                      width={800}
                      height={560}
                      className="aspect-[10/7] w-full object-cover"
                    />
                    <span
                      className="chip chip-solid absolute bottom-4 left-4"
                      style={{ "--chip-bg": "#14100c", "--chip-fg": winner.spot }}
                    >
                      ✦ {winner.course} · {winner.time}
                    </span>
                    <FoodIllustration
                      slug={winner.slug}
                      className="absolute -bottom-3 right-4 h-14 w-14 drop-shadow-[0_2px_0_rgba(0,0,0,0.35)]"
                    />
                  </div>
                )}

                <div
                  className="px-7 pt-6 pb-5 flex items-center gap-4"
                  style={{ background: winner.fill, color: winner.ink }}
                >
                  <div className="flex-1">
                    {!winnerPhoto && (
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-[0.14em]"
                        style={{ background: winner.spot, color: winner.ink }}
                      >
                        ✦ {winner.course} · {winner.time}
                      </span>
                    )}

                    {/* Hindi */}
                    <p
                      className={`font-deva font-bold leading-tight ${winnerPhoto ? "" : "mt-4"}`}
                      lang="hi"
                      style={{ fontSize: "clamp(1.7rem, 4.5vw, 2.4rem)", color: winner.spot }}
                    >
                      {winner.hi}
                    </p>

                    {/* English */}
                    <h3
                      className="h-poster-xs leading-[1.05] mt-0.5"
                      style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)", color: winner.ink }}
                    >
                      {winner.en}
                    </h3>
                  </div>
                  {!winnerPhoto && (
                    <FoodIllustration slug={winner.slug} className="w-24 h-24 shrink-0 filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]" />
                  )}
                </div>

                {/* Card footer */}
                <div
                  className="px-7 py-5 flex flex-wrap items-center gap-3"
                  style={{ background: "#14100c" }}
                >
                  <Link
                    href={`/recipes/${winner.slug}`}
                    className="btn btn-gold btn-sm"
                    style={{ "--btn-shadow": winner.spot }}
                  >
                    Cook it now →
                  </Link>
                  <button
                    onClick={spin}
                    className="btn btn-sm"
                    style={{
                      border: "2px solid rgba(255,255,255,0.3)",
                      color: "#fdf6e8",
                      background: "transparent",
                    }}
                  >
                    Spin again
                  </button>
                </div>

                {/* Quote strip */}
                <div
                  className="px-7 py-3.5 border-t"
                  style={{ background: winner.spot, borderColor: "#14100c", color: winner.ink }}
                >
                  <p className="font-deva text-[0.9rem] font-bold" lang="hi">
                    &quot;चक्र ने चुना, अब रसोई तुम्हारी।&quot;
                  </p>
                </div>

                {winnerPhoto && (
                  <p
                    className="px-7 py-2 text-[0.68rem]"
                    style={{ background: "#14100c", color: "rgba(253,246,232,0.5)" }}
                  >
                    Photo by {winnerPhoto.author} ·{" "}
                    <a href={winnerPhoto.source} className="underline" rel="noopener noreferrer" target="_blank">
                      {sourceNameOf(winnerPhoto)}
                    </a>
                    {" · "}{winnerPhoto.licence}
                  </p>
                )}
              </div>
            ) : (
              /* Pre-spin placeholder */
              <div
                className="w-full rounded-[1.6rem] p-8 text-center"
                style={{
                  border: "3px dashed rgba(255,199,64,0.3)",
                  background: "rgba(255,199,64,0.05)",
                }}
              >
                <p
                  className="font-deva font-bold text-marigold leading-snug"
                  lang="hi"
                  style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
                >
                  आज क्या बनेगा?
                </p>
                <p className="text-paper/50 mt-4 text-copy">
                  Spin the wheel and let the rasoi decide.
                </p>
                <div className="mt-7 grid grid-cols-2 gap-2.5 text-left sm:grid-cols-4">
                  {DISHES.map((dish, index) => {
                    const photo = photoFor(dish.slug);
                    return (
                      <button
                        key={dish.slug}
                        type="button"
                        onClick={() => spin(index)}
                        className="group flex min-w-0 flex-col overflow-hidden rounded-xl border-2 text-center transition-transform hover:-translate-y-1 focus-visible:-translate-y-1"
                        style={{
                          borderColor: dish.ink,
                          boxShadow: `2px 3px 0 ${dish.ink}`,
                        }}
                        aria-label={`Choose ${dish.en}`}
                      >
                        {photo ? (
                          <div className="relative">
                            <Image
                              src={photo.src}
                              alt=""
                              width={160}
                              height={160}
                              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <FoodIllustration
                              slug={dish.slug}
                              className="absolute -bottom-1.5 -right-1.5 h-6 w-6 drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center py-3" style={{ background: dish.fill }}>
                            <FoodIllustration
                              slug={dish.slug}
                              className="h-12 w-12 transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        )}
                        <span
                          className="px-1.5 py-1.5 text-[0.66rem] font-extrabold leading-tight uppercase tracking-[0.06em]"
                          style={{ background: dish.fill, color: dish.ink }}
                        >
                          {dish.en}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Keyframe */}
      <style>{`
        @keyframes wheel-pop {
          0%   { opacity: 0; transform: scale(0.85) translateY(12px); }
          65%  { transform: scale(1.03) translateY(-3px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </section>
  );
}
