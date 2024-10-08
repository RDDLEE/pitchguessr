import * as Tone from "tone/build/esm/index";

export type MusicalNote = "C" | "C#" | "Db" | "D" | "D#" | "Eb" | "E" | "F" | "F#" | "Gb" | "G" | "G#" | "Ab" | "A" | "A#" | "Bb" | "B";

export type MusicalOctave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// FIXME: PitchDirection should be an enum.
export type PitchDirection = -1 | 0 | 1;

export type PitchDirectionText = "Lower" | "Equal" | "Higher";

export interface GenerateOctaveOptions {
  min: MusicalOctave;
  max: MusicalOctave;
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

export const NOTE_OCTAVE_DEFAULT: NoteOctave = {
  note: "A",
  octave: 0,
};

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

  public static readonly OCTAVE_MIN = 0;

  public static readonly OCTAVE_MAX = 8;

  public static readonly PITCH_DIRECTIONS: PitchDirection[] = [-1, 0, 1];

  public static readonly chooseNoteGroup = (options: GenerateNoteOptions): MusicalNote[] => {
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
    // FIXME: Need to check min <= max.
    const min = Math.max(NoteUtils.OCTAVE_MIN, options.min);
    const max = Math.min(NoteUtils.OCTAVE_MAX, options.max);
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

  private static readonly convertValueToNote = (remainder: number): MusicalNote => {
    if (remainder < 0 || remainder > 12) {
      throw Error("Remainder out of bounds.");
    }
    const items = Object.entries(NoteUtils.NOTE_VALUES);
    for (const [note, val] of items) {
      if (val === remainder) {
        return note as MusicalNote;
      }
    }
    throw Error("Failed to convert value to note.");
  };

  private static readonly convertValueToNoteOctave = (value: number): NoteOctave => {
    const octave = Math.floor(value / 12);
    const remainder = value % 12;
    const note = NoteUtils.convertValueToNote(remainder);
    return {
      note: note,
      octave: octave as MusicalOctave,
    };
  };

  public static readonly getStepDifferenceOfNoteValues = (firstNoteOctave: NoteOctave, secondNoteOctave: NoteOctave): number => {
    const firstVal = NoteUtils.calculateNoteOctaveValue(firstNoteOctave);
    const secondVal = NoteUtils.calculateNoteOctaveValue(secondNoteOctave);
    return Math.abs(firstVal - secondVal);
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

  public static readonly convertNoteOctaveToString = (noteOctave: NoteOctave): string => {
    return `${noteOctave.note}${noteOctave.octave}`;
  };

  public static readonly convertNoteOctaveToFrequency = (noteOctave: NoteOctave): number => {
    const hertz = Tone.Frequency(`${noteOctave.note}${noteOctave.octave}`).toFrequency();
    return hertz;
  };

  public static readonly convertFrequencyToNoteOctave = (freq: number): Tone.Unit.Note => {
    const note = Tone.Frequency(freq).toNote();
    return note;
  };

  public static readonly getOctaveBeginningNote = (): MusicalNote => {
    return "C";
  };

  private static readonly getNoteOctavesInRange = (start: NoteOctave, end: NoteOctave): NoteOctave[] => {
    const startVal = NoteUtils.calculateNoteOctaveValue(start);
    const endVal = NoteUtils.calculateNoteOctaveValue(end);
    const noteOctaves: NoteOctave[] = [];
    for (let i = startVal; i < endVal + 1; i++) {
      const noteOctave = NoteUtils.convertValueToNoteOctave(i);
      noteOctaves.push(noteOctave);
    }
    return noteOctaves;
  };

  // Start and end are inclusive. 4 and 5 produces all notes in Octave 4 and 5.
  public static readonly getNoteOctavesInOctaveRange = (start: MusicalOctave, end: MusicalOctave): NoteOctave[] => {
    const startNoteOctave: NoteOctave = {
      note: NoteUtils.getOctaveBeginningNote(),
      octave: start
    };
    const endNoteOctave: NoteOctave = {
      note: "B",
      octave: Math.min(8, end) as MusicalOctave
    };
    return NoteUtils.getNoteOctavesInRange(startNoteOctave, endNoteOctave);
  };
}
