import Link from "next/link";
import ProductCard from "@/components/product-card";
import { RANGE_LIST, productsByRange, isComingSoon } from "@/lib/products";
import { Star, SpiceIcon } from "@/components/spice-icons";
import Backdrop from "@/components/backdrop";
import Bilingual from "@/components/bilingual";

/**
 * Shop by category.
 *
 * Replaces the old three navigational tiles: those said what each range
 * *was* but never showed a single pack, so a visitor had to click through
 * before seeing anything they could actually buy. This shows three real
 * blends per range instead — the tile becomes proof, not just a label.
 *
 * Copy is local to this section on purpose, not written into RANGES in
 * lib/products.js — that config's `blurb` is also the header text on
 * /shop, and changing it there would rewrite a page nobody asked to change.
 */
const PITCH = {
  essentials: "Khaana roz ka hai. Masala kamaal ka hona chahiye.",
  regions: "Ek sheher ka swaad. Ab aapke paas.",
  heritage: "Kuch khaane roz nahi bante. Aur kuch masale bhi nahi.",
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
          <p className="mt-4 max-w-xl text-copy text-ink-soft">
            Kabhi ghar ka swaad. Kabhi sheher ki yaad. Aur kabhi, poori recipe ka raaz. Sunder
            jaanta hai.
          </p>
        </div>

        <div className="section-body space-y-14">
          {RANGE_LIST.map((range, i) => {
            const all = productsByRange(range.id);
            const soon = isComingSoon(range.id);

            return (
              <div key={range.id} data-reveal="up" style={{ "--reveal-delay": `${i * 90}ms` }}>
                <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink/12 pb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span
                        className="grid h-8 w-8 shrink-0 place-content-center rounded-full border-2 border-ink"
                        style={{ background: range.bg }}
                      >
                        <SpiceIcon mono name={range.icon} className="w-3.5" style={{ color: range.ink }} />
                      </span>
                      <h3 className="h-poster-xs text-ink">{range.name}</h3>
                      {soon ? (
                        <span
                          className="chip chip-solid"
                          style={{ "--chip-bg": "var(--color-ink)", "--chip-fg": "var(--color-marigold)" }}
                        >
                          Coming soon
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 max-w-md text-copy text-ink-soft">{PITCH[range.id]}</p>
                  </div>

                  {soon ? null : (
                    <Link
                      href={`/shop?range=${range.id}`}
                      className="label-micro flex shrink-0 items-center gap-2 text-oxblood transition-transform hover:translate-x-1"
                    >
                      See all {all.length}
                      <svg viewBox="0 0 24 24" className="w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h13M12 6l6 6-6 6" />
                      </svg>
                    </Link>
                  )}
                </div>

                {soon ? (
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-[1.2rem] border-2 border-dashed border-ink/25 bg-paper/60 px-5 py-5">
                    <SpiceIcon mono name={range.icon} className="w-8 shrink-0 text-ink-mute" />
                    <p className="min-w-[16rem] flex-1 text-copy text-ink-soft">
                      <span className="font-semibold text-ink">Abhi ban raha hai.</span> Till then,
                      every blend we make today sits under Essentials.
                    </p>
                    <Link href="/shop" className="btn btn-ghost btn-sm shrink-0 text-ink">
                      Shop what&rsquo;s ready
                    </Link>
                  </div>
                ) : (
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {all.slice(0, 6).map((p, j) => (
                      <ProductCard key={p.slug} product={p} index={j} />
                    ))}
                  </div>
                )}

                {range.id === "heritage" && (
                  <p className="mt-6 max-w-lg font-editorial text-copy-lg italic text-ink-soft">
                    Hand-pounded. Slow-ground. Un khaane ki mehfilon ke liye, jinka zikr baad mein
                    bhi hota hai.
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
