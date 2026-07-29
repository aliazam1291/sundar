"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/logo";
import Marquee from "@/components/marquee";
import { Star, SpiceIcon } from "@/components/spice-icons";
import { TICKER } from "@/lib/content";
import { RANGE_LIST } from "@/lib/products";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/story", label: "Our Story" },
  { href: "/regions", label: "Regions" },
  { href: "/#ritual", label: "The Chutki" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef(null);

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

  // close the sheet on navigation
  useEffect(() => setOpen(false), [pathname]);

  // lock scroll behind the sheet
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* announcement ticker */}
      <div className="relative z-50 border-b-2 border-ink bg-chilli py-2 text-paper">
        <Marquee
          items={TICKER}
          speed={42}
          gap="2rem"
          itemClassName="text-[0.68rem] font-semibold uppercase tracking-[0.24em]"
        />
      </div>

      <header
        ref={headerRef}
        className={`sticky top-0 z-50 border-b-2 transition-all duration-300 ${
          scrolled
            ? "border-ink/15 bg-paper/92 backdrop-blur-md"
            : "border-transparent bg-paper"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <Link
            href="/"
            aria-label="Sunder Masala — home"
            className={`shrink-0 transition-all duration-300 ${scrolled ? "py-2.5" : "py-3.5"}`}
          >
            <Logo
              className={`h-auto transition-all duration-300 ${scrolled ? "w-[104px]" : "w-[124px]"}`}
              card="transparent"
              brand="#d81f26"
              type="#fdf6e8"
            />
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`link-sweep text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-100 ${
                    active ? "opacity-100" : "opacity-65"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link href="/shop" className="btn btn-hot hidden !px-5 !py-2.5 !text-[0.7rem] sm:inline-flex">
              <SpiceIcon name="jar" className="w-4" />
              Buy the range
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-content-center rounded-full border-2 border-ink transition-colors hover:bg-ink hover:text-paper lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 block h-[2px] w-full bg-current transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-[2px] w-full bg-current transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[2px] w-full bg-current transition-all duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* mobile sheet */}
      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 lg:hidden ${open ? "" : "pointer-events-none"}`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav
          className={`tex-sunburst absolute inset-x-0 top-0 origin-top overflow-y-auto bg-forest pt-[104px] pb-10 text-ghee transition-transform duration-500 ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{ maxHeight: "100dvh", transitionTimingFunction: "var(--ease-spice)" }}
        >
          <div className="px-6">
            <ul className="divide-y divide-ghee/15 border-y border-ghee/15">
              {NAV.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-4"
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    <span className="font-poster text-[2.1rem] leading-none">{item.label}</span>
                    <Star className="w-3.5 text-marigold" />
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-7 text-marigold">The three ranges</p>
            <ul className="mt-3 grid gap-2">
              {RANGE_LIST.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/shop?range=${r.id}`}
                    className="flex items-center gap-3 rounded-xl border border-ghee/20 px-4 py-3"
                  >
                    <SpiceIcon name={r.icon} className="w-5 shrink-0 text-marigold" />
                    <span className="text-sm font-semibold">{r.full}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link href="/shop" className="btn btn-gold mt-7 w-full justify-center">
              Buy the range
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
