import { ChefHead } from "@/components/chef-face";
import { curl, mound, thumbAt } from "@/lib/svg-shapes";
import { DABBA, totalPinches } from "@/lib/tasting";
import { mix } from "@/lib/color";

/**
 * Chakhne wala — the man, the katori and the spoon.
 *
 * A closer crop of the same character who works the stove in `chef-kitchen`,
 * because this is a tasting, not a cooking. The bowl is the point of the
 * drawing: what you put in it is visible as heaps on the surface, the food
 * takes on the colour of whatever you have overdone, and once you have gone
 * past a chutki it stops looking like food at all.
 *
 * Deterministic throughout — heaps take their position from the spice's index
 * in the dabba, never from the order you clicked, so the drawing is stable
 * across a re-render and identical on the server.
 *
 * Geometry: head centre (260, 118) · shoulders y=249 · katori centre (250, 330)
 */

/* Where each spice piles up. Index matches DABBA, so a spice always lands in
   the same spot no matter what else is in the bowl. */
const HEAP_SLOTS = [
  [-42, -4],
  [-17, -10],
  [8, -12],
  [34, -7],
  [53, 3],
  [-53, 4],
  [-28, 9],
  [3, 11],
  [30, 9],
];

/* Arms leave from the outer edge of the kurta, never from inside it, and the
   control point sits outboard so the elbow reads as bending out rather than
   the whole limb collapsing into the chest. */
const ARMS = {
  /* holding the katori steady by its near rim */
  hold: { d: "M156 252 Q120 300 166 328", elbow: [120, 300], hand: [166, 328], thumb: 1 },
  /* spoon down in the food */
  dip: { d: "M364 252 Q400 296 306 314", elbow: [400, 296], hand: [306, 314], thumb: -1 },
  /* spoon up at his mouth */
  taste: { d: "M364 252 Q404 226 316 194", elbow: [404, 226], hand: [316, 194], thumb: -1 },
};

/** The food's colour after everything you have put in it. */
function surfaceOf(dish, bowl, pinches) {
  let colour = dish.base;
  for (const spice of DABBA) {
    const n = bowl[spice.slug] ?? 0;
    if (n > 0) colour = mix(colour, spice.tint, Math.min(0.42, n * 0.13));
  }
  /* Past a chutki it stops being a colour and starts being sludge. */
  if (pinches >= 9) colour = mix(colour, "#5c4426", 0.35);
  return colour;
}

function Spoon({ at, tasting }) {
  const [hx, hy] = at;
  const tip = tasting ? [hx - 44, hy - 56] : [hx - 54, hy + 8];
  const bowlAt = tasting ? [hx - 50, hy - 64] : [hx - 62, hy + 10];

  return (
    <g>
      <path d={`M${hx - 4} ${hy - 6} L${tip[0]} ${tip[1]}`} stroke="var(--color-ink)" strokeWidth="11" strokeLinecap="round" />
      <path d={`M${hx - 4} ${hy - 6} L${tip[0]} ${tip[1]}`} stroke="var(--color-dune)" strokeWidth="6" strokeLinecap="round" />
      <ellipse
        cx={bowlAt[0]}
        cy={bowlAt[1]}
        rx="15"
        ry="9"
        fill="var(--color-dune)"
        stroke="var(--color-ink)"
        strokeWidth="4"
        transform={`rotate(${tasting ? -34 : -12} ${bowlAt[0]} ${bowlAt[1]})`}
      />
    </g>
  );
}

export default function ChefTasting({
  dish = null,
  bowl = {},
  verdict = null,
  mood = null,
  tasting = false,
  className = "",
  label,
}) {
  const pinches = totalPinches(bowl);
  /* A verdict overrides everything; until then the section decides how wary
     he is looking, from how much has gone in. */
  const face = verdict?.face ?? mood ?? (pinches ? "curious" : "talking");
  const surface = dish ? surfaceOf(dish, bowl, pinches) : "#c9a97b";
  const fistful = pinches >= 9;

  const spoonArm = tasting ? ARMS.taste : ARMS.dip;

  const heaps = DABBA.map((spice, i) => ({ spice, n: bowl[spice.slug] ?? 0, slot: HEAP_SLOTS[i] })).filter(
    (h) => h.n > 0
  );

  const alt =
    label ||
    (dish
      ? `Sunder ji holding a katori of ${dish.name} with ${pinches} ${pinches === 1 ? "pinch" : "pinches"} of masala in it`
      : "Sunder ji waiting with an empty katori");

  return (
    <svg viewBox="0 0 520 420" className={className} role="img" aria-label={alt}>
      {/* ── halo — a painted rosette rather than a plain disc ── */}
      <g>
        <circle cx="260" cy="150" r="152" fill="var(--color-marigold)" opacity="0.09" />
        {Array.from({ length: 24 }, (_, i) => (
          <ellipse
            key={i}
            cx="260"
            cy="26"
            rx="13"
            ry="30"
            fill="var(--color-marigold)"
            opacity="0.16"
            transform={`rotate(${i * 15} 260 150)`}
          />
        ))}
        <circle
          cx="260"
          cy="150"
          r="152"
          fill="none"
          stroke="var(--color-marigold)"
          strokeWidth="3"
          strokeDasharray="9 11"
          opacity="0.35"
        />
      </g>

      {/* ── steam, behind him ── */}
      {dish?.hot && !fistful ? (
        <g stroke="var(--color-ghee)" fill="none" strokeWidth="6" strokeLinecap="round" opacity="0.55">
          <path d={curl(216, 294, 54)} className="anim-k-steam" style={{ "--dur": "3.4s" }} />
          <path d={curl(286, 294, 44)} className="anim-k-steam" style={{ "--dur": "2.8s", "--delay": "0.8s" }} />
        </g>
      ) : null}

      {/* ── Sunder ji ── */}
      <g>
        <rect x="237" y="172" width="46" height="44" rx="12" fill="var(--color-clay)" stroke="var(--color-ink)" strokeWidth="5" />

        {/* kurta */}
        <path
          d="M260 200 C226 200 177 217 157 249 C142 273 137 347 134 420 L386 420 C383 347 378 273 363 249 C343 217 294 200 260 200 Z"
          fill="var(--color-ivory)"
          stroke="var(--color-ink)"
          strokeWidth="5"
        />
        {/* sadri */}
        <path
          d="M205 209 C190 262 185 342 184 420 L134 420 C137 347 142 273 157 249 C169 232 186 218 205 209 Z"
          fill="var(--color-forest)"
          stroke="var(--color-ink)"
          strokeWidth="5"
        />
        <path
          d="M315 209 C330 262 335 342 336 420 L386 420 C383 347 378 273 363 249 C351 232 334 218 315 209 Z"
          fill="var(--color-forest)"
          stroke="var(--color-ink)"
          strokeWidth="5"
        />
        <path d="M260 214 V420" stroke="var(--color-ink)" strokeWidth="3" opacity="0.35" />
        {[252, 292].map((cy) => (
          <circle key={cy} cx="260" cy={cy} r="5" fill="var(--color-marigold)" stroke="var(--color-ink)" strokeWidth="2.5" />
        ))}
        {/* gamcha */}
        <path
          d="M312 205 C340 224 346 270 338 318 L309 313 C317 270 311 228 298 209 Z"
          fill="var(--color-tomato)"
          stroke="var(--color-ink)"
          strokeWidth="4.5"
        />
        <path d="M310 240 h26 M314 274 h26" stroke="var(--color-sun)" strokeWidth="4" strokeLinecap="round" opacity="0.9" />

        <g transform="translate(260 118) scale(1.06) translate(-100 -112)">
          <ChefHead expression={face} />
        </g>
      </g>

      {/* ── the katori ── */}
      <g>
        <path
          d="M172 318 C172 356 200 376 250 376 C300 376 328 356 328 318 Z"
          fill="var(--color-dune)"
          stroke="var(--color-ink)"
          strokeWidth="5"
        />
        <path d="M188 332 C192 352 210 364 232 368" stroke="var(--color-paper)" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />
        <ellipse cx="250" cy="378" rx="30" ry="8" fill="var(--color-clay)" stroke="var(--color-ink)" strokeWidth="4" />
        <ellipse cx="250" cy="318" rx="78" ry="27" fill="var(--color-clay)" stroke="var(--color-ink)" strokeWidth="5" />

        {/* the food */}
        <ellipse cx="250" cy="319" rx="66" ry="21" fill={surface} />

        {/* once it is a fistful the surface disappears under powder */}
        {fistful ? (
          <path d="M188 319 q62 -32 124 0 Z" fill={mix(surface, "#4a3a29", 0.4)} stroke="var(--color-ink)" strokeWidth="3" />
        ) : null}

        {heaps.map(({ spice, n, slot }) => (
          <path
            key={spice.slug}
            d={mound(250 + slot[0], 319 + slot[1], 7 + Math.min(n, 3) * 2.6)}
            fill={spice.tint}
            stroke="var(--color-ink)"
            strokeWidth="2"
            opacity="0.95"
          />
        ))}

        {/* rim redrawn over the food so the bowl still reads as a solid object */}
        <ellipse cx="250" cy="318" rx="78" ry="27" fill="none" stroke="var(--color-ink)" strokeWidth="5" />
        <path d="M186 306 C196 298 218 293 244 293" stroke="var(--color-paper)" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />
      </g>

      {/* ── arms, over the bowl because his hands are on it ── */}
      <g>
        {[ARMS.hold, spoonArm].map((arm, i) => {
          const [hx, hy] = arm.hand;
          const [ex, ey] = arm.elbow;
          const cx = hx + (ex - hx) * 0.24;
          const cy = hy + (ey - hy) * 0.24;
          const angle = (Math.atan2(hy - ey, hx - ex) * 180) / Math.PI;
          const t = thumbAt(hx, hy, 14, arm.thumb);

          return (
            <g key={i} className={i === 1 && tasting ? "anim-k-sip" : ""} style={{ transformOrigin: "348px 258px" }}>
              <path d={arm.d} stroke="var(--color-ink)" strokeWidth="30" fill="none" strokeLinecap="round" />
              <path d={arm.d} stroke="var(--color-ivory)" strokeWidth="22" fill="none" strokeLinecap="round" />
              <rect
                x={cx - 12}
                y={cy - 4.5}
                width="24"
                height="9"
                rx="3"
                fill="var(--color-forest)"
                stroke="var(--color-ink)"
                strokeWidth="3"
                transform={`rotate(${angle} ${cx} ${cy})`}
              />
              <ellipse
                cx={t.cx}
                cy={t.cy}
                rx={t.rx}
                ry={t.ry}
                fill="var(--color-clay)"
                stroke="var(--color-ink)"
                strokeWidth="4"
                transform={`rotate(${t.angle} ${t.cx} ${t.cy})`}
              />
              <ellipse cx={hx} cy={hy} rx="13" ry="14" fill="var(--color-clay)" stroke="var(--color-ink)" strokeWidth="4.5" />
              {i === 1 ? <Spoon at={arm.hand} tasting={tasting} /> : null}
            </g>
          );
        })}
      </g>

    </svg>
  );
}
