import { createContext } from "react";

import type { BaseGameContext, BaseGameSettings, BaseGameState } from "@/utils/GameStateUtils";
import GameStateUtils from "@/utils/GameStateUtils";
import type { MusicalNote, NoteOctave } from "@/utils/NoteUtils";
import { NoteTypes } from "@/utils/NoteUtils";
import { USE_SCORE_TRACKER_RETURN_DEFAULT } from "@/utils/ScoreTrackerUtils";

type TGameState = ChordGameState;
type TGameSettings = ChordGameSettings;
type TGameContext = ChordGameContext;

export interface ChordGameState extends BaseGameState {
  correctNotes: NoteOctave[];
  selectedNotes: MusicalNote[];
}

export interface ChordGameSettings extends BaseGameSettings {
  // TODO: Number of notes.
}

export interface ChordGameContext extends BaseGameContext<TGameState, TGameSettings> {
  submitAnswer?: () => void;
  addSelectedNote?: (note: MusicalNote) => void;
  removeSelectedNote?: (note: MusicalNote) => void;
}

const CHORD_GAME_STATE_DEFAULT: TGameState = {
  ...GameStateUtils.BASE_GAME_STATE_DEFAULT,
  correctNotes: [],
  selectedNotes: [],
};

export const CHORD_GAME_SETTINGS_DEFAULT: TGameSettings = {
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

export const ChordContext = createContext<TGameContext>({
  gameState: CHORD_GAME_STATE_DEFAULT,
  gameSettings: CHORD_GAME_SETTINGS_DEFAULT,
  scoreTracker: USE_SCORE_TRACKER_RETURN_DEFAULT,
});
