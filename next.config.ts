import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif"],
    remotePatterns: [{ protocol: "https", hostname: "ec-convex.imgix.net" }],
  },
};

export default nextConfig;
