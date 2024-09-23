import { produce } from "immer";
import { useCallback, useMemo, useState } from "react";

import useScoreTracker from "@/hooks/useScoreTracker";
import NoteUtils from "@/utils/NoteUtils";

import type { SliderGameContext, SliderGameSettings, SliderGameState } from "./SliderContext";
import { SLIDER_GAME_SETTINGS_DEFAULT, SliderContext } from "./SliderContext";

type TGameSettings = SliderGameSettings;
type TGameState = SliderGameState;
type TGameContext = SliderGameContext;
const GAME_CONTEXT = SliderContext;

const generateNewGameState = (settings: TGameSettings): TGameState => {
  const result = NoteUtils.generateNoteOctave(settings.generateNoteOctaveOptions);
  const noteOctave = result.noteOctave;
  return {
    correctNoteOctave: noteOctave,
    isRoundOver: false,
    hasPlayed: false,
  };
};

export default function SliderProvider({ children }: Readonly<{ children: React.ReactNode; }>) {
  const [gameSettings, setGameSettings] = useState<TGameSettings>(SLIDER_GAME_SETTINGS_DEFAULT);

  const [gameState, setGameState] = useState<TGameState>(generateNewGameState(gameSettings));

  const scoreTracker = useScoreTracker();

  const onNewRound = useCallback((settings: TGameSettings, shouldResetScore: boolean): void => {
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

  const submitAnswer = useCallback((sliderAnswerHz: number): void => {
    setGameState(
      produce(gameState, (draft): void => {
        if (draft.isRoundOver) {
          return;
        }
        draft.isRoundOver = true;
      })
    );
    const correctHz = NoteUtils.convertNoteOctaveToFrequency(gameState.correctNoteOctave);
    // Converting from NoteOctave to Freq to Tone.Unit.Note.
    const correctNote = NoteUtils.convertFrequencyToNoteOctave(correctHz);
    const chosenNote = NoteUtils.convertFrequencyToNoteOctave(sliderAnswerHz);
    // FIXME: Display correct slider value.
    if (chosenNote === correctNote) {
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
      onPlay: onPlay,
      submitAnswer: submitAnswer,
    };
  }, [gameSettings, gameState, onNewRound, onPlay, scoreTracker, submitAnswer]);

  return (
    <GAME_CONTEXT.Provider value={contextState}>
      {children}
    </GAME_CONTEXT.Provider>
  );
}
