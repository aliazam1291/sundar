import Link from "next/link";
import { notFound } from "next/navigation";
import PackShot from "@/components/pack-shot";
import ProductCard from "@/components/product-card";
import HeatScale from "@/components/heat-scale";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import {
  PRODUCTS,
  CATEGORIES,
  getProduct,
  relatedProducts,
  formatPrice,
} from "@/lib/products";
import { JsonLd, productJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.kind}`,
    description: `${product.tagline} ${product.story.slice(0, 120)}…`,
    alternates: { canonical: `/shop/${product.slug}` },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  /* Breadcrumb, spec row and the "more from" shelf all key off the category
     now. Range was the same word ("Essentials") under all 32 packs, so it
     told a shopper nothing and its link went to an unfiltered shop. */
  const category = CATEGORIES[product.category];
  const related = relatedProducts(product);

  const SPECS = [
    { label: "Shelf", value: category.name, icon: category.icon },
    { label: "Pack sizes", value: product.sizes.join(" · "), icon: "mortar" },
    { label: "Heat", value: ["None", "Mild", "Medium", "Warm", "Hot", "Fierce"][product.heat], icon: "flame" },
    { label: "Additives", value: "None, ever", icon: "sprig" },
  ];

  return (
    <>
      {/* ── hero ── */}
      <section
        className="relative isolate overflow-hidden section-sm"
        style={{
          background: `linear-gradient(165deg, ${product.hueFill[0]}, ${product.hueFill[1]})`,
        }}
      >
        <Sunburst
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-white"
          rays={48}
          opacity={0.11}
        />
        <SpiceIcon
          name={product.icon}
          className="pointer-events-none absolute -right-16 top-6 w-[26rem] text-white opacity-[0.07]"
        />

        {/* Product + breadcrumb markup, generated from the same record the
            page renders, so price and availability can never disagree. */}
        <JsonLd data={productJsonLd(product)} />

        <div className="relative shell">
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-2 text-micro font-semibold uppercase tracking-[0.16em] text-white/60">
            <Link href="/shop" className="link-sweep inline-block py-2.5 hover:text-white">Shop</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/shop?category=${category.id}`} className="link-sweep inline-block py-2.5 hover:text-white">{category.name}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/85">{product.name}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* pack */}
            <div className="relative mx-auto w-full max-w-[330px] lg:max-w-none">
              <div className="absolute left-1/2 top-1/2 -z-10 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/12 blur-3xl" />
              <div className="anim-float" style={{ "--dur": "8s" }}>
                {/* This pack is the largest paint above the fold on every
                    product page — without priority it is discovered late and
                    becomes the LCP that Next warns about. */}
                <PackShot product={product} size="lg" priority />
              </div>
            </div>

            {/* copy */}
            <div className="anim-rise text-white">
              <p className="eyebrow flex items-center gap-2.5 text-white/70" style={{ animationDelay: "40ms" }}>
                <Star className="w-3.5" />
                {category.full}
              </p>

              <h1 className="h-poster mt-4 text-[clamp(2.6rem,7.5vw,5.5rem)]" style={{ animationDelay: "120ms" }}>
                {product.name}
              </h1>

              <p className="mt-3 text-copy-lg font-semibold uppercase tracking-[0.14em] text-white/65" style={{ animationDelay: "180ms" }}>
                {product.kind}
              </p>

              <p className="font-editorial mt-6 max-w-lg text-[clamp(1.2rem,2.4vw,1.6rem)] leading-snug" style={{ animationDelay: "240ms" }}>
                {product.tagline}
              </p>
              <p className="font-deva mt-2.5 text-copy-lg text-white/70" style={{ animationDelay: "280ms" }}>
                {product.hindi}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5" style={{ animationDelay: "340ms" }}>
                <div>
                  <span className="h-poster-xs block">
                    {formatPrice(product.price)}
                  </span>
                  <span className="mt-1 block text-micro uppercase tracking-[0.16em] text-white/55">
                    {product.size} · incl. taxes
                  </span>
                </div>
                <HeatScale level={product.heat} className="text-white" />
              </div>

              <div className="mt-9 flex flex-wrap gap-3" style={{ animationDelay: "420ms" }}>
                <Link href="/where-to-buy" className="btn btn-gold">
                  <SpiceIcon mono name="jar" className="w-4" />
                  Where to buy
                </Link>
                <Link href="/shop" className="btn btn-ghost text-white">
                  Back to the shelf
                </Link>
              </div>

              <p className="mt-4 text-label text-white/55" style={{ animationDelay: "460ms" }}>
                Nationwide shipping · 50,000+ kirana stores
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── specs strip ── */}
      <section className="border-y-2 border-ink bg-marigold">
        <div className="shell grid grid-cols-2 divide-ink/20 lg:grid-cols-4 lg:divide-x">
          {SPECS.map((s) => (
            <div key={s.label} className="flex items-center gap-3.5 py-5 lg:justify-center lg:px-4">
              <SpiceIcon name={s.icon} className="w-7 shrink-0" />
              <div className="min-w-0">
                <p className="text-micro font-bold uppercase tracking-[0.2em] text-ink-soft">
                  {s.label}
                </p>
                <p className="truncate text-meta font-semibold text-ink">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── story + notes ── */}
      <section className="tex-paper bg-cream section">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
            <div data-reveal="up">
              <p className="eyebrow text-chilli-ink">Why it tastes like this</p>
              <p className="font-editorial mt-6 text-[clamp(1.35rem,2.6vw,1.9rem)] leading-[1.35] text-ink">
                {product.story}
              </p>

              <div className="mt-10 rounded-[1.4rem] border-2 border-ink/12 bg-paper/70 p-6 sm:p-8">
                <p className="eyebrow text-ink-soft">The chutki rule</p>
                <p className="mt-3.5 text-copy-lg leading-relaxed text-ink-soft">
                  One pinch into shimmering fat, count to two, then the rest of the dish. This blend
                  is ground fine enough that more is genuinely worse.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div data-reveal="up" style={{ "--reveal-delay": "80ms" }}>
                <p className="eyebrow text-chilli-ink">Available in</p>
                {/* Every pack with its own MRP. These were inert chips with no
                    price against them, so there was no way to check what a
                    given size costs — the one thing a shopper is here for. */}
                <ul className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
                  {product.variants.map((v) => (
                    <li key={`${v.size}-${v.pack}`} className="flex items-baseline justify-between gap-4 py-2.5">
                      <span className="min-w-0">
                        <span className="text-copy font-semibold text-ink">
                          {v.pricePoint ? `${v.size} pack` : v.size}
                        </span>
                        <span className="label-micro ms-2 text-ink-mute">{v.pack}</span>
                        {v.horeca ? (
                          <span className="label-micro ms-2 text-chilli-ink">Catering</span>
                        ) : null}
                      </span>
                      <span className="shrink-0 text-copy font-bold text-ink">
                        {formatPrice(v.mrp)}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-meta text-ink-mute">MRP incl. of all taxes.</p>
                <p className="mt-5 text-meta text-ink-soft">
                  No artificial colours, no added preservatives. Processed and packed in a
                  hygienic plant.
                </p>
              </div>

              {/* ── what is actually in it ── */}
              <div data-reveal="up" style={{ "--reveal-delay": "120ms" }}>
                <p className="eyebrow text-chilli-ink">Ingredients</p>
                <p className="mt-5 text-copy text-ink-soft">{product.ingredients}</p>
                {product.variety && product.variety !== product.ingredients ? (
                  <p className="mt-3 text-meta text-ink-mute">
                    Made from {product.variety.toLowerCase()}.
                  </p>
                ) : null}
              </div>

              <div data-reveal="up" style={{ "--reveal-delay": "160ms" }}>
                <p className="eyebrow text-chilli-ink">Cook it with</p>
                <p className="mt-5 text-copy text-ink-soft">
                  {product.uses || "A staple across everyday Indian cooking — use to taste."}
                </p>
              </div>

              <div
                className="rounded-[1.4rem] border-2 border-ink bg-forest p-6 text-ghee"
                data-reveal="up"
                style={{ "--reveal-delay": "220ms" }}
              >
                <p className="h-poster-xs text-marigold">Store it right</p>
                <p className="mt-2.5 text-copy text-ghee/70">
                  Keep in a cool, air-tight, dry place. Hygienically packed — best used within
                  nine months of opening.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── related ── */}
      {related.length ? (
        <section className="bg-paper section">
          <div className="shell">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="h-editorial max-w-xl text-ink" data-reveal="up">
                More {category.name}
              </h2>
              <Link
                href={`/shop?category=${category.id}`}
                className="btn shrink-0 self-start sm:self-auto"
                data-reveal="up"
              >
                See the shelf
              </Link>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
