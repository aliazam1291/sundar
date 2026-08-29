import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, SpiceIcon, Sunburst } from "@/components/spice-icons";
import { POSTS, getPost } from "@/lib/posts";
import Bilingual, { DevaWatermark } from "@/components/bilingual";
import PagePortrait from "@/components/page-portrait";

const PORTRAITS_MAP = {
  "why-does-indian-cuisine-change-every-few-hundred-kilometres": {
    src: "/rameshji-glow.webp",
    alt: "Ramesh Ji",
    width: 933,
    height: 1400,
    tone: "glow",
    name: "Ramesh Ji",
    spot: "var(--color-marigold)",
    plaqueBg: "var(--color-marigold)"
  },
  "what-makes-a-masala-worth-passing-down": {
    src: "/sudhaji-bunty-cutout.webp",
    alt: "Sudhaji and Bunty",
    width: 1280,
    height: 1536,
    tone: "cutout",
    name: "Sudhaji & Bunty",
    spot: "var(--color-sun)",
    plaqueBg: "var(--color-sun)"
  },
  "the-science-of-slow-grinding-cold-milled-masala": {
    src: "/bunty-glow.webp",
    alt: "Bunty",
    width: 933,
    height: 1400,
    tone: "glow",
    name: "Bunty",
    spot: "var(--color-marigold)",
    plaqueBg: "var(--color-marigold)"
  },
  "understanding-the-chutki-ritual": {
    src: "/sudhaji-cutout.webp",
    alt: "Sudhaji",
    width: 1145,
    height: 1374,
    tone: "cutout",
    name: "Sudhaji",
    spot: "var(--color-sun)",
    plaqueBg: "var(--color-sun)"
  },
  "same-spices-different-kitchens": {
    src: "/sudhaji-bunty-cutout.webp",
    alt: "Sudhaji and Bunty",
    width: 1280,
    height: 1536,
    tone: "cutout",
    name: "Sudhaji & Bunty",
    spot: "var(--color-sun)",
    plaqueBg: "var(--color-sun)"
  }
};

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Sunder Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const otherPosts = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Map theme colors to class styling
  const headerBgClass = post.themeName === "forest" ? "bg-forest" : post.themeName === "cobalt" ? "bg-cobalt" : "bg-oxblood";
  const headerTextClass = "text-paper";
  const trimColorA = post.themeName === "forest" ? "var(--color-marigold)" : post.themeName === "cobalt" ? "var(--color-sun)" : post.themeName === "sun" ? "var(--color-sun)" : "var(--color-marigold)";
  const trimColorB = post.themeName === "forest" ? "var(--color-kiwi)" : post.themeName === "cobalt" ? "var(--color-sky)" : post.themeName === "sun" ? "var(--color-dragonfruit)" : "var(--color-tomato)";

  const portrait = PORTRAITS_MAP[post.slug];

  return (
    <>
      {/* ── masthead ── */}
      <section className={`relative isolate overflow-hidden ${headerBgClass} ${headerTextClass} section-sm`}>
        <Sunburst
          className="pointer-events-none absolute inset-0 h-full w-full text-marigold"
          rays={48}
          opacity={0.08}
        />
        <DevaWatermark word="कहानी" className="text-marigold" position="right" opacity={0.06} />
        
        <div className="shell relative">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-2 text-micro font-semibold uppercase tracking-[0.16em] text-paper/60">
            <Link href="/blog" className="link-sweep inline-block py-2.5 hover:text-marigold">
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-paper/85">{post.title}</span>
          </nav>

          <div className="grid items-center gap-8 w-full md:grid-cols-[1.15fr_0.85fr] md:gap-12">
            <div className="max-w-3xl" data-reveal="up">
              <div className="flex items-center gap-3">
                <span className="label-micro text-marigold">{post.date}</span>
                <span className="text-paper/40 font-bold">•</span>
                <span className="label-micro opacity-80">{post.readTime}</span>
              </div>
              
              <h1 className="h-poster mt-4 text-[2.5rem] md:text-[3.8rem] leading-[1.05] tracking-tight">
                {post.title}
              </h1>
              
              <p className="lede mt-6 text-paper/80 max-w-3xl">
                {post.excerpt}
              </p>

              <div className="mt-6 flex items-center gap-3 text-paper/70">
                <SpiceIcon mono name="pinch" className="w-5 text-marigold" />
                <span className="text-label">Written by {post.author}</span>
              </div>
            </div>

            {portrait && (
              <div data-reveal="scale">
                <PagePortrait
                  src={portrait.src}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  tone={portrait.tone}
                  name={portrait.name}
                  spot={portrait.spot}
                  plaqueBg={portrait.plaqueBg}
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="trim-band" style={{ "--trim-a": trimColorA, "--trim-b": trimColorB }} aria-hidden="true" />

      {/* ── article content ── */}
      <article className="bg-paper section-lg">
        <div className="shell-narrow">
          <div className="mx-auto max-w-2xl">
            {post.content.map((block, idx) => {
              if (block.type === "paragraph") {
                return (
                  <p key={idx} data-reveal="up" className="mt-6 text-copy text-ink-soft first:mt-0 first:text-copy-lg first:font-medium">
                    {block.text}
                  </p>
                );
              }
              
              if (block.type === "heading") {
                return (
                  <h2 key={idx} data-reveal="up" className="h-poster-xs mt-12 text-[1.8rem] text-ink">
                    {block.text}
                  </h2>
                );
              }
              
              if (block.type === "quote") {
                const rotation = idx % 2 === 0 ? "rotate-[1.5deg]" : "rotate-[-1.5deg]";
                return (
                  <div 
                    key={idx} 
                    data-reveal="up"
                    className={`my-10 card-poster card-pad ${block.bg} ${rotation} flex flex-col justify-between`}
                    style={{ "--card-shadow": block.shadow }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="label-micro opacity-70">
                          {block.character} {block.relation ? `· ${block.relation}` : ""}
                        </p>
                        <p className="font-deva mt-3 text-[1.2rem] md:text-[1.4rem] font-bold leading-normal" lang="hi">
                          {block.text}
                        </p>
                      </div>
                      <SpiceIcon name="pinch" className="w-10 shrink-0 opacity-20" />
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* ── faqs accordion ── */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-16 border-t-2 border-ink/10 pt-12">
              <h3 className="h-poster-xs text-center text-ink text-[1.8rem] mb-8" data-reveal="up">
                FAQs about this story
              </h3>
              
              <div className="mx-auto max-w-2xl grid gap-4">
                {post.faqs.map((faq, idx) => (
                  <details 
                    key={idx}
                    data-reveal="up"
                    style={{ "--reveal-delay": `${idx * 80}ms`, "--card-shadow": "var(--color-marigold)" }}
                    className="group card-poster bg-paper text-ink overflow-hidden transition-all duration-300"
                  >
                    <summary className="card-pad flex cursor-pointer items-center justify-between gap-4 font-bold text-copy select-none outline-none">
                      <span>{faq.q}</span>
                      <span className="shrink-0 transition-transform duration-300 group-open:rotate-180">
                        <svg viewBox="0 0 24 24" className="w-5 stroke-current" fill="none" strokeWidth="2.5" strokeLinecap="round">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </summary>
                    <div className="card-pad pt-0 border-t border-ink/10 text-copy text-ink-soft bg-sand/20">
                      <p className="mt-4">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <div className="trim-band" style={{ "--trim-a": "var(--color-sun)", "--trim-b": "var(--color-oxblood)" }} aria-hidden="true" />

      {/* ── more articles ── */}
      {otherPosts.length > 0 && (
        <section className="bg-sand/30 section">
          <div className="shell">
            <h3 className="h-poster-xs mb-8 text-[1.8rem]" data-reveal="up">More from Rasoi Ki Baatein</h3>
            
            <div className="grid gap-6 sm:grid-cols-2">
              {otherPosts.map((other, idx) => {
                const shadow = other.themeName === "forest" ? "var(--color-marigold)" : "var(--color-dragonfruit)";
                return (
                  <Link 
                    key={other.slug}
                    href={`/blog/${other.slug}`}
                    data-reveal="up"
                    style={{ 
                      "--reveal-delay": `${idx * 100}ms`,
                      "--card-shadow": shadow
                    }}
                    className={`card-poster card-pad card-lift ${other.coverColor} flex flex-col justify-between`}
                  >
                    <div>
                      <span className={`label-micro ${other.accentColor}`}>{other.date}</span>
                      <h4 className="h-poster-xs mt-3 text-[1.4rem]">{other.title}</h4>
                      <p className="mt-2 text-meta opacity-80 line-clamp-2">{other.excerpt}</p>
                    </div>
                    <span className="btn btn-gold btn-sm mt-5 self-start" style={{ "--btn-shadow": "var(--color-ink)" }}>
                      Read post
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
