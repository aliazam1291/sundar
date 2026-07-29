import { Star } from "@/components/spice-icons";

/**
 * CSS-only infinite ticker. The track is duplicated once and translated by
 * exactly 100% + gap, so the loop is seamless with zero JS.
 */
export default function Marquee({
  items,
  speed = 34,
  gap = "2.5rem",
  reverse = false,
  className = "",
  itemClassName = "",
  separator = true,
}) {
  const track = (
    <div className="marquee__track" aria-hidden="false">
      {items.map((item, i) => (
        <span key={i} className={`flex shrink-0 items-center gap-[var(--gap)] ${itemClassName}`}>
          <span>{item}</span>
          {separator ? <Star className="w-3 shrink-0 opacity-60" /> : null}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee ${reverse ? "marquee--reverse" : ""} ${className}`}
      style={{ "--gap": gap, "--dur": `${speed}s` }}
    >
      {track}
      <div className="marquee__track" aria-hidden="true">
        {items.map((item, i) => (
          <span key={i} className={`flex shrink-0 items-center gap-[var(--gap)] ${itemClassName}`}>
            <span>{item}</span>
            {separator ? <Star className="w-3 shrink-0 opacity-60" /> : null}
          </span>
        ))}
      </div>
    </div>
  );
}
