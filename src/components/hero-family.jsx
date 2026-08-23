"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* The four in the hero photograph, by name rather than by relation.
   "Maa" and "Papa" are what *their* family calls them; to a visitor they are
   strangers, and a name gives the picker four people instead of four roles.
   `relation` is kept so the label can still say who is who. */
const FAVOURITES = [
  { id: "sudha", person: "Sudhaji", relation: "Maa", product: "Chaat Masala", note: "Tangy, bright, and always passed around.", slug: "chaat-masala", spot: ["30%", "49%"] },
  { id: "ramesh", person: "Rameshji", relation: "Papa", product: "Garam Masala", note: "The finishing touch for every proper curry.", slug: "garam-masala", spot: ["56%", "41%"] },
  { id: "bunty", person: "Bunty", relation: "Bhai", product: "Kuti Teja Mirch", note: "A little heat. A lot of personality.", slug: "kuti-teja-mirch", spot: ["47%", "69%"] },
  { id: "pihu", person: "Pihu", relation: "Beti", product: "Shahi Hing", note: "One pinch, and the tadka wakes up.", slug: "shahi-hing", spot: ["81%", "54%"] },
];

export default function HeroFamily() {
  const [activeId, setActiveId] = useState("sudha");
  const active = FAVOURITES.find((favourite) => favourite.id === activeId);

  return (
    <div className="hero-family-wrap">
      <div className="hero-family">
        <div key={active.id} className="hero-family__spotlight" style={{ "--spot-x": active.spot[0], "--spot-y": active.spot[1] }} aria-hidden="true" />
        <Image
          src="/pose-of-4-cutout.webp"
          alt="The Sunder family holding their favourite spices"
          fill
          preload
          sizes="(max-width: 1023px) min(100vw - 2.3rem, 42rem), 50vw"
          className="hero-family__image"
        />
        <div className="hero-family__label" aria-live="polite">
          <span>
            {active.person}&rsquo;s favourite <span className="hero-family__relation">· {active.relation}</span>
          </span>
          <strong>{active.product}</strong>
          <p>{active.note}</p>
          <Link href={`/shop/${active.slug}`}>Discover the spice <span aria-hidden="true">→</span></Link>
        </div>
      </div>

      <div className="hero-family__picker" aria-label="Choose a family favourite">
        {FAVOURITES.map((favourite) => (
          <button
            key={favourite.id}
            type="button"
            aria-pressed={favourite.id === activeId}
            className={favourite.id === activeId ? "is-active" : undefined}
            onClick={() => setActiveId(favourite.id)}
            onPointerEnter={() => setActiveId(favourite.id)}
          >
            {favourite.person}
          </button>
        ))}
      </div>
    </div>
  );
}
