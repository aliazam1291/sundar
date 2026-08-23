import Hero from "@/components/sections/hero";
import Categories from "@/components/sections/categories";
import StoryTeaser from "@/components/sections/story-teaser";
import RecipeTeaser from "@/components/sections/recipe-teaser";
import Reviews from "@/components/sections/reviews";
import HornOkPlease from "@/components/sections/horn-ok-please";
import Ritual from "@/components/sections/ritual";
import Marquee from "@/components/marquee";
import { TICKER } from "@/lib/content";

/**
 * The page reads: the promise → what we sell → who we are → what to cook →
 * how to use it → who says so.
 *
 * The testimonials close the page. They used to sit mid-scroll between the
 * recipes and the ritual, which spent the strongest social proof on someone
 * still browsing; last position means the final thing read before the footer
 * is somebody else vouching for the mill.
 *
 * Sections that used to sit here and no longer do: the sourcing pillars (they
 * render in full on /story — it was being scrolled past twice), the region
 * map (the Regions range is no longer part of the site, so neither is its
 * map; the component is still in the repo), the brand-platform cards, and
 * the chutki essay, the horn and the separate featured shelf, which the
 * category section now covers. Their components are all still in the repo.
 */
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

      {/* what we sell */}
      <Categories />

      <div className="trim-band" style={{ "--trim-a": "var(--color-dragonfruit)", "--trim-b": "var(--color-sun)" }} aria-hidden="true" />

      {/* the breather — loudest thing on the page, and the hinge into the film */}
      <HornOkPlease />

      {/* The horn is painted derbyshire and the story oxblood — a real
          change of panel, so it gets the painted seam the other joins have.
          Before this the two sat flush and, both being dark, ran together. */}
      <div className="trim-band" style={{ "--trim-a": "var(--color-marigold)", "--trim-b": "var(--color-chilli)" }} aria-hidden="true" />

      {/* who we are — the trailer; the full reel is on /story */}
      <StoryTeaser />

      {/* what to cook */}
      <RecipeTeaser />

      <div className="trim-band" style={{ "--trim-a": "var(--color-tomato)", "--trim-b": "var(--color-sun)" }} aria-hidden="true" />

      {/* how to actually use it */}
      <Ritual />


      <div className="trim-band" style={{ "--trim-a": "var(--color-sun)", "--trim-b": "var(--color-raspberry)" }} aria-hidden="true" />

      {/* who says so — the last word before the footer */}
      <Reviews />

    </>
  );
}
