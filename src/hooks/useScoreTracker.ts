"use client";

import { produce } from "immer";
import { useCallback, useState } from "react";

import { SCORE_TRACKER_STATE_DEFAULT, type ScoreTrackerState, type UseScoreTracker_Return } from "@/utils/ScoreTrackerUtils";

const useScoreTracker = (): UseScoreTracker_Return => {
  const [scoreTrackerState, setScoreTrackerState] = useState<ScoreTrackerState>(SCORE_TRACKER_STATE_DEFAULT);

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

  const resetScoreState = useCallback((resetScore: boolean): void => {
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
    resetScoreState: resetScoreState,
  };
};

export default useScoreTracker;
