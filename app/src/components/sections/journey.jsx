import Link from "next/link";
import { JOURNEY, FOUNDER } from "@/lib/content";
import { Star, SpiceIcon } from "@/components/spice-icons";

/**
 * "A Heritage Film", as a scroll reel.
 * Pitch black, sepia, type-led — a deliberate tonal break from the poppy
 * sections either side of it.
 */
export default function Journey() {
  return (
    <section id="journey" className="relative isolate overflow-hidden bg-reel text-ivory">
      {/* film grain */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.09] mix-blend-screen" aria-hidden="true" preserveAspectRatio="none">
        <filter id="reelGrain">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="9" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#reelGrain)" />
      </svg>

      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 50% 45%, transparent 45%, rgba(0,0,0,0.72) 100%)" }}
      />

      {/* letterbox */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-7 bg-black sm:h-9" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-7 bg-black sm:h-9" />

      <div className="relative mx-auto max-w-[1200px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        {/* title card */}
        <header className="text-center" data-reveal="up">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.55em] text-dune/60">
            MMXXVI · A film in one reel
          </p>

          <h2 className="font-poster mt-9 text-[clamp(4.5rem,17vw,13rem)] leading-[0.82] text-terracotta">
            1975
          </h2>

          <p className="font-mono mt-5 text-[0.7rem] uppercase tracking-[0.42em] text-ivory/50">
            भारत · India
          </p>

          <div className="mx-auto mt-12 max-w-md">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-dune/50">
              His name
            </p>
            <p className="font-editorial mt-3 text-[clamp(1.5rem,4vw,2.4rem)] leading-tight text-ivory">
              {FOUNDER.name}
            </p>
            <p className="font-mono mt-3 text-[0.62rem] uppercase tracking-[0.34em] text-terracotta-2">
              {FOUNDER.role} · {FOUNDER.roleHi}
            </p>
          </div>
        </header>

        {/* chapters */}
        <ol className="mt-28 space-y-28 lg:mt-36 lg:space-y-36">
          {JOURNEY.map((ch) => (
            <li key={ch.id} className="relative">
              {/* chapter numeral */}
              <div className="mb-8 flex items-baseline gap-5" data-reveal="up">
                <span className="font-poster text-outline text-[2.6rem] leading-none text-terracotta/70">
                  {ch.chapter}
                </span>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.42em] text-dune/55">
                  {ch.label}
                </span>
                <span className="ml-auto font-mono text-[0.62rem] tracking-[0.3em] text-ivory/35">
                  {ch.year}
                </span>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-terracotta/45 via-ivory/12 to-transparent" />

              {/* lines */}
              <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
                <div>
                  {ch.lines.map((line, i) => (
                    <p
                      key={i}
                      data-reveal="up"
                      style={{ "--reveal-delay": `${i * 170}ms` }}
                      className={`font-editorial italic leading-[1.04] ${
                        ch.negative ? "text-ivory/55" : "text-ivory"
                      } ${
                        ch.lines.length > 2
                          ? "text-[clamp(1.7rem,4.6vw,3.1rem)]"
                          : "text-[clamp(2.1rem,6vw,4.4rem)]"
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <div className="lg:pt-3" data-reveal="up" style={{ "--reveal-delay": "260ms" }}>
                  {ch.devanagari ? (
                    <>
                      <p className="font-deva text-[clamp(1.5rem,4vw,2.3rem)] leading-snug text-terracotta">
                        {ch.body}
                      </p>
                      <p className="font-mono mt-4 text-[0.7rem] uppercase tracking-[0.28em] text-ivory/45">
                        {ch.bodyEn}
                      </p>
                    </>
                  ) : (
                    <p className="text-[1.02rem] leading-relaxed text-ivory/62">{ch.body}</p>
                  )}

                  <p className="font-mono mt-6 text-[0.6rem] uppercase tracking-[0.34em] text-terracotta-2/80">
                    {ch.meta}
                  </p>
                </div>
              </div>

              {/* the years strip */}
              {ch.marks ? (
                <div
                  className="no-scrollbar mt-12 flex gap-8 overflow-x-auto border-y border-ivory/12 py-6"
                  data-reveal="up"
                >
                  {ch.marks.map((m, i) => (
                    <span
                      key={m}
                      className={`font-poster shrink-0 text-[1.9rem] leading-none transition-colors sm:text-[2.4rem] ${
                        i === ch.marks.length - 1 ? "text-terracotta" : "text-ivory/30"
                      }`}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ol>

        {/* end card */}
        <footer className="mt-32 border-t border-ivory/12 pt-16 text-center" data-reveal="up">
          <p className="font-editorial text-[clamp(1.4rem,3.4vw,2rem)] italic text-ivory/80">
            For every kitchen. For every generation.
          </p>

          <div className="mt-12 flex items-center justify-center gap-4">
            <SpiceIcon name="chakki" className="w-8 text-terracotta" />
            <span className="font-poster text-[clamp(2.6rem,8vw,4.6rem)] leading-none text-ivory">
              Sunder
            </span>
            <SpiceIcon name="chakki" className="w-8 -scale-x-100 text-terracotta" />
          </div>

          <p className="font-mono mt-4 text-[0.66rem] uppercase tracking-[0.7em] text-ivory/50">
            Spices
          </p>
          <p className="font-mono mt-3 text-[0.6rem] uppercase tracking-[0.6em] text-dune/45">
            Since · 1975
          </p>

          <Link href="/story" className="btn btn-ghost mt-11 border-ivory/40 text-ivory">
            <Star className="w-3.5" />
            Read the full story
          </Link>
        </footer>
      </div>
    </section>
  );
}
