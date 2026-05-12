import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/intake/hdz",
        destination: "/intake",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
