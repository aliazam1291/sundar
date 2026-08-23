import { ImageResponse } from "next/og";

export const alt = "Sunder Masala — Local Hero Masala, since 1975";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // Satori has no blur filter, so the warm glow is baked into the
          // background as a radial gradient rather than a blurred circle.
          backgroundColor: "#0e3b2c",
          backgroundImage:
            "radial-gradient(900px 620px at 62% 118%, rgba(255,199,64,0.20), rgba(255,199,64,0) 68%), linear-gradient(150deg, #0e3b2c 0%, #16523c 62%, #0b3325 100%)",
          padding: "68px 74px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* top rail */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#d81f26",
                borderRadius: 8,
                padding: "12px 26px",
                fontSize: 40,
                fontWeight: 800,
                color: "#fdf6e8",
                letterSpacing: 3,
              }}
            >
              SUNDER
            </div>
            <div style={{ display: "flex", fontSize: 21, color: "#ffc740", letterSpacing: 5 }}>
              EST. 1975
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 21, color: "rgba(255,223,140,0.62)", letterSpacing: 5 }}>
            INDORE · M.P.
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 800,
              color: "#fdf6e8",
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            Bring your region
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 800,
              color: "#ffc740",
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            back to your plate.
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 30, color: "rgba(255,223,140,0.78)" }}>
            Kam masala, poora swaad — slow-ground, single-origin Indian spice.
          </div>
        </div>

        {/* bottom rail */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 44,
            borderTop: "1px solid rgba(255,223,140,0.25)",
            paddingTop: 26,
            fontSize: 23,
            color: "rgba(255,223,140,0.66)",
            letterSpacing: 3,
          }}
        >
          {/* Rotated squares stand in for the brand star — Satori's fallback
              font has no glyph for U+2726 and renders it as tofu. */}
          <div style={{ display: "flex" }}>BLENDED</div>
          <div
            style={{
              display: "flex",
              width: 11,
              height: 11,
              background: "#ffc740",
              transform: "rotate(45deg)",
            }}
          />
          <div style={{ display: "flex" }}>PURE</div>
          <div
            style={{
              display: "flex",
              width: 11,
              height: 11,
              background: "#ffc740",
              transform: "rotate(45deg)",
            }}
          />
          <div style={{ display: "flex" }}>WHOLE</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
