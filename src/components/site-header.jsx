"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/logo";
import Marquee from "@/components/marquee";
import SiteSearch from "@/components/site-search";
import { Star, SpiceIcon } from "@/components/spice-icons";
import { TICKER } from "@/lib/content";
import { RANGE_LIST, productsByRange, featuredProducts, PRODUCTS } from "@/lib/products";
import { RECIPES } from "@/lib/recipes";

/**
 * The top nav.
 *
 * Six flat links had crowded the actions off the right edge by 1024px, and
 * the site's actual taxonomy — the three ranges — was not reachable from the
 * nav at all. Four groups with two menus fixes both: every old destination is
 * still one or two moves away, and Shop finally opens onto the ranges.
 *
 * `match` is what decides the current section. Comparing pathname to href
 * exactly meant a product page highlighted nothing, so you could be three
 * levels into the shop with no idea where you were.
 */

const NAV = [
  {
    label: "Shop",
    href: "/shop",
    match: (p) => p.startsWith("/shop"),
    menu: "ranges",
  },
  {
    label: "Rasoi",
    href: "/recipes",
    match: (p) => p.startsWith("/recipes"),
  },
  {
    label: "Our Story",
    href: "/story",
    match: (p) => p.startsWith("/story") || p.startsWith("/regions"),
    links: [
      { href: "/story", label: "Our story", note: "A boy, a bicycle, 1975", icon: "starAnise" },
      { href: "/regions", label: "Regional map", note: "Twelve districts, twelve plates", icon: "thela" },
      { href: "/#ritual", label: "The chutki", note: "Kam masala, poora swaad", icon: "pinch" },
    ],
  },
  {
    label: "FAQs",
    href: "/faq",
    match: (p) => p.startsWith("/faq"),
  },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [menu, setMenu] = useState(null);
  const pathname = usePathname();

  const headerRef = useRef(null);
  const navRef = useRef(null);
  const hoverTimer = useRef(null);

  /* Close everything when the route changes. Adjusting state during render
     rather than in an effect — the effect form is a cascading render and the
     lint rule is right to flag it. */
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setSheet(false);
    setMenu(null);
  }

  useEffect(() => {
    // Read synchronously: setState with an unchanged boolean is a no-op, so
    // this stays cheap without depending on rAF (which stalls in background
    // tabs and non-compositing contexts).
    const onScroll = () =>
      setScrolled((window.scrollY || document.documentElement.scrollTop || 0) > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Publish the live header height so sticky sub-navs can pin flush
     against it at any breakpoint, in either scroll state. */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const publish = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${Math.round(el.getBoundingClientRect().height)}px`
      );
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Escape closes whichever layer is open; a click outside closes the menu. */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (menu) setMenu(null);
      else if (sheet) setSheet(false);
    };
    const onDown = (e) => {
      if (menu && navRef.current && !navRef.current.contains(e.target)) setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [menu, sheet]);

  // lock scroll behind the sheet
  useEffect(() => {
    document.body.style.overflow = sheet ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheet]);

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  /* A small grace period on leave, or the menu flickers shut while the
     pointer crosses the gap between the trigger and the panel. */
  const hoverOpen = useCallback((label) => {
    clearTimeout(hoverTimer.current);
    setMenu(label);
  }, []);
  const hoverClose = useCallback(() => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMenu(null), 140);
  }, []);

  return (
    <>
      {/* Announcement ticker. Sits in its own landmark or its contents count
          as page content outside any region; and rani-deep rather than rani
          because paper on rani measures 4.21 — under the 4.5 a 0.7rem label
          needs. */}
      <aside
        aria-label="Announcements"
        className="relative z-50 border-b-2 border-ink bg-rani-deep py-2 text-paper"
      >
        <div className="beads absolute inset-x-0 top-0 h-1.5 text-marigold/70" aria-hidden="true" />
        <Marquee items={TICKER} speed={42} gap="2rem" itemClassName="label-micro" />
      </aside>

      <header
        ref={headerRef}
        className={`sticky top-0 z-50 border-b-2 transition-all duration-300 ${
          scrolled ? "border-ink/15 bg-paper/92 backdrop-blur-md" : "border-transparent bg-paper"
        }`}
      >
        <div className="shell flex items-center gap-4">
          <Link
            href="/"
            aria-label="Sunder Masala — home"
            className={`shrink-0 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}
          >
            <Logo
              priority
              className={`w-auto transition-all duration-300 ${scrolled ? "h-10" : "h-12"}`}
            />
          </Link>

          {/* desktop nav */}
          <nav ref={navRef} className="hidden flex-1 items-center gap-1 lg:flex" aria-label="Main">
            {NAV.map((item) => {
              const active = item.match(pathname);
              const hasMenu = Boolean(item.menu || item.links);
              const open = menu === item.label;

              if (!hasMenu) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`label rounded-full px-3.5 py-2.5 transition-colors hover:text-rani-ink xl:px-4 ${
                      active ? "text-rani-ink" : "text-ink-soft"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hoverOpen(item.label)}
                  onMouseLeave={hoverClose}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() => setMenu(open ? null : item.label)}
                    className={`label flex items-center gap-1.5 rounded-full px-3.5 py-2.5 transition-colors hover:text-rani-ink xl:px-4 ${
                      active || open ? "text-rani-ink" : "text-ink-soft"
                    }`}
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 24 24"
                      className={`w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="m5 9 7 7 7-7" />
                    </svg>
                  </button>

                  {open ? (
                    <div className="anim-swap absolute left-0 top-full z-50 pt-3">
                      <div className="card-poster w-[24rem] overflow-hidden bg-paper p-2.5" style={{ "--card-shadow": "var(--color-oxblood)" }}>
                        {item.menu === "ranges" ? <RangeMenu onPick={() => setMenu(null)} /> : null}
                        {item.links ? <LinkMenu links={item.links} onPick={() => setMenu(null)} /> : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
            <SiteSearch />

            <Link href="/shop" className="btn btn-hot btn-sm hidden md:inline-flex">
              <SpiceIcon mono name="jar" className="w-4" />
              <span className="hidden xl:inline">Buy the range</span>
              <span className="xl:hidden">Shop</span>
            </Link>

            <button
              type="button"
              onClick={() => setSheet((v) => !v)}
              aria-expanded={sheet}
              aria-controls="mobile-nav"
              aria-label={sheet ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-content-center rounded-full border-2 border-ink transition-colors hover:bg-ink hover:text-paper lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 block h-[2px] w-full bg-current transition-all duration-300 ${
                    sheet ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-[2px] w-full bg-current transition-opacity duration-200 ${
                    sheet ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[2px] w-full bg-current transition-all duration-300 ${
                    sheet ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* mobile sheet */}
      {/* `inert` as well as aria-hidden: without it the closed sheet is still
          in the tab order, so a keyboard user tabs into an invisible menu. */}
      <div
        id="mobile-nav"
        aria-hidden={!sheet}
        inert={!sheet}
        className={`fixed inset-0 z-40 lg:hidden ${sheet ? "" : "pointer-events-none"}`}
      >
        <div
          onClick={() => setSheet(false)}
          className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${
            sheet ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav
          aria-label="Main"
          className={`tex-sunburst absolute inset-x-0 top-0 origin-top overflow-y-auto bg-forest pt-[calc(var(--header-h,4.6rem)+2.5rem)] pb-10 text-ghee transition-transform duration-500 ${
            sheet ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{ maxHeight: "100dvh", transitionTimingFunction: "var(--ease-spice)" }}
        >
          <div className="px-6">
            {/* The ranges lead on mobile too — they are what people came for,
                and burying them under a "Shop" tap cost a whole step. */}
            <p className="eyebrow text-marigold">Shop the ranges</p>
            <ul className="mt-3 grid gap-2">
              {RANGE_LIST.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/shop?range=${r.id}`}
                    className="flex items-center gap-3 rounded-xl border border-ghee/20 px-4 py-3.5"
                  >
                    <SpiceIcon name={r.icon} className="w-6 shrink-0 text-marigold" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{r.full}</span>
                      <span className="label-micro mt-0.5 block text-ghee/55">{r.who}</span>
                    </span>
                    <span className="label-micro shrink-0 text-marigold">
                      {productsByRange(r.id).length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-7 divide-y divide-ghee/15 border-y border-ghee/15">
              {[
                { href: "/#featured", label: "Start here", count: featuredProducts().length },
                { href: "/shop", label: "All blends", count: PRODUCTS.length },
                { href: "/recipes", label: "Rasoi", count: RECIPES.length },
                { href: "/story", label: "Our Story" },
                { href: "/regions", label: "Regions" },
                { href: "/faq", label: "FAQs" },
                { href: "/#ritual", label: "The Chutki" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex items-center justify-between gap-4 py-4">
                    <span className="font-poster text-[1.9rem] leading-none">{item.label}</span>
                    {item.count ? (
                      <span className="label-micro text-ghee/50">{item.count}</span>
                    ) : (
                      <Star className="w-3.5 text-marigold" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <Link href="/shop" className="btn btn-gold mt-7 w-full justify-center">
              <SpiceIcon mono name="jar" className="w-4" />
              Buy the range
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

/** The three ranges, with how much is in each. */
function RangeMenu({ onPick }) {
  return (
    <>
      <Link
        href="/#featured"
        onClick={onPick}
        className="flex items-center gap-3 rounded-[0.9rem] px-3 py-2.5 transition-colors hover:bg-cream"
      >
        <SpiceIcon mono name="flame" className="w-5 shrink-0 text-chilli-ink" />
        <span className="h-card flex-1 text-ink">Start here</span>
        <span className="label-micro text-ink-mute">{featuredProducts().length}</span>
      </Link>

      <Link
        href="/shop"
        onClick={onPick}
        className="flex items-center gap-3 rounded-[0.9rem] px-3 py-2.5 transition-colors hover:bg-cream"
      >
        <SpiceIcon mono name="jar" className="w-5 shrink-0 text-chilli-ink" />
        <span className="h-card flex-1 text-ink">All blends</span>
        <span className="label-micro text-ink-mute">{PRODUCTS.length}</span>
      </Link>

      <div className="rule-dots my-1.5 text-ink/20" aria-hidden="true" />

      {RANGE_LIST.map((r) => (
        <Link
          key={r.id}
          href={`/shop?range=${r.id}`}
          onClick={onPick}
          className="flex items-start gap-3 rounded-[0.9rem] px-3 py-2.5 transition-colors hover:bg-cream"
        >
          <span
            className="mt-0.5 grid h-9 w-9 shrink-0 place-content-center rounded-full border-2 border-ink"
            style={{ background: r.bg }}
          >
            <SpiceIcon mono name={r.icon} className="w-4" style={{ color: r.ink }} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-baseline justify-between gap-3">
              <span className="h-card text-ink">{r.name}</span>
              <span className="label-micro text-ink-mute">{productsByRange(r.id).length}</span>
            </span>
            <span className="mt-0.5 block text-meta text-ink-mute">{r.who}</span>
          </span>
        </Link>
      ))}
    </>
  );
}

/** A plain list of destinations with a line of context each. */
function LinkMenu({ links, onPick }) {
  return links.map((l) => (
    <Link
      key={l.href}
      href={l.href}
      onClick={onPick}
      className="flex items-start gap-3 rounded-[0.9rem] px-3 py-2.5 transition-colors hover:bg-cream"
    >
      <SpiceIcon mono name={l.icon} className="mt-1 w-5 shrink-0 text-chilli-ink" />
      <span className="min-w-0 flex-1">
        <span className="h-card block text-ink">{l.label}</span>
        <span className="mt-0.5 block text-meta text-ink-mute">{l.note}</span>
      </span>
    </Link>
  ));
}
