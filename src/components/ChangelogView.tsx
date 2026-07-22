'use client';

import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { useI18n } from '@/lib/i18n-context';
import type { Release } from '@/lib/changelog-types';

// Converte a marcação inline usada no changelog: **negrito**, *itálico* e `código`.
// A ordem das alternativas importa: `**…**` antes de `*…*`, senão o negrito viraria
// dois itálicos vazios.
function fmt(s: string): ReactNode {
  return s.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export default function ChangelogView({ releases }: { releases: Release[] }) {
  const { t, lang } = useI18n();
  const pick = (o: { pt: string; en: string }) => (lang === 'pt' ? o.pt : o.en);

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
            {releases.map((r, ri) => (
              <article key={r.version ?? `r${ri}`} className="cl-rel">
                <div className="cl-rel-head">
                  <span className="cl-ver">{r.title ? pick(r.title) : `v${r.version}`}</span>
                  {r.latest && <span className="cl-latest">{t('cl.latest')}</span>}
                  {r.date && <span className="cl-date">{r.date}</span>}
                </div>

                {r.groups.map((g, gi) => (
                  <div key={gi} className="cl-group">
                    {g.category !== 'note' && (
                      <span className={`cl-cat ${g.category}`}>{t(`cl.${g.category}`)}</span>
                    )}
                    <ul className="cl-items">
                      {g.items.map((it, ii) => (
                        <li key={ii} className="cl-item">
                          <span>{fmt(pick(it.text))}</span>
                          {it.sub && (
                            <ul className="cl-sub">
                              {it.sub.map((s, si) => (
                                <li key={si}>{fmt(pick(s))}</li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </article>
            ))}

            <Link href="/" className="cl-back">← {t('cl.back')}</Link>
          </div>
        </section>
      </main>
    </>
  );
}
