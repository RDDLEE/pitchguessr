"use client";

export interface UseNoteSelector_Params {

}

export interface ProduceNoteOptions {
  // noteRange: unknown;
  // soundDuration: number;
  // scale: unknown;
}

export interface NoteOctave {
  note: string;
  octave: string;
}

export interface UseNoteSelector_Return {
  naturalNotes: string[];
  accidentalNotes: string[];
  generateNoteOctave: (_options: ProduceNoteOptions) => NoteOctave;
}

const useNoteSelector = (params: UseNoteSelector_Params): UseNoteSelector_Return => {
  const naturalNotes: string[] = ["A", "B", "C", "D", "E", "F", "G"];
  const accidentalNotes: string[] = ["A#", "Bb", "C#", "Db", "D#", "Eb", "F#", "Gb", "G#", "Ab"];

  // TODO: ChooseKey options.
  const chooseNote = (): string => {
    // TODO: Handle accidentals/scales.
    const randIdx = Math.floor(Math.random() * naturalNotes.length);
    const randNote = naturalNotes[randIdx];
    return randNote;
  };

  const chooseOctave = (): string => {
    // TODO: Handle octave range.
    // const randOctave = Math.floor(Math.random() * 9);
    return "4";
  };

  const generateNoteOctave = (options: ProduceNoteOptions): NoteOctave => {
    const note: string = chooseNote();
    const octave: string = chooseOctave();
    return {
      note: note,
      octave: octave,
    };
  };

  return {
    naturalNotes: naturalNotes,
    accidentalNotes: accidentalNotes,
    generateNoteOctave: generateNoteOctave,
  };
};

export default useNoteSelector;
