import { Pinch, Star } from "@/components/spice-icons";
import Backdrop from "@/components/backdrop";
import Bilingual, { DevaWatermark } from "@/components/bilingual";

/* deterministic scatter fields */
const seeded = (n, seed) =>
  Array.from({ length: n }, (_, i) => {
    const a = Math.sin(seed + i * 12.9898) * 43758.5453;
    const b = Math.sin(seed + i * 78.233) * 12345.6789;
    return { x: ((a - Math.floor(a)) * 100).toFixed(2), y: ((b - Math.floor(b)) * 100).toFixed(2) };
  });

const FISTFUL = seeded(150, 3);
const PINCH = seeded(11, 17);

export default function Chutki() {
  return (
    <section id="chutki" className="tex-paper relative overflow-hidden bg-cream section">
      <Backdrop field="margins" opacity={0.15} ornamentClass="text-rani/25" />
      <DevaWatermark word="चुटकी" className="text-rani-ink" position="right" opacity={0.07} />

      <div className="shell relative">
        <p
          className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
          data-reveal="up"
          style={{ "--plaque-bg": "var(--color-cobalt)", "--plaque-fg": "var(--color-paper)" }}
        >
          <Star className="w-3.5" />
          Ek chutki ki baat
        </p>

        <Bilingual
          className="mt-4 max-w-5xl"
          data-reveal="up"
          hi="मुट्ठी भर नहीं — बस एक चुटकी।"
          en={
            <>
              <span className="text-ink">It was never a fistful.</span>
              <br />
              <span className="text-drop text-rani-ink" style={{ "--drop": "var(--color-marigold)" }}>
                It was one chutki.
              </span>
            </>
          }
        />

        <p
          className="lede mt-5 max-w-2xl text-ink-soft"
          data-reveal="up"
          style={{ "--reveal-delay": "160ms" }}
        >
          A single pinch of the right masala does what a spoonful of the wrong one never could.
          We called it magic as kids. It was just{" "}
          <span className="brush font-semibold">less is more</span>.
        </p>

        {/* comparison */}
        <div className="section-body grid gap-5 md:grid-cols-2 md:gap-6">
          {/* fistful */}
          <figure
            className="card-poster card-pad group relative overflow-hidden bg-sand/60" style={{ "--card-shadow": "var(--color-clay)" }}
            data-reveal="left"
          >
            <figcaption className="flex items-baseline justify-between gap-4">
              <span className="h-poster-xs text-ink-mute">A fistful</span>
              <span className="chip border-ink/25 text-ink-mute">Heavy · flat</span>
            </figcaption>

            <div className="relative mt-7 h-52 sm:h-60" aria-hidden="true">
              {FISTFUL.map((p, i) => (
                <span
                  key={i}
                  className="absolute h-[5px] w-[5px] rounded-full bg-ink/25"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                />
              ))}
              <div className="absolute inset-0 grid place-content-center">
                <span className="font-poster text-[3.4rem] leading-none text-clay/45 sm:text-[4.6rem]">
                  Too much
                </span>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-copy text-ink-soft">
              More powder does not mean more flavour. It means more dust, more bitterness, and a
              dish that tastes of the packet instead of the produce.
            </p>
          </figure>

          {/* pinch */}
          <figure
            className="card-poster card-pad group relative overflow-hidden bg-forest text-ghee"
            data-reveal="right"
            style={{ "--reveal-delay": "120ms" }}
          >
            <div className="tex-sunburst-warm pointer-events-none absolute inset-0" />

            <figcaption className="relative flex items-baseline justify-between gap-4">
              <span className="h-poster-xs text-marigold">One chutki</span>
              <span className="chip border-marigold/50 text-marigold">Precise · alive</span>
            </figcaption>

            <div className="relative mt-7 h-52 sm:h-60" aria-hidden="true">
              <Pinch className="absolute left-1/2 top-0 w-28 -translate-x-1/2 text-marigold sm:w-32" strokeWidth={1.3} />
              {PINCH.map((p, i) => (
                <span
                  key={i}
                  className="anim-sprinkle absolute h-[5px] w-[5px] rounded-full bg-marigold"
                  style={{
                    left: `${30 + Number(p.x) * 0.4}%`,
                    top: "42%",
                    "--delay": `${(i % 5) * 0.42}s`,
                    "--dur": "2.8s",
                  }}
                />
              ))}
              <span className="absolute inset-x-0 bottom-2 text-center font-poster text-[2.6rem] leading-none text-marigold/85 sm:text-[3.2rem]">
                Exactly right
              </span>
            </div>

            <p className="relative mt-5 max-w-sm text-copy text-ghee/70">
              Ground fine and fresh, the right blend blooms in two seconds of hot fat. You need
              less of it — which is, inconveniently for us, the whole point.
            </p>
          </figure>
        </div>

        {/* payoff band */}
        <div
          className="card-poster card-pad dotty mt-5 flex flex-col items-start justify-between gap-5 bg-rani text-paper sm:flex-row sm:items-center" style={{ "--card-shadow": "var(--color-cobalt)" }}
          data-reveal="up"
        >
          <p className="h-poster-xs max-w-md text-balance">
            That magic pinch had a name.
            <br />
            <span className="text-marigold">We just never read the label.</span>
          </p>
          <p className="font-deva shrink-0 text-copy-lg text-marigold">कम मसाला, पूरा स्वाद</p>
        </div>
      </div>
    </section>
  );
}
