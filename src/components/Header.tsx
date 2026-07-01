'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n-context';
import { DOWNLOAD_URL } from '@/lib/config';

function WindowsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: 7, verticalAlign: '-2px' }}>
      <path d="M3 4.6 11 3.49v7.92H3V4.6Zm9-1.25L21 2v9.41h-9V3.35ZM3 12.59h8v7.92L3 19.4v-6.81Zm9 0h9V22l-9-1.25v-8.16Z" />
    </svg>
  );
}

export default function Header() {
  const { lang, setLang, t } = useI18n();

  useEffect(() => {
    const hdr = document.getElementById('hdr');
    if (!hdr) return;
    const onScroll = () => hdr.classList.toggle('scrolled', window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="hdr" id="hdr">
      <div className="wrap hdr-in">
        <a className="logo" href="/#top">
          <img src="/icon/soaken-128.png" alt="Soaken" />
          <span className="nm">Soaken</span>
        </a>
        <nav className="nav">
          <a href="/#how">{t('nav.how')}</a>
          <a href="/#features">{t('nav.features')}</a>
          <a href="/#why">{t('nav.why')}</a>
          <a href="/#faq">{t('nav.faq')}</a>
          <Link href="/changelog">{t('nav.changelog')}</Link>
        </nav>
        <div className="hdr-cta">
          <div className="lang">
            <button
              data-lang="pt"
              className={lang === 'pt' ? 'on' : ''}
              onClick={() => setLang('pt')}
            >
              PT
            </button>
            <button
              data-lang="en"
              className={lang === 'en' ? 'on' : ''}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
          <a className="btn btn-primary" href={DOWNLOAD_URL} target="_blank" rel="noopener">
            <WindowsIcon />
            {t('nav.download')}
          </a>
        </div>
      </div>
    </header>
  );
}
