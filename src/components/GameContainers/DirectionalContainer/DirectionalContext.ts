import { createContext } from "react";

import type { BaseGameContext, BaseGameSettings, BaseGameState } from "@/utils/GameStateUtils";
import GameStateUtils from "@/utils/GameStateUtils";
import type { NoteOctave, PitchDirection } from "@/utils/NoteUtils";
import { NOTE_OCTAVE_DEFAULT, NoteTypes } from "@/utils/NoteUtils";
import { USE_SCORE_TRACKER_RETURN_DEFAULT } from "@/utils/ScoreTrackerUtils";

type TGameState = DirectionalGameState;
type TGameSettings = DirectionalGameSettings;
type TGameContext = DirectionalGameContext;

export interface DirectionalGameState extends BaseGameState {
  firstNoteOctave: NoteOctave;
  secondNoteOctave: NoteOctave;
  correctDirection: PitchDirection;
  hasPlayedSecond: boolean;
}

export interface DirectionalGameSettings extends BaseGameSettings {
  // TODO: Tone distance.
}

export interface DirectionalGameContext extends BaseGameContext<TGameState, TGameSettings> {
  onPlaySecond?: () => void;
  submitAnswer?: (answerChoice: string) => void;
}

const DIRECTIONAL_GAME_STATE_DEFAULT: TGameState = {
  ...GameStateUtils.BASE_GAME_STATE_DEFAULT,
  firstNoteOctave: NOTE_OCTAVE_DEFAULT,
  secondNoteOctave: NOTE_OCTAVE_DEFAULT,
  correctDirection: 0,
  hasPlayedSecond: false,
};

export const DIRECTIONAL_GAME_SETTINGS_DEFAULT: TGameSettings = {
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

export const DirectionalContext = createContext<TGameContext>({
  gameState: DIRECTIONAL_GAME_STATE_DEFAULT,
  gameSettings: DIRECTIONAL_GAME_SETTINGS_DEFAULT,
  scoreTracker: USE_SCORE_TRACKER_RETURN_DEFAULT,
});
