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
  { cx: 96, s: 0.52, raise: true },
  { cx: 126, s: 0.86 },
  { cx: 157, s: 0.78 },
  { cx: 183, s: 0.48 },
];

const BASE = 112; // ground line the family stands on

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
        d="M28 258 C130 252 258 216 374 146 C306 244 166 296 64 298 C40 298 30 280 28 258 Z"
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
        d="M14 224
           C4 182 16 154 52 146
           C150 126 252 100 330 48
           L396 6
           C398 42 392 68 372 86
           C384 94 392 106 396 120
           C322 182 200 236 72 268
           C36 276 20 258 14 224 Z"
        fill={brand}
      />

      {/* SUNDER, riding the ribbon's tilt */}
      <g transform="rotate(-10.5 202 190)">
        <text
          x="204"
          y="214"
          textAnchor="middle"
          fill={type}
          className="font-poster"
          style={{ fontSize: "90px", letterSpacing: "-0.01em" }}
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
