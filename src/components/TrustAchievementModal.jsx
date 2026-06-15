
const CONFETTI = [
  { color: '#fbbf24', x: 10, delay: 0,    size: 8,  rot: 15 },
  { color: '#34d399', x: 20, delay: 0.1,  size: 6,  rot: -30 },
  { color: '#60a5fa', x: 30, delay: 0.2,  size: 10, rot: 45 },
  { color: '#f87171', x: 40, delay: 0.05, size: 7,  rot: -20 },
  { color: '#fbbf24', x: 55, delay: 0.15, size: 9,  rot: 60 },
  { color: '#a78bfa', x: 65, delay: 0.3,  size: 6,  rot: -45 },
  { color: '#34d399', x: 75, delay: 0.08, size: 8,  rot: 30 },
  { color: '#f87171', x: 85, delay: 0.25, size: 7,  rot: -10 },
  { color: '#60a5fa', x: 92, delay: 0.18, size: 9,  rot: 50 },
  { color: '#fbbf24', x: 5,  delay: 0.35, size: 6,  rot: -35 },
  { color: '#a78bfa', x: 48, delay: 0.4,  size: 10, rot: 20 },
  { color: '#34d399', x: 58, delay: 0.12, size: 7,  rot: -55 },
  { color: '#f87171', x: 15, delay: 0.28, size: 8,  rot: 40 },
  { color: '#fbbf24', x: 70, delay: 0.22, size: 6,  rot: -15 },
  { color: '#60a5fa', x: 82, delay: 0.38, size: 9,  rot: 25 },
];

function ShieldIcon() {
  return (
    <svg width="90" height="100" viewBox="0 0 90 100" fill="none">
      <defs>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="shieldBorder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <filter id="shieldShadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.3)" />
        </filter>
      </defs>
      {/* Border shield */}
      <path
        d="M45 4 L82 18 L82 50 C82 72 64 88 45 96 C26 88 8 72 8 50 L8 18 Z"
        fill="url(#shieldBorder)"
        filter="url(#shieldShadow)"
      />
      {/* Inner shield */}
      <path
        d="M45 10 L76 22 L76 50 C76 69 60 83 45 90 C30 83 14 69 14 50 L14 22 Z"
        fill="url(#shieldGrad)"
      />
      {/* Checkmark */}
      <polyline
        points="30,50 40,62 62,38"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import badgeSfx from '../audio/badge.mp3';

export default function TrustAchievementModal({ onClose }) {
  useEffect(() => {
    new Audio(badgeSfx).play().catch(() => {});
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div className="trust-overlay">
      {/* Confetti */}
      {CONFETTI.map((c, i) => (
        <div
          key={i}
          className="trust-confetti"
          style={{
            left: `${c.x}%`,
            width: c.size,
            height: c.size * 0.55,
            background: c.color,
            animationDelay: `${c.delay}s`,
            transform: `rotate(${c.rot}deg)`,
          }}
        />
      ))}

      <div className="trust-modal">
        {/* Inner confetti (closer, smaller) */}
        {CONFETTI.slice(0, 8).map((c, i) => (
          <div
            key={i}
            className="trust-confetti-inner"
            style={{
              left: `${c.x}%`,
              width: c.size - 2,
              height: (c.size - 2) * 0.55,
              background: c.color,
              animationDelay: `${c.delay + 0.1}s`,
              transform: `rotate(${c.rot + 10}deg)`,
            }}
          />
        ))}

        <div className="trust-modal__shield">
          <ShieldIcon />
        </div>

        <div className="trust-modal__earned">YOU EARNED</div>
        <div className="trust-modal__title">THE PUBLIC'S TRUST</div>
        <div className="trust-modal__body">
          The Signal is now the most trusted<br />news source in the region.
        </div>

      </div>
    </div>,
    document.body
  );
}
