import { createContext } from "react";

import type { BaseGameContext, BaseGameSettings, BaseGameState } from "@/utils/GameStateUtils";
import GameStateUtils from "@/utils/GameStateUtils";
import type { NoteOctave } from "@/utils/NoteUtils";
import { NOTE_OCTAVE_DEFAULT, NoteTypes } from "@/utils/NoteUtils";
import { USE_SCORE_TRACKER_RETURN_DEFAULT } from "@/utils/ScoreTrackerUtils";

export interface DistanceGameState extends BaseGameState {
  firstNoteOctave: NoteOctave;
  secondNoteOctave: NoteOctave;
  correctDistance: number;
  hasPlayedSecond: boolean;
}

const DISTANCE_GAME_STATE_DEFAULT: DistanceGameState = {
  ...GameStateUtils.BASE_GAME_STATE_DEFAULT,
  firstNoteOctave: NOTE_OCTAVE_DEFAULT,
  secondNoteOctave: NOTE_OCTAVE_DEFAULT,
  correctDistance: 0,
  hasPlayedSecond: false,
};

export interface DistanceGameSettings extends BaseGameSettings {
  // TODO: Min/max distance.
}

export const DISTANCE_SETTINGS_DEFAULT: DistanceGameSettings = {
  noteDuration: GameStateUtils.NOTE_DURATION_SETTING_DEFAULT,
  generateNoteOctaveOptions: {
    octaveOptions: {
      min: 4,
      max: 4,
    },
    noteOptions: {
      noteType: NoteTypes.NATURAL,
    },
  },
};

export interface DistanceGameContext extends BaseGameContext<DistanceGameState, DistanceGameSettings> {
  onPlaySecond?: () => void;
  submitAnswer?: (distance: number) => void;
}

export const DistanceContext = createContext<DistanceGameContext>({
  gameState: DISTANCE_GAME_STATE_DEFAULT,
  gameSettings: DISTANCE_SETTINGS_DEFAULT,
  scoreTracker: USE_SCORE_TRACKER_RETURN_DEFAULT,
});
