function MetricItem({ label, value, barClass, flashClass, locked }) {
  if (locked) {
    return (
      <div className="metric-item" style={{ opacity: 0.45 }}>
        <span className="metric-item__label" style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}>
          {label}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </span>
        <div className="metric-item__bar-wrap" style={{ background: '#e2e8f0' }}>
          <div style={{ width: '100%', height: '100%', background: 'repeating-linear-gradient(45deg, #cbd5e1 0px, #cbd5e1 3px, transparent 3px, transparent 8px)' }} />
        </div>
        <span className="metric-item__value" style={{ color: '#94a3b8', fontSize: 10, letterSpacing: '0.05em' }}>
          LVL 2
        </span>
      </div>
    );
  }
  return (
    <div className={`metric-item${flashClass ? ` ${flashClass}` : ''}`}>
      <span className="metric-item__label">{label}</span>
      <div className="metric-item__bar-wrap">
        <div className={`metric-item__bar ${barClass}`} style={{ width: `${value}%` }} />
      </div>
      <span className="metric-item__value">
        {value} <span className="metric-item__max">/100</span>
      </span>
    </div>
  );
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function MetricsBar({ meters, showCountdown, timeLeft, isMuted, metricFlash, onToggleMute, currentLevel }) {
  return (
    <header className="metrics-bar">
      <div className="metrics-bar__metrics">
        <MetricItem label="TRUST" value={meters.trust} barClass="metric-item__bar--trust" flashClass={metricFlash?.trust ? 'metric-item--flash-trust' : ''} />
        <MetricItem label="SPEED" value={meters.speed} barClass="metric-item__bar--speed" flashClass={metricFlash?.speed ? 'metric-item--flash-speed' : ''} />
        <MetricItem label="LEGAL RISK" value={meters.legalRisk} barClass="metric-item__bar--risk" flashClass="" locked={currentLevel === 1} />
      </div>
      {showCountdown && (
        <div className="metrics-bar__timer">
          <div className={`metrics-bar__timer-box${timeLeft <= 5 ? ' metrics-bar__timer-box--urgent' : ''}`}>
            <span className="metrics-bar__countdown">{formatTime(timeLeft)}</span>
          </div>
          <div className="metrics-bar__countdown-label">TIME REMAINING</div>
        </div>
      )}
      {onToggleMute && (
        <button
          className="metrics-bar__mute-btn"
          onClick={onToggleMute}
          title={isMuted ? 'Unmute sound' : 'Mute sound'}
        >
          {isMuted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          )}
        </button>
      )}
    </header>
  );
}
