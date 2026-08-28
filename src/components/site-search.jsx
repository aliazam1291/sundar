"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SpiceIcon } from "@/components/spice-icons";
import { search, SUGGESTED } from "@/lib/search";

/**
 * Search across the whole catalogue and the recipe corner.
 *
 * One overlay for every screen rather than a desktop dropdown plus a separate
 * mobile thing — the same panel just sits differently, so there is one set of
 * keyboard and focus behaviour to get right instead of two.
 *
 * Results are computed locally from lib/search; there is no request to wait
 * on, so the list can update on every keystroke without any loading state.
 */

const HOTKEY = "k";

export default function SiteSearch({ className = "" }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);

  const router = useRouter();
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const restoreTo = useRef(null);
  const listId = useId();

  const results = useMemo(() => search(q), [q]);

  /**
   * Closing must NOT clear the query.
   *
   * It used to, and that made every result row a race: the row is a <Link>
   * whose onClick closed the panel, clearing the query emptied `results`, and
   * the link unmounted underneath its own click — so the navigation was
   * sometimes dropped and you just landed back where you started. The query
   * is reset when the panel opens instead, where nothing is mid-flight.
   */
  const close = useCallback(() => {
    setOpen(false);
    /* Put focus back where it came from, or the page loses its place. */
    restoreTo.current?.focus?.();
  }, []);

  const show = useCallback(() => {
    restoreTo.current = document.activeElement;
    setQ("");
    setCursor(0);
    setOpen(true);
  }, []);

  /* Cmd/Ctrl-K from anywhere, and "/" when not already typing. */
  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(input|textarea|select)$/i.test(e.target?.tagName ?? "") || e.target?.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === HOTKEY) {
        e.preventDefault();
        show();
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, show]);

  /* Focus the field once the panel is actually on screen. */
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  /* Hold the page still behind the overlay. */
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* Navigate first, then dismiss — the other order lets the close tear the
     panel down before the router has taken the route. */
  const go = useCallback(
    (href) => {
      router.push(href);
      setOpen(false);
    },
    [router]
  );

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = results[Math.min(cursor, results.length - 1)];
      if (hit) go(hit.href);
    }
  };

  /* Keep the highlighted row in view when arrowing past the fold. */
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-row="${cursor}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-label="Search products and recipes"
        className={`group flex items-center gap-2.5 rounded-full border-2 border-ink/25 px-3 py-2 text-ink-mute transition-colors hover:border-ink hover:text-ink ${className}`}
      >
        <SearchIcon className="w-4 shrink-0" />
        <span className="label-micro hidden xl:inline">Search</span>
        <kbd className="label-micro hidden rounded border border-current/35 px-1.5 py-0.5 xl:inline">
          /
        </kbd>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] flex items-start justify-center p-3 sm:p-6">
          <button
            type="button"
            aria-label="Close search"
            onClick={close}
            className="absolute inset-0 cursor-default bg-ink/60 backdrop-blur-sm"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search products and recipes"
            className="anim-swap relative mt-[8vh] w-full max-w-[38rem] overflow-hidden rounded-[1.4rem] border-2 border-ink bg-paper shadow-[8px_8px_0_var(--color-oxblood)]"
          >
            <div className="flex items-center gap-3 border-b-2 border-ink/12 px-4 py-3.5 sm:px-5">
              <SearchIcon className="w-5 shrink-0 text-ink-mute" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setCursor(0);
                }}
                onKeyDown={onKeyDown}
                type="search"
                enterKeyHint="go"
                autoComplete="off"
                spellCheck="false"
                placeholder="Masala, dish, or an ingredient…"
                /* A placeholder is not an accessible name — it disappears the
                   moment you type, and axe rightly flags a combobox without
                   one. */
                aria-label="Search products and recipes"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls={results.length ? listId : undefined}
                aria-autocomplete="list"
                className="min-w-0 flex-1 bg-transparent text-copy-lg text-ink outline-none placeholder:text-ink-mute"
              />
              <button
                type="button"
                onClick={close}
                className="label-micro shrink-0 rounded-full border-2 border-ink/25 px-2.5 py-1.5 text-ink-mute transition-colors hover:border-ink hover:text-ink"
              >
                Esc
              </button>
            </div>

            {/* role=listbox only while it actually holds options — applied to
                a container that might instead hold the suggestion chips or
                the empty state fails aria-required-children, because neither
                of those is an option. */}
            <div
              ref={listRef}
              id={listId}
              role={results.length ? "listbox" : undefined}
              className="max-h-[min(60vh,28rem)] overflow-y-auto"
            >
              {q.trim().length < 2 ? (
                <div className="px-4 py-5 sm:px-5">
                  <p className="label-micro text-ink-mute">Try</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {SUGGESTED.map((s) => (
                      <li key={s}>
                        <button
                          type="button"
                          onClick={() => {
                            setQ(s);
                            setCursor(0);
                            inputRef.current?.focus();
                          }}
                          className="chip border-ink/30 text-ink-soft transition-colors hover:border-ink hover:text-ink"
                        >
                          {s}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : results.length ? (
                /* A listbox must own its options directly. The <ul>/<li> are
                   marked presentational so the ul > li > a nesting does not
                   sit between the listbox and its options. */
                <ul role="presentation" className="divide-y divide-ink/10">
                  {results.map((hit, i) => (
                    <li role="presentation" key={hit.id}>
                      <Link
                        href={hit.href}
                        data-row={i}
                        role="option"
                        aria-selected={i === cursor}
                        onMouseEnter={() => setCursor(i)}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3.5 px-4 py-3 transition-colors sm:px-5 ${
                          i === cursor ? "bg-cream" : ""
                        }`}
                      >
                        <SpiceIcon name={hit.icon} className="w-8 shrink-0" />
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-baseline gap-x-2.5">
                            <span className="h-card text-ink">{hit.title}</span>
                            <span className="font-deva text-copy text-ink-mute" lang="hi">
                              {hit.hindi}
                            </span>
                          </span>
                          <span className="label-micro mt-1 block truncate text-ink-mute">
                            {hit.meta}
                          </span>
                        </span>
                        {hit.kind === "product" ? null : (
                          <span
                            className="chip chip-solid shrink-0"
                            style={{ "--chip-bg": "var(--color-kiwi)", "--chip-fg": "var(--color-ink)" }}
                          >
                            Cook
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-8 text-center sm:px-5">
                  <p className="font-deva text-[1.4rem] leading-tight text-rani-ink" lang="hi">
                    कुछ नहीं मिला।
                  </p>
                  <p className="mt-2 text-copy text-ink-soft">
                    Nothing for “{q.trim()}”. Try a spice, a dish, or an ingredient.
                  </p>
                  <Link href="/shop" onClick={close} className="btn btn-ghost btn-sm mt-5 text-ink">
                    Browse everything
                  </Link>
                </div>
              )}
            </div>

            <p className="label-micro flex items-center justify-between gap-3 border-t-2 border-ink/12 px-4 py-2.5 text-ink-mute sm:px-5">
              <span className="hidden sm:inline">↑ ↓ to move · ↵ to open</span>
              <span className="sm:hidden">Tap a result</span>
              <span>
                {q.trim().length >= 2 ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Products & recipes"}
              </span>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}

function SearchIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
