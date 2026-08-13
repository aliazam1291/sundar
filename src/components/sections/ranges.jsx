import Link from "next/link";
import { RANGE_LIST, productsByRange } from "@/lib/products";
import { SpiceIcon, Star, Sunburst } from "@/components/spice-icons";
import Backdrop from "@/components/backdrop";
import Bilingual, { DevaWatermark } from "@/components/bilingual";
import { readableOn } from "@/lib/color";

export default function Ranges() {
  return (
    <section id="ranges" className="relative overflow-hidden bg-turmeric section text-ink">
      <div className="tex-dots pointer-events-none absolute inset-0 text-oxblood" aria-hidden="true" />
      <DevaWatermark word="मसाला" className="text-oxblood" position="right" opacity={0.09} />
      <Backdrop field="margins" tone="mono" opacity={0.14} ornamentClass="text-oxblood/25" />

      <div className="shell relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal="up">
            <p
              className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
              style={{ "--plaque-bg": "var(--color-forest)", "--plaque-fg": "var(--color-marigold)" }}
            >
              <Star className="w-3.5" />
              Teen range, teen mizaaj
            </p>
            <Bilingual
              className="mt-4 max-w-2xl text-ink"
              size="editorial"
              accent="text-oxblood"
              hi="हर रात का मसाला अलग होता है।"
              en="One spice box does not fit every night of the week."
            />
          </div>
          <Link href="/shop" className="btn btn-rani shrink-0" data-reveal="up" style={{ "--reveal-delay": "100ms" }}>
            See all 32 blends
          </Link>
        </div>

        <div className="section-body grid gap-5 lg:grid-cols-3">
          {RANGE_LIST.map((range, i) => {
            const count = productsByRange(range.id).length;
            const dark = range.id !== "regions";

            return (
              <Link
                key={range.id}
                href={`/shop?range=${range.id}`}
                data-reveal="up"
                style={{ "--reveal-delay": `${i * 110}ms`, background: range.bg, color: range.ink }}
                className="card-poster card-pad arch-top group relative isolate flex min-h-[27rem] flex-col justify-between overflow-hidden"
              >
                {/* inset-0, not a partial height: the rays are anchored
                    bottom-centre by the SVG's own preserveAspectRatio, so a
                    box shorter than the card just leaves the top fifth flat
                    and draws a visible seam across it. */}
                <Sunburst
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  rays={40}
                  opacity={dark ? 0.13 : 0.16}
                />

                <SpiceIcon
                  name={range.icon}
                  className="pointer-events-none absolute -bottom-8 -right-6 w-52 opacity-[0.14] transition-transform duration-700 group-hover:-translate-y-3 group-hover:rotate-6"
                />

                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    {/* fg was hardcoded to ink, which is fine against the
                        light accents but measures 1.65 against Regions'
                        oxblood one — dark text on a dark chip. readableOn
                        picks whichever of ink/paper actually clears contrast
                        against this specific accent. */}
                    <span
                      className="chip chip-solid"
                      style={{ "--chip-bg": range.accent, "--chip-fg": readableOn(range.accentHex) }}
                    >
                      {range.who}
                    </span>
                    <SpiceIcon name={range.icon} className="w-8 opacity-80" />
                  </div>

                  <h3 className={`${range.font} mt-7 text-[2.9rem] leading-[0.92] sm:text-[3.5rem]`}>
                    {range.name}
                  </h3>

                  <p className="mt-4 max-w-xs text-copy">{range.blurb}</p>
                </div>

                {/* Essentials is chilli/paper — the palette's tightest pair
                    at 4.57, so any opacity fade on the text drops it below
                    4.5. The rule-dots divider is decorative, not text, so it
                    can keep fading. */}
                <div className="relative mt-10">
                  <p className="h-card italic">&ldquo;{range.line}&rdquo;</p>

                  <div className="rule-dots mt-6 opacity-45" aria-hidden="true" />

                  <div className="mt-5 flex items-center justify-between">
                    <span className="label-micro">{count} blends</span>
                    <span className="label-micro flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1.5">
                      Explore
                      <svg viewBox="0 0 24 24" className="w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12h15M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
