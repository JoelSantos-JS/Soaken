'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n-context';
import { DOWNLOAD_URL } from '@/lib/config';
import Logo from '@/components/Logo';

export default function Header() {
  const { lang, setLang, t } = useI18n();

  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Link className="brand" href="/#top">
          <Logo size={34} />
          <span className="nm">Soaken</span>
        </Link>
        <div style={{ flex: 1, minWidth: 8 }} />
        <nav className="nav">
          <Link href="/#how">{t('nav.how')}</Link>
          <Link href="/#features">{t('nav.features')}</Link>
          <Link className="opt" href="/#why">{t('nav.why')}</Link>
          <Link href="/#pricing">{t('nav.pricing')}</Link>
          <Link className="opt" href="/#faq">{t('nav.faq')}</Link>
          <a href="/guia">{t('nav.guide')}</a>
        </nav>
        <div className="lang">
          <button className={lang === 'pt' ? 'on' : ''} onClick={() => setLang('pt')}>PT</button>
          <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
        </div>
        <a className="btn btn-primary hdr-btn" href={DOWNLOAD_URL} target="_blank" rel="noopener">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 4.6 11 3.49v7.92H3V4.6Zm9-1.25L21 2v9.41h-9V3.35ZM3 12.59h8v7.92L3 19.4v-6.81Zm9 0h9V22l-9-1.25v-8.16Z" />
          </svg>
          {t('nav.download')}
        </a>
      </div>
    </header>
  );
}
