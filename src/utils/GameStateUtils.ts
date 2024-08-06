import type { GenerateNoteOctaveOptions } from "./NoteUtils";
import { NoteTypes } from "./NoteUtils";

export interface BaseSoloGameState {
  hasPlayed: boolean;
  isRoundOver: boolean;
}

export interface BaseSoloSettings {
  generateNoteOctaveOptions: GenerateNoteOctaveOptions;
  noteDuration: number;
}

export interface SoloMultiChoiceSettings extends BaseSoloSettings {
  numAnswerChoices: number;
}

export interface SoloDirectionSettings extends BaseSoloSettings {
  // TODO: Tone distance.
}

export interface SoloSliderSettings extends BaseSoloSettings {}

export default class GameStateUtils {
  public static readonly NOTE_DURATION_SETTING_MIN = 0.25;

  public static readonly NOTE_DURATION_SETTING_MAX = 2.0;

  private static readonly NOTE_DURATION_SETTING_DEFAULT = 0.5;

  public static readonly DEFAULT_SOLO_MULTI_CHOICE_SETTINGS: SoloMultiChoiceSettings = {
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

  public static readonly DEFAULT_SOLO_DIRECTIONAL_SETTINGS: SoloDirectionSettings = {
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

  public static readonly DEFAULT_SOLO_SLIDER_SETTINGS: SoloSliderSettings = {
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
