'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import { useI18n } from '@/lib/i18n-context';
import { CHANGELOG } from '@/lib/changelog';

export default function ChangelogPage() {
  const { t, lang } = useI18n();

  return (
    <>
      <Header />

      <main id="top">
        <section className="section cl-hero">
          <div className="wrap narrow">
            <span className="eyebrow">{t('cl.eyebrow')}</span>
            <h1 className="h2" style={{ marginTop: 14 }}>{t('cl.title')}</h1>
            <p className="lead" style={{ margin: '14px auto 0' }}>{t('cl.sub')}</p>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap narrow cl-list">
            {CHANGELOG.map((r) => (
              <article key={r.version} className="cl-rel">
                <div className="cl-rel-head">
                  <span className="cl-ver">v{r.version}</span>
                  {r.latest && <span className="cl-latest">{t('cl.latest')}</span>}
                  {r.date !== '—' && <span className="cl-date">{r.date}</span>}
                </div>
                <div className="cl-items">
                  {r.changes.map((c, i) => (
                    <div key={i} className="cl-item">
                      <span className={`cl-chip ${c.type}`}>{t(`cl.${c.type}`)}</span>
                      <span>{lang === 'pt' ? c.pt : c.en}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}

            <Link href="/" className="cl-back">← {t('cl.back')}</Link>
          </div>
        </section>
      </main>
    </>
  );
}
