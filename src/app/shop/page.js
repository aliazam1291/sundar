import Link from "next/link";
import ProductCard from "@/components/product-card";
import TastingBench from "@/components/sections/tasting-bench";
import Marquee from "@/components/marquee";
import {
  PRODUCTS,
  CATEGORIES,
  CATEGORY_LIST,
  productsByCategory,
  starterProducts,
} from "@/lib/products";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import PagePortrait from "@/components/page-portrait";

/* Counted, not typed: the description said "Eighteen" long after the
   catalogue reached 32, contradicting the "32 blends" on the page itself. */
export const metadata = {
  title: "Shop the range",
  description: `${PRODUCTS.length} slow-ground, single-origin spices — blended masalas, pure ground spices, whole seed and hing.`,
};

/* Category is the only shop axis. The range chips that used to sit beside
   these are gone with the ranges themselves. */
const CATEGORY_FILTERS = [{ id: "all", name: "Everything", icon: "jar" }, ...CATEGORY_LIST];

/* A hand-typed `?category=pickle` falls back to "all" rather than rendering
   an empty grid under a heading naming a category that does not exist. */
const pick = (raw) =>
  typeof raw === "string" && (raw === "all" || CATEGORIES[raw]) ? raw : "all";

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const activeCategory = pick(params?.category);

  const items = productsByCategory(activeCategory);
  const category = CATEGORIES[activeCategory];
  const starters = starterProducts();

  return (
    <>
      {/* header */}
      <section className="relative isolate overflow-hidden bg-forest section text-ghee">
        <Sunburst
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-marigold"
          rays={48}
          opacity={0.1}
        />
        <div className="tex-grid pointer-events-none absolute inset-0 opacity-30" />

        {/* Pihu stands in for "go on, start browsing" — the same nod a
            shopkeeper gives a customer walking in, not a caption claiming
            she picked any one blend. */}
        <div className="relative shell grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <p className="eyebrow flex items-center gap-2.5 text-marigold">
              <Star className="w-3.5" />
              {PRODUCTS.length} blends · {CATEGORY_LIST.length} shelves
            </p>

            <h1 className="h-poster mt-5 max-w-4xl">
              The whole
              <br />
              <span className="text-marigold">spice box.</span>
            </h1>

            <p className="lede mt-5 max-w-xl text-ghee/72">
              {category?.blurb ?? "Slow-ground, cold-milled, single-origin. Nothing added, ever."}
            </p>
          </div>

          <PagePortrait
            src="/pihu-cutout.webp"
            alt="Pihu giving a thumbs up"
            width={1145}
            height={1374}
            name="Pihu"
            spot="var(--color-marigold)"
            priority
          />
        </div>
      </section>

      {/* filter rail */}
      <div
        className="sticky z-30 border-y-2 border-ink bg-marigold"
        style={{ top: "var(--header-h, 4.6rem)" }}
      >
        <div className="shell">
          {/* The chips are wider than a phone, so this scrolls. Without the
              fade the last one is just sliced flat at the gutter and reads as
              a bug rather than "there is more this way"; the trailing padding
              keeps the final chip clear of the fade once you reach the end. */}
          <div className="no-scrollbar edge-fade-r flex gap-2.5 overflow-x-auto py-3.5 pe-8 sm:pe-0">
            {CATEGORY_FILTERS.map((f) => {
              const on = activeCategory === f.id;
              const count = f.id === "all" ? PRODUCTS.length : productsByCategory(f.id).length;

              return (
                <Link
                  key={f.id}
                  href={f.id === "all" ? "/shop" : `/shop?category=${f.id}`}
                  scroll={false}
                  aria-current={on ? "page" : undefined}
                  className={`chip shrink-0 border-2 !py-3 transition-all ${
                    on
                      ? "border-ink bg-ink text-marigold"
                      : "border-ink/25 text-ink hover:border-ink hover:bg-ink/8"
                  }`}
                >
                  <SpiceIcon mono name={f.icon} className="w-4" />
                  {f.name}
                  {/* Solid colours, not faded ink/marigold: a count set at
                      45% over the marigold rail measured 2.78:1. ink-soft is
                      7.00 there and clay is 8.52 on the selected chip, both
                      still a step quieter than the label beside them. */}
                  <span className={on ? "text-clay" : "text-ink-soft"}>{count}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Thirty-two packs with no way in is a wall, not a shelf. On the
          unfiltered view the bestsellers go first as the "start here" —
          once a range is chosen the shopper has already narrowed, and
          repeating picks from another range would just undo that. */}
      {activeCategory === "all" && (
        <section className="tex-paper border-b-2 border-ink/10 bg-paper section-sm">
          <div className="shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow flex items-center gap-2.5 text-chilli-ink">
                  <Star className="w-3.5" />
                  Start here
                </p>
                <h2 className="h-editorial mt-3 text-ink">Three to begin with.</h2>
              </div>
              <p className="max-w-sm text-copy text-ink-soft">
                {PRODUCTS.length} is a lot to meet at once. These three cover most of what a
                kitchen actually cooks in a week.
              </p>
            </div>

            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {starters.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* grid */}
      <section className="tex-paper bg-cream section">
        <div className="shell">
          {/* The cards carry h3, so without a level-2 here the outline jumps
              h1 -> h3. Reads as a plain count on screen, announces as the
              heading for the grid. */}
          <h2 className="mb-8 text-label font-semibold uppercase tracking-[0.2em] text-ink-soft">
            {items.length === 0
              ? `${category?.full ?? "This shelf"} · coming soon`
              : `Showing ${items.length} ${items.length === 1 ? "blend" : "blends"}${
                  category ? ` · ${category.full}` : ""
                }`}
          </h2>

          {/* A filter that lands on an announced-but-unstocked range has to
              say so. An empty grid reads as a broken page. */}
          {items.length === 0 ? (
            <div className="rounded-[1.4rem] border-2 border-dashed border-ink/25 bg-paper/60 px-6 py-14 text-center">
              <SpiceIcon mono name={category?.icon ?? "jar"} className="mx-auto w-12 text-ink-mute" />
              <p className="h-poster-xs mt-5 text-ink">Abhi ban raha hai.</p>
              {/* Every category ships today, so this is unreachable now — it
                  stays as the guard for a category added before its stock. */}
              <p className="mx-auto mt-3 max-w-md text-copy text-ink-soft">
                {category?.name} is still being blended. Browse the other{" "}
                {PRODUCTS.length} blends in the meantime.
              </p>
              <Link href="/shop" className="btn btn-hot mt-6">
                <SpiceIcon mono name="jar" className="w-4" />
                Explore all {PRODUCTS.length} blends
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* build a chutki, get a real blend back */}
      <TastingBench />

      <div className="border-y-2 border-ink bg-chilli py-3.5 text-paper">
        <Marquee
          items={["Free shipping over ₹799", "Harvest-dated batches", "No colours · no preservatives", "Ships across India"]}
          speed={34}
          itemClassName="text-label font-semibold uppercase tracking-[0.24em]"
        />
      </div>
    </>
  );
}
