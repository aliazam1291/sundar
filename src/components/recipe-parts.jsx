import Link from "next/link";
import PackShot from "@/components/pack-shot";
import HeatScale from "@/components/heat-scale";
import { SpiceIcon } from "@/components/spice-icons";
import { COOK_ACTIONS, DEVA_NUM } from "@/lib/recipes";
import { getProduct } from "@/lib/products";

/**
 * The pieces a recipe is made of, shared by the Rasoi hub and the individual
 * dish pages.
 *
 * Split out when the twelve recipes moved from one page of hash anchors to
 * twelve real URLs: the method and the ingredient list are now rendered in two
 * places, and two copies of the same markup is how a recipe ends up showing
 * different steps depending on which page you read it on.
 */

/** The blends a dish needs, as links into the shop. */
export function Uses({ slugs, className = "" }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {slugs.map((s) => {
        const p = getProduct(s);
        if (!p) return null;
        return (
          <li key={s}>
            <Link
              href={`/shop/${p.slug}`}
              className="chip !py-2.5 border-current/40 transition-colors hover:border-current"
            >
              <SpiceIcon mono name={p.icon} className="w-3.5" />
              {p.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Time · serves · effort · heat, as a definition list.
 *
 * `showServes` is off wherever the servings dial is on the page — two numbers
 * for the same thing, one of which moves and one of which does not, is worse
 * than either alone.
 */
export function RecipeStats({ recipe, className = "", showServes = true }) {
  return (
    <dl className={`flex flex-wrap items-center gap-x-8 gap-y-3 ${className}`}>
      <div>
        <dt className="label-micro text-ink-mute">Time</dt>
        <dd className="font-poster text-[1.5rem] leading-none text-ink">{recipe.time}</dd>
      </div>
      {showServes ? (
        <div>
          <dt className="label-micro text-ink-mute">Serves</dt>
          <dd className="font-poster text-[1.5rem] leading-none text-ink">{recipe.serves}</dd>
        </div>
      ) : null}
      <div>
        <dt className="label-micro text-ink-mute">Effort</dt>
        <dd className="font-poster text-[1.5rem] leading-none text-ink">{recipe.difficulty}</dd>
      </div>
      <div>
        <dt className="label-micro text-ink-mute">Heat</dt>
        <dd className="mt-1.5">
          <HeatScale level={recipe.heat} showLabel={false} size="w-4" className="text-chilli" />
        </dd>
      </div>
    </dl>
  );
}

/* A static Ingredients list lived here until the servings dial replaced it.
   RecipeScaler renders that list now — there is no page left that wants the
   amounts frozen. */

/** The method, as the dark magazine sidebar. */
export function Method({ recipe, className = "" }) {
  const pack = getProduct(recipe.uses[0]);

  return (
    <div
      className={`card-poster card-pad bg-forest text-ghee ${className}`}
      style={{ "--card-shadow": "var(--color-marigold)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="label-micro text-marigold">Method</p>
        {pack ? (
          <div className="w-[26%] shrink-0">
            <PackShot product={pack} size="sm" tilt={false} />
          </div>
        ) : null}
      </div>

      <ol className="mt-4 space-y-4">
        {recipe.steps.map((s, i) => (
          <li key={i} className="flex gap-4">
            <span className="font-deva shrink-0 text-[1.7rem] leading-none text-marigold" lang="hi">
              {DEVA_NUM[i]}
            </span>
            <span>
              <span className="label-micro block text-marigold/70">{COOK_ACTIONS[s.act]?.en}</span>
              <span className="mt-1 block text-copy text-ghee/85">{s.text}</span>
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-6 rounded-xl border-2 border-marigold/50 bg-marigold/10 px-4 py-3 text-copy text-ghee">
        <span className="label-micro block text-marigold">The one thing</span>
        <span className="mt-1.5 block">{recipe.tip}</span>
      </p>
    </div>
  );
}
