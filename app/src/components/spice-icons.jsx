/**
 * Hand-drawn spice line-art.
 * All icons are stroke-based, inherit `currentColor`, and share a 48×48 box
 * so they can be mixed at any size without optical drift.
 */

function Ico({ children, className = "", strokeWidth = 1.6, ...rest }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ── Chilli ─────────────────────────────────────────────── */
export const Chilli = (p) => (
  <Ico {...p}>
    <path d="M30.5 11c5 6.2 6.8 14.4 4.2 21.6C32 40.2 25.2 44 19.3 41.6c-5.2-2.1-7-8.2-4.1-13.5C18.6 21.6 25.6 17.6 30.5 11Z" />
    <path d="M30.5 11c-.8-2.4-.2-4.6 1.6-6.2" />
    <path d="M32.1 4.8c2.5-.6 4.6.2 6 2.2" />
    <path d="M26.4 19.6c-3.4 4-6.2 8.8-7.3 13.9" />
  </Ico>
);

/* ── Star anise ─────────────────────────────────────────── */
export const StarAnise = (p) => (
  <Ico {...p}>
    {Array.from({ length: 8 }).map((_, i) => (
      <ellipse
        key={i}
        cx="24"
        cy="12.5"
        rx="3.9"
        ry="8"
        transform={`rotate(${i * 45} 24 24)`}
      />
    ))}
    <circle cx="24" cy="24" r="3.6" />
  </Ico>
);

/* ── Cardamom pod ───────────────────────────────────────── */
export const Cardamom = (p) => (
  <Ico {...p}>
    <path d="M24 5.5c6.4 5.6 9.8 12.8 9.8 20 0 8.6-4.4 14.5-9.8 14.5s-9.8-5.9-9.8-14.5c0-7.2 3.4-14.4 9.8-20Z" />
    <path d="M24 8v31" />
    <path d="M18.2 13.2c-1.9 6.6-2 15.6.4 22.6" />
    <path d="M29.8 13.2c1.9 6.6 2 15.6-.4 22.6" />
    <path d="M24 5.5c.6-1.6 1.8-2.6 3.4-3" />
  </Ico>
);

/* ── Cinnamon quill ─────────────────────────────────────── */
export const Cinnamon = (p) => (
  <Ico {...p}>
    <path d="M13 16h22a8 8 0 0 1 0 16H13a8 8 0 0 1 0-16Z" />
    <path d="M13 20a4 4 0 0 0 0 8" />
    <ellipse cx="13" cy="24" rx="2.6" ry="4" />
    <path d="M20 17.2v13.6M27 17.2v13.6" />
  </Ico>
);

/* ── Mortar & pestle ────────────────────────────────────── */
export const Mortar = (p) => (
  <Ico {...p}>
    <path d="M9.5 25.5h29c0 8.8-6.5 15.5-14.5 15.5S9.5 34.3 9.5 25.5Z" />
    <path d="M7 25.5h34" />
    <path d="M30 20.5 37 8" />
    <circle cx="38.6" cy="6" r="3.4" />
    <path d="M17 32c1.6 2.6 4 4.2 7 4.6" />
  </Ico>
);

/* ── Coriander leaf ─────────────────────────────────────── */
export const Coriander = (p) => (
  <Ico {...p}>
    <path d="M24 43V25" />
    <path d="M24 25c-4.6-1-7.6-4.4-7.4-9 3.6-.6 6.6 1 7.4 4" />
    <path d="M24 25c4.6-1 7.6-4.4 7.4-9-3.6-.6-6.6 1-7.4 4" />
    <path d="M24 20c-2.6-2.6-3.2-6.6-1.4-10.4C26 11 27 14.8 24 20Z" />
    <path d="M24 31c-3.2-.6-5.4-2.6-6-5.6M24 31c3.2-.6 5.4-2.6 6-5.6" />
  </Ico>
);

/* ── Peppercorns ────────────────────────────────────────── */
export const Peppercorn = (p) => (
  <Ico {...p}>
    <circle cx="17" cy="19" r="7.5" />
    <circle cx="31.5" cy="26" r="6" />
    <circle cx="20" cy="35" r="4.6" />
    <path d="M13.5 15.5c1.6 1 2.6 2.8 2.8 4.8M28.8 23.5c1.2.8 2 2 2.2 3.6" />
  </Ico>
);

/* ── Cumin seeds ────────────────────────────────────────── */
export const Cumin = (p) => (
  <Ico {...p}>
    <ellipse cx="16" cy="17" rx="3.2" ry="8.4" transform="rotate(-24 16 17)" />
    <ellipse cx="31" cy="22" rx="3.2" ry="8.4" transform="rotate(18 31 22)" />
    <ellipse cx="21" cy="34" rx="3.2" ry="8.4" transform="rotate(-8 21 34)" />
    <path d="M16 10.5v13M31 15v13.5M21 27.5v13" />
  </Ico>
);

/* ── Bay leaf ───────────────────────────────────────────── */
export const BayLeaf = (p) => (
  <Ico {...p}>
    <path d="M38 8C24.6 9 12 18.4 10 32.4c-.4 3 .6 5.6 2.6 6.6C25.4 41.6 38.6 27.6 38 8Z" />
    <path d="M12.6 39C20 30.4 28.6 20.4 38 8" />
    <path d="M18 30.4c3.6.4 7-.6 9.6-3M23.4 22.6c3.4.6 6.6-.2 9.2-2.4" />
  </Ico>
);

/* ── Turmeric root ──────────────────────────────────────── */
export const Turmeric = (p) => (
  <Ico {...p}>
    <path d="M11 32c-1.6-6 1.6-12.4 7.4-15.4 4-2 6-4.8 6.4-8.6 5.6 1.6 8.6 6.4 7.6 12" />
    <path d="M32.4 20c5.2.6 8 4.4 7 9.4-1 5.2-6 8.8-12 8.8-8.2 0-14.6-2.6-16.4-6.2" />
    <path d="M19.6 17.4c1.4 2.6 1.4 5.6 0 8.6M27.6 21.4c1.6 3 1.6 6.4 0 9.6" />
  </Ico>
);

/* ── Clove ──────────────────────────────────────────────── */
export const Clove = (p) => (
  <Ico {...p}>
    <path d="M24 41V19" />
    <path d="M24 19c-3.4-1.4-5.4-4-5.4-7.4 0-3.6 2.4-6.6 5.4-7.6 3 1 5.4 4 5.4 7.6 0 3.4-2 6-5.4 7.4Z" />
    <path d="M18.8 13.4 14 10.2M29.2 13.4 34 10.2" />
    <path d="M24 41c-1.6-1-2.4-2.6-2.4-4.6M24 41c1.6-1 2.4-2.6 2.4-4.6" />
  </Ico>
);

/* ── Mustard seeds ──────────────────────────────────────── */
export const Mustard = (p) => (
  <Ico {...p}>
    <circle cx="18" cy="18" r="4.4" />
    <circle cx="30" cy="21" r="3.6" />
    <circle cx="22" cy="29.5" r="3.2" />
    <circle cx="32" cy="32" r="4" />
    <circle cx="14" cy="30" r="2.4" />
    <circle cx="25" cy="12" r="2.2" />
  </Ico>
);

/* ── Fenugreek ──────────────────────────────────────────── */
export const Fenugreek = (p) => (
  <Ico {...p}>
    <path d="M12 18h9.5v9.5H12zM26 14h10v10H26zM19 30h9v9h-9z" />
    <path d="M12 18l9.5 9.5M36 14l-10 10M28 30l-9 9" />
  </Ico>
);

/* ── The chutki — a pinch falling ───────────────────────── */
export const Pinch = (p) => (
  <Ico {...p}>
    <path d="M14.5 6.5c2.6 3.6 4.4 7.2 5.4 10.8" />
    <path d="M21.5 5c1 4 1.4 8 1.2 12" />
    <path d="M28.5 6.5c-1.2 3.8-2.8 7.4-4.8 10.8" />
    <path d="M19.9 17.3c-1.6 1.4-2 3.4-1 5.2 1.2 2.2 4 3 6.4 1.8 2-1 3-2.8 2.6-4.6" />
    <circle cx="24" cy="31.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="19.5" cy="36.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="28.5" cy="37" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="23.5" cy="42" r="1.1" fill="currentColor" stroke="none" />
  </Ico>
);

/* ── Thela (street cart) ────────────────────────────────── */
export const Thela = (p) => (
  <Ico {...p}>
    <path d="M8 20h32l-2.4 14H10.4L8 20Z" />
    <path d="M6 15h36l-2 5H8l-2-5Z" />
    <path d="M12 15V9h24v6" />
    <path d="M24 9V5" />
    <circle cx="15.5" cy="39.5" r="3.5" />
    <circle cx="32.5" cy="39.5" r="3.5" />
    <path d="M40 34h4" />
  </Ico>
);

/* ── Truck-art lorry ────────────────────────────────────── */
export const Truck = (p) => (
  <Ico {...p}>
    <path d="M4 14h22v18H4z" />
    <path d="M26 20h8l6 6v6h-14z" />
    <circle cx="13" cy="36" r="4" />
    <circle cx="33" cy="36" r="4" />
    <path d="M4 32h5M17 32h12M37 32h7v-6" />
    <path d="M9 19h12M9 24h12" />
  </Ico>
);

/* ── Grinding stone / chakki ────────────────────────────── */
export const Chakki = (p) => (
  <Ico {...p}>
    <ellipse cx="24" cy="28" rx="17" ry="8" />
    <path d="M7 28v4c0 4.4 7.6 8 17 8s17-3.6 17-8v-4" />
    <ellipse cx="24" cy="20" rx="11" ry="5.2" />
    <path d="M24 20V9" />
    <circle cx="24" cy="7" r="2.6" />
  </Ico>
);

/* ── Flame (heat scale) ─────────────────────────────────── */
export const Flame = (p) => (
  <Ico {...p}>
    <path d="M24 5c1.6 7-3.6 9.4-6.6 13.6C13.4 24 12 28 12 31.4 12 38.4 17.4 43 24 43s12-4.6 12-11.6c0-6-4-10.4-8-13.4.8 3.6-.6 6.4-3 7.6 1.4-6.6-.4-14.4-1-20.6Z" />
  </Ico>
);

/* ── Leaf sprig (pure / no additives) ───────────────────── */
export const Sprig = (p) => (
  <Ico {...p}>
    <path d="M24 43V13" />
    <path d="M24 19c-4.6-4.6-10-5.6-15-3 1.4 5.6 5.6 9 12 9M24 19c4.6-4.6 10-5.6 15-3-1.4 5.6-5.6 9-12 9" />
    <path d="M24 31c-3.6-3.6-7.6-4.4-11.6-2.4 1.2 4.4 4.4 7 9.4 7M24 31c3.6-3.6 7.6-4.4 11.6-2.4-1.2 4.4-4.4 7-9.4 7" />
  </Ico>
);

/* ── Spice jar ──────────────────────────────────────────── */
export const Jar = (p) => (
  <Ico {...p}>
    <path d="M15 16h18a3 3 0 0 1 3 3v20a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V19a3 3 0 0 1 3-3Z" />
    <path d="M17 10h14v6H17z" />
    <path d="M19 5h10v5H19z" />
    <path d="M12 25h24" />
    <path d="M20 31h8M20 36h8" />
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
};

export function SpiceIcon({ name, ...rest }) {
  const Cmp = SPICE_ICONS[name] ?? StarAnise;
  return <Cmp {...rest} />;
}
