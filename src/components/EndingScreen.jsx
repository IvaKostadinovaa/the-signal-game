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

function TrustShield() {
  return (
    <svg width="54" height="60" viewBox="0 0 90 100" fill="none">
      <defs>
        <linearGradient id="esTrustGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="esTrustBorder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <path d="M45 4 L82 18 L82 50 C82 72 64 88 45 96 C26 88 8 72 8 50 L8 18 Z" fill="url(#esTrustBorder)" />
      <path d="M45 10 L76 22 L76 50 C76 69 60 83 45 90 C30 83 14 69 14 50 L14 22 Z" fill="url(#esTrustGrad)" />
      <polyline points="30,50 40,62 62,38" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function SpeedShield() {
  return (
    <svg width="54" height="60" viewBox="0 0 90 100" fill="none">
      <defs>
        <linearGradient id="esSpeedGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="esSpeedBorder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path d="M45 4 L82 18 L82 50 C82 72 64 88 45 96 C26 88 8 72 8 50 L8 18 Z" fill="url(#esSpeedBorder)" />
      <path d="M45 10 L76 22 L76 50 C76 69 60 83 45 90 C30 83 14 69 14 50 L14 22 Z" fill="url(#esSpeedGrad)" />
      <polygon points="50,28 34,54 44,54 40,72 56,46 46,46" fill="white" opacity="0.95" />
    </svg>
  );
}

function computeTitle(meters) {
  if (meters.trust >= 50) return 'THE TRUSTED SIGNAL';
  if (meters.trust >= 30) return 'THE SIGNAL SURVIVES';
  return 'THE SIGNAL STRUGGLES';
}


function computeInsight(meters) {
  if (meters.trust >= 50) return 'You chose accuracy over clicks.\nYour audience trusts you, and that\'s what matters.';
  if (meters.trust >= 30) return 'You balanced speed and accuracy.\nKeep building trust one story at a time.';
  return 'Speed cost you credibility.\nNext time, verify before you publish.';
}

export default function EndingScreen({ meters, xp, onRestart, earnedBadges = {} }) {
  const title   = computeTitle(meters);
  const insight = computeInsight(meters);

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

        {/* Title row */}
        <div style={{
          padding: '28px 28px 22px',
          borderBottom: '1px solid #f1f5f9',
        }}>
          <div style={{
            fontSize: 'clamp(2.8rem, 8vw, 4.5rem)',
            fontWeight: 900,
            color: '#0a1e28',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          }}>
            THE END
          </div>
          <div style={{
            fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
            fontWeight: 800,
            color: '#cc0000',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginTop: 6,
            fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          }}>
            {title}
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
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                {!earnedBadges.trust && !earnedBadges.speed && (
                  <div style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic', padding: '8px 0' }}>
                    No badges earned
                  </div>
                )}
                {earnedBadges.trust && (
                  <div style={{ textAlign: 'center' }}>
                    <TrustShield />
                    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: '#16a34a', textTransform: 'uppercase', marginTop: 4 }}>Trust</div>
                  </div>
                )}
                {earnedBadges.speed && (
                  <div style={{ textAlign: 'center' }}>
                    <SpeedShield />
                    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: '#d97706', textTransform: 'uppercase', marginTop: 4 }}>Speed</div>
                  </div>
                )}
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
              background: '#0a1e28',
              color: '#ffffff',
              border: '2px solid #0a1e28',
              borderRadius: 10,
              padding: '14px',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'background .15s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#1e3a4a'; }}
            onMouseOut={(e)  => { e.currentTarget.style.background = '#0a1e28'; }}
          >
            PLAY AGAIN
          </button>
        </div>

      </div>
    </div>
  );
}
