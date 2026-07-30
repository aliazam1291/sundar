/**
 * Sunder ji — the face.
 *
 * One drawing, many moods. Shared by the taste tester (which reacts to what
 * you put in the bowl) and the chef menu (which walks you through a recipe),
 * so the same character carries both and only the expression changes.
 */

/* mouth path + brow offsets + a decoration */
export const FACES = {
  flat: { mouth: "M78 122 h44", brow: [-2, 2], extras: null },
  unimpressed: { mouth: "M78 124 q22 -6 44 0", brow: [-8, 4], extras: null },
  curious: { mouth: "M80 120 q20 12 40 0", brow: [-4, -10], extras: null },
  delighted: { mouth: "M72 114 q28 30 56 0", brow: [-10, -10], extras: "sparkle" },
  dreamy: { mouth: "M80 118 q20 16 40 0", brow: [-8, -8], extras: "aroma" },
  burning: { mouth: "M76 112 q24 34 48 0", brow: [10, 10], extras: "fire" },
  sour: { mouth: "M84 128 q16 -16 32 0", brow: [6, -6], extras: "squint" },
  overwhelmed: { mouth: "M74 116 q26 26 52 0", brow: [12, 12], extras: "fire" },
  /* chef moods */
  talking: { mouth: "M82 118 q18 14 36 0", brow: [-6, -6], extras: null },
  thinking: { mouth: "M84 122 q16 4 32 -2", brow: [-12, 2], extras: null },
  cooking: { mouth: "M80 118 q20 12 40 0", brow: [-6, -8], extras: "aroma" },
  proud: { mouth: "M72 114 q28 28 56 0", brow: [-12, -12], extras: "sparkle" },
};

export default function ChefFace({ expression = "talking", className = "", label }) {
  const face = FACES[expression] ?? FACES.talking;
  const wide = expression === "burning" || expression === "overwhelmed";
  const shut = expression === "sour";

  return (
    <svg
      viewBox="0 0 200 210"
      className={className}
      role="img"
      aria-label={label || `Sunder ji looking ${expression}`}
    >
      {face.extras === "fire" ? (
        <g className="anim-float" style={{ "--dur": "1.2s" }}>
          <path d="M56 44c6-12 2-20 2-20 12 6 16 16 14 26Z" fill="var(--color-tomato)" />
          <path d="M144 44c-6-12-2-20-2-20-12 6-16 16-14 26Z" fill="var(--color-tomato)" />
        </g>
      ) : null}

      {face.extras === "aroma" ? (
        <g stroke="var(--color-marigold)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.75">
          <path d="M62 42q8-10 0-20" className="anim-float" style={{ "--dur": "3s" }} />
          <path d="M100 34q8-10 0-20" className="anim-float" style={{ "--dur": "3.4s", "--delay": "0.3s" }} />
          <path d="M138 42q8-10 0-20" className="anim-float" style={{ "--dur": "2.8s", "--delay": "0.6s" }} />
        </g>
      ) : null}

      {face.extras === "sparkle" ? (
        <g fill="var(--color-marigold)">
          <path d="M48 40 51 50 61 53 51 56 48 66 45 56 35 53 45 50Z" />
          <path d="M152 34 155 44 165 47 155 50 152 60 149 50 139 47 149 44Z" />
        </g>
      ) : null}

      {/* head + ears */}
      <ellipse cx="100" cy="112" rx="60" ry="64" fill="var(--color-clay)" stroke="var(--color-ink)" strokeWidth="5" />
      <circle cx="40" cy="112" r="10" fill="var(--color-clay)" stroke="var(--color-ink)" strokeWidth="5" />
      <circle cx="160" cy="112" r="10" fill="var(--color-clay)" stroke="var(--color-ink)" strokeWidth="5" />

      {/* pagdi */}
      <path
        d="M42 78c6-32 30-46 58-46s52 14 58 46c-16-12-36-18-58-18s-42 6-58 18Z"
        fill="var(--color-tomato)"
        stroke="var(--color-ink)"
        strokeWidth="5"
      />
      <path d="M96 34c14-6 30-2 40 8" stroke="var(--color-sun)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="100" cy="30" r="8" fill="var(--color-marigold)" stroke="var(--color-ink)" strokeWidth="4" />

      {/* brows */}
      <path d={`M66 ${92 + face.brow[0]} q14 -8 28 -2`} stroke="var(--color-ink)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d={`M106 ${90 + face.brow[1]} q14 -6 28 2`} stroke="var(--color-ink)" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* eyes */}
      {shut ? (
        <>
          <path d="M70 108q12 8 24 0" stroke="var(--color-ink)" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M106 108q12 8 24 0" stroke="var(--color-ink)" strokeWidth="5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="82" cy="106" rx={wide ? 11 : 8} ry={wide ? 13 : 9} fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3.5" />
          <ellipse cx="118" cy="106" rx={wide ? 11 : 8} ry={wide ? 13 : 9} fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3.5" />
          <circle cx="82" cy={wide ? 108 : 107} r="4" fill="var(--color-ink)" />
          <circle cx="118" cy={wide ? 108 : 107} r="4" fill="var(--color-ink)" />
        </>
      )}

      {/* moustache — non-negotiable */}
      <path
        d="M72 128q14-10 28-2 14-8 28 2-12 12-28 6-16 6-28-6Z"
        fill="var(--color-soot)"
        stroke="var(--color-ink)"
        strokeWidth="3"
      />

      {/* mouth */}
      <path d={face.mouth} stroke="var(--color-ink)" strokeWidth="5" fill={wide ? "var(--color-oxblood)" : "none"} strokeLinecap="round" />
      {wide ? <ellipse cx="100" cy="138" rx="10" ry="7" fill="var(--color-tomato)" /> : null}

      {/* sweat */}
      {face.extras === "fire" ? (
        <g fill="var(--color-sky)">
          <path d="M158 88q6 10 0 14t-6-14Z" className="anim-sprinkle" style={{ "--dur": "1.5s" }} />
          <path d="M42 96q6 10 0 14t-6-14Z" className="anim-sprinkle" style={{ "--dur": "1.7s", "--delay": ".4s" }} />
        </g>
      ) : null}
    </svg>
  );
}
