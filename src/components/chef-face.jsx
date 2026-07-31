/**
 * Sunder ji — the face.
 *
 * One drawing, many moods. Shared by the taste tester (which reacts to what
 * you put in the bowl), the chef menu (which walks you through a recipe) and
 * the kitchen scene (where the same head sits on a body), so the character is
 * always the same man and only the expression changes.
 *
 * `ChefHead` is the artwork itself, drawn in a 200×210 box with the face
 * centred on (100, 116). It renders no <svg> of its own so a larger scene can
 * drop it in under a transform. `ChefFace` is that head with a frame around
 * it, which is what the two card components want.
 *
 * Anatomy, fixed once so the mouths and the moustache cannot collide again:
 *   safa 10–92 · brow 90 · eyes 106 · nose 98–124 · moustache 119–145
 *   mouth 146–164 · chin 178
 */

/* mouth path + brow offsets + a decoration. Mouths sit BELOW the moustache —
   the old set was drawn straight through it. */
export const FACES = {
  flat: { mouth: "M82 154 h36", brow: [-2, 2], extras: null },
  unimpressed: { mouth: "M82 157 q18 -7 36 0", brow: [-8, 4], extras: null },
  curious: { mouth: "M84 151 q16 11 32 0", brow: [-4, -10], extras: null },
  delighted: { mouth: "M76 147 q24 24 48 0", brow: [-10, -10], extras: "sparkle" },
  dreamy: { mouth: "M84 150 q16 13 32 0", brow: [-8, -8], extras: "aroma" },
  burning: { mouth: "M78 146 q22 28 44 0", brow: [10, 10], extras: "fire" },
  sour: { mouth: "M88 161 q12 -15 24 0", brow: [6, -6], extras: "squint" },
  overwhelmed: { mouth: "M76 147 q24 26 48 0", brow: [12, 12], extras: "fire" },
  /* chef moods */
  talking: { mouth: "M86 150 q14 12 28 0", brow: [-6, -6], extras: null },
  thinking: { mouth: "M88 154 q12 5 24 -3", brow: [-12, 2], extras: null },
  cooking: { mouth: "M84 150 q16 11 32 0", brow: [-6, -8], extras: "aroma" },
  proud: { mouth: "M76 147 q24 23 48 0", brow: [-12, -12], extras: "sparkle" },
  /* at the stove — eyes down on the pan, jaw set */
  focused: { mouth: "M86 155 q14 6 28 -2", brow: [-10, -4], extras: null },
  pleased: { mouth: "M80 149 q20 18 40 0", brow: [-9, -9], extras: "aroma" },
};

/* The turra — the pleated fan that stands up off a Rajasthani safa. */
const FAN = [-34, -17, 0, 17, 34];

export function ChefHead({ expression = "talking", extras = true }) {
  const face = FACES[expression] ?? FACES.talking;
  const wide = expression === "burning" || expression === "overwhelmed";
  const shut = expression === "sour";
  /* At the stove he is looking down into the vessel, not out at you. */
  const down = expression === "focused" || expression === "cooking";
  const pupilY = wide ? 108 : down ? 110 : 106;

  return (
    <>
      {/* Fire sits beside the cheeks, not above — up there the safa covers it. */}
      {extras && face.extras === "fire" ? (
        <g className="anim-float" style={{ "--dur": "1.2s" }}>
          <path d="M16 138c7-15 2-25 2-25 15 8 19 21 17 32Z" fill="var(--color-tomato)" />
          <path d="M184 138c-7-15-2-25-2-25-15 8-19 21-17 32Z" fill="var(--color-tomato)" />
        </g>
      ) : null}

      {extras && face.extras === "aroma" ? (
        <g stroke="var(--color-marigold)" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.8">
          <path d="M24 92q9-11 0-22" className="anim-float" style={{ "--dur": "3s" }} />
          <path d="M176 92q9-11 0-22" className="anim-float" style={{ "--dur": "3.4s", "--delay": "0.3s" }} />
          <path d="M14 116q9-11 0-22" className="anim-float" style={{ "--dur": "2.8s", "--delay": "0.6s" }} />
        </g>
      ) : null}

      {extras && face.extras === "sparkle" ? (
        <g fill="var(--color-marigold)">
          <path d="M24 62 27 74 39 77 27 80 24 92 21 80 9 77 21 74Z" />
          <path d="M178 56 181 66 191 69 181 72 178 82 175 72 165 69 175 66Z" />
        </g>
      ) : null}

      {/* ── the safa ─────────────────────────────────────────────────── */}

      {/* turra — the pleated fan, standing up off the left side */}
      <g>
        {FAN.map((a) => (
          <path
            key={a}
            d="M0 0 L-5 -34 L5 -34 Z"
            transform={`translate(50 46) rotate(${a})`}
            fill="var(--color-marigold)"
            stroke="var(--color-ink)"
            strokeWidth="3"
          />
        ))}
        <circle cx="50" cy="46" r="7" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="3.5" />
      </g>

      {/* shamla — the tail hanging down the back */}
      <path
        d="M160 72 C180 76 188 98 179 120 C174 133 163 135 159 126 C168 109 168 88 157 77 Z"
        fill="var(--color-oxblood)"
        stroke="var(--color-ink)"
        strokeWidth="4.5"
      />
      <path d="M167 88 q8 13 3 28" stroke="var(--color-sun)" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* the wrapped body of the turban — a safa has real bulk, or it reads
          as a headband */}
      <path
        d="M30 96
           C26 54 52 20 90 15
           C120 11 148 22 162 43
           C173 60 176 80 172 96
           C153 77 128 67 100 67
           C72 67 45 78 30 96 Z"
        fill="var(--color-tomato)"
        stroke="var(--color-ink)"
        strokeWidth="5"
      />
      {/* the wraps — each turn of cloth */}
      <g stroke="var(--color-sun)" strokeWidth="4.5" fill="none" strokeLinecap="round">
        <path d="M35 88 C52 71 74 62 100 62 C127 62 152 72 168 88" />
        <path d="M34 72 C52 53 74 43 100 43 C126 43 151 54 168 72" opacity="0.9" />
        <path d="M42 54 C58 38 78 30 100 30 C122 30 143 39 157 54" opacity="0.75" />
      </g>
      {/* the band that sits on the brow */}
      <path
        d="M30 96 C46 77 72 67 100 67 C128 67 154 77 172 96 C154 88 128 81 100 81 C72 81 46 88 30 96 Z"
        fill="var(--color-oxblood)"
        stroke="var(--color-ink)"
        strokeWidth="4"
      />
      {/* kalgi — the brooch at the front */}
      <circle cx="122" cy="72" r="9" fill="var(--color-marigold)" stroke="var(--color-ink)" strokeWidth="3.5" />
      <circle cx="122" cy="72" r="3.5" fill="var(--color-oxblood)" />

      {/* ── head ─────────────────────────────────────────────────────── */}

      {/* ears, with an inner fold rather than plain discs */}
      {[
        { x: 36, s: -1 },
        { x: 164, s: 1 },
      ].map(({ x, s }) => (
        <g key={x}>
          <path
            d={`M${x} 108 c${s * 13} -3 ${s * 19} 9 ${s * 14} 20 c${s * -4} 9 ${s * -13} 11 ${s * -17} 6`}
            fill="var(--color-clay)"
            stroke="var(--color-ink)"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path
            d={`M${x + s * 6} 116 c${s * 6} 0 ${s * 8} 6 ${s * 5} 11`}
            stroke="var(--color-ink)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.55"
          />
        </g>
      ))}

      {/* the face — squarer than an ellipse, with a jaw */}
      <path
        d="M40 104
           C40 76 64 58 100 58
           C136 58 160 76 160 104
           C160 129 148 154 127 166
           C118 171 109 173 100 173
           C91 173 82 171 73 166
           C52 154 40 129 40 104 Z"
        fill="var(--color-clay)"
        stroke="var(--color-ink)"
        strokeWidth="5"
      />

      {/* brows */}
      <path d={`M64 ${92 + face.brow[0]} q15 -9 30 -2`} stroke="var(--color-ink)" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d={`M106 ${90 + face.brow[1]} q15 -7 30 2`} stroke="var(--color-ink)" strokeWidth="7" fill="none" strokeLinecap="round" />

      {/* eyes */}
      {shut ? (
        <>
          <path d="M69 106 q13 9 26 0" stroke="var(--color-ink)" strokeWidth="5.5" fill="none" strokeLinecap="round" />
          <path d="M105 106 q13 9 26 0" stroke="var(--color-ink)" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          {[82, 118].map((cx) => (
            <g key={cx}>
              <ellipse
                cx={cx}
                cy="106"
                rx={wide ? 12 : 9.5}
                ry={wide ? 14 : 11}
                fill="var(--color-paper)"
                stroke="var(--color-ink)"
                strokeWidth="3.5"
              />
              <circle cx={cx} cy={pupilY} r={wide ? 5 : 4.5} fill="var(--color-ink)" />
              <circle cx={cx + 2} cy={pupilY - 2} r="1.5" fill="var(--color-paper)" />
              {/* A weighted upper rim, not a filled lid — filling it shut
                  makes him look half asleep in every mood. */}
              <path
                d={`M${cx - (wide ? 12 : 9.5)} 106 a${wide ? 12 : 9.5} ${wide ? 14 : 11} 0 0 1 ${(wide ? 12 : 9.5) * 2} 0`}
                stroke="var(--color-ink)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          ))}
        </>
      )}

      {/* nose — the thing that was missing. Stops short of the moustache so
          both are legible. */}
      <path
        d="M101 94 C97 105 94 112 94 117 C94 121 98 123 103 121"
        stroke="var(--color-ink)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* moustache — non-negotiable. A handlebar is a band with curled tips,
          not a slab: keep it under 20 units tall or it swallows the face. */}
      <path
        d="M100 133
           C95 129 87 126 79 127
           C70 128 66 132 68 136
           C70 139 76 140 81 138
           C77 141 79 145 84 144
           C90 143 96 139 100 136
           C104 139 110 143 116 144
           C121 145 123 141 119 138
           C124 140 130 139 132 136
           C134 132 130 128 121 127
           C113 126 105 129 100 133 Z"
        fill="var(--color-soot)"
        stroke="var(--color-ink)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* mouth */}
      <path
        d={face.mouth}
        stroke="var(--color-ink)"
        strokeWidth="5"
        fill={wide ? "var(--color-oxblood)" : "none"}
        strokeLinecap="round"
      />
      {wide ? <ellipse cx="100" cy="163" rx="11" ry="7" fill="var(--color-tomato)" /> : null}

      {/* sweat */}
      {extras && face.extras === "fire" ? (
        <g fill="var(--color-sky)">
          <path d="M170 100q7 11 0 15t-7-15Z" className="anim-sprinkle" style={{ "--dur": "1.5s" }} />
          <path d="M30 110q7 11 0 15t-7-15Z" className="anim-sprinkle" style={{ "--dur": "1.7s", "--delay": ".4s" }} />
        </g>
      ) : null}
    </>
  );
}

export default function ChefFace({ expression = "talking", className = "", label }) {
  return (
    <svg
      viewBox="0 0 200 210"
      className={className}
      role="img"
      aria-label={label || `Sunder ji looking ${expression}`}
    >
      <ChefHead expression={expression} />
    </svg>
  );
}
