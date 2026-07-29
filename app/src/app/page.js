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

      <div className="border-y-2 border-ink bg-marigold py-3.5 text-ink">
        <Marquee
          items={TICKER}
          speed={30}
          gap="2.5rem"
          reverse
          itemClassName="font-poster text-[1.35rem] sm:text-[1.7rem] leading-none"
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
