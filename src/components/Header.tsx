'use client';

import { useEffect } from 'react';
import { useI18n } from '@/lib/i18n-context';

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
        <a className="logo" href="#top">
          <img src="/icon/soaken-128.png" alt="Soaken" />
          <span className="nm">Soaken</span>
        </a>
        <nav className="nav">
          <a href="#how">{t('nav.how')}</a>
          <a href="#features">{t('nav.features')}</a>
          <a href="#why">{t('nav.why')}</a>
          <a href="#faq">{t('nav.faq')}</a>
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
          <a className="btn btn-primary" href="#download">
            {t('nav.download')}
          </a>
        </div>
      </div>
    </header>
  );
}
