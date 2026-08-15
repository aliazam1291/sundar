import Link from "next/link";
import { FOUNDER } from "@/lib/content";
import { Star, SpiceIcon } from "@/components/spice-icons";

/**
 * The story, as a trailer.
 *
 * The full film reel lives on /story. It used to render on the home page too —
 * the same ~1400px of chapters twice, with the founder card appearing on a
 * landing page before anyone had asked who he was. This is the one-beat
 * version that sends people to the real thing.
 */
export default function StoryTeaser() {
  return (
    <section className="relative isolate overflow-hidden bg-reel section text-ivory">
      {/* film grain */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.09] mix-blend-screen"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <filter id="teaserGrain">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="9" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#teaserGrain)" />
      </svg>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(110% 75% at 50% 45%, transparent 45%, rgba(0,0,0,0.7) 100%)" }}
        aria-hidden="true"
      />

      {/* letterbox */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-5 bg-black sm:h-7" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-5 bg-black sm:h-7" aria-hidden="true" />

      <div className="shell relative grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div data-reveal="up">
          <p className="label-micro text-dune/70">A film in one reel</p>
          <p
            className="font-poster text-drop mt-3 text-[clamp(4rem,12vw,9rem)] leading-[0.85] text-terracotta"
            style={{ "--drop": "var(--color-sepia)" }}
          >
            1975
          </p>
          <p className="font-deva mt-3 text-copy-lg text-ivory/60" lang="hi">
            भारत · India
          </p>
        </div>

        <div data-reveal="up" style={{ "--reveal-delay": "120ms" }}>
          <p className="font-editorial text-[clamp(1.6rem,3.6vw,2.75rem)] italic leading-[1.1] text-ivory">
            Purani recipe. Nayi pehchaan.
          </p>

          <p className="mt-5 max-w-md text-copy-lg text-ivory/65">
            1975, Indore — a cycle shop, and then a life in masala. {FOUNDER.name} started Sunder
            on one belief: the masala that reaches other homes should be the one used in his own.
            Fifty years and three generations on, that belief hasn&rsquo;t moved — real
            ingredients, no fillers, no shortcuts, still hand-pounded and slow-ground the way the
            family always has.
          </p>

          <div className="rule-dots mt-7 max-w-xs text-terracotta/50" aria-hidden="true" />

          <p className="label-micro mt-5 text-terracotta-2">
            {FOUNDER.name} · {FOUNDER.role}
          </p>

          <Link href="/story" className="btn btn-ghost mt-7 border-ivory/40 text-ivory">
            <SpiceIcon mono name="chakki" className="w-4" />
            Watch the reel
            <Star className="w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
