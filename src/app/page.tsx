'use client';

import { useState, type CSSProperties } from 'react';
import { useI18n } from '@/lib/i18n-context';
import { DOWNLOAD_URL, PRO_CHECKOUT_URL } from '@/lib/config';
import Header from '@/components/Header';
import Logo from '@/components/Logo';
import FloatingBar from '@/components/FloatingBar';
import Reveal from '@/components/Reveal';

// Cores do sublinhado térmico: o quanto a palavra é rara pra você.
const HEAT = { known: '#6F827D', common: '#C7D6D2', useful: '#E6B15A', rare: '#F1895A' } as const;

const HEAT_WORDS: [string, keyof typeof HEAT][] = [
  ['I', 'known'], ["didn't", 'known'], ['see', 'common'], ['that', 'known'], ['coming', 'useful'],
];

// Paths dos ícones (traço), separados por "|".
const D = {
  play: 'M7 4v16l13-8z',
  mic: 'M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z|M19 10v1a7 7 0 0 1-14 0v-1|M12 18v4',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z|M3 12h18|M12 3c2.6 3 2.6 15 0 18|M12 3c-2.6 3-2.6 15 0 18',
  brain: 'M9.5 3A3.5 3.5 0 0 0 6 6.5 3 3 0 0 0 4 9.5c0 1 .5 1.9 1.2 2.4A3 3 0 0 0 5 14a3 3 0 0 0 2.5 3A3 3 0 0 0 12 19V5a2 2 0 0 0-2.5-2z|M14.5 3A3.5 3.5 0 0 1 18 6.5a3 3 0 0 1 2 3c0 1-.5 1.9-1.2 2.4A3 3 0 0 1 19 14a3 3 0 0 1-2.5 3A3 3 0 0 1 12 19',
  chart: 'M5 20V12|M12 20V5|M19 20v-5',
  loop: 'M4 10a8 8 0 0 1 13-5l3 2|M20 14a8 8 0 0 1-13 5l-3-2|M20 4v5h-5|M4 20v-5h5',
  cloud: 'M7 18h9.5a4 4 0 0 0 .3-8A6 6 0 0 0 5.5 11.5 3.3 3.3 0 0 0 7 18z',
  lock: 'M5 11h14v10H5z|M8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  bolt: 'M13 2 4.5 13H11l-1 9 8.5-11H12l1-9z',
};

const STEPS = [
  { n: '01', d: D.play },
  { n: '02', d: D.globe },
  { n: '03', d: D.mic },
];

const FEATURES = [
  { k: 1, d: D.bolt, ink: '#E1B05A' },
  { k: 2, d: D.mic, ink: '#3ABEB8' },
  { k: 3, d: D.globe, ink: '#7FA7E8' },
  { k: 4, d: D.brain, ink: '#A98BE8' },
  { k: 5, d: D.chart, ink: '#F0958F' },
  { k: 6, d: D.loop, ink: '#8FD3A6' },
  { k: 7, d: D.cloud, ink: '#7FA7E8' },
  { k: 8, d: D.lock, ink: '#93B1A9' },
];

const LANGS = [
  { cc: 'gb', k: 'Inglês', en: 'English', soon: false },
  { cc: 'kr', k: 'Coreano', en: 'Korean', soon: false },
  { cc: 'jp', k: 'Japonês', en: 'Japanese', soon: false },
  { cc: 'cn', k: 'Chinês', en: 'Chinese', soon: false },
  { cc: 'es', k: 'Espanhol', en: 'Spanish', soon: false },
  { cc: 'fr', k: 'Francês', en: 'French', soon: true },
  { cc: 'de', k: 'Alemão', en: 'German', soon: true },
  { cc: 'it', k: 'Italiano', en: 'Italian', soon: true },
];

function Ic({ d, stroke = 'currentColor', size = 17 }: { d: string; stroke?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {d.split('|').map((p) => <path key={p} d={p} />)}
    </svg>
  );
}

function Check({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#3ABEB8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}>
      <path d="M5 12.5 10 17l9-10" />
    </svg>
  );
}

function WindowsIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 4.6 11 3.49v7.92H3V4.6Zm9-1.25L21 2v9.41h-9V3.35ZM3 12.59h8v7.92L3 19.4v-6.81Zm9 0h9V22l-9-1.25v-8.16Z" />
    </svg>
  );
}

export default function Home() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(0);

  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section id="top" className="hero">
          <div className="hero-bg" />
          <div className="hero-scan" />
          <div className="wrap hero-in">
            <div style={{ minWidth: 0 }}>
              <div className="pill-kicker">
                <span className="dot" />
                <span>{t('hero.kicker')}</span>
              </div>
              <h1 className="hero-h1">
                <span>{t('hero.h1a')}</span>
                <span className="em">{t('hero.h1b')}</span>
              </h1>
              <p className="hero-sub">{t('hero.sub')}</p>
              <div className="hero-cta">
                <a className="btn btn-primary btn-lg" href={DOWNLOAD_URL} target="_blank" rel="noopener">
                  <WindowsIcon />
                  <span>{t('hero.cta')}</span>
                </a>
                <a className="btn btn-ghost btn-lg" href="#how">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M10 8.5l6 3.5-6 3.5z" /></svg>
                  <span>{t('hero.cta2')}</span>
                </a>
              </div>
              <div className="hero-badges">
                {[1, 2, 3].map((n) => (
                  <div key={n}>
                    <Check size={14} />
                    <span>{t(`hero.b${n}`)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-bar">
              <div className="hero-bar-float">
                <div className="hero-bar-glow" />
                <FloatingBar />
              </div>
            </div>
          </div>
          <p className="wrap hero-foot">{t('hero.foot')}</p>
        </section>

        {/* PROBLEMA + COMO FUNCIONA */}
        <section id="how" className="wrap sec">
          <div className="kicker">{t('prob.kicker')}</div>
          <h2 className="h2" style={{ maxWidth: 780 }}>{t('prob.title')}</h2>
          <div className="grid" style={{ '--min': '300px', gap: 16, marginTop: 34 } as CSSProperties}>
            <div className="card-before">
              <div className="tag">{t('prob.beforeTag')}</div>
              <p>{t('prob.before')}</p>
            </div>
            <div className="card-after">
              <div className="tag">{t('prob.afterTag')}</div>
              <p>{t('prob.after')}</p>
            </div>
          </div>

          <Reveal>
            <div className="grid" style={{ '--min': '210px', gap: 16, marginTop: 44 } as CSSProperties}>
              {STEPS.map((s, i) => (
                <div key={s.n} className="step">
                  <div className="n">{s.n}</div>
                  <div className="ic"><Ic d={s.d} stroke="#3ABEB8" /></div>
                  <div className="t">{t(`how.${i + 1}t`)}</div>
                  <div className="d">{t(`how.${i + 1}d`)}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* SUBLINHADO TÉRMICO */}
        <section className="band">
          <div className="wrap sec heat">
            <div style={{ minWidth: 0 }}>
              <div className="kicker">{t('heat.kicker')}</div>
              <h2 className="h2 sm">{t('heat.title')}</h2>
              <p className="body" style={{ maxWidth: 460 }}>{t('heat.body')}</p>
              <div className="heat-legend">
                {(Object.keys(HEAT) as (keyof typeof HEAT)[]).map((k) => (
                  <div key={k}>
                    <span style={{ background: HEAT[k] }} />
                    <span>{t(`heat.${k}`)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="heat-card">
              <div className="heat-words">
                {HEAT_WORDS.map(([w, h]) => (
                  <span key={w} style={{ borderBottomColor: HEAT[h] }}>{w}</span>
                ))}
              </div>
              <div className="heat-gloss">{t('heat.gloss')}</div>
              <div className="heat-foot">
                <div className="heat-cta">
                  <Ic d={D.mic} size={15} />
                  <span>{t('heat.cta')}</span>
                </div>
                <div className="heat-score">
                  <div className="ring"><div><span>87</span></div></div>
                  <span>{t('heat.score')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECURSOS */}
        <section id="features" className="wrap sec">
          <div className="kicker">{t('feat.kicker')}</div>
          <h2 className="h2" style={{ maxWidth: 760 }}>{t('feat.title')}</h2>
          <Reveal>
            <div className="grid" style={{ '--min': '258px', gap: 14, marginTop: 34 } as CSSProperties}>
              {FEATURES.map((f) => (
                <div key={f.k} className="feat">
                  <div
                    className="ic"
                    style={{
                      background: `color-mix(in oklab, ${f.ink} 15%, rgba(21,38,35,.8))`,
                      borderColor: `color-mix(in oklab, ${f.ink} 42%, transparent)`,
                      color: f.ink,
                    }}
                  >
                    <Ic d={f.d} stroke={f.ink} />
                  </div>
                  <div className="t">{t(`feat.${f.k}t`)}</div>
                  <div className="d">{t(`feat.${f.k}d`)}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* POR QUE SOAKEN */}
        <section id="why" className="band">
          <div className="wrap sec">
            <div className="kicker">{t('why.kicker')}</div>
            <h2 className="h2 md">{t('why.title')}</h2>
            <div className="cmp">
              <div className="cmp-row head">
                <span />
                <span className="o">{t('why.colOther')}</span>
                <span className="s"><Logo size={26} /><span>Soaken</span></span>
              </div>
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="cmp-row">
                  <span className="l">{t(`why.r${n}l`)}</span>
                  <span className="o">{t(`why.r${n}a`)}</span>
                  <span className="s">{t(`why.r${n}b`)}</span>
                </div>
              ))}
            </div>

            <div className="grid" style={{ '--min': '210px', gap: 14, marginTop: 34 } as CSSProperties}>
              {[1, 2, 3].map((n) => (
                <div key={n} className="persona">
                  <div className="t">{t(`who.${n}t`)}</div>
                  <div className="d">{t(`who.${n}d`)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IDIOMAS */}
        <section id="langs" className="wrap sec">
          <div className="langs-head">
            <h2 className="h2 sm" style={{ margin: 0 }}>{t('langs.title')}</h2>
            <span>{t('langs.sub')}</span>
          </div>
          <div className="langs">
            {LANGS.map((l) => (
              <div key={l.cc} className={`langchip${l.soon ? ' soon' : ''}`}>
                <img
                  className="flag"
                  src={`https://flagcdn.com/w40/${l.cc}.png`}
                  srcSet={`https://flagcdn.com/w80/${l.cc}.png 2x`}
                  width="24"
                  height="18"
                  alt=""
                  loading="lazy"
                />
                <span className="nm">{lang === 'pt' ? l.k : l.en}</span>
                {l.soon && <span className="tag">{t('langs.soon')}</span>}
              </div>
            ))}
          </div>
        </section>

        {/* PREÇOS */}
        <section id="pricing" className="band top-only">
          <div className="wrap sec">
            <div className="kicker">{t('pricing.kicker')}</div>
            <h2 className="h2">{t('pricing.title')}</h2>
            <p className="body" style={{ maxWidth: 620, marginTop: 14 }}>{t('pricing.sub')}</p>
            <div className="grid" style={{ '--min': '300px', gap: 16, marginTop: 32, alignItems: 'start' } as CSSProperties}>
              <div className="plan">
                <div className="name">{t('price.free.name')}</div>
                <div className="price">
                  <span className="v">{t('price.free.val')}</span>
                  <span className="per">{t('price.free.per')}</span>
                </div>
                <div className="desc">{t('price.free.desc')}</div>
                <div className="items">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n}><Check /><span>{t(`price.free.f${n}`)}</span></div>
                  ))}
                </div>
                <a className="btn btn-outline btn-block" href={DOWNLOAD_URL} target="_blank" rel="noopener">
                  {t('price.free.cta')}
                </a>
              </div>
              <div className="plan pro">
                <span className="badge">{t('pricing.recommended')}</span>
                <div className="name">{t('price.pro.name')}</div>
                <div className="price">
                  <span className="v">{t('price.pro.val')}</span>
                  <span className="per">{t('price.pro.per')}</span>
                </div>
                <div className="desc">{t('price.pro.desc')}</div>
                <div className="items">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n}><Check /><span>{t(`price.pro.f${n}`)}</span></div>
                  ))}
                </div>
                <a className="btn btn-primary btn-block" href={PRO_CHECKOUT_URL} target="_blank" rel="noopener">
                  {t('price.pro.cta')}
                </a>
              </div>
            </div>
            <div className="note">{t('pricing.note')}</div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="wrap sec">
          <h2 className="h2 md" style={{ margin: 0 }}>{t('faq.title')}</h2>
          <div className="faq">
            {[1, 2, 3, 4].map((n, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={n}
                  type="button"
                  className={`qa${isOpen ? ' open' : ''}`}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="q">
                    <span>{t(`faq.q${n}`)}</span>
                    <span className="chev">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                    </span>
                  </span>
                  {isOpen && <span className="a">{t(`faq.a${n}`)}</span>}
                </button>
              );
            })}
          </div>
        </section>

        {/* CTA FINAL */}
        <section id="download" className="final">
          <div className="final-bg" />
          <div className="final-in">
            <Logo size={78} />
            <h2>{t('cta.title')}</h2>
            <p>{t('cta.body')}</p>
            <a className="btn btn-primary btn-xl" href={DOWNLOAD_URL} target="_blank" rel="noopener">
              <WindowsIcon size={18} />
              <span>{t('cta.btn')}</span>
            </a>
            <div className="meta">{t('cta.meta')}</div>
            <a className="safe" href="/guia#chdl">{t('cta.safe')}</a>
          </div>
        </section>
      </main>

      {/* RODAPÉ */}
      <footer className="ft">
        <div className="wrap ft-in">
          <div style={{ minWidth: 0 }}>
            <div className="brand">
              <Logo size={26} />
              <span className="nm">Soaken</span>
            </div>
            <p className="tag">{t('ft.tag')}</p>
          </div>
          <div className="ft-col">
            <h4>{t('ft.product')}</h4>
            <a href="#how">{t('ft.how')}</a>
            <a href="#features">{t('ft.features')}</a>
            <a href="#langs">{t('ft.langs')}</a>
            <a href="#pricing">{t('nav.pricing')}</a>
            <a href="/guia">{t('ft.guide')}</a>
            <a href="#download">{t('ft.download')}</a>
          </div>
          <div className="ft-col">
            <h4>{t('ft.company')}</h4>
            <a href="#">{t('ft.about')}</a>
            <a href="#">{t('ft.privacy')}</a>
            <a href="#">{t('ft.contact')}</a>
          </div>
        </div>
        <div className="wrap ft-bot">
          <span>{t('ft.rights')}</span>
          <div style={{ flex: 1, minWidth: 8 }} />
          <span className="motto">{t('hero.h1a')} {t('hero.h1b')}</span>
        </div>
      </footer>
    </>
  );
}
