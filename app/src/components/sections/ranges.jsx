import Link from "next/link";
import { RANGE_LIST, productsByRange } from "@/lib/products";
import { SpiceIcon, Star, Sunburst } from "@/components/spice-icons";

export default function Ranges() {
  return (
    <section id="ranges" className="relative bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal="up">
            <p className="eyebrow flex items-center gap-2.5 text-chilli">
              <Star className="w-3.5" />
              Three ranges, three appetites
            </p>
            <h2 className="h-editorial mt-4 max-w-2xl text-ink">
              One spice box does not fit every night of the week.
            </h2>
          </div>
          <Link href="/shop" className="btn shrink-0" data-reveal="up" style={{ "--reveal-delay": "100ms" }}>
            See all 18 blends
          </Link>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {RANGE_LIST.map((range, i) => {
            const count = productsByRange(range.id).length;
            const dark = range.id !== "regions";

            return (
              <Link
                key={range.id}
                href={`/shop?range=${range.id}`}
                data-reveal="up"
                style={{ "--reveal-delay": `${i * 110}ms`, background: range.bg, color: range.ink }}
                className="card-lift group relative isolate flex min-h-[27rem] flex-col justify-between overflow-hidden rounded-[1.6rem] border-2 border-ink p-7 sm:p-9"
              >
                <Sunburst
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%] w-full"
                  rays={40}
                  opacity={dark ? 0.13 : 0.16}
                />

                <SpiceIcon
                  name={range.icon}
                  className="pointer-events-none absolute -bottom-8 -right-6 w-52 opacity-[0.14] transition-transform duration-700 group-hover:-translate-y-3 group-hover:rotate-6"
                />

                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <span className="chip border-current/40 opacity-75">{range.who}</span>
                    <SpiceIcon name={range.icon} className="w-8 opacity-80" />
                  </div>

                  <h3 className="font-poster mt-7 text-[3.1rem] leading-[0.86] sm:text-[3.6rem]">
                    {range.name}
                  </h3>

                  <p className="mt-4 max-w-xs text-[1rem] leading-relaxed opacity-80">
                    {range.blurb}
                  </p>
                </div>

                <div className="relative mt-10">
                  <p className="font-editorial text-[1.2rem] italic opacity-90">“{range.line}”</p>

                  <div className="mt-6 flex items-center justify-between border-t border-current/25 pt-5">
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] opacity-70">
                      {count} blends
                    </span>
                    <span className="flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.14em] transition-transform duration-300 group-hover:translate-x-1.5">
                      Explore
                      <svg viewBox="0 0 24 24" className="w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12h15M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
