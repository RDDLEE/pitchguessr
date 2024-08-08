export interface ScoreTrackerState {
  numCorrect: number;
  numIncorrect: number;
  didAnswer: boolean;
  wasCorrect: boolean;
}

export const SCORE_TRACKER_STATE_DEFAULT = {
  numCorrect: 0,
  numIncorrect: 0,
  didAnswer: false,
  wasCorrect: false,
};

export interface UseScoreTracker_Return {
  scoreStats: ScoreTrackerState;
  // FIXME: Make undefined?
  incrementNumCorrect: () => void;
  incrementNumIncorrect: () => void;
  resetScoreState: (resetScore: boolean) => void;
}

export const USE_SCORE_TRACKER_RETURN_DEFAULT: UseScoreTracker_Return = {
  scoreStats: SCORE_TRACKER_STATE_DEFAULT,
  incrementNumCorrect: () => { },
  incrementNumIncorrect: () => { },
  resetScoreState: () => { },
};
