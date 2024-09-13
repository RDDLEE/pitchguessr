import { produce } from "immer";
import { useCallback, useMemo, useState } from "react";

import { CHORD_GAME_SETTINGS_DEFAULT, ChordContext, type ChordGameContext, type ChordGameSettings, type ChordGameState } from "@/contexts/ChordContext";
import useScoreTracker from "@/hooks/useScoreTracker";
import type { MusicalNote } from "@/utils/NoteUtils";
import NoteUtils from "@/utils/NoteUtils";

const generateNewGameState = (settings: ChordGameSettings): ChordGameState => {
  const firstResult = NoteUtils.generateNoteOctave(settings.generateNoteOctaveOptions);
  const secondResult = NoteUtils.generateNoteOctave(settings.generateNoteOctaveOptions);
  const notes = [firstResult.noteOctave, secondResult.noteOctave];
  return {
    correctNotes: notes,
    isRoundOver: false,
    hasPlayed: false,
    selectedNotes: [],
  };
};

export default function DistanceProvider({ children }: Readonly<{ children: React.ReactNode; }>) {
  const [gameSettings, setGameSettings] = useState<ChordGameSettings>(CHORD_GAME_SETTINGS_DEFAULT);

  const [gameState, setGameState] = useState<ChordGameState>(generateNewGameState(gameSettings));

  const scoreTracker = useScoreTracker();

  const onNewRound = useCallback((settings: ChordGameSettings, shouldResetScore: boolean): void => {
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

  const submitAnswer = useCallback((): void => {
    setGameState(
      produce(gameState, (draft): void => {
        if (draft.isRoundOver) {
          return;
        }
        draft.isRoundOver = true;
      })
    );
    const selectedNotesSet = new Set<MusicalNote>(gameState.selectedNotes);
    const correctNotesSet = new Set<MusicalNote>();
    for (let i = 0; i < gameState.correctNotes.length; i++) {
      correctNotesSet.add(gameState.correctNotes[i].note);
    }
    const symDiff = new Set();
    for (const item of selectedNotesSet) {
      if (!correctNotesSet.has(item)) {
        symDiff.add(item);
      }
    }
    for (const item of correctNotesSet) {
      if (!selectedNotesSet.has(item)) {
        symDiff.add(item);
      }
    }
    if (symDiff.size === 0) {
      scoreTracker.incrementNumCorrect();
    } else {
      scoreTracker.incrementNumIncorrect();
    }
  }, [gameState, scoreTracker]);

  const addSelectedNote = useCallback((note: MusicalNote): void => {
    setGameState(
      produce(gameState, (draft): void => {
        draft.selectedNotes.push(note);
      })
    );
  }, [gameState]);

  const removeSelectedNote = useCallback((note: MusicalNote): void => {
    setGameState(
      produce(gameState, (draft): void => {
        draft.selectedNotes = draft.selectedNotes.filter((selectedNote: MusicalNote) => {
          if (selectedNote === note) {
            // Filter out the selected note.
            return false;
          }
          return true;
        });
      })
    );
  }, [gameState]);

  const contextState = useMemo<ChordGameContext>(() => {
    return {
      gameState: gameState,
      setGameState: setGameState,
      gameSettings: gameSettings,
      setGameSettings: setGameSettings,
      scoreTracker: scoreTracker,
      onNewRound: onNewRound,
      onPlay: onPlay,
      submitAnswer: submitAnswer,
      addSelectedNote: addSelectedNote,
      removeSelectedNote: removeSelectedNote,
    };
  }, [gameState, gameSettings, scoreTracker, onNewRound, onPlay, submitAnswer, addSelectedNote, removeSelectedNote]);

  return (
    <ChordContext.Provider value={contextState}>
      {children}
    </ChordContext.Provider>
  );
}
