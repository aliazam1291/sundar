import Link from "next/link";
import PackShot from "@/components/pack-shot";
import HeatScale from "@/components/heat-scale";
import { RANGES, formatPrice } from "@/lib/products";
import { SpiceIcon } from "@/components/spice-icons";

export default function ProductCard({ product, index = 0 }) {
  const range = RANGES[product.range];

  return (
    <article
      data-reveal="up"
      style={{ "--reveal-delay": `${(index % 3) * 90}ms` }}
      className="group relative"
    >
      <Link
        href={`/shop/${product.slug}`}
        className="card-lift block h-full overflow-hidden rounded-[1.4rem] border-2 border-ink/12 bg-cream/70 transition-colors hover:border-ink/70"
      >
        {/* pack stage */}
        <div
          className="tex-sunburst-warm relative flex items-center justify-center px-8 pt-9 pb-7 sm:px-10 sm:pt-11"
          style={{
            background: `linear-gradient(168deg, color-mix(in srgb, ${product.hue[0]} 13%, var(--color-paper)), var(--color-paper))`,
          }}
        >
          <SpiceIcon
            name={product.icon}
            className="pointer-events-none absolute -right-5 -top-4 w-28 text-ink opacity-[0.07] transition-transform duration-700 group-hover:rotate-12"
          />
          <PackShot product={product} size="sm" className="w-[62%] max-w-[190px]" />
        </div>

        {/* meta */}
        <div className="border-t-2 border-ink/12 bg-paper/85 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p
                className="chip mb-2.5 border-none px-0 opacity-70"
                style={{ color: product.hue[0] }}
              >
                {range.name}
              </p>
              <h3 className="font-poster text-[1.6rem] leading-[0.9] text-ink sm:text-[1.85rem]">
                {product.name}
              </h3>
              <p className="mt-1 truncate text-[0.8rem] font-medium text-ink/55">{product.kind}</p>
            </div>
            <span
              className="mt-1 shrink-0 rounded-full px-2.5 py-1 text-[0.72rem] font-bold text-paper"
              style={{ background: product.hue[0] }}
            >
              {formatPrice(product.price)}
            </span>
          </div>

          <p className="mt-3 font-editorial text-[0.95rem] leading-snug text-ink/75">
            {product.tagline}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink/10 pt-3.5">
            <HeatScale level={product.heat} showLabel={false} size="w-3.5" className="text-chilli" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/45">
              {product.size}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
