'use client';

import { useState } from 'react';

// Réplica da barra flutuante do app, usada no hero. O texto fica em inglês
// de propósito: é assim que a barra aparece no app.

const HEAT = { known: '#6F827D', common: '#C7D6D2', useful: '#E6B15A', rare: '#F1895A' } as const;
type Heat = keyof typeof HEAT;

const LIVE: [string, Heat][] = [
  ['Honestly,', 'common'], ['if', 'known'], ["I'd", 'known'], ['known', 'common'], ['the', 'known'],
  ['whole', 'common'], ['thing', 'known'], ['would', 'known'], ['blow', 'useful'], ['up', 'known'],
  ['in', 'known'], ['my', 'known'], ['face', 'common'], ['like', 'known'], ['that,', 'known'],
  ['I', 'known'], ['would', 'known'], ['never', 'common'], ['have', 'known'], ['brought', 'useful'],
  ['it', 'known'], ['up', 'known'], ['at', 'known'], ['the', 'known'], ['meeting', 'common'],
  ['in', 'known'], ['the', 'known'], ['first', 'common'], ['place.', 'common'],
];

// texto, tamanho, peso, cor, alfa do fundo, alfa da borda, alfa da espinha, opacidade
const PAST: [string, number, number, string, string, string, string | null, string][] = [
  ['You could have told me, at least.', 14, 400, '#5D746F', '.28', '.55', '.5', '.8'],
  ['So you two just decided without me?', 15, 400, '#7D958E', '.4', '.7', '.7', '.9'],
  ["It wasn't like that, I swear.", 16, 500, '#A7BEB8', '.55', '.9', null, '1'],
];

const STATS = [
  { label: 'Phrases captured', value: '23', color: '#F1F8F5' },
  { label: 'Spoken back', value: '18', color: '#8FD3A6' },
  { label: 'Average score', value: '81', color: '#8FD3A6' },
  { label: 'New words met', value: '6', color: HEAT.useful },
];

const TABS = [
  { id: 'Transcript', d: ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'] },
  { id: 'Session', d: ['M3 12h4l3 8 4-16 3 8h4'] },
] as const;

const CLOCK = '14:06';
const MIC_DEVICE = 'Yeti Nano';

function Mic({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
      <path d="M12 18v4" />
    </svg>
  );
}

export default function FloatingBar() {
  const [tab, setTab] = useState<'Transcript' | 'Session'>('Transcript');
  const [listening, setListening] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const size = LIVE.length > 18 ? 17 : LIVE.length > 10 ? 19 : 22;

  return (
    <div className="fb">
      <div className="fb-in">
        <div className="fb-top">
          {TABS.map((t) => (
            <button key={t.id} type="button" className={`fb-tab${tab === t.id ? ' on' : ''}`} onClick={() => setTab(t.id)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                {t.d.map((p) => <path key={p} d={p} />)}
              </svg>
              <span>{t.id}</span>
            </button>
          ))}
          <div style={{ flex: 1 }} />
          {listening && (
            <div className="fb-live">
              <span className="fb-live-dot" />
              <span>LIVE</span>
            </div>
          )}
          <div className="fb-icons">
            <span title="Language">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 3 2.6 15 0 18M12 3c-2.6 3-2.6 15 0 18" /></svg>
            </span>
            <span title="Settings">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2.1 2.1M16.9 16.9 19 19M19 5l-2.1 2.1M7.1 16.9 5 19" /></svg>
            </span>
            <span title="Hide the bar" className="close">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </span>
          </div>
        </div>

        {tab === 'Transcript' && (
          <div className="fb-river">
            {listening ? (
              <div className="fb-lines">
                {PAST.map(([text, fs, fw, ink, bgA, bdA, spineA, op]) => (
                  <div
                    key={text}
                    className="fb-line"
                    style={{ background: `rgba(30,51,47,${bgA})`, borderColor: `rgba(39,65,57,${bdA})`, opacity: Number(op) }}
                  >
                    <span className="fb-spine" style={{ background: spineA ? `rgba(55,90,81,${spineA})` : 'rgba(58,190,184,.4)' }} />
                    <div style={{ fontSize: fs, fontWeight: fw, color: ink, lineHeight: 1.34 }}>{text}</div>
                  </div>
                ))}
                <div className="fb-now">
                  <span className="fb-spine now" />
                  <div className="fb-now-meta">
                    <span className="k">now · {CLOCK}</span>
                    <span className="sep" />
                    <span className="m">{LIVE.length} words · 3 new</span>
                  </div>
                  <div className="fb-words" style={{ fontSize: size }}>
                    {LIVE.map(([w, h], i) => (
                      <span key={i} style={{ borderBottomColor: HEAT[h] }}>{w}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="fb-empty">
                <div className="fb-empty-ic"><Mic size={20} /></div>
                <div>Press Listen and play the video. The phrases land here as they are spoken.</div>
              </div>
            )}
          </div>
        )}

        {tab === 'Session' && (
          <div className="fb-stats">
            {STATS.map((s) => (
              <div key={s.label} className="fb-stat">
                <span>{s.label}</span>
                <span className="v" style={{ color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="fb-rule" />

        <div className="fb-src">
          <div className="fb-src-row">
            <div className={`fb-meter${listening ? '' : ' idle'}`}>
              {Array.from({ length: 16 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    background: listening ? (i % 4 === 0 ? '#3ABEB8' : 'rgba(58,190,184,.55)') : 'rgba(58,190,184,.35)',
                    animationDuration: listening ? `${(0.7 + (i % 5) * 0.16).toFixed(2)}s` : '2.4s',
                    // pausado: uma onda lenta que percorre as barras da esquerda pra direita
                    animationDelay: listening ? `${(i * 0.06).toFixed(2)}s` : `${(i * 0.12).toFixed(2)}s`,
                  }}
                />
              ))}
            </div>
            <span className="fb-src-label">{listening ? 'capturing system audio' : 'listening paused'}</span>
            <div style={{ flex: 1 }} />
            <span className="fb-clock">{CLOCK}</span>
          </div>
          <button type="button" className={`fb-mic${micOn ? ' on' : ''}`} onClick={() => setMicOn(!micOn)}>
            <span className="fb-mic-dot"><Mic size={13} /></span>
            <span className="fb-mic-txt">
              <span className="t">{micOn ? 'Microphone armed' : 'Microphone muted'}</span>
              <span className="d">{MIC_DEVICE} · {micOn ? 'starts on your voice' : 'tap to arm'}</span>
            </span>
            <span className="fb-mic-lvl"><span style={{ width: micOn ? '34%' : '0%' }} /></span>
          </button>
        </div>

        <div className="fb-actions">
          <button type="button" className={`fb-btn ${listening ? 'stop' : 'listen'}`} onClick={() => setListening(!listening)}>
            {listening ? (
              <svg width="15" height="15" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="3" fill="currentColor" /></svg>
            ) : (
              <Mic size={16} />
            )}
            <span>{listening ? 'Stop' : 'Listen'}</span>
          </button>
          <button type="button" className="fb-btn analyze">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3 8 4-16 3 8h4" /></svg>
            <span>Analyze</span>
          </button>
        </div>
      </div>
    </div>
  );
}
