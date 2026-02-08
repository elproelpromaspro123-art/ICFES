import type { NextConfig } from "next";

// Security headers are configured in vercel.json since `output: "export"`
// does not support the `headers()` config option in next.config.ts.
const nextConfig: NextConfig = {
  output: "export",
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
