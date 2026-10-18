import type { NextConfig } from "next";

// Static export: `npm run build` writes a plain website to ./out (hosted on Render as a static site)
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
