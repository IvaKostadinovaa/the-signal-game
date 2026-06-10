export default function PressureBar({ meters }) {
  const trustStatus = meters.trust < 40 ? 'pressure' : '';
  const speedStatus = meters.speed < 30 ? 'pressure' : '';

  return (
    <div className="pressure-bar">
      <div className="pressure-bar__brand">The Signal</div>
      <div className={`pressure-meter ${trustStatus}`}>
        <span className="pressure-meter__label">TRUST</span>
        <div className="pressure-meter__track">
          <div className="pressure-meter__fill" style={{ width: `${meters.trust}%` }} />
        </div>
        <span className="pressure-meter__value">{meters.trust}%</span>
      </div>
      <div className={`pressure-meter ${speedStatus}`}>
        <span className="pressure-meter__label">SPEED</span>
        <div className="pressure-meter__track">
          <div className="pressure-meter__fill" style={{ width: `${meters.speed}%` }} />
        </div>
        <span className="pressure-meter__value">{meters.speed}%</span>
      </div>
      <div className="pressure-meter">
        <span className="pressure-meter__label">RISK</span>
        <div className="pressure-meter__track">
          <div className="pressure-meter__fill" style={{ width: `${meters.legalRisk}%` }} />
        </div>
        <span className="pressure-meter__value">{meters.legalRisk}%</span>
      </div>
    </div>
  );
}
