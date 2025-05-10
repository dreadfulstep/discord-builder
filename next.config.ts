import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    unoptimized: isDev,
    remotePatterns: isDev
      ? [] // You can leave this empty if unoptimized is true
      : [
          {
            protocol: "https",
            hostname: "media.discordapp.com",
          },
        ],
  },
};

export default nextConfig;
