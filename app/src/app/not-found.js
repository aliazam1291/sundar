import Link from "next/link";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[72vh] items-center overflow-hidden bg-forest py-24 text-ghee">
      <Sunburst
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-marigold"
        rays={48}
        opacity={0.11}
      />
      <div className="tex-grid pointer-events-none absolute inset-0 opacity-30" />

      <SpiceIcon
        name="chilli"
        className="anim-float pointer-events-none absolute -right-6 top-10 w-56 text-marigold/20"
        style={{ "--dur": "8s", "--r": "12deg" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <p className="eyebrow flex items-center gap-2.5 text-marigold">
          <Star className="w-3.5" />
          Error 404
        </p>

        <h1 className="h-poster mt-5 max-w-3xl">
          Bland? Not on
          <br />
          <span className="text-marigold">our watch.</span>
        </h1>

        <p className="lede mt-7 max-w-lg text-ghee/72">
          This page has gone the way of an unlabelled jar at the back of the shelf. The spice box,
          however, is right where you left it.
        </p>

        <div className="mt-9 flex flex-wrap gap-3.5">
          <Link href="/shop" className="btn btn-gold">
            <SpiceIcon name="jar" className="w-4" />
            Shop the range
          </Link>
          <Link href="/" className="btn btn-ghost text-ghee">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
