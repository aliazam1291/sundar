/**
 * The Sunder lockup — vector rebuild of the registered mark:
 * a red ribbon sweeping up to a swallowtail, SUNDER in white,
 * the four family figures walking the top edge.
 *
 * `brand` recolours the ribbon so the mark can sit on the forest
 * and reel sections without a white card behind it.
 */

/* cx · scale — child, father, mother, child, hand in hand */
const FAMILY = [
  { cx: 108, s: 0.6, raise: true },
  { cx: 143, s: 1 },
  { cx: 180, s: 0.9 },
  { cx: 212, s: 0.55 },
];

const BASE = 120; // ground line the family stands on

function Figure({ cx, s, raise }) {
  const head = BASE - 46 * s;
  const shoulder = BASE - 30 * s;
  return (
    <g>
      <circle cx={cx} cy={head} r={9 * s} />
      <path
        d={`M${cx - 13 * s} ${BASE}
            C${cx - 13 * s} ${BASE - 30 * s} ${cx - 6 * s} ${BASE - 38 * s} ${cx} ${BASE - 38 * s}
            C${cx + 6 * s} ${BASE - 38 * s} ${cx + 13 * s} ${BASE - 30 * s} ${cx + 13 * s} ${BASE} Z`}
      />
      {/* arms out to the neighbours */}
      <path
        d={`M${cx - 19 * s} ${shoulder} L${cx + 19 * s} ${shoulder}`}
        stroke="currentColor"
        strokeWidth={4.5 * s}
        strokeLinecap="round"
        fill="none"
      />
      {raise ? (
        <path
          d={`M${cx - 8 * s} ${shoulder} L${cx - 20 * s} ${shoulder - 26 * s}`}
          stroke="currentColor"
          strokeWidth={4.5 * s}
          strokeLinecap="round"
          fill="none"
        />
      ) : null}
    </g>
  );
}

export default function Logo({
  className = "",
  brand = "#e01f26",
  type = "#ffffff",
  shadow = "#b9bcc0",
  title = "Sunder",
}) {
  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label={title}>
      {/* drop sweep under the ribbon */}
      <path
        d="M30 250 C130 244 258 208 374 140 C306 232 168 288 66 290 C42 290 32 272 30 250 Z"
        fill={shadow}
        opacity="0.55"
      />

      {/* the family, walking the ribbon */}
      <g fill={brand} color={brand}>
        {FAMILY.map((f) => (
          <Figure key={f.cx} {...f} />
        ))}
      </g>

      {/* ribbon */}
      <path
        d="M18 214
           C8 176 18 150 52 142
           C150 122 252 98 330 46
           L396 6
           C398 42 392 68 372 86
           C384 94 392 106 396 120
           C320 178 200 228 74 258
           C40 266 24 246 18 214 Z"
        fill={brand}
      />

      {/* SUNDER, riding the ribbon's tilt */}
      <g transform="rotate(-11 190 190)">
        <text
          x="188"
          y="216"
          textAnchor="middle"
          fill={type}
          className="font-poster"
          style={{ fontSize: "104px", letterSpacing: "-0.005em" }}
        >
          SUNDER
        </text>
      </g>

      {/* registered mark */}
      <g fill={type}>
        <circle cx="366" cy="112" r="9" />
        <text
          x="366"
          y="116"
          textAnchor="middle"
          fill={brand}
          className="font-poster"
          style={{ fontSize: "11px" }}
        >
          R
        </text>
      </g>
    </svg>
  );
}

/** Compact circular mark for favicons / avatars / tight nav. */
export function LogoMark({ className = "", bg = "#e01f26", fg = "#ffffff" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Sunder">
      <circle cx="24" cy="24" r="23" fill={bg} />
      <text
        x="24"
        y="34"
        textAnchor="middle"
        fill={fg}
        className="font-poster"
        style={{ fontSize: "27px" }}
      >
        S
      </text>
    </svg>
  );
}
