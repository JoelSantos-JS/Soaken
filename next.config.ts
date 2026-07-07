import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Guia de uso (HTML estático em /public/guia) acessível em /guia
      { source: "/guia", destination: "/guia/index.html" },
    ];
  },
};

export default nextConfig;
