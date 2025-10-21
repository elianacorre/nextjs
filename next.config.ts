import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ik.imagekit.io", pathname: "/elianacorre/**" },
      { protocol: "https", hostname: "ec-convex.imgix.net" },
    ],
  },
};

export default nextConfig;
