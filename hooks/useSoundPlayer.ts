"use client";

import { useContext, useEffect, useRef } from "react";
import * as Tone from "tone/build/esm/index";
import { NoteOctave } from "../utils/NoteUtils";
import { AppSettingsContext } from "../components/global/AppSettingsProvider";
import AppSettingUtils from "../utils/AppSettingUtils";

export interface UseSoundPlayer_Return {
  playNote: (_noteOctave: NoteOctave | null, _noteDuration: number) => void;
}

// TODO: Instrument as a param.
const useSoundPlayer = (): UseSoundPlayer_Return => {
  const appSettings = useContext(AppSettingsContext);
  // TODO: Replace with Instrument of type Tone.Monophonic or Tone.Instrument.
  const synthRef = useRef<Tone.Synth | null>(null);

  // FIXME: May have to init synth on PlayButton click.
  useEffect(() => {
    const initSynth = (): Tone.Synth | null => {
      if (typeof window === "undefined" || !window.AudioContext) {
        return null;
      }
      const synth = new Tone.Synth().toDestination();
      synth.volume.value = 0;
      return synth;
    };
    synthRef.current = initSynth();

    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
      }
    };
  }, []);

  // TODO: Note duration
  const playNote = (noteOctave: NoteOctave | null, noteDuration: number): void => {
    if (noteOctave === null) {
      return;
    }
    // TODO: Replace Synth with Sampler or other instruments.
    if (synthRef.current === null) {
      return;
    }
    if (appSettings.volume === AppSettingUtils.VOLUME_SETTING_MUTE) {
      return;
    }
    synthRef.current.volume.value = appSettings.volume;
    synthRef.current.triggerAttackRelease(`${noteOctave.note}${noteOctave.octave}`, noteDuration);
  };

  return {
    playNote: playNote,
  };
};

export default useSoundPlayer;
