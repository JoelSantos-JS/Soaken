import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Guia de uso (HTML estático em /public/guia) acessível em /guia
      { source: "/guia", destination: "/guia/index.html" },
    ];
  },
  // /download não fica aqui: é um route handler em src/app/download/route.ts,
  // que resolve a última release na hora. Um redirect declarado neste arquivo
  // teria precedência sobre a rota e a deixaria sem efeito.
};

export default nextConfig;
