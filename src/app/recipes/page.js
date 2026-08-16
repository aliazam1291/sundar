import Link from "next/link";
import TasteTester from "@/components/sections/taste-tester";
import ChefMenu from "@/components/sections/chef-menu";
import Backdrop from "@/components/backdrop";
import Bilingual, { DevaWatermark } from "@/components/bilingual";
import HeatScale from "@/components/heat-scale";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import { Uses, RecipeStats, Ingredients, Method } from "@/components/recipe-parts";
import { RECIPES, RECIPE_TONE, heroRecipe, kickerOf, spellOut } from "@/lib/recipes";
import { JsonLd, recipeCollectionJsonLd } from "@/lib/seo";

/**
 * Rasoi — the hub.
 *
 * This used to print all twelve dishes in full, each behind a hash anchor. Now
 * every dish has its own page, so the hub's job is to summarise and send you
 * there: one cover story rendered in full, and the rest as cards.
 *
 * The old fragments still resolve — each card keeps `id={slug}`, so a link to
 * /recipes#chole-bhature that is out in the world lands on the right card
 * rather than 404ing. A fragment never reaches the server, so this is the only
 * way to honour those links; a redirect cannot see them.
 */

const count = spellOut(RECIPES.length);
const Count = count.charAt(0).toUpperCase() + count.slice(1);

export const metadata = {
  title: "Rasoi — the recipe corner",
  description: `${RECIPES.length} dishes, the blends they need and the two seconds that decide them. Plus a taste tester who will tell you exactly what you have done to the bowl.`,
  alternates: { canonical: "/recipes" },
};

export default function RecipesPage() {
  const hero = heroRecipe();
  const rest = RECIPES.filter((r) => r.slug !== hero.slug);

  return (
    <>
      {/* A summary page: each item points at the dish's own URL. */}
      <JsonLd data={recipeCollectionJsonLd()} />

      {/* ── masthead ── */}
      <section className="relative isolate overflow-hidden bg-oxblood section text-paper">
        <Sunburst
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-marigold"
          rays={50}
          opacity={0.1}
        />
        <DevaWatermark word="रसोई" className="text-marigold" position="right" opacity={0.1} />

        <div className="shell relative">
          <div className="max-w-3xl">
            <p
              className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
              style={{ "--plaque-bg": "var(--color-sun)", "--plaque-fg": "var(--color-ink)" }}
            >
              <Star className="w-3.5" />
              Rasoi · the recipe corner
            </p>

            <Bilingual
              as="h1"
              className="mt-4"
              accent="text-marigold"
              hi="रसोई से, सीधे आपकी थाली तक।"
              en={`${Count} dishes and the two seconds that decide them.`}
            />

            <p className="lede mt-5 max-w-xl text-paper/80">
              Not a recipe database. {Count} things worth cooking properly — everything that goes
              in them, the blends each one actually needs, and the one detail that ruins it if you
              get it wrong.
            </p>
          </div>
        </div>
      </section>

      <div className="trim-band" style={{ "--trim-a": "var(--color-sun)", "--trim-b": "var(--color-tomato)" }} aria-hidden="true" />

      {/* ── pick a dish, he cooks it with you ── */}
      <ChefMenu />

      {/* ── the cover story, in full ── */}
      <section id={hero.slug} className="tex-paper relative overflow-hidden bg-cream section">
        <Backdrop field="margins" opacity={0.14} ornamentClass="text-oxblood/20" />

        <div className="shell relative grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div data-reveal="left">
            <p className="label-micro text-chilli-ink">Cover story · {kickerOf(hero)}</p>

            <p className="font-deva mt-3 text-[clamp(1.4rem,3vw,2.2rem)] leading-tight text-rani-ink" lang="hi">
              {hero.hi}
            </p>
            <h2 className="h-poster mt-1 text-ink">
              <Link href={`/recipes/${hero.slug}`} className="transition-colors hover:text-chilli-ink">
                {hero.title}
              </Link>
            </h2>

            <p className="lede mt-4 max-w-xl text-ink-soft">{hero.blurb}</p>

            <RecipeStats recipe={hero} className="mt-6" />
            <Ingredients recipe={hero} className="mt-7" />

            <p className="label-micro mt-7 text-ink-mute">Plus these off the shelf</p>
            <Uses slugs={hero.uses} className="mt-2.5 text-ink-soft" />

            <p className="mt-6 text-copy text-ink-soft">
              <span className="label-micro text-chilli-ink">Serve with · </span>
              {hero.serveWith}
            </p>
          </div>

          <div data-reveal="right">
            <Method recipe={hero} />
          </div>
        </div>
      </section>

      {/* ── the taste tester ── */}
      <TasteTester />

      <div className="trim-band" style={{ "--trim-a": "var(--color-cobalt)", "--trim-b": "var(--color-raspberry)" }} aria-hidden="true" />

      {/* ── the rest of the issue ── */}
      <section className="relative overflow-hidden bg-paper section">
        <div className="shell relative">
          <div className="max-w-2xl" data-reveal="up">
            <p
              className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
              style={{ "--plaque-bg": "var(--color-kiwi)", "--plaque-fg": "var(--color-ink)" }}
            >
              <Star className="w-3.5" />
              Aur bhi hai
            </p>
            <h2 className="h-editorial mt-4 text-ink">The rest of the issue.</h2>
            <p className="lede mt-4 text-ink-soft">
              {spellOut(rest.length)} more, each with its own page — what goes in, what to do with
              it, and the thing that decides it.
            </p>
          </div>

          <div className="section-body grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((r, i) => {
              const tone = RECIPE_TONE[r.tone] ?? RECIPE_TONE.marigold;
              return (
                <article
                  key={r.slug}
                  id={r.slug}
                  data-reveal="up"
                  style={{ "--reveal-delay": `${(i % 3) * 90}ms` }}
                  className="scroll-mt-32"
                >
                  <Link
                    href={`/recipes/${r.slug}`}
                    className={`card-poster card-pad card-lift flex h-full flex-col ${tone.bg} ${tone.text}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className={`label-micro ${tone.accent}`}>{kickerOf(r)}</p>
                      <HeatScale level={r.heat} showLabel={false} size="w-3.5" className={tone.accent} />
                    </div>

                    <p className="font-deva mt-4 text-[1.35rem] leading-tight" lang="hi">
                      {r.hi}
                    </p>
                    <h3 className="h-poster-xs mt-1">{r.title}</h3>
                    <p className="font-editorial mt-2 text-copy italic">{r.dish}</p>

                    <p className="mt-4 text-copy">{r.blurb}</p>

                    <div className="rule-dots mt-5 opacity-40" aria-hidden="true" />

                    <p className="label-micro mt-4">
                      Sāmagrī · {r.ingredients.length} things · {r.steps.length} steps
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                      <span className="label-micro">
                        {r.time} · serves {r.serves}
                      </span>
                      <span className="label-micro flex items-center gap-2">
                        Read it
                        <svg viewBox="0 0 24 24" className="w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h13M12 6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>

          <p className="mt-10 text-center">
            <Link href="/shop" className="btn btn-hot">
              <SpiceIcon mono name="jar" className="w-4" />
              Get the blends
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
