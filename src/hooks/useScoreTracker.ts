"use client";

import { produce } from "immer";
import { useCallback, useState } from "react";

export interface ScoreTrackerState {
  numCorrect: number;
  numIncorrect: number;
  didAnswer: boolean;
  wasCorrect: boolean;
}

export interface UseScoreTracker_Return {
  scoreStats: ScoreTrackerState;
  incrementNumCorrect: () => void;
  incrementNumIncorrect: () => void;
  onNewRound: (resetScore: boolean) => void;
}

const useScoreTracker = (): UseScoreTracker_Return => {
  const [scoreTrackerState, setScoreTrackerState] = useState<ScoreTrackerState>({
    numCorrect: 0,
    numIncorrect: 0,
    didAnswer: false,
    wasCorrect: false,
  });

  const incrementNumCorrect = useCallback((): void => {
    setScoreTrackerState(
      produce(scoreTrackerState, (draft): void => {
        draft.numCorrect = draft.numCorrect + 1;
        draft.didAnswer = true;
        draft.wasCorrect = true;
      })
    );
  }, [scoreTrackerState]);

  const incrementNumIncorrect = useCallback((): void => {
    setScoreTrackerState(
      produce(scoreTrackerState, (draft): void => {
        draft.numIncorrect = draft.numIncorrect + 1;
        draft.didAnswer = true;
        draft.wasCorrect = false;
      })
    );
  }, [scoreTrackerState]);

  const onNewRound = useCallback((resetScore: boolean): void => {
    if (resetScore) {
      setScoreTrackerState({
        numCorrect: 0,
        numIncorrect: 0,
        didAnswer: false,
        wasCorrect: false,
      });
    } else {
      setScoreTrackerState(
        produce(scoreTrackerState, (draft): void => {
          draft.didAnswer = false;
          draft.wasCorrect = false;
        })
      );
    }
  }, [scoreTrackerState]);

  return {
    scoreStats: scoreTrackerState,
    incrementNumCorrect: incrementNumCorrect,
    incrementNumIncorrect: incrementNumIncorrect,
    onNewRound: onNewRound,
  };
};

export default useScoreTracker;
