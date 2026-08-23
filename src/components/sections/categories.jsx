import Link from "next/link";
import ProductCard from "@/components/product-card";
import { CATEGORY_LIST, productsByCategory } from "@/lib/products";
import { Star, SpiceIcon } from "@/components/spice-icons";
import Backdrop from "@/components/backdrop";
import Bilingual from "@/components/bilingual";

/**
 * Shop by category.
 *
 * Shows real packs, not navigational tiles: the old version said what each
 * shelf *was* but never showed a blend, so a visitor had to click through
 * before seeing anything they could actually buy.
 *
 * It walks CATEGORY_LIST — the four shelves the live store actually sells
 * under. This used to walk the brand's three ranges, two of which were
 * unstocked, so the section was one real shelf followed by two "coming soon"
 * panels: a block whose headline promise is "shop by category" and whose body
 * was mostly things you could not buy. Every category here has stock, so
 * every tile is shoppable.
 *
 * Copy is local to this section on purpose, not written into CATEGORIES in
 * lib/products.js — that config's `blurb` is also the header text on
 * /shop, and changing it there would rewrite a page nobody asked to change.
 */
const PITCH = {
  blended: "Nau jars ka kaam, ek chammach mein.",
  pure: "Ek cheez, aur usmein kuch nahi milaya.",
  whole: "Sabut daana. Tel abhi andar hai.",
  asafoetida: "Ek chutki. Poori rasoi jaan jaati hai.",
};

export default function Categories() {
  return (
    <section id="categories" className="tex-paper relative overflow-hidden bg-cream section">
      <Backdrop field="margins" opacity={0.14} ornamentClass="text-oxblood/20" />

      <div className="shell relative">
        <div className="max-w-2xl" data-reveal="up">
          <p
            className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
            style={{ "--plaque-bg": "var(--color-forest)", "--plaque-fg": "var(--color-marigold)" }}
          >
            <Star className="w-3.5" />
            Shop by category
          </p>
          <Bilingual
            className="mt-4 text-ink"
            size="editorial"
            accent="text-oxblood"
            hi="मसाला सिर्फ़ मसाला नहीं होता।"
            en="Masala sirf masala nahi hota."
          />
          {/* Three beats then the turn — set as separate lines because that
              rhythm is the line, not a paragraph that happens to have commas. */}
          <p className="mt-5 max-w-xl text-copy-lg leading-relaxed text-ink-soft">
            Kabhi ghar ka swaad.
            <br />
            Kabhi sheher ki yaad.
            <br />
            Aur kabhi, poori recipe ka raaz.
          </p>
          <p className="mt-4 font-editorial text-copy-lg italic text-ink">Sunder jaanta hai.</p>
        </div>

        <div className="section-body space-y-14">
          {CATEGORY_LIST.map((cat, i) => {
            const all = productsByCategory(cat.id);

            return (
              <div key={cat.id} data-reveal="up" style={{ "--reveal-delay": `${i * 90}ms` }}>
                {/* `items-end` on a wrapping row leaves the "See all" link
                    baseline-stranded once it drops to its own line, so the
                    row only aligns ends once it is actually side by side. */}
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 border-b-2 border-ink/12 pb-4 sm:items-end">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span
                        className="grid h-8 w-8 shrink-0 place-content-center rounded-full border-2 border-ink"
                        style={{ background: cat.bg }}
                      >
                        <SpiceIcon mono name={cat.icon} className="w-3.5" style={{ color: cat.ink }} />
                      </span>
                      <h3 className="h-poster-xs text-ink">{cat.name}</h3>
                      <span
                        className="chip chip-solid"
                        style={{ "--chip-bg": "var(--color-ink)", "--chip-fg": "var(--color-marigold)" }}
                      >
                        {all.length}
                      </span>
                    </div>
                    <p className="mt-2 max-w-md text-copy text-ink-soft">{PITCH[cat.id]}</p>
                  </div>

                  <Link
                    href={`/shop?category=${cat.id}`}
                    className="label-micro flex shrink-0 items-center gap-2 text-oxblood transition-transform hover:translate-x-1"
                  >
                    See all {all.length}
                    <svg viewBox="0 0 24 24" className="w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h13M12 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {all.slice(0, 3).map((p, j) => (
                    <ProductCard key={p.slug} product={p} index={j} />
                  ))}
                </div>

                {cat.id === "asafoetida" && (
                  <p className="mt-6 max-w-lg font-editorial text-copy-lg italic text-ink-soft">
                    Ninety-nine percent of the market sells compound hing. We grind the resin.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
