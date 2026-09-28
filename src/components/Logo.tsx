import { useId } from 'react';

// Marca do Soaken: a gota com o S serifado mergulhando nas próprias ondas.
// As animações (lg-*) ficam no globals.css.
export default function Logo({ size = 34, animate = true }: { size?: number; animate?: boolean }) {
  const clipId = `lg-drop-${useId().replace(/:/g, '')}`;
  const dur = animate ? '3.6s' : '0s';
  const radius = Math.round(size * 0.3);
  const mark = Math.round(size * 0.66);
  const drop = 'M12 2.1c0 0 7.5 8 7.5 12.6A7.5 7.5 0 0 1 12 22.2a7.5 7.5 0 0 1-7.5-7.5C4.5 10.1 12 2.1 12 2.1z';

  return (
    <span
      className="logo-mark"
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        boxShadow: `0 ${Math.round(size * 0.16)}px ${Math.round(size * 0.4)}px rgba(0,0,0,.5), 0 0 ${Math.round(size * 0.3)}px rgba(58,190,184,.22)`,
      }}
    >
      <span className="logo-edge" style={{ borderRadius: radius }} />
      <span className="logo-halo" style={{ animationDuration: dur }} />
      <svg viewBox="0 0 24 24" width={mark} height={mark} fill="none" style={{ position: 'relative', display: 'block', overflow: 'visible' }}>
        <defs>
          <clipPath id={clipId}>
            <path d={drop} />
          </clipPath>
        </defs>
        <g>
          <path className="logo-ripple" d="M9.1 20.6c1.9.5 3.9.5 5.8 0" stroke="rgba(58,190,184,.9)" strokeWidth="0.85" strokeLinecap="round" style={{ transformOrigin: '12px 20.6px', animationDuration: dur }} />
          <path className="logo-ripple" d="M6.6 19.6c3.5 1.2 7.3 1.2 10.8 0" stroke="rgba(58,190,184,.55)" strokeWidth="0.75" strokeLinecap="round" style={{ transformOrigin: '12px 19.6px', animationDuration: dur, animationDelay: '.14s' }} />
          <path className="logo-ripple" d="M4.2 18.4c5 1.8 10.6 1.8 15.6 0" stroke="rgba(58,190,184,.3)" strokeWidth="0.7" strokeLinecap="round" style={{ transformOrigin: '12px 18.4px', animationDuration: dur, animationDelay: '.28s' }} />
        </g>
        <g className="logo-dive" style={{ animationDuration: dur }}>
          <path d={drop} fill="#F4FAF8" />
          <g clipPath={`url(#${clipId})`}>
            <rect className="logo-sheen" x="3" y="2" width="18" height="22" fill="rgba(58,190,184,.22)" style={{ animationDuration: dur }} />
          </g>
          <text x="12" y="18.3" textAnchor="middle" className="logo-s">S</text>
        </g>
      </svg>
    </span>
  );
}
