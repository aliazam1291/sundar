import Link from "next/link";
import ProductCard from "@/components/product-card";
import { featuredProducts } from "@/lib/products";
import { Star } from "@/components/spice-icons";
import Backdrop from "@/components/backdrop";
import Bilingual from "@/components/bilingual";

export default function Featured() {
  const items = featuredProducts().slice(0, 6);

  return (
    <section id="featured" className="tex-paper relative overflow-hidden bg-cream section">
      <Backdrop field="scatter" opacity={0.15} ornamentClass="text-chilli/20" />

      <div className="shell relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal="up">
            <p className="plaque tilt-tag label-micro inline-flex items-center gap-2.5" style={{ "--plaque-bg": "var(--color-chilli)", "--plaque-fg": "var(--color-paper)" }}>
              <Star className="w-3.5" />
              Aaj ka special
            </p>
            <Bilingual
              className="mt-4 max-w-2xl text-ink"
              size="editorial"
              accent="text-chilli-ink"
              hi="सबसे आगे रखने लायक छह।"
              en="Six blends that earn their place at the front."
            />
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
