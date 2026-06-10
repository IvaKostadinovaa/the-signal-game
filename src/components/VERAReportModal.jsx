export default function VERAReportModal({ story, onClose }) {
  const vera = story.vera;
  const title = story.title || story.headline;

  return (
    <div className="modal">
      <div className="modal__header">
        <h3>VERA Report</h3>
        <button className="modal__close" type="button" onClick={onClose} aria-label="Close">✕</button>
      </div>
      <div className="modal__vera-body">
        <p className="modal__vera-headline">{title}</p>
        {vera ? (
          <>
            <p className="modal__vera-detail">
              Confidence Score: <strong>{vera.confidence}%</strong> ·{' '}
              {vera.confidenceType === 'low' ? 'Low Confidence' : vera.confidenceType === 'medium' ? 'Medium Confidence' : 'High Confidence'}
            </p>
            <div className="modal__vera-flags">
              {vera.redFlags.map((flag, i) => (
                <p key={i} className="modal__vera-detail">• {flag}</p>
              ))}
            </div>
            {vera.quote && <blockquote className="modal__vera-quote">"{vera.quote}"</blockquote>}
            {vera.extra && <p className="modal__vera-score">CRAAP score: {vera.extra}</p>}
          </>
        ) : (
          <p>No VERA analysis available for this story.</p>
        )}
        <p className="modal__vera-footer">
          Dr. Mira (VERA) · AI Fact-Checker · Synthetic media detection system
        </p>
      </div>
    </div>
  );
}
