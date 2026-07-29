import { RITUAL, JOURNAL } from "@/lib/content";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";

const TONE = {
  forest: "bg-forest text-ghee",
  chilli: "bg-chilli text-paper",
  saffron: "bg-saffron text-ink",
};

export default function Ritual() {
  return (
    <>
      {/* ── the ritual ── */}
      <section id="ritual" className="tex-paper relative overflow-hidden bg-sand/60 py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div data-reveal="up">
              <p className="eyebrow flex items-center gap-2.5 text-chilli">
                <Star className="w-3.5" />
                How to use it
              </p>
              <h2 className="h-poster-sm mt-5 text-ink">
                The chutki
                <br />
                <span className="text-chilli">ritual.</span>
              </h2>
              <p className="lede mt-6 max-w-md text-ink/68">
                Four steps, thirty seconds, and the difference between a dish that tastes of spice
                and one that tastes of dust.
              </p>

              <SpiceIcon name="pinch" className="mt-10 hidden w-32 text-ink/15 lg:block" strokeWidth={1.2} />
            </div>

            <ol className="relative space-y-3">
              {RITUAL.map((r, i) => (
                <li
                  key={r.step}
                  data-reveal="left"
                  style={{ "--reveal-delay": `${i * 100}ms` }}
                  className="group relative flex items-start gap-5 rounded-[1.3rem] border-2 border-ink/12 bg-paper/85 p-5 transition-all hover:border-ink sm:p-7"
                >
                  <span className="font-poster shrink-0 text-[2.6rem] leading-none text-saffron transition-colors group-hover:text-chilli sm:text-[3.2rem]">
                    {r.step}
                  </span>
                  <span>
                    <span className="font-editorial block text-[1.3rem] leading-tight text-ink">
                      {r.title}
                    </span>
                    <span className="mt-2 block text-[0.96rem] leading-relaxed text-ink/62">
                      {r.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── the platforms ── */}
      <section className="relative overflow-hidden bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl" data-reveal="up">
            <p className="eyebrow flex items-center gap-2.5 text-chilli">
              <Star className="w-3.5" />
              Beyond the packet
            </p>
            <h2 className="h-editorial mt-4 text-ink">
              We do not wait for the event. We are the event.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {JOURNAL.map((j, i) => (
              <article
                key={j.title}
                data-reveal="up"
                style={{ "--reveal-delay": `${i * 110}ms` }}
                className={`card-lift group relative isolate flex min-h-[19rem] flex-col justify-between overflow-hidden rounded-[1.6rem] border-2 border-ink p-7 ${TONE[j.tone]}`}
              >
                <Sunburst className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] w-full" rays={36} opacity={0.12} />
                <SpiceIcon
                  name={j.icon}
                  className="pointer-events-none absolute -bottom-6 -right-4 w-40 opacity-[0.16] transition-transform duration-700 group-hover:rotate-6"
                />

                <div className="relative">
                  <span className="chip border-current/40 opacity-75">{j.kicker}</span>
                  <h3 className="font-poster mt-6 text-[2.1rem] leading-[0.9]">{j.title}</h3>
                </div>

                <p className="relative mt-8 max-w-xs text-[0.98rem] leading-relaxed opacity-82">
                  {j.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
