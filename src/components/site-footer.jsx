import Link from "next/link";
import Logo from "@/components/logo";
import Marquee from "@/components/marquee";
import RevealRoot from "@/components/reveal-root";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import { RANGE_LIST } from "@/lib/products";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All blends" },
      { href: "/shop?range=heritage", label: "Heritage" },
      { href: "/shop?range=regions", label: "Regions" },
      { href: "/shop?range=essentials", label: "Essentials" },
    ],
  },
  {
    title: "The brand",
    links: [
      { href: "/story", label: "Our story" },
      { href: "/regions", label: "Regional map" },
      { href: "/recipes", label: "Rasoi · recipes" },
      { href: "/#ritual", label: "The chutki ritual" },
      { href: "/#sourcing", label: "Sourcing" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/#contact", label: "Contact" },
      { href: "/#stockists", label: "Stockists" },
      { href: "/#trade", label: "Wholesale & HoReCa" },
      { href: "/#shipping", label: "Shipping" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-forest text-ghee">
      <RevealRoot />

      <Sunburst
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] w-full text-marigold"
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
              <p className="mt-2 text-sm text-ghee/60">
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

        {/* range strip */}
        <div className="section-body grid gap-3 border-t border-ghee/15 pt-10 sm:grid-cols-3">
          {RANGE_LIST.map((r, i) => (
            <div
              key={r.id}
              data-reveal="up"
              style={{ "--reveal-delay": `${i * 80}ms` }}
              className="flex items-start gap-3.5"
            >
              <SpiceIcon name={r.icon} className="mt-0.5 w-7 shrink-0 text-marigold" />
              <div>
                <p className="font-poster text-lg leading-none">{r.name}</p>
                <p className="mt-1.5 text-label text-ghee/60">{r.who}</p>
              </div>
            </div>
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
