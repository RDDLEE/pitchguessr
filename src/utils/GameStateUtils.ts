import type { GenerateNoteOctaveOptions } from "./NoteUtils";
import { NoteTypes } from "./NoteUtils";

export interface BaseGameState {
  hasPlayed: boolean;
  isRoundOver: boolean;
}

export interface BaseSettings {
  generateNoteOctaveOptions: GenerateNoteOctaveOptions;
  noteDuration: number;
}

export interface MultiChoiceSettings extends BaseSettings {
  numAnswerChoices: number;
}

export interface DirectionSettings extends BaseSettings {
  // TODO: Tone distance.
}

export interface SliderSettings extends BaseSettings {}

export default class GameStateUtils {
  public static readonly NOTE_DURATION_SETTING_MIN = 0.25;

  public static readonly NOTE_DURATION_SETTING_MAX = 2.0;

  private static readonly NOTE_DURATION_SETTING_DEFAULT = 0.5;

  public static readonly DEFAULT_MULTI_CHOICE_SETTINGS: MultiChoiceSettings = {
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

  public static readonly DEFAULT_DIRECTIONAL_SETTINGS: DirectionSettings = {
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

  public static readonly DEFAULT_SLIDER_SETTINGS: SliderSettings = {
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
}
