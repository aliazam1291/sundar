/**
 * Bilingual section headline.
 *
 * The Devanagari is not a translation footnote — it leads, set large in Baloo
 * above the English poster line, the way a hoarding or a lorry tailgate reads.
 * English carries the meaning for everyone else; Hindi carries the voice.
 */
export default function Bilingual({
  hi,
  en,
  accent = "text-rani-ink",
  size = "poster",
  className = "",
  children,
  ...rest
}) {
  const head = size === "poster" ? "h-poster" : size === "sm" ? "h-poster-sm" : "h-editorial";

  return (
    <div className={className} {...rest}>
      <p
        className={`font-deva leading-[1.15] ${accent}`}
        style={{ fontSize: "clamp(1.35rem, 2.6vw, 2.1rem)" }}
        lang="hi"
      >
        {hi}
      </p>
      <h2 className={`${head} mt-1.5`}>{en}</h2>
      {children}
    </div>
  );
}

/**
 * Huge Devanagari set as a background wash — one word, bleeding off the edge,
 * barely there. Depth without another illustration.
 */
export function DevaWatermark({
  word,
  className = "",
  position = "right",
  opacity = 0.07,
}) {
  /* Sits fully inside the section. Bleeding it off the edge sliced glyphs
     mid-stroke, which reads as broken text rather than a deliberate crop. */
  const place =
    position === "right"
      ? { right: "3%", top: "8%" }
      : position === "left"
        ? { left: "3%", top: "10%" }
        : { left: "50%", top: "12%", transform: "translateX(-50%)" };

  return (
    <p
      aria-hidden="true"
      lang="hi"
      className={`font-deva pointer-events-none absolute select-none whitespace-nowrap leading-none ${className}`}
      style={{ ...place, fontSize: "clamp(4.5rem, 13vw, 11rem)", opacity }}
    >
      {word}
    </p>
  );
}
