import { useState } from 'react';

const DECISIONS = [
  { key: 'publish', label: 'PUBLISH' },
  { key: 'verify', label: 'VERIFY' },
  { key: 'kill', label: 'DROP' },
];

export default function StoryScene({ story, dispatch, activeInterruption }) {
  const [expanded, setExpanded] = useState(story.sources[0]?.key || null);

  return (
    <main className="story-scene">
      <div className="story-scene__header">
        <span className="story-scene__priority">{story.priority}</span>
        <h2>{story.headline}</h2>
        <p className="story-scene__subhead">{story.subheadline}</p>
      </div>

      <div className="story-scene__source-row">
        {story.sources.map((source) => (
          <button
            type="button"
            key={source.key}
            className={`source-card ${expanded === source.key ? 'source-card--expanded' : ''}`}
            onClick={() => setExpanded(source.key)}
          >
            <span className="source-card__label">{source.label}</span>
            <p className="source-card__details">{source.details}</p>
            {expanded === source.key && source.extra ? (
              <div className="source-card__extra">{source.extra}</div>
            ) : null}
          </button>
        ))}
      </div>

      <div className="story-scene__actions">
        {DECISIONS.map((decision) => (
          <button
            type="button"
            key={decision.key}
            className="decision-button"
            onClick={() => {
              dispatch({ type: 'MAKE_DECISION', decision: decision.key });
              dispatch({ type: 'DISMISS_INTERRUPTION' });
            }}
          >
            {decision.label}
          </button>
        ))}
      </div>

      {activeInterruption ? (
        <div className="story-scene__info-banner">
          <strong>{activeInterruption.character}:</strong> {activeInterruption.quote}
        </div>
      ) : null}
    </main>
  );
}
