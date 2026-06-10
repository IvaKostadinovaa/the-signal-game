export default function CrisisResponse({ options, publicTension, signalTension, onRespond }) {
  return (
    <main className="crisis-response">
      <header className="crisis-response__header">
        <span className="eyebrow crisis-response__eyebrow">CRISIS</span>
        <h2>Public pressure is mounting</h2>
        <div className="crisis-response__tension-row">
          <span>Public tension: <strong>{publicTension}%</strong></span>
          <span>Signal tension: <strong>{signalTension}%</strong></span>
        </div>
      </header>

      <ul className="crisis-response__options">
        {options.map((opt) => (
          <li key={opt.id} className="crisis-response__option">
            <div className="crisis-response__option-header">
              <strong>{opt.label}</strong>
              <span className={`crisis-response__risk crisis-response__risk--${opt.risk.toLowerCase()}`}>
                {opt.risk} risk
              </span>
            </div>
            <p>{opt.description}</p>
            <button
              className="cta-button cta-button--secondary"
              type="button"
              onClick={() => onRespond(opt.id)}
            >
              Choose this response →
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
