import { Pinch, Star } from "@/components/spice-icons";

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
    <section id="chutki" className="tex-paper relative overflow-hidden bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <p className="eyebrow flex items-center gap-2.5 text-chilli-ink" data-reveal="up">
          <Star className="w-3.5" />
          The revelation
        </p>

        <h2 className="h-poster mt-5 max-w-5xl" data-reveal="up" style={{ "--reveal-delay": "80ms" }}>
          <span className="text-ink">It was never a fistful.</span>
          <br />
          <span className="text-saffron-deep">It was one chutki.</span>
        </h2>

        <p
          className="lede mt-7 max-w-2xl text-ink/70"
          data-reveal="up"
          style={{ "--reveal-delay": "160ms" }}
        >
          A single pinch of the right masala does what a spoonful of the wrong one never could.
          We called it magic as kids. It was just{" "}
          <span className="brush font-semibold">less is more</span>.
        </p>

        {/* comparison */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 md:gap-6">
          {/* fistful */}
          <figure
            className="group relative overflow-hidden rounded-[1.6rem] border-2 border-ink/15 bg-sand/50 p-7 sm:p-9"
            data-reveal="left"
          >
            <figcaption className="flex items-baseline justify-between gap-4">
              <span className="font-poster text-[1.7rem] leading-none text-ink/45">A fistful</span>
              <span className="chip border-ink/25 text-ink/45">Heavy · flat</span>
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
                <span className="font-poster text-[3.4rem] leading-none text-ink/12 sm:text-[4.6rem]">
                  Too much
                </span>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-[0.95rem] text-ink/55">
              More powder does not mean more flavour. It means more dust, more bitterness, and a
              dish that tastes of the packet instead of the produce.
            </p>
          </figure>

          {/* pinch */}
          <figure
            className="group relative overflow-hidden rounded-[1.6rem] border-2 border-ink bg-forest p-7 text-ghee shadow-[8px_8px_0_var(--color-saffron)] sm:p-9"
            data-reveal="right"
            style={{ "--reveal-delay": "120ms" }}
          >
            <div className="tex-sunburst-warm pointer-events-none absolute inset-0" />

            <figcaption className="relative flex items-baseline justify-between gap-4">
              <span className="font-poster text-[1.7rem] leading-none text-marigold">One chutki</span>
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

            <p className="relative mt-5 max-w-sm text-[0.95rem] text-ghee/70">
              Ground fine and fresh, the right blend blooms in two seconds of hot fat. You need
              less of it — which is, inconveniently for us, the whole point.
            </p>
          </figure>
        </div>

        {/* payoff band */}
        <div
          className="mt-6 flex flex-col items-start justify-between gap-5 rounded-[1.6rem] bg-oxblood px-7 py-8 text-paper sm:flex-row sm:items-center sm:px-10"
          data-reveal="up"
        >
          <p className="h-poster-sm max-w-2xl">
            That magic pinch had a name.
            <br />
            <span className="text-marigold">We just never read the label.</span>
          </p>
          <p className="font-deva shrink-0 text-lg text-marigold">कम मसाला, पूरा स्वाद</p>
        </div>
      </div>
    </section>
  );
}
