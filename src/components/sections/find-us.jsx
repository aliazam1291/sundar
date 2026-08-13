import Link from "next/link";
import PackShot from "@/components/pack-shot";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import Backdrop from "@/components/backdrop";
import Bilingual from "@/components/bilingual";
import { featuredProducts, formatPrice, PRODUCTS } from "@/lib/products";

/**
 * Where to buy — the closing sales section.
 *
 * Every card ends in something you can actually press. It used to be four
 * ghost cards of flat prose with a single mailto, which is a poster about
 * distribution rather than a way to buy anything.
 *
 * Quick-commerce names are stated but NOT linked: inventing third-party deep
 * links that may 404 is worse than sending people somewhere that works. Swap
 * in the real Blinkit / Instamart / Zepto URLs when they are confirmed.
 */

const TRADE_MAIL =
  "mailto:hello@sundermasala.com" +
  "?subject=Wholesale%20%26%20distributor%20enquiry" +
  "&body=Business%20name%3A%0ACity%3A%0AFormats%20needed%3A%0AMonthly%20volume%3A%0A";

const QUICK = ["Blinkit", "Instamart", "Zepto"];

const entryPack = () =>
  PRODUCTS.filter((p) => !/^5 ?GM$/i.test(p.size)).reduce((a, b) => (b.price < a.price ? b : a));

export default function FindUs() {
  const shelf = featuredProducts().slice(0, 3);
  const entry = entryPack();

  return (
    <section className="relative isolate overflow-hidden bg-forest section text-ghee">
      <Sunburst
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-marigold"
        rays={46}
        opacity={0.1}
      />
      <div className="tex-grid pointer-events-none absolute inset-0 opacity-25" />
      <Backdrop field="margins" tone="mono" opacity={0.1} ornamentClass="text-marigold/20" />

      <div className="relative shell">
        <div className="max-w-2xl" data-reveal="up">
          <p
            className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
            style={{ "--plaque-bg": "var(--color-rani-deep)", "--plaque-fg": "var(--color-paper)" }}
          >
            <Star className="w-3.5" />
            Kahan milega
          </p>

          <Bilingual
            className="mt-4"
            size="editorial"
            accent="text-marigold"
            hi="मन किया, और मिल गया।"
            en="The moment you crave it, it should be one tap away."
          />
        </div>

        {/* ── the two ways to actually buy ── */}
        <div className="section-body grid gap-5 lg:grid-cols-2">
          {/* online */}
          <div
            id="shipping"
            className="card-poster card-pad scroll-mt-32 bg-paper text-ink"
            data-reveal="left"
            style={{ "--card-shadow": "var(--color-marigold)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label-micro text-chilli-ink">Buy direct</p>
                <h3 className="h-poster-xs mt-2 text-ink">Shipped nationwide</h3>
              </div>
              <span
                className="chip chip-solid shrink-0"
                style={{ "--chip-bg": "var(--color-kiwi)", "--chip-fg": "var(--color-ink)" }}
              >
                Free over ₹799
              </span>
            </div>

            {/* real packs, doing the selling */}
            <ul className="mt-5 flex items-end gap-3">
              {shelf.map((p) => (
                <li key={p.slug} className="min-w-0 flex-1">
                  <Link href={`/shop/${p.slug}`} className="group block">
                    <PackShot product={p} size="sm" tilt={false} />
                    <p className="label-micro mt-2.5 truncate text-ink-soft transition-colors group-hover:text-chilli-ink">
                      {p.name}
                    </p>
                    <p className="label-micro text-ink-mute">{formatPrice(p.price)}</p>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-copy text-ink-soft">
              Dispatched within 24 hours of the mill, sealed the day it was ground. Thirty-two
              blends, from {formatPrice(entry.price)}.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link href="/shop" className="btn btn-hot">
                <SpiceIcon mono name="jar" className="w-4" />
                Shop all 32 blends
              </Link>
              <Link href="/shop?range=essentials" className="btn btn-ghost btn-sm text-ink">
                Start with Essentials
              </Link>
            </div>
          </div>

          {/* ten minutes away */}
          <div
            id="stockists"
            className="card-poster card-pad flex scroll-mt-32 flex-col bg-marigold text-ink"
            data-reveal="right"
            style={{ "--card-shadow": "var(--color-oxblood)" }}
          >
            <p className="label-micro text-oxblood">Quick commerce</p>
            <h3 className="h-poster-xs mt-2">Ten minutes away</h3>

            <p className="mt-4 text-copy text-ink-soft">
              Stocked across Indore and Bhopal — the impulse and the packet, same evening.
            </p>

            <p className="label-micro mt-5 text-oxblood">Available on</p>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <li
                  key={q}
                  className="label-micro rounded-full border-2 border-dashed border-ink/50 px-3.5 py-2 text-ink-soft"
                >
                  {q}
                </li>
              ))}
            </ul>

            <div className="rule-dots mt-6 text-ink/40" aria-hidden="true" />

            <p className="label-micro mt-5 text-oxblood">In your kirana too</p>
            <p className="mt-2 text-copy text-ink-soft">
              10,000+ stores and 500+ highway dhabas already carry us. Ask for the red pack.
            </p>

            <a href="tel:+917312500000" className="btn btn-gold btn-sm mt-5">
              <SpiceIcon mono name="truck" className="w-4" />
              Find a stockist
            </a>

            <div className="mt-auto flex items-end justify-between gap-4 pt-7">
              <p className="font-deva text-copy-lg text-oxblood" lang="hi">
                दस मिनट में, आपके दरवाज़े पर।
              </p>
              <SpiceIcon name="thela" className="w-20 shrink-0" />
            </div>
          </div>
        </div>

        {/* ── trade + talk ── */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div
            id="trade"
            className="card-poster card-pad scroll-mt-32 bg-oxblood text-paper"
            data-reveal="up"
            style={{ "--card-shadow": "var(--color-marigold)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label-micro text-marigold">Wholesale &amp; HoReCa</p>
                <h3 className="h-card mt-2">Kitchens &amp; kirana</h3>
              </div>
              <SpiceIcon name="thela" className="w-10 shrink-0" />
            </div>
            <p className="mt-3 text-copy text-paper/80">
              Bulk formats, distributor terms and private label. Tell us your city and volume.
            </p>
            <a href={TRADE_MAIL} className="btn btn-gold btn-sm mt-5">
              Become a distributor
            </a>
          </div>

          <div
            id="contact"
            className="card-poster card-pad scroll-mt-32 bg-cobalt text-paper"
            data-reveal="up"
            style={{ "--reveal-delay": "90ms", "--card-shadow": "var(--color-raspberry)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label-micro text-sun">Talk to us</p>
                <h3 className="h-card mt-2">Ask us anything</h3>
              </div>
              <SpiceIcon name="pinch" className="w-10 shrink-0" />
            </div>
            <p className="mt-3 text-copy text-paper/80">
              Blend questions, or which masala your grandmother probably used.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a href="mailto:hello@sundermasala.com" className="btn btn-gold btn-sm">
                Email us
              </a>
              <a href="tel:+917312500000" className="btn btn-ghost btn-sm text-sun">
                Call the mill
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
