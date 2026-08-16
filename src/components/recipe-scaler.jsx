"use client";

import { useState } from "react";
import { scaleIngredients, baseServes } from "@/lib/quantity";

/**
 * The ingredient list, with a servings dial.
 *
 * Cooking for three when the recipe is written for two is the most ordinary
 * thing in the world, and doing that arithmetic in your head while holding a
 * hot pan is where dishes get ruined. The dial does it.
 *
 * Only leading amounts move — see lib/quantity.js for why a line like
 * "Bhature dough, rested 2 hours" has to be left alone. Lines that carry no
 * amount are shown plainly; lines that changed are marked, so it is obvious at
 * a glance which numbers the dial is responsible for.
 */

const MIN = 1;
const MAX = 20;

export default function RecipeScaler({ recipe }) {
  const base = baseServes(recipe);
  const [serves, setServes] = useState(base);

  const factor = serves / base;
  const rows = scaleIngredients(recipe.ingredients, factor);
  const changed = factor !== 1;

  return (
    <div className="rounded-[1.2rem] border-2 border-ink/15 bg-paper/70 p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="label-micro text-ink-mute">Everything that goes in</p>
          <p className="font-deva mt-0.5 text-copy text-ink-mute" lang="hi">सामग्री</p>
        </div>

        {/* the dial */}
        <div className="flex items-center gap-3">
          <span className="label-micro text-ink-mute">Serves</span>
          <div className="flex items-center gap-1.5 rounded-full border-2 border-ink bg-paper p-1">
            <button
              type="button"
              onClick={() => setServes((n) => Math.max(MIN, n - 1))}
              disabled={serves <= MIN}
              aria-label="One fewer serving"
              className="grid h-9 w-9 place-content-center rounded-full text-ink transition-colors hover:bg-cream disabled:opacity-35 disabled:hover:bg-transparent"
            >
              <svg viewBox="0 0 24 24" className="w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14" />
              </svg>
            </button>

            <output
              aria-live="polite"
              className="font-poster min-w-[2ch] text-center text-[1.5rem] leading-none text-ink"
            >
              {serves}
            </output>

            <button
              type="button"
              onClick={() => setServes((n) => Math.min(MAX, n + 1))}
              disabled={serves >= MAX}
              aria-label="One more serving"
              className="grid h-9 w-9 place-content-center rounded-full text-ink transition-colors hover:bg-cream disabled:opacity-35 disabled:hover:bg-transparent"
            >
              <svg viewBox="0 0 24 24" className="w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ul className="mt-4 grid gap-x-8 gap-y-1.5 text-copy text-ink-soft sm:grid-cols-2">
        {rows.map((row, i) => (
          <li key={recipe.ingredients[i]} className="flex gap-2.5">
            <span aria-hidden="true" className="text-chilli-ink">·</span>
            <span className={row.scaled ? "font-semibold text-ink" : undefined}>{row.text}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 border-t border-ink/10 pt-3 text-meta text-ink-mute">
        {changed
          ? `Scaled from the original ${base}. Amounts written in words — “to taste”, “to fry” — are left for you to judge.`
          : `Written for ${base}. Use the dial to cook for more or fewer.`}
      </p>
    </div>
  );
}
