import buildingImg from '../images/the-signal.png';
import bgIm from '../images/background.jpg';

const SCORE_METRICS = [
  { key: 'trust',     label: 'TRUST',      color: '#22c55e', bg: 'rgba(34,197,94,0.07)'  },
  { key: 'speed',     label: 'SPEED',      color: '#f59e0b', bg: 'rgba(245,158,11,0.07)' },
  { key: 'legalRisk', label: 'LEGAL RISK', color: '#ef4444', bg: 'rgba(239,68,68,0.07)'  },
];

const CONFETTI = [
  { c: '#4ade80', t: 18, l: 4,  s: 8,  round: true            },
  { c: '#60a5fa', t: 10, l: 12, s: 6,  round: false, r: 45   },
  { c: '#fbbf24', t: 22, l: 22, s: 9,  round: true            },
  { c: '#f87171', t: 8,  l: 35, s: 7,  round: false, r: 30   },
  { c: '#a78bfa', t: 20, l: 50, s: 6,  round: true            },
  { c: '#34d399', t: 12, l: 62, s: 8,  round: false, r: 60   },
  { c: '#fb923c', t: 18, l: 74, s: 7,  round: true            },
  { c: '#38bdf8', t: 9,  l: 83, s: 8,  round: false, r: 20   },
  { c: '#e879f9', t: 22, l: 91, s: 6,  round: true            },
  { c: '#facc15', t: 6,  l: 96, s: 9,  round: false, r: 45   },
];

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function computeTitle(meters) {
  if (meters.trust >= 50) return 'THE TRUSTED SIGNAL';
  if (meters.trust >= 30) return 'THE SIGNAL SURVIVES';
  return 'THE SIGNAL STRUGGLES';
}

function computeAchievements(meters) {
  const badges = [];
  if (meters.trust >= 25)     badges.push({ name: 'Verified',            color: '#f59e0b', Icon: StarIcon   });
  if (meters.legalRisk <= 35) badges.push({ name: 'NVC Master',          color: '#22c55e', Icon: ShieldIcon });
                               badges.push({ name: 'Deep Fake Detective', color: '#15803d', Icon: ShieldIcon });
  if (meters.trust >= 45)     badges.push({ name: 'Whistleblower',       color: '#f59e0b', Icon: ShieldIcon });
  return badges.slice(0, 4);
}

function computeInsight(meters) {
  if (meters.trust >= 50) return 'You chose accuracy over clicks.\nYour audience trusts you, and that\'s what matters.';
  if (meters.trust >= 30) return 'You balanced speed and accuracy.\nKeep building trust one story at a time.';
  return 'Speed cost you credibility.\nNext time, verify before you publish.';
}

export default function EndingScreen({ meters, xp, onRestart }) {
  const title        = computeTitle(meters);
  const achievements = computeAchievements(meters);
  const insight      = computeInsight(meters);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `linear-gradient(rgba(255,255,255,0.72), rgba(255,255,255,0.72)), url(${bgIm})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: 20,
        width: '100%',
        maxWidth: 780,
        boxShadow: '0 8px 48px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
      }}>

        {/* Title row with confetti */}
        <div style={{
          position: 'relative',
          padding: '20px 28px 18px',
          borderBottom: '1px solid #f1f5f9',
          overflow: 'hidden',
        }}>
          {CONFETTI.map((dot, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${dot.t}%`,
              left: `${dot.l}%`,
              width: dot.s,
              height: dot.s,
              background: dot.c,
              borderRadius: dot.round ? '50%' : 3,
              transform: dot.r ? `rotate(${dot.r}deg)` : undefined,
              opacity: 0.8,
              pointerEvents: 'none',
            }} />
          ))}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            position: 'relative',
            zIndex: 1,
          }}>
            <span style={{ color: '#2563eb', fontSize: 16, fontWeight: 900 }}>⚡</span>
            <span style={{
              fontSize: 17,
              fontWeight: 900,
              color: '#1e293b',
              letterSpacing: '0.04em',
            }}>
              ENDING: {title}
            </span>
            <span style={{ marginLeft: 'auto', fontSize: 30 }}>🏆</span>
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', gap: 24, padding: '24px 28px' }}>

          {/* Left: building image */}
          <div style={{
            width: 230,
            flexShrink: 0,
            borderRadius: 14,
            overflow: 'hidden',
            background: '#f8fafc',
            alignSelf: 'stretch',
          }}>
            <img
              src={buildingImg}
              alt="The Signal"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Right panel */}
          <div style={{ flex: 1, minWidth: 0 }}>

            <div style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.12em',
              color: '#94a3b8',
              marginBottom: 12,
            }}>
              YOUR FINAL SCORE
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 10,
              marginBottom: 22,
            }}>
              {SCORE_METRICS.map(({ key, label, color, bg }) => (
                <div key={key} style={{
                  background: bg,
                  border: `1px solid ${color}30`,
                  borderRadius: 12,
                  padding: '12px 14px',
                }}>
                  <div style={{
                    fontSize: 9,
                    fontWeight: 800,
                    color,
                    letterSpacing: '0.12em',
                    marginBottom: 6,
                  }}>
                    {label}
                  </div>
                  <div>
                    <span style={{ fontSize: 30, fontWeight: 900, color, lineHeight: 1 }}>
                      {meters[key] ?? 0}
                    </span>
                    <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}> /100</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.12em',
              color: '#94a3b8',
              marginBottom: 14,
            }}>
              ACHIEVEMENTS EARNED
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                {achievements.map((badge, i) => (
                  <div key={i} style={{ textAlign: 'center', width: 58 }}>
                    <div style={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      background: badge.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 6px',
                      boxShadow: `0 4px 14px ${badge.color}55`,
                    }}>
                      <badge.Icon />
                    </div>
                    <div style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: '#475569',
                      lineHeight: 1.3,
                    }}>
                      {badge.name}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                flex: 1,
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: '12px 14px',
                minWidth: 0,
              }}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#1e293b',
                  letterSpacing: '0.06em',
                  marginBottom: 6,
                }}>
                  KEY INSIGHT
                </div>
                <div style={{
                  fontSize: 12,
                  color: '#475569',
                  lineHeight: 1.65,
                  whiteSpace: 'pre-line',
                }}>
                  {insight}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 12, padding: '0 28px 24px' }}>
          <button
            onClick={onRestart}
            style={{
              flex: 1,
              background: 'transparent',
              color: '#2563eb',
              border: '2px solid #2563eb',
              borderRadius: 10,
              padding: '14px',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'background .15s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#eff6ff'; }}
            onMouseOut={(e)  => { e.currentTarget.style.background = 'transparent'; }}
          >
            PLAY AGAIN
          </button>
        </div>

      </div>
    </div>
  );
}
