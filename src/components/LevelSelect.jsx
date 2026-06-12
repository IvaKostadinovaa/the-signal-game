import { createPortal } from 'react-dom';
import bgImage from '../images/background.jpg';
import level1Img from '../images/levels_n.png';
import level2Img from '../images/levels_nn.png';
import level3Img from '../images/levels_nnn.png';

const LEVEL_IMAGES = { 1: level1Img, 2: level2Img, 3: level3Img };

const LEVEL_THEME = {
  1: { r: '22,101,52',  badge: '#16a34a' },
  2: { r: '180,83,9',   badge: '#d97706' },
  3: { r: '100,15,15',  badge: '#991b1b' },
};

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <polygon points="7 4 20 12 7 20 7 4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function LevelSelect({ levels = [], onSelectLevel, onBack }) {
  return createPortal(
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {/* White overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(255,255,255,0.88)',
        pointerEvents: 'none',
      }} />
      {/* Scrollable content layer */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        height: '100%',
        overflowY: 'auto',
      }}>
        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 750,
          margin: '0 auto',
          padding: '44px 28px 64px',
        }}>

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              marginBottom: 8,
            }}>
              LEVEL SELECT
            </div>
            <div style={{
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              color: '#dc2626',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              Begin your mission.
            </div>
          </div>

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {levels.map((level) => {
              const isLocked    = level.status === 'locked';
              const isCompleted = level.status === 'completed';
              const isActive    = !isLocked && !isCompleted;
              const img         = LEVEL_IMAGES[level.id];
              const theme       = LEVEL_THEME[level.id] || LEVEL_THEME[1];
              const statusKey   = isCompleted ? 'completed' : isLocked ? 'locked' : 'active';

              return (
                <div
                  key={level.id}
                  onClick={isActive ? () => onSelectLevel?.(level) : undefined}
                  role={isActive ? 'button' : undefined}
                  tabIndex={isActive ? 0 : undefined}
                  onKeyDown={isActive ? (e) => e.key === 'Enter' && onSelectLevel?.(level) : undefined}
                  style={{
                    position: 'relative',
                    height: 150,
                    borderRadius: 16,
                    overflow: 'hidden',
                    cursor: isActive ? 'pointer' : 'default',
                    boxShadow: isActive
                      ? '0 4px 20px rgba(0,0,0,0.15)'
                      : '0 2px 8px rgba(0,0,0,0.10)',
                    opacity: isLocked ? 0.85 : 1,
                    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (isActive) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.22)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = isActive
                      ? '0 4px 20px rgba(0,0,0,0.15)'
                      : '0 2px 8px rgba(0,0,0,0.10)';
                  }}
                >
                  {/* Background image */}
                  <img
                    src={img}
                    alt={level.title}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                      filter: isLocked ? 'brightness(0.6) saturate(0.4)' : 'none',
                    }}
                  />

                  {/* Gradient overlay — solid color left → photo visible right */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: isLocked
                      ? 'linear-gradient(90deg, rgba(20,20,20,0.92) 0%, rgba(20,20,20,0.92) 42%, rgba(20,20,20,0.55) 100%)'
                      : `linear-gradient(90deg, rgba(${theme.r},0.97) 0%, rgba(${theme.r},0.97) 42%, rgba(${theme.r},0.42) 100%)`,
                  }} />

                  {/* Content row */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 28px',
                    gap: 16,
                  }}>
                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.18em',
                        color: 'rgba(255,255,255,0.8)',
                        marginBottom: 4,
                        textTransform: 'uppercase',
                      }}>
                        LEVEL {level.id}
                      </div>
                      <div style={{
                        fontSize: 22,
                        fontWeight: 900,
                        color: '#ffffff',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.05,
                        marginBottom: 6,
                        textTransform: 'uppercase',
                      }}>
                        {level.title}
                      </div>
                    </div>

                    {/* Status badge */}
                    <div style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      ...(statusKey === 'completed' && {
                        background: theme.badge,
                        boxShadow: `0 4px 16px ${theme.badge}88`,
                      }),
                      ...(statusKey === 'active' && {
                        background: 'rgba(0,0,0,0.45)',
                        border: `3px solid ${theme.badge}`,
                        boxShadow: `0 0 0 4px ${theme.badge}33`,
                      }),
                      ...(statusKey === 'locked' && {
                        background: 'rgba(0,0,0,0.35)',
                        border: '2.5px solid rgba(255,255,255,0.65)',
                      }),
                    }}>
                      {isCompleted && <CheckIcon />}
                      {!isLocked && !isCompleted && <PlayIcon />}
                      {isLocked && <LockIcon />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div style={{
            textAlign: 'center',
            marginTop: 20,
            fontSize: 13,
            color: '#dc2626',
            fontWeight: 600,
          }}>
            Complete previous level to unlock
          </div>

        </div>
      </div>

    </div>,
    document.body
  );
}
