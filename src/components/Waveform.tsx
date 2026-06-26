'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useI18n } from '@/lib/i18n-context';

const N = 84;

function env(i: number) {
  const x = (i / (N - 1)) * 2 - 1;
  return Math.exp(-(x * x) * 2.0);
}

export default function Waveform() {
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const timerRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const { t } = useI18n();

  const initialHeights = useMemo(
    () =>
      Array.from({ length: N }, (_, i) =>
        (8 + env(i) * 56 * (0.55 + 0.45 * Math.abs(Math.sin(i * 1.3)))).toFixed(0) + 'px'
      ),
    []
  );

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let tt = 0;
    function frame() {
      tt += 0.045;
      for (let i = 0; i < N; i++) {
        const b = barsRef.current[i];
        if (!b) continue;
        const e = env(i);
        const wob = 0.5 + 0.5 * Math.sin(i * 0.55 + tt * 2.1);
        const noise = 0.55 + 0.45 * Math.sin(i * 1.7 - tt * 3.4);
        const h = 6 + e * 66 * (0.4 + 0.6 * wob * noise);
        b.style.height = h.toFixed(1) + 'px';
      }
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const timer = timerRef.current;
    if (!timer) return;
    const start = Date.now();
    function tick() {
      if (!timer) return;
      const s = Math.floor((Date.now() - start) / 1000);
      const m = Math.floor(s / 60);
      timer.textContent = String(m).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="wavebar">
      <div className="wave-top">
        <div className="wave-time"><span ref={timerRef}>00:00</span></div>
        <span className="wave-state">
          <span className="dot"></span>
          <span>{t('cap.listening')}</span>
        </span>
      </div>
      <div className="wave-bars">
        {Array.from({ length: N }, (_, i) => (
          <span
            key={i}
            ref={(el) => { barsRef.current[i] = el; }}
            style={{ height: initialHeights[i] }}
          />
        ))}
      </div>
    </div>
  );
}
