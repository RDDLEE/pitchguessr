import { useCallback, useContext, useEffect, useRef } from "react";
import * as Tone from "tone/build/esm/index";

import { AppSettingsContext } from "@/contexts/AppSettingsContext";

import AppSettingUtils from "../utils/AppSettingUtils";
import type { NoteOctave } from "../utils/NoteUtils";

interface UseSoundPlayer_Return {
  playNote: (_noteOctave: NoteOctave | null, _noteDuration: number) => void;
  playFreq: (_freqHz: number, _noteDuration: number) => void;
}

const useSoundPlayer = (): UseSoundPlayer_Return => {
  const appSettings = useContext(AppSettingsContext);
  // TODO: Replace with Instrument of type Tone.Monophonic or Tone.Instrument.
  const synthRef = useRef<Tone.Synth | null>(null);

  // FIXME: May have to init synth on PlayButton click.
  useEffect(() => {
    // FIXME: Probably init in useRef.
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

  const playNote = useCallback((noteOctave: NoteOctave | null, noteDuration: number): void => {
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
  }, [appSettings.volume]);

  const playFreq = useCallback((freqHz: number, noteDuration: number): void => {
    if (synthRef.current === null) {
      return;
    }
    if (appSettings.volume === AppSettingUtils.VOLUME_SETTING_MUTE) {
      return;
    }
    synthRef.current.volume.value = appSettings.volume;
    synthRef.current.triggerAttackRelease(freqHz, noteDuration);
  }, [appSettings.volume]);

  return {
    playNote: playNote,
    playFreq: playFreq,
  };
};

export default useSoundPlayer;
