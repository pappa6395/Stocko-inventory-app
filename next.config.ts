import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"],
  },
  sassOptions: {
    includePaths: ["./styles"],
  },
};

export default nextConfig;
