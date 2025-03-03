import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    domains: [
      'cdn.prod.website-files.com',
      'images.unsplash.com',
      'i0.wp.com',
    ],
  },
};

export default nextConfig;
