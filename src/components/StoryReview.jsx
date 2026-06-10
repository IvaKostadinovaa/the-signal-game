import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import VerifyModal from './VerifyModal.jsx';
import alexImg from '../images/alex.png';
import imgMessage        from '../images/message.png';
import imgCrimeStats     from '../images/level1_1.png';
import imgPoliticianQuote from '../images/level1_2.png';
import imgMayorChen      from '../images/level2_1.png';
import imgElectionDocs   from '../images/level2_3.png';
import imgDeepfake       from '../images/level3.png';

const STORY_IMAGES = {
  'crime-stats':      imgCrimeStats,
  'politician-quote': imgPoliticianQuote,
  'mayor-chen-image': imgMayorChen,
  'election-docs':    imgElectionDocs,
  deepfake:           imgDeepfake,
};

const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
    <polygon points="5,3 15,9 5,15"/>
  </svg>
);

const VolumeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <polygon points="2,5 5,5 8,2 8,12 5,9 2,9"/>
    <path d="M10 4.5a4 4 0 010 5M11.5 3a6 6 0 010 8"/>
  </svg>
);

const FullscreenIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <polyline points="1,5 1,1 5,1"/>
    <polyline points="9,1 13,1 13,5"/>
    <polyline points="13,9 13,13 9,13"/>
    <polyline points="5,13 1,13 1,9"/>
  </svg>
);

const PublishIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="9" r="7.5"/>
    <line x1="9" y1="5" x2="9" y2="13"/>
    <polyline points="5,9 9,5 13,9"/>
  </svg>
);

const VerifyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="5.5"/>
    <line x1="12.5" y1="12.5" x2="16" y2="16"/>
  </svg>
);

const DropIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="9" cy="9" r="7.5"/>
    <polyline points="5,9 9,13 13,9"/>
    <line x1="9" y1="5" x2="9" y2="13"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 1L12 11H1L6.5 1z"/>
    <line x1="6.5" y1="5" x2="6.5" y2="7.5"/>
    <circle cx="6.5" cy="9.5" r="0.5" fill="#f59e0b"/>
  </svg>
);

const FlagDotIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="5" cy="5" r="4"/>
    <line x1="5" y1="3" x2="5" y2="5.5"/>
    <circle cx="5" cy="7" r="0.5" fill="#ef4444"/>
  </svg>
);

function SourceIcon({ type }) {
  const t = (type ?? '').toLowerCase();

  if (t.includes('anon') || t.includes('leak') || t.includes('unknown')) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="9" cy="7" r="3.5"/>
        <path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
        <line x1="9" y1="1" x2="9" y2="2.5"/>
        <line x1="14" y1="3" x2="13" y2="4"/>
        <line x1="4" y1="3" x2="5" y2="4"/>
      </svg>
    );
  }
  if (t.includes('social') || t.includes('twitter') || t.includes('watch')) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3.5a7.4 7.4 0 01-2.1.6A3.7 3.7 0 0016.4 2a7.4 7.4 0 01-2.3.9A3.65 3.65 0 009.4 6.3 10.4 10.4 0 011.6 2.4a3.65 3.65 0 001.1 4.9 3.6 3.6 0 01-1.65-.46v.05a3.65 3.65 0 002.93 3.57 3.7 3.7 0 01-1.65.06 3.65 3.65 0 003.41 2.53A7.32 7.32 0 011 14.6a10.37 10.37 0 005.6 1.64c6.73 0 10.41-5.57 10.41-10.4l-.01-.47A7.4 7.4 0 0017 3.5z"/>
      </svg>
    );
  }
  if (t.includes('email') || t.includes('tip')) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="14" height="10" rx="2"/>
        <polyline points="2,4 9,10 16,4"/>
      </svg>
    );
  }
  if (t.includes('official') || t.includes('authority') || t.includes('government')) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="8" width="12" height="7" rx="1"/>
        <path d="M1 8l8-6 8 6"/>
        <line x1="7" y1="15" x2="7" y2="11"/>
        <line x1="11" y1="15" x2="11" y2="11"/>
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="3" y="1.5" width="12" height="15" rx="1.5"/>
      <line x1="6" y1="6" x2="12" y2="6"/>
      <line x1="6" y1="9" x2="12" y2="9"/>
      <line x1="6" y1="12" x2="10" y2="12"/>
    </svg>
  );
}

function VERADonut({ confidence, confidenceType }) {
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const filled = (confidence / 100) * circumference;
  const color = confidenceType === 'high' ? '#22c55e' : confidenceType === 'medium' ? '#f59e0b' : '#3b82f6';

  return (
    <div className="vera-donut">
      <div style={{ position: 'relative', width: 100, height: 100 }}>
        <svg className="vera-donut__svg" width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#e2e8f0" strokeWidth="10" />
          <circle
            cx="50" cy="50" r={r}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={`${filled} ${circumference}`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#1e293b' }}>{confidence}%</span>
        </div>
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginTop: 4 }}>Confidence Score</span>
      <span className={`vera-donut__conf vera-donut__conf--${confidenceType}`}>
        {confidenceType === 'high' ? 'High' : confidenceType === 'medium' ? 'Medium' : 'Low'} Confidence
      </span>
    </div>
  );
}

function MessageScreen({ story, onDecision }) {
  const now = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return createPortal(
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(10, 18, 30, 0.78)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 500,
      padding: '24px 16px',
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: 20,
        width: '100%',
        maxWidth: 390,
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.55)',
        border: '1px solid #cbd5e1',
      }}>

        {/* Header */}
        <div style={{
          background: '#f1f5f9',
          borderBottom: '1px solid #e2e8f0',
          padding: '16px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 11,
            background: '#e2e8f0',
            border: '1px solid #cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <polyline points="2,4 12,13 22,4"/>
            </svg>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', letterSpacing: '-0.01em' }}>
              Silencer
            </div>
          </div>

          <div style={{
            fontSize: 8,
            fontWeight: 800,
            letterSpacing: '0.15em',
            color: '#b45309',
            background: '#fef3c7',
            border: '1px solid #fde68a',
            borderRadius: 5,
            padding: '4px 8px',
            flexShrink: 0,
          }}>
            UNKNOWN NUMBER
          </div>
        </div>


        {/* Body */}
        <div style={{ padding: '20px 20px 24px' }}>

          {/* Timestamp */}
          <div style={{ fontSize: 9, color: '#94a3b8', textAlign: 'center', marginBottom: 14, letterSpacing: '0.06em' }}>
            Today, {now}
          </div>

          {/* Chat bubble */}
          <div style={{
            background: '#f1f5f9',
            borderRadius: '4px 16px 16px 16px',
            overflow: 'hidden',
            marginBottom: 20,
          }}>
            <img
              src={imgMessage}
              alt=""
              style={{ width: '100%', display: 'block', maxHeight: 180, objectFit: 'cover' }}
            />
            <div style={{ padding: '15px 17px' }}>
              <p style={{
                fontSize: 13,
                color: '#1e293b',
                lineHeight: 1.72,
                margin: 0,
                fontStyle: 'italic',
              }}>
                {story.callDescription || story.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, marginTop: 10 }}>
              {/* double-tick read receipt */}
              <svg width="14" height="9" viewBox="0 0 16 10" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1,5 5,9 13,1"/>
                <polyline points="7,5 11,1"/>
              </svg>
              <span style={{ fontSize: 9, color: '#94a3b8', letterSpacing: '0.03em' }}>Read {now}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.16em' }}>YOUR RESPONSE</span>
            <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
          </div>

          {/* Decision buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              onClick={() => onDecision('drop')}
              style={{
                flex: 1,
                background: '#f1f5f9',
                color: '#1e293b',
                border: '1.5px solid #e2e8f0',
                borderRadius: 12,
                padding: '14px 10px',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.12em',
                cursor: 'pointer',
                transition: 'background .15s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#e2e8f0')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#f1f5f9')}
            >
              DECLINE
            </button>
            <button
              type="button"
              onClick={() => onDecision('publish')}
              style={{
                flex: 1,
                background: '#fffbeb',
                color: '#92400e',
                border: '1.5px solid #fde68a',
                borderRadius: 12,
                padding: '14px 10px',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.12em',
                cursor: 'pointer',
                transition: 'background .15s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#fef3c7')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#fffbeb')}
            >
              ACCEPT
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function StoryReview({ story, onDecision, onViewReport, bribeHandled, correctDecisions }) {
  const [playing, setPlaying] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [alexVisible, setAlexVisible] = useState(false);
  const [alexDismissed, setAlexDismissed] = useState(false);
  const [alexBubblePos, setAlexBubblePos] = useState(null);
  const alexCharRef = useRef(null);
  const storyImage = STORY_IMAGES[story.id];

  useEffect(() => {
    if (story.storyType !== 'call' || bribeHandled) { setShowMessage(false); return; }
    setShowMessage(false);
    const id = setTimeout(() => setShowMessage(true), 5000);
    return () => clearTimeout(id);
  }, [story.id, bribeHandled]);

  // Alex quote: skip during the bribe-call phase (MessageScreen covers everything)
  const alexMsg = (() => {
    if (story.storyType === 'call' && !bribeHandled) return null;
    if (!story.alexQuote) return null;
    const threshold = story.level >= 3 ? 2 : 1;
    return (story.alexQuoteIfVerified && correctDecisions >= threshold)
      ? story.alexQuoteIfVerified
      : story.alexQuote;
  })();

  useEffect(() => {
    setAlexVisible(false);
    setAlexDismissed(false);
    if (!alexMsg) return;
    const id = setTimeout(() => {
      if (alexCharRef.current) {
        const rect = alexCharRef.current.getBoundingClientRect();
        setAlexBubblePos({ top: rect.top, left: rect.right + 14 });
      }
      setAlexVisible(true);
    }, 2000);
    return () => clearTimeout(id);
  }, [story.id, bribeHandled]);

  return (
    <>
    <div className="story-review">
      {/* Left character panel */}
      <div className="story-review__left">
        <button className="sr-char" ref={alexCharRef} onClick={() => { if (alexMsg) { setAlexVisible(true); setAlexDismissed(false); } }}>
          <div className="sr-char__avatar sr-char__avatar--alex">
            <img src={alexImg} alt="Alex" />
          </div>
          {alexDismissed && <span className="sr-char__notif">1</span>}
          <span className="sr-char__name">ALEX</span>
          <span className="sr-char__sub">Lead Editor</span>
        </button>


      </div>

      {/* Main content */}
      <div className="story-review__main">

        {/* Top row: text left, video right */}
        <div className="story-top">
          <div className="story-top__text">
            <div className="story-package-label">STORY PACKAGE</div>
            <h2 className="story-review__headline">{story.title || story.headline}</h2>
            <span className={`story-review__status${story.statusType === 'developing' ? ' story-review__status--developing' : ''}`}>
              {story.statusLabel || story.priority}
            </span>
            <p className="story-review__desc">{story.description || story.subheadline}</p>
            <p className="story-review__prompt">{story.prompt || 'What do you want to do?'}</p>
          </div>

          {/* Image / Video player */}
          <div className="story-top__video">
            {story.level === 3 ? (
              <div className="video-player">
                <div className="video-player__scene">
                  {storyImage && (
                    <img src={storyImage} alt={story.title} className="video-player__bg-img" />
                  )}
                  <button className="video-player__play-btn" onClick={() => setPlaying(!playing)} aria-label="Play video">
                    <PlayIcon />
                  </button>
                </div>
                <div className="video-player__controls">
                  <button className="video-player__ctrl-btn" onClick={() => setPlaying(!playing)} aria-label="Play/pause">
                    <PlayIcon />
                  </button>
                  <div className="video-player__timeline">
                    <div className="video-player__progress" />
                  </div>
                  <span className="video-player__time">0:18 / 1:02</span>
                  <div className="video-player__icons">
                    <button className="video-player__ctrl-btn" aria-label="Volume"><VolumeIcon /></button>
                    <button className="video-player__ctrl-btn" aria-label="Fullscreen"><FullscreenIcon /></button>
                  </div>
                </div>
              </div>
            ) : storyImage ? (
              <div style={{ borderRadius: 10, overflow: 'hidden', height: 197 }}>
                <img src={storyImage} alt={story.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ) : null}
          </div>
        </div>

        {/* Sources */}
        {false && <div className="sources-section" style={{display:'none'}}>
          <div className="sources-label">SOURCES ({story.sources.length})</div>
          <div className="source-cards">
            {story.sources.map(src => (
              <div key={src.id} className={`source-card source-card--${src.credType}`}>
                <div className="source-card__top">
                  <div className="source-card__icon-wrap">
                    <SourceIcon type={src.type} />
                  </div>
                  <span className={`source-card__cred-badge source-card__cred-badge--${src.credType}`}>
                    {src.credibility}
                  </span>
                </div>
                <div className="source-card__name">{src.name}</div>
                <div className="source-card__type">{src.handle ?? src.type}</div>
                {src.description && (
                  <div className="source-card__desc">{src.description}</div>
                )}
                <div className="source-card__bar-wrap">
                  <div
                    className={`source-card__bar-fill source-card__bar-fill--${src.credType}`}
                    style={{ width: src.credType === 'very-low' ? '15%' : src.credType === 'low' ? '35%' : src.credType === 'medium' ? '60%' : '90%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>}

        {/* Decision buttons */}
        <div className="decision-buttons">
          <button className="decision-btn decision-btn--publish" onClick={() => onDecision('publish')}>
            <span className="decision-btn__icon"><PublishIcon /></span>
            <span className="decision-btn__text">
              <span className="decision-btn__label">PUBLISH</span>
              <span className="decision-btn__sub">Run this story now</span>
            </span>
          </button>
          <button className="decision-btn decision-btn--verify" onClick={() => story.verifyType ? setShowVerify(true) : onDecision('verify')}>
            <span className="decision-btn__icon"><VerifyIcon /></span>
            <span className="decision-btn__text">
              <span className="decision-btn__label">VERIFY</span>
              <span className="decision-btn__sub">Investigate further</span>
            </span>
          </button>
          <button className="decision-btn decision-btn--drop" onClick={() => onDecision('drop')}>
            <span className="decision-btn__icon"><DropIcon /></span>
            <span className="decision-btn__text">
              <span className="decision-btn__label">DROP</span>
              <span className="decision-btn__sub">Don&apos;t publish</span>
            </span>
          </button>
        </div>
      </div>

      {/* Right VERA panel */}
      <div className="story-review__right">
        {!story.vera ? null : <div className="vera-analysis">
          <div className="vera-analysis__title">VERA ANALYSIS</div>

          <VERADonut
            confidence={story.vera.confidence}
            confidenceType={story.vera.confidenceType}
          />

          <div className="vera-flags">
            <div className="vera-flags__header">
              <WarningIcon />
              INDICATORS DETECTED
            </div>
            {story.vera.redFlags.map((flag, i) => (
              <div key={i} className="vera-flag-item">
                <span className="vera-flag-item__dot"><FlagDotIcon /></span>
                {flag}
              </div>
            ))}
          </div>


        </div>}
      </div>
    </div>

    {alexVisible && !alexDismissed && alexMsg && alexBubblePos && (() => {
      const isPressure = true;
      return (
        <div style={{
          position: 'fixed',
          top: alexBubblePos.top,
          left: alexBubblePos.left,
          zIndex: 300,
          width: 270,
          background: isPressure ? '#fffbf0' : '#ffffff',
          border: isPressure ? '1.5px solid #f59e0b' : '1px solid #e2e8f0',
          borderRadius: 14,
          padding: '13px 14px 13px 16px',
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start',
          animation: isPressure
            ? 'alexPressureIn 0.45s cubic-bezier(.22,.68,0,1.2) both, alexPressureGlow 2s ease-in-out 0.45s infinite'
            : 'alexSlideIn 0.3s cubic-bezier(.22,.68,0,1.2) both',
          boxShadow: isPressure
            ? '0 8px 32px rgba(245,158,11,0.22), 0 0 0 0 rgba(245,158,11,0.45)'
            : '0 8px 32px rgba(0,0,0,0.13)',
        }}>
          {/* Speech bubble arrow */}
          <div style={{
            position: 'absolute', left: -9, top: 18,
            width: 0, height: 0,
            borderTop: '9px solid transparent', borderBottom: '9px solid transparent',
            borderRight: `9px solid ${isPressure ? '#f59e0b' : '#e2e8f0'}`,
          }} />
          <div style={{
            position: 'absolute', left: isPressure ? -6 : -7, top: 18,
            width: 0, height: 0,
            borderTop: '9px solid transparent', borderBottom: '9px solid transparent',
            borderRight: `9px solid ${isPressure ? '#fffbf0' : '#ffffff'}`,
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: isPressure ? '#d97706' : '#94a3b8', letterSpacing: '0.12em', marginBottom: 5 }}>
              ALEX JORDAN
            </div>
            <p style={{ fontSize: 12, color: isPressure ? '#1c1004' : '#1e293b', lineHeight: 1.6, margin: 0, fontStyle: 'italic', fontWeight: isPressure ? 500 : 400 }}>
              "{alexMsg}"
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAlexDismissed(true)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: isPressure ? '#f59e0b' : '#94a3b8', padding: '2px 2px', flexShrink: 0,
              lineHeight: 1, fontSize: 16, fontWeight: 300,
            }}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      );
    })()}

    {showVerify && (
      <VerifyModal
        story={story}
        onDecision={(d) => { setShowVerify(false); onDecision(d); }}
        onClose={() => setShowVerify(false)}
      />
    )}
    {story.storyType === 'call' && showMessage && !bribeHandled && <MessageScreen story={story} onDecision={onDecision} />}
    </>
  );
}