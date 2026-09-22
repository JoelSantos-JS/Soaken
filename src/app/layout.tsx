import type { Metadata } from 'next';
import { I18nProvider } from '@/lib/i18n-context';
import './globals.css';

export const metadata: Metadata = {
  title: 'Soaken — Fale o idioma que você já entende',
  description:
    'O Soaken escuta vídeos, séries e calls no seu computador, transcreve ao vivo e transforma em prática de fala e pronúncia, no seu idioma. Baixe grátis.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <I18nProvider>
          <div className="page">{children}</div>
        </I18nProvider>
      </body>
    </html>
  );
}
