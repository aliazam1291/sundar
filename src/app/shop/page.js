import Link from "next/link";
import ProductCard from "@/components/product-card";
import TastingBench from "@/components/sections/tasting-bench";
import Marquee from "@/components/marquee";
import { PRODUCTS, RANGES, RANGE_LIST, productsByRange } from "@/lib/products";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";

export const metadata = {
  title: "Shop the range",
  description:
    "Eighteen slow-ground, single-origin blends across three ranges — Heritage, Regions and Everyday Essentials.",
};

const FILTERS = [{ id: "all", name: "Everything", icon: "jar" }, ...RANGE_LIST];

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const raw = params?.range;
  const active = typeof raw === "string" && (raw === "all" || RANGES[raw]) ? raw : "all";

  const items = productsByRange(active);
  const range = RANGES[active];

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

        <div className="relative shell">
          <p className="eyebrow flex items-center gap-2.5 text-marigold">
            <Star className="w-3.5" />
            {PRODUCTS.length} blends · three ranges
          </p>

          <h1 className="h-poster mt-5 max-w-4xl">
            The whole
            <br />
            <span className="text-marigold">spice box.</span>
          </h1>

          <p className="lede mt-5 max-w-xl text-ghee/72">
            {range ? range.blurb : "Slow-ground, cold-milled, single-origin. Nothing added, ever."}
          </p>
        </div>
      </section>

      {/* filter rail */}
      <div
        className="sticky z-30 border-y-2 border-ink bg-marigold"
        style={{ top: "var(--header-h, 4.6rem)" }}
      >
        <div className="shell">
          <div className="no-scrollbar flex gap-2.5 overflow-x-auto py-3.5">
            {FILTERS.map((f) => {
              const on = active === f.id;
              return (
                <Link
                  key={f.id}
                  href={f.id === "all" ? "/shop" : `/shop?range=${f.id}`}
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
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* grid */}
      <section className="tex-paper bg-cream section">
        <div className="shell">
          <p className="mb-8 text-label font-semibold uppercase tracking-[0.2em] text-ink-soft">
            Showing {items.length} {items.length === 1 ? "blend" : "blends"}
            {range ? ` · ${range.full}` : ""}
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
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
