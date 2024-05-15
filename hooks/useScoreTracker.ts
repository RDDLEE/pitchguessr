"use client";

import { produce } from "immer";
import { useCallback, useState } from "react";

export interface ScoreTrackerState {
  numCorrect: number;
  numIncorrect: number;
  // TODO: Rounds.
}

export interface UseScoreTracker_Return {
  scoreStats: ScoreTrackerState;
  incrementNumCorrect: () => void;
  incrementNumIncorrect: () => void;
  resetScore: () => void;
}

const useScoreTracker = (): UseScoreTracker_Return => {
  const [scoreTrackerState, setScoreTrackerState] = useState<ScoreTrackerState>({
    numCorrect: 0,
    numIncorrect: 0,
  });

  const incrementNumCorrect = useCallback((): void => {
    setScoreTrackerState(
      produce(scoreTrackerState, (draft): void => {
        draft.numCorrect = draft.numCorrect + 1;
      })
    );
  }, [scoreTrackerState]);

  const incrementNumIncorrect = useCallback((): void => {
    setScoreTrackerState(
      produce(scoreTrackerState, (draft): void => {
        draft.numIncorrect = draft.numIncorrect + 1;
      })
    );
  }, [scoreTrackerState]);

  const resetScore = useCallback((): void => {
    setScoreTrackerState({
      numCorrect: 0,
      numIncorrect: 0,
    });
  }, []);

  return {
    scoreStats: scoreTrackerState,
    incrementNumCorrect: incrementNumCorrect,
    incrementNumIncorrect: incrementNumIncorrect,
    resetScore: resetScore,
  };
};

export default useScoreTracker;
