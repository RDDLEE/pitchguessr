import { produce } from "immer";
import { useCallback, useMemo, useState } from "react";

import type { SliderGameContext, SliderGameSettings, SliderGameState } from "@/contexts/SliderContext";
import { SLIDER_GAME_SETTINGS_DEFAULT, SliderContext } from "@/contexts/SliderContext";
import useScoreTracker from "@/hooks/useScoreTracker";
import NoteUtils from "@/utils/NoteUtils";

const generateNewGameState = (settings: SliderGameSettings): SliderGameState => {
  const result = NoteUtils.generateNoteOctave(settings.generateNoteOctaveOptions);
  const noteOctave = result.noteOctave;
  return {
    correctNoteOctave: noteOctave,
    isRoundOver: false,
    hasPlayed: false,
  };
};

export default function SliderProvider({ children }: Readonly<{ children: React.ReactNode; }>) {
  const [gameSettings, setGameSettings] = useState<SliderGameSettings>(SLIDER_GAME_SETTINGS_DEFAULT);

  const [gameState, setGameState] = useState<SliderGameState>(generateNewGameState(gameSettings));

  const scoreTracker = useScoreTracker();

  const onNewRound = useCallback((settings: SliderGameSettings, shouldResetScore: boolean): void => {
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

  const contextState = useMemo<SliderGameContext>(() => {
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
    <SliderContext.Provider value={contextState}>
      {children}
    </SliderContext.Provider>
  );
}
