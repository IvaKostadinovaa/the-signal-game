import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import correctSfx from '../audio/correct.mp3';
import incorrectSfx from '../audio/incorrect.mp3';

const CONFETTI_SCREEN = [
  { color: '#4ade80', x: 5,  delay: 0,    size: 10, rot: 15  },
  { color: '#fbbf24', x: 12, delay: 0.15, size: 7,  rot: -30 },
  { color: '#60a5fa', x: 19, delay: 0.05, size: 9,  rot: 45  },
  { color: '#f87171', x: 26, delay: 0.25, size: 8,  rot: -20 },
  { color: '#a78bfa', x: 33, delay: 0.1,  size: 11, rot: 60  },
  { color: '#34d399', x: 40, delay: 0.35, size: 7,  rot: -45 },
  { color: '#fb923c', x: 47, delay: 0.08, size: 9,  rot: 30  },
  { color: '#38bdf8', x: 54, delay: 0.2,  size: 6,  rot: -10 },
  { color: '#e879f9', x: 61, delay: 0.3,  size: 8,  rot: 50  },
  { color: '#facc15', x: 68, delay: 0.12, size: 10, rot: -35 },
  { color: '#4ade80', x: 75, delay: 0.4,  size: 7,  rot: 20  },
  { color: '#f87171', x: 82, delay: 0.18, size: 9,  rot: -55 },
  { color: '#60a5fa', x: 89, delay: 0.28, size: 6,  rot: 40  },
  { color: '#fbbf24', x: 95, delay: 0.22, size: 8,  rot: -15 },
  { color: '#a78bfa', x: 8,  delay: 0.45, size: 7,  rot: 25  },
  { color: '#34d399', x: 22, delay: 0.38, size: 9,  rot: -40 },
  { color: '#fb923c', x: 35, delay: 0.55, size: 6,  rot: 55  },
  { color: '#38bdf8', x: 50, delay: 0.5,  size: 10, rot: -25 },
  { color: '#e879f9', x: 63, delay: 0.42, size: 7,  rot: 35  },
  { color: '#facc15', x: 78, delay: 0.32, size: 8,  rot: -50 },
  { color: '#4ade80', x: 91, delay: 0.6,  size: 6,  rot: 10  },
  { color: '#fbbf24', x: 15, delay: 0.65, size: 9,  rot: -20 },
  { color: '#f87171', x: 44, delay: 0.7,  size: 7,  rot: 45  },
  { color: '#60a5fa', x: 57, delay: 0.58, size: 8,  rot: -30 },
  { color: '#a78bfa', x: 86, delay: 0.75, size: 10, rot: 15  },
];

const METRIC_CONFIG = {
  trust:         { label: 'TRUST',      color: '#16a34a', border: '#bbf7d0', bg: '#f0fdf4' },
  speed:         { label: 'SPEED',      color: '#d97706', border: '#fde68a', bg: '#fffbeb' },
  legalRisk:     { label: 'LEGAL RISK', color: '#dc2626', border: '#fecaca', bg: '#fff5f5' },
  audienceReach: { label: 'AUDIENCE',   color: '#2563eb', border: '#bfdbfe', bg: '#eff6ff' },
};

export default function ConsequenceScreen({ outcome, onNext, meters, deltas, isMuted }) {
  const correct = outcome?.correct ?? false;

  useEffect(() => {
    if (correct) {
      const audio = new Audio(correctSfx);
      audio.muted = !!isMuted;
      audio.play().catch(() => {});
    } else {
      const audio = new Audio(incorrectSfx);
      audio.volume = 0.07;
      audio.muted = !!isMuted;
      audio.play().catch(() => {});
      const t = setTimeout(() => { audio.pause(); }, 2000);
      return () => clearTimeout(t);
    }
  }, [correct]);
  const accentColor = correct ? '#16a34a' : '#dc2626';

  const topKeys = ['trust', 'speed', 'legalRisk'].filter(
    (k) => typeof (deltas || {})[k] === 'number' && (deltas || {})[k] !== 0
  );

  return createPortal(
    <div style={{
      position: 'fixed',
      inset: 0,
      background: correct ? 'rgba(22,163,74,0.28)' : 'rgba(220,38,38,0.28)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 500,
      padding: '24px 16px',
      overflow: 'hidden',
    }}>

      {correct && CONFETTI_SCREEN.map((c, i) => (
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

      <div style={{
        background: '#fff',
        borderRadius: 16,
        width: '100%',
        maxWidth: 420,
        border: '1px solid #e2e8f0',
        boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>

        <div style={{ padding: '24px 24px 26px' }}>

          {/* DECISION RESULT label */}
          <div style={{
            textAlign: 'center',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.18em',
            color: '#94a3b8',
            marginBottom: 18,
            textTransform: 'uppercase',
          }}>
            DECISION RESULT
          </div>

          {/* Icon + verdict title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 8,
          }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: correct
                ? '0 4px 16px rgba(22,163,74,0.35)'
                : '0 4px 16px rgba(220,38,38,0.35)',
            }}>
              {correct ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              )}
            </div>
            <div style={{
              fontSize: 22,
              fontWeight: 900,
              color: accentColor,
              letterSpacing: '0.01em',
              lineHeight: 1.1,
            }}>
              {correct ? 'CORRECT DECISION' : 'WRONG DECISION'}
            </div>
          </div>

          {/* Subtitle */}
          <p style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#334155',
            margin: '0 0 20px',
            lineHeight: 1.5,
            paddingLeft: 68,
          }}>
            {outcome?.subtitle || outcome?.title || ''}
          </p>

          {/* Divider */}
          <div style={{ height: 1, background: '#f1f5f9', marginBottom: 16 }} />

          {/* True reveal */}
          {outcome?.trueReveal && (
            <div style={{
              background: correct ? '#f0fdf4' : '#fff5f5',
              border: correct ? '1.5px solid #16a34a' : '1.5px solid #dc2626',
              borderRadius: 8,
              padding: '10px 14px',
              marginBottom: 16,
            }}>
              <div style={{
                fontSize: 9,
                fontWeight: 800,
                color: correct ? '#16a34a' : '#dc2626',
                letterSpacing: '0.14em',
                marginBottom: 5,
                textTransform: 'uppercase',
              }}>
                True Reveal
              </div>
              <p style={{ fontSize: 12, color: correct ? '#14532d' : '#7f1d1d', lineHeight: 1.55, margin: 0 }}>
                {outcome.trueReveal}
              </p>
            </div>
          )}

          {/* Metric cards */}
          {topKeys.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${topKeys.length}, 1fr)`,
              gap: 8,
              marginBottom: 14,
            }}>
              {topKeys.map((key) => {
                const cfg = METRIC_CONFIG[key] || METRIC_CONFIG.trust;
                const delta = (deltas || {})[key] || 0;
                const isPos = delta > 0;
                const deltaColor = isPos ? '#16a34a' : '#dc2626';
                return (
                  <div key={key} style={{
                    background: cfg.bg,
                    border: `1.5px solid ${cfg.border}`,
                    borderRadius: 10,
                    padding: '12px 14px',
                    position: 'relative',
                    overflow: 'visible',
                  }}>
                    <div style={{
                      fontSize: 9,
                      fontWeight: 800,
                      color: cfg.color,
                      letterSpacing: '0.12em',
                      marginBottom: 6,
                      textTransform: 'uppercase',
                    }}>
                      {cfg.label}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                      <span style={{
                        fontSize: 28,
                        fontWeight: 900,
                        color: deltaColor,
                        lineHeight: 1,
                      }}>
                        {isPos ? `+${delta}` : delta}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: deltaColor, opacity: 0.65 }}>%</span>
                    </div>
                    <span style={{
                      position: 'absolute',
                      left: '50%',
                      top: '30%',
                      fontSize: 26,
                      fontWeight: 900,
                      color: deltaColor,
                      pointerEvents: 'none',
                      animation: 'consequenceFloatUp 1.8s ease-out forwards',
                      animationDelay: '0.2s',
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                      textShadow: `0 2px 12px ${deltaColor}88`,
                    }}>
                      {isPos ? `+${delta}` : delta}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Feedback quote */}
          {outcome?.feedback && (
            <p style={{
              fontStyle: 'italic',
              fontSize: 12,
              color: '#94a3b8',
              textAlign: 'center',
              margin: '0 0 20px',
              lineHeight: 1.6,
              padding: '0 8px',
            }}>
              "{outcome.feedback}"
            </p>
          )}

          {/* Continue button */}
          <button
            type="button"
            onClick={onNext}
            style={{
              width: '100%',
              background: '#0a1e28',
              color: '#fff',
              border: 'none',
              borderBottom: '3px solid rgba(0,0,0,0.2)',
              borderRadius: 10,
              padding: '13px',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'opacity .15s, transform .1s',
              fontFamily: 'inherit',
            }}
            onMouseOver={(e) => { e.currentTarget.style.opacity = '.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = ''; }}
          >
            CONTINUE
          </button>

        </div>
      </div>
    </div>,
    document.body
  );
}
