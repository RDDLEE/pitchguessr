import { createContext } from "react";

import type { BaseGameContext, BaseGameSettings, BaseGameState } from "@/utils/GameStateUtils";
import GameStateUtils from "@/utils/GameStateUtils";
import type { MusicalNote, NoteOctave } from "@/utils/NoteUtils";
import { NOTE_OCTAVE_DEFAULT, NoteTypes } from "@/utils/NoteUtils";
import { USE_SCORE_TRACKER_RETURN_DEFAULT } from "@/utils/ScoreTrackerUtils";

export interface MultiChoiceGameState extends BaseGameState {
  correctNoteOctave: NoteOctave;
  noteGroup: MusicalNote[];
  answerChoices: MusicalNote[];
}

const MULTI_CHOICE_GAME_STATE_DEFAULT: MultiChoiceGameState = {
  ...GameStateUtils.BASE_GAME_STATE_DEFAULT,
  correctNoteOctave: NOTE_OCTAVE_DEFAULT,
  noteGroup: [],
  answerChoices: [],
};

export interface MultiChoiceGameSettings extends BaseGameSettings {
  numAnswerChoices: number;
}

export const MULTI_CHOICE_GAME_SETTINGS_DEFAULT: MultiChoiceGameSettings = {
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

export interface MultiChoiceGameContext extends BaseGameContext<MultiChoiceGameState, MultiChoiceGameSettings> {
  submitAnswer?: (answerChoice: string) => void;
}

export const MultiChoiceContext = createContext<MultiChoiceGameContext>({
  gameState: MULTI_CHOICE_GAME_STATE_DEFAULT,
  gameSettings: MULTI_CHOICE_GAME_SETTINGS_DEFAULT,
  scoreTracker: USE_SCORE_TRACKER_RETURN_DEFAULT,
});
