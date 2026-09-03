import type { NextConfig } from "next";

// Onde o instalador esta hospedado de fato. Trocar aqui a cada release
// (ou quando o arquivo sair do GitHub para um bucket com dominio proprio).
// Ao trocar a versao, atualizar tambem o nome do arquivo mostrado no guia:
// public/guia/index.html, capitulo "Baixar e instalar", passo 02.
const INSTALLER_URL =
  "https://github.com/JoelSantos-JS/Soaken/releases/download/v0.1.14/Soaken-Setup-0.1.14.exe";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Guia de uso (HTML estático em /public/guia) acessível em /guia
      { source: "/guia", destination: "/guia/index.html" },
    ];
  },
  async redirects() {
    return [
      // /download é o link publicado; o destino real fica só aqui.
      // permanent: false (307) de propósito — o destino muda a cada release
      // e um 308 ficaria cacheado no navegador do usuário.
      { source: "/download", destination: INSTALLER_URL, permanent: false },
    ];
  },
};

export default nextConfig;
