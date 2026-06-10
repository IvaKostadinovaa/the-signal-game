import { createPortal } from 'react-dom';

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
  trust:         { label: 'TRUST',      color: '#22c55e', bg: 'rgba(34,197,94,0.09)'    },
  speed:         { label: 'SPEED',      color: '#f59e0b', bg: 'rgba(245,158,11,0.09)'   },
  legalRisk:     { label: 'LEGAL RISK', color: '#ef4444', bg: 'rgba(239,68,68,0.09)'    },
  audienceReach: { label: 'AUDIENCE',   color: '#3b82f6', bg: 'rgba(59,130,246,0.09)'   },
};

function MetricIcon({ type, color }) {
  if (type === 'trust') return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
  if (type === 'speed') return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
  if (type === 'legalRisk') return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12M12 12L8 8M12 12L16 8" />
      <path d="M3 6l4 4 4-4M13 6l4 4 4-4" />
      <line x1="3" y1="20" x2="21" y2="20" />
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

export default function ConsequenceScreen({ outcome, onNext, meters, deltas }) {
  const correct = outcome?.correct ?? false;
  const xpGain = correct ? 80 : 20;
  const accentColor  = correct ? '#16a34a' : '#dc2626';
  const accentBadgeBg = correct ? '#dcfce7' : '#fee2e2';
  const verdictCardBg = correct ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.05)';
  const verdictBorder = correct ? 'rgba(34,197,94,0.18)' : 'rgba(239,68,68,0.15)';

  const topKeys = Object.entries(deltas || {})
    .filter(([, v]) => typeof v === 'number' && v !== 0)
    .sort(([, a], [, b]) => Math.abs(b) - Math.abs(a))
    .slice(0, 2)
    .map(([k]) => k);

  return createPortal(
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(10,20,30,0.78)',
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
        background: correct ? '#f0fdf9' : '#fff5f5',
        borderRadius: 16,
        width: '100%',
        maxWidth: 420,
        border: correct ? '1px solid #bbf7d0' : '1px solid #fecaca',
        boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
        overflow: 'hidden',
        position: 'relative',
      }}>

        {/* Header strip — matches story screen "STORY PACKAGE" style */}
        <div style={{
          background: correct ? '#dcfce7' : '#fee2e2',
          borderBottom: correct ? '1px solid #bbf7d0' : '1px solid #fecaca',
          padding: '11px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            color: '#3b82f6',
            letterSpacing: '0.12em',
          }}>
            EDITORIAL VERDICT
          </span>
          <span style={{
            fontSize: 10,
            fontWeight: 800,
            padding: '3px 9px',
            borderRadius: 4,
            background: accentBadgeBg,
            color: accentColor,
            letterSpacing: '0.06em',
          }}>
            {correct ? '✓ CORRECT' : '✗ WRONG'}
          </span>
        </div>

        <div style={{ padding: '20px 22px 24px' }}>

          {/* Verdict block — icon chip + headline, like story-top card */}
          <div style={{
            background: verdictCardBg,
            border: `1px solid ${verdictBorder}`,
            borderRadius: 12,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 14,
            marginBottom: 14,
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: accentBadgeBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {correct ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.8" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 20,
                fontWeight: 900,
                color: accentColor,
                letterSpacing: '-0.01em',
                lineHeight: 1.15,
                marginBottom: 5,
              }}>
                {correct ? 'CORRECT DECISION' : 'WRONG DECISION'}
              </div>
              <p style={{
                fontSize: 13,
                color: '#475569',
                margin: 0,
                lineHeight: 1.5,
              }}>
                {outcome?.subtitle || outcome?.title || ''}
              </p>
            </div>
          </div>

          {/* True reveal — matches VERA recommendation block */}
          {outcome?.trueReveal && (
            <div style={{
              background: '#f0f9ff',
              borderLeft: '3px solid #3b82f6',
              borderRadius: '0 8px 8px 0',
              padding: '10px 14px',
              marginBottom: 14,
            }}>
              <div style={{
                fontSize: 9,
                fontWeight: 800,
                color: '#3b82f6',
                letterSpacing: '0.12em',
                marginBottom: 5,
              }}>
                TRUE REVEAL
              </div>
              <p style={{ fontSize: 12, color: '#1e3a5f', lineHeight: 1.55, margin: 0 }}>
                {outcome.trueReveal}
              </p>
            </div>
          )}

          {/* Metric cards */}
          {topKeys.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
              marginBottom: 12,
            }}>
              {topKeys.map((key) => {
                const cfg = METRIC_CONFIG[key] || METRIC_CONFIG.trust;
                const delta = (deltas || {})[key] || 0;
                const isPos = delta > 0;
                const deltaColor = isPos ? '#16a34a' : '#dc2626';
                return (
                  <div key={key} style={{
                    background: cfg.bg,
                    border: `1.5px solid ${cfg.color}30`,
                    borderRadius: 12,
                    padding: '12px 14px',
                  }}>
                    <div style={{
                      fontSize: 9,
                      fontWeight: 800,
                      color: cfg.color,
                      letterSpacing: '0.12em',
                      marginBottom: 6,
                    }}>
                      {cfg.label}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                      <span style={{
                        fontSize: 28,
                        fontWeight: 900,
                        color: deltaColor,
                        lineHeight: 1,
                      }}>
                        {isPos ? `+${delta}` : delta}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: deltaColor, opacity: 0.7 }}>%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* XP row */}
          <div style={{
            background: 'rgba(255,255,255,0.6)',
            border: correct ? '1px solid #bbf7d0' : '1px solid #fecaca',
            borderRadius: 10,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: outcome?.feedback ? 12 : 18,
          }}>
            <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, letterSpacing: '0.04em' }}>SESSION XP</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 16 }}>⭐</span>
              <span style={{ fontSize: 16, fontWeight: 900, color: '#d97706' }}>+{xpGain} XP</span>
            </div>
          </div>

          {/* Feedback quote */}
          {outcome?.feedback && (
            <p style={{
              fontStyle: 'italic',
              fontSize: 12,
              color: '#94a3b8',
              textAlign: 'center',
              margin: '0 0 18px',
              lineHeight: 1.5,
              padding: '0 4px',
            }}>
              "{outcome.feedback}"
            </p>
          )}

          {/* Continue — matches decision button style */}
          <button
            type="button"
            onClick={onNext}
            style={{
              width: '100%',
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderBottom: '3px solid rgba(0,0,0,0.2)',
              borderRadius: 10,
              padding: '12px',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'opacity .15s, transform .1s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.opacity = '.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
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
