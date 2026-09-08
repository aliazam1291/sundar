import FindUs from "@/components/sections/find-us";
import { Star, Sunburst } from "@/components/spice-icons";
import PagePortrait from "@/components/page-portrait";
import Bilingual from "@/components/bilingual";
import { PRODUCTS } from "@/lib/products";

/**
 * Where to buy — stockists, shipping, trade.
 *
 * This exists because the footer's Help column had four links (Contact,
 * Stockists, Wholesale, Shipping) that all deep-linked into the closing
 * section of the home page. Clicking a link labelled "Shipping" dropped you
 * at the bottom of a 9-screen home page with no context, which reads as the
 * site being broken rather than as an anchor doing its job.
 *
 * Those links now land here, at the top of a short page that is only about
 * buying. The same FindUs block still closes the home page — there it is the
 * final call to action, here it is the destination.
 */
export const metadata = {
  title: "Where to buy",
  description: `50,000+ kirana stores and nationwide shipping on all ${PRODUCTS.length} Sunder blends. Wholesale and distributor enquiries too.`,
  alternates: { canonical: "/where-to-buy" },
};

export default function WhereToBuyPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-oxblood section-sm text-paper">
        <Sunburst
          className="pointer-events-none absolute inset-0 h-full w-full text-marigold"
          rays={48}
          opacity={0.1}
        />

        {/* Sudhaji sent Bunty out with the bag — the errand this whole
            page is about. */}
        <div className="shell relative grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
          <div>
            <p
              className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
              style={{ "--plaque-bg": "var(--color-sun)", "--plaque-fg": "var(--color-ink)" }}
            >
              <Star className="w-3.5" />
              Stockists &amp; shipping
            </p>

            <Bilingual
              as="h1"
              className="mt-4 max-w-3xl"
              accent="text-marigold"
              hi="कहाँ मिलेगा?"
              en="Where to buy Sunder."
            />

            <p className="lede mt-5 max-w-xl text-paper/80">
              On the shelf at your kirana, or shipped from the mill — plus bulk formats if you
              are buying for a kitchen or a counter.
            </p>
          </div>

          <PagePortrait
            src="/sudhaji-bunty-cutout.webp"
            alt="Sudhaji sending Bunty off with the market bag"
            width={1145}
            height={1374}
            name="Sudhaji & Bunty"
            spot="var(--color-sun)"
            plaqueBg="var(--color-sun)"
            priority
          />
        </div>
      </section>

      <FindUs />
    </>
  );
}
