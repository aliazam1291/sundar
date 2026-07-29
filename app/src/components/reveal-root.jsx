"use client";

import { useEffect } from "react";

/**
 * One global IntersectionObserver for every `[data-reveal]` element on the page.
 *
 * This keeps the rest of the site as Server Components — markup just declares
 * `data-reveal="up|left|right|scale|clip"` and an optional
 * `style={{ "--reveal-delay": "120ms" }}`, and this picks it up. A MutationObserver
 * catches nodes added after navigation.
 *
 * Progressive enhancement: the `reveal-ready` class on <html> is what actually
 * hides elements, and it is only added here. If this never runs — no JS, an
 * older browser, a script error — nothing is hidden and the page renders in
 * full. A watchdog also reveals everything if the observer somehow never fires.
 */
export default function RevealRoot() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    const revealAll = () =>
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));

    // No observer support, or the user prefers less motion: show everything.
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      root.classList.add("reveal-ready");
      revealAll();
      return;
    }

    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const observe = (node) => {
      const nodes =
        node instanceof Element && node.matches?.("[data-reveal]")
          ? [node, ...node.querySelectorAll("[data-reveal]")]
          : (node.querySelectorAll?.("[data-reveal]") ?? []);
      nodes.forEach((el) => {
        if (!el.classList.contains("is-in")) io.observe(el);
      });
    };

    observe(document);

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node.nodeType === 1) observe(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Watchdog: if the observer never delivered a single entry (paused
    // compositor, background tab that never paints), don't leave the page blank.
    const watchdog = window.setTimeout(() => {
      if (!document.querySelector("[data-reveal].is-in")) revealAll();
    }, 2500);

    return () => {
      window.clearTimeout(watchdog);
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
