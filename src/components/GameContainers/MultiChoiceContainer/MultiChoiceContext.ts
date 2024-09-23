import { createContext } from "react";

import type { BaseGameContext, BaseGameSettings, BaseGameState } from "@/utils/GameStateUtils";
import GameStateUtils from "@/utils/GameStateUtils";
import type { MusicalNote, NoteOctave } from "@/utils/NoteUtils";
import { NOTE_OCTAVE_DEFAULT, NoteTypes } from "@/utils/NoteUtils";
import { USE_SCORE_TRACKER_RETURN_DEFAULT } from "@/utils/ScoreTrackerUtils";

type TGameState = MultiChoiceGameState;
type TGameSettings = MultiChoiceGameSettings;
type TGameContext = MultiChoiceGameContext;

export interface MultiChoiceGameState extends BaseGameState {
  correctNoteOctave: NoteOctave;
  noteGroup: MusicalNote[];
  answerChoices: MusicalNote[];
}

export interface MultiChoiceGameSettings extends BaseGameSettings {
  numAnswerChoices: number;
}

export interface MultiChoiceGameContext extends BaseGameContext<TGameState, TGameSettings> {
  submitAnswer?: (answerChoice: string) => void;
}

const MULTI_CHOICE_GAME_STATE_DEFAULT: TGameState = {
  ...GameStateUtils.BASE_GAME_STATE_DEFAULT,
  correctNoteOctave: NOTE_OCTAVE_DEFAULT,
  noteGroup: [],
  answerChoices: [],
};

export const MULTI_CHOICE_GAME_SETTINGS_DEFAULT: TGameSettings = {
  numAnswerChoices: 5,
  noteDuration: GameStateUtils.NOTE_DURATION_SETTING_DEFAULT,
  generateNoteOctaveOptions: {
    octaveOptions: {
      min: 3,
      max: 5,
    },
    noteOptions: {
      noteType: NoteTypes.NATURAL,
    },
  },
};

export const MultiChoiceContext = createContext<TGameContext>({
  gameState: MULTI_CHOICE_GAME_STATE_DEFAULT,
  gameSettings: MULTI_CHOICE_GAME_SETTINGS_DEFAULT,
  scoreTracker: USE_SCORE_TRACKER_RETURN_DEFAULT,
});
