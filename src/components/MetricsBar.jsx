function MetricItem({ label, value, barClass }) {
  return (
    <div className="metric-item">
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

export default function MetricsBar({ meters, showCountdown, timeLeft }) {
  return (
    <header className="metrics-bar">
      <div className="metrics-bar__metrics">
        <MetricItem label="TRUST" value={meters.trust} barClass="metric-item__bar--trust" />
        <MetricItem label="SPEED" value={meters.speed} barClass="metric-item__bar--speed" />
        <MetricItem label="LEGAL RISK" value={meters.legalRisk} barClass="metric-item__bar--risk" />
      </div>
      {showCountdown && (
        <div className="metrics-bar__timer">
          <div className="metrics-bar__countdown" style={{ color: timeLeft <= 5 ? '#ef4444' : '#1e293b' }}>
            {formatTime(timeLeft)}
          </div>
          <div className="metrics-bar__countdown-label">TIME REMAINING</div>
        </div>
      )}
    </header>
  );
}
