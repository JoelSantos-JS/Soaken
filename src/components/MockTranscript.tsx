'use client';

import { useEffect, useRef } from 'react';
import { useI18n } from '@/lib/i18n-context';

export default function MockTranscript() {
  const curRef = useRef<HTMLSpanElement>(null);
  const prevRef = useRef<HTMLSpanElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    const cur = curRef.current;
    const prev = prevRef.current;
    if (!cur || !prev) return;

    const phrases = [
      "I didn't see that coming.",
      "Are you sure about this?",
      "We can still fix this.",
      "That's not what I meant.",
      "Let's start over.",
    ];
    let pi = 0;
    let active = true;

    function type(text: string, done: () => void) {
      if (!cur) { done(); return; }
      let i = 0;
      cur.textContent = '';
      const id = setInterval(() => {
        if (!cur) { clearInterval(id); return; }
        i++;
        cur.textContent = text.slice(0, i);
        if (i >= text.length) {
          clearInterval(id);
          setTimeout(done, 1500);
        }
      }, 52);
      return () => clearInterval(id);
    }

    let currentCleanup: (() => void) | undefined;

    function loop() {
      if (!active || !prev) return;
      const text = phrases[pi];
      currentCleanup = type(text, () => {
        if (!prev) return;
        prev.textContent = text;
        pi = (pi + 1) % phrases.length;
        loop();
      });
    }

    loop();

    return () => {
      active = false;
      if (currentCleanup) currentCleanup();
    };
  }, []);

  return (
    <div className="fbmock">
      <div className="fb-h">
        <span className="tab on">{t('fb.tab1')}</span>
        <span className="tab">{t('fb.tab2')}</span>
        <span className="live"><span className="dot"></span><span>{t('fb.live')}</span></span>
      </div>
      <div className="fb-body">
        <div className="ln">
          <div className="mt">
            <img
              className="flagimg sm"
              src="https://flagcdn.com/w40/gb.png"
              width="18"
              height="13"
              alt=""
            />
            <span>{t('fb.l1meta')}</span>
          </div>
          <span ref={prevRef}>Are you sure about this?</span>
        </div>
        <div className="ln cur">
          <div className="mt">
            <img
              className="flagimg sm"
              src="https://flagcdn.com/w40/gb.png"
              width="18"
              height="13"
              alt=""
            />
            <span>{t('fb.l2meta')}</span>
          </div>
          <span ref={curRef}>I didn&apos;t see that coming.</span>
          <span className="cap-caret"></span>
        </div>
      </div>
      <div className="fb-capture">
        <span className="cap-eq">
          {Array.from({ length: 17 }).map((_, i) => (
            <i key={i} style={{
              animationDelay: `${-((i * 0.37) % 0.7)}s`,
              animationDuration: `${0.7 + (i % 5) * 0.07}s`
            }} />
          ))}
        </span>
        <span className="cap-txt">{t('fb.capturing')}</span>
      </div>
      <div className="fb-foot">
        <span className="fbtn rec">{t('fb.rec')}</span>
        <span className="fbtn amber">{t('fb.train')}</span>
        <span className="fbtn">{t('fb.analyze')}</span>
      </div>
    </div>
  );
}
