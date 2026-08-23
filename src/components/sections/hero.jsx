import Link from "next/link";
import HeroFamily from "@/components/hero-family";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";

const TRUST = [
  { title: "100% Pure Spices", note: "The spice, and nothing bulking it out", icon: "sprig" },
  { title: "No Artificial Colour", note: "The red is the chilli. Nothing else.", icon: "chilli" },
  { title: "Hygienically Packed", note: "Sealed the day it is ground", icon: "jar" },
  { title: "Cold-milled Under 40°C", note: "Slow and cool, so the oil stays in the spice", icon: "chakki" },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-forest-2 via-forest to-forest text-ghee">
      <Sunburst className="pointer-events-none absolute inset-x-0 bottom-0 h-[120%] w-full text-marigold" rays={56} opacity={0.11} />
      <div className="tex-grid pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div className="shell relative grid items-center gap-10 pb-12 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-16 lg:pt-12">
        <div className="anim-rise">
          <p className="plaque tilt-tag label-micro inline-flex items-center gap-2.5" style={{ animationDelay: "60ms", "--plaque-bg": "var(--color-dragonfruit)", "--plaque-fg": "var(--color-paper)" }}>
            <Star className="w-3.5" />
            Since 1975 · Indore, Madhya Pradesh
          </p>
          <h1 className="font-poster text-drop mt-4 text-[clamp(2.6rem,5.6vw,4.8rem)] leading-[0.94] text-ghee" style={{ "--drop": "var(--color-oxblood)" }}>
            Kam Masala,<br /><span className="text-marigold">Poora Swaad.</span>
          </h1>
          <p className="lede mt-4 max-w-lg text-ghee/80">50 saal se har khane mein.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/shop" className="btn btn-gold"><SpiceIcon mono name="jar" className="w-4" />Explore spices</Link>
            <Link href="/story" className="btn btn-ghost text-marigold">A boy, a bicycle, 1975</Link>
          </div>
        </div>

        <div className="relative"><HeroFamily /></div>
      </div>

      <div className="beads relative h-3 w-full text-marigold/50" aria-hidden="true" />
      <div className="relative border-t-2 border-marigold/25 bg-forest-2">
        <div className="shell">
          <ul className="grid gap-px bg-marigold/20 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map((trust) => (
              <li key={trust.title} className="flex items-start gap-3.5 bg-forest-2 px-1 py-6 sm:px-5 lg:px-6">
                <SpiceIcon mono name={trust.icon} className="mt-0.5 w-6 shrink-0 text-marigold" />
                <span className="min-w-0"><span className="label-micro block text-marigold">{trust.title}</span><span className="mt-1.5 block text-copy leading-snug text-ghee">{trust.note}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
