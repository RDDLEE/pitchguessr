import { createContext } from "react";

import type { BaseGameContext, BaseGameSettings, BaseGameState } from "@/utils/GameStateUtils";
import GameStateUtils from "@/utils/GameStateUtils";
import type { NoteOctave } from "@/utils/NoteUtils";
import { NOTE_OCTAVE_DEFAULT, NoteTypes } from "@/utils/NoteUtils";
import { USE_SCORE_TRACKER_RETURN_DEFAULT } from "@/utils/ScoreTrackerUtils";

export interface NoteKeyboardGameState extends BaseGameState {
  correctNote: NoteOctave;
  selectedNote: NoteOctave | null;
}

const NOTE_KEYBOARD_GAME_STATE_DEFAULT: NoteKeyboardGameState = {
  ...GameStateUtils.BASE_GAME_STATE_DEFAULT,
  correctNote: NOTE_OCTAVE_DEFAULT,
  selectedNote: null,
};

export interface NoteKeyboardGameSettings extends BaseGameSettings { }

export const NOTE_KEYBOARD_GAME_SETTINGS_DEFAULT: NoteKeyboardGameSettings = {
  noteDuration: GameStateUtils.NOTE_DURATION_SETTING_DEFAULT,
  generateNoteOctaveOptions: {
    octaveOptions: {
      min: 3,
      max: 4,
    },
    noteOptions: {
      noteType: NoteTypes.NATURAL,
    },
  },
};

export interface NoteKeyboardGameContext extends BaseGameContext<NoteKeyboardGameState, NoteKeyboardGameSettings> {
  submitAnswer?: () => void;
  selectNoteOctave?: (noteOctave: NoteOctave) => void;
}

export const NoteKeyboardContext = createContext<NoteKeyboardGameContext>({
  gameState: NOTE_KEYBOARD_GAME_STATE_DEFAULT,
  gameSettings: NOTE_KEYBOARD_GAME_SETTINGS_DEFAULT,
  scoreTracker: USE_SCORE_TRACKER_RETURN_DEFAULT,
});
