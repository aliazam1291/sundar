import Link from "next/link";
import PackShot from "@/components/pack-shot";
import TasteTester from "@/components/sections/taste-tester";
import ChefMenu from "@/components/sections/chef-menu";
import Backdrop from "@/components/backdrop";
import Bilingual, { DevaWatermark } from "@/components/bilingual";
import HeatScale from "@/components/heat-scale";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import {
  RECIPES,
  RECIPE_TONE,
  COOK_ACTIONS,
  DEVA_NUM,
  heroRecipe,
  kickerOf,
  spellOut,
} from "@/lib/recipes";
import { getProduct } from "@/lib/products";

/* Everything that states a number counts the list, so adding a recipe can
   never leave the page claiming there are six of them. */
const count = spellOut(RECIPES.length);
const Count = count.charAt(0).toUpperCase() + count.slice(1);

export const metadata = {
  title: "Rasoi — the recipe corner",
  description: `${RECIPES.length} dishes, the blends they need and the two seconds that decide them. Plus a taste tester who will tell you exactly what you have done to the bowl.`,
};

function Uses({ slugs, className = "" }) {
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

export default function RecipesPage() {
  const hero = heroRecipe();
  const rest = RECIPES.filter((r) => r.slug !== hero.slug);
  const heroPack = getProduct(hero.uses[0]);

  return (
    <>
      {/* ── masthead ── */}
      <section className="relative isolate overflow-hidden bg-oxblood section text-paper">
        <Sunburst
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-marigold"
          rays={50}
          opacity={0.1}
        />
        <DevaWatermark word="रसोई" className="text-marigold" position="right" opacity={0.1} />

        <div className="shell relative">
          <div className="max-w-3xl">
            <p
              className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
              style={{ "--plaque-bg": "var(--color-sun)", "--plaque-fg": "var(--color-ink)" }}
            >
              <Star className="w-3.5" />
              Rasoi · the recipe corner
            </p>

            <Bilingual
              className="mt-4"
              accent="text-marigold"
              hi="रसोई से, सीधे आपकी थाली तक।"
              en={`${Count} dishes and the two seconds that decide them.`}
            />

            <p className="lede mt-5 max-w-xl text-paper/80">
              Not a recipe database. {Count} things worth cooking properly — everything that goes
              in them, the blends each one actually needs, and the one detail that ruins it if you
              get it wrong.
            </p>
          </div>
        </div>
      </section>

      <div className="trim-band" style={{ "--trim-a": "var(--color-sun)", "--trim-b": "var(--color-tomato)" }} aria-hidden="true" />

      {/* ── pick a dish, he cooks it with you ── */}
      <ChefMenu />

      {/* ── the cover story ── */}
      <section className="tex-paper relative overflow-hidden bg-cream section">
        <Backdrop field="margins" opacity={0.14} ornamentClass="text-oxblood/20" />

        <div className="shell relative grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div data-reveal="left">
            <p className="label-micro text-chilli-ink">Cover story · {kickerOf(hero)}</p>

            <p className="font-deva mt-3 text-[clamp(1.4rem,3vw,2.2rem)] leading-tight text-rani-ink" lang="hi">
              {hero.hi}
            </p>
            <h2 className="h-poster mt-1 text-ink">{hero.title}</h2>

            <p className="lede mt-4 max-w-xl text-ink-soft">{hero.blurb}</p>

            <dl className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
              <div>
                <dt className="label-micro text-ink-mute">Time</dt>
                <dd className="font-poster text-[1.5rem] leading-none text-ink">{hero.time}</dd>
              </div>
              <div>
                <dt className="label-micro text-ink-mute">Serves</dt>
                <dd className="font-poster text-[1.5rem] leading-none text-ink">{hero.serves}</dd>
              </div>
              <div>
                <dt className="label-micro text-ink-mute">Effort</dt>
                <dd className="font-poster text-[1.5rem] leading-none text-ink">{hero.difficulty}</dd>
              </div>
              <div>
                <dt className="label-micro text-ink-mute">Heat</dt>
                <dd className="mt-1.5">
                  <HeatScale level={hero.heat} showLabel={false} size="w-4" className="text-chilli" />
                </dd>
              </div>
            </dl>

            {/* the actual shopping list, not just the blends */}
            <div className="mt-7 rounded-[1.2rem] border-2 border-ink/15 bg-paper/70 p-5">
              <div className="flex items-baseline justify-between gap-4">
                <p className="label-micro text-ink-mute">Everything that goes in</p>
                <p className="font-deva text-copy text-ink-mute" lang="hi">सामग्री</p>
              </div>
              <ul className="mt-3 grid gap-x-8 gap-y-1.5 text-copy text-ink-soft sm:grid-cols-2">
                {hero.ingredients.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden="true" className="text-chilli-ink">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="label-micro mt-7 text-ink-mute">Plus these off the shelf</p>
            <Uses slugs={hero.uses} className="mt-2.5 text-ink-soft" />

            <p className="mt-6 text-copy text-ink-soft">
              <span className="label-micro text-chilli-ink">Serve with · </span>
              {hero.serveWith}
            </p>
          </div>

          {/* method, as a magazine sidebar */}
          <div
            className="card-poster card-pad bg-forest text-ghee"
            data-reveal="right"
            style={{ "--card-shadow": "var(--color-marigold)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="label-micro text-marigold">Method</p>
              <div className="w-[26%] shrink-0">
                <PackShot product={heroPack} size="sm" tilt={false} />
              </div>
            </div>

            <ol className="mt-4 space-y-4">
              {hero.steps.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-deva shrink-0 text-[1.7rem] leading-none text-marigold" lang="hi">
                    {DEVA_NUM[i]}
                  </span>
                  <span>
                    <span className="label-micro block text-marigold/70">
                      {COOK_ACTIONS[s.act]?.en}
                    </span>
                    <span className="mt-1 block text-copy text-ghee/85">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>

            <p className="mt-6 rounded-xl border-2 border-marigold/50 bg-marigold/10 px-4 py-3 text-copy text-ghee">
              <span className="label-micro block text-marigold">The one thing</span>
              <span className="mt-1.5 block">{hero.tip}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── the taste tester ── */}
      <TasteTester />

      <div className="trim-band" style={{ "--trim-a": "var(--color-cobalt)", "--trim-b": "var(--color-raspberry)" }} aria-hidden="true" />

      {/* ── the rest of the issue ── */}
      <section className="relative overflow-hidden bg-paper section">
        <div className="shell relative">
          <div className="max-w-2xl" data-reveal="up">
            <p
              className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
              style={{ "--plaque-bg": "var(--color-kiwi)", "--plaque-fg": "var(--color-ink)" }}
            >
              <Star className="w-3.5" />
              Aur bhi hai
            </p>
            <h2 className="h-editorial mt-4 text-ink">The rest of the issue.</h2>
            <p className="lede mt-4 text-ink-soft">
              {spellOut(rest.length)} more, in full — what goes in, what to do with it, and the
              thing that decides each one.
            </p>
          </div>

          {/* items-start: methods run from four steps to five and the
              ingredient lists wrap to different depths, so stretching every
              card to the tallest in its row leaves half a card of flat colour
              doing nothing. Ragged bottoms read fine on poster cards. */}
          <div className="section-body grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((r, i) => {
              const tone = RECIPE_TONE[r.tone] ?? RECIPE_TONE.marigold;
              return (
                <article
                  key={r.slug}
                  data-reveal="up"
                  style={{ "--reveal-delay": `${(i % 3) * 90}ms` }}
                  className={`card-poster card-pad flex flex-col ${tone.bg} ${tone.text}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className={`label-micro ${tone.accent}`}>{kickerOf(r)}</p>
                    <HeatScale level={r.heat} showLabel={false} size="w-3.5" className={tone.accent} />
                  </div>

                  <p className="font-deva mt-4 text-[1.35rem] leading-tight opacity-90" lang="hi">
                    {r.hi}
                  </p>
                  <h3 className="h-poster-xs mt-1">{r.title}</h3>
                  <p className="font-editorial mt-2 text-copy italic opacity-85">{r.dish}</p>

                  <p className="mt-4 text-copy opacity-85">{r.blurb}</p>

                  <div className="rule-dots mt-5 opacity-40" aria-hidden="true" />

                  <p className="label-micro mt-4 opacity-70">
                    Sāmagrī · {r.ingredients.length} things
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-copy opacity-80">
                    {r.ingredients.map((item, n) => (
                      <li key={item}>
                        {item}
                        {n < r.ingredients.length - 1 ? (
                          <span aria-hidden="true" className="ml-3 opacity-50">·</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>

                  <div className="rule-dots mt-5 opacity-40" aria-hidden="true" />

                  <ol className="mt-4 space-y-2.5">
                    {r.steps.map((s, n) => (
                      <li key={n} className="flex gap-3 text-copy opacity-90">
                        <span className="font-deva shrink-0 opacity-70" lang="hi">
                          {DEVA_NUM[n]}
                        </span>
                        <span>
                          <span className={`label-micro mr-2 ${tone.accent}`}>
                            {COOK_ACTIONS[s.act]?.en}
                          </span>
                          {s.text}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <p className="mt-5 text-copy italic opacity-90">
                    <span className={`label-micro not-italic ${tone.accent}`}>The one thing · </span>
                    {r.tip}
                  </p>

                  <p className="mt-3 text-copy italic opacity-80">
                    <span className={`label-micro not-italic ${tone.accent}`}>Serve with · </span>
                    {r.serveWith}
                  </p>

                  <div className="mt-auto pt-6">
                    <p className="label-micro opacity-70">Plus these off the shelf</p>
                    <Uses slugs={r.uses} className="mt-2.5" />
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-current/25 pt-4">
                    <span className="label-micro opacity-75">
                      {r.time} · serves {r.serves} · {r.difficulty}
                    </span>
                    <Link href="/shop" className="label-micro inline-block py-3 underline underline-offset-4">
                      Get the blends
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
