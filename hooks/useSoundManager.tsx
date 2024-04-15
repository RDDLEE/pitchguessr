"use client";

import { useEffect, useRef } from "react";
import * as Tone from "tone/build/esm/index";

export interface UseSoundManager_Params {

}

export interface ProduceSoundOptions {
  // noteRange: unknown;
  // soundDuration: number;
  // scale: unknown;
}

export interface UseSoundManager_Return {
  produceSound: (options: ProduceSoundOptions) => void;
}

const useSoundManager = (params: UseSoundManager_Params): UseSoundManager_Return => {
  // TODO: Replace with Instrument of type Tone.Monophonic or Tone.Instrument.
  const synthRef = useRef<Tone.Synth | null>(null);

  useEffect(() => {
    const initSynth = (): Tone.Synth | null => {
      if (typeof window === "undefined" || !window.AudioContext) {
        return null;
      }
      const synth = new Tone.Synth().toDestination();
      synth.volume.value = -10;
      return synth;
    };
    synthRef.current = initSynth();

    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
      }
    };
  }, []);

  // TODO: ChooseKey options.
  const chooseNote = (): string => {
    // TODO: Handle accidentals/scales.
    const naturalNotes: string[] = ["A", "B", "C", "D", "E", "F", "G"];
    // const notesWithAccidentals: string[] = [
    // 'A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab'
    // ];
    const randIdx = Math.floor(Math.random() * naturalNotes.length);
    const randNote = naturalNotes[randIdx];
    return randNote;
  };

  const chooseOctave = (): string => {
    // TODO: Handle octave range.
    const randOctave = Math.floor(Math.random() * 9);
    return randOctave.toString();
  };

  const produceSound = (options: ProduceSoundOptions): void => {
    if (synthRef.current === null) {
      return;
    }
    // TODO: Replace Synth with Sampler or other instruments.
    synthRef.current.volume.value = -25;

    const note: string = chooseNote();
    const octave: string = chooseOctave();
    const noteOctave = `${note}${octave}`;
    synthRef.current.triggerAttackRelease(noteOctave, "0.5");
  };

  return {
    produceSound: produceSound,
  };
};

export default useSoundManager;
