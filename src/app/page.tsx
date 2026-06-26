'use client';

import { useI18n } from '@/lib/i18n-context';
import { DOWNLOAD_URL } from '@/lib/config';
import Header from '@/components/Header';
import MockTranscript from '@/components/MockTranscript';
import Waveform from '@/components/Waveform';
import Reveal from '@/components/Reveal';

const FEATURES = [
  { ic: '⚡', bg: '#F3E0D4', k: 1 },
  { ic: '🗣️', bg: '#D4EAE8', k: 2 },
  { ic: '🌍', bg: '#E4EEF7', k: 3 },
  { ic: '🧠', bg: '#ECE5F8', k: 4 },
  { ic: '📈', bg: '#F3E0D4', k: 5 },
  { ic: '🔁', bg: '#ECE5F8', k: 6 },
  { ic: '☁️', bg: '#E4EEF7', k: 7 },
  { ic: '🔒', bg: '#D4EAE8', k: 8 },
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

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 4v16l13-8z" />
    </svg>
  );
}

function TextIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16M4 12h10M4 17h7" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4" />
    </svg>
  );
}

export default function Home() {
  const { t, lang } = useI18n();

  return (
    <>
      <Header />

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero-glow" />
          <div className="hero-grain" />
          <div className="wrap hero-in">
            <span className="eyebrow">{t('hero.badge')}</span>
            <h1>
              <span>{t('hero.h1a')}</span>
              <span className="em">{t('hero.h1em')}</span>
              <span>{t('hero.h1b')}</span>
            </h1>
            <p className="lead">{t('hero.lead')}</p>
            <div className="hero-cta">
              <a className="btn btn-primary btn-lg" href="#download">
                <DownloadIcon />
                <span>{t('hero.cta')}</span>
              </a>
              <a className="btn btn-ghost btn-lg" href="#how">
                {t('hero.cta2')}
              </a>
            </div>
            <div className="hero-meta">
              <span>{t('hero.m1')}</span><span className="d" />
              <span>{t('hero.m2')}</span><span className="d" />
              <span>{t('hero.m3')}</span>
            </div>
            <p className="hero-note">{t('hero.note')}</p>

            <div className="shot reveal">
              <div className="shot-frame">
                <div className="shot-scene">
                  <div className="shot-sub">{t('hero.sub')}</div>
                  <MockTranscript />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WAVEFORM */}
        <section className="capture" id="capture">
          <div className="wrap">
            <div className="cap-head">
              <span className="eyebrow">{t('cap.eyebrow')}</span>
              <h2 className="h2" style={{ marginTop: 14 }}>{t('cap.h2')}</h2>
            </div>
            <Reveal><Waveform /></Reveal>
            <div className="wave-cap" dangerouslySetInnerHTML={{ __html: t('cap.note') }} />
          </div>
        </section>

        {/* PROBLEM */}
        <section className="section" id="problem">
          <div className="wrap narrow">
            <span className="eyebrow">{t('prob.eyebrow')}</span>
            <h2 className="h2" style={{ marginTop: 14, maxWidth: '18ch' }}>{t('prob.h2')}</h2>
            <p className="prose" dangerouslySetInnerHTML={{ __html: t('prob.p1') }} />
            <p className="prose big" dangerouslySetInnerHTML={{ __html: t('prob.p2') }} />
          </div>
        </section>

        {/* SOLUTION */}
        <section className="section sol-sec" id="solution">
          <div className="wrap narrow">
            <span className="eyebrow">{t('sol.eyebrow')}</span>
            <h2 className="h2" style={{ marginTop: 14, maxWidth: '20ch' }}>{t('sol.h2')}</h2>
            <p className="prose" dangerouslySetInnerHTML={{ __html: t('sol.p1') }} />
            <p className="prose accent" dangerouslySetInnerHTML={{ __html: t('sol.p2') }} />
          </div>
        </section>

        {/* HOW */}
        <section className="section" id="how">
          <div className="wrap">
            <div style={{ textAlign: 'center', maxWidth: '30ch', margin: '0 auto' }}>
              <span className="eyebrow">{t('how.eyebrow')}</span>
              <h2 className="h2" style={{ marginTop: 14 }}>{t('how.h2')}</h2>
            </div>
            <p className="lead" style={{ textAlign: 'center', maxWidth: '50ch', margin: '16px auto 0' }}>
              {t('how.lead')}
            </p>
            <div className="steps">
              <Reveal>
                <div className="step">
                  <div className="ic"><PlayIcon /></div>
                  <div className="n">01</div>
                  <h3>{t('how.s1t')}</h3>
                  <p>{t('how.s1d')}</p>
                </div>
              </Reveal>
              <Reveal>
                <div className="step">
                  <div className="ic"><TextIcon /></div>
                  <div className="n">02</div>
                  <h3>{t('how.s2t')}</h3>
                  <p>{t('how.s2d')}</p>
                </div>
              </Reveal>
              <Reveal>
                <div className="step">
                  <div className="ic"><MicIcon /></div>
                  <div className="n">03</div>
                  <h3>{t('how.s3t')}</h3>
                  <p>{t('how.s3d')}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PAPER BLOCK */}
        <div className="paper-block">
          <section className="section paper-sec" id="features">
            <div className="wrap">
              <div style={{ textAlign: 'center', maxWidth: '34ch', margin: '0 auto' }}>
                <span className="eyebrow dark">{t('feat.eyebrow')}</span>
                <h2 className="h2" style={{ marginTop: 14, color: 'var(--paper-ink)' }}>
                  {t('feat.h2')}
                </h2>
              </div>
              <p className="lead" style={{ textAlign: 'center', maxWidth: '52ch', margin: '16px auto 0', color: 'var(--paper-muted)' }}>
                {t('feat.lead')}
              </p>
              <div className="feat-grid">
                {FEATURES.map((f) => (
                  <div key={f.k} className="feat reveal">
                    <div className="ic" style={{ background: f.bg }}>{f.ic}</div>
                    <h3>{t(`feat.${f.k}t`)}</h3>
                    <p>{t(`feat.${f.k}d`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHY */}
          <section className="section paper-sec" id="why" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div style={{ textAlign: 'center', maxWidth: '30ch', margin: '0 auto' }}>
                <span className="eyebrow dark">{t('why.eyebrow')}</span>
                <h2 className="h2" style={{ marginTop: 14, color: 'var(--paper-ink)' }}>
                  {t('why.h2')}
                </h2>
              </div>
              <div className="compare">
                <div className="cmp-head">
                  <span />
                  <span className="cmp-col-a">{t('why.col1')}</span>
                  <span className="cmp-col-b">
                    <img src="/icon/soaken-128.png" alt="" />
                    {t('why.col2')}
                  </span>
                </div>
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="cmp-row">
                    <span className="cmp-l">{t(`why.r${n}l`)}</span>
                    <span className="cmp-a">
                      <i className="bad"><XIcon /></i>
                      {t(`why.r${n}a`)}
                    </span>
                    <span className="cmp-b">
                      <i className="good"><CheckIcon /></i>
                      {t(`why.r${n}b`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* WHO */}
        <section className="section" id="who">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <span className="eyebrow">{t('who.eyebrow')}</span>
            <h2 className="h2" style={{ marginTop: 14 }}>{t('who.h2')}</h2>
            <div className="who-cards">
              {[1, 2, 3].map((n) => (
                <Reveal key={n}>
                  <div className="who-card">
                    <h3>{t(`who.${n}t`)}</h3>
                    <p>{t(`who.${n}d`)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* LANGUAGES */}
        <section className="section" id="langs">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <span className="eyebrow">{t('langs.eyebrow')}</span>
            <h2 className="h2" style={{ marginTop: 14 }}>{t('langs.h2')}</h2>
            <div className="langs">
              {LANGS.map((l) => (
                <span key={l.cc} className={`langchip${l.soon ? ' soon' : ''}`}>
                  <img
                    className="flagimg"
                    src={`https://flagcdn.com/w40/${l.cc}.png`}
                    srcSet={`https://flagcdn.com/w80/${l.cc}.png 2x`}
                    width="26"
                    height="19"
                    alt=""
                    loading="lazy"
                  />
                  {lang === 'pt' ? l.k : l.en}
                  {l.soon && <span className="tag">{t('langs.soon')}</span>}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="wrap">
            <div style={{ textAlign: 'center' }}>
              <span className="eyebrow">{t('faq.eyebrow')}</span>
              <h2 className="h2" style={{ marginTop: 14 }}>{t('faq.h2')}</h2>
            </div>
            <div className="faq">
              {[1, 2, 3, 4, 5].map((n) => (
                <details key={n} className="qa" open={n === 1}>
                  <summary>
                    {t(`faq.q${n}`)}
                    <span className="plus" />
                  </summary>
                  <div className="ans">{t(`faq.a${n}`)}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section" id="download">
          <div className="wrap">
            <Reveal>
              <div className="cta-block">
                <div className="cta-glow" />
                <img
                  src="/icon/soaken-128.png"
                  width="76"
                  height="76"
                  alt=""
                  style={{ margin: '0 auto 22px', position: 'relative', filter: 'drop-shadow(0 12px 26px rgba(51,183,176,.4))' }}
                />
                <h2>{t('cta.h2')}</h2>
                <p>{t('cta.p')}</p>
                <div className="hero-cta" style={{ marginTop: 30 }}>
                  <a className="btn btn-primary btn-lg" href={DOWNLOAD_URL} target="_blank" rel="noopener">
                    <DownloadIcon />
                    <span>{t('cta.btn')}</span>
                  </a>
                </div>
                <p className="cta-meta">{t('cta.meta')}</p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="ft">
        <div className="wrap">
          <div className="ft-in">
            <div>
              <div className="logo">
                <img src="/icon/soaken-128.png" alt="Soaken" />
                <span className="nm">Soaken</span>
              </div>
              <p className="tag">{t('ft.tag')}</p>
            </div>
            <div className="ft-cols">
              <div className="ft-col">
                <h4>{t('ft.product')}</h4>
                <a href="#how">{t('ft.how')}</a>
                <a href="#features">{t('ft.features')}</a>
                <a href="#langs">{t('ft.langs')}</a>
                <a href="#download">{t('ft.download')}</a>
              </div>
              <div className="ft-col">
                <h4>{t('ft.company')}</h4>
                <a href="#">{t('ft.about')}</a>
                <a href="#">{t('ft.privacy')}</a>
                <a href="#">{t('ft.contact')}</a>
              </div>
            </div>
          </div>
          <div className="ft-bot">
            <span>{t('ft.rights')}</span>
            <span>{t('ft.made')}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
