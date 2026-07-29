import Link from "next/link";
import { REGIONS } from "@/lib/content";
import { Star, SpiceIcon } from "@/components/spice-icons";
import Backdrop from "@/components/backdrop";
import { DevaWatermark } from "@/components/bilingual";

/* Stylised silhouette — illustrative, not cartographic. */
const INDIA =
  "M31 6C25 10 22 15 24 19c-6 3-12 7-14 13-4 4-6 9-3 13 4 5 9 7 13 11 4 6 6 14 10 22 4 10 8 19 13 27 2 3 4 3 6-1 4-10 7-20 9-30 2-8 4-14 6-19 4-5 6-9 4-13 4-2 10-2 14-6 4-3 6-6 3-9-5-2-11 0-15-1-6-1-12-2-18-3-6-2-12-5-16-10-2-4-3-7-5-7Z";

export default function RegionMap() {
  return (
    <section id="regions" className="relative overflow-hidden bg-cobalt section text-paper">
      <Backdrop field="margins" tone="mono" opacity={0.11} ornamentClass="text-marigold/25" />
      <DevaWatermark word="भारत" className="text-sky" position="left" opacity={0.1} />

      <div className="shell relative">
        <div className="max-w-2xl" data-reveal="up">
          <p className="plaque tilt-tag label-micro inline-flex items-center gap-2.5" style={{ "--plaque-bg": "var(--color-marigold)", "--plaque-fg": "var(--color-ink)" }}>
            <Star className="w-3.5" />
            Apna region, apni thali
          </p>
          <h2 className="h-editorial mt-4 text-paper">
            Every region has a hero dish. Each one has a masala hiding behind it.
          </h2>
          <p className="lede mt-5 max-w-xl text-sky">
            We go to the city, learn the blend from the people who argue about it, and put their
            proportions on the shelf. Eight so far.
          </p>
        </div>

        <div className="section-body grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* map */}
          <div className="relative mx-auto w-full max-w-[380px] lg:max-w-none" data-reveal="scale">
            <div className="relative aspect-[100/120] w-full">
              <svg viewBox="0 0 100 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <defs>
                  <pattern id="mapDots" width="3.2" height="3.2" patternUnits="userSpaceOnUse">
                    <circle cx="1.6" cy="1.6" r="0.42" fill="var(--color-marigold)" opacity="0.8" />
                  </pattern>
                </defs>
                <path d={INDIA} fill="var(--color-cobalt-2)" stroke="var(--color-marigold)" strokeWidth="1" strokeLinejoin="round" />
                <path d={INDIA} fill="url(#mapDots)" />
              </svg>

              {/* pins */}
              {REGIONS.map((r, i) => (
                <Link
                  key={r.id}
                  href={`/shop/${r.slug}`}
                  className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${r.x}%`, top: `${r.y}%` }}
                  aria-label={`${r.city} — ${r.blend}`}
                >
                  <span className="relative block">
                    {r.home ? (
                      <span className="anim-ring absolute -inset-2 rounded-full border-2 border-chilli" />
                    ) : null}
                    <span
                      className={`block rounded-full border-2 border-ink transition-transform duration-300 group-hover:scale-150 ${
                        r.home ? "h-3.5 w-3.5 bg-chilli" : "h-2.5 w-2.5 bg-saffron"
                      }`}
                      style={{ "--reveal-delay": `${i * 70}ms` }}
                    />
                  </span>

                  {/* tooltip */}
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2.5 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border-2 border-ink bg-forest px-2.5 py-1.5 text-micro font-semibold uppercase tracking-[0.1em] text-ghee opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block">
                    {r.city}
                  </span>
                </Link>
              ))}
            </div>

            <p className="label-micro mt-4 text-center text-sky">
              Stylised · not to scale
            </p>
          </div>

          {/* list */}
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {REGIONS.map((r, i) => (
              <li key={r.id} data-reveal="up" style={{ "--reveal-delay": `${(i % 4) * 70}ms` }}>
                <Link
                  href={`/shop/${r.slug}`}
                  className="card-pad-sm group flex h-full items-start gap-3.5 rounded-[1.1rem] border-2 border-ink bg-cream transition-all hover:-translate-y-1 hover:shadow-[5px_5px_0_var(--color-marigold)]"
                >
                  <span
                    className={`mt-1 grid h-8 w-8 shrink-0 place-content-center rounded-full text-paper ${
                      r.home ? "bg-chilli" : "bg-forest"
                    }`}
                  >
                    <SpiceIcon mono name={r.home ? "pinch" : "chilli"} className="w-4" />
                  </span>

                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-poster text-[1.15rem] leading-none text-ink">
                        {r.city}
                      </span>
                      {r.home ? (
                        <span className="rounded-full bg-chilli px-2 py-0.5 text-micro font-bold uppercase tracking-[0.14em] text-paper">
                          Home
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-label text-ink-soft">
                      {r.dish} · {r.state}
                    </span>
                    <span className="mt-2 block font-editorial text-copy italic text-ink-soft">
                      {r.note}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-micro font-bold uppercase tracking-[0.13em] text-saffron-ink transition-transform duration-300 group-hover:translate-x-1">
                      {r.blend}
                      <svg viewBox="0 0 24 24" className="w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h13M12 6l6 6-6 6" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
