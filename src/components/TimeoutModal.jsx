function ClockSVG({ size }) {
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const deg = i * 30;
    const rad = (deg - 90) * Math.PI / 180;
    const isMajor = i % 3 === 0;
    const r1 = isMajor ? 25 : 27.5;
    return (
      <line
        key={i}
        x1={40 + r1 * Math.cos(rad)} y1={40 + r1 * Math.sin(rad)}
        x2={40 + 31 * Math.cos(rad)} y2={40 + 31 * Math.sin(rad)}
        stroke="white"
        strokeWidth={isMajor ? 2.5 : 1.5}
        strokeLinecap="round"
        opacity={isMajor ? 1 : 0.45}
      />
    );
  });

  return (
    <svg width={size} height={size} viewBox="0 0 80 86" fill="none">
      <defs>
        <radialGradient id="cg" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#991b1b" />
        </radialGradient>
      </defs>
      {/* Crown */}
      <rect x="34" y="2" width="12" height="7" rx="3.5" fill="#b91c1c" stroke="white" strokeWidth="1.5" />
      {/* Lugs */}
      <line x1="33" y1="9" x2="30" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="47" y1="9" x2="50" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* Main circle */}
      <circle cx="40" cy="46" r="36" fill="url(#cg)" />
      {/* Inner ring */}
      <circle cx="40" cy="46" r="30" fill="none" stroke="white" strokeWidth="1" opacity="0.18" />
      {/* Tick marks */}
      {Array.from({ length: 12 }, (_, i) => {
        const deg = i * 30;
        const rad = (deg - 90) * Math.PI / 180;
        const isMajor = i % 3 === 0;
        const r1 = isMajor ? 24 : 27;
        return (
          <line
            key={i}
            x1={40 + r1 * Math.cos(rad)} y1={46 + r1 * Math.sin(rad)}
            x2={40 + 31 * Math.cos(rad)} y2={46 + 31 * Math.sin(rad)}
            stroke="white"
            strokeWidth={isMajor ? 2.5 : 1.5}
            strokeLinecap="round"
            opacity={isMajor ? 0.95 : 0.4}
          />
        );
      })}
      {/* Minute hand — pointing to ~12 */}
      <line x1="40" y1="46" x2="40" y2="22" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      {/* Hour hand — pointing to ~11 */}
      <line x1="40" y1="46" x2="29" y2="26" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      {/* Center */}
      <circle cx="40" cy="46" r="4" fill="white" />
      <circle cx="40" cy="46" r="2" fill="#dc2626" />
    </svg>
  );
}

const PublishIcon = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="9" r="7.5"/>
    <line x1="9" y1="5" x2="9" y2="13"/>
    <polyline points="5,9 9,5 13,9"/>
  </svg>
);

const DropIcon = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="9" cy="9" r="7.5"/>
    <polyline points="5,9 9,13 13,9"/>
    <line x1="9" y1="5" x2="9" y2="13"/>
  </svg>
);

export default function TimeoutModal({ onDecision }) {
  return (
    <div className="timeout-overlay">
      <div className="timeout-clock-hero">
        <ClockSVG size={150} />
      </div>
      <div className="timeout-modal">

        <div className="timeout-modal__inner">
          {/* Icon */}
          <div className="timeout-modal__icon">
            <ClockSVG size={64} />
          </div>

          {/* Label */}
          <div className="timeout-modal__eyebrow">TIME&apos;S UP</div>

          {/* Title */}
          <div className="timeout-modal__title">DEADLINE PASSED</div>

          {/* Body */}
          <div className="timeout-modal__body">
            You must decide now - with what you&apos;ve gathered.
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0 8px' }}>
            <div style={{
              background: '#fffbeb',
              border: '1.5px solid #fde68a',
              borderRadius: 10,
              padding: '10px 20px',
              textAlign: 'center',
              minWidth: 90,
            }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: '#d97706', letterSpacing: '0.12em', marginBottom: 4, textTransform: 'uppercase' }}>
                SPEED
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, justifyContent: 'center' }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: '#dc2626', lineHeight: 1 }}>−20</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#dc2626', opacity: 0.65 }}>%</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="timeout-modal__divider" />

          {/* Actions */}
          <div className="timeout-modal__actions">
            <button className="timeout-btn timeout-btn--publish" onClick={() => onDecision('publish')}>
              <span className="timeout-btn__icon"><PublishIcon /></span>
              <span className="timeout-btn__text">
                <span className="timeout-btn__label">PUBLISH</span>
                <span className="timeout-btn__sub">Run the story now</span>
              </span>
            </button>
<button className="timeout-btn timeout-btn--drop" onClick={() => onDecision('drop')}>
              <span className="timeout-btn__icon"><DropIcon /></span>
              <span className="timeout-btn__text">
                <span className="timeout-btn__label">DROP</span>
                <span className="timeout-btn__sub">Don&apos;t publish</span>
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
