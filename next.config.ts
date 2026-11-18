import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Math Blitz (/game) was removed; send old links to the home page.
  async redirects() {
    return [{ source: "/game", destination: "/", permanent: true }];
  },
};

export default nextConfig;
