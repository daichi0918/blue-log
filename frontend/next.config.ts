import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // すべてのホスト名を許可
      },
    ],
  },
};

export default nextConfig;
