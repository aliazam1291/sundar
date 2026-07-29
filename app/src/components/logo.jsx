/**
 * The Sunder lockup — white card, red banner, family figures, rising flag.
 * Vector rebuild of the pack mark so it stays crisp at every size.
 */

const FAMILY = [
  { cx: 30, r: 3.1, arm: true },
  { cx: 45, r: 3.6, arm: false },
  { cx: 60, r: 2.6, arm: false },
  { cx: 72, r: 2.2, arm: false },
];

export default function Logo({
  className = "",
  card = "#fdf6e8",
  brand = "#d81f26",
  type = "#fdf6e8",
  title = "Sunder",
}) {
  return (
    <svg viewBox="0 0 230 84" className={className} role="img" aria-label={title}>
      {/* card */}
      <rect x="2" y="8" width="152" height="70" rx="7" fill={card} />

      {/* family figures */}
      <g fill={brand}>
        {FAMILY.map((f, i) => (
          <g key={i}>
            <circle cx={f.cx} cy={20 - f.r} r={f.r} />
            <path
              d={`M${f.cx - f.r * 1.5} 34 c0 -${f.r * 3.1} ${f.r * 0.7} -${f.r * 4.2} ${f.r * 1.5} -${f.r * 4.2} s${f.r * 1.5} ${f.r * 1.1} ${f.r * 1.5} ${f.r * 4.2} Z`}
            />
          </g>
        ))}
        {/* linking arms */}
        <path d="M27 27h50" stroke={brand} strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* rising flag tail */}
      <path
        d="M140 40c26-1.5 48-9.5 68-24l16 7c-21 19-48 29-84 31Z"
        fill={brand}
      />

      {/* banner */}
      <rect x="10" y="37" width="136" height="33" rx="4" fill={brand} />
      <text
        x="78"
        y="62"
        textAnchor="middle"
        fill={type}
        className="font-poster"
        style={{ fontSize: "26px", letterSpacing: "0.06em" }}
      >
        SUNDER
      </text>
    </svg>
  );
}

/** Compact circular mark for favicons / avatars / tight nav. */
export function LogoMark({ className = "", bg = "#d81f26", fg = "#fdf6e8" }) {
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
