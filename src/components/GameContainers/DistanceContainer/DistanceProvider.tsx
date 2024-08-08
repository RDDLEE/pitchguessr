import { produce } from "immer";
import { useCallback, useMemo, useState } from "react";

import type { DistanceGameContext, DistanceGameSettings, DistanceGameState } from "@/contexts/DistanceContext";
import { DISTANCE_SETTINGS_DEFAULT, DistanceContext } from "@/contexts/DistanceContext";
import useScoreTracker from "@/hooks/useScoreTracker";
import NoteUtils from "@/utils/NoteUtils";

const generateNewGameState = (settings: DistanceGameSettings): DistanceGameState => {
  const firstResult = NoteUtils.generateNoteOctave(settings.generateNoteOctaveOptions);
  const firstNoteOctave = firstResult.noteOctave;
  const secondResult = NoteUtils.generateNoteOctave(settings.generateNoteOctaveOptions);
  const secondNoteOctave = secondResult.noteOctave;
  return {
    firstNoteOctave: firstNoteOctave,
    secondNoteOctave: secondNoteOctave,
    isRoundOver: false,
    hasPlayed: false,
  };
};

export default function DistanceProvider({ children }: Readonly<{ children: React.ReactNode; }>) {
  const [gameSettings, setGameSettings] = useState<DistanceGameSettings>(DISTANCE_SETTINGS_DEFAULT);

  const [gameState, setGameState] = useState<DistanceGameState>(generateNewGameState(gameSettings));

  const scoreTracker = useScoreTracker();

  const onNewRound = useCallback((settings: DistanceGameSettings, shouldResetScore: boolean): void => {
    scoreTracker.resetScoreState(shouldResetScore);
    const newState = generateNewGameState(settings);
    setGameState(newState);
  }, [scoreTracker]);

  const onPlay = useCallback((): void => {
    setGameState(
      produce(gameState, (draft): void => {
        if (draft.hasPlayed === true) {
          return;
        }
        draft.hasPlayed = true;
      })
    );
  }, [gameState]);

  const submitAnswer = useCallback((distance: number): void => {
    setGameState(
      produce(gameState, (draft): void => {
        if (draft.isRoundOver) {
          return;
        }
        draft.isRoundOver = true;
      })
    );
    const correctDiff = NoteUtils.getStepDifferenceOfNoteValues(gameState.firstNoteOctave, gameState.secondNoteOctave);
    if (distance === correctDiff) {
      scoreTracker.incrementNumCorrect();
    } else {
      scoreTracker.incrementNumIncorrect();
    }
  }, [gameState, scoreTracker]);

  const contextState = useMemo<DistanceGameContext>(() => {
    return {
      gameState: gameState,
      setGameState: setGameState,
      gameSettings: gameSettings,
      setGameSettings: setGameSettings,
      scoreTracker: scoreTracker,
      onNewRound: onNewRound,
      onPlay: onPlay,
      submitAnswer: submitAnswer,
    };
  }, [gameSettings, gameState, onPlay, submitAnswer, onNewRound, scoreTracker]);

  return (
    <DistanceContext.Provider value={contextState}>
      {children}
    </DistanceContext.Provider>
  );
}
