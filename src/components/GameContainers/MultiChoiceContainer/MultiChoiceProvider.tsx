import { produce } from "immer";
import { useCallback, useMemo, useState } from "react";

import type { MultiChoiceGameContext, MultiChoiceGameSettings, MultiChoiceGameState } from "@/contexts/MultiChoiceContext";
import { MULTI_CHOICE_GAME_SETTINGS_DEFAULT, MultiChoiceContext } from "@/contexts/MultiChoiceContext";
import useScoreTracker from "@/hooks/useScoreTracker";
import MathUtils from "@/utils/MathUtils";
import type { MusicalNote } from "@/utils/NoteUtils";
import NoteUtils from "@/utils/NoteUtils";

const generateAnswerChoices = (numAnswerChoices: number, correctNote: MusicalNote, noteGroup: MusicalNote[]): MusicalNote[] => {
  const filteredNotes = noteGroup.filter(
    (note: string) => {
      if (note !== correctNote) {
        return true;
      }
      return false;
    },
  );
  filteredNotes.sort(() => { return Math.random() - 0.5; });
  const range = MathUtils.clamp(numAnswerChoices - 1, 1, filteredNotes.length);
  const items = [correctNote].concat(filteredNotes.slice(0, range));
  // FIXME: Sort items from Ab to G#.
  items.sort(() => { return Math.random() - 0.5; });
  return items;
};

const generateNewGameState = (settings: MultiChoiceGameSettings): MultiChoiceGameState => {
  const generateResult = NoteUtils.generateNoteOctave(settings.generateNoteOctaveOptions);
  const noteOctave = generateResult.noteOctave;
  const noteGroup = generateResult.noteGroup;
  const answerChoices = generateAnswerChoices(settings.numAnswerChoices, noteOctave.note, noteGroup);
  return {
    correctNoteOctave: noteOctave,
    noteGroup: noteGroup,
    answerChoices: answerChoices,
    isRoundOver: false,
    hasPlayed: false,
  };
};

export default function MultiChoiceProvider({ children }: Readonly<{ children: React.ReactNode; }>) {
  const [gameSettings, setGameSettings] = useState<MultiChoiceGameSettings>(MULTI_CHOICE_GAME_SETTINGS_DEFAULT);

  const [gameState, setGameState] = useState<MultiChoiceGameState>(generateNewGameState(gameSettings));

  const scoreTracker = useScoreTracker();

  const onNewRound = useCallback((settings: MultiChoiceGameSettings, shouldResetScore: boolean): void => {
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

  const submitAnswer = useCallback((answerChoice: string): void => {
    setGameState(
      produce(gameState, (draft): void => {
        if (draft.isRoundOver) {
          return;
        }
        draft.isRoundOver = true;
      })
    );
    if (answerChoice === gameState.correctNoteOctave.note) {
      scoreTracker.incrementNumCorrect();
    } else {
      scoreTracker.incrementNumIncorrect();
    }
  }, [gameState, scoreTracker]);

  const contextState = useMemo<MultiChoiceGameContext>(() => {
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
  }, [gameSettings, gameState, onNewRound, onPlay, scoreTracker, submitAnswer]);

  return (
    <MultiChoiceContext.Provider value={contextState}>
      {children}
    </MultiChoiceContext.Provider>
  );
}
