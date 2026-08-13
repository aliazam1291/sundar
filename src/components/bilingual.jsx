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
  /* Defaults to h2 because most uses are section headings. A page masthead
     has to pass as="h1" — a page with no h1 is a real accessibility and
     search problem, and this component is the masthead on several of them. */
  as: Heading = "h2",
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
      <Heading className={`${head} mt-1.5`}>{en}</Heading>
      {children}
    </div>
  );
}

/**
 * A Devanagari run sitting inside a Latin label.
 *
 * The uppercase label styles carry heavy letter-spacing, and letter-spacing
 * applied to Devanagari pushes the matras off the consonants they belong to —
 * "संस्थापक" comes out as "सं स्था प क". `uppercase` does nothing for the
 * script either. Reset both and set it in its own face.
 */
export function Deva({ children, className = "" }) {
  return (
    <span lang="hi" className={`font-deva normal-case tracking-normal ${className}`}>
      {children}
    </span>
  );
}

/* A run of Devanagari, plus any spaces holding two such words together. */
const DEVA_RUN = /([ऀ-ॿ]+(?:\s+[ऀ-ॿ]+)*)/;

/**
 * A label whose own string mixes scripts — "Indore · भारत", "वर्ष · years".
 * The content keeps them as one string because they read as one line, so
 * split the Devanagari runs back out here and set each one properly. Without
 * this the surrounding tracked label shreds the Hindi; see [Deva].
 */
export function MixedLabel({ text }) {
  return text
    .split(DEVA_RUN)
    .filter(Boolean)
    .map((part, i) =>
      DEVA_RUN.test(part) ? <Deva key={i}>{part}</Deva> : <span key={i}>{part}</span>,
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
