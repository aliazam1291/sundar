import Link from "next/link";
import ProductCard from "@/components/product-card";
import { featuredProducts } from "@/lib/products";
import { Star } from "@/components/spice-icons";

export default function Featured() {
  const items = featuredProducts().slice(0, 6);

  return (
    <section id="featured" className="tex-paper relative bg-cream section">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal="up">
            <p className="plaque tilt-tag label-micro inline-flex items-center gap-2.5" style={{ "--plaque-bg": "var(--color-chilli)", "--plaque-fg": "var(--color-paper)" }}>
              <Star className="w-3.5" />
              The shelf
            </p>
            <h2 className="h-editorial mt-5 max-w-2xl text-ink">
              Six blends that earn their place at the front.
            </h2>
          </div>
          <Link href="/shop" className="btn btn-hot shrink-0" data-reveal="up" style={{ "--reveal-delay": "100ms" }}>
            Shop everything
          </Link>
        </div>

        <div className="section-body grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
