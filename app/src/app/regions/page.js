import Link from "next/link";
import RegionMap from "@/components/sections/region-map";
import ProductCard from "@/components/product-card";
import { productsByRange } from "@/lib/products";
import { REGIONS } from "@/lib/content";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";

export const metadata = {
  title: "Regions — apna swaad, apni thali",
  description:
    "Hyper-local blends learned in the cities that argue about them. Eight regions, eight hero dishes, eight masalas.",
};

export default function RegionsPage() {
  const items = productsByRange("regions");

  return (
    <>
      <section className="relative isolate overflow-hidden bg-saffron section text-ink">
        <Sunburst className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-oxblood" rays={50} opacity={0.12} />
        <SpiceIcon mono name="thela" className="pointer-events-none absolute -right-8 bottom-0 w-80 text-oxblood opacity-[0.12]" />

        <div className="relative shell">
          <p className="eyebrow flex items-center gap-2.5 text-ink">
            <Star className="w-3.5" />
            {REGIONS.length} regions · {items.length} blends
          </p>

          <h1 className="h-poster mt-5 max-w-4xl">
            Apna region,
            <br />
            <span className="text-oxblood">apni thali.</span>
          </h1>

          <p className="lede mt-5 max-w-xl text-ink-soft">
            A national masala is a compromise between everybody. These are not that. Each blend is
            learned in one city, from the people who will tell you exactly what the last shop got
            wrong.
          </p>
        </div>
      </section>

      <RegionMap />

      <section className="tex-paper bg-cream section">
        <div className="shell">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="h-editorial max-w-xl text-ink" data-reveal="up">
              The Regions range
            </h2>
            <Link href="/shop" className="btn shrink-0" data-reveal="up">
              All 22 blends
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
