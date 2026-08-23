import Link from "next/link";
import Logo from "@/components/logo";
import Marquee from "@/components/marquee";
import RevealRoot from "@/components/reveal-root";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import { CATEGORY_LIST, productsByCategory } from "@/lib/products";

const COLUMNS = [
  {
    title: "Spices",
    links: [
      { href: "/shop", label: "All blends" },
      { href: "/shop?category=blended", label: "Blended spices" },
      { href: "/shop?category=pure", label: "Pure spices" },
      { href: "/shop?category=whole", label: "Whole spices" },
      { href: "/shop?category=asafoetida", label: "Asafoetida · hing" },
    ],
  },
  {
    title: "The brand",
    links: [
      { href: "/story", label: "Our story" },
      { href: "/recipes", label: "Rasoi · recipes" },
      { href: "/#ritual", label: "The chutki ritual" },
      { href: "/story#sourcing", label: "Sourcing" },
    ],
  },
  {
    title: "Help",
    links: [
      /* These four used to be /#contact, /#stockists, /#trade and /#shipping —
         anchors into the last section of the home page, so every one of them
         dropped you at the bottom of a nine-screen page. They point at the
         dedicated page now. */
      { href: "/faq", label: "FAQs" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-forest text-ghee">
      <RevealRoot />

      {/* inset-0, not a partial height. The rays are anchored bottom-centre
          by the SVG's own preserveAspectRatio, so a box shorter than the
          footer leaves the top flat and draws a hard seam straight across
          it — the same trap already noted in ranges/categories. */}
      <Sunburst
        className="pointer-events-none absolute inset-0 h-full w-full text-marigold"
        rays={52}
        opacity={0.1}
      />

      {/* big kinetic endline */}
      <div className="relative border-b border-ghee/15 py-7">
        <Marquee
          items={["Kam masala, poora swaad", "Local hero masala", "Since 1975", "Ek chutki, full fire"]}
          speed={38}
          gap="3rem"
          itemClassName="h-poster-sm text-marigold"
        />
      </div>

      <div className="shell relative section">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          {/* brand + newsletter */}
          <div data-reveal="up">
            <Logo className="h-auto w-[150px]" />

            <p className="lede mt-5 text-ghee/75">
              Slow-ground, single-origin Indian spice from the heart of Madhya Pradesh. One recipe,
              carried fifty years.
            </p>

            <form
              className="mt-8"
              aria-label="Newsletter signup"
            >
              <label
                htmlFor="footer-email"
                className="eyebrow block text-marigold"
              >
                The Chutki Letter
              </label>
              <p className="mt-2 text-sm text-ghee/70">
                One recipe, one region, one spice note. Monthly, never more.
              </p>
              <div className="mt-4 flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="you@kitchen.in"
                  className="min-w-0 flex-1 rounded-full border-2 border-ghee/30 bg-transparent px-4 py-3 text-sm text-ghee placeholder:text-ghee/40 focus:border-marigold focus:outline-none"
                />
                <button type="submit" className="btn btn-gold shrink-0 !px-5">
                  Join
                </button>
              </div>
            </form>
          </div>

          {/* link columns */}
          <div className="grid gap-8 sm:grid-cols-3 lg:gap-10" data-reveal="up" style={{ "--reveal-delay": "120ms" }}>
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="eyebrow text-marigold">{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="link-sweep inline-block py-1.5 text-copy text-ghee/75 hover:text-ghee">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* shelf strip — four now, so it steps 1 → 2 → 4 rather than
            leaving a lone orphan on the second row of a three-up grid */}
        <div className="section-body grid gap-3 border-t border-ghee/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_LIST.map((c, i) => (
            <Link
              key={c.id}
              href={`/shop?category=${c.id}`}
              data-reveal="up"
              style={{ "--reveal-delay": `${i * 80}ms` }}
              className="flex items-start gap-3.5 rounded-xl p-2 -m-2 transition-colors hover:bg-ghee/8"
            >
              <SpiceIcon name={c.icon} className="mt-0.5 w-7 shrink-0 text-marigold" />
              <div className="min-w-0">
                <p className="font-poster text-lg leading-none">{c.name}</p>
                <p className="mt-1.5 text-label text-ghee/70">
                  {productsByCategory(c.id).length} blends
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* legal */}
        <div className="mt-12 flex flex-col gap-4 border-t border-ghee/15 pt-7 text-label text-ghee/55 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <Star className="w-3 text-marigold" />
            © {new Date().getFullYear()} Sunder Masala · Indore, Madhya Pradesh
          </p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>FSSAI licensed</span>
            <span>No colours · No preservatives</span>
            <span className="font-deva">मसालों का सिकंदर</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
