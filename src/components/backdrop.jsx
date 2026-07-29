import { SpiceIcon, Ornament } from "@/components/spice-icons";

/**
 * Illustrated section backdrop.
 *
 * Scatters the folk illustration set behind a section the way the creative
 * boards fill their margins — big, soft, off the reading column. Positions are
 * fixed literals, not random, so server and client render the same thing.
 *
 * `tone="colour"` keeps each illustration's own palette (for light grounds);
 * `tone="mono"` collapses them to `currentColor` (for saturated grounds, where
 * a full-colour drawing would fight the field).
 */

/* Positions keep each drawing fully inside the section box. Negative offsets
   let `overflow: hidden` slice a flower in half, which reads as a rendering
   smudge rather than ornament. */
const FIELDS = {
  /* left/right margins of a standard content section */
  margins: [
    { name: "marigold", x: "1%", y: "7%", w: "11rem", r: -12 },
    { name: "paisley", x: "2%", y: "63%", w: "9rem", r: 8 },
    { name: "starAnise", x: "89%", y: "13%", w: "9rem", r: 14 },
    { name: "chilli", x: "90%", y: "60%", w: "8rem", r: -20 },
  ],
  /* denser, for tall sections */
  scatter: [
    { name: "marigold", x: "1%", y: "5%", w: "12rem", r: -14 },
    { name: "coriander", x: "13%", y: "84%", w: "7rem", r: 10 },
    { name: "paisley", x: "2%", y: "47%", w: "9rem", r: -6 },
    { name: "starAnise", x: "88%", y: "9%", w: "10rem", r: 16 },
    { name: "turmeric", x: "89%", y: "42%", w: "8rem", r: -8 },
    { name: "chilli", x: "90%", y: "72%", w: "8rem", r: 22 },
  ],
  /* just the top corners */
  crown: [
    { name: "paisley", x: "3%", y: "5%", w: "8rem", r: -18 },
    { name: "marigold", x: "88%", y: "6%", w: "9rem", r: 12 },
  ],
};

export default function Backdrop({
  field = "margins",
  tone = "colour",
  opacity = 0.16,
  ornaments = true,
  ornamentClass = "text-ink/20",
}) {
  const items = FIELDS[field] ?? FIELDS.margins;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Corner vines are drawn to sit in the corner, so they anchor flush
          rather than hanging outside and getting clipped. */}
      {ornaments ? (
        <>
          <Ornament className={`absolute left-0 top-0 w-40 ${ornamentClass}`} />
          <Ornament className={`absolute bottom-0 right-0 w-40 rotate-180 ${ornamentClass}`} />
        </>
      ) : null}

      {items.map((it, i) => (
        <SpiceIcon
          key={i}
          mono={tone === "mono"}
          name={it.name}
          className="absolute"
          style={{
            left: it.x,
            top: it.y,
            width: it.w,
            opacity,
            transform: `rotate(${it.r}deg)`,
          }}
        />
      ))}
    </div>
  );
}
