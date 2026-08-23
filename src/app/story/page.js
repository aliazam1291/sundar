import Link from "next/link";
import Journey from "@/components/sections/journey";
import Sourcing from "@/components/sections/sourcing";
import ChakkiMill from "@/components/sections/chakki-mill";
import HeritageFilm from "@/components/heritage-film";
import { Journal } from "@/components/sections/ritual";
import { TIMELINE, FOUNDER } from "@/lib/content";
import { PRODUCTS } from "@/lib/products";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";

export const metadata = {
  title: "Our story — purani recipe, nayi pehchaan",
  description: `1975, Indore. A cycle shop, and then a life in masala. Fifty years and three generations later — real ingredients, no fillers, no shortcuts, across ${PRODUCTS.length} blends.`,
};

export default function StoryPage() {
  return (
    <>
      {/* header */}
      <section className="relative isolate overflow-hidden bg-oxblood section text-paper">
        <Sunburst
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-marigold"
          rays={52}
          opacity={0.1}
        />
        <div className="relative shell">
          <p className="eyebrow flex items-center gap-2.5 text-marigold">
            <Star className="w-3.5" />
            Est. 1975 · MCMLXXV
          </p>

          <h1 className="h-poster mt-5 max-w-4xl">
            Purani Recipe.
            <br />
            <span className="text-marigold">Nayi Pehchaan.</span>
          </h1>

          <p className="lede mt-6 max-w-2xl text-paper/85">
            1975. Indore. Ek cycle ki dukaan. Aur phir masalon ka kaam.
          </p>

          <div className="mt-6 grid max-w-4xl gap-5 text-copy-lg leading-relaxed text-paper/75 lg:grid-cols-2 lg:gap-x-12">
            <p>
              {FOUNDER.name} started Sunder with a simple belief: gharon tak wahi masala jaana
              chahiye jo apne ghar mein bhi use kiya jaye.
            </p>
            <p>
              Fifty years and three generations later, the belief hasn&rsquo;t changed: real
              ingredients, no fillers, no shortcuts.
            </p>
            <p className="lg:col-span-2 lg:max-w-3xl">
              What&rsquo;s changed is how far that spice travels. From one Indore kitchen to homes
              across India, we still hand-pound and slow-grind the way the family always has,
              because that&rsquo;s the only way heritage masala is supposed to taste.
            </p>
          </div>
        </div>
      </section>

      <HeritageFilm />

      {/* the film reel */}
      <Journey />

      {/* grind it yourself */}
      <ChakkiMill />

      {/* the making */}
      <section className="tex-paper bg-cream section">
        <div className="shell">
          <div className="max-w-2xl" data-reveal="up">
            <p className="eyebrow flex items-center gap-2.5 text-chilli-ink">
              <Star className="w-3.5" />
              The making
            </p>
            <h2 className="h-editorial mt-4 text-ink">
              Five decisions that changed how it tastes.
            </h2>
          </div>

          <ol className="section-body space-y-3">
            {TIMELINE.map((t, i) => (
              <li
                key={t.year}
                data-reveal="left"
                style={{ "--reveal-delay": `${i * 90}ms` }}
                className="group grid items-start gap-5 rounded-[1.4rem] border-2 border-ink/12 bg-paper/80 p-6 transition-all hover:border-ink sm:grid-cols-[auto_auto_1fr] sm:gap-8 sm:p-8"
              >
                <span className="h-poster-xs text-rani-ink transition-colors group-hover:text-cobalt-ink">
                  {t.year}
                </span>

                <SpiceIcon
                  name={t.icon}
                  className="hidden w-11 shrink-0 self-center text-ink-mute transition-all duration-500 group-hover:rotate-12 group-hover:text-ink-soft sm:block"
                />

                <span>
                  <span className="h-card block text-ink">
                    {t.title}
                  </span>
                  <span className="mt-2.5 block max-w-2xl text-copy leading-relaxed text-ink-soft">
                    {t.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Sourcing />

      {/* moved off the home page — brand marketing that links nowhere
          belongs with the rest of the narrative, not ahead of checkout */}
      <Journal />

      {/* closing */}
      <section className="relative overflow-hidden bg-forest section text-ghee">
        <Sunburst className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-marigold" rays={44} opacity={0.1} />
        <div className="shell relative text-center">
          <h2 className="h-poster-sm mx-auto max-w-3xl" data-reveal="up">
            Bring your region
            <br />
            <span className="text-marigold">back to your plate.</span>
          </h2>
          <p className="lede mx-auto mt-6 max-w-lg text-ghee/70" data-reveal="up" style={{ "--reveal-delay": "80ms" }}>
            {PRODUCTS.length} blends, three ranges, one promise that has held for fifty years.
          </p>
          <Link href="/shop" className="btn btn-gold mt-9" data-reveal="up" style={{ "--reveal-delay": "160ms" }}>
            <SpiceIcon mono name="jar" className="w-4" />
            Shop the range
          </Link>
        </div>
      </section>
    </>
  );
}
