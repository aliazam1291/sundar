import Link from "next/link";
import Logo from "@/components/logo";
import Marquee from "@/components/marquee";
import RevealRoot from "@/components/reveal-root";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import { SOCIAL_LINKS } from "@/components/social-icons";
import { CATEGORY_LIST } from "@/lib/products";

const COLUMNS = [
  {
    title: "Spices",
    links: [
      { href: "/shop", label: "All blends" },
      { href: "/shop?category=blended", label: "Blended spices" },
      { href: "/shop?category=pure", label: "Pure spices" },
      { href: "/shop?category=whole", label: "Whole spices" },
      { href: "/shop?category=asafoetida", label: "Hing" },
    ],
  },
  {
    title: "The brand",
    links: [
      { href: "/story", label: "Our story" },
      { href: "/recipes", label: "Rasoi · recipes" },
      { href: "/blog", label: "Blog" },
      { href: "/#ritual", label: "The chutki ritual" },
      { href: "/story#sourcing", label: "Sourcing" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/faq", label: "FAQs" },
      { href: "/contact", label: "Contact us" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-forest text-ghee">
      <RevealRoot />

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

            {/* Circle-badge treatment matches the category icons in the shelf
                strip below — same size, same border, same hover lift — so the
                social row reads as part of this footer's system rather than a
                bolted-on widget. */}
            <ul className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Sunder Masala on ${name}`}
                    className="grid h-11 w-11 place-content-center rounded-full border-2 border-ghee/25 text-ghee/80 transition-colors hover:border-marigold hover:text-marigold"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>

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

        {/* shelf strip */}
        <div className="section-body grid gap-3 border-t border-ghee/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_LIST.map((c) => (
            <Link
              key={c.id}
              href={`/shop?category=${c.id}`}
              className="flex items-center gap-3 rounded-2xl border-2 border-ghee/10 px-4 py-3.5 transition-colors hover:border-ghee/25 hover:bg-ghee/5"
            >
              <span
                className="grid h-9 w-9 shrink-0 place-content-center rounded-full border-2 border-ghee"
                style={{ background: c.bg }}
              >
                <SpiceIcon mono name={c.icon} className="w-4" style={{ color: c.ink }} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="h-card block text-ghee">{c.name}</span>
                <span className="label-micro mt-0.5 block truncate text-ghee/50">{c.line}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
