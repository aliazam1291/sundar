import Link from "next/link";
import { REVIEWS } from "@/lib/content";
import { getProduct } from "@/lib/products";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import Bilingual from "@/components/bilingual";

/**
 * What customers say.
 *
 * Cards render whatever a review actually carries and nothing more — a
 * rating only appears if `stars` is set, a platform only if `via` is. See
 * REVIEWS in lib/content.js for why those fields are currently empty.
 *
 * Cobalt, not forest: this section now closes the page, and the footer it
 * hands off to is forest — two forest bands meeting would have read as one.
 * Measured on cobalt: ghee 5.90, marigold 4.92, paper 7.12.
 */
export default function Reviews() {
  return (
    <section className="relative isolate overflow-hidden bg-cobalt section text-ghee">
      <Sunburst
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-marigold"
        rays={44}
        opacity={0.1}
      />
      <div className="tex-grid pointer-events-none absolute inset-0 opacity-25" />

      <div className="shell relative">
        <div className="max-w-2xl" data-reveal="up">
          <p
            className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
            style={{ "--plaque-bg": "var(--color-marigold)", "--plaque-fg": "var(--color-ink)" }}
          >
            <Star className="w-3.5" />
            Log bole, toh baat hai
          </p>
          <Bilingual
            className="mt-4"
            size="editorial"
            accent="text-marigold"
            hi="हम क्यों बोलें सुंदर ख़ास है?"
            en="Hum kyon bole Sunder khaas hai?"
          />
        </div>

        <ul className="section-body grid gap-5 sm:grid-cols-2">
          {REVIEWS.map((r, i) => {
            const pack = r.product ? getProduct(r.product) : null;

            return (
              <li
                key={r.name}
                data-reveal="up"
                style={{ "--reveal-delay": `${(i % 2) * 90}ms` }}
                className="card-poster card-pad flex flex-col bg-paper text-ink"
              >
                {r.stars ? (
                  <p
                    className="text-[1.05rem] leading-none tracking-[0.12em] text-chilli"
                    aria-label={`${r.stars} out of 5`}
                  >
                    <span aria-hidden="true">
                      {"★".repeat(r.stars)}
                      <span className="text-ink/25">{"★".repeat(5 - r.stars)}</span>
                    </span>
                  </p>
                ) : (
                  <SpiceIcon
                    mono
                    name="pinch"
                    className="w-8 shrink-0 text-chilli-ink"
                    aria-hidden="true"
                  />
                )}

                <p className="mt-4 font-editorial text-copy-lg italic leading-relaxed text-ink">
                  &ldquo;{r.body}&rdquo;
                </p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                  <p className="label-micro text-ink-soft">
                    {r.name}
                    {r.via ? <span className="text-ink-mute"> · bought on {r.via}</span> : null}
                  </p>

                  {pack ? (
                    <Link
                      href={`/shop/${pack.slug}`}
                      className="chip border-ink/25 text-ink transition-colors hover:border-ink"
                    >
                      <SpiceIcon mono name={pack.icon} className="w-3.5" />
                      {pack.name}
                    </Link>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
