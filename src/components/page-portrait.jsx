import Image from "next/image";

/**
 * A brand-family cutout for an interior page masthead — the same cast as the
 * home hero (see hero-family.jsx), sized to sit beside a headline.
 *
 * On the home hero this exact illustration is wired into the site's own flat
 * design system rather than dropped in bare: a colour-matched spotlight glow
 * behind it, and a bordered caption plaque overlapping its edge. Without that
 * chrome the painterly artwork reads as a separate layer pasted over the
 * page rather than part of it — however good the flat-vs-painterly pairing
 * looks on the home hero, it stops working the moment nothing connects the
 * two languages. This puts the same two devices back: a `spot` glow (skipped
 * on `tone="glow"` images, which already carry their own baked-in light) and
 * a `.plaque` chip in the page's own accent colour.
 */
export default function PagePortrait({
  src,
  alt,
  name,
  width,
  height,
  tone = "cutout",
  spot,
  plaqueBg = "var(--color-marigold)",
  plaqueFg = "var(--color-ink)",
  side = "left",
  className = "",
  priority = false,
}) {
  return (
    <div className={`page-portrait page-portrait--${side} ${className}`}>
      {spot ? (
        <div className="page-portrait__spotlight" style={{ "--spot-c": spot }} aria-hidden="true" />
      ) : null}
      {tone === "cutout" ? <div className="page-portrait__shadow" aria-hidden="true" /> : null}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 640px) 80vw, (max-width: 1023px) 40vw, 17rem"
        className="page-portrait__img"
        priority={priority}
      />
      {name ? (
        <p
          className="page-portrait__tag plaque tilt-tag-r label-micro"
          style={{ "--plaque-bg": plaqueBg, "--plaque-fg": plaqueFg }}
        >
          {name}
        </p>
      ) : null}
    </div>
  );
}
