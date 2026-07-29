import Link from "next/link";
import ProductCard from "@/components/product-card";
import { featuredProducts } from "@/lib/products";
import { Star } from "@/components/spice-icons";

export default function Featured() {
  const items = featuredProducts().slice(0, 6);

  return (
    <section id="featured" className="tex-paper relative bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal="up">
            <p className="eyebrow flex items-center gap-2.5 text-chilli-ink">
              <Star className="w-3.5" />
              The shelf
            </p>
            <h2 className="h-editorial mt-4 max-w-2xl text-ink">
              Six blends that earn their place at the front.
            </h2>
          </div>
          <Link href="/shop" className="btn btn-hot shrink-0" data-reveal="up" style={{ "--reveal-delay": "100ms" }}>
            Shop everything
          </Link>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
