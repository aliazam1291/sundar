import Image from "next/image";

/**
 * The official Sunder lockup.
 *
 * This is the real registered mark as a raster asset, not a redrawing of it,
 * so it is pixel-accurate and never drifts from the brand's own artwork. It
 * replaces an SVG rebuild that only approximated the ribbon and lettering.
 *
 * Source is `public/sundar-logo.png` at 397×294, from the brand's own CDN. The
 * 100×74 copy in `public/sundarlogo.avif` is the same mark but too small for
 * the sizes used here — the footer alone renders 150px wide, which wants
 * ~222px of source at 2× DPR.
 *
 * Deliberately NOT recolourable. The mark has fixed brand colours; the vector
 * version took `brand`/`type` props and the footer was tinting it
 * marigold-on-forest, which an official logo should not do.
 *
 * Size it with a PAIR of classes — `h-12 w-auto`, or `w-[150px] h-auto`.
 * Setting only one dimension in CSS makes next/image warn that the aspect
 * ratio was modified.
 */
export default function Logo({ className = "", priority = false, title = "Sunder Masala" }) {
  return (
    <Image
      src="/sundar-logo.png"
      alt={title}
      width={397}
      height={294}
      className={className}
      priority={priority}
    />
  );
}
