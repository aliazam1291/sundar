import { ChefHead } from "@/components/chef-face";
import { COOK_ACTIONS } from "@/lib/recipes";
import { curl, thumbAt, tongue } from "@/lib/svg-shapes";

/**
 * Sunder ji's rasoi — the whole man, at the whole stove.
 *
 * One drawn kitchen that actually performs the recipe: the vessel on the
 * chulha changes with the step, the flame comes up for a tadka and down for
 * plating, steam and sparks come and go, and the chalkboard on the wall shows
 * the method with the current step ringed.
 *
 * Everything is deterministic — no Math.random anywhere — because this renders
 * on the server first and any jitter would tear the hydration.
 *
 * Geometry, written down once so nothing drifts:
 *   wall 0–322 · slab surface 322–370 · slab face 370–412
 *   burner top y=288 · flames burn in the 252–286 gap · vessel centre x=440
 *   chef centre x=195, cut off by the slab at y=322
 */

/* ── the nine scenes ──────────────────────────────────────────────────── */

/* `vy` is the surface the food is at — steam, sparks and bubbles all take
   their origin from it, so a scene only ever states it once. */
const SCENES = {
  prep: { vessel: "kadhai", idle: true, flame: "low", prop: "board", arm: "board", support: "hold", tool: "knife", motion: "anim-k-chop", vy: 198, steam: 0, spark: 0, dust: false, face: "focused" },
  temper: { vessel: "none", flame: "high", prop: "board", arm: "stove", support: "rest", tool: "pan", motion: "anim-k-shake", vy: 234, sparkDx: 28, steam: 1, spark: 7, dust: false, face: "focused" },
  fry: { vessel: "kadhai", flame: "high", prop: "board", arm: "stove", support: "rest", tool: "ladle", motion: "anim-k-stir", vy: 198, steam: 2, spark: 4, dust: false, face: "cooking" },
  boil: { vessel: "cooker", flame: "mid", prop: "board", arm: "rest", support: "rest", tool: "none", motion: "", vy: 214, steam: 0, spark: 0, dust: false, face: "thinking" },
  stir: { vessel: "kadhai", flame: "mid", prop: "board", arm: "stove", support: "rest", tool: "ladle", motion: "anim-k-stir", vy: 198, steam: 3, spark: 0, dust: false, face: "cooking" },
  mash: { vessel: "tawa", flame: "mid", prop: "board", arm: "stove", support: "rest", tool: "masher", motion: "anim-k-mash", vy: 234, steam: 2, spark: 0, dust: false, face: "focused" },
  sprinkle: { vessel: "kadhai", flame: "mid", prop: "board", arm: "raised", support: "rest", tool: "pinch", motion: "anim-k-pinch", vy: 198, steam: 2, spark: 2, dust: true, face: "cooking" },
  pour: { vessel: "kadhai", flame: "mid", prop: "board", arm: "tip", support: "rest", tool: "tipping", motion: "", vy: 198, steam: 3, spark: 3, dust: false, face: "focused" },
  serve: { vessel: "kadhai", idle: true, flame: "low", prop: "thali", arm: "offer", support: "hold", tool: "none", motion: "anim-k-present", vy: 198, steam: 1, spark: 0, dust: false, face: "proud" },
  idle: { vessel: "kadhai", idle: true, flame: "low", prop: "board", arm: "rest", support: "rest", tool: "none", motion: "", vy: 198, steam: 1, spark: 0, dust: false, face: "talking" },
};

/* Arm poses. Quadratic curves, not corners — a two-segment polyline reads as
   a broken elbow at this stroke weight. The control point is the elbow: the
   working arm hangs off (282, 224), the supporting one off (108, 224). */
const ARMS = {
  stove: { d: "M282 224 Q326 272 366 228", elbow: [326, 272], hand: [366, 228] },
  board: { d: "M282 224 Q302 300 250 326", elbow: [302, 300], hand: [250, 326] },
  raised: { d: "M282 224 Q344 236 404 168", elbow: [344, 236], hand: [404, 168] },
  tip: { d: "M282 224 Q352 214 378 140", elbow: [352, 214], hand: [378, 140] },
  rest: { d: "M282 224 Q322 284 304 328", elbow: [322, 284], hand: [304, 328] },
  offer: { d: "M282 224 Q304 294 258 316", elbow: [304, 294], hand: [258, 316] },
};

const SUPPORT = {
  rest: { d: "M108 224 Q78 276 106 326", elbow: [78, 276], hand: [106, 326] },
  hold: { d: "M108 224 Q90 292 154 318", elbow: [90, 292], hand: [154, 318] },
};

const FLAME_H = { low: 24, mid: 30, high: 38 };

/* Fixed jitter tables — hand-picked so the effects look scattered without
   ever asking the platform for a random number. */
const SPARKS = [
  { x: 404, d: 0, r: 3.2, t: -20 },
  { x: 428, d: 0.28, r: 2.4, t: -28 },
  { x: 448, d: 0.13, r: 3.6, t: -23 },
  { x: 466, d: 0.44, r: 2.6, t: -32 },
  { x: 416, d: 0.62, r: 2.9, t: -26 },
  { x: 480, d: 0.36, r: 2.2, t: -18 },
  { x: 440, d: 0.52, r: 3.1, t: -35 },
];

const DUST = [
  { dx: -14, d: 0 },
  { dx: -5, d: 0.16 },
  { dx: 3, d: 0.08 },
  { dx: 11, d: 0.3 },
  { dx: -9, d: 0.42 },
  { dx: 7, d: 0.24 },
  { dx: 0, d: 0.5 },
];

const BUBBLES = [
  { x: 414, d: 0 },
  { x: 434, d: 0.5 },
  { x: 452, d: 0.9 },
  { x: 470, d: 0.3 },
];

/**
 * A scalloped pelmet — the painted valance you get along the top of a hoarding
 * or the back of a lorry. Drawn right-to-left along the bottom edge so the
 * arcs hang down off it.
 */
function valance(width, top, depth, r) {
  let d = `M0 ${top} H${width} V${top + depth}`;
  for (let x = width; x > 0; x -= r * 2) d += ` a${r} ${r} 0 0 1 ${-r * 2} 0`;
  return `${d} Z`;
}

/** A run of hanging half-circles, left to right. */
function scallops(x0, x1, y, r) {
  let d = `M${x0} ${y}`;
  for (let x = x0; x < x1; x += r * 2) d += ` a${r} ${r} 0 0 0 ${r * 2} 0`;
  return d;
}

/* Petal angles for the painted rosettes. */
const PETALS = [0, 45, 90, 135, 180, 225, 270, 315];

/* Marigolds and leaves on the garland over the shrine. */
const GARLAND = [12, 20, 33, 50, 67, 80, 88];

/* Masala jars on the shelf */
const JARS = [
  { x: 20, fill: "var(--color-turmeric)", cap: "var(--color-tomato)" },
  { x: 58, fill: "var(--color-chilli)", cap: "var(--color-forest-3)" },
  { x: 96, fill: "var(--color-moss)", cap: "var(--color-cobalt)" },
];

/* ── vessels ──────────────────────────────────────────────────────────── */

function Kadhai({ idle }) {
  return (
    <g>
      <path
        d="M368 200 C368 234 396 252 440 252 C484 252 512 234 512 200 Z"
        fill="var(--color-soot)"
        stroke="var(--color-ink)"
        strokeWidth="5"
      />
      <path d="M382 214 C386 232 404 242 424 244" stroke="var(--color-olive)" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />
      <ellipse cx="440" cy="200" rx="72" ry="13" fill="var(--color-sepia)" stroke="var(--color-ink)" strokeWidth="5" />
      <ellipse cx="440" cy="201" rx="60" ry="9" fill={idle ? "var(--color-brown)" : "var(--color-carrot)"} />
      <ellipse cx="424" cy="199" rx="13" ry="4.5" fill="var(--color-sunset)" opacity="0.85" />
      <ellipse cx="460" cy="203" rx="9" ry="3.5" fill="var(--color-tomato)" opacity="0.8" />
      {[360, 520].map((cx) => (
        <circle key={cx} cx={cx} cy="197" r="10" fill="none" stroke="var(--color-ink)" strokeWidth="5" />
      ))}
    </g>
  );
}

function Tawa() {
  return (
    <g>
      <ellipse cx="440" cy="250" rx="102" ry="21" fill="var(--color-ink)" />
      <ellipse cx="440" cy="240" rx="102" ry="21" fill="var(--color-soot)" stroke="var(--color-ink)" strokeWidth="5" />
      <ellipse cx="440" cy="240" rx="84" ry="15" fill="var(--color-tomato)" />
      <ellipse cx="418" cy="237" rx="18" ry="6" fill="var(--color-carrot)" opacity="0.9" />
      <ellipse cx="462" cy="243" rx="13" ry="5" fill="var(--color-oxblood)" opacity="0.8" />
      <path d="M542 240 h40" stroke="var(--color-ink)" strokeWidth="10" strokeLinecap="round" />
      <path d="M542 240 h40" stroke="var(--color-brown)" strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

function Cooker() {
  return (
    <g>
      <rect x="388" y="192" width="104" height="60" rx="9" fill="var(--color-olive)" stroke="var(--color-ink)" strokeWidth="5" />
      <path d="M400 208 v32" stroke="var(--color-dune)" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
      <ellipse cx="440" cy="192" rx="57" ry="14" fill="var(--color-dune)" stroke="var(--color-ink)" strokeWidth="5" />
      <rect x="492" y="200" width="44" height="15" rx="7" fill="var(--color-soot)" stroke="var(--color-ink)" strokeWidth="4" />
      {/* the weight, going round */}
      <g className="anim-k-weight" style={{ transformOrigin: "440px 184px" }}>
        <rect x="430" y="172" width="20" height="13" rx="3" fill="var(--color-soot)" stroke="var(--color-ink)" strokeWidth="4" />
        <circle cx="440" cy="168" r="6" fill="var(--color-marigold)" stroke="var(--color-ink)" strokeWidth="3.5" />
      </g>
      {/* the jet — clipped like all the other steam so it never drifts up
          over the recipe board */}
      <g clipPath="url(#k-steamclip)" stroke="var(--color-paper)" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7">
        <path d={curl(440, 162, 36)} className="anim-k-steam" style={{ "--dur": "2.4s" }} />
        <path d={curl(458, 166, 28)} className="anim-k-steam" style={{ "--dur": "2.9s", "--delay": "0.5s" }} />
      </g>
    </g>
  );
}

/**
 * The little long-handled pan a tadka is actually made in. Drawn from the
 * hand outwards so it stays in his grip in both poses; tipping shortens the
 * reach and rolls it over the kadhai.
 */
function TadkaPan({ at, tipping }) {
  const [hx, hy] = at;
  const reach = tipping ? 58 : 76;
  const drop = tipping ? 6 : 12;
  const cx = hx + reach;
  const cy = hy + drop;

  return (
    <g
      transform={tipping ? `rotate(24 ${hx} ${hy})` : undefined}
      className={tipping ? "" : "anim-k-shake"}
      style={tipping ? undefined : { transformOrigin: `${cx}px ${cy}px` }}
    >
      <path
        d={`M${cx - 36} ${cy} C${cx - 36} ${cy + 15} ${cx - 24} ${cy + 22} ${cx} ${cy + 22} C${cx + 24} ${cy + 22} ${cx + 36} ${cy + 15} ${cx + 36} ${cy} Z`}
        fill="var(--color-soot)"
        stroke="var(--color-ink)"
        strokeWidth="5"
      />
      <ellipse cx={cx} cy={cy} rx="36" ry="9" fill="var(--color-sepia)" stroke="var(--color-ink)" strokeWidth="4.5" />
      <ellipse cx={cx} cy={cy} rx="27" ry="5.5" fill="var(--color-marigold)" />
      <path d={`M${cx - 36} ${cy - 2} L${hx - 4} ${hy - 6}`} stroke="var(--color-ink)" strokeWidth="11" strokeLinecap="round" />
      <path d={`M${cx - 36} ${cy - 2} L${hx - 4} ${hy - 6}`} stroke="var(--color-brown)" strokeWidth="6" strokeLinecap="round" />
    </g>
  );
}

/* ── props, out on the front of the slab ──────────────────────────────── */

function ChoppingBoard({ chopping }) {
  return (
    <g>
      <rect x="118" y="334" width="214" height="24" rx="8" fill="var(--color-brown)" stroke="var(--color-ink)" strokeWidth="4.5" />
      <rect x="118" y="334" width="214" height="8" rx="4" fill="var(--color-terracotta)" opacity="0.6" />
      {/* onion rings and a tomato half */}
      {[152, 176, 200].map((cx, i) => (
        <g key={cx}>
          <ellipse cx={cx} cy="332" rx="13" ry="5" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3" />
          {i === 1 ? <ellipse cx={cx} cy="332" rx="5" ry="2" fill="var(--color-violet)" opacity="0.5" /> : null}
        </g>
      ))}
      <circle cx="298" cy="328" r="12" fill="var(--color-tomato)" stroke="var(--color-ink)" strokeWidth="3.5" />
      <circle cx="298" cy="328" r="5" fill="var(--color-sunset)" />
      {chopping ? (
        <g fill="var(--color-kiwi)" className="anim-k-chip">
          <rect x="228" y="318" width="7" height="7" rx="1.5" />
          <rect x="266" y="322" width="6" height="6" rx="1.5" transform="rotate(24 269 325)" />
        </g>
      ) : null}
    </g>
  );
}

function Thali() {
  return (
    <g>
      <ellipse cx="228" cy="352" rx="104" ry="27" fill="var(--color-ink)" opacity="0.25" />
      <ellipse cx="228" cy="346" rx="102" ry="26" fill="var(--color-dune)" stroke="var(--color-ink)" strokeWidth="5" />
      <ellipse cx="228" cy="345" rx="85" ry="20" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3" />
      {/* katoris on the thali */}
      <ellipse cx="184" cy="338" rx="22" ry="9" fill="var(--color-carrot)" stroke="var(--color-ink)" strokeWidth="3.5" />
      <ellipse cx="240" cy="336" rx="20" ry="8" fill="var(--color-moss)" stroke="var(--color-ink)" strokeWidth="3.5" />
      <ellipse cx="284" cy="345" rx="18" ry="7" fill="var(--color-oxblood)" stroke="var(--color-ink)" strokeWidth="3.5" />
      {/* two rotis */}
      <ellipse cx="206" cy="355" rx="28" ry="10" fill="var(--color-ghee)" stroke="var(--color-ink)" strokeWidth="3.5" />
      <ellipse cx="206" cy="353" rx="9" ry="3" fill="var(--color-clay)" opacity="0.7" />
      <g stroke="var(--color-marigold)" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85">
        <path d={curl(228, 322, 32)} className="anim-k-steam" style={{ "--dur": "3.1s" }} />
      </g>
    </g>
  );
}

/**
 * A sleeve, a cuff and a hand.
 *
 * The cuff is placed a fixed fraction of the way back from the wrist toward
 * the elbow (the quadratic's control point), which is enough to read as a
 * kurta sleeve ending rather than an arm dissolving into a blob.
 */
function Arm({ pose, thumb }) {
  const [hx, hy] = pose.hand;
  const [ex, ey] = pose.elbow;
  const cx = hx + (ex - hx) * 0.24;
  const cy = hy + (ey - hy) * 0.24;
  /* The cuff band is drawn long-axis vertical, so it only needs turning by
     the arm's own angle to sit square across the sleeve. */
  const angle = (Math.atan2(hy - ey, hx - ex) * 180) / Math.PI;
  const t = thumbAt(hx, hy, 13, thumb);

  return (
    <g>
      <path d={pose.d} stroke="var(--color-ink)" strokeWidth="28" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={pose.d} stroke="var(--color-ivory)" strokeWidth="20" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect
        x={cx - 11}
        y={cy - 4}
        width="22"
        height="8"
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
      <ellipse cx={hx} cy={hy} rx="12" ry="13" fill="var(--color-clay)" stroke="var(--color-ink)" strokeWidth="4.5" />
    </g>
  );
}

/* ── tools, drawn at the working hand ─────────────────────────────────── */

function Tool({ kind, at }) {
  const [hx, hy] = at;

  if (kind === "ladle") {
    return (
      <g>
        <path d={`M${hx - 6} ${hy - 8} L${hx + 46} ${hy + 6}`} stroke="var(--color-ink)" strokeWidth="10" strokeLinecap="round" />
        <path d={`M${hx - 6} ${hy - 8} L${hx + 46} ${hy + 6}`} stroke="var(--color-olive)" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx={hx + 56} cy={hy + 12} rx="17" ry="9" fill="var(--color-soot)" stroke="var(--color-ink)" strokeWidth="4" transform={`rotate(14 ${hx + 56} ${hy + 12})`} />
      </g>
    );
  }

  if (kind === "masher") {
    /* The head has to land on the tawa surface, not below it. */
    return (
      <g>
        <path d={`M${hx - 2} ${hy - 16} L${hx + 12} ${hy + 8}`} stroke="var(--color-ink)" strokeWidth="10" strokeLinecap="round" />
        <path d={`M${hx - 2} ${hy - 16} L${hx + 12} ${hy + 8}`} stroke="var(--color-brown)" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx={hx + 14} cy={hy + 12} rx="26" ry="8" fill="var(--color-soot)" stroke="var(--color-ink)" strokeWidth="4" />
        <path d={`M${hx - 6} ${hy + 12} h40`} stroke="var(--color-olive)" strokeWidth="3" strokeLinecap="round" />
      </g>
    );
  }

  if (kind === "knife") {
    return (
      /* The grip starts clear of the hand, or it just looks like a knife
         floating out of a sleeve. */
      <g transform={`rotate(10 ${hx} ${hy})`}>
        <rect x={hx + 4} y={hy - 4} width="24" height="11" rx="4" fill="var(--color-brown)" stroke="var(--color-ink)" strokeWidth="3.5" />
        <path d={`M${hx + 28} ${hy - 3} L${hx + 82} ${hy - 1} L${hx + 82} ${hy + 9} L${hx + 28} ${hy + 7} Z`} fill="var(--color-dune)" stroke="var(--color-ink)" strokeWidth="3.5" />
        <path d={`M${hx + 34} ${hy + 1} L${hx + 76} ${hy + 2}`} stroke="var(--color-paper)" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      </g>
    );
  }

  if (kind === "pinch") {
    /* thumb and forefinger together, holding a chutki of masala */
    return (
      <g>
        <path d={`M${hx - 3} ${hy + 2} q8 12 3 20`} stroke="var(--color-clay)" strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d={`M${hx - 3} ${hy + 2} q8 12 3 20`} stroke="var(--color-ink)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
        <circle cx={hx} cy={hy + 24} r="4" fill="var(--color-chilli)" />
      </g>
    );
  }

  return null;
}

/* ── the scene ────────────────────────────────────────────────────────── */

export default function ChefKitchen({
  action = "idle",
  recipe = null,
  step = -1,
  className = "",
  label,
}) {
  const scene = SCENES[action] ?? SCENES.idle;
  const arm = ARMS[scene.arm] ?? ARMS.rest;
  const support = SUPPORT[scene.support] ?? SUPPORT.rest;
  const flameH = FLAME_H[scene.flame];
  const hot = scene.flame !== "low";

  const boardSteps = recipe?.steps ?? [];
  const alt =
    label ||
    (recipe
      ? `Sunder ji ${COOK_ACTIONS[action]?.verb ?? "cooking"} ${recipe.title} at his stove`
      : "Sunder ji waiting at his stove");

  return (
    <svg viewBox="0 0 640 412" className={className} role="img" aria-label={alt}>
      <defs>
        <pattern id="k-tile" width="46" height="46" patternUnits="userSpaceOnUse">
          <path d="M46 0 H0 V46" fill="none" stroke="var(--color-clay)" strokeWidth="2" opacity="0.55" />
        </pattern>
        <pattern id="k-splash" width="34" height="34" patternUnits="userSpaceOnUse">
          <rect width="34" height="34" fill="var(--color-sky)" />
          <path d="M34 0 H0 V34" fill="none" stroke="var(--color-paper)" strokeWidth="2.5" opacity="0.7" />
        </pattern>
        <pattern id="k-slab" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="var(--color-cobalt)" />
          <path d="M40 0 H0 V40" fill="none" stroke="var(--color-sky)" strokeWidth="2.5" opacity="0.45" />
        </pattern>
        {/* steam lives between the board and the vessel, and nowhere else */}
        <clipPath id="k-steamclip">
          <rect x="320" y="144" width="300" height="160" />
        </clipPath>
      </defs>

      {/* ── wall ── */}
      <rect x="0" y="0" width="640" height="322" fill="var(--color-sand)" />
      <rect x="0" y="0" width="640" height="322" fill="url(#k-tile)" />

      {/* painted pelmet along the top of the wall — the hoarding-painter's
          valance, which is what stops the room reading as generic flat vector */}
      <g>
        <path d={valance(640, 0, 15, 16)} fill="var(--color-oxblood)" stroke="var(--color-ink)" strokeWidth="4" />
        {Array.from({ length: 20 }, (_, i) => (
          <circle key={i} cx={16 + i * 32} cy="24" r="3.5" fill="var(--color-sun)" />
        ))}
      </g>

      {/* splashback behind the chulha */}
      <rect x="330" y="150" width="290" height="172" fill="url(#k-splash)" stroke="var(--color-ink)" strokeWidth="4" />
      <path
        d={scallops(332, 620, 152, 12)}
        fill="var(--color-marigold)"
        stroke="var(--color-ink)"
        strokeWidth="3"
      />

      {/* ── the recipe board ── */}
      <g>
        <rect x="306" y="32" width="310" height="112" rx="10" fill="var(--color-soot)" stroke="var(--color-ink)" strokeWidth="5" />
        <rect x="315" y="41" width="292" height="94" rx="6" fill="none" stroke="var(--color-marigold)" strokeWidth="2" strokeDasharray="7 6" opacity="0.7" />

        {recipe ? (
          <>
            <text x="461" y="67" textAnchor="middle" className="font-deva" fill="var(--color-sun)" style={{ fontSize: "23px", fontWeight: 700 }}>
              {recipe.hi}
            </text>
            <text x="461" y="86" textAnchor="middle" className="font-poster" fill="var(--color-ghee)" style={{ fontSize: "13px", letterSpacing: "1.6px" }} opacity="0.75">
              {recipe.title}
            </text>

            {/* The chalk row divides the board evenly however many steps the
                method has, so a five-step recipe stays inside the frame. */}
            {boardSteps.map((s, i) => {
              const slot = 288 / boardSteps.length;
              const cx = 316 + slot * (i + 0.5);
              const on = i === step;
              const done = step > i;
              return (
                <g key={i}>
                  {on ? (
                    <rect
                      x={cx - (slot - 6) / 2}
                      y="100"
                      width={slot - 6}
                      height="30"
                      rx="15"
                      fill="var(--color-marigold)"
                      stroke="var(--color-ink)"
                      strokeWidth="3"
                      className="anim-k-glow"
                    />
                  ) : null}
                  <text
                    x={cx}
                    y="120"
                    textAnchor="middle"
                    className="font-deva"
                    fill={on ? "var(--color-ink)" : done ? "var(--color-kiwi)" : "var(--color-ghee)"}
                    opacity={on || done ? 1 : 0.45}
                    style={{ fontSize: boardSteps.length > 4 ? "12.5px" : "15px", fontWeight: 700 }}
                  >
                    {COOK_ACTIONS[s.act]?.hi ?? "—"}
                  </text>
                </g>
              );
            })}
          </>
        ) : (
          <>
            <text x="461" y="80" textAnchor="middle" className="font-deva" fill="var(--color-sun)" style={{ fontSize: "26px", fontWeight: 700 }}>
              आज क्या बनाएँ?
            </text>
            <text x="461" y="112" textAnchor="middle" className="font-poster" fill="var(--color-ghee)" style={{ fontSize: "15px", letterSpacing: "2px" }} opacity="0.8">
              Aaj ka menu
            </text>
          </>
        )}
      </g>

      {/* ── shelf of jars ── */}
      <g>
        {JARS.map((j) => (
          <g key={j.x}>
            <rect x={j.x} y="76" width="30" height="42" rx="5" fill={j.fill} stroke="var(--color-ink)" strokeWidth="4" />
            <rect x={j.x + 4} y="86" width="8" height="22" rx="4" fill="var(--color-paper)" opacity="0.35" />
            <rect x={j.x - 3} y="66" width="36" height="12" rx="4" fill={j.cap} stroke="var(--color-ink)" strokeWidth="4" />
          </g>
        ))}
        <rect x="8" y="118" width="128" height="12" rx="4" fill="var(--color-brown)" stroke="var(--color-ink)" strokeWidth="4" />
        <path d="M24 130 v10 M120 130 v10" stroke="var(--color-ink)" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* ── the taak — an arched shrine niche with a lit diya and a garland
             over it. Every kitchen like this one has one. ── */}
      <g>
        <path
          d="M12 272 V214 A38 38 0 0 1 88 214 V272 Z"
          fill="var(--color-oxblood)"
          stroke="var(--color-ink)"
          strokeWidth="4.5"
        />
        <path
          d="M22 266 V215 A28 28 0 0 1 78 215 V266 Z"
          fill="var(--color-marigold)"
          stroke="var(--color-ink)"
          strokeWidth="3"
        />
        {/* diya, and its flame */}
        <path d="M34 254 h32 a16 8 0 0 1 -32 0 Z" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="3" />
        <path
          d={tongue(50, 252, 6, 20)}
          fill="var(--color-sun)"
          stroke="var(--color-ink)"
          strokeWidth="2.5"
          className="anim-k-flame"
          style={{ transformOrigin: "50px 252px" }}
        />
        {/* a painted sun behind it */}
        <circle cx="50" cy="212" r="15" fill="var(--color-tomato)" stroke="var(--color-ink)" strokeWidth="3" />
        {PETALS.map((a) => (
          <rect
            key={a}
            x="48.5"
            y="190"
            width="3"
            height="8"
            rx="1.5"
            fill="var(--color-oxblood)"
            transform={`rotate(${a} 50 212)`}
          />
        ))}
        {/* marigold garland draped over the arch */}
        <path d="M6 214 A44 44 0 0 1 94 214" fill="none" stroke="var(--color-moss)" strokeWidth="3" />
        {GARLAND.map((x) => {
          const t = (x - 6) / 88;
          const cy = 214 - Math.sin(t * Math.PI) * 40;
          return (
            <circle key={x} cx={x} cy={cy} r="6" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="2.5" />
          );
        })}
      </g>

      {/* ── steam, rising behind the vessel ── */}
      {scene.steam > 0 ? (
        <g clipPath="url(#k-steamclip)" stroke="var(--color-paper)" fill="none" strokeWidth="6" strokeLinecap="round" opacity="0.7">
          {[
            { x: 410, h: 60, dur: "3.2s", delay: "0s" },
            { x: 442, h: 74, dur: "2.6s", delay: "0.6s" },
            { x: 474, h: 56, dur: "3.6s", delay: "1.1s" },
          ]
            .slice(0, scene.steam)
            .map((s) => (
              <path
                key={s.x}
                d={curl(s.x, scene.vy, s.h)}
                className="anim-k-steam"
                style={{ "--dur": s.dur, "--delay": s.delay }}
              />
            ))}
        </g>
      ) : null}

      {/* ── chulha + flame ── */}
      <g>
        <rect x="356" y="288" width="168" height="44" rx="8" fill="var(--color-soot)" stroke="var(--color-ink)" strokeWidth="5" />
        <circle cx="378" cy="310" r="9" fill="var(--color-tomato)" stroke="var(--color-ink)" strokeWidth="3.5" />
        {/* rosettes painted on the stove front, the way a lorry cab is */}
        {[440, 496].map((rx) => (
          <g key={rx}>
            {PETALS.map((a) => (
              <ellipse
                key={a}
                cx={rx}
                cy="300"
                rx="3.2"
                ry="8"
                fill="var(--color-marigold)"
                opacity="0.85"
                transform={`rotate(${a} ${rx} 310)`}
              />
            ))}
            <circle cx={rx} cy="310" r="4" fill="var(--color-tomato)" />
          </g>
        ))}
        <ellipse cx="440" cy="288" rx="50" ry="11" fill="var(--color-ink)" />
        <ellipse cx="440" cy="286" rx="38" ry="7" fill="var(--color-charcoal)" />

        {/* the fire */}
        <g>
          {[
            { cx: 400, w: 10, s: 0.6, d: "0.21s" },
            { cx: 414, w: 12, s: 0.8, d: "0s" },
            { cx: 428, w: 14, s: 0.96, d: "0.18s" },
            { cx: 444, w: 15, s: 1, d: "0.36s" },
            { cx: 460, w: 13, s: 0.9, d: "0.1s" },
            { cx: 476, w: 11, s: 0.7, d: "0.27s" },
          ].map((f) => (
            <g key={f.cx} className="anim-k-flame" style={{ "--delay": f.d, transformOrigin: `${f.cx}px 286px` }}>
              <path d={tongue(f.cx, 286, f.w, flameH * f.s)} fill="var(--color-carrot)" />
              <path d={tongue(f.cx, 286, f.w * 0.62, flameH * f.s * 0.66)} fill="var(--color-sun)" />
              <path d={tongue(f.cx, 286, f.w * 0.34, flameH * f.s * 0.32)} fill="var(--color-sky)" />
            </g>
          ))}
        </g>
      </g>

      {/* ── the vessel. A tadka has none: the little pan in his hand is it. ── */}
      {scene.vessel === "kadhai" ? <Kadhai idle={scene.idle} /> : null}
      {scene.vessel === "tawa" ? <Tawa /> : null}
      {scene.vessel === "cooker" ? <Cooker /> : null}

      {/* On a big flame the fire licks up round the outside of the vessel —
          but only when there is one, or the tongues hang in mid-air. */}
      {scene.flame === "high" && scene.vessel !== "none" ? (
        <g>
          {[
            { cx: 372, w: 9, h: 30, d: "0.12s" },
            { cx: 508, w: 9, h: 26, d: "0.3s" },
          ].map((f) => (
            <g key={f.cx} className="anim-k-flame" style={{ "--delay": f.d, transformOrigin: `${f.cx}px 250px` }}>
              <path d={tongue(f.cx, 250, f.w, f.h)} fill="var(--color-carrot)" opacity="0.95" />
              <path d={tongue(f.cx, 250, f.w * 0.55, f.h * 0.6)} fill="var(--color-sun)" />
            </g>
          ))}
        </g>
      ) : null}

      {/* bubbles, when something is boiling in it */}
      {action === "boil" || action === "stir" ? (
        <g fill="var(--color-ghee)" opacity="0.8">
          {BUBBLES.map((b) => (
            <circle
              key={b.x}
              cx={b.x}
              cy={scene.vy + 2}
              r="4"
              className="anim-k-bubble"
              style={{ "--delay": `${b.d}s` }}
            />
          ))}
        </g>
      ) : null}

      {/* ── Sunder ji ── */}
      <g>
        {/* neck */}
        <rect x="172" y="172" width="46" height="40" rx="10" fill="var(--color-clay)" stroke="var(--color-ink)" strokeWidth="5" />

        {/* kurta */}
        <path
          d="M195 196
             C168 196 128 206 112 224
             C100 238 96 280 94 322
             L296 322
             C294 280 290 238 278 224
             C262 206 222 196 195 196 Z"
          fill="var(--color-ivory)"
          stroke="var(--color-ink)"
          strokeWidth="5"
        />
        {/* sadri — the waistcoat, wide enough to actually read */}
        <path
          d="M156 202 C146 248 143 292 143 322 L94 322 C96 280 100 238 112 224 C123 213 139 206 156 202 Z"
          fill="var(--color-forest)"
          stroke="var(--color-ink)"
          strokeWidth="5"
        />
        <path
          d="M234 202 C244 248 247 292 247 322 L296 322 C294 280 290 238 278 224 C267 213 251 206 234 202 Z"
          fill="var(--color-forest)"
          stroke="var(--color-ink)"
          strokeWidth="5"
        />
        {/* kurta placket + buttons */}
        <path d="M195 208 V322" stroke="var(--color-ink)" strokeWidth="3" opacity="0.35" />
        {[240, 272, 304].map((cy) => (
          <circle key={cy} cx="195" cy={cy} r="4.5" fill="var(--color-marigold)" stroke="var(--color-ink)" strokeWidth="2.5" />
        ))}
        {/* gamcha over the shoulder */}
        <path
          d="M232 199 C254 214 258 252 252 292 L228 288 C234 250 230 216 220 202 Z"
          fill="var(--color-tomato)"
          stroke="var(--color-ink)"
          strokeWidth="4.5"
        />
        <path d="M228 226 h24 M231 256 h24" stroke="var(--color-sun)" strokeWidth="4" strokeLinecap="round" opacity="0.9" />

        {/* head. The face's own aroma curls are suppressed here — in the
            kitchen the smell comes off the pan, not off his turban. */}
        <g transform="translate(195 122) scale(0.86) translate(-100 -112)">
          <ChefHead expression={scene.face} extras={scene.face === "proud"} />
        </g>
      </g>

      {/* ── the slab ── */}
      <g>
        <rect x="0" y="322" width="640" height="48" fill="var(--color-dune)" />
        <path d="M0 322 H640" stroke="var(--color-ink)" strokeWidth="5" />
        <rect x="0" y="370" width="640" height="42" fill="url(#k-slab)" />
        <path d="M0 370 H640" stroke="var(--color-ink)" strokeWidth="5" />
        {/* bead trim along the slab edge */}
        {Array.from({ length: 27 }, (_, i) => (
          <circle key={i} cx={12 + i * 24} cy="381" r="4" fill="var(--color-sun)" opacity="0.85" />
        ))}
      </g>

      {/* ── things out on the slab ── */}
      <g>
        {/* katoris of masala, always out */}
        <ellipse cx="44" cy="344" rx="28" ry="12" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="4" />
        <ellipse cx="44" cy="341" rx="19" ry="7" fill="var(--color-turmeric)" />
        <ellipse cx="96" cy="356" rx="24" ry="10" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="4" />
        <ellipse cx="96" cy="353" rx="16" ry="6" fill="var(--color-chilli)" />
        {/* a heap of powder straight on the slab */}
        <path d="M556 356 q20 -22 40 0 Z" fill="var(--color-carrot)" stroke="var(--color-ink)" strokeWidth="3.5" />

        {scene.prop === "board" ? <ChoppingBoard chopping={action === "prep"} /> : null}
        {scene.prop === "thali" ? <Thali /> : null}
      </g>

      {/* ── arms, over the slab because his hands work on top of it ── */}
      <g>
        {/* supporting arm */}
        <Arm pose={support} thumb={1} />

        {/* working arm — this is the one that moves */}
        <g className={scene.motion} style={{ transformOrigin: "282px 222px" }}>
          <Arm pose={arm} thumb={-1} />

          {scene.tool === "pan" || scene.tool === "tipping" ? (
            <TadkaPan at={arm.hand} tipping={scene.tool === "tipping"} />
          ) : (
            <Tool kind={scene.tool} at={arm.hand} />
          )}
        </g>
      </g>

      {/* ── effects, on top of the lot ── */}
      {scene.spark > 0 ? (
        <g fill="var(--color-sun)">
          {SPARKS.slice(0, scene.spark).map((s) => (
            <circle
              key={s.x + s.d}
              cx={s.x + (scene.sparkDx ?? 0)}
              cy={scene.vy - 2}
              r={s.r}
              className="anim-k-spark"
              style={{ "--delay": `${s.d}s`, "--rise": `${s.t}px` }}
            />
          ))}
        </g>
      ) : null}

      {scene.dust ? (
        <g fill="var(--color-chilli)">
          {DUST.map((d) => (
            <rect
              key={d.dx + d.d}
              x={arm.hand[0] + d.dx}
              y={arm.hand[1] + 26}
              width="5"
              height="5"
              rx="1.5"
              className="anim-k-dust"
              style={{ "--delay": `${d.d}s` }}
            />
          ))}
        </g>
      ) : null}

      {/* the pour — a ribbon of tadka going into the dal */}
      {action === "pour" ? (
        <g>
          <path
            d="M460 174 C466 184 464 194 459 202"
            stroke="var(--color-marigold)"
            strokeWidth="9"
            fill="none"
            strokeLinecap="round"
            className="anim-k-pour"
          />
          <ellipse cx="459" cy="200" rx="19" ry="6" fill="var(--color-marigold)" opacity="0.55" className="anim-k-glow" />
        </g>
      ) : null}
    </svg>
  );
}
