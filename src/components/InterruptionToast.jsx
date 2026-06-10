export default function InterruptionToast({ interruption, onDismiss }) {
  if (!interruption) return null;

  return (
    <div className="interruption-toast" role="status" aria-live="polite">
      <div className="interruption-toast__header">{interruption.character}</div>
      <p>{interruption.quote}</p>
      <button type="button" className="interruption-toast__close" onClick={onDismiss}>
        Dismiss
      </button>
    </div>
  );
}
