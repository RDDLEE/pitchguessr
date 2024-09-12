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
  const stepDistance = NoteUtils.getStepDifferenceOfNoteValues(firstNoteOctave, secondNoteOctave);
  return {
    firstNoteOctave: firstNoteOctave,
    secondNoteOctave: secondNoteOctave,
    isRoundOver: false,
    correctDistance: stepDistance,
    hasPlayed: false,
    hasPlayedSecond: false,
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

  const onPlaySecond = useCallback((): void => {
    setGameState(
      produce(gameState, (draft): void => {
        if (draft.hasPlayedSecond === true) {
          return;
        }
        draft.hasPlayedSecond = true;
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
    if (distance === gameState.correctDistance) {
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
      onPlaySecond: onPlaySecond,
      submitAnswer: submitAnswer,
    };
  }, [gameState, gameSettings, scoreTracker, onNewRound, onPlay, onPlaySecond, submitAnswer]);

  return (
    <DistanceContext.Provider value={contextState}>
      {children}
    </DistanceContext.Provider>
  );
}
