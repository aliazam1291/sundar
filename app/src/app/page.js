import Hero from "@/components/sections/hero";
import Chutki from "@/components/sections/chutki";
import Ranges from "@/components/sections/ranges";
import Featured from "@/components/sections/featured";
import Journey from "@/components/sections/journey";
import Sourcing from "@/components/sections/sourcing";
import RegionMap from "@/components/sections/region-map";
import Ritual from "@/components/sections/ritual";
import HornOkPlease from "@/components/sections/horn-ok-please";
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

      <HornOkPlease />
      <Chutki />

      <div className="trim-band" style={{ "--trim-a": "var(--color-dragonfruit)", "--trim-b": "var(--color-sun)" }} aria-hidden="true" />
      <Ranges />

      <Featured />
      <Journey />

      <div className="trim-band" style={{ "--trim-a": "var(--color-kiwi)", "--trim-b": "var(--color-sun)" }} aria-hidden="true" />
      <Sourcing />

      <RegionMap />
      <Ritual />

      <div className="trim-band" style={{ "--trim-a": "var(--color-cobalt)", "--trim-b": "var(--color-raspberry)" }} aria-hidden="true" />
      <FindUs />
    </>
  );
}
