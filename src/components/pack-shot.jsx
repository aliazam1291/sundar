import Image from "next/image";
import Logo from "@/components/logo";
import { SpiceIcon, Sunburst, Star } from "@/components/spice-icons";

/**
 * Vector pack mockup, drawn to the creative direction board: one saturated
 * colour field, the illustration filling the front inside an arch, and the
 * name locked bottom-left in Anton. No cream information panel — the pack
 * is the poster.
 */
export default function PackShot({
  product,
  className = "",
  size = "md",
  tilt = true,
  priority = false,
}) {
  const [c1, c2] = product.hue;
  const scale = {
    sm: {
      pad: "p-[7%]",
      name: "text-[1.1rem]",
      kind: "text-[0.44rem]",
      logo: "w-[42%]",
      arch: "inset-x-[15%] top-[21%] h-[47%]",
    },
    md: {
      pad: "p-[7%]",
      name: "text-[1.5rem] sm:text-[1.8rem]",
      kind: "text-[0.5rem]",
      logo: "w-[42%]",
      arch: "inset-x-[15%] top-[21%] h-[48%]",
    },
    lg: {
      pad: "p-[7%]",
      name: "text-[2.1rem] sm:text-[2.8rem]",
      kind: "text-[0.62rem]",
      logo: "w-[42%]",
      arch: "inset-x-[15%] top-[20%] h-[49%]",
    },
  }[size];

  /* Real packaging shot wins over the vector mock every time — the vector is
     only the fallback for a product with no photographed pouch. */
  if (product.image) {
    return (
      <div
        className={`pack pack--photo ${tilt ? "pack--tilt" : ""} ${className}`}
      >
        <div className="pack__body">
          <Image
            src={product.image}
            alt={`${product.name} ${product.kind} pack`}
            width={600}
            height={600}
            sizes="(max-width: 640px) 60vw, 320px"
            className="pack__photo"
            priority={priority}
          />
          {product.badge ? (
            <span className="pack__roundel font-poster">{product.badge}</span>
          ) : null}
        </div>
        <div className="pack__shadow" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={`pack ${tilt ? "pack--tilt" : ""} ${className}`}
      style={{
        "--c1": c1,
        "--c2": c2,
        "--pack-fg": product.packText,
        "--pack-fg-mute": product.packMuted,
      }}
    >
      <div className="pack__body">
        {/* right-hand side face, for depth */}
        <div className="pack__side" aria-hidden="true" />

        <div className={`pack__face ${scale.pad}`}>
          <Sunburst className="absolute inset-0 h-full w-full text-white" rays={44} opacity={0.1} />

          {/* block-print trim, the way the pack fronts are framed */}
          <div className="pack__trim" aria-hidden="true" />

          {/* ── masthead ── */}
          <div className="relative flex items-start justify-between gap-2">
            <Logo className={`${scale.logo} h-auto`} />
            <Star className="w-2.5 shrink-0 opacity-70" style={{ color: "var(--pack-fg)" }} />
          </div>

          {/* ── the illustration, in its arch ──
              Screen-printed in a single ink, like the tins: the drawing takes
              the pack's foreground colour so it reads on any field. Its own
              palette would be dark-on-dark here. */}
          <div className={`pack__arch absolute ${scale.arch}`} aria-hidden="true">
            <SpiceIcon
              ground={c1}
              name={product.icon}
              className="h-full w-full"
              style={{ color: "var(--pack-fg)" }}
            />
          </div>

          {/* ── name lockup ── */}
          <div className="relative mt-auto">
            <div
              className="mb-1.5 h-[3px] w-8 rounded-full"
              style={{ background: "var(--pack-fg)", opacity: 0.8 }}
            />
            <p
              className={`font-poster ${scale.name}`}
              style={{ color: "var(--pack-fg)", overflowWrap: "anywhere" }}
            >
              {product.name}
            </p>
            <p
              className={`mt-1 font-bold uppercase tracking-[0.2em] ${scale.kind}`}
              style={{ color: "var(--pack-fg-mute)" }}
            >
              {product.kind}
            </p>
            <p
              className={`mt-1.5 font-bold uppercase tracking-[0.16em] ${scale.kind}`}
              style={{ color: "var(--pack-fg-mute)" }}
            >
              {product.size} · No additives
            </p>
          </div>
        </div>

        {/* corner roundel */}
        {product.badge ? (
          <span className="pack__roundel font-poster">{product.badge}</span>
        ) : null}
      </div>

      <div className="pack__shadow" aria-hidden="true" />
    </div>
  );
}
