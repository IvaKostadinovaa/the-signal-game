import { useEffect } from 'react';

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
    <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
      <defs>
        <linearGradient id="boltBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="boltGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <filter id="boltShadow" x="-30%" y="-15%" width="160%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(217,119,6,0.5)" />
        </filter>
      </defs>
      {/* Outer glow circle */}
      <circle cx="40" cy="45" r="38" fill="url(#boltBg)" filter="url(#boltShadow)" />
      <circle cx="40" cy="45" r="38" fill="none" stroke="#fef08a" strokeWidth="2.5" opacity="0.6" />
      {/* Lightning bolt */}
      <polygon
        points="46,12 26,48 38,48 34,78 54,42 42,42"
        fill="white"
        opacity="0.95"
      />
    </svg>
  );
}

export default function SpeedAchievementModal({ onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="speed-overlay" onClick={onClose}>
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

      <div className="speed-modal" onClick={(e) => e.stopPropagation()}>
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

        <button className="speed-modal__close" onClick={onClose}>
          Keep Going
        </button>
      </div>
    </div>
  );
}
