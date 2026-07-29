import Logo from "@/components/logo";
import { SpiceIcon, Sunburst, Star } from "@/components/spice-icons";

/**
 * Vector pack mockup — a carton rebuilt from the brand creatives.
 * Split face: cream information panel + coloured sunburst panel.
 */
export default function PackShot({ product, className = "", size = "md", tilt = true }) {
  const [c1, c2] = product.hue;
  const scale = {
    sm: { pad: "p-3", name: "text-[1.05rem]", kind: "text-[0.5rem]", logo: "w-[52px]" },
    md: { pad: "p-4 sm:p-5", name: "text-[1.5rem] sm:text-[1.75rem]", kind: "text-[0.58rem]", logo: "w-[72px]" },
    lg: { pad: "p-5 sm:p-7", name: "text-[2rem] sm:text-[2.6rem]", kind: "text-[0.68rem]", logo: "w-[92px]" },
  }[size];

  return (
    <div
      className={`pack ${tilt ? "pack--tilt" : ""} ${className}`}
      style={{ "--c1": c1, "--c2": c2 }}
    >
      <div className="pack__body">
        {/* right-hand side face, for depth */}
        <div className="pack__side" aria-hidden="true" />

        <div className="pack__face">
          {/* ── information panel ── */}
          <div className={`pack__panel ${scale.pad}`}>
            <Logo className={`${scale.logo} h-auto`} card="transparent" brand="#d81f26" type="#fdf6e8" />

            <div className="mt-auto">
              <p
                className={`font-poster leading-[0.86] text-ink ${scale.name}`}
                style={{ overflowWrap: "anywhere" }}
              >
                {product.name}
              </p>
              <p className={`mt-1.5 font-semibold uppercase tracking-[0.2em] text-ink/60 ${scale.kind}`}>
                {product.kind}
              </p>

              <div className="mt-2.5 h-px w-full bg-ink/25" />

              <p className={`mt-2 font-semibold uppercase tracking-[0.22em] text-ink/45 ${scale.kind}`}>
                Premium Quality
              </p>
            </div>
          </div>

          {/* ── colour panel ── */}
          <div className="pack__colour">
            <Sunburst className="absolute inset-0 h-full w-full text-white" rays={40} opacity={0.14} />

            {/* scattered ghost icons */}
            <div className="absolute inset-0 overflow-hidden opacity-[0.22] text-white" aria-hidden="true">
              <SpiceIcon name={product.icon} className="absolute -left-2 top-[8%] w-8" />
              <SpiceIcon name="cardamom" className="absolute right-1 top-[26%] w-6" />
              <SpiceIcon name="mustard" className="absolute left-3 top-[46%] w-5" />
              <SpiceIcon name="cinnamon" className="absolute -right-1 bottom-[30%] w-7" />
              <Star className="absolute right-4 top-[6%] w-3" />
              <Star className="absolute left-1 bottom-[16%] w-2.5" />
            </div>

            {/* hero spice glyph */}
            <SpiceIcon
              name={product.icon}
              className="absolute bottom-[6%] left-1/2 w-[62%] -translate-x-1/2 text-white/90"
              strokeWidth={1.1}
            />

            <span className="pack__weight">{product.size}</span>
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
