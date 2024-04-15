"use client";

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
}

const useScoreTracker = (): UseScoreTracker_Return => {
  const [scoreTrackerState, setScoreTrackerState] = useState<ScoreTrackerState>({
    numCorrect: 0,
    numIncorrect: 0,
  });

  const incrementNumCorrect = useCallback((): void => {
    setScoreTrackerState(
      (prevState) => {
        return {
          numCorrect: prevState.numCorrect + 1,
          numIncorrect: prevState.numIncorrect,
        };
      },
    );
  }, [setScoreTrackerState]);

  const incrementNumIncorrect = useCallback((): void => {
    setScoreTrackerState(
      (prevState) => {
        return {
          numCorrect: prevState.numCorrect,
          numIncorrect: prevState.numIncorrect + 1,
        };
      },
    );
  }, [setScoreTrackerState]);

  return {
    scoreStats: scoreTrackerState,
    incrementNumCorrect: incrementNumCorrect,
    incrementNumIncorrect: incrementNumIncorrect,
  };
};

export default useScoreTracker;
