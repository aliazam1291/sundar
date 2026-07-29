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
};

export default nextConfig;
