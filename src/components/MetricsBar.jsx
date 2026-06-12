function MetricItem({ label, value, barClass, flashClass }) {
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

export default function MetricsBar({ meters, showCountdown, timeLeft, isMuted, metricFlash, onToggleMute }) {
  return (
    <header className="metrics-bar">
      <div className="metrics-bar__metrics">
        <MetricItem label="TRUST" value={meters.trust} barClass="metric-item__bar--trust" flashClass={metricFlash?.trust ? 'metric-item--flash-trust' : ''} />
        <MetricItem label="SPEED" value={meters.speed} barClass="metric-item__bar--speed" flashClass={metricFlash?.speed ? 'metric-item--flash-speed' : ''} />
        <MetricItem label="LEGAL RISK" value={meters.legalRisk} barClass="metric-item__bar--risk" flashClass="" />
      </div>
      {showCountdown && (
        <div className="metrics-bar__timer">
          <div className={`metrics-bar__timer-box${timeLeft <= 5 ? ' metrics-bar__timer-box--urgent' : ''}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="9"/>
              <polyline points="12 7 12 12 15 14"/>
            </svg>
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
