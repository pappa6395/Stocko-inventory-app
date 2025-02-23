import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'cdn.dummyjson.com',
      },
    ]
  },
  sassOptions: {
    includePaths: ["./styles"],
  },
  eslint: {
    ignoreDuringBuilds: true, // Use this here instead of in ESLint config
  },
};

export default nextConfig;
