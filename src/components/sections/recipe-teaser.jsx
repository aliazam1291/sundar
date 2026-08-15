import Link from "next/link";
import PackShot from "@/components/pack-shot";
import HeatScale from "@/components/heat-scale";
import { RECIPES, RECIPE_TONE, kickerOf } from "@/lib/recipes";
import { getProduct } from "@/lib/products";
import { Star, SpiceIcon } from "@/components/spice-icons";
import Bilingual from "@/components/bilingual";

/**
 * Four dishes, pointing at Rasoi.
 *
 * There is no food photography in this repo — every image is a pack cutout —
 * so each card leads with the blend the dish actually needs rather than a
 * stock photo of the finished plate. That also makes the card shoppable,
 * which a picture of poha would not be.
 */
export default function RecipeTeaser() {
  const picks = RECIPES.slice(0, 4);

  return (
    <section className="tex-paper relative overflow-hidden bg-sand/60 section">
      <div className="shell relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal="up">
            <p
              className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
              style={{ "--plaque-bg": "var(--color-chilli)", "--plaque-fg": "var(--color-paper)" }}
            >
              <Star className="w-3.5" />
              Rasoi
            </p>
            <Bilingual
              className="mt-4 max-w-2xl text-ink"
              size="editorial"
              accent="text-chilli-ink"
              hi="अच्छा खाना, अच्छी रेसिपी से शुरू होता है।"
              en="Achha khaana, achhi recipe se shuru hota hai."
            />
          </div>
          <Link href="/recipes" className="btn btn-hot shrink-0" data-reveal="up" style={{ "--reveal-delay": "100ms" }}>
            See all recipes
          </Link>
        </div>

        <div className="section-body grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {picks.map((r, i) => {
            const tone = RECIPE_TONE[r.tone] ?? RECIPE_TONE.forest;
            const pack = getProduct(r.uses[0]);

            return (
              <Link
                key={r.slug}
                href={`/recipes#${r.slug}`}
                data-reveal="up"
                style={{ "--reveal-delay": `${(i % 4) * 80}ms` }}
                className={`card-lift group flex flex-col overflow-hidden rounded-[1.4rem] border-2 border-ink ${tone.bg} ${tone.text}`}
              >
                <div className="relative flex items-center justify-center px-6 pt-7 pb-5">
                  <SpiceIcon
                    name={pack?.icon ?? "jar"}
                    className="pointer-events-none absolute -right-4 -top-3 w-24 opacity-[0.14] transition-transform duration-700 group-hover:rotate-12"
                  />
                  {pack ? <PackShot product={pack} size="sm" className="w-[58%] max-w-[130px]" /> : null}
                </div>

                <div className="flex flex-1 flex-col border-t-2 border-ink/20 p-5">
                  <p className={`label-micro ${tone.accent}`}>{kickerOf(r)}</p>
                  <h3 className="h-poster-xs mt-2">{r.title}</h3>
                  <p className="font-deva mt-1 text-copy" lang="hi">{r.hi}</p>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <HeatScale level={r.heat} showLabel={false} size="w-3.5" />
                    <span className="label-micro">{r.time}</span>
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
