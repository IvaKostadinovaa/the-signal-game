export default function CrisisScene({ dispatch, meters }) {
  return (
    <main className="crisis-scene">
      <div className="crisis-scene__banner">
        <span className="crisis-scene__tag">CRISIS MODE</span>
        <span className="crisis-scene__countdown">15:00</span>
      </div>
      <div className="crisis-scene__hero">
        <h2>Mass Casualty Event - Three Conflicting Accounts - City in Panic</h2>
        <p>Real-time pressure. Choose your action before the next update.</p>
      </div>
      <div className="crisis-scene__actions">
        <button
          type="button"
          className="decision-button"
          onClick={() => dispatch({ type: 'CRISIS_DECIDE', decision: 'publish-social' })}
        >
          PUBLISH VIRAL
        </button>
        <button
          type="button"
          className="decision-button"
          onClick={() => dispatch({ type: 'CRISIS_DECIDE', decision: 'publish-official' })}
        >
          PUBLISH OFFICIAL
        </button>
        <button
          type="button"
          className="decision-button"
          onClick={() => dispatch({ type: 'CRISIS_DECIDE', decision: 'hold' })}
        >
          HOLD
        </button>
      </div>
      <div className="crisis-scene__meters">
        <div>
          <span>TRUST</span>
          <strong>{meters.trust}%</strong>
        </div>
        <div>
          <span>SPEED</span>
          <strong>{meters.speed}%</strong>
        </div>
        <div>
          <span>RISK</span>
          <strong>{meters.legalRisk}%</strong>
        </div>
      </div>
    </main>
  );
}
