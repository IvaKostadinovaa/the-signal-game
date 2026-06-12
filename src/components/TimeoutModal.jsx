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
        <svg width="150" height="150" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="26" fill="#dc2626"/>
          <circle cx="26" cy="28" r="11" stroke="white" strokeWidth="2.5" fill="none"/>
          <line x1="26" y1="28" x2="26" y2="23" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="26" y1="28" x2="30" y2="31" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="19" y1="17" x2="22" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="33" y1="17" x2="30" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="timeout-modal">

        <div className="timeout-modal__inner">
          {/* Icon */}
          <div className="timeout-modal__icon">
            <svg width="48" height="48" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="26" fill="#dc2626"/>
              <circle cx="26" cy="28" r="11" stroke="white" strokeWidth="2.5" fill="none"/>
              <line x1="26" y1="28" x2="26" y2="23" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="26" y1="28" x2="30" y2="31" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="19" y1="17" x2="22" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="33" y1="17" x2="30" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Label */}
          <div className="timeout-modal__eyebrow">TIME&apos;S UP</div>

          {/* Title */}
          <div className="timeout-modal__title">DEADLINE PASSED</div>

          {/* Body */}
          <div className="timeout-modal__body">
            You must decide now — with what you&apos;ve gathered.<br />
            Speed automatically drops <strong>−20</strong> for missing the deadline.
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
