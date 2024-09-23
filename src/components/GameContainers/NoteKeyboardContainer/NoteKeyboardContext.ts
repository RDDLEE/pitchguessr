import { createContext } from "react";

import type { BaseGameContext, BaseGameSettings, BaseGameState } from "@/utils/GameStateUtils";
import GameStateUtils from "@/utils/GameStateUtils";
import type { NoteOctave } from "@/utils/NoteUtils";
import { NOTE_OCTAVE_DEFAULT, NoteTypes } from "@/utils/NoteUtils";
import { USE_SCORE_TRACKER_RETURN_DEFAULT } from "@/utils/ScoreTrackerUtils";

type TGameState = NoteKeyboardGameState;
type TGameSettings = NoteKeyboardGameSettings;
type TGameContext = NoteKeyboardGameContext;

export interface NoteKeyboardGameState extends BaseGameState {
  correctNote: NoteOctave;
  selectedNote: NoteOctave | null;
}

export interface NoteKeyboardGameSettings extends BaseGameSettings { }

export interface NoteKeyboardGameContext extends BaseGameContext<TGameState, TGameSettings> {
  submitAnswer?: () => void;
  selectNoteOctave?: (noteOctave: NoteOctave) => void;
}

const NOTE_KEYBOARD_GAME_STATE_DEFAULT: TGameState = {
  ...GameStateUtils.BASE_GAME_STATE_DEFAULT,
  correctNote: NOTE_OCTAVE_DEFAULT,
  selectedNote: null,
};

export const NOTE_KEYBOARD_GAME_SETTINGS_DEFAULT: TGameSettings = {
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

export const NoteKeyboardContext = createContext<TGameContext>({
  gameState: NOTE_KEYBOARD_GAME_STATE_DEFAULT,
  gameSettings: NOTE_KEYBOARD_GAME_SETTINGS_DEFAULT,
  scoreTracker: USE_SCORE_TRACKER_RETURN_DEFAULT,
});
