/**
 * Sunder illustration set — flat folk-poster vectors.
 *
 * Not line art: every piece is built from filled shapes with a heavy ink
 * outline and a small, saturated palette, the way the pack and hoarding
 * creatives are drawn. Bold, expressive, nostalgic-but-modern.
 *
 * Each illustration carries its own colours. Pass `mono` to collapse it to a
 * single-colour silhouette — that is the version to use for watermarks,
 * ghosted backdrops and anywhere the parent sets the colour.
 */

const INK = "var(--color-ink)";

const MONO = {
  "--i1": "currentColor",
  "--i2": "currentColor",
  "--i3": "currentColor",
  "--io": "currentColor",
};

function Ico({ children, className = "", vars, mono = false, strokeWidth, ...rest }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      style={mono ? MONO : vars}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <g
        stroke="var(--io, var(--color-ink))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </g>
    </svg>
  );
}

/* Shorthands — i1 body, i2 secondary, i3 accent */
const f1 = { fill: "var(--i1)" };
const f2 = { fill: "var(--i2)" };
const f3 = { fill: "var(--i3)" };
const line = { fill: "none" };

/* ── Chilli ─────────────────────────────────────────────── */
export const Chilli = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-chilli)", "--i2": "var(--color-forest-3)", "--i3": "var(--color-marigold)", "--io": INK }}
    {...p}
  >
    <path
      {...f1}
      d="M29.5 12c5.4 6.4 7.4 15 4.6 22.4C31.4 41.6 24 45 18 42.4c-5.4-2.4-7-8.8-3.8-14.2C17.6 22.4 24.6 18.4 29.5 12Z"
    />
    <path {...f3} d="M27.6 17.6c-3.4 4.2-6 8.4-7.4 12.8-.7 2.2 2.4 3 3.4 1 2-4 4.4-8 7-11.2Z" />
    <path {...f2} d="M29.5 12c-1-2.8 0-5.2 2.4-6.6 2.8-1.6 6 .2 7 3.4-2.8-.4-4.8.6-5.8 3-.8 1.8-2.2 2-3.6.2Z" />
  </Ico>
);

/* ── Star anise ─────────────────────────────────────────── */
export const StarAnise = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-oxblood-2)", "--i2": "var(--color-brown)", "--i3": "var(--color-marigold)", "--io": INK }}
    {...p}
  >
    {Array.from({ length: 8 }).map((_, i) => (
      <g key={i} transform={`rotate(${i * 45} 24 24)`}>
        <ellipse {...f1} cx="24" cy="12.5" rx="4.2" ry="8.2" />
        <circle {...f3} cx="24" cy="10.5" r="1.9" />
      </g>
    ))}
    <circle {...f2} cx="24" cy="24" r="4.4" />
  </Ico>
);

/* ── Cardamom pod ───────────────────────────────────────── */
export const Cardamom = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-forest-3)", "--i2": "var(--color-moss)", "--i3": "var(--color-ghee)", "--io": INK }}
    {...p}
  >
    <path {...f1} d="M24 5c6.6 5.8 10 13.2 10 20.6C34 34.6 29.6 41 24 41s-10-6.4-10-15.4C14 18.2 17.4 10.8 24 5Z" />
    <path {...f2} d="M24 5c6.6 5.8 10 13.2 10 20.6C34 34.6 29.6 41 24 41Z" />
    <path {...line} d="M24 7v32" />
    <circle {...f3} cx="24" cy="21" r="2.6" />
    <circle {...f3} cx="24" cy="30" r="2.6" />
  </Ico>
);

/* ── Cinnamon quill ─────────────────────────────────────── */
export const Cinnamon = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-brown)", "--i2": "var(--color-terracotta)", "--i3": "var(--color-dune)", "--io": INK }}
    {...p}
  >
    <path {...f1} d="M14 15h21a9 9 0 0 1 0 18H14Z" />
    <ellipse {...f2} cx="14" cy="24" rx="5" ry="9" />
    <ellipse {...f3} cx="14" cy="24" rx="2" ry="4.4" />
    <path {...line} d="M23 15.6v16.8M30 15.6v16.8" />
  </Ico>
);

/* ── Mortar & pestle ────────────────────────────────────── */
export const Mortar = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-cobalt)", "--i2": "var(--color-marigold)", "--i3": "var(--color-chilli)", "--io": INK }}
    {...p}
  >
    <path {...f2} d="M32 21 38.5 8.5" />
    <circle {...f2} cx="39.5" cy="6.5" r="3.6" />
    <path {...f3} d="M13 25.5h22c-.6 2.4-3.2 3.6-11 3.6S13.6 27.9 13 25.5Z" />
    <path {...f1} d="M9 24.5h30c0 9-6.7 16-15 16s-15-7-15-16Z" />
    <path {...line} d="M7 24.5h34" />
  </Ico>
);

/* ── Coriander leaf ─────────────────────────────────────── */
export const Coriander = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-forest-3)", "--i2": "var(--color-moss)", "--i3": "var(--color-marigold)", "--io": INK }}
    {...p}
  >
    <path {...line} d="M24 43V22" />
    <path {...f1} d="M24 22c-5.6-.6-9.4-4.4-9.2-9.8 4.6-.8 8.4 1.4 9.2 5.2Z" />
    <path {...f2} d="M24 22c5.6-.6 9.4-4.4 9.2-9.8-4.6-.8-8.4 1.4-9.2 5.2Z" />
    <path {...f1} d="M24 17.4c-3-3-3.6-7.6-1.6-12 4 1.6 5.2 6 1.6 12Z" />
    <path {...f2} d="M24 32c-4-.8-6.6-3.2-7.2-7 4.4-.8 7.2 1.4 7.2 4.4Z" />
    <circle {...f3} cx="24" cy="27" r="1.8" />
  </Ico>
);

/* ── Peppercorns ────────────────────────────────────────── */
export const Peppercorn = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-soot)", "--i2": "var(--color-brown)", "--i3": "var(--color-clay)", "--io": INK }}
    {...p}
  >
    <circle {...f1} cx="17" cy="18.5" r="8" />
    <circle {...f2} cx="32" cy="26" r="6.4" />
    <circle {...f1} cx="20" cy="35" r="5" />
    <circle {...f3} cx="14.5" cy="15.5" r="1.9" />
    <circle {...f3} cx="30" cy="23.5" r="1.5" />
  </Ico>
);

/* ── Cumin seeds ────────────────────────────────────────── */
export const Cumin = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-brown)", "--i2": "var(--color-olive)", "--i3": "var(--color-dune)", "--io": INK }}
    {...p}
  >
    <ellipse {...f1} cx="16" cy="17" rx="3.8" ry="9" transform="rotate(-24 16 17)" />
    <ellipse {...f2} cx="31" cy="22" rx="3.8" ry="9" transform="rotate(18 31 22)" />
    <ellipse {...f1} cx="21" cy="34" rx="3.8" ry="9" transform="rotate(-8 21 34)" />
    <path {...line} stroke="var(--i3)" d="M16 10.5v13M31 15v13.5M21 27.5v13" />
  </Ico>
);

/* ── Bay leaf ───────────────────────────────────────────── */
export const BayLeaf = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-forest-2)", "--i2": "var(--color-forest-3)", "--i3": "var(--color-ghee)", "--io": INK }}
    {...p}
  >
    <path {...f1} d="M39 7C25 8.4 12 18.4 10 33c-.4 3.2.8 5.8 3 6.8C26 42 39.6 27.4 39 7Z" />
    <path {...f2} d="M39 7C25 8.4 12 18.4 10 33c-.4 3.2.8 5.8 3 6.8Z" />
    <path {...line} stroke="var(--i3)" d="M13 39.8C20.6 30.8 29.4 20.4 39 7" />
    <path {...line} stroke="var(--i3)" d="M18 30.6c3.8.4 7.2-.6 10-3.2M23.6 22.4c3.6.6 6.8-.2 9.4-2.6" />
  </Ico>
);

/* ── Turmeric root ──────────────────────────────────────── */
export const Turmeric = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-turmeric)", "--i2": "var(--color-saffron)", "--i3": "var(--color-marigold)", "--io": INK }}
    {...p}
  >
    <path
      {...f2}
      d="M32 19c5.8.8 8.8 5 7.6 10.4C38.4 35.2 33 39 26.4 39c-9 0-16-2.9-18-6.8Z"
    />
    <path
      {...f1}
      d="M10.6 32.2C8.8 25.6 12.4 18.6 18.8 15.2c4.4-2.2 6.6-5.2 7-9.4 6.2 1.8 9.6 7.2 8.4 13.4-1 5.2-5.6 8.8-12 8.8-6.2 0-10.4 1.6-11.6 4.2Z"
    />
    <circle {...f3} cx="20.5" cy="19" r="2.4" />
    <circle {...f3} cx="29" cy="30" r="2.4" />
  </Ico>
);

/* ── Clove ──────────────────────────────────────────────── */
export const Clove = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-brown)", "--i2": "var(--color-oxblood-2)", "--i3": "var(--color-terracotta)", "--io": INK }}
    {...p}
  >
    <path {...f1} d="M24 42c-2 0-3.2-1.6-3.2-4V18h6.4v20c0 2.4-1.2 4-3.2 4Z" />
    <circle {...f2} cx="24" cy="13" r="6" />
    <circle {...f3} cx="15.5" cy="10" r="3.4" />
    <circle {...f3} cx="32.5" cy="10" r="3.4" />
    <circle {...f3} cx="24" cy="5.5" r="3.4" />
  </Ico>
);

/* ── Mustard seeds ──────────────────────────────────────── */
export const Mustard = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-marigold)", "--i2": "var(--color-turmeric)", "--i3": "var(--color-saffron)", "--io": INK }}
    {...p}
  >
    <circle {...f1} cx="18" cy="18" r="5.4" />
    <circle {...f2} cx="31" cy="21" r="4.4" />
    <circle {...f3} cx="22" cy="30" r="4" />
    <circle {...f1} cx="33" cy="33" r="4.8" />
    <circle {...f2} cx="13" cy="30.5" r="3.2" />
    <circle {...f3} cx="25.5" cy="11" r="3" />
  </Ico>
);

/* ── Fenugreek ──────────────────────────────────────────── */
export const Fenugreek = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-moss)", "--i2": "var(--color-olive)", "--i3": "var(--color-ghee)", "--io": INK }}
    {...p}
  >
    <rect {...f1} x="10" y="16" width="12" height="12" rx="2" transform="rotate(-12 16 22)" />
    <rect {...f2} x="25" y="12" width="12" height="12" rx="2" transform="rotate(9 31 18)" />
    <rect {...f1} x="18" y="29" width="12" height="12" rx="2" transform="rotate(-6 24 35)" />
    <circle {...f3} cx="16" cy="22" r="1.7" />
    <circle {...f3} cx="31" cy="18" r="1.7" />
    <circle {...f3} cx="24" cy="35" r="1.7" />
  </Ico>
);

/* ── The chutki — a pinch falling ───────────────────────── */
export const Pinch = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-marigold)", "--i2": "var(--color-saffron)", "--i3": "var(--color-rani)", "--io": INK }}
    {...p}
  >
    <path {...f1} d="M14 5.5c3 3.8 5 7.6 6 11.4l-3.6 1.6C15 14.2 14 9.8 14 5.5Z" />
    <path {...f1} d="M22 4.5c1.2 4.2 1.6 8.4 1.4 12.4h-3.8C19.4 12.6 20.2 8.2 22 4.5Z" />
    <path {...f1} d="M29.5 6c-1 4-2.6 7.8-4.6 11.2l-3.2-1.8C24 11.6 26.4 8.4 29.5 6Z" />
    <path {...f2} d="M19 16.4h10c1.6 0 2.6 1.4 2.2 3-.6 2.6-3.4 4.4-7.2 4.4s-6.6-1.8-7.2-4.4c-.4-1.6.6-3 2.2-3Z" />
    <circle {...f3} cx="24" cy="30" r="2.1" />
    <circle {...f3} cx="18.5" cy="36" r="1.8" />
    <circle {...f3} cx="29.5" cy="36.5" r="1.8" />
    <circle {...f3} cx="23.5" cy="42" r="1.6" />
  </Ico>
);

/* ── Thela (street cart) ────────────────────────────────── */
export const Thela = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-marigold)", "--i2": "var(--color-cobalt)", "--i3": "var(--color-rani)", "--io": INK }}
    {...p}
  >
    <path {...f2} d="M5 14h38l-3 6H8l-3-6Z" />
    <path {...f1} d="M8 20h32l-2.6 15H10.6L8 20Z" />
    <path {...f3} d="M14 24h20l-1 7H15l-1-7Z" />
    <path {...line} d="M12 14V8h24v6M24 8V4.5" />
    <circle {...f3} cx="15.5" cy="39.5" r="3.8" />
    <circle {...f3} cx="32.5" cy="39.5" r="3.8" />
  </Ico>
);

/* ── Truck-art lorry ────────────────────────────────────── */
export const Truck = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-chilli)", "--i2": "var(--color-marigold)", "--i3": "var(--color-cobalt)", "--io": INK }}
    {...p}
  >
    <path {...f1} d="M4 13h23v19H4z" />
    <path {...f2} d="M8 17h15v5H8z" />
    <path {...f3} d="M27 19h7.5l5.5 6v7H27z" />
    <path {...line} d="M4 32h40" />
    <circle {...f3} cx="13" cy="36.5" r="4.2" />
    <circle {...f3} cx="33" cy="36.5" r="4.2" />
    <circle {...f2} cx="13" cy="36.5" r="1.4" />
    <circle {...f2} cx="33" cy="36.5" r="1.4" />
  </Ico>
);

/* ── Grinding stone / chakki ────────────────────────────── */
export const Chakki = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-clay)", "--i2": "var(--color-sand)", "--i3": "var(--color-oxblood)", "--io": INK }}
    {...p}
  >
    <path {...f1} d="M7 27v5c0 4.6 7.6 8.4 17 8.4s17-3.8 17-8.4v-5Z" />
    <ellipse {...f2} cx="24" cy="27" rx="17" ry="8.2" />
    <ellipse {...f1} cx="24" cy="19.5" rx="11" ry="5.4" />
    <path {...line} d="M24 19.5V9" />
    <circle {...f3} cx="24" cy="7" r="3" />
  </Ico>
);

/* ── Flame (heat scale) ─────────────────────────────────── */
export const Flame = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-chilli)", "--i2": "var(--color-marigold)", "--i3": "var(--color-ghee)", "--io": INK }}
    {...p}
  >
    <path
      {...f1}
      d="M24 4c1.8 7.4-3.6 9.8-6.8 14.2C13.2 23.8 11.6 28 11.6 31.6 11.6 39 17.2 44 24 44s12.4-5 12.4-12.4c0-6.4-4.2-11-8.4-14.2.8 3.8-.6 6.8-3 8 1.4-7-.4-15-1-21.4Z"
    />
    <path
      {...f2}
      d="M24 21c1 4.2-2 5.6-3.8 8-2.2 3-3 5.4-3 7.4 0 4 3 6.8 6.8 6.8s6.8-2.8 6.8-6.8c0-3.6-2.4-6.2-4.8-8.4.4 2-.4 3.6-1.6 4.2.8-4-.2-8.6-.4-11.2Z"
    />
    <ellipse {...f3} cx="24" cy="38" rx="2.4" ry="3.2" />
  </Ico>
);

/* ── Leaf sprig (pure / no additives) ───────────────────── */
export const Sprig = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-forest-3)", "--i2": "var(--color-moss)", "--i3": "var(--color-marigold)", "--io": INK }}
    {...p}
  >
    <path {...line} d="M24 43V12" />
    <path {...f1} d="M24 19c-5-5-10.6-6-16-3.2 1.6 6 6 9.6 12.8 9.6Z" />
    <path {...f2} d="M24 19c5-5 10.6-6 16-3.2-1.6 6-6 9.6-12.8 9.6Z" />
    <path {...f1} d="M24 31.5c-3.8-3.8-8-4.6-12.4-2.6 1.3 4.7 4.7 7.4 10 7.4Z" />
    <path {...f2} d="M24 31.5c3.8-3.8 8-4.6 12.4-2.6-1.3 4.7-4.7 7.4-10 7.4Z" />
    <circle {...f3} cx="24" cy="10" r="2.6" />
  </Ico>
);

/* ── Spice jar ──────────────────────────────────────────── */
export const Jar = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-paper)", "--i2": "var(--color-chilli)", "--i3": "var(--color-marigold)", "--io": INK }}
    {...p}
  >
    <path {...f1} d="M15 15h18a3 3 0 0 1 3 3v20a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V18a3 3 0 0 1 3-3Z" />
    <path {...f2} d="M13 24h22v10H13z" />
    <path {...f3} d="M17 9h14v6H17z" />
    <path {...f3} d="M19 4.5h10V9H19z" />
    <circle {...f3} cx="24" cy="29" r="2.6" />
  </Ico>
);

/* ── Marigold — the garland flower ──────────────────────── */
export const Marigold = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-marigold)", "--i2": "var(--color-saffron)", "--i3": "var(--color-oxblood)", "--io": INK }}
    {...p}
  >
    {Array.from({ length: 10 }).map((_, i) => (
      <ellipse key={i} {...f1} cx="24" cy="10" rx="4.4" ry="6.4" transform={`rotate(${i * 36} 24 24)`} />
    ))}
    {Array.from({ length: 8 }).map((_, i) => (
      <ellipse key={i} {...f2} cx="24" cy="16" rx="3.6" ry="5" transform={`rotate(${i * 45 + 22} 24 24)`} />
    ))}
    <circle {...f3} cx="24" cy="24" r="4.2" />
  </Ico>
);

/* ── Paisley — the block-print motif ────────────────────── */
export const Paisley = (p) => (
  <Ico
    vars={{ "--i1": "var(--color-rani)", "--i2": "var(--color-marigold)", "--i3": "var(--color-cobalt)", "--io": INK }}
    {...p}
  >
    <path
      {...f1}
      d="M22 43c-8.6 0-14.6-6-14.6-14.4 0-9 6.4-16.6 15.4-20.6 7.4-3.2 14.6-1 17 5 2.6 6.6-2 13-9.4 13-4 0-6.6-2-6.6-5 0-2.4 1.6-4 3.8-4-3.6-1.6-7 .8-7 4.8 0 4.2 3.4 7.4 8.6 7.4-1.2 8-4.4 13.8-7.2 13.8Z"
    />
    <path {...f2} d="M23 34c-4.4-1-7.2-4.2-7.2-8.6 0-5.4 4-10.2 9.8-12.6-6 4.4-8.8 9-8.8 13.4 0 3.4 2.4 6.4 6.2 7.8Z" />
    <circle {...f3} cx="27" cy="19" r="2.4" />
  </Ico>
);

/* ── Decorative brand star (✶) from the deck ────────────── */
export const Star = ({ className = "", ...rest }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...rest}>
    <path d="M12 0.8 13.7 9.1 21.2 5.1 15.9 12 21.2 18.9 13.7 14.9 12 23.2 10.3 14.9 2.8 18.9 8.1 12 2.8 5.1 10.3 9.1Z" />
  </svg>
);

/* ── Sunburst ray field (brand deck pack backdrop) ─────── */
export function Sunburst({ className = "", rays = 44, opacity = 0.12 }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMax slice"
    >
      <g fill="currentColor" opacity={opacity}>
        {Array.from({ length: rays }).map((_, i) => (
          <path
            key={i}
            d="M100 200 L96 -60 L104 -60 Z"
            transform={`rotate(${(i * 360) / rays} 100 200)`}
          />
        ))}
      </g>
    </svg>
  );
}

/* ── Corner ornament — the floral trim on every deck slide ─ */
export function Ornament({ className = "", flip = false }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g fill="currentColor">
        {/* vine */}
        <path
          d="M0 8c26 0 44 10 56 30 8 13 18 20 32 21v8c-18-1-31-10-40-25C38 25 23 16 0 16Z"
          opacity="0.85"
        />
        {/* blooms along the vine */}
        {[
          [14, 26, 9],
          [42, 44, 12],
          [76, 66, 8],
          [22, 62, 6],
        ].map(([cx, cy, r], i) => (
          <g key={i}>
            {Array.from({ length: 8 }).map((_, j) => (
              <ellipse
                key={j}
                cx={cx}
                cy={cy - r * 0.72}
                rx={r * 0.34}
                ry={r * 0.72}
                transform={`rotate(${j * 45} ${cx} ${cy})`}
                opacity="0.75"
              />
            ))}
            <circle cx={cx} cy={cy} r={r * 0.34} />
          </g>
        ))}
        {/* leaves */}
        <path d="M60 18c9 2 14 8 15 17-9-2-14-8-15-17Z" opacity="0.7" />
        <path d="M30 44c-9 2-14 8-15 17 9-2 14-8 15-17Z" opacity="0.7" />
      </g>
    </svg>
  );
}

/* ── Named registry, for data-driven rendering ─────────── */
export const SPICE_ICONS = {
  chilli: Chilli,
  starAnise: StarAnise,
  cardamom: Cardamom,
  cinnamon: Cinnamon,
  mortar: Mortar,
  coriander: Coriander,
  peppercorn: Peppercorn,
  cumin: Cumin,
  bayLeaf: BayLeaf,
  turmeric: Turmeric,
  clove: Clove,
  mustard: Mustard,
  fenugreek: Fenugreek,
  pinch: Pinch,
  thela: Thela,
  truck: Truck,
  chakki: Chakki,
  flame: Flame,
  sprig: Sprig,
  jar: Jar,
  marigold: Marigold,
  paisley: Paisley,
};

export function SpiceIcon({ name, ...rest }) {
  const Cmp = SPICE_ICONS[name] ?? StarAnise;
  return <Cmp {...rest} />;
}
