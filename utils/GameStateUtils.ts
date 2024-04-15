import { GenerateNoteOctaveOptions, NoteTypes } from "./NoteUtils";

export interface BaseSoloGameState {
  hasPlayed: boolean;
  isRoundOver: boolean;
}

export interface BaseSoloSettings {
  generateNoteOctaveOptions: GenerateNoteOctaveOptions;
}

export interface SoloMultiChoiceSettings extends BaseSoloSettings {
  numAnswerChoices: number;
}

export interface SoloDirectionSettings extends BaseSoloSettings {
  // TODO: Tone distance.
}

export default class GameStateUtils {
  public static readonly DEFAULT_SOLO_MULTI_CHOICE_SETTINGS: SoloMultiChoiceSettings = {
    numAnswerChoices: 5,
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
}
