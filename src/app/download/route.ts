import { NextResponse } from 'next/server';

// /download sempre entrega a release mais nova do Soaken.
//
// Antes o destino era fixo no next.config.ts e, na prática, ficava para trás:
// o site serviu a 0.1.9, depois a 0.1.11 e a 0.1.12 enquanto já existiam
// versões novas. Aqui a última release é consultada na API do GitHub, então
// publicar uma versão nova basta — nada precisa ser editado neste repositório.

const RELEASES_API =
  'https://api.github.com/repos/JoelSantos-JS/Soaken/releases/latest';

// Rede de segurança: se a API falhar, estourar o limite de requisições ou
// demorar demais, o download continua funcionando por aqui. Só precisa ser
// atualizado se este arquivo específico sair do ar.
const FALLBACK_URL =
  'https://github.com/JoelSantos-JS/Soaken/releases/download/v0.1.14/Soaken-Setup-0.1.14.exe';

// A resposta do GitHub fica em cache por 10 minutos: são ~6 chamadas por hora,
// bem abaixo do limite de 60/h que a API impõe a quem não se autentica.
const CACHE_SEGUNDOS = 600;

type Asset = { name?: unknown; browser_download_url?: unknown };

async function urlDoInstalador(): Promise<string> {
  try {
    const res = await fetch(RELEASES_API, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'soaken-site',
      },
      // Se o GitHub demorar, não deixamos o usuário esperando: cai no fallback.
      signal: AbortSignal.timeout(4000),
      next: { revalidate: CACHE_SEGUNDOS },
    });

    if (!res.ok) return FALLBACK_URL;

    const release: { assets?: Asset[] } = await res.json();
    const exe = release.assets?.find(
      (a) => typeof a?.name === 'string' && a.name.endsWith('.exe'),
    );

    return typeof exe?.browser_download_url === 'string'
      ? exe.browser_download_url
      : FALLBACK_URL;
  } catch {
    return FALLBACK_URL;
  }
}

export async function GET() {
  // 307 e no-store porque o destino muda a cada release: um redirect cacheado
  // no navegador continuaria mandando o usuário para a versão antiga.
  return NextResponse.redirect(await urlDoInstalador(), {
    status: 307,
    headers: { 'Cache-Control': 'no-store' },
  });
}
