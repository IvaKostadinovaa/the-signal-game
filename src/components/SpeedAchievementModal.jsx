const CONFETTI = [
  { color: '#fbbf24', x: 8,  delay: 0,    size: 9,  rot: 15  },
  { color: '#f97316', x: 16, delay: 0.12, size: 7,  rot: -30 },
  { color: '#fde68a', x: 24, delay: 0.05, size: 10, rot: 45  },
  { color: '#fb923c', x: 32, delay: 0.22, size: 8,  rot: -20 },
  { color: '#fbbf24', x: 40, delay: 0.08, size: 11, rot: 60  },
  { color: '#fed7aa', x: 48, delay: 0.32, size: 7,  rot: -45 },
  { color: '#f97316', x: 56, delay: 0.18, size: 9,  rot: 30  },
  { color: '#fbbf24', x: 64, delay: 0.28, size: 6,  rot: -10 },
  { color: '#fb923c', x: 72, delay: 0.42, size: 8,  rot: 50  },
  { color: '#fde68a', x: 80, delay: 0.15, size: 10, rot: -35 },
  { color: '#f97316', x: 88, delay: 0.38, size: 7,  rot: 20  },
  { color: '#fbbf24', x: 94, delay: 0.55, size: 9,  rot: -55 },
  { color: '#fed7aa', x: 12, delay: 0.48, size: 6,  rot: 40  },
  { color: '#fb923c', x: 50, delay: 0.6,  size: 8,  rot: -15 },
  { color: '#fbbf24', x: 76, delay: 0.35, size: 7,  rot: 25  },
];

function LightningIcon() {
  return (
    <svg width="90" height="100" viewBox="0 0 90 100" fill="none">
      <defs>
        <linearGradient id="boltShieldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="boltShieldBorder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <filter id="boltShieldShadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(217,119,6,0.4)" />
        </filter>
      </defs>
      {/* Border shield */}
      <path
        d="M45 4 L82 18 L82 50 C82 72 64 88 45 96 C26 88 8 72 8 50 L8 18 Z"
        fill="url(#boltShieldBorder)"
        filter="url(#boltShieldShadow)"
      />
      {/* Inner shield */}
      <path
        d="M45 10 L76 22 L76 50 C76 69 60 83 45 90 C30 83 14 69 14 50 L14 22 Z"
        fill="url(#boltShieldGrad)"
      />
      {/* Lightning bolt */}
      <polygon
        points="50,28 34,54 44,54 40,72 56,46 46,46"
        fill="white"
        opacity="0.95"
      />
    </svg>
  );
}

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import badgeSfx from '../audio/badge.mp3';

export default function SpeedAchievementModal({ onClose, isMuted }) {
  useEffect(() => {
    const audio = new Audio(badgeSfx);
    audio.muted = !!isMuted;
    audio.play().catch(() => {});
    const t = setTimeout(onClose, 2000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div className="speed-overlay">
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
            animationDuration: `${2.4 + (i % 5) * 0.3}s`,
          }}
        />
      ))}

      <div className="speed-modal">
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

        <div className="speed-modal__icon">
          <LightningIcon />
        </div>

        <div className="speed-modal__label">YOU BROKE THE NEWS</div>
        <div className="speed-modal__title">BREAKING FIRST</div>
        <div className="speed-modal__body">
          The Signal beat everyone to the story.<br />You set the pace for the entire region.
        </div>

      </div>
    </div>,
    document.body
  );
}
