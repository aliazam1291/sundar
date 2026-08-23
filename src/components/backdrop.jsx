import { SpiceIcon } from "@/components/spice-icons";

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
   let `overflow: hidden` slice a drawing in half, which reads as a rendering
   smudge rather than ornament.

   Only spice drawings are scattered here. The paisley block-print motif used
   to sit in every field and the corner vines framed every section; both were
   pulled — they are decorative filigree from a different visual language than
   the truck-art poster the rest of the site is built in, and against a spice
   brand a seed or a pod says something the flourish does not. */
const FIELDS = {
  /* left/right margins of a standard content section */
  margins: [
    { name: "marigold", x: "1%", y: "7%", w: "11rem", r: -12 },
    { name: "coriander", x: "2%", y: "63%", w: "9rem", r: 8 },
    { name: "starAnise", x: "89%", y: "13%", w: "9rem", r: 14 },
    { name: "chilli", x: "90%", y: "60%", w: "8rem", r: -20 },
  ],
  /* denser, for tall sections */
  scatter: [
    { name: "marigold", x: "1%", y: "5%", w: "12rem", r: -14 },
    { name: "coriander", x: "13%", y: "84%", w: "7rem", r: 10 },
    { name: "cumin", x: "2%", y: "47%", w: "9rem", r: -6 },
    { name: "starAnise", x: "88%", y: "9%", w: "10rem", r: 16 },
    { name: "turmeric", x: "89%", y: "42%", w: "8rem", r: -8 },
    { name: "chilli", x: "90%", y: "72%", w: "8rem", r: 22 },
  ],
  /* just the top corners */
  crown: [
    { name: "starAnise", x: "3%", y: "5%", w: "8rem", r: -18 },
    { name: "marigold", x: "88%", y: "6%", w: "9rem", r: 12 },
  ],
};

/* `ornaments` and `ornamentClass` are still accepted and ignored: a dozen
   sections pass them, and quietly doing nothing is better here than making
   every caller edit in the same commit that removed the vines. */
export default function Backdrop({
  field = "margins",
  tone = "colour",
  opacity = 0.16,
  ornaments: _ornaments,
  ornamentClass: _ornamentClass,
}) {
  const items = FIELDS[field] ?? FIELDS.margins;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
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
