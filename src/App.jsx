import { useReducer, useState, useEffect, useRef } from 'react';
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
import './styles/game.css';

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
        <span className="newsfirst-ticker__badge" style={{ background: cfg.badgeBg, color: cfg.badgeText }}>
          {cfg.label}
          {newsfirst.status === 'named-silent' && newsfirst.shares && <> · {newsfirst.shares.toLocaleString()} shares</>}
        </span>
        {(newsfirst.status === 'same-story' || newsfirst.status === 'different-angle') && newsfirst.shares && (
          <span className="newsfirst-ticker__shares" style={{ color: cfg.text }}>{newsfirst.shares.toLocaleString()} shares</span>
        )}
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
  showVERAReport: false,
  showCharacters: false,
  postBribeReturnToStory: false,
  bribeHandled: false,
  correctDecisions: 0,
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
      const d = (story.callDeltas || story.deltas)[action.decision] || {};
      const outcome = (story.callConsequences || story.consequences)?.[action.decision] || null;
      const speedPenalty = action.timed ? -20 : 0;
      const isBribeDecline = !!story.callConsequences && action.decision === 'drop';
      return {
        ...state,
        view: 'consequence',
        showVERAReport: false,
        lastOutcome: outcome,
        lastDeltas: d,
        postBribeReturnToStory: isBribeDecline,
        xp: state.xp + (outcome?.correct ? 80 : 20),
        correctDecisions: state.correctDecisions + (outcome?.correct ? 1 : 0),
        meters: {
          trust: clamp(state.meters.trust + (d.trust || 0)),
          speed: clamp(state.meters.speed + (d.speed || 0) + speedPenalty),
          legalRisk: clamp(state.meters.legalRisk + (d.legalRisk || 0)),
          audienceReach: clamp(state.meters.audienceReach + (d.audienceReach || 0)),
        },
      };
    }

    case 'NEXT': {
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

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const path = VIEW_TO_PATH[state.view];
    if (path && window.location.pathname !== path) {
      navigate(path, { replace: false });
    }
  }, [state.view]);

  const selectedStory = ALL_STORIES.find((s) => s.id === state.selectedStoryId) ?? null;

  const [timeLeft, setTimeLeft] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const [showTrustAchievement, setShowTrustAchievement] = useState(false);
  const [showSpeedAchievement, setShowSpeedAchievement] = useState(false);
  const trustAchievementShown = useRef(false);
  const speedAchievementShown = useRef(false);

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
    if (state.meters.trust > 25 && !trustAchievementShown.current) {
      trustAchievementShown.current = true;
      setShowTrustAchievement(true);
    }
  }, [state.meters.trust]);

  useEffect(() => {
    if (state.meters.speed > 30 && !speedAchievementShown.current) {
      speedAchievementShown.current = true;
      setShowSpeedAchievement(true);
    }
  }, [state.meters.speed]);

  const levelsWithStatus = LEVELS.map((l) => ({
    ...l,
    status: state.levelProgress[l.id] || 'locked',
  }));

  if (state.view === 'splash') {
    return (
      <>
        <SplashScreen
          onPlay={() => dispatch({ type: 'PLAY' })}
          onContinue={() => dispatch({ type: 'PLAY' })}
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
        onRestart={() => dispatch({ type: 'RESTART' })}
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
      <MetricsBar
        meters={state.meters}
        showCountdown={state.view === 'storyReview'}
        timeLeft={timeLeft}
      />
      {state.view === 'storyReview' && selectedStory?.newsfirst && (
        <NewsFirstTicker newsfirst={selectedStory.newsfirst} headline={selectedStory.title || selectedStory.headline} />
      )}
      <div className="app-body">
        <div className="app-content" style={{ marginLeft: 0, width: '100%' }}>
          {(state.view === 'storyReview' || state.view === 'consequence') && selectedStory && (
            <StoryReview
              story={selectedStory}
              onDecision={(decision) => dispatch({ type: 'MAKE_DECISION', decision })}
              onViewReport={() => dispatch({ type: 'SHOW_VERA_REPORT' })}
              bribeHandled={state.bribeHandled}
              correctDecisions={state.correctDecisions}
            />
          )}
          {state.view === 'consequence' && (
            <ConsequenceScreen
              outcome={state.lastOutcome}
              meters={state.meters}
              deltas={state.lastDeltas}
              onNext={() => dispatch({ type: 'NEXT' })}
            />
          )}
        </div>
      </div>

      {state.view === 'storyReview' && timeLeft > 0 && timeLeft <= 5 && (
        <div className="alarm-overlay" />
      )}

      {showTrustAchievement && (
        <TrustAchievementModal onClose={() => setShowTrustAchievement(false)} />
      )}

      {showSpeedAchievement && (
        <SpeedAchievementModal onClose={() => setShowSpeedAchievement(false)} />
      )}

      {timedOut && state.view === 'storyReview' && (
        <TimeoutModal
          onDecision={(decision) => {
            setTimedOut(false);
            dispatch({ type: 'MAKE_DECISION', decision, timed: true });
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
    </div>
  );
}
