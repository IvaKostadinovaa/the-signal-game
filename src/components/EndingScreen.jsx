import buildingImg from '../images/the-signal.png';
import survivesImg from '../images/survives.png';
import strugglesImg from '../images/struggles.png';
import closedImg from '../images/closed.png';
import bgImg from '../images/background.jpg';

const SCORE_METRICS = [
  { key: 'trust',     label: 'TRUST',      color: '#22c55e', bg: 'rgba(34,197,94,0.07)'  },
  { key: 'speed',     label: 'SPEED',      color: '#f59e0b', bg: 'rgba(245,158,11,0.07)' },
  { key: 'legalRisk', label: 'LEGAL RISK', color: '#ef4444', bg: 'rgba(239,68,68,0.07)'  },
];

const ENDINGS = {
  trusted: {
    title: 'THE TRUSTED SIGNAL',
    subtitle: 'THE AUDIENCE TRUSTS YOU',
    titleColor: '#14532d',
    subtitleColor: '#16a34a',
    btnColor: '#16a34a',
    btnHover: '#15803d',
    image: buildingImg,
    quote: 'Your newsroom became what journalism was always meant to be. Slow when it had to be, fast when it could be, and honest when it mattered most. In a world full of noise, The Signal stood for truth.',
  },
  survives: {
    title: 'THE SIGNAL SURVIVES',
    subtitle: 'STILL ON THE AIR',
    titleColor: '#9a3412',
    subtitleColor: '#c2410c',
    btnColor: '#d97706',
    btnHover: '#b45309',
    image: survivesImg,
    quote: "The Signal is still standing. Imperfect, sometimes pressured, occasionally wrong. But still here. Survival is not victory. But it's a start.",
  },
  struggles: {
    title: 'THE SIGNAL STRUGGLES',
    subtitle: 'TRUST LOST',
    titleColor: '#991b1b',
    subtitleColor: '#dc2626',
    btnColor: '#dc2626',
    btnHover: '#b91c1c',
    image: strugglesImg,
    quote: "The audience stopped listening. Not because the stories weren't interesting but because they couldn't trust them anymore. Speed without accuracy is just noise.",
  },
  lawsuit: {
    title: 'LAWSUIT ENDING',
    subtitle: 'THE SIGNAL HAS FALLEN',
    titleColor: '#7f1d1d',
    subtitleColor: '#991b1b',
    btnColor: '#7f1d1d',
    btnHover: '#6b1414',
    image: closedImg,
    quote: 'The stories are gone. The newsroom is silent. Every shortcut, every unverified claim, every moment of pressure that won. It all led here. One wrong story can end everything.',
  },
};

function getEndingType(meters, lawsuitEnding) {
  if (lawsuitEnding || meters.legalRisk >= 100) return 'lawsuit';
  if (meters.legalRisk < 30 && meters.trust > 80) return 'trusted';
  if (meters.legalRisk < 60 && meters.trust >= 30 && meters.trust <= 80) return 'survives';
  return 'struggles';
}

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
        <filter id="esTrustShadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.3)" />
        </filter>
      </defs>
      <path d="M45 4 L82 18 L82 50 C82 72 64 88 45 96 C26 88 8 72 8 50 L8 18 Z" fill="url(#esTrustBorder)" filter="url(#esTrustShadow)" />
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
        <filter id="esSpeedShadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(217,119,6,0.4)" />
        </filter>
      </defs>
      <path d="M45 4 L82 18 L82 50 C82 72 64 88 45 96 C26 88 8 72 8 50 L8 18 Z" fill="url(#esSpeedBorder)" filter="url(#esSpeedShadow)" />
      <path d="M45 10 L76 22 L76 50 C76 69 60 83 45 90 C30 83 14 69 14 50 L14 22 Z" fill="url(#esSpeedGrad)" />
      <polygon points="50,28 34,54 44,54 40,72 56,46 46,46" fill="white" opacity="0.95" />
    </svg>
  );
}

function VerifiedShield() {
  return (
    <svg width="54" height="60" viewBox="0 0 90 100" fill="none">
      <defs>
        <linearGradient id="esVerGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="esVerBorder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <filter id="esVerShadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(3,105,161,0.4)" />
        </filter>
      </defs>
      <path d="M45 4 L82 18 L82 50 C82 72 64 88 45 96 C26 88 8 72 8 50 L8 18 Z" fill="url(#esVerBorder)" filter="url(#esVerShadow)" />
      <path d="M45 10 L76 22 L76 50 C76 69 60 83 45 90 C30 83 14 69 14 50 L14 22 Z" fill="url(#esVerGrad)" />
      <circle cx="41" cy="46" r="13" stroke="white" strokeWidth="5.5" fill="none" opacity="0.95" />
      <line x1="51" y1="56" x2="63" y2="68" stroke="white" strokeWidth="5.5" strokeLinecap="round" opacity="0.95" />
      <polyline points="34,46 39,52 49,40" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
    </svg>
  );
}


function ScalesIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <line x1="26" y1="4" x2="26" y2="48" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="8" y1="13" x2="44" y2="13" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="13" x2="8"  y2="28" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="13" x2="16" y2="28" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <path d="M7,28 Q12,34 17,28" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round" />
      <line x1="40" y1="13" x2="36" y2="28" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="13" x2="44" y2="28" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <path d="M35,28 Q40,34 45,28" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round" />
      <line x1="20" y1="48" x2="32" y2="48" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function EndingScreen({ meters, xp, onRestart, onMainMenu, earnedBadges = {}, lawsuitEnding = false }) {
  const type = getEndingType(meters, lawsuitEnding);
  const cfg = ENDINGS[type];
  const isLawsuit = type === 'lawsuit';

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 85%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(255,255,255,0.88)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'relative',
        background: '#ffffff',
        borderRadius: 20,
        width: '100%',
        maxWidth: 780,
        boxShadow: '0 8px 48px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
      }}>

        {/* Header */}
        <div style={{ padding: '28px 28px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{
            fontSize: 'clamp(2rem, 6vw, 3.6rem)',
            fontWeight: 900,
            color: cfg.titleColor,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          }}>
            {cfg.title}
          </div>
          <div style={{
            fontSize: 'clamp(0.65rem, 1.8vw, 0.82rem)',
            fontWeight: 800,
            color: cfg.subtitleColor,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginTop: 6,
            fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          }}>
            {cfg.subtitle}
          </div>
        </div>

        {/* Main content */}
        <div className="ending-content" style={{ display: 'flex', gap: 24, padding: '24px 28px' }}>

          {/* Left image */}
          <div className="ending-image" style={{
            width: 230,
            flexShrink: 0,
            borderRadius: 14,
            overflow: 'hidden',
            background: '#f8fafc',
            alignSelf: 'stretch',
          }}>
            <img
              src={cfg.image}
              alt="The Signal"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Right panel */}
          <div style={{ flex: 1, minWidth: 0 }}>

            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: '#94a3b8', marginBottom: 12 }}>
              YOUR FINAL SCORE
            </div>

            {/* Score metrics — colors and format unchanged */}
            <div className="ending-scores-grid" style={{
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
                  <div style={{ fontSize: 9, fontWeight: 800, color, letterSpacing: '0.12em', marginBottom: 6 }}>
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

            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: '#94a3b8', marginBottom: 14 }}>
              {isLawsuit ? 'CONSEQUENCES' : 'ACHIEVEMENTS EARNED'}
            </div>

            <div className="ending-bottom" style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>

              {/* Badges */}
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-start', flexShrink: 0 }}>
                {isLawsuit && (
                  <div style={{
                    background: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <ScalesIcon />
                  </div>
                )}
                {!earnedBadges.trust && !earnedBadges.speed && !earnedBadges.verified && (
                  <div style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic', padding: '8px 0' }}>No badges earned</div>
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
                {earnedBadges.verified && (
                  <div style={{ textAlign: 'center' }}>
                    <VerifiedShield />
                    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: '#0369a1', textTransform: 'uppercase', marginTop: 4 }}>Verified</div>
                  </div>
                )}
              </div>


            </div>
          </div>
        </div>

        {/* Quote */}
        <div style={{ padding: '4px 28px 20px' }}>
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 30, color: '#cbd5e1', lineHeight: 0.9, flexShrink: 0, marginTop: 2, fontFamily: 'Georgia, serif' }}>"</span>
            <p style={{ margin: 0, fontSize: 13, color: '#475569', fontStyle: 'italic', lineHeight: 1.75 }}>
              {cfg.quote}
            </p>
          </div>
        </div>

        {/* Cause of failure — lawsuit only */}
        {isLawsuit && (
          <div style={{ margin: '0 28px 16px' }}>
            <div style={{
              background: '#0f172a',
              color: '#cbd5e1',
              borderRadius: 10,
              padding: '11px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
            }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', color: '#94a3b8' }}>CAUSE OF FAILURE:</span>
              <span style={{ fontSize: 12, color: '#e2e8f0' }}>
                {lawsuitEnding ? 'Silencer Offer Accepted' : 'Legal Risk reached 100'}
              </span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="ending-buttons" style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 28px 24px' }}>
          <button
            onClick={onRestart}
            style={{
              background: cfg.btnColor,
              color: '#ffffff',
              border: `2px solid ${cfg.btnColor}`,
              borderRadius: 10,
              padding: '14px',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'background .15s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = cfg.btnHover; e.currentTarget.style.borderColor = cfg.btnHover; }}
            onMouseOut={(e)  => { e.currentTarget.style.background = cfg.btnColor;  e.currentTarget.style.borderColor = cfg.btnColor; }}
          >
            PLAY AGAIN
          </button>
          <button
            onClick={onMainMenu}
            style={{
              background: 'transparent',
              color: cfg.btnColor,
              border: `2px solid ${cfg.btnColor}`,
              borderRadius: 10,
              padding: '14px',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'background .15s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = `${cfg.btnColor}14`; }}
            onMouseOut={(e)  => { e.currentTarget.style.background = 'transparent'; }}
          >
            RETURN TO MAIN MENU
          </button>
        </div>

      </div>
    </div>
  );
}
