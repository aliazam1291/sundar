import Link from "next/link";
import TasteTester from "@/components/sections/taste-tester";
import Bilingual, { DevaWatermark } from "@/components/bilingual";
import RecipeIndex from "@/components/recipe-index";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import PagePortrait from "@/components/page-portrait";
import { RECIPES, spellOut } from "@/lib/recipes";
import { JsonLd, recipeCollectionJsonLd } from "@/lib/seo";

/**
 * Rasoi — the hub.
 *
 * The flow is: what this is → pick a dish → cook it on its own page. So the
 * index comes first and everything else follows it.
 *
 * Two things used to sit in front of the recipes: the cook-along chef, and one
 * full recipe printed inline as a "cover story". Both are good; neither is
 * what someone who came here to cook is looking for, and the cover story also
 * meant one dish was readable here while the other eleven were not. The chef
 * now sits below the index as the thing you stay for, and every dish is a card
 * that leads to its own page.
 *
 * Old fragment links still land: each card keeps `id={slug}`. A fragment never
 * reaches the server, so an anchor is the only way to honour them — a redirect
 * cannot see one.
 */

const count = spellOut(RECIPES.length);
const Count = count.charAt(0).toUpperCase() + count.slice(1);

export const metadata = {
  title: "Rasoi — the recipe corner",
  description: `${RECIPES.length} dishes, the blends they need and the two seconds that decide them. Adjust any recipe to the number you are cooking for.`,
  alternates: { canonical: "/recipes" },
};

export default function RecipesPage() {
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

        {/* Bunty's reaction is the whole pitch for a recipe corner: the
            heat actually lands. His own glow is baked into the image, so it
            sits straight on the section's oxblood with nothing else added. */}
        <div className="shell relative grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
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
              get it wrong. Every one adjusts to the number you are feeding.
            </p>
          </div>

          <PagePortrait
            src="/bunty-glow.webp"
            alt="Bunty reacting to the heat"
            width={933}
            height={1400}
            tone="glow"
            name="Bunty"
            plaqueBg="var(--color-sun)"
            priority
          />
        </div>
      </section>

      <div className="trim-band" style={{ "--trim-a": "var(--color-sun)", "--trim-b": "var(--color-tomato)" }} aria-hidden="true" />

      {/* ── the index — the reason people are here ── */}
      <section className="tex-paper relative overflow-hidden bg-cream section">
        <div className="shell relative">
          <div className="max-w-2xl">
            <h2 className="h-editorial text-ink">Pick a dish.</h2>
            <p className="mt-3 text-copy text-ink-soft">
              Filter by how much of an evening you have.
            </p>
          </div>

          <RecipeIndex />

          <p className="mt-10 text-center">
            <Link href="/shop" className="btn btn-hot">
              <SpiceIcon mono name="jar" className="w-4" />
              Get the blends
            </Link>
          </p>
        </div>
      </section>

      <div className="trim-band" style={{ "--trim-a": "var(--color-cobalt)", "--trim-b": "var(--color-raspberry)" }} aria-hidden="true" />

      {/* ── stay a while ──
          The cook-along chef used to sit here too, but he carries his own
          twelve-dish menu — two pickers on one page, both answering "which
          dish?". He now lives on each dish page, already pointed at it. */}
      <TasteTester />
    </>
  );
}
