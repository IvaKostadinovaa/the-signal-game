import storyImg1 from '../images/level1.png';
import storyImg2 from '../images/investigate.png';
import storyImg3 from '../images/analyze.png';
import aiImg from '../images/ai.png';

const STORY_IMAGES = {
  'mayor-chen': storyImg1,
  'crime-stats': storyImg2,
  deepfake: storyImg3,
};

const BADGE_VARIANT = {
  BREAKING: 'hot',
  DEVELOPING: 'update',
  EXCLUSIVE: 'new',
};

const STORY_TIMERS = {
  'mayor-chen': { label: '1:48', urgent: true },
  'crime-stats': { label: '12:00', urgent: false },
  deepfake: { label: '0:15', urgent: true },
};

const VeraIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6.5" />
    <path d="M5.5 8l1.8 1.8 3.2-3.6" />
  </svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="6" cy="6" r="5" />
    <path d="M6 3.5V6l1.5 1.5" />
  </svg>
);

export default function Dashboard({ stories, decisions, onSelectStory, onCrisis }) {
  const allDecided = stories.every((s) => decisions[s.id]);
  const decidedCount = stories.filter((s) => decisions[s.id]).length;

  return (
    <div className="dashboard-layout">

      {/* ── Main ── */}
      <main className="dashboard-main">
        <div style={{ marginBottom: 22 }}>
          <div className="section-title">Active Stories</div>
          <div className="section-subtitle">
            {decidedCount} of {stories.length} resolved · Day 1 of 21 · Mediapol
          </div>
        </div>

        <div className="story-cards">
          {stories.map((story) => {
            const decided = decisions[story.id];
            const img = STORY_IMAGES[story.id];
            const variant = BADGE_VARIANT[story.priority] || 'new';
            const timer = STORY_TIMERS[story.id];

            return (
              <div
                key={story.id}
                className={`story-card story-card--${variant}${decided ? ' story-card--decided' : ''}`}
                onClick={!decided ? () => onSelectStory(story.id) : undefined}
                style={{ cursor: decided ? 'default' : 'pointer' }}
              >
                <div className="story-card__image">
                  {img && (
                    <img src={img} alt={story.title} className="story-card__img-bg" />
                  )}
                  <span className={`story-card__badge story-card__badge--${variant}`}>
                    {story.priority}
                  </span>
                  {decided && (
                    <span className="story-card__decided-badge">
                      {decided.toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="story-card__body">
                  <div className="story-card__title">{story.title || story.headline}</div>
                  <div className="story-card__source">
                    {story.sources[0]?.name}
                    {story.sources.length > 1 && ` +${story.sources.length - 1} more`}
                  </div>
                  <div className="story-card__footer">
                    <span className="story-card__sources-count">
                      {story.sources.length} sources
                    </span>
                    {!decided && timer && (
                      <span className={`story-card__timer story-card__timer--${timer.urgent ? 'urgent' : 'ok'}`}>
                        <ClockIcon /> {timer.label}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="tip-box">
          <span className="tip-box__icon">⚠️</span>
          <span>
            <strong>NEVER FULL CERTAINTY</strong> - You will never know if you are right until after you decide.
            VERA can be wrong. Sources can lie. Speed kills accuracy. That is the lesson.
          </span>
        </div>
      </main>

      {/* ── Right Panel ── */}
      <aside className="dashboard-right">

        <div className="vera-panel">
          <div className="vera-panel__header">
            <div className="vera-panel__avatar">
              <img
                src={aiImg}
                alt="VERA"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
            <div>
              <div className="vera-panel__name">VERA</div>
              <div className="vera-panel__role">ANALYSIS SYSTEM</div>
            </div>
          </div>
          <p className="vera-panel__text">
            {decidedCount < stories.length
              ? `${stories.length - decidedCount} stor${stories.length - decidedCount === 1 ? 'y' : 'ies'} pending. Anomalies detected in incoming materials. VERA confidence is probabilistic - always verify independently.`
              : 'All stories resolved. Crisis situation developing. Proceed to response.'}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <VeraIcon />
            <span style={{ fontSize: 11, color: '#475569', fontWeight: 600 }}>System active · 3 flags queued</span>
          </div>
          <button className="vera-panel__btn">OPEN VERA CONSOLE</button>
        </div>

        <div className="team-mood">
          <div className="team-mood__title">TEAM STATUS</div>
          <div className="team-mood__faces">
            <div className="team-mood__face team-mood__face--active" title="Alex">😐</div>
            <div className="team-mood__face" title="VERA">🤖</div>
            <div className="team-mood__face" title="Advertiser">📞</div>
            <div className="team-mood__face" title="Team">👥</div>
          </div>
          <div className="team-mood__status">Under Pressure</div>
          <div className="team-mood__sub">Alex is pushing for speed</div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 12,
          padding: '14px 16px',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#475569', marginBottom: 10 }}>
            NEWSROOM FEED
          </div>
          {[
            { dot: '#ef4444', text: 'NewsFirst teasing Mayor Chen story', time: '2 min ago' },
            { dot: '#f59e0b', text: 'Anonymous tip received via encrypted channel', time: '4 min ago' },
            { dot: '#3b82f6', text: "Wire service: no confirmation from mayor's office", time: '9 min ago' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%', background: item.dot,
                flexShrink: 0, marginTop: 4, flexShrink: 0,
              }} />
              <div>
                <div style={{ fontSize: 11, color: '#cbd5e1', lineHeight: 1.4 }}>{item.text}</div>
                <div style={{ fontSize: 10, color: '#475569', marginTop: 2 }}>{item.time}</div>
              </div>
            </div>
          ))}
        </div>

        {allDecided && (
          <button
            style={{
              width: '100%',
              background: '#dc2626',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '14px',
              fontSize: 13,
              fontWeight: 800,
              cursor: 'pointer',
              letterSpacing: '0.06em',
              transition: 'opacity .15s',
            }}
            onClick={onCrisis}
            onMouseOver={e => e.currentTarget.style.opacity = '.88'}
            onMouseOut={e => e.currentTarget.style.opacity = '1'}
          >
            CRISIS DEVELOPING →
          </button>
        )}
      </aside>
    </div>
  );
}
