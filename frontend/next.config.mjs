/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
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
        destination: "https://pitchdeck-ddnd.onrender.com/api/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Accept, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
