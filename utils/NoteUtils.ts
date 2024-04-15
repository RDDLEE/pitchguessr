export type MusicalNote = "C" | "C#" | "Db" | "D" | "D#" | "Eb" | "E" | "F" | "F#" | "Gb" | "G" | "G#" | "Ab" | "A" | "A#" | "Bb" | "B";

export type MusicalOctave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type PitchDirection = -1 | 0 | 1;

export type PitchDirectionText = "Lower" | "Equal" | "Higher";

export interface GenerateOctaveOptions {
  min: number;
  max: number;
}

export enum NoteTypes {
  NATURAL = "NATURAL",
  SHARPS = "SHARPS",
  FLATS = "FLATS",
}

export interface NoteOctave {
  note: MusicalNote;
  octave: MusicalOctave;
}

export interface GenerateNoteOptions {
  noteType: NoteTypes;
}

export interface GenerateNoteOctaveOptions {
  octaveOptions: GenerateOctaveOptions;
  noteOptions: GenerateNoteOptions;
}

export interface GenerateNoteOctaveResult {
  noteOctave: NoteOctave;
  noteGroup: MusicalNote[];
}

export default class NoteUtils {
  private static readonly NATURAL_NOTES: MusicalNote[] = ["A", "B", "C", "D", "E", "F", "G"];

  private static readonly SHARP_NOTES: MusicalNote[] = ["A#", "C#", "D#", "F#", "G#"];

  private static readonly FLAT_NOTES: MusicalNote[] = ["Bb", "Db", "Eb", "Gb", "Ab"];

  private static readonly NOTE_VALUES: Record<MusicalNote, number> = {
    C: 0,
    "C#": 1,
    Db: 1,
    D: 2,
    "D#": 3,
    Eb: 3,
    E: 4,
    F: 5,
    "F#": 6,
    Gb: 6,
    G: 7,
    "G#": 8,
    Ab: 8,
    A: 9,
    "A#": 10,
    Bb: 10,
    B: 11,
  };

  public static readonly pitchDirections: PitchDirection[] = [-1, 0, 1];

  private static readonly chooseNoteGroup = (options: GenerateNoteOptions): MusicalNote[] => {
    // TODO: Handle scales.
    let notes = NoteUtils.NATURAL_NOTES;
    if (options.noteType === NoteTypes.SHARPS) {
      notes = notes.concat(NoteUtils.SHARP_NOTES);
    } else if (options.noteType === NoteTypes.FLATS) {
      notes = notes.concat(NoteUtils.FLAT_NOTES);
    }
    return notes;
  };

  private static readonly chooseNote = (notes: MusicalNote[]): MusicalNote => {
    const randIdx = Math.floor(Math.random() * notes.length);
    const randNote = notes[randIdx];
    return randNote;
  };

  private static readonly chooseOctave = (options: GenerateOctaveOptions): MusicalOctave => {
    const min = Math.max(0, options.min);
    const max = Math.min(8, options.max);
    return Math.floor(Math.random() * (max - min + 1)) + min as MusicalOctave;
  };

  public static readonly generateNoteOctave = (options: GenerateNoteOctaveOptions): GenerateNoteOctaveResult => {
    const noteGroup = NoteUtils.chooseNoteGroup(options.noteOptions);
    const note = NoteUtils.chooseNote(noteGroup);
    const octave = NoteUtils.chooseOctave(options.octaveOptions);
    return {
      noteGroup: noteGroup,
      noteOctave: {
        note: note,
        octave: octave,
      },
    };
  };

  private static readonly calculateNoteOctaveValue = (noteOctave: NoteOctave): number => {
    const noteValue = NoteUtils.NOTE_VALUES[noteOctave.note];
    const noteOctaveValue = noteValue + (noteOctave.octave * 12);
    return noteOctaveValue;
  };

  /**
   * Compares the secondNoteOctave to the firstNoteOctave.
   * @Returns the relative pitch direction of the secondNoteOctave in relation to the firstNoteOctave.
   * -1 if the second was lower than the first.
   * 0 if the second is equal to the first.
   * 1 if the second is higher than the first.
   */
  public static readonly compareNoteOctaveValues = (firstNoteOctave: NoteOctave, secondNoteOctave: NoteOctave): PitchDirection => {
    const firstVal = NoteUtils.calculateNoteOctaveValue(firstNoteOctave);
    const secondVal = NoteUtils.calculateNoteOctaveValue(secondNoteOctave);
    if (secondVal === firstVal) {
      return 0;
    }
    if (secondVal > firstVal) {
      return 1;
    }
    return -1;
  };

  public static readonly convertPitchDirectionToText = (pitchDirection: PitchDirection): PitchDirectionText => {
    if (pitchDirection === -1) {
      return "Lower";
    }
    if (pitchDirection === 0) {
      return "Equal";
    }
    return "Higher";
  };
}
