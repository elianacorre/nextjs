import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "ik.imagekit.io", pathname: "/elianacorre/**" }],
  },
};

export default nextConfig;
