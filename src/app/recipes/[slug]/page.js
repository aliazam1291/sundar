import Link from "next/link";
import { notFound } from "next/navigation";
import Backdrop from "@/components/backdrop";
import ChefMenu from "@/components/sections/chef-menu";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import { Uses, RecipeStats, Method } from "@/components/recipe-parts";
import RecipeScaler from "@/components/recipe-scaler";
import { RECIPES, getRecipe, kickerOf } from "@/lib/recipes";
import { JsonLd, recipeJsonLd, recipeBreadcrumbJsonLd } from "@/lib/seo";
import { DevaWatermark } from "@/components/bilingual";
import PagePortrait from "@/components/page-portrait";
import FoodIllustration from "@/components/food-illustration";

const PORTRAITS_MAP = {
  "indori-poha": {
    src: "/bunty-glow.webp",
    alt: "Bunty",
    width: 933,
    height: 1400,
    tone: "glow",
    name: "Bunty",
    spot: "var(--color-sun)",
    plaqueBg: "var(--color-sun)",
  },
  "dal-tadka": {
    src: "/sudhaji-cutout.webp",
    alt: "Sudhaji",
    width: 1145,
    height: 1374,
    tone: "cutout",
    name: "Sudhaji",
    spot: "var(--color-marigold)",
    plaqueBg: "var(--color-sun)",
  },
  "rajma-chawal": {
    src: "/rameshji-glow.webp",
    alt: "Ramesh Ji",
    width: 933,
    height: 1400,
    tone: "glow",
    name: "Ramesh Ji",
    spot: "var(--color-marigold)",
    plaqueBg: "var(--color-marigold)",
  },
  "chole-bhature": {
    src: "/rameshji-glow.webp",
    alt: "Ramesh Ji",
    width: 933,
    height: 1400,
    tone: "glow",
    name: "Ramesh Ji",
    spot: "var(--color-marigold)",
    plaqueBg: "var(--color-marigold)",
  },
  "shahi-paneer": {
    src: "/pihu-cutout.webp",
    alt: "Pihu",
    width: 1145,
    height: 1374,
    tone: "cutout",
    name: "Pihu",
    spot: "var(--color-marigold)",
    plaqueBg: "var(--color-sun)",
  },
  "pav-bhaji": {
    src: "/pihu-cutout.webp",
    alt: "Pihu",
    width: 1145,
    height: 1374,
    tone: "cutout",
    name: "Pihu",
    spot: "var(--color-marigold)",
    plaqueBg: "var(--color-sun)",
  },
  "sambhar": {
    src: "/sudhaji-cutout.webp",
    alt: "Sudhaji",
    width: 1145,
    height: 1374,
    tone: "cutout",
    name: "Sudhaji",
    spot: "var(--color-marigold)",
    plaqueBg: "var(--color-sun)",
  },
  "kadhi-pakora": {
    src: "/sudhaji-cutout.webp",
    alt: "Sudhaji",
    width: 1145,
    height: 1374,
    tone: "cutout",
    name: "Sudhaji",
    spot: "var(--color-marigold)",
    plaqueBg: "var(--color-sun)",
  },
  "baingan-bharta": {
    src: "/rameshji-glow.webp",
    alt: "Ramesh Ji",
    width: 933,
    height: 1400,
    tone: "glow",
    name: "Ramesh Ji",
    spot: "var(--color-marigold)",
    plaqueBg: "var(--color-marigold)",
  },
  "masala-chai": {
    src: "/pihu-cutout.webp",
    alt: "Pihu",
    width: 1145,
    height: 1374,
    tone: "cutout",
    name: "Pihu",
    spot: "var(--color-marigold)",
    plaqueBg: "var(--color-sun)",
  },
  "aloo-chaat": {
    src: "/bunty-glow.webp",
    alt: "Bunty",
    width: 933,
    height: 1400,
    tone: "glow",
    name: "Bunty",
    spot: "var(--color-sun)",
    plaqueBg: "var(--color-sun)",
  },
  "jeera-aloo": {
    src: "/sudhaji-cutout.webp",
    alt: "Sudhaji",
    width: 1145,
    height: 1374,
    tone: "cutout",
    name: "Sudhaji",
    spot: "var(--color-marigold)",
    plaqueBg: "var(--color-sun)",
  }
};

/**
 * One dish, one URL.
 *
 * These twelve used to be hash anchors on /recipes, which meant twelve dishes
 * shared a single title, description and entry in the index — and the Recipe
 * markup pointed at a fragment, which is not a page anything can rank or cite.
 */

export function generateStaticParams() {
  return RECIPES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) return {};

  return {
    title: `${recipe.title} — ${recipe.time}, serves ${recipe.serves}`,
    description: recipe.blurb,
    alternates: { canonical: `/recipes/${recipe.slug}` },
  };
}

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  const others = RECIPES.filter((r) => r.slug !== recipe.slug).slice(0, 3);
  const portrait = PORTRAITS_MAP[recipe.slug];

  return (
    <>
      <JsonLd data={recipeJsonLd(recipe)} />
      <JsonLd data={recipeBreadcrumbJsonLd(recipe)} />

      {/* ── masthead ── */}
      <section className="relative isolate overflow-hidden bg-oxblood section-sm text-paper">
        <Sunburst
          className="pointer-events-none absolute inset-0 h-full w-full text-marigold"
          rays={48}
          opacity={0.1}
        />
        <DevaWatermark word={recipe.hi} className="text-marigold" position="right" opacity={0.06} />

        <div className="shell relative">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-2 text-micro font-semibold uppercase tracking-[0.16em] text-paper/60">
            <Link href="/recipes" className="link-sweep inline-block py-2.5 hover:text-marigold">
              Rasoi
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-paper/85">{recipe.title}</span>
          </nav>

          <div className="grid items-center gap-8 w-full md:grid-cols-[1.15fr_0.85fr] md:gap-12">
            <div className="max-w-3xl" data-reveal="up">
              <p
                className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
                style={{ "--plaque-bg": "var(--color-sun)", "--plaque-fg": "var(--color-ink)" }}
              >
                <Star className="w-3.5" />
                {kickerOf(recipe)}
              </p>

              <p className="font-deva mt-4 text-[clamp(1.4rem,3vw,2.2rem)] leading-tight text-marigold" lang="hi">
                {recipe.hi}
              </p>
              <h1 className="h-poster mt-1">{recipe.title}</h1>
              <p className="font-editorial mt-2 text-copy-lg italic text-paper/70">{recipe.dish}</p>

              <p className="lede mt-5 max-w-xl text-paper/80">{recipe.blurb}</p>

              {/* Food Illustration Decal */}
              <div className="mt-7 flex items-center gap-3.5 bg-paper/5 border border-paper/10 p-3 rounded-2xl max-w-sm">
                <FoodIllustration slug={recipe.slug} className="w-14 h-14 shrink-0 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] bg-paper/10 p-1.5 rounded-full border border-marigold/30" />
                <div>
                  <p className="label-micro text-marigold">Sunder Rasoi Decal</p>
                  <p className="text-copy-sm font-semibold text-paper/90">Authentic {recipe.title} preparation</p>
                </div>
              </div>
            </div>

            {portrait && (
              <div data-reveal="scale">
                <PagePortrait
                  src={portrait.src}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  tone={portrait.tone}
                  name={portrait.name}
                  spot={portrait.spot}
                  plaqueBg={portrait.plaqueBg}
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="trim-band" style={{ "--trim-a": "var(--color-sun)", "--trim-b": "var(--color-tomato)" }} aria-hidden="true" />

      {/* ── the dish ── */}
      <section className="tex-paper relative overflow-hidden bg-cream section">
        <Backdrop field="margins" opacity={0.14} ornamentClass="text-oxblood/20" />

        <div className="shell relative grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div data-reveal="left">
            <RecipeStats recipe={recipe} showServes={false} />

            {/* The servings dial owns the amounts from here down. */}
            <div className="mt-7">
              <RecipeScaler recipe={recipe} />
            </div>

            <p className="label-micro mt-7 text-ink-mute">Plus these off the shelf</p>
            <Uses slugs={recipe.uses} className="mt-2.5 text-ink-soft" />

            <p className="mt-6 text-copy text-ink-soft">
              <span className="label-micro text-chilli-ink">Serve with · </span>
              {recipe.serveWith}
            </p>

            <Link href="/shop" className="btn btn-hot mt-7">
              <SpiceIcon mono name="jar" className="w-4" />
              Get the blends
            </Link>
          </div>

          <div data-reveal="right">
            <Method recipe={recipe} />
          </div>
        </div>
      </section>

      {/* ── or watch him do it ──
          Locked to this dish. On the Rasoi hub the chef offers his own menu,
          which is right there; on a dish page the dish is already chosen. */}
      <ChefMenu dish={recipe.slug} />

      {/* ── keep cooking ── */}
      <section className="relative overflow-hidden bg-paper section-sm">
        <div className="shell relative">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="h-editorial text-ink">Cook something else.</h2>
            <Link href="/recipes" className="btn btn-ghost btn-sm text-ink">
              All {RECIPES.length} recipes
            </Link>
          </div>

          <ul className="mt-8 grid gap-5 sm:grid-cols-3">
            {others.map((r, i) => (
              <li key={r.slug} data-reveal="up" style={{ "--reveal-delay": `${i * 80}ms` }}>
                <Link
                  href={`/recipes/${r.slug}`}
                  className="card-lift block h-full rounded-[1.3rem] border-2 border-ink/12 bg-cream/70 p-5 transition-colors hover:border-ink/70"
                >
                  <p className="label-micro text-chilli-ink">{kickerOf(r)}</p>
                  <p className="h-poster-xs mt-2 text-ink">{r.title}</p>
                  <p className="font-deva mt-1 text-copy text-ink-soft" lang="hi">{r.hi}</p>
                  <p className="mt-3 text-copy text-ink-soft">{r.dish}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
