export interface GenerateNoteOctaveOptions {
  // noteRange: unknown;
  // scale: unknown;
}

export type MusicalNote = "C" | "C#" | "Db" | "D" | "D#" | "Eb" | "E" | "F" | "F#" | "Gb" | "G" | "G#" | "Ab" | "A" | "A#" | "Bb" | "B";

export type MusicalOctave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface NoteOctave {
  note: MusicalNote;
  octave: MusicalOctave;
}

export type PitchDirection = -1 | 0 | 1;
export type PitchDirectionText = "Lower" | "Equal" | "Higher";

export default class NoteUtils {
  public static readonly naturalNotes: MusicalNote[] = ["A", "B", "C", "D", "E", "F", "G"];

  public static readonly sharpNotes: MusicalNote[] = ["A#", "C#", "D#", "F#", "G#"];

  public static readonly flatNotes: MusicalNote[] = ["Bb", "Db", "Eb", "Gb", "Ab"];

  public static readonly noteValues: Record<MusicalNote, number> = {
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

  public static readonly chooseNote = (): MusicalNote => {
    // TODO: Handle accidentals/scales.
    const randIdx = Math.floor(Math.random() * NoteUtils.naturalNotes.length);
    const randNote = NoteUtils.naturalNotes[randIdx];
    return randNote;
  };

  public static readonly chooseOctave = (): MusicalOctave => {
    // TODO: Handle octave range.
    // const randOctave = Math.floor(Math.random() * 9);
    return 4;
  };

  public static readonly generateNoteOctave = (options: GenerateNoteOctaveOptions): NoteOctave => {
    const note = NoteUtils.chooseNote();
    const octave = NoteUtils.chooseOctave();
    return {
      note: note,
      octave: octave,
    };
  };

  private static readonly calculateNoteOctaveValue = (noteOctave: NoteOctave): number => {
    const noteValue = NoteUtils.noteValues[noteOctave.note];
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
