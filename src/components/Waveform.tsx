'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useI18n } from '@/lib/i18n-context';

const N = 84;

// Suaviza só as pontas (fica curto nas bordas, cheio no meio) — full-width.
function edge(i: number) {
  const x = i / (N - 1);
  return Math.pow(Math.sin(Math.PI * x), 0.55);
}

// Amplitude da "onda viajando": várias senoides com fases que andam no tempo.
function amp(i: number, t: number) {
  const x = i / (N - 1);
  const w =
    Math.sin(x * 8 - t * 2.4) * 0.5 +
    Math.sin(x * 17 + t * 1.7) * 0.3 +
    Math.sin(x * 4 - t * 3.2) * 0.4;
  return (w + 1.2) / 2.4; // ~0..1
}

export default function Waveform() {
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const timerRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const { t } = useI18n();

  const initialHeights = useMemo(
    () =>
      Array.from({ length: N }, (_, i) =>
        (6 + edge(i) * 70 * (0.3 + 0.7 * amp(i, 0))).toFixed(0) + 'px'
      ),
    []
  );

  useEffect(() => {
    let tt = 0;
    function frame() {
      tt += 0.022;
      for (let i = 0; i < N; i++) {
        const b = barsRef.current[i];
        if (!b) continue;
        const a = amp(i, tt);
        b.style.height = (6 + edge(i) * 70 * (0.3 + 0.7 * a)).toFixed(1) + 'px';
        b.style.opacity = (0.4 + 0.6 * a).toFixed(2);
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
