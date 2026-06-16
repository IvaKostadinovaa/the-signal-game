import { useReducer, useState, useEffect, useRef } from 'react';
import clockSfx from './audio/clock.mp3';
import backgroundSfx from './audio/background.mp3';
import { useNavigate } from 'react-router-dom';
import { stories as ALL_STORIES, CHARACTERS, LEVELS, LEVEL_STORIES } from './game/gameData.js';
import MetricsBar from './components/MetricsBar.jsx';
import LevelSelect from './components/LevelSelect.jsx';
import StoryReview from './components/StoryReview.jsx';
import ConsequenceScreen from './components/ConsequenceScreen.jsx';
import CharactersModal from './components/CharactersModal.jsx';
import VERAReportModal from './components/VERAReportModal.jsx';
import EndingScreen from './components/EndingScreen.jsx';
import SplashScreen from './components/SplashScreen.jsx';
import HowToPlay from './components/HowToPlay.jsx';
import TimeoutModal from './components/TimeoutModal.jsx';
import TrustAchievementModal from './components/TrustAchievementModal.jsx';
import SpeedAchievementModal from './components/SpeedAchievementModal.jsx';
import VerifiedAchievementModal from './components/VerifiedAchievementModal.jsx';
import './styles/game.css';

const GAME_TICKER_ITEMS = [
  '● BREAKING NEWS',
  '● FAKE REPORT SPREADS ONLINE',
  '● MEDIA LITERACY UNDER THREAT',
  '● DISINFORMATION CAMPAIGN DETECTED',
  '● SOURCES UNVERIFIED',
  '● TRUST IN MEDIA AT ALL-TIME LOW',
  '● BREAKING NEWS',
];

const clamp = (v) => Math.max(0, Math.min(100, v));

const NF_STATUS_CONFIG = {
  'not-published':   { bg: '#f8fafc', border: '#e2e8f0', text: '#64748b', badgeBg: '#e2e8f0', badgeText: '#475569', label: 'Not published' },
  'same-story':      { bg: '#fffbeb', border: '#fde68a', text: '#92400e', badgeBg: '#fef3c7', badgeText: '#92400e', label: 'Published · same story' },
  'different-angle': { bg: '#fff7ed', border: '#fed7aa', text: '#9a3412', badgeBg: '#ffedd5', badgeText: '#9a3412', label: 'Published · different angle' },
  'named-silent':    { bg: '#fff1f2', border: '#fecdd3', text: '#991b1b', badgeBg: '#fee2e2', badgeText: '#991b1b', label: 'The Signal silent' },
};

function NewsFirstTicker({ newsfirst, headline }) {
  const cfg = NF_STATUS_CONFIG[newsfirst.status] || NF_STATUS_CONFIG['not-published'];
  return (
    <div className="newsfirst-ticker" style={{ background: cfg.bg, borderBottom: `1px solid ${cfg.border}` }}>
      <span className="newsfirst-ticker__brand">NEWSFIRST</span>
      <span className="newsfirst-ticker__headline">{headline}</span>
      <div className="newsfirst-ticker__right">
        {newsfirst.time && (
          <span className="newsfirst-ticker__time" style={{ color: cfg.text }}>{newsfirst.time}</span>
        )}
        <span className="newsfirst-ticker__badge" style={{ background: cfg.badgeBg, color: cfg.badgeText }}>
          {cfg.label}
          {newsfirst.shares && <> · {newsfirst.shares.toLocaleString()} shares</>}
        </span>
        {newsfirst.speedPenalty && (
          <span className="newsfirst-ticker__penalty">Speed {newsfirst.speedPenalty}</span>
        )}
      </div>
    </div>
  );
}

const initialState = {
  view: 'splash',
  currentLevel: 1,
  currentStoryIndex: 0,
  selectedStoryId: null,
  levelProgress: { 1: 'active', 2: 'locked', 3: 'locked' },
  lastOutcome: null,
  lastDeltas: null,
  actionId: 0,
  showVERAReport: false,
  showCharacters: false,
  postBribeReturnToStory: false,
  bribeAccepted: false,
  lawsuitEnding: false,
  bribeHandled: false,
  correctDecisions: 0,
  verifyCount: 0,
  meters: { trust: 0, speed: 0, legalRisk: 0, audienceReach: 0 },
  xp: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'PLAY':
      return { ...state, view: 'levelSelect' };

    case 'SELECT_LEVEL': {
      const storyId = LEVEL_STORIES[action.levelId]?.[0];
      return {
        ...state,
        view: 'storyReview',
        currentLevel: action.levelId,
        currentStoryIndex: 0,
        selectedStoryId: storyId,
        lastOutcome: null,
        lastDeltas: null,
      };
    }

    case 'MAKE_DECISION': {
      const story = ALL_STORIES.find((s) => s.id === state.selectedStoryId);
      if (!story) return state;
      const isCallPhase = !action.skipCallPhase && !state.bribeHandled && !!story.callConsequences;
      const d = (isCallPhase ? story.callDeltas : story.deltas)?.[action.decision] || {};
      const outcome = (isCallPhase ? story.callConsequences : story.consequences)?.[action.decision] || null;
      const isCorrect = !!outcome?.correct;

      // Speed: time-based (0–20 pts), plus verify costs speed (intentionally slower)
      const initialTime = action.initialTime || story.initialTime || 1;
      const timeRatio = action.timed ? 0 : Math.max(0, Math.min(1, (action.timeLeft || 0) / initialTime));
      const isVerify = !isCallPhase && action.decision === 'verify';
      const speedDelta = action.timed ? -20 :
        isVerify ? (d.speed || -8) : Math.round(timeRatio * 20);

      // Correct decisions always give +trust (min +5) and never increase legalRisk
      const trustDelta = isCorrect ? Math.max(d.trust || 0, 15) : (d.trust || 0);
      const rawLegalDelta = (isCorrect || action.decision === 'drop') ? 0 : Math.max(d.legalRisk || 0, 5);
      const legalDelta = state.currentLevel === 1 ? 0 : rawLegalDelta;

      const isBribeDecline = isCallPhase && action.decision === 'drop';
      const isBribeAccept  = isCallPhase && action.decision !== 'drop';
      // Bribe accepted → legal risk spikes to 100 immediately, show real delta
      const finalLegalRisk = isBribeAccept ? 100 : clamp(state.meters.legalRisk + legalDelta);
      const displayLegalDelta = isBribeAccept ? (100 - state.meters.legalRisk) : legalDelta;
      return {
        ...state,
        view: 'consequence',
        showVERAReport: false,
        lastOutcome: outcome,
        lastDeltas: { ...d, trust: trustDelta, legalRisk: displayLegalDelta, speed: speedDelta },
        actionId: state.actionId + 1,
        postBribeReturnToStory: isBribeDecline,
        bribeAccepted: isBribeAccept,
        bribeHandled: state.bribeHandled || action.skipCallPhase || false,
        xp: state.xp + (isCorrect ? 80 : 20),
        correctDecisions: state.correctDecisions + (isCorrect ? 1 : 0),
        verifyCount: state.verifyCount + (!isCallPhase && (action.decision === 'verify' || action.verified) ? 1 : 0),
        meters: {
          trust: clamp(state.meters.trust + trustDelta),
          speed: clamp(state.meters.speed + speedDelta),
          legalRisk: finalLegalRisk,
          audienceReach: clamp(state.meters.audienceReach + (d.audienceReach || 0)),
        },
      };
    }

    case 'STORY_VERIFIED':
      return { ...state };

    case 'NEXT': {
      if (state.bribeAccepted) {
        return { ...state, view: 'ending', bribeAccepted: false, lawsuitEnding: true };
      }
      if (state.meters.legalRisk >= 100) {
        return { ...state, view: 'ending' };
      }
      if (state.postBribeReturnToStory) {
        return {
          ...state,
          view: 'storyReview',
          postBribeReturnToStory: false,
          bribeHandled: true,
          lastOutcome: null,
          lastDeltas: null,
        };
      }
      const storiesInLevel = LEVEL_STORIES[state.currentLevel] || [];
      const nextIndex = state.currentStoryIndex + 1;
      if (nextIndex < storiesInLevel.length) {
        return {
          ...state,
          view: 'storyReview',
          currentStoryIndex: nextIndex,
          selectedStoryId: storiesInLevel[nextIndex],
          bribeHandled: false,
          lastOutcome: null,
          lastDeltas: null,
        };
      }
      // Level complete — unlock next or show ending
      const done = state.currentLevel;
      const next = done + 1;
      const totalLevels = Object.keys(LEVEL_STORIES).length;
      const newProg = { ...state.levelProgress, [done]: 'completed' };
      if (newProg[next] === 'locked') newProg[next] = 'active';
      return {
        ...state,
        view: done >= totalLevels ? 'ending' : 'levelSelect',
        currentStoryIndex: 0,
        selectedStoryId: null,
        levelProgress: newProg,
        lastOutcome: null,
        lastDeltas: null,
      };
    }

    case 'NAVIGATE':
      return { ...state, view: action.view };

    case 'RESET_TO_MENU':
      return { ...initialState, view: 'splash' };

    case 'LOAD_SAVE':
      return {
        ...initialState,
        ...action.save,
        view: 'levelSelect',
      };

    case 'SHOW_VERA_REPORT':
      return { ...state, showVERAReport: true };
    case 'HIDE_VERA_REPORT':
      return { ...state, showVERAReport: false };
    case 'SHOW_CHARACTERS':
      return { ...state, showCharacters: true };
    case 'HIDE_CHARACTERS':
      return { ...state, showCharacters: false };

    case 'RESTART':
      return { ...initialState, view: 'levelSelect' };

    default:
      return state;
  }
}

const VIEW_TO_PATH = {
  splash:      '/',
  levelSelect: '/levels',
  storyReview: '/play',
  consequence: '/play',
  ending:      '/ending',
};

const SAVE_KEY = 'the_signal_save';

function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function writeSave(state) {
  const save = {
    levelProgress: state.levelProgress,
    currentLevel: state.currentLevel,
    meters: state.meters,
    xp: state.xp,
    decisions: state.decisions,
    badges: state.badges,
    correctDecisions: state.correctDecisions,
    verifyCount: state.verifyCount,
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hasSave, setHasSave] = useState(() => !!loadSave());
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const path = VIEW_TO_PATH[state.view];
    if (path && window.location.pathname !== path) {
      navigate(path, { replace: false });
    }
  }, [state.view]);

  useEffect(() => {
    if (state.view === 'levelSelect') {
      writeSave(state);
      setHasSave(true);
    }
  }, [state.view, state.levelProgress]);

  const selectedStory = ALL_STORIES.find((s) => s.id === state.selectedStoryId) ?? null;

  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const [earnedTrustBadge, setEarnedTrustBadge] = useState(false);
  const [earnedSpeedBadge, setEarnedSpeedBadge] = useState(false);
  const [earnedVerifiedBadge, setEarnedVerifiedBadge] = useState(false);
  const [showTrustModal, setShowTrustModal] = useState(false);
  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const [showVerifiedModal, setShowVerifiedModal] = useState(false);
  const pendingBadgesRef = useRef([]);
  const postConsequencePending = useRef(false);
  const trustAchievementShown = useRef(false);
  const speedAchievementShown = useRef(false);
  const verifiedAchievementShown = useRef(false);
  const clockAudioRef = useRef(null);
  const bgAudioRef = useRef(null);
  const [deltaParticles, setDeltaParticles] = useState([]);
  const [metricFlash, setMetricFlash] = useState({});
  const particleIdRef = useRef(0);

  useEffect(() => {
    if (state.view === 'splash') {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current = null;
      }
      return;
    }
    if (!bgAudioRef.current) {
      const audio = new Audio(backgroundSfx);
      audio.loop = true;
      audio.volume = 0.3;
      audio.muted = isMutedRef.current;
      audio.play().catch(() => {});
      bgAudioRef.current = audio;
    }
  }, [state.view]);

  useEffect(() => {
    if (timeLeft === 5) {
      const audio = new Audio(clockSfx);
      audio.loop = true;
      audio.muted = isMutedRef.current;
      audio.play().catch(() => {});
      clockAudioRef.current = audio;
    } else if (state.view !== 'storyReview') {
      if (clockAudioRef.current) {
        clockAudioRef.current.pause();
        clockAudioRef.current = null;
      }
    }
  }, [timeLeft, state.view]);

  useEffect(() => {
    setTimedOut(false);
    if (state.view !== 'storyReview' || !selectedStory?.initialTime) {
      setTimeLeft(0);
      return;
    }
    setTimeLeft(selectedStory.initialTime);
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          setTimedOut(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [state.view, state.selectedStoryId]);

  useEffect(() => {
    if (state.meters.trust > 70 && !trustAchievementShown.current) {
      trustAchievementShown.current = true;
      pendingBadgesRef.current.push('trust');
    }
  }, [state.meters.trust]);

  useEffect(() => {
    if (state.meters.speed > 70 && state.meters.trust > 70 && !speedAchievementShown.current) {
      speedAchievementShown.current = true;
      pendingBadgesRef.current.push('speed');
    }
  }, [state.meters.speed, state.meters.trust]);

  useEffect(() => {
    if (state.verifyCount >= 2 && !verifiedAchievementShown.current) {
      verifiedAchievementShown.current = true;
      pendingBadgesRef.current.push('verified');
    }
  }, [state.verifyCount]);

  useEffect(() => {
    setDeltaParticles([]);
    setMetricFlash({});
  }, [state.selectedStoryId]);

  useEffect(() => {
    if (!state.lastDeltas || state.actionId === 0) return;
    const d = state.lastDeltas;

    const particles = [];
    const flash = {};
    if (d.trust > 0) {
      particles.push({ id: ++particleIdRef.current, metric: 'trust', delta: d.trust, neg: false });
      flash.trust = true;
    } else if (d.trust < 0) {
      particles.push({ id: ++particleIdRef.current, metric: 'trust', delta: d.trust, neg: true });
    }
    if (d.speed > 0) {
      particles.push({ id: ++particleIdRef.current, metric: 'speed', delta: d.speed, neg: false });
      flash.speed = true;
    } else if (d.speed < 0) {
      particles.push({ id: ++particleIdRef.current, metric: 'speed', delta: d.speed, neg: true });
    }
    if (d.legalRisk > 0) {
      particles.push({ id: ++particleIdRef.current, metric: 'legalRisk', delta: d.legalRisk, neg: false });
    } else if (d.legalRisk < 0) {
      particles.push({ id: ++particleIdRef.current, metric: 'legalRisk', delta: d.legalRisk, neg: true });
    }
    if (particles.length === 0) return;

    setDeltaParticles(p => [...p, ...particles]);
    setMetricFlash(flash);
    const ids = new Set(particles.map(p => p.id));
    const t1 = setTimeout(() => setDeltaParticles(p => p.filter(x => !ids.has(x.id))), 1600);
    const t2 = setTimeout(() => setMetricFlash({}), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [state.actionId]);

  function drainBadgesOrNext() {
    const badge = pendingBadgesRef.current.shift();
    if (!badge) {
      postConsequencePending.current = false;
      dispatch({ type: 'NEXT' });
      return;
    }
    if (badge === 'trust') {
      setShowTrustModal(true);
      setTimeout(() => setEarnedTrustBadge(true), 1000);
    } else if (badge === 'speed') {
      setShowSpeedModal(true);
      setTimeout(() => setEarnedSpeedBadge(true), 1000);
    } else if (badge === 'verified') {
      setShowVerifiedModal(true);
      setTimeout(() => setEarnedVerifiedBadge(true), 1000);
    }
  }

  const levelsWithStatus = LEVELS.map((l) => ({
    ...l,
    status: state.levelProgress[l.id] || 'locked',
  }));


  if (state.view === 'splash') {
    return (
      <>
        <SplashScreen
          hasSave={hasSave}
          onPlay={() => { clearSave(); setHasSave(false); dispatch({ type: 'PLAY' }); }}
          onContinue={() => {
            const save = loadSave();
            if (save) dispatch({ type: 'LOAD_SAVE', save });
          }}
          onHowToPlay={() => setShowHowToPlay(true)}
        />
        {showHowToPlay && <HowToPlay onClose={() => setShowHowToPlay(false)} />}
      </>
    );
  }

  if (state.view === 'ending') {
    return (
      <EndingScreen
        meters={state.meters}
        xp={state.xp}
        lawsuitEnding={state.lawsuitEnding}
        onRestart={() => {
          dispatch({ type: 'RESTART' });
          trustAchievementShown.current = false;
          speedAchievementShown.current = false;
          verifiedAchievementShown.current = false;
          setEarnedTrustBadge(false);
          setEarnedSpeedBadge(false);
          setEarnedVerifiedBadge(false);
          setShowTrustModal(false);
          setShowSpeedModal(false);
          setShowVerifiedModal(false);
          postConsequencePending.current = false;
          pendingBadgesRef.current = [];
        }}
        onMainMenu={() => dispatch({ type: 'RESET_TO_MENU' })}
        earnedBadges={{ trust: earnedTrustBadge, speed: earnedSpeedBadge, verified: earnedVerifiedBadge }}
      />
    );
  }

  if (state.view === 'levelSelect') {
    return (
      <LevelSelect
        levels={levelsWithStatus}
        onSelectLevel={(level) => {
          if (state.levelProgress[level.id] !== 'locked') {
            dispatch({ type: 'SELECT_LEVEL', levelId: level.id });
          }
        }}
        onBack={() => dispatch({ type: 'NAVIGATE', view: 'splash' })}
      />
    );
  }

  return (
    <div className="app-shell">
      {state.view === 'storyReview' && (
        <div className="news-ticker">
          <span className="news-ticker__label">LIVE</span>
          <div className="news-ticker__track">
            <div className="news-ticker__inner">
              {[...GAME_TICKER_ITEMS, ...GAME_TICKER_ITEMS].map((item, i) => (
                <span key={i} className="news-ticker__item">{item}</span>
              ))}
            </div>
          </div>
        </div>
      )}
      <MetricsBar
        meters={state.meters}
        showCountdown={state.view === 'storyReview'}
        timeLeft={timeLeft}
        isMuted={isMuted}
        metricFlash={metricFlash}
        currentLevel={state.currentLevel}
        onToggleMute={() => {
          const next = !isMuted;
          isMutedRef.current = next;
          setIsMuted(next);
          if (clockAudioRef.current) clockAudioRef.current.muted = next;
          if (bgAudioRef.current) bgAudioRef.current.muted = next;
        }}
      />
      <div className="app-body">
        <div className="app-content" style={{ marginLeft: 0, width: '100%' }}>
          {(state.view === 'storyReview' || state.view === 'consequence') && selectedStory && (
            <StoryReview
              story={selectedStory}
              onDecision={(decision, verified, skipCallPhase) => dispatch({ type: 'MAKE_DECISION', decision, verified, skipCallPhase, timeLeft, initialTime: selectedStory.initialTime })}
              onVerified={() => dispatch({ type: 'STORY_VERIFIED' })}
              onViewReport={() => dispatch({ type: 'SHOW_VERA_REPORT' })}
              bribeHandled={state.bribeHandled}
              correctDecisions={state.correctDecisions}
              earnedBadges={{ trust: earnedTrustBadge, speed: earnedSpeedBadge, verified: earnedVerifiedBadge }}
              isMuted={isMuted}
            />
          )}
          {state.view === 'consequence' && (
            <ConsequenceScreen
              outcome={state.lastOutcome}
              meters={state.meters}
              deltas={state.lastDeltas}
              isMuted={isMuted}
              onNext={() => {
                if (pendingBadgesRef.current.length > 0) {
                  postConsequencePending.current = true;
                  drainBadgesOrNext();
                } else {
                  dispatch({ type: 'NEXT' });
                }
              }}
            />
          )}
        </div>
      </div>

      {state.view === 'storyReview' && selectedStory?.newsfirst && (
        <NewsFirstTicker newsfirst={selectedStory.newsfirst} headline={selectedStory.title || selectedStory.headline} />
      )}

      {state.view === 'storyReview' && timeLeft > 0 && timeLeft <= 5 && (
        <div className="alarm-overlay" />
      )}

      {timedOut && state.view === 'storyReview' && (
        <TimeoutModal
          onDecision={(decision) => {
            setTimedOut(false);
            dispatch({ type: 'MAKE_DECISION', decision, timed: true, timeLeft: 0, initialTime: selectedStory?.initialTime });
          }}
        />
      )}

      {state.showCharacters && (
        <div className="modal-overlay" onClick={() => dispatch({ type: 'HIDE_CHARACTERS' })}>
          <div onClick={(e) => e.stopPropagation()}>
            <CharactersModal
              characters={CHARACTERS}
              onClose={() => dispatch({ type: 'HIDE_CHARACTERS' })}
            />
          </div>
        </div>
      )}

      {state.showVERAReport && selectedStory && (
        <div className="modal-overlay" onClick={() => dispatch({ type: 'HIDE_VERA_REPORT' })}>
          <div onClick={(e) => e.stopPropagation()}>
            <VERAReportModal
              story={selectedStory}
              onClose={() => dispatch({ type: 'HIDE_VERA_REPORT' })}
            />
          </div>
        </div>
      )}

      {showTrustModal && <TrustAchievementModal isMuted={isMuted} onClose={() => { setShowTrustModal(false); if (postConsequencePending.current) drainBadgesOrNext(); }} />}
      {showSpeedModal && <SpeedAchievementModal isMuted={isMuted} onClose={() => { setShowSpeedModal(false); if (postConsequencePending.current) drainBadgesOrNext(); }} />}
      {showVerifiedModal && <VerifiedAchievementModal isMuted={isMuted} onClose={() => { setShowVerifiedModal(false); if (postConsequencePending.current) drainBadgesOrNext(); }} />}

    </div>
  );
}
