import { createContext } from "react";

import type { BaseGameContext, BaseGameSettings, BaseGameState } from "@/utils/GameStateUtils";
import GameStateUtils from "@/utils/GameStateUtils";
import type { NoteOctave } from "@/utils/NoteUtils";
import { NOTE_OCTAVE_DEFAULT, NoteTypes } from "@/utils/NoteUtils";
import { USE_SCORE_TRACKER_RETURN_DEFAULT } from "@/utils/ScoreTrackerUtils";

export interface SliderGameState extends BaseGameState {
  correctNoteOctave: NoteOctave;
}

const SLIDER_GAME_STATE_DEFAULT: SliderGameState = {
  ...GameStateUtils.BASE_GAME_STATE_DEFAULT,
  correctNoteOctave: NOTE_OCTAVE_DEFAULT,
};

export interface SliderGameSettings extends BaseGameSettings {
  // TODO: Min/max distance.
}

export const SLIDER_GAME_SETTINGS_DEFAULT: SliderGameSettings = {
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

export interface SliderGameContext extends BaseGameContext<SliderGameState, SliderGameSettings> {
  submitAnswer?: (sliderAnswerHz: number) => void;
}

export const SliderContext = createContext<SliderGameContext>({
  gameState: SLIDER_GAME_STATE_DEFAULT,
  gameSettings: SLIDER_GAME_SETTINGS_DEFAULT,
  scoreTracker: USE_SCORE_TRACKER_RETURN_DEFAULT,
});
