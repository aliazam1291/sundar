"use client";

/**
 * FoodIllustration v3 — Truck-art Medallion Badges
 *
 * Each badge is a circular emblem:
 *   1. Outer solid ring (dish accent colour)
 *   2. Dashed inner ring (ink)
 *   3. Food artwork composed of bezier paths, layered flat fills, thick outlines
 *   4. Compass-point ornamental dots on the inner ring
 *
 * All badges share a 120 × 120 viewBox so they scale cleanly from icon to hero.
 * Every path is hand-drawn — no placeholder rects.
 */
export default function FoodIllustration({ slug, className = "w-16 h-16" }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label={`${slug} illustration`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {inner(slug)}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Shared badge shell + ornament helpers
───────────────────────────────────────────────────────────── */

/** Outer + inner decorative rings with compass dots. */
function BadgeRing({ bg, ring, dots }) {
  const CX = 60, CY = 60;
  const positions = [
    { cx: CX,        cy: CY - 46 },  // top
    { cx: CX + 46,   cy: CY },        // right
    { cx: CX,        cy: CY + 46 },  // bottom
    { cx: CX - 46,   cy: CY },        // left
    { cx: CX + 32.5, cy: CY - 32.5 }, // top-right
    { cx: CX + 32.5, cy: CY + 32.5 }, // bottom-right
    { cx: CX - 32.5, cy: CY + 32.5 }, // bottom-left
    { cx: CX - 32.5, cy: CY - 32.5 }, // top-left
  ];
  return (
    <>
      {/* Outer filled ring */}
      <circle cx={CX} cy={CY} r="59" fill={bg} stroke="#14100c" strokeWidth="3" />
      {/* Cream inner disc */}
      <circle cx={CX} cy={CY} r="51" fill="#fdf6e8" stroke="#14100c" strokeWidth="2.5" />
      {/* Dashed inner ring */}
      <circle cx={CX} cy={CY} r="46" fill="none" stroke="#14100c" strokeWidth="1.5" strokeDasharray="5 3.5" />
      {/* Ornament dots at compass points */}
      {positions.map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r="3.5" fill={dots} stroke="#14100c" strokeWidth="1.2" />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Per-dish artwork
───────────────────────────────────────────────────────────── */
function inner(slug) {
  switch (slug) {

    /* ── Indori Poha ─────────────────────────────────────────── */
    case "indori-poha":
      return (
        <>
          <BadgeRing bg="#ffc740" ring="#14100c" dots="#6f1a10" />
          {/* Plate shadow */}
          <ellipse cx="61" cy="77" rx="32" ry="8" fill="#e8d9b8" />
          {/* Plate rim */}
          <ellipse cx="60" cy="72" rx="32" ry="9" fill="#f7ecd6" stroke="#14100c" strokeWidth="2.5" />
          <ellipse cx="60" cy="72" rx="27" ry="6.5" fill="#ebdcbd" stroke="#14100c" strokeWidth="1.5" />
          {/* Poha mound — organic puffed heap */}
          <path d="M 32 68 Q 34 54 45 51 Q 60 47 75 51 Q 86 54 88 68 Q 60 78 32 68 Z"
            fill="#ffc740" stroke="#14100c" strokeWidth="2.5" />
          {/* Interior texture waves */}
          <path d="M 38 65 Q 50 59 60 60 Q 70 61 82 65" fill="none" stroke="#e8a800" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 40 69 Q 52 63 60 64 Q 68 65 80 69" fill="none" stroke="#e8a800" strokeWidth="1.5" strokeLinecap="round" />
          {/* Sev strands — bright crispy mesh */}
          <path d="M 44 58 Q 45 54 49 57 Q 50 52 53 56 Q 55 50 59 55 Q 62 50 65 55 Q 68 52 70 57 Q 73 54 74 58"
            fill="none" stroke="#6f1a10" strokeWidth="1.8" strokeLinecap="round" />
          {/* Pomegranate arils */}
          <circle cx="46" cy="63" r="2.5" fill="#e11d74" stroke="#14100c" strokeWidth="1" />
          <circle cx="55" cy="58" r="2.5" fill="#e11d74" stroke="#14100c" strokeWidth="1" />
          <circle cx="66" cy="59" r="2.5" fill="#e11d74" stroke="#14100c" strokeWidth="1" />
          <circle cx="74" cy="63" r="2.2" fill="#e11d74" stroke="#14100c" strokeWidth="1" />
          {/* Coriander sprigs */}
          <path d="M 50 54 Q 47 49 44 51 Q 47 53 50 54 Z" fill="#7fa928" stroke="#14100c" strokeWidth="1" />
          <path d="M 65 54 Q 68 49 71 51 Q 68 53 65 54 Z" fill="#7fa928" stroke="#14100c" strokeWidth="1" />
          {/* Lemon wedge */}
          <path d="M 42 72 Q 38 76 42 78 Q 46 76 42 72 Z" fill="#f9c10f" stroke="#14100c" strokeWidth="1.5" />
          <line x1="42" y1="72" x2="42" y2="78" stroke="#14100c" strokeWidth="1" />
        </>
      );

    /* ── Dal Tadka ───────────────────────────────────────────── */
    case "dal-tadka":
      return (
        <>
          <BadgeRing bg="#0e3b2c" ring="#ffc740" dots="#ffc740" />
          {/* Brass bowl — curved base */}
          <path d="M 30 73 Q 30 82 60 83 Q 90 82 90 73 L 84 55 Q 84 52 60 51 Q 36 52 36 55 Z"
            fill="#b8832a" stroke="#14100c" strokeWidth="2.5" />
          {/* Bowl rim (gold ring) */}
          <ellipse cx="60" cy="55" rx="24" ry="7" fill="#ffc740" stroke="#14100c" strokeWidth="2.5" />
          {/* Yellow dal surface */}
          <ellipse cx="60" cy="54" rx="21" ry="5.5" fill="#f9c10f" />
          {/* Ghee pool */}
          <ellipse cx="60" cy="53" rx="9" ry="3" fill="#ffdf8c" />
          {/* Whole red chilli */}
          <path d="M 46 50 Q 55 43 66 50 Q 62 54 53 53 Q 46 52 46 50 Z" fill="#d5231a" stroke="#14100c" strokeWidth="2" />
          <path d="M 66 50 Q 71 51 73 48" fill="none" stroke="#7fa928" strokeWidth="2" strokeLinecap="round" />
          {/* Cumin seeds */}
          {[[50,56],[55,57],[61,55],[66,56],[56,53]].map(([x,y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="1.8" ry="1" transform={`rotate(${i*20} ${x} ${y})`} fill="#14100c" />
          ))}
          {/* Coriander leaves */}
          <path d="M 43 57 Q 40 53 43 55 Q 44 57 43 59 Z" fill="#7fa928" stroke="#14100c" strokeWidth="1" />
          <path d="M 77 57 Q 80 53 77 55 Q 76 57 77 59 Z" fill="#7fa928" stroke="#14100c" strokeWidth="1" />
          {/* Bowl decorative band */}
          <path d="M 36 63 Q 60 68 84 63" fill="none" stroke="#ffc740" strokeWidth="1.5" strokeLinecap="round" />
        </>
      );

    /* ── Chole Bhature ───────────────────────────────────────── */
    case "chole-bhature":
      return (
        <>
          <BadgeRing bg="#6f1a10" ring="#fdf6e8" dots="#ffc740" />
          {/* Plate */}
          <ellipse cx="60" cy="78" rx="34" ry="9" fill="#ebdcbd" stroke="#14100c" strokeWidth="2.5" />
          {/* Bhatura — big puffed oval, golden-fried */}
          <path d="M 20 60 Q 22 34 40 30 Q 62 28 66 50 Q 70 70 48 76 Q 24 76 20 60 Z"
            fill="#ffc740" stroke="#14100c" strokeWidth="3" />
          {/* Fried bubble blisters */}
          <path d="M 32 46 Q 36 40 40 46" fill="none" stroke="#b4470f" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 44 36 Q 50 32 53 40" fill="none" stroke="#b4470f" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 50 52 Q 56 48 57 56" fill="none" stroke="#b4470f" strokeWidth="2" strokeLinecap="round" />
          <path d="M 28 60 Q 32 64 34 58" fill="none" stroke="#b4470f" strokeWidth="2" strokeLinecap="round" />
          {/* Small round chole bowl */}
          <ellipse cx="82" cy="68" rx="16" ry="10" fill="#8b5c1e" stroke="#14100c" strokeWidth="2.5" />
          <ellipse cx="82" cy="66" rx="13" ry="7.5" fill="#4a1810" stroke="#14100c" strokeWidth="1.5" />
          {/* Visible chickpeas */}
          <circle cx="78" cy="65" r="2.8" fill="#c9a97b" stroke="#14100c" strokeWidth="1.2" />
          <circle cx="85" cy="64" r="2.5" fill="#c9a97b" stroke="#14100c" strokeWidth="1.2" />
          <circle cx="82" cy="68" r="2.5" fill="#c9a97b" stroke="#14100c" strokeWidth="1.2" />
          {/* Butter dot on bhatura */}
          <circle cx="36" cy="56" r="4" fill="#f9c10f" stroke="#14100c" strokeWidth="1.5" />
          {/* Green chilli */}
          <path d="M 78 75 Q 72 72 70 68 Q 72 66 76 69 Q 80 72 80 76 Z" fill="#7fa928" stroke="#14100c" strokeWidth="1.5" />
        </>
      );

    /* ── Shahi Paneer ─────────────────────────────────────────── */
    case "shahi-paneer":
      return (
        <>
          <BadgeRing bg="#1b4db1" ring="#fdf6e8" dots="#f9c10f" />
          {/* Silver serving dish base */}
          <ellipse cx="60" cy="77" rx="32" ry="8" fill="#c0c0c0" stroke="#14100c" strokeWidth="2" />
          {/* Dish bowl */}
          <path d="M 30 70 Q 30 80 60 81 Q 90 80 90 70 L 86 52 Q 86 49 60 48 Q 34 49 34 52 Z"
            fill="#e8e8e8" stroke="#14100c" strokeWidth="2.5" />
          {/* Gravy — rich orange-red */}
          <ellipse cx="60" cy="52" rx="24" ry="7" fill="#e8601c" stroke="#14100c" strokeWidth="2" />
          {/* Tomato cream swirl */}
          <path d="M 44 52 Q 52 46 60 50 Q 68 46 76 52 Q 68 58 60 54 Q 52 58 44 52 Z"
            fill="none" stroke="#fdf6e8" strokeWidth="2" strokeLinecap="round" />
          {/* Paneer cubes */}
          <rect x="48" y="46" width="9" height="9" transform="rotate(15 52 50)" fill="#fdf6e8" stroke="#14100c" strokeWidth="2" />
          <rect x="60" y="46" width="8" height="8" transform="rotate(-20 64 50)" fill="#fdf6e8" stroke="#14100c" strokeWidth="2" />
          <rect x="54" y="51" width="9" height="9" transform="rotate(35 58 55)" fill="#fdf6e8" stroke="#14100c" strokeWidth="2" />
          {/* Cream drizzle */}
          <path d="M 38 54 Q 44 48 48 54 Q 52 60 48 64" fill="none" stroke="#ffdf8c" strokeWidth="2" strokeLinecap="round" />
          {/* Kasuri methi dots */}
          {[[56,48],[67,49],[62,54],[54,56]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="1" fill="#7fa928" />
          ))}
        </>
      );

    /* ── Pav Bhaji ────────────────────────────────────────────── */
    case "pav-bhaji":
      return (
        <>
          <BadgeRing bg="#d5231a" ring="#fdf6e8" dots="#ffc740" />
          {/* Iron tawa (round griddle) */}
          <ellipse cx="60" cy="74" rx="35" ry="11" fill="#3a3028" stroke="#14100c" strokeWidth="3" />
          <ellipse cx="60" cy="70" rx="33" ry="9" fill="#2a2018" stroke="#14100c" strokeWidth="2" />
          {/* Bhaji mound — deep red-brown */}
          <path d="M 30 68 Q 32 54 45 51 Q 60 48 72 53 Q 80 58 78 68 Z"
            fill="#8b2515" stroke="#14100c" strokeWidth="2.5" />
          {/* Bhaji texture */}
          <path d="M 36 65 Q 50 59 65 63" fill="none" stroke="#6f1a10" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 38 68 Q 53 62 68 66" fill="none" stroke="#6f1a10" strokeWidth="1.5" strokeLinecap="round" />
          {/* Melting butter (bright gold blob) */}
          <path d="M 52 52 Q 60 46 68 52 Q 66 57 60 56 Q 54 55 52 52 Z" fill="#f9c10f" stroke="#14100c" strokeWidth="1.8" />
          {/* Pav buns — two golden rounds on the side */}
          <rect x="72" y="58" width="17" height="16" rx="3" fill="#ffc740" stroke="#14100c" strokeWidth="2.5" />
          <path d="M 72 64 L 89 64" stroke="#14100c" strokeWidth="1.5" />
          {/* Top bun fried brown */}
          <path d="M 73 59 Q 80 56 88 59 Q 88 64 80 65 Q 73 64 73 59 Z" fill="#b4470f" stroke="#14100c" strokeWidth="1.2" />
          {/* Lemon half */}
          <path d="M 30 70 Q 26 66 28 63 Q 32 61 35 65 Q 34 69 30 70 Z" fill="#f9c10f" stroke="#14100c" strokeWidth="1.5" />
          <path d="M 29 66 L 34 65" stroke="#14100c" strokeWidth="0.8" />
        </>
      );

    /* ── Sambhar ─────────────────────────────────────────────── */
    case "sambhar":
      return (
        <>
          <BadgeRing bg="#0e3b2c" ring="#ffc740" dots="#ffc740" />
          {/* Clay pot / earthenware vessel */}
          <path d="M 36 75 Q 34 80 60 82 Q 86 80 84 75 L 80 50 Q 77 44 60 43 Q 43 44 40 50 Z"
            fill="#b4470f" stroke="#14100c" strokeWidth="2.5" />
          {/* Pot band decoration */}
          <path d="M 40 58 Q 60 62 80 58" fill="none" stroke="#ffc740" strokeWidth="2" strokeLinecap="round" />
          {/* Tamarind broth surface */}
          <ellipse cx="60" cy="50" rx="20" ry="6.5" fill="#7a2a10" stroke="#14100c" strokeWidth="2" />
          {/* Drumstick piece */}
          <path d="M 46 47 Q 52 42 60 46 Q 57 52 51 51 Q 46 50 46 47 Z"
            fill="#7fa928" stroke="#14100c" strokeWidth="2" />
          <path d="M 52 42 L 52 39 M 55 42 L 55 38 M 58 43 L 58 40" stroke="#7fa928" strokeWidth="1.5" strokeLinecap="round" />
          {/* Shallots */}
          <ellipse cx="68" cy="48" rx="4.5" ry="3.5" fill="#e11d74" stroke="#14100c" strokeWidth="1.8" />
          {/* Curry leaves floating */}
          <path d="M 53 55 Q 56 51 58 55 Q 56 57 53 55 Z" fill="#7fa928" stroke="#14100c" strokeWidth="1" />
          <path d="M 62 52 Q 65 48 67 52 Q 65 54 62 52 Z" fill="#7fa928" stroke="#14100c" strokeWidth="1" />
          {/* Mustard seed scatter */}
          {[[48,54],[55,56],[63,55],[70,54],[57,51]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="1.2" fill="#14100c" />
          ))}
          {/* Tadka oil ring on surface */}
          <ellipse cx="60" cy="50" rx="18" ry="5.5" fill="none" stroke="#e8601c" strokeWidth="1.5" strokeDasharray="3 2" />
        </>
      );

    /* ── Kadhi Pakora ─────────────────────────────────────────── */
    case "kadhi-pakora":
      return (
        <>
          <BadgeRing bg="#4b5d22" ring="#ffc740" dots="#ffc740" />
          {/* Kadai (wok) silhouette */}
          <path d="M 25 72 Q 24 82 60 83 Q 96 82 95 72 L 88 50 Q 84 42 60 41 Q 36 42 32 50 Z"
            fill="#6f1a10" stroke="#14100c" strokeWidth="3" />
          {/* Handles */}
          <path d="M 25 60 Q 18 58 20 52 Q 22 48 28 52" fill="none" stroke="#14100c" strokeWidth="3" strokeLinecap="round" />
          <path d="M 95 60 Q 102 58 100 52 Q 98 48 92 52" fill="none" stroke="#14100c" strokeWidth="3" strokeLinecap="round" />
          {/* Yellow kadhi */}
          <ellipse cx="60" cy="50" rx="26" ry="8" fill="#f9c10f" stroke="#14100c" strokeWidth="2" />
          {/* Pakoras — golden puffed balls */}
          <circle cx="48" cy="47" r="6" fill="#ffc740" stroke="#14100c" strokeWidth="2.5" />
          <circle cx="62" cy="45" r="6.5" fill="#ffc740" stroke="#14100c" strokeWidth="2.5" />
          <circle cx="74" cy="47" r="5.5" fill="#ffc740" stroke="#14100c" strokeWidth="2.5" />
          {/* Pakora texture dots */}
          <circle cx="47" cy="46" r="1.5" fill="#b4470f" />
          <circle cx="50" cy="49" r="1" fill="#b4470f" />
          <circle cx="61" cy="43" r="1.5" fill="#b4470f" />
          <circle cx="64" cy="47" r="1" fill="#b4470f" />
          <circle cx="73" cy="45" r="1.5" fill="#b4470f" />
          {/* Red chilli tadka drizzle */}
          <path d="M 34 54 Q 48 48 62 52 Q 72 55 86 50" fill="none" stroke="#d5231a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Coriander specks */}
          {[[40,58],[55,59],[70,57]].map(([x,y],i)=>(
            <path key={i} d={`M ${x} ${y} Q ${x+2} ${y-3} ${x+4} ${y}`} fill="#7fa928" stroke="#14100c" strokeWidth="0.8" />
          ))}
        </>
      );

    /* ── Baingan Bharta ───────────────────────────────────────── */
    case "baingan-bharta":
      return (
        <>
          <BadgeRing bg="#832577" ring="#fdf6e8" dots="#ffc740" />
          {/* Bowl */}
          <path d="M 32 72 Q 31 81 60 82 Q 89 81 88 72 L 83 52 Q 80 46 60 45 Q 40 46 37 52 Z"
            fill="#3d1a4a" stroke="#14100c" strokeWidth="2.5" />
          {/* Purple bharta surface */}
          <ellipse cx="60" cy="52" rx="22" ry="7" fill="#6b1e8a" stroke="#14100c" strokeWidth="2" />
          {/* Mashed texture — swirling strokes */}
          <path d="M 42 52 Q 52 47 60 51 Q 68 47 78 52 Q 68 57 60 53 Q 52 57 42 52 Z"
            fill="none" stroke="#832577" strokeWidth="2" />
          <path d="M 44 54 Q 56 50 60 53 Q 64 50 76 54" fill="none" stroke="#a030a0" strokeWidth="1.5" strokeLinecap="round" />
          {/* Green peas */}
          {[[46,50],[52,47],[61,48],[69,50],[73,53]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="2.2" fill="#7fa928" stroke="#14100c" strokeWidth="1.2" />
          ))}
          {/* Tomato chunks */}
          <path d="M 55 54 Q 57 51 60 54 Q 58 57 55 54 Z" fill="#d5231a" stroke="#14100c" strokeWidth="1" />
          <path d="M 62 52 Q 64 49 67 52 Q 65 55 62 52 Z" fill="#d5231a" stroke="#14100c" strokeWidth="1" />
          {/* Char marks from roasted brinjal */}
          <path d="M 48 57 Q 51 60 54 57" fill="none" stroke="#14100c" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 60 59 Q 63 62 66 59" fill="none" stroke="#14100c" strokeWidth="1.5" strokeLinecap="round" />
        </>
      );

    /* ── Masala Chai ─────────────────────────────────────────── */
    case "masala-chai":
      return (
        <>
          <BadgeRing bg="#6f1a10" ring="#ffc740" dots="#ffc740" />
          {/* Saucer */}
          <ellipse cx="60" cy="83" rx="30" ry="7" fill="#c9a97b" stroke="#14100c" strokeWidth="2" />
          <ellipse cx="60" cy="81" rx="26" ry="5" fill="#ebdcbd" stroke="#14100c" strokeWidth="1.5" />
          {/* Kulhad body — terracotta, tapered cylinder */}
          <path d="M 38 38 L 36 76 Q 44 82 60 82 Q 76 82 84 76 L 82 38 Z"
            fill="#b4470f" stroke="#14100c" strokeWidth="3" strokeLinejoin="round" />
          {/* Kulhad rim ellipse */}
          <ellipse cx="60" cy="38" rx="22" ry="7" fill="#c9573a" stroke="#14100c" strokeWidth="2.5" />
          {/* Chai surface visible from above */}
          <ellipse cx="60" cy="37" rx="19" ry="5.5" fill="#8b4a1a" />
          {/* Rim highlight */}
          <ellipse cx="60" cy="37" rx="14" ry="3.5" fill="#b06030" />
          {/* Kulhad decorative bands */}
          <path d="M 37 55 Q 60 59 83 55" fill="none" stroke="#d5231a" strokeWidth="2" strokeLinecap="round" />
          <path d="M 37 65 Q 60 69 83 65" fill="none" stroke="#ffc740" strokeWidth="1.5" strokeLinecap="round" />
          {/* Wavy steam lines */}
          <path d="M 48 28 Q 45 20 48 14 Q 51 20 48 28" fill="none" stroke="#fdf6e8" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <path d="M 60 25 Q 57 16 60 10 Q 63 16 60 25" fill="none" stroke="#fdf6e8" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <path d="M 72 28 Q 69 20 72 14 Q 75 20 72 28" fill="none" stroke="#fdf6e8" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          {/* Small elaichi and star spices on saucer */}
          <ellipse cx="35" cy="81" rx="3" ry="2" fill="#7fa928" stroke="#14100c" strokeWidth="1" />
          <path d="M 83 78 L 85 82 L 89 82 L 86 84 L 87 88 L 84 86 L 81 88 L 82 84 L 79 82 L 83 82 Z" fill="#f9c10f" stroke="#14100c" strokeWidth="1" />
        </>
      );

    /* ── Aloo Chaat ────────────────────────────────────────────── */
    case "aloo-chaat":
      return (
        <>
          <BadgeRing bg="#a81246" ring="#fdf6e8" dots="#f9c10f" />
          {/* Dona (leaf bowl) — traditional street food container */}
          <path d="M 24 66 Q 22 78 60 80 Q 98 78 96 66 Q 80 52 60 50 Q 40 52 24 66 Z"
            fill="#7fa928" stroke="#14100c" strokeWidth="2.5" />
          {/* Dona inner shadow */}
          <path d="M 30 68 Q 28 76 60 77 Q 92 76 90 68 Q 74 56 60 54 Q 46 56 30 68 Z"
            fill="#5d8012" />
          {/* Dona leaf lines */}
          <path d="M 60 80 Q 60 54 60 50" stroke="#14100c" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 60 50 Q 44 62 24 66" stroke="#14100c" strokeWidth="1" strokeLinecap="round" />
          <path d="M 60 50 Q 76 62 96 66" stroke="#14100c" strokeWidth="1" strokeLinecap="round" />
          {/* Fried potato cubes */}
          <rect x="37" y="61" width="11" height="11" transform="rotate(15 42 66)" fill="#ffc740" stroke="#14100c" strokeWidth="2" />
          <rect x="50" y="56" width="12" height="12" transform="rotate(-10 56 62)" fill="#f9c10f" stroke="#14100c" strokeWidth="2" />
          <rect x="64" y="58" width="11" height="11" transform="rotate(25 69 63)" fill="#ffc740" stroke="#14100c" strokeWidth="2" />
          <rect x="45" y="65" width="13" height="12" transform="rotate(5 51 71)" fill="#f9c10f" stroke="#14100c" strokeWidth="2" />
          {/* Green chutney (bright green S-splash) */}
          <path d="M 38 62 Q 43 58 48 63 Q 42 65 38 62 Z" fill="#7fa928" />
          <path d="M 66 58 Q 72 55 74 61 Q 68 62 66 58 Z" fill="#7fa928" />
          {/* Tamarind drizzle (dark red) */}
          <path d="M 46 61 Q 56 55 66 62" fill="none" stroke="#6f1a10" strokeWidth="2.5" strokeLinecap="round" />
          {/* Onion slice rings */}
          <ellipse cx="40" cy="70" rx="3.5" ry="2" fill="none" stroke="#fdf6e8" strokeWidth="1.5" />
          <ellipse cx="76" cy="68" rx="3" ry="2" fill="none" stroke="#fdf6e8" strokeWidth="1.5" />
        </>
      );

    /* ── Jeera Aloo ────────────────────────────────────────────── */
    case "jeera-aloo":
      return (
        <>
          <BadgeRing bg="#1b4db1" ring="#fdf6e8" dots="#f9c10f" />
          {/* Flat pan/tawa */}
          <ellipse cx="60" cy="74" rx="34" ry="10" fill="#3a3028" stroke="#14100c" strokeWidth="3" />
          <ellipse cx="60" cy="70" rx="32" ry="8" fill="#2a2018" stroke="#14100c" strokeWidth="2" />
          {/* Ghee sheen on tawa */}
          <ellipse cx="55" cy="69" rx="15" ry="4" fill="#ffdf8c" opacity="0.3" />
          {/* Potato chunks — wedges, various angles */}
          <path d="M 32 66 Q 34 56 44 55 Q 50 55 50 66 Q 42 70 32 66 Z" fill="#ffc740" stroke="#14100c" strokeWidth="2.2" />
          <path d="M 50 62 Q 50 52 60 51 Q 70 52 70 62 Q 60 66 50 62 Z" fill="#f9c10f" stroke="#14100c" strokeWidth="2.2" />
          <path d="M 70 65 Q 70 56 80 55 Q 88 56 86 66 Q 78 70 70 65 Z" fill="#ffc740" stroke="#14100c" strokeWidth="2.2" />
          <path d="M 38 70 Q 38 63 48 62 Q 54 62 53 70 Q 46 73 38 70 Z" fill="#f9c10f" stroke="#14100c" strokeWidth="2.2" />
          <path d="M 55 68 Q 55 61 64 60 Q 72 61 71 68 Q 63 72 55 68 Z" fill="#ffc740" stroke="#14100c" strokeWidth="2.2" />
          {/* Cumin seeds (dark elongated ellipses scattered) */}
          {[
            [36,63,20],[45,58,50],[57,55,80],[67,57,30],[76,62,60],
            [40,67,-15],[52,63,45],[64,64,70],[74,66,15]
          ].map(([x,y,rot],i)=>(
            <ellipse key={i} cx={x} cy={y} rx="2.2" ry="0.9" transform={`rotate(${rot} ${x} ${y})`} fill="#14100c" />
          ))}
          {/* Green coriander dots */}
          {[[34,60],[50,54],[66,56],[80,61],[44,64]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="1.2" fill="#7fa928" />
          ))}
          {/* Gold highlight on potatoes */}
          <path d="M 34 60 Q 37 57 40 60" fill="none" stroke="#ffdf8c" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 52 54 Q 56 52 59 55" fill="none" stroke="#ffdf8c" strokeWidth="1.5" strokeLinecap="round" />
        </>
      );

    /* ── Rajma Chawal ─────────────────────────────────────────── */
    case "rajma-chawal":
      return (
        <>
          <BadgeRing bg="#6f1a10" ring="#ffc740" dots="#ffc740" />
          {/* Two bowls side by side */}
          {/* Rice bowl (left) */}
          <path d="M 24 72 Q 24 80 44 81 Q 60 80 60 72 L 57 54 Q 55 49 42 48 Q 28 49 26 54 Z"
            fill="#c9a97b" stroke="#14100c" strokeWidth="2.5" />
          <ellipse cx="42" cy="54" rx="16" ry="5.5" fill="#fdf6e8" stroke="#14100c" strokeWidth="2" />
          {/* Rice texture */}
          {[[36,53],[40,51],[44,52],[48,53],[39,55],[43,54]].map(([x,y],i)=>(
            <ellipse key={i} cx={x} cy={y} rx="2.2" ry="1.2" fill="#fdf6e8" stroke="#e8d9b0" strokeWidth="0.5" transform={`rotate(${i*30} ${x} ${y})`} />
          ))}
          {/* Rajma bowl (right) */}
          <path d="M 60 72 Q 60 80 78 81 Q 96 80 96 72 L 93 54 Q 91 49 78 48 Q 64 49 62 54 Z"
            fill="#8b2515" stroke="#14100c" strokeWidth="2.5" />
          <ellipse cx="78" cy="54" rx="16" ry="5.5" fill="#6f1a10" stroke="#14100c" strokeWidth="2" />
          {/* Kidney beans */}
          <path d="M 69 52 Q 70 48 74 50 Q 74 54 70 54 Q 68 53 69 52 Z" fill="#c9603a" stroke="#14100c" strokeWidth="1.2" />
          <path d="M 75 50 Q 76 46 80 48 Q 80 52 76 52 Q 74 51 75 50 Z" fill="#b8402a" stroke="#14100c" strokeWidth="1.2" />
          <path d="M 80 53 Q 81 49 85 51 Q 85 55 81 55 Q 79 54 80 53 Z" fill="#c9603a" stroke="#14100c" strokeWidth="1.2" />
          {/* Gravy */}
          <path d="M 62 56 Q 78 60 94 56" fill="none" stroke="#d5231a" strokeWidth="1.5" strokeLinecap="round" />
          {/* Ghee dollop on rice */}
          <circle cx="42" cy="52" r="3.5" fill="#ffdf8c" stroke="#14100c" strokeWidth="1.2" />
        </>
      );

    /* ── Default fallback ─────────────────────────────────────── */
    default:
      return (
        <>
          <BadgeRing bg="#fdf6e8" ring="#6f1a10" dots="#ffc740" />
          {/* Spice mortar + pestle */}
          <path d="M 38 75 Q 36 82 60 83 Q 84 82 82 75 L 78 55 Q 75 49 60 48 Q 45 49 42 55 Z"
            fill="#c9a97b" stroke="#14100c" strokeWidth="2.5" />
          <ellipse cx="60" cy="55" rx="18" ry="6" fill="#ebdcbd" stroke="#14100c" strokeWidth="2" />
          {/* Pestle */}
          <rect x="57" y="30" width="6" height="26" rx="3" fill="#6f1a10" stroke="#14100c" strokeWidth="2" />
          <ellipse cx="60" cy="30" rx="6" ry="3.5" fill="#8b2515" stroke="#14100c" strokeWidth="1.5" />
          {/* Spice powder scatter */}
          {[[52,58],[56,60],[62,57],[66,60],[58,63]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="1.5" fill="#ffc740" />
          ))}
        </>
      );
  }
}
