import Link from "next/link";
import Journey from "@/components/sections/journey";
import Sourcing from "@/components/sections/sourcing";
import { TIMELINE, FOUNDER } from "@/lib/content";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";

export const metadata = {
  title: "Our story — a boy, a bicycle, 1975",
  description:
    "Fifty years from one stone chakki in Indore to a range of eighteen blends. The taste the same, the story new.",
};

export default function StoryPage() {
  return (
    <>
      {/* header */}
      <section className="relative isolate overflow-hidden bg-oxblood py-16 text-paper lg:py-24">
        <Sunburst
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-marigold"
          rays={52}
          opacity={0.1}
        />
        <SpiceIcon name="chakki" className="pointer-events-none absolute -right-10 top-4 w-80 text-marigold opacity-[0.09]" />

        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <p className="eyebrow flex items-center gap-2.5 text-marigold">
            <Star className="w-3.5" />
            Est. 1975 · MCMLXXV
          </p>

          <h1 className="h-poster mt-5 max-w-4xl">
            The taste the same.
            <br />
            <span className="text-marigold">The story new.</span>
          </h1>

          <p className="lede mt-7 max-w-xl text-paper/72">
            {FOUNDER.name} left his shop at {FOUNDER.departure} with a bag of chillies strapped to a
            bicycle. Fifty years later the bicycle is a factory — and the recipe has not moved.
          </p>
        </div>
      </section>

      {/* the film reel */}
      <Journey />

      {/* the making */}
      <section className="tex-paper bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl" data-reveal="up">
            <p className="eyebrow flex items-center gap-2.5 text-chilli-ink">
              <Star className="w-3.5" />
              The making
            </p>
            <h2 className="h-editorial mt-4 text-ink">
              Five decisions that changed how it tastes.
            </h2>
          </div>

          <ol className="mt-16 space-y-3">
            {TIMELINE.map((t, i) => (
              <li
                key={t.year}
                data-reveal="left"
                style={{ "--reveal-delay": `${i * 90}ms` }}
                className="group grid items-start gap-5 rounded-[1.4rem] border-2 border-ink/12 bg-paper/80 p-6 transition-all hover:border-ink sm:grid-cols-[auto_auto_1fr] sm:gap-8 sm:p-8"
              >
                <span className="font-poster text-[2.6rem] leading-none text-saffron-deep transition-colors group-hover:text-chilli-ink sm:text-[3.4rem]">
                  {t.year}
                </span>

                <SpiceIcon
                  name={t.icon}
                  className="hidden w-11 shrink-0 self-center text-ink/30 transition-all duration-500 group-hover:rotate-12 group-hover:text-ink/60 sm:block"
                />

                <span>
                  <span className="font-editorial block text-[1.4rem] leading-tight text-ink">
                    {t.title}
                  </span>
                  <span className="mt-2.5 block max-w-2xl text-[1rem] leading-relaxed text-ink/62">
                    {t.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Sourcing />

      {/* closing */}
      <section className="relative overflow-hidden bg-forest py-20 text-ghee lg:py-28">
        <Sunburst className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-marigold" rays={44} opacity={0.1} />
        <div className="relative mx-auto max-w-[1400px] px-4 text-center sm:px-6 lg:px-10">
          <h2 className="h-poster-sm mx-auto max-w-3xl" data-reveal="up">
            Bring your region
            <br />
            <span className="text-marigold">back to your plate.</span>
          </h2>
          <p className="lede mx-auto mt-6 max-w-lg text-ghee/70" data-reveal="up" style={{ "--reveal-delay": "80ms" }}>
            Eighteen blends, three ranges, one promise that has held for fifty years.
          </p>
          <Link href="/shop" className="btn btn-gold mt-9" data-reveal="up" style={{ "--reveal-delay": "160ms" }}>
            <SpiceIcon name="jar" className="w-4" />
            Shop the range
          </Link>
        </div>
      </section>
    </>
  );
}
