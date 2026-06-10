import { useState } from 'react';

const STEPS = [
  {
    label: 'Observation',
    placeholder: 'State what you observed without evaluation…',
    hint: 'Describe facts only — no judgement.',
  },
  {
    label: 'Feeling',
    placeholder: 'Express how this makes you feel…',
    hint: 'Use "I feel…" rather than "You make me feel…"',
  },
  {
    label: 'Need',
    placeholder: 'Identify the underlying need…',
    hint: 'What value or need is at stake for you?',
  },
  {
    label: 'Request',
    placeholder: 'Make a clear, actionable request…',
    hint: 'Positive, specific, and achievable.',
  },
];

export default function NVCDialogue({ onSend }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(['', '', '', '']);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      onSend();
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <main className="nvc-dialogue">
      <header className="nvc-dialogue__header">
        <span className="eyebrow">NVC Framework</span>
        <h2>Compose your response</h2>
        <p>Step {step + 1} of {STEPS.length}: <strong>{current.label}</strong></p>
      </header>

      <div className="nvc-dialogue__step">
        <p className="nvc-dialogue__hint">{current.hint}</p>
        <textarea
          className="nvc-dialogue__input"
          rows={4}
          placeholder={current.placeholder}
          value={values[step]}
          onChange={(e) => {
            const next = [...values];
            next[step] = e.target.value;
            setValues(next);
          }}
        />
        <button
          className="cta-button"
          type="button"
          onClick={handleNext}
          disabled={!values[step].trim()}
        >
          {isLast ? 'Send message →' : `Next: ${STEPS[step + 1].label} →`}
        </button>
      </div>
    </main>
  );
}
