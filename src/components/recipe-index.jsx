"use client";

import { useState } from "react";
import Link from "next/link";
import HeatScale from "@/components/heat-scale";
import { RECIPES, RECIPE_TONE, COURSES, kickerOf } from "@/lib/recipes";

/**
 * The Rasoi index — twelve dishes, narrowable by when you would cook them.
 *
 * `course` is the only axis worth filtering on: nobody browses a recipe corner
 * by cuisine here (it is all one cuisine), they browse by how much time they
 * have tonight. Quick / Weeknight / Weekend / Street is that question.
 *
 * Filtering is client-side on purpose. The twelve dish pages are the pages
 * worth indexing; this hub is a summary, and keeping it static means it stays
 * cheap and the filter is instant. A query param would make the whole route
 * dynamic to no search benefit.
 */
export default function RecipeIndex() {
  const [course, setCourse] = useState(null);

  const shown = course ? RECIPES.filter((r) => r.course === course) : RECIPES;
  const countFor = (c) => RECIPES.filter((r) => r.course === c).length;

  return (
    <>
      {/* filter rail */}
      <div className="no-scrollbar edge-fade-r mt-8 flex gap-2.5 overflow-x-auto pb-1 pe-8 sm:pe-0">
        <button
          type="button"
          onClick={() => setCourse(null)}
          aria-pressed={course === null}
          className={`chip shrink-0 border-2 !py-3 transition-all ${
            course === null
              ? "border-ink bg-ink text-marigold"
              : "border-ink/25 text-ink hover:border-ink hover:bg-ink/8"
          }`}
        >
          Everything
          <span className="ml-1.5 opacity-60">{RECIPES.length}</span>
        </button>

        {COURSES.map((c) => {
          const on = course === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCourse(on ? null : c)}
              aria-pressed={on}
              className={`chip shrink-0 border-2 !py-3 transition-all ${
                on
                  ? "border-ink bg-ink text-marigold"
                  : "border-ink/25 text-ink hover:border-ink hover:bg-ink/8"
              }`}
            >
              {c}
              <span className="ml-1.5 opacity-60">{countFor(c)}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-label font-semibold uppercase tracking-[0.2em] text-ink-soft" aria-live="polite">
        {shown.length} {shown.length === 1 ? "dish" : "dishes"}
        {course ? ` · ${course}` : ""}
      </p>

      <div className="mt-6 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((r, i) => {
          const tone = RECIPE_TONE[r.tone] ?? RECIPE_TONE.marigold;
          return (
            <article key={r.slug} id={r.slug} className="scroll-mt-32">
              <Link
                href={`/recipes/${r.slug}`}
                data-reveal="up"
                style={{ "--reveal-delay": `${(i % 3) * 80}ms` }}
                className={`card-poster card-pad card-lift flex h-full flex-col ${tone.bg} ${tone.text}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className={`label-micro ${tone.accent}`}>{kickerOf(r)}</p>
                  <HeatScale level={r.heat} showLabel={false} size="w-3.5" className={tone.accent} />
                </div>

                <p className="font-deva mt-4 text-[1.35rem] leading-tight" lang="hi">
                  {r.hi}
                </p>
                <h3 className="h-poster-xs mt-1">{r.title}</h3>
                <p className="font-editorial mt-2 text-copy italic">{r.dish}</p>

                <p className="mt-4 text-copy">{r.blurb}</p>

                <div className="rule-dots mt-5 opacity-40" aria-hidden="true" />

                <p className="label-micro mt-4">
                  {r.ingredients.length} things · {r.steps.length} steps
                </p>

                <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                  <span className="label-micro">
                    {r.time} · serves {r.serves}
                  </span>
                  <span className="label-micro flex items-center gap-2">
                    Cook it
                    <svg viewBox="0 0 24 24" className="w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h13M12 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </>
  );
}
