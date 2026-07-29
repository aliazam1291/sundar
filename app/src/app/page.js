import Hero from "@/components/sections/hero";
import Chutki from "@/components/sections/chutki";
import Ranges from "@/components/sections/ranges";
import Featured from "@/components/sections/featured";
import Journey from "@/components/sections/journey";
import Sourcing from "@/components/sections/sourcing";
import RegionMap from "@/components/sections/region-map";
import Ritual from "@/components/sections/ritual";
import FindUs from "@/components/sections/find-us";
import Marquee from "@/components/marquee";
import { TICKER } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="relative border-y-2 border-ink bg-turmeric py-4 text-ink">
        <div
          className="tex-stripe absolute inset-x-0 top-0 h-1.5 opacity-70"
          style={{ "--stripe": "var(--color-cobalt)" }}
          aria-hidden="true"
        />
        <Marquee
          items={TICKER}
          speed={30}
          gap="2.5rem"
          reverse
          itemClassName="h-poster-xs text-drop-sm"
        />
        <div
          className="tex-stripe absolute inset-x-0 bottom-0 h-1.5 opacity-70"
          style={{ "--stripe": "var(--color-rani)" }}
          aria-hidden="true"
        />
      </div>

      <Chutki />
      <Ranges />
      <Featured />
      <Journey />
      <Sourcing />
      <RegionMap />
      <Ritual />
      <FindUs />
    </>
  );
}
