import { initialState, stories, crisisStory } from './gameData.js';

const clamp = (value) => Math.max(0, Math.min(100, value));

const resolveDeltas = (phase, story, decision) => {
  if (!story) return { trust: 0, speed: 0, legalRisk: 0 };
  if (phase === 'crisis') {
    return crisisStory.deltas[decision] || { trust: 0, speed: 0, legalRisk: 0 };
  }
  return story.deltas[decision] || { trust: 0, speed: 0, legalRisk: 0 };
};

const getOutcome = (phase, story, decision) => {
  if (!story) return null;
  const map = phase === 'crisis' ? crisisStory.consequences : story.consequences;
  return map[decision] || null;
};

const computeBadges = (decisions, meters) => {
  const earned = [];
  const verifyCount = decisions.filter((decision) => decision === 'verify').length;
  const cleanRecord = meters.legalRisk < 40;
  const scooped =
    decisions.length === 4 &&
    decisions.slice(0, 3).every((decision) => decision === 'publish') &&
    decisions[3] === 'publish-social';
  const whistleblower = decisions[2] === 'kill';

  if (verifyCount >= 2) {
    earned.push('Verified');
  }
  if (cleanRecord) {
    earned.push('Clean Record');
  }
  if (scooped) {
    earned.push('Scooped');
  }
  if (whistleblower) {
    earned.push('Whistleblower');
  }

  return earned;
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return { ...initialState, phase: 'story', lastOutcome: null };

    case 'MAKE_DECISION': {
      if (state.phase !== 'story') return state;
      const story = stories[state.storyIndex];
      const deltas = resolveDeltas('story', story, action.decision);
      const nextMeters = {
        trust: clamp(state.meters.trust + deltas.trust),
        speed: clamp(state.meters.speed + deltas.speed),
        legalRisk: clamp(state.meters.legalRisk + deltas.legalRisk),
      };
      const outcome = getOutcome('story', story, action.decision);
      return {
        ...state,
        phase: 'consequence',
        meters: nextMeters,
        decisions: [...state.decisions, action.decision],
        activeInterruption: null,
        lastOutcome: outcome,
      };
    }

    case 'NEXT_SCENE': {
      if (state.phase !== 'consequence') return state;
      const nextIndex = state.storyIndex + 1;
      if (nextIndex < stories.length) {
        return {
          ...state,
          phase: 'story',
          storyIndex: nextIndex,
          activeInterruption: null,
          lastOutcome: null,
        };
      }
      return {
        ...state,
        phase: 'crisis',
        activeInterruption: null,
        lastOutcome: null,
      };
    }

    case 'SHOW_INTERRUPTION':
      return {
        ...state,
        activeInterruption: action.interruption,
      };

    case 'DISMISS_INTERRUPTION':
      return {
        ...state,
        activeInterruption: null,
      };

    case 'CRISIS_DECIDE': {
      if (state.phase !== 'crisis') return state;
      const deltas = resolveDeltas('crisis', crisisStory, action.decision);
      const nextMeters = {
        trust: clamp(state.meters.trust + deltas.trust),
        speed: clamp(state.meters.speed + deltas.speed),
        legalRisk: clamp(state.meters.legalRisk + deltas.legalRisk),
      };
      const outcome = getOutcome('crisis', crisisStory, action.decision);
      return {
        ...state,
        phase: 'ending',
        meters: nextMeters,
        decisions: [...state.decisions, action.decision],
        badges: computeBadges([...state.decisions, action.decision], nextMeters),
        activeInterruption: null,
        lastOutcome: outcome,
      };
    }

    case 'CRISIS_TIMEOUT': {
      if (state.phase !== 'crisis') return state;
      return {
        ...state,
        phase: 'ending',
        meters: {
          trust: clamp(state.meters.trust + crisisStory.deltas.timeout.trust),
          speed: clamp(state.meters.speed + crisisStory.deltas.timeout.speed),
          legalRisk: clamp(state.meters.legalRisk + crisisStory.deltas.timeout.legalRisk),
        },
        decisions: [...state.decisions, 'publish-social'],
        badges: computeBadges([...state.decisions, 'publish-social'], {
          trust: clamp(state.meters.trust + crisisStory.deltas.timeout.trust),
          speed: clamp(state.meters.speed + crisisStory.deltas.timeout.speed),
          legalRisk: clamp(state.meters.legalRisk + crisisStory.deltas.timeout.legalRisk),
        }),
        activeInterruption: null,
        lastOutcome: crisisStory.consequences.timeout,
      };
    }

    case 'RESET_GAME':
      return { ...initialState, phase: 'title', lastOutcome: null };

    default:
      return state;
  }
};
