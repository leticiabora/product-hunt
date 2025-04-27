import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [      {
      hostname: 'ph-files.imgix.net',
    }]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
