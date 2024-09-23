import { produce } from "immer";
import { useCallback, useMemo, useState } from "react";

import useScoreTracker from "@/hooks/useScoreTracker";
import NoteUtils from "@/utils/NoteUtils";

import type { DirectionalGameContext, DirectionalGameSettings, DirectionalGameState } from "./DirectionalContext";
import { DIRECTIONAL_GAME_SETTINGS_DEFAULT, DirectionalContext } from "./DirectionalContext";

type TGameSettings = DirectionalGameSettings;
type TGameState = DirectionalGameState;
type TGameContext = DirectionalGameContext;
const GAME_CONTEXT = DirectionalContext;

const generateNewGameState = (settings: TGameSettings): DirectionalGameState => {
  const newFirstNoteOctave = NoteUtils.generateNoteOctave(settings.generateNoteOctaveOptions).noteOctave;
  const newSecondNoteOctave = NoteUtils.generateNoteOctave(settings.generateNoteOctaveOptions).noteOctave;
  const correctPitchDirection = NoteUtils.compareNoteOctaveValues(newFirstNoteOctave, newSecondNoteOctave);
  return {
    firstNoteOctave: newFirstNoteOctave,
    secondNoteOctave: newSecondNoteOctave,
    correctDirection: correctPitchDirection,
    isRoundOver: false,
    hasPlayed: false,
    hasPlayedSecond: false,
  };
};

export default function DirectionalProvider({ children }: Readonly<{ children: React.ReactNode; }>) {
  const [gameSettings, setGameSettings] = useState<TGameSettings>(DIRECTIONAL_GAME_SETTINGS_DEFAULT);

  const [gameState, setGameState] = useState<TGameState>(generateNewGameState(gameSettings));

  const scoreTracker = useScoreTracker();

  const onNewRound = useCallback((settings: TGameSettings, shouldResetScore: boolean): void => {
    scoreTracker.resetScoreState(shouldResetScore);
    const newState = generateNewGameState(settings);
    setGameState(newState);
  }, [scoreTracker]);

  const onPlayFirst = useCallback((): void => {
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

  const submitAnswer = useCallback((answerChoice: string): void => {
    setGameState(
      produce(gameState, (draft): void => {
        draft.isRoundOver = true;
      })
    );
    if (Number(answerChoice) === gameState.correctDirection) {
      scoreTracker.incrementNumCorrect();
    } else {
      scoreTracker.incrementNumIncorrect();
    }
  }, [gameState, scoreTracker]);

  const contextState = useMemo<TGameContext>(() => {
    return {
      gameState: gameState,
      setGameState: setGameState,
      gameSettings: gameSettings,
      setGameSettings: setGameSettings,
      scoreTracker: scoreTracker,
      onNewRound: onNewRound,
      onPlay: onPlayFirst,
      onPlaySecond: onPlaySecond,
      submitAnswer: submitAnswer,
    };
  }, [gameSettings, gameState, onNewRound, onPlayFirst, onPlaySecond, scoreTracker, submitAnswer]);

  return (
    <GAME_CONTEXT.Provider value={contextState}>
      {children}
    </GAME_CONTEXT.Provider>
  );
}
