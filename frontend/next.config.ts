import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/dashboard/competitor/competitions",
        destination: "/competitions",
        permanent: false,
      },
      {
        source: "/dashboard/competitor/applications",
        destination: "https://tally.so/r/mOxbXY",
        permanent: false,
      },
      {
        source: "/dashboard/competitor/profile",
        destination: "/under-construction",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://pitchdeck-ddnd.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
