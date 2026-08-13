import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root — a stray lockfile in the home directory
  // otherwise wins the inference.
  turbopack: {
    root: __dirname,
  },

  images: {
    // AVIF first: the pack shots are flat-ish product photography with big
    // areas of one colour, which is exactly where AVIF beats WebP hardest.
    formats: ["image/avif", "image/webp"],
    // The widest a pack is ever displayed is ~330 CSS px, so the giant
    // default breakpoints only ever cost the optimiser time.
    imageSizes: [64, 96, 128, 190, 256, 330],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // No geolocation, camera or mic anywhere on a spice website.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
      {
        // Pack shots are content-hashed by nothing, but they only change when
        // the catalogue does — a month of immutable caching is safe and the
        // deploy invalidates the optimiser anyway.
        source: "/packs/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
