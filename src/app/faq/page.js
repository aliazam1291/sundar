import Link from "next/link";
import Backdrop from "@/components/backdrop";
import Bilingual, { DevaWatermark } from "@/components/bilingual";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import PagePortrait from "@/components/page-portrait";
import { FAQS, FAQ_GROUPS, faqsIn, faqJsonLd } from "@/lib/faqs";

export const metadata = {
  title: "FAQs — the questions people actually ask",
  description:
    "Kashmiri mirchi versus lal mirch, when garam masala goes in, whether hing is gluten free, how long a ground blend really lasts, and where to buy Sunder Masala.",
  alternates: { canonical: "/faq" },
};

/* Native <details> rather than a JS accordion: it is open-by-keyboard, works
   with in-page find, prints correctly, and needs no hydration. */
function Answer({ item }) {
  return (
    <details className="group border-b-2 border-ink/12 last:border-b-0">
      <summary className="flex cursor-pointer list-none items-start gap-4 py-5 [&::-webkit-details-marker]:hidden">
        <span className="mt-1 shrink-0 text-chilli-ink transition-transform duration-300 group-open:rotate-45">
          <svg viewBox="0 0 24 24" className="w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
        <span className="h-card flex-1 text-ink">{item.q}</span>
      </summary>
      <p className="pb-6 pl-8 text-copy-lg text-ink-soft">{item.a}</p>
    </details>
  );
}

export default function FaqPage() {
  return (
    <>
      {/* The same list renders the page and the structured data, so a rich
          result can never quote something the page does not say. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />

      {/* ── masthead ── */}
      <section className="relative isolate overflow-hidden bg-forest section text-ghee">
        <Sunburst
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-marigold"
          rays={44}
          opacity={0.1}
        />
        <DevaWatermark word="सवाल" className="text-marigold" position="right" opacity={0.1} />

        {/* Sudhaji, mid-answer — "ask us anything" reads better next to
            someone who looks like she already knows. */}
        <div className="shell relative grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="max-w-3xl">
            <p
              className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
              style={{ "--plaque-bg": "var(--color-sun)", "--plaque-fg": "var(--color-ink)" }}
            >
              <Star className="w-3.5" />
              Sawaal-jawaab · FAQs
            </p>

            <Bilingual
              as="h1"
              className="mt-4"
              accent="text-marigold"
              hi="जो आप पूछना चाहते थे।"
              en="The questions people actually ask."
            />

            <p className="lede mt-5 max-w-xl text-ghee/80">
              Straight answers about the blends, how to use them without wasting them, and where to
              get hold of them. If something is missing, ask us — it will end up here.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {FAQ_GROUPS.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="chip border-ghee/40 text-ghee transition-colors hover:border-marigold hover:text-marigold">
                    {g.label}
                    <span className="font-deva text-ghee/70" lang="hi">{g.hi}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <PagePortrait
            src="/sudhaji-cutout.webp"
            alt="Sudhaji"
            width={1145}
            height={1374}
            name="Sudhaji"
            spot="var(--color-marigold)"
            plaqueBg="var(--color-sun)"
            className="lg:mt-4"
            priority
          />
        </div>
      </section>

      <div className="trim-band" style={{ "--trim-a": "var(--color-marigold)", "--trim-b": "var(--color-tomato)" }} aria-hidden="true" />

      {/* ── the answers ── */}
      <section className="tex-paper relative overflow-hidden bg-cream section">
        <Backdrop field="margins" opacity={0.12} ornamentClass="text-oxblood/20" />

        <div className="shell relative grid gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:gap-14">
          <div data-reveal="left">
            <p className="label-micro text-chilli-ink">{FAQS.length} answers</p>
            <h2 className="h-editorial mt-3 text-ink">Ask away.</h2>
            <p className="mt-4 text-copy text-ink-soft">
              Still stuck? The shop pages carry the detail for each blend, and Rasoi has the
              method for the dishes they were made for.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/shop" className="btn btn-hot btn-sm">
                <SpiceIcon mono name="jar" className="w-4" />
                The shelf
              </Link>
              <Link href="/recipes" className="btn btn-ghost btn-sm text-ink">
                Rasoi
              </Link>
            </div>
          </div>

          <div className="space-y-8" data-reveal="right">
            {FAQ_GROUPS.map((g) => (
              <div
                key={g.id}
                id={g.id}
                className="card-poster card-pad bg-paper text-ink"
                style={{ "--card-shadow": "var(--color-marigold)" }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="h-poster-xs">{g.label}</h3>
                  <p className="font-deva text-copy text-ink-mute" lang="hi">{g.hi}</p>
                </div>
                <div className="rule-dots mt-3 text-ink/25" aria-hidden="true" />

                <div className="mt-2">
                  {faqsIn(g.id).map((item) => (
                    <Answer key={item.q} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
