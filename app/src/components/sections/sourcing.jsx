import { PILLARS } from "@/lib/content";
import { SpiceIcon, Star, Sunburst } from "@/components/spice-icons";

export default function Sourcing() {
  return (
    <section id="sourcing" className="relative isolate overflow-hidden bg-oxblood py-20 text-paper lg:py-28">
      <Sunburst
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-marigold"
        rays={48}
        opacity={0.09}
      />
      <div className="tex-grid pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div data-reveal="up">
            <p className="eyebrow flex items-center gap-2.5 text-marigold">
              <Star className="w-3.5" />
              Provenance is the flex
            </p>
            <h2 className="h-poster-sm mt-5 text-paper">
              We name the
              <br />
              <span className="text-marigold">district.</span>
            </h2>
            <p className="lede mt-6 max-w-md text-paper/72">
              Spice is produce, not powder. Where it grew, when it was picked and how cool it was
              milled decide everything — so all three go on the pack.
            </p>

            <div className="mt-9 inline-flex items-center gap-3 rounded-full border border-marigold/40 px-5 py-3">
              <SpiceIcon name="sprig" className="w-5 text-marigold" />
              <span className="text-[0.78rem] font-semibold uppercase tracking-[0.14em]">
                Bought at source since 2003
              </span>
            </div>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                data-reveal="up"
                style={{ "--reveal-delay": `${i * 90}ms` }}
                className="group rounded-[1.4rem] border border-paper/18 bg-paper/[0.055] p-6 transition-colors hover:border-marigold/55 hover:bg-paper/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <SpiceIcon
                    name={p.icon}
                    className="w-9 text-marigold transition-transform duration-500 group-hover:-rotate-12"
                  />
                  <div className="text-right">
                    <span className="font-poster block text-[1.8rem] leading-none text-paper">
                      {p.stat}
                    </span>
                    <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.15em] text-paper/50">
                      {p.statLabel}
                    </span>
                  </div>
                </div>

                <dt className="font-editorial mt-6 text-[1.24rem] leading-tight text-paper">
                  {p.title}
                </dt>
                <dd className="mt-2.5 text-[0.92rem] leading-relaxed text-paper/65">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
