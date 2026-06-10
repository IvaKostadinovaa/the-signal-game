const PublishIcon = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="9" r="7.5"/>
    <line x1="9" y1="5" x2="9" y2="13"/>
    <polyline points="5,9 9,5 13,9"/>
  </svg>
);

const VerifyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="5.5"/>
    <line x1="12.5" y1="12.5" x2="16" y2="16"/>
  </svg>
);

const DropIcon = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="9" cy="9" r="7.5"/>
    <polyline points="5,9 9,13 13,9"/>
    <line x1="9" y1="5" x2="9" y2="13"/>
  </svg>
);

export default function TimeoutModal({ onDecision }) {
  return (
    <div className="timeout-overlay">
      <div className="timeout-modal">
        <div className="timeout-modal__icon">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="26" fill="#dc2626"/>
            <circle cx="26" cy="28" r="11" stroke="white" strokeWidth="2.5" fill="none"/>
            <line x1="26" y1="28" x2="26" y2="23" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="26" y1="28" x2="30" y2="31" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="19" y1="17" x2="22" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="33" y1="17" x2="30" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="22" y1="14" x2="24" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <line x1="30" y1="14" x2="28" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="timeout-modal__title">DEADLINE PASSED</div>
        <div className="timeout-modal__body">
          You must decide now — with what you&apos;ve gathered.<br />
          Speed automatically drops <strong>−20</strong> for missing the deadline.
        </div>

        <div className="timeout-modal__actions">
          <button
            className="timeout-btn timeout-btn--publish"
            onClick={() => onDecision('publish')}
          >
            <PublishIcon /> PUBLISH
            <span className="timeout-btn__sub">Run the story now</span>
          </button>
          <button
            className="timeout-btn timeout-btn--verify"
            onClick={() => onDecision('verify')}
          >
            <VerifyIcon /> VERIFY
            <span className="timeout-btn__sub">Investigate further</span>
          </button>
          <button
            className="timeout-btn timeout-btn--drop"
            onClick={() => onDecision('drop')}
          >
            <DropIcon /> DROP
            <span className="timeout-btn__sub">Don&apos;t publish</span>
          </button>
        </div>
      </div>
    </div>
  );
}
