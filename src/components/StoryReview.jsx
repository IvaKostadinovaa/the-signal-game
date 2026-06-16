import { useState, useEffect, useRef } from 'react';
import notificationSfx from '../audio/notification.mp3';
import dealSfx from '../audio/deal.mp3';
import { createPortal } from 'react-dom';
import VerifyModal from './VerifyModal.jsx';
import alexImg from '../images/alex.png';
import imgMessage        from '../images/message.png';
import imgCrimeStats     from '../images/level1_1.png';
import imgSchoolBudget   from '../images/story_2_image.png';
import imgPoliticianQuote from '../images/level1_2.png';
import imgMayorChen      from '../images/level2_1.png';
import imgElectionDocs   from '../images/story_4.png';
import imgLevel3News     from '../images/level3_news.png';
import imgMinisterPhoto  from '../images/story_3_level2.png';

const STORY_IMAGES = {
  'crime-stats':        imgCrimeStats,
  'school-budget-cut':  imgSchoolBudget,
  'politician-quote':   imgPoliticianQuote,
  'mayor-chen-image':   imgMayorChen,
  'election-docs':      imgElectionDocs,
  deepfake:             imgLevel3News,
  'minister-photo':     imgMinisterPhoto,
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
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 1L12 11H1L6.5 1z"/>
    <line x1="6.5" y1="5" x2="6.5" y2="7.5"/>
    <circle cx="6.5" cy="9.5" r="0.5" fill="#d97706"/>
  </svg>
);

const FlagDotIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
    <line x1="2" y1="2" x2="8" y2="8"/>
    <line x1="8" y1="2" x2="2" y2="8"/>
  </svg>
);

const ConfirmedIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2,5.5 4,7.5 8,3"/>
  </svg>
);

const WarnDotIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="5" cy="5" r="4"/>
    <line x1="5" y1="3" x2="5" y2="5.5"/>
    <circle cx="5" cy="7" r="0.5" fill="#f59e0b"/>
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
  const color = '#0a1e28';

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
        {confidenceType === 'high' ? 'High' : confidenceType === 'medium' ? 'Medium' : confidenceType === 'low-medium' ? 'Low-Medium' : 'Low'} Confidence
      </span>
    </div>
  );
}

const HURRY_MESSAGES = [
  'Still there? We need an answer.',
  'Last chance. Yes or no?',
];

function MessageScreen({ story, onDecision, isMutedRef }) {
  const now = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const [hurryCount, setHurryCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [vibrateKey, setVibrateKey] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(dealSfx);
    audio.muted = isMutedRef?.current ?? false;
    audio.play().catch(() => {});
    audioRef.current = audio;
    setTimeout(() => { audio.pause(); }, 1000);
    setVibrateKey(k => k + 1);

    const t1 = setTimeout(() => {
      setHurryCount(1);
      setVibrateKey(k => k + 1);
      const a1 = new Audio(dealSfx);
      a1.muted = isMutedRef?.current ?? false;
      a1.play().catch(() => {});
      setTimeout(() => a1.pause(), 1000);
    }, 5000);
    const r1 = setTimeout(() => setReadCount(c => Math.max(c, 1)), 7500);

    const t2 = setTimeout(() => {
      setHurryCount(2);
      setVibrateKey(k => k + 1);
      const a2 = new Audio(dealSfx);
      a2.muted = isMutedRef?.current ?? false;
      a2.play().catch(() => {});
      setTimeout(() => a2.pause(), 1000);
    }, 9000);
    const r2 = setTimeout(() => setReadCount(c => Math.max(c, 2)), 11500);

    return () => {
      audio.pause();
      clearTimeout(t1);
      clearTimeout(r1);
      clearTimeout(t2);
      clearTimeout(r2);
    };
  }, []);

  function decide(choice) {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    onDecision(choice);
  }

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
      <div key={vibrateKey} style={{ width: '100%', maxWidth: 390, animation: vibrateKey > 0 ? 'phoneVibrate 1s ease-in-out' : 'none' }}>
      <div style={{
        background: '#ffffff',
        borderRadius: 20,
        width: '100%',
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.55)',
        border: '2px solid #fde68a',
        animation: 'phoneSlideUp 0.55s cubic-bezier(.22,.68,0,1.2) both, phonePulse 2s ease-in-out 0.6s infinite',
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
              style={{ width: '100%', display: 'block', maxHeight: 180, objectFit: 'cover', objectPosition: 'left center' }}
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

          {/* Hurry-up follow-up bubbles */}
          {hurryCount >= 1 && (
            <>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                overflow: 'hidden',
                maxHeight: readCount >= 1 ? 0 : 40,
                opacity: readCount >= 1 ? 0 : 1,
                margin: readCount >= 1 ? '0' : '10px 0 8px',
                animation: 'phoneSlideUp 0.25s ease both',
                transition: 'opacity 0.5s ease, max-height 0.5s ease, margin 0.5s ease',
              }}>
                <div style={{ flex: 1, height: 1, background: '#fde68a' }} />
                <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.15em', color: '#b45309' }}>
                  NEW MESSAGE
                </span>
                <div style={{ flex: 1, height: 1, background: '#fde68a' }} />
              </div>
              <div style={{
                background: readCount >= 1 ? '#f1f5f9' : '#1e293b',
                borderRadius: '4px 16px 16px 16px',
                padding: '10px 14px',
                marginBottom: 10,
                fontSize: 13,
                color: readCount >= 1 ? '#1e293b' : '#f8fafc',
                fontStyle: 'italic',
                lineHeight: 1.6,
                animation: 'phoneSlideUp 0.3s ease both',
                transition: 'background 0.5s ease, color 0.5s ease',
              }}>
                {HURRY_MESSAGES[0]}
                {readCount >= 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, marginTop: 6 }}>
                    <svg width="14" height="9" viewBox="0 0 16 10" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1,5 5,9 13,1"/><polyline points="7,5 11,1"/>
                    </svg>
                    <span style={{ fontSize: 9, color: '#94a3b8', letterSpacing: '0.03em' }}>Read {now}</span>
                  </div>
                )}
              </div>
            </>
          )}
          {hurryCount >= 2 && (
            <>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                overflow: 'hidden',
                maxHeight: readCount >= 2 ? 0 : 40,
                opacity: readCount >= 2 ? 0 : 1,
                margin: readCount >= 2 ? '0' : '6px 0 8px',
                animation: 'phoneSlideUp 0.25s ease both',
                transition: 'opacity 0.5s ease, max-height 0.5s ease, margin 0.5s ease',
              }}>
                <div style={{ flex: 1, height: 1, background: '#fde68a' }} />
                <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.15em', color: '#b45309' }}>
                  NEW MESSAGE
                </span>
                <div style={{ flex: 1, height: 1, background: '#fde68a' }} />
              </div>
              <div style={{
                background: readCount >= 2 ? '#f1f5f9' : '#1e293b',
                borderRadius: '4px 16px 16px 16px',
                padding: '10px 14px',
                marginBottom: 10,
                fontSize: 13,
                color: readCount >= 2 ? '#1e293b' : '#f8fafc',
                fontStyle: 'italic',
                lineHeight: 1.6,
                animation: 'phoneSlideUp 0.3s ease both',
                transition: 'background 0.5s ease, color 0.5s ease',
              }}>
                {HURRY_MESSAGES[1]}
                {readCount >= 2 && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, marginTop: 6 }}>
                    <svg width="14" height="9" viewBox="0 0 16 10" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1,5 5,9 13,1"/><polyline points="7,5 11,1"/>
                    </svg>
                    <span style={{ fontSize: 9, color: '#94a3b8', letterSpacing: '0.03em' }}>Read {now}</span>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, marginTop: 10 }}>
            <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.16em' }}>YOUR RESPONSE</span>
            <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
          </div>

          {/* Decision buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              onClick={() => decide('drop')}
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
              onClick={() => decide('publish')}
              style={{
                flex: 1,
                background: '#0a1e28',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '14px 10px',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.12em',
                cursor: 'pointer',
                transition: 'opacity .15s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.88')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              ACCEPT
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>,
    document.body
  );
}

export default function StoryReview({ story, onDecision, onVerified, onViewReport, bribeHandled, correctDecisions, earnedBadges = {}, isMuted }) {
  const [playing, setPlaying] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [hasVerified, setHasVerified] = useState(false);
  const [alexVisible, setAlexVisible] = useState(false);
  const [alexDismissed, setAlexDismissed] = useState(false);
  const [alexMsg2Visible, setAlexMsg2Visible] = useState(false);
  const [alexMsg3Visible, setAlexMsg3Visible] = useState(false);
  const [alexShowAll, setAlexShowAll] = useState(false);
  const [alexBubblePos, setAlexBubblePos] = useState(null);
  const alexCharRef = useRef(null);
  const callTimeoutRef = useRef(null);
  const isMutedRef = useRef(isMuted);
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);
  const storyImage = STORY_IMAGES[story.id];

  useEffect(() => {
    setHasVerified(false);
    setAlexMsg2Visible(false);
    setAlexMsg3Visible(false);
    setAlexShowAll(false);
  }, [story.id]);

  useEffect(() => {
    if (story.storyType !== 'call' || bribeHandled) { setShowMessage(false); return; }
    setShowMessage(false);
    callTimeoutRef.current = setTimeout(() => setShowMessage(true), 5000);
    return () => clearTimeout(callTimeoutRef.current);
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
    setAlexMsg2Visible(false);
    if (!alexMsg) return;
    const id = setTimeout(() => {
      if (alexCharRef.current) {
        const rect = alexCharRef.current.getBoundingClientRect();
        setAlexBubblePos({ top: rect.top, left: rect.right + 14 });
      }
      setAlexVisible(true);
      const n = new Audio(notificationSfx); n.muted = isMutedRef.current; n.play().catch(() => {});
    }, 2000);
    let id2, id3;
    if (story.alexFollowUpQuote) {
      id2 = setTimeout(() => {
        setAlexMsg2Visible(true);
        setAlexVisible(true);
        setAlexDismissed(false);
        const n2 = new Audio(notificationSfx); n2.muted = isMutedRef.current; n2.play().catch(() => {});
      }, 10000);
    }
    if (story.alexFollowUpQuote2) {
      id3 = setTimeout(() => {
        setAlexMsg3Visible(true);
        setAlexVisible(true);
        setAlexDismissed(false);
        const n3 = new Audio(notificationSfx); n3.muted = isMutedRef.current; n3.play().catch(() => {});
      }, 18000);
    }
    return () => { clearTimeout(id); clearTimeout(id2); clearTimeout(id3); };
  }, [story.id, bribeHandled]);

  return (
    <>
    <div className="story-review">
      {/* Left character panel */}
      <div className="story-review__left">
        <button className="sr-char" ref={alexCharRef} onClick={() => { if (alexMsg) { setAlexVisible(true); setAlexDismissed(false); setAlexShowAll(true); } }}>
          <div className="sr-char__avatar sr-char__avatar--alex">
            <img src={alexImg} alt="Alex" />
          </div>
          {alexDismissed && <span className="sr-char__notif">{alexMsg3Visible ? '3' : alexMsg2Visible ? '2' : '1'}</span>}
          <span className="sr-char__name">ALEX</span>
          <span className="sr-char__sub">Lead Editor</span>
        </button>

        {/* Earned badges */}
        {(earnedBadges.trust || earnedBadges.speed || earnedBadges.verified) && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginTop: 20 }}>
            <div style={{ width: '100%', height: 1, background: '#e2e8f0', marginBottom: 2 }} />
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.18em', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4 }}>Earned Badges</div>
            {earnedBadges.trust && (
              <div className="sr-badge" title="The Public's Trust" style={{ flexDirection: 'column', gap: 3 }}>
                <svg width="54" height="60" viewBox="0 0 90 100" fill="none">
                  <defs>
                    <linearGradient id="sGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4ade80" />
                      <stop offset="100%" stopColor="#16a34a" />
                    </linearGradient>
                    <linearGradient id="sBorder" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fde68a" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                  <path d="M45 4 L82 18 L82 50 C82 72 64 88 45 96 C26 88 8 72 8 50 L8 18 Z" fill="url(#sBorder)" />
                  <path d="M45 10 L76 22 L76 50 C76 69 60 83 45 90 C30 83 14 69 14 50 L14 22 Z" fill="url(#sGrad)" />
                  <polyline points="30,50 40,62 62,38" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.14em', color: '#16a34a', textTransform: 'uppercase' }}>Trust</span>
              </div>
            )}
            {earnedBadges.speed && (
              <div className="sr-badge" title="Breaking First" style={{ flexDirection: 'column', gap: 3 }}>
                <svg width="54" height="60" viewBox="0 0 90 100" fill="none">
                  <defs>
                    <linearGradient id="bGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fcd34d" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <linearGradient id="bBorder" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fef9c3" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  <path d="M45 4 L82 18 L82 50 C82 72 64 88 45 96 C26 88 8 72 8 50 L8 18 Z" fill="url(#bBorder)" />
                  <path d="M45 10 L76 22 L76 50 C76 69 60 83 45 90 C30 83 14 69 14 50 L14 22 Z" fill="url(#bGrad)" />
                  <polygon points="50,28 34,54 44,54 40,72 56,46 46,46" fill="white" opacity="0.95" />
                </svg>
                <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.14em', color: '#d97706', textTransform: 'uppercase' }}>Speed</span>
              </div>
            )}
            {earnedBadges.verified && (
              <div className="sr-badge" title="Verified" style={{ flexDirection: 'column', gap: 3 }}>
                <svg width="54" height="60" viewBox="0 0 90 100" fill="none">
                  <defs>
                    <linearGradient id="vGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0369a1" />
                    </linearGradient>
                    <linearGradient id="vBorder" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fde68a" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                  <path d="M45 4 L82 18 L82 50 C82 72 64 88 45 96 C26 88 8 72 8 50 L8 18 Z" fill="url(#vBorder)" />
                  <path d="M45 10 L76 22 L76 50 C76 69 60 83 45 90 C30 83 14 69 14 50 L14 22 Z" fill="url(#vGrad)" />
                  <circle cx="41" cy="47" r="11" stroke="white" strokeWidth="4.5" fill="none" opacity="0.95" />
                  <line x1="49" y1="56" x2="59" y2="66" stroke="white" strokeWidth="4.5" strokeLinecap="round" opacity="0.95" />
                  <polyline points="35,47 40,53 48,41" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
                </svg>
                <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.14em', color: '#0369a1', textTransform: 'uppercase' }}>Verified</span>
              </div>
            )}
          </div>
        )}
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
            {story.paragraphs
              ? story.paragraphs.map((p, i) => <p key={i} className="story-review__desc">{p}</p>)
              : <p className="story-review__desc">{story.description || story.subheadline}</p>
            }
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
              <div style={{ borderRadius: 10, overflow: 'hidden', height: story.id === 'election-docs' ? 385 : story.id === 'mayor-chen-image' ? 'auto' : 197, margin: undefined, clipPath: story.id === 'mayor-chen-image' ? 'inset(1px 0 2px 2px)' : undefined }}>
                <img
                  src={storyImage}
                  alt={story.title}
                  style={{
                    width: '100%',
                    height: story.id === 'mayor-chen-image' ? 'auto' : '100%',
                    objectFit: (story.id === 'election-docs' || story.id === 'mayor-chen-image') ? 'contain' : 'cover',
                    display: 'block',
                  }}
                />
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
        {hasVerified && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', margin: '0 0 6px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8 }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="2,7 5,10 11,3"/></svg>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#16a34a', letterSpacing: '0.06em' }}>VERIFIED - now decide what to do</span>
          </div>
        )}
        <div className="decision-buttons">
          <button className="decision-btn decision-btn--publish" onClick={() => {
            const skipCall = story.storyType === 'call' && !bribeHandled && !showMessage;
            if (skipCall) clearTimeout(callTimeoutRef.current);
            onDecision(hasVerified ? 'verify' : 'publish', false, skipCall);
          }}>
            <span className="decision-btn__icon"><PublishIcon /></span>
            <span className="decision-btn__text">
              <span className="decision-btn__label">PUBLISH</span>
              <span className="decision-btn__sub">{hasVerified ? 'Publish verified story' : 'Run this story now'}</span>
            </span>
          </button>
          {!hasVerified && (
            <button className="decision-btn decision-btn--verify" onClick={() => {
              story.verifyType ? setShowVerify(true) : onDecision('verify');
            }}>
              <span className="decision-btn__icon"><VerifyIcon /></span>
              <span className="decision-btn__text">
                <span className="decision-btn__label">VERIFY</span>
                <span className="decision-btn__sub">Investigate further</span>
              </span>
            </button>
          )}
          <button className="decision-btn decision-btn--drop" onClick={() => {
            const skipCall = story.storyType === 'call' && !bribeHandled && !showMessage;
            if (skipCall) clearTimeout(callTimeoutRef.current);
            onDecision('drop', hasVerified, skipCall);
          }}>
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
            {(story.vera.indicators
              ? story.vera.indicators
              : story.vera.redFlags.map(f => ({ type: 'flag', text: f }))
            ).map((indicator, i) => (
              <div key={i} className={`vera-flag-item${indicator.type === 'confirmed' ? ' vera-flag-item--confirmed' : indicator.type === 'warning' ? ' vera-flag-item--warning' : ''}`}>
                <span className="vera-flag-item__dot">
                  {indicator.type === 'confirmed' ? <ConfirmedIcon /> : indicator.type === 'warning' ? <WarnDotIcon /> : <FlagDotIcon />}
                </span>
                {indicator.text}
              </div>
            ))}
          </div>


        </div>}
      </div>
    </div>

    {/* Mobile-only: Messenger-style floating Alex circle */}
    {alexMsg && (
      <div className="alex-messenger">
        {alexVisible && !alexDismissed && (
          <div className="alex-messenger__bubble">
            <div className="alex-messenger__name">ALEX</div>
            <p
              key={alexMsg3Visible ? 'msg3' : alexMsg2Visible ? 'msg2' : 'msg1'}
              className="alex-messenger__text"
              style={{ animation: 'alexSlideIn 0.3s ease both' }}
            >
              &ldquo;{alexMsg3Visible && story.alexFollowUpQuote2 ? story.alexFollowUpQuote2 : alexMsg2Visible && story.alexFollowUpQuote ? story.alexFollowUpQuote : alexMsg}&rdquo;
            </p>
            <button
              className="alex-messenger__close"
              onClick={() => { setAlexDismissed(true); setAlexShowAll(false); }}
              aria-label="Dismiss"
            >×</button>
          </div>
        )}
        <div className="alex-messenger__avatar-wrap">
          <button
            className="alex-messenger__avatar"
            onClick={() => { setAlexVisible(true); setAlexDismissed(false); }}
            aria-label="Alex"
          >
            <img src={alexImg} alt="Alex" />
          </button>
          {alexDismissed && <span className="alex-messenger__badge">{alexMsg3Visible ? '3' : alexMsg2Visible ? '2' : '1'}</span>}
        </div>
      </div>
    )}

    {alexVisible && !alexDismissed && alexMsg && alexBubblePos && (() => {
      const dismiss = () => { setAlexDismissed(true); setAlexShowAll(false); };
      const allMsgs = [
        alexMsg,
        alexMsg2Visible && story.alexFollowUpQuote ? story.alexFollowUpQuote : null,
        alexMsg3Visible && story.alexFollowUpQuote2 ? story.alexFollowUpQuote2 : null,
      ].filter(Boolean);

      if (alexShowAll) {
        return (
          <div style={{
            position: 'fixed',
            top: alexBubblePos.top - 10,
            left: alexBubblePos.left,
            zIndex: 300,
            width: 300,
            background: '#ffffff',
            borderRadius: 16,
            boxShadow: '0 16px 56px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.07)',
            overflow: 'hidden',
            animation: 'alexSlideIn 0.35s cubic-bezier(.22,.68,0,1.2) both',
          }}>
            {/* Header */}
            <div style={{
              background: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              padding: '11px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <img src={alexImg} alt="Alex" style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#1e293b', letterSpacing: '0.04em' }}>Alex</div>
                <div style={{ fontSize: 10, color: '#64748b', marginTop: 1 }}>Lead Editor</div>
              </div>
              <button
                type="button"
                onClick={dismiss}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 18, lineHeight: 1, padding: '2px 4px', flexShrink: 0 }}
                aria-label="Dismiss"
              >×</button>
            </div>
            {/* Message thread */}
            <div style={{ padding: '14px 14px 16px', display: 'flex', flexDirection: 'column', gap: 7 }}>
              {allMsgs.map((msg, i) => (
                <div key={i} style={{
                  background: '#f1f5f9',
                  borderRadius: i === 0 ? '4px 14px 14px 14px' : '14px 14px 14px 4px',
                  padding: '9px 13px',
                  fontSize: 13,
                  color: '#1e293b',
                  fontStyle: 'italic',
                  lineHeight: 1.65,
                }}>
                  &ldquo;{msg}&rdquo;
                </div>
              ))}
            </div>
          </div>
        );
      }

      const isPressure = true;
      const latestMsg = alexMsg3Visible && story.alexFollowUpQuote2 ? story.alexFollowUpQuote2
        : alexMsg2Visible && story.alexFollowUpQuote ? story.alexFollowUpQuote
        : alexMsg;
      return (
        <div className="alex-bubble" style={{
          position: 'fixed',
          top: alexBubblePos.top,
          left: alexBubblePos.left,
          zIndex: 300,
          width: 270,
          background: '#fffbf0',
          border: '1.5px solid #fde68a',
          borderRadius: 14,
          padding: '13px 14px 13px 16px',
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start',
          animation: 'alexPressureIn 0.45s cubic-bezier(.22,.68,0,1.2) both, alexPressureGlow 2s ease-in-out 0.45s infinite',
          boxShadow: '0 8px 32px rgba(245,158,11,0.22)',
        }}>
          <div className="alex-bubble__arrow" style={{
            position: 'absolute', left: -9, top: 18,
            width: 0, height: 0,
            borderTop: '9px solid transparent', borderBottom: '9px solid transparent',
            borderRight: '9px solid #fde68a',
          }} />
          <div className="alex-bubble__arrow" style={{
            position: 'absolute', left: -6, top: 18,
            width: 0, height: 0,
            borderTop: '9px solid transparent', borderBottom: '9px solid transparent',
            borderRight: '9px solid #fffbf0',
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#d97706', letterSpacing: '0.12em', marginBottom: 5 }}>
              ALEX
            </div>
            <p
              key={alexMsg3Visible ? 'msg3' : alexMsg2Visible ? 'msg2' : 'msg1'}
              style={{ fontSize: 15, color: '#1c1004', lineHeight: 1.6, margin: 0, fontStyle: 'italic', fontWeight: 500, animation: 'alexSlideIn 0.35s cubic-bezier(.22,.68,0,1.2) both' }}
            >
              &ldquo;{latestMsg}&rdquo;
            </p>
          </div>
          <button
            type="button"
            onClick={dismiss}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f59e0b', padding: '2px 2px', flexShrink: 0, lineHeight: 1, fontSize: 16, fontWeight: 300 }}
            aria-label="Dismiss"
          >×</button>
        </div>
      );
    })()}

    {showVerify && (
      <VerifyModal
        story={story}
        onDecision={(d) => { setShowVerify(false); onDecision(d, true); }}
        onClose={() => { setShowVerify(false); setHasVerified(true); if (onVerified) onVerified(); }}
      />
    )}
    {story.storyType === 'call' && showMessage && !bribeHandled && <MessageScreen story={story} onDecision={(d) => { setShowMessage(false); onDecision(d); }} isMutedRef={isMutedRef} />}
    </>
  );
}