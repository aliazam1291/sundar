import Link from "next/link";
import Bilingual, { DevaWatermark } from "@/components/bilingual";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import PagePortrait from "@/components/page-portrait";
import { POSTS } from "@/lib/posts";

export const metadata = {
  title: "Rasoi Ki Baatein — Sunder Masala Blog",
  description: "Stories, thoughts, and conversations from the Sunder kitchen. Discover why spices behave the way they do, how cooking traditions travel, and the science behind slow grinding.",
  alternates: { canonical: "/blog" },
};

export default function BlogListingPage() {
  const featuredPost = POSTS[0];
  const secondaryPosts = POSTS.slice(1);

  return (
    <>
      {/* ── masthead ── */}
      <section className="relative isolate overflow-hidden bg-forest section text-ghee">
        <Sunburst
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-marigold"
          rays={50}
          opacity={0.1}
        />
        <DevaWatermark word="पत्रिका" className="text-marigold" position="right" opacity={0.08} />

        <div className="shell relative">
          <div className="grid items-center gap-8 w-full md:grid-cols-[1.15fr_0.85fr] md:gap-12">
            <div className="max-w-3xl" data-reveal="up">
              <p
                className="plaque tilt-tag label-micro inline-flex items-center gap-2.5"
                style={{ "--plaque-bg": "var(--color-marigold)", "--plaque-fg": "var(--color-ink)" }}
              >
                <Star className="w-3.5" />
                Rasoi Ki Baatein · Sunder Blog
              </p>

              <Bilingual
                as="h1"
                className="mt-4 text-paper"
                accent="text-marigold"
                hi="रसोई की बातें, स्वाद की कहानियाँ।"
                en="Stories from the Sunder Kitchen."
              />

              <p className="lede mt-5 max-w-xl text-ghee/80">
                Discover why spices behave the way they do, how cooking traditions travel, 
                and the science behind slow grinding. Conversations from three generations.
              </p>
            </div>

            <div data-reveal="scale">
              <PagePortrait
                src="/bunty-glow.webp"
                alt="Bunty reacting to the heat"
                width={933}
                height={1400}
                tone="glow"
                name="Bunty"
                plaqueBg="var(--color-marigold)"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="trim-band" style={{ "--trim-a": "var(--color-marigold)", "--trim-b": "var(--color-tomato)" }} aria-hidden="true" />

      {/* ── blog feed ── */}
      <section className="bg-paper section-lg">
        <div className="shell">
          {/* featured post */}
          {featuredPost && (
            <div className="mb-12" data-reveal="up">
              <p className="label-micro mb-4 text-ink-soft">Featured Article</p>
              <div 
                className="card-poster card-pad group relative overflow-hidden bg-oxblood text-paper flex flex-col justify-between"
                style={{ "--card-shadow": "var(--color-marigold)" }}
              >
                <div className="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                
                <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="label-micro text-marigold">{featuredPost.date}</span>
                      <span className="text-paper/40 font-bold">•</span>
                      <span className="label-micro text-paper/70">{featuredPost.readTime}</span>
                    </div>

                    <Link href={`/blog/${featuredPost.slug}`} className="group-hover:text-marigold">
                      <h2 className="h-poster mt-4 text-[2.2rem] md:text-[3rem] leading-none transition-colors duration-300 group-hover:text-marigold">
                        {featuredPost.title}
                      </h2>
                    </Link>

                    <p className="mt-4 text-copy text-paper/85 max-w-2xl">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                  
                  {/* Pull quote feature on card */}
                  <div className="w-full md:w-80 shrink-0 card-poster card-pad bg-marigold text-ink rotate-2" style={{ "--card-shadow": "var(--color-oxblood)" }}>
                    <p className="label-micro text-oxblood">Ramesh Ji says</p>
                    <p className="font-deva mt-2 text-copy font-bold" lang="hi">
                      “Ek sheher se doosre sheher jao, toh dal bhi apna rang badal leti hai.”
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-paper/15 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-paper/70">
                    <SpiceIcon mono name="pinch" className="w-5 text-marigold" />
                    <span className="text-label">{featuredPost.author}</span>
                  </div>
                  
                  <Link 
                    href={`/blog/${featuredPost.slug}`}
                    className="btn btn-gold btn-sm"
                    style={{ "--btn-shadow": "var(--color-ink)" }}
                  >
                    Read article
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* secondary posts grid */}
          <div className="grid gap-8 sm:grid-cols-2">
            {secondaryPosts.map((post, idx) => {
              const shadowColor = post.themeName === "forest" ? "var(--color-marigold)" : "var(--color-dragonfruit)";
              const quote = post.content.find(b => b.type === "quote");
              
              return (
                <div 
                  key={post.slug}
                  data-reveal="up"
                  className={`card-poster card-pad card-lift flex flex-col justify-between ${post.coverColor}`}
                  style={{ 
                    "--reveal-delay": `${idx * 120}ms`,
                    "--card-shadow": shadowColor 
                  }}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className={`label-micro ${post.accentColor}`}>{post.date}</span>
                      <span className="text-paper/40 font-bold">•</span>
                      <span className="label-micro opacity-70">{post.readTime}</span>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="group">
                      <h3 className="h-poster-xs mt-4 text-[1.6rem] transition-colors duration-300 hover:text-marigold">
                        {post.title}
                      </h3>
                    </Link>

                    <p className={`mt-3 text-copy ${post.textColor}`}>
                      {post.excerpt}
                    </p>

                    {quote && (
                      <div className="mt-5 border-l-4 border-marigold pl-4 py-1 italic opacity-90">
                        <p className="text-label font-semibold">{quote.character}</p>
                        <p className="text-meta mt-1">“{quote.text}”</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-5 border-t border-paper/15 flex items-center justify-between">
                    <span className="text-label opacity-70">{post.author}</span>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="btn btn-gold btn-sm"
                      style={{ "--btn-shadow": "var(--color-ink)" }}
                    >
                      Read post
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
