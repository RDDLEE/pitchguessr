import { produce } from "immer";
import { useCallback, useMemo, useState } from "react";

import type { NoteKeyboardGameContext, NoteKeyboardGameSettings, NoteKeyboardGameState } from "@/contexts/NoteKeyboardContext";
import { NOTE_KEYBOARD_GAME_SETTINGS_DEFAULT, NoteKeyboardContext } from "@/contexts/NoteKeyboardContext";
import useScoreTracker from "@/hooks/useScoreTracker";
import type { NoteOctave } from "@/utils/NoteUtils";
import NoteUtils from "@/utils/NoteUtils";

const generateNewGameState = (settings: NoteKeyboardGameSettings): NoteKeyboardGameState => {
  const generateResult = NoteUtils.generateNoteOctave(settings.generateNoteOctaveOptions);
  const noteOctave = generateResult.noteOctave;
  return {
    correctNote: noteOctave,
    selectedNote: null,
    isRoundOver: false,
    hasPlayed: false,
  };
};

export default function NoteKeyboardProvider({ children }: Readonly<{ children: React.ReactNode; }>) {
  const [gameSettings, setGameSettings] = useState<NoteKeyboardGameSettings>(NOTE_KEYBOARD_GAME_SETTINGS_DEFAULT);

  const [gameState, setGameState] = useState<NoteKeyboardGameState>(generateNewGameState(gameSettings));

  const scoreTracker = useScoreTracker();

  const onNewRound = useCallback((settings: NoteKeyboardGameSettings, shouldResetScore: boolean): void => {
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

  const selectNoteOctave = useCallback((noteOctave: NoteOctave): void => {
    setGameState(
      produce(gameState, (draft): void => {
        draft.selectedNote = noteOctave;
      })
    );
  }, [gameState]);

  const submitAnswer = useCallback((): void => {
    setGameState(
      produce(gameState, (draft): void => {
        if (draft.isRoundOver) {
          return;
        }
        draft.isRoundOver = true;
      })
    );
    if (gameState.selectedNote === null) {
      return;
    }
    if (NoteUtils.compareNoteOctaveValues(gameState.selectedNote, gameState.correctNote) === 0) {
      scoreTracker.incrementNumCorrect();
    } else {
      scoreTracker.incrementNumIncorrect();
    }
  }, [gameState, scoreTracker]);

  const contextState = useMemo<NoteKeyboardGameContext>(() => {
    return {
      gameState: gameState,
      setGameState: setGameState,
      gameSettings: gameSettings,
      setGameSettings: setGameSettings,
      scoreTracker: scoreTracker,
      onNewRound: onNewRound,
      onPlay: onPlay,
      submitAnswer: submitAnswer,
      selectNoteOctave: selectNoteOctave,
    };
  }, [gameSettings, gameState, onNewRound, onPlay, scoreTracker, selectNoteOctave, submitAnswer]);

  return (
    <NoteKeyboardContext.Provider value={contextState}>
      {children}
    </NoteKeyboardContext.Provider>
  );
}
