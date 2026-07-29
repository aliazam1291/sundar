import { Flame } from "@/components/spice-icons";

const LABELS = ["No heat", "Whisper", "Gentle", "Warm", "Sharp", "Ferocious"];

/** Five-chilli heat meter. */
export default function HeatScale({ level = 0, className = "", showLabel = true, size = "w-4" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="flex gap-0.5" role="img" aria-label={`Heat ${level} of 5 — ${LABELS[level]}`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Flame
            key={i}
            className={`${size} transition-opacity ${i < level ? "opacity-100" : "opacity-20"}`}
            strokeWidth={i < level ? 2 : 1.4}
          />
        ))}
      </span>
      {showLabel ? (
        <span className="text-micro font-semibold uppercase tracking-[0.16em] opacity-70">
          {LABELS[level]}
        </span>
      ) : null}
    </div>
  );
}
