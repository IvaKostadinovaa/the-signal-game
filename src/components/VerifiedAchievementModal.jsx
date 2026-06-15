import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import badgeSfx from '../audio/badge.mp3';

const CONFETTI = [
  { color: '#38bdf8', x: 8,  delay: 0,    size: 9,  rot: 15  },
  { color: '#818cf8', x: 16, delay: 0.12, size: 7,  rot: -30 },
  { color: '#67e8f9', x: 24, delay: 0.05, size: 10, rot: 45  },
  { color: '#a78bfa', x: 32, delay: 0.22, size: 8,  rot: -20 },
  { color: '#38bdf8', x: 40, delay: 0.08, size: 11, rot: 60  },
  { color: '#e0f2fe', x: 48, delay: 0.32, size: 7,  rot: -45 },
  { color: '#818cf8', x: 56, delay: 0.18, size: 9,  rot: 30  },
  { color: '#38bdf8', x: 64, delay: 0.28, size: 6,  rot: -10 },
  { color: '#a78bfa', x: 72, delay: 0.42, size: 8,  rot: 50  },
  { color: '#67e8f9', x: 80, delay: 0.15, size: 10, rot: -35 },
  { color: '#818cf8', x: 88, delay: 0.38, size: 7,  rot: 20  },
  { color: '#38bdf8', x: 94, delay: 0.55, size: 9,  rot: -55 },
  { color: '#e0f2fe', x: 12, delay: 0.48, size: 6,  rot: 40  },
  { color: '#a78bfa', x: 50, delay: 0.6,  size: 8,  rot: -15 },
  { color: '#38bdf8', x: 76, delay: 0.35, size: 7,  rot: 25  },
];

function MagnifyIcon() {
  return (
    <svg width="90" height="100" viewBox="0 0 90 100" fill="none">
      <defs>
        <linearGradient id="verShieldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="verShieldBorder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <filter id="verShieldShadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(3,105,161,0.4)" />
        </filter>
      </defs>
      {/* Border shield */}
      <path
        d="M45 4 L82 18 L82 50 C82 72 64 88 45 96 C26 88 8 72 8 50 L8 18 Z"
        fill="url(#verShieldBorder)"
        filter="url(#verShieldShadow)"
      />
      {/* Inner shield */}
      <path
        d="M45 10 L76 22 L76 50 C76 69 60 83 45 90 C30 83 14 69 14 50 L14 22 Z"
        fill="url(#verShieldGrad)"
      />
      {/* Magnifying glass circle */}
      <circle cx="41" cy="46" r="13" stroke="white" strokeWidth="5.5" fill="none" opacity="0.95" />
      {/* Magnifying glass handle */}
      <line x1="51" y1="56" x2="63" y2="68" stroke="white" strokeWidth="5.5" strokeLinecap="round" opacity="0.95" />
      {/* Small checkmark inside circle */}
      <polyline points="34,46 39,52 49,40" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
    </svg>
  );
}

export default function VerifiedAchievementModal({ onClose }) {
  useEffect(() => {
    new Audio(badgeSfx).play().catch(() => {});
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div className="verified-overlay">
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

      <div className="verified-modal">
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

        <div className="verified-modal__icon">
          <MagnifyIcon />
        </div>

        <div className="verified-modal__label">YOU EARNED</div>
        <div className="verified-modal__title">VERIFIED</div>
        <div className="verified-modal__body">
          The Signal chose facts over speed.<br />Twice. That's what journalism is.
        </div>

      </div>
    </div>,
    document.body
  );
}
