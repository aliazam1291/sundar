import Link from "next/link";
import { FOUNDER } from "@/lib/content";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import PagePortrait from "@/components/page-portrait";

/**
 * The story, as a trailer.
 *
 * The full film reel lives on /story. It used to render on the home page too —
 * the same ~1400px of chapters twice, with the founder card appearing on a
 * landing page before anyone had asked who he was. This is the one-beat
 * version that sends people to the real thing.
 *
 * Painted as a lorry panel, not as a film frame. The previous version was a
 * sepia reel — black letterbox bars, grain, a vignette, terracotta on near-
 * black — which is a whole second visual language dropped between two
 * truck-art sections, and on the home page it read as a different site. The
 * beat it carries (one year, one line, one man) survives; the grade does not.
 *
 * It also drops the `text-ivory/70`-style fades that version leaned on. Per
 * the README, faded type over a saturated ground blends toward that ground
 * and quietly fails contrast — every value here is a solid palette colour,
 * measured on oxblood: ghee 8.84, marigold 7.37, paper 10.66.
 *
 * The ground is oxblood rather than forest because the section directly
 * follows the horn, which is painted derbyshire. Forest against derbyshire
 * measures dE 19.6 — the closest pair of grounds on the site by a distance,
 * both dark greens — so with no trim between them the two sections ran
 * together as one long green band. Oxblood against derbyshire is dE 66.6.
 */
export default function StoryTeaser() {
  return (
    <section className="relative isolate overflow-hidden bg-oxblood section text-ghee">
      <Sunburst
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-marigold"
        rays={52}
        opacity={0.1}
      />
      <div className="tex-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />

      {/* The chakki is the one prop worth keeping from the reel — it is the
          object the whole story is about. Sized off the viewport so it scales
          out of the way on a phone instead of sitting under the headline. */}
      <SpiceIcon
        mono
        name="chakki"
        className="pointer-events-none absolute -right-14 bottom-4 w-[min(26rem,55vw)] text-marigold opacity-[0.08]"
      />

      <div className="shell relative grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div data-reveal="up">
          <p
            className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
            style={{ "--plaque-bg": "var(--color-marigold)", "--plaque-fg": "var(--color-ink)" }}
          >
            <Star className="w-3.5" />
            A film in one reel
          </p>

          <p
            className="font-poster text-drop mt-5 text-[clamp(4rem,12vw,9rem)] leading-[0.85] text-marigold"
            style={{ "--drop": "var(--color-ink)" }}
          >
            1975
          </p>

          <p className="font-deva mt-3 text-copy-lg text-ghee" lang="hi">
            भारत · India
          </p>

          <div className="rule-dots mt-6 max-w-[12rem] text-marigold/45" aria-hidden="true" />

          {/* Rameshji again, the same cutout /story opens with — not a second
              character, the same one. The home page used to go quiet on the
              illustrated cast after the hero: five sections of pure poster
              graphics with nobody in them, then an inner page suddenly
              reintroducing a person, which is what read as "a different
              site" partway through a single visit. This is the smallest fix
              that isn't that: no new art, no new visual language (the
              sepia-reel version this section replaced was the mistake of
              inventing one) — just the existing family appearing more than
              once on the way to their own page. */}
          {/* Used exactly as /story uses it — same image, same component,
              same default sizing — capped to a smaller max-width so it reads
              as a supporting note in this compact teaser rather than a
              second masthead. Hidden below `sm`: at that width the column
              is already full-bleed and a 28rem-capped figure would crowd the
              numeral above it rather than sit beside it. */}
          <div className="mt-8 hidden max-w-[11rem] sm:block lg:max-w-[13rem]">
            <PagePortrait
              src="/rameshji-glow.webp"
              alt="Rameshji savouring the masala"
              width={933}
              height={1400}
              tone="glow"
              name="Rameshji"
              plaqueBg="var(--color-marigold)"
              side="right"
            />
          </div>
        </div>

        <div data-reveal="up" style={{ "--reveal-delay": "120ms" }}>
          <p className="font-editorial text-[clamp(1.6rem,3.6vw,2.75rem)] italic leading-[1.15] text-paper">
            Purani Recipe. <span className="text-marigold">Nayi Pehchaan.</span>
          </p>

          <p className="mt-5 max-w-lg text-copy-lg text-ghee">
            1975. Indore. Ek cycle ki dukaan. Aur phir masalon ka kaam.
          </p>

          {/* Two paragraphs, not one run-on — matches how it reads on /story,
              and keeps {FOUNDER.name} its own sentence so a line-wrapped JSX
              expression can never again swallow the space after it (see the
              git history on this file for exactly that bug). */}
          <p className="mt-4 max-w-lg text-copy text-ghee">
            {FOUNDER.name} started Sunder with a simple belief: gharon tak wahi masala jaana
            chahiye jo apne ghar mein bhi use kiya jaye.
          </p>
          <p className="mt-4 max-w-lg text-copy text-ghee">
            Fifty years and three generations later, the belief hasn&rsquo;t changed: real
            ingredients, no fillers, no shortcuts.
          </p>
          <p className="mt-4 max-w-lg text-copy text-ghee">
            What&rsquo;s changed is how far that spice travels. From one Indore kitchen to homes
            across India, we still hand-pound and slow-grind the way the family always has,
            because that&rsquo;s the only way heritage masala is supposed to taste.
          </p>

          <p
            className="mt-7 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 border-s-4 border-marigold ps-4 text-label font-semibold uppercase tracking-[0.18em] text-marigold"
          >
            {FOUNDER.name}
            <span className="text-ghee">· {FOUNDER.role}</span>
          </p>

          <div className="mt-8">
            <Link href="/story" className="btn btn-gold">
              <SpiceIcon mono name="chakki" className="w-4" />
              Read the full story
              <Star className="w-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
