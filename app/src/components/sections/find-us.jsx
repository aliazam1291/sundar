import Link from "next/link";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";

const CHANNELS = [
  {
    id: "stockists",
    kicker: "Quick commerce",
    title: "Ten minutes away",
    body: "Blinkit and Instamart across Indore and Bhopal. The impulse and the packet, same evening.",
    icon: "truck",
  },
  {
    id: "shipping",
    kicker: "Direct",
    title: "Shipped nationwide",
    body: "Free over ₹799, dispatched within 24 hours of the mill. Harvest-dated, sealed the day it was ground.",
    icon: "jar",
  },
  {
    id: "trade",
    kicker: "Wholesale & HoReCa",
    title: "Kitchens & kirana",
    body: "10,000+ stores and 500+ highway dhabas stocked. Bulk formats and distributor terms on request.",
    icon: "thela",
  },
  {
    id: "contact",
    kicker: "Talk to us",
    title: "Ask us anything",
    body: "Blend questions, trade enquiries, or which masala your grandmother probably used.",
    icon: "pinch",
    contact: true,
  },
];

export default function FindUs() {
  return (
    <section className="relative isolate overflow-hidden bg-forest py-20 text-ghee lg:py-28">
      <Sunburst
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-marigold"
        rays={46}
        opacity={0.1}
      />
      <div className="tex-grid pointer-events-none absolute inset-0 opacity-25" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl" data-reveal="up">
          <p className="eyebrow flex items-center gap-2.5 text-marigold">
            <Star className="w-3.5" />
            Where to buy
          </p>
          <h2 className="h-editorial mt-4">
            The moment you crave it, it should be one tap away.
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((c, i) => (
            <div
              key={c.id}
              id={c.id}
              data-reveal="up"
              style={{ "--reveal-delay": `${i * 90}ms` }}
              className="group scroll-mt-32 rounded-[1.4rem] border border-ghee/20 bg-ghee/[0.05] p-6 transition-colors hover:border-marigold/55 hover:bg-ghee/10"
            >
              <SpiceIcon
                name={c.icon}
                className="w-9 text-marigold transition-transform duration-500 group-hover:-rotate-12"
              />
              <p className="eyebrow mt-6 text-marigold/80">{c.kicker}</p>
              <h3 className="font-editorial mt-2.5 text-[1.3rem] leading-tight">{c.title}</h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-ghee/65">{c.body}</p>

              {c.contact ? (
                <a
                  href="mailto:hello@sundermasala.com"
                  className="link-sweep mt-5 inline-block text-[0.85rem] font-semibold text-marigold"
                >
                  hello@sundermasala.com
                </a>
              ) : null}
            </div>
          ))}
        </div>

        <div
          className="mt-6 flex flex-col items-start justify-between gap-5 rounded-[1.4rem] border-2 border-marigold bg-marigold/12 px-7 py-7 sm:flex-row sm:items-center sm:px-10"
          data-reveal="up"
        >
          <p className="font-poster text-[1.7rem] leading-none text-marigold sm:text-[2.1rem]">
            No dead ends.
          </p>
          <Link href="/shop" className="btn btn-gold shrink-0">
            <SpiceIcon name="jar" className="w-4" />
            Shop the range
          </Link>
        </div>
      </div>
    </section>
  );
}
