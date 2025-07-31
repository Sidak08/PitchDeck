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
};

export default nextConfig;
