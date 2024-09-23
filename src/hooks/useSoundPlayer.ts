import { useCallback, useContext, useEffect, useRef } from "react";
import * as Tone from "tone/build/esm/index";

import { AppSettingsContext } from "@/components/AppSettingsProvider/AppSettingsContext";

import AppSettingUtils from "../utils/AppSettingUtils";
import type { NoteOctave } from "../utils/NoteUtils";
import NoteUtils from "../utils/NoteUtils";

interface UseSoundPlayer_Return {
  playNote: (_noteOctaves: NoteOctave[], _noteDuration: number) => void;
  playFreq: (_freqHz: number, _noteDuration: number) => void;
}

const useSoundPlayer = (): UseSoundPlayer_Return => {
  const appSettings = useContext(AppSettingsContext);
  // TODO: Replace with Instrument of type Tone.Monophonic or Tone.Instrument.
  const synthRef = useRef<Tone.PolySynth | null>(null);

  // FIXME: May have to init synth on PlayButton click.
  useEffect(() => {
    // FIXME: Probably init in useRef.
    const initSynth = (): Tone.PolySynth | null => {
      if (typeof window === "undefined" || !window.AudioContext) {
        return null;
      }
      const synth = new Tone.PolySynth().toDestination();
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

  const playNote = useCallback((noteOctaves: NoteOctave[], noteDuration: number): void => {
    // TODO: Replace Synth with Sampler or other instruments.
    if (synthRef.current === null) {
      return;
    }
    if (appSettings.volume === AppSettingUtils.VOLUME_SETTING_MUTE) {
      return;
    }
    synthRef.current.volume.value = appSettings.volume;
    const notes: string[] = noteOctaves.map((value) => { return NoteUtils.convertNoteOctaveToString(value); });
    synthRef.current.triggerAttackRelease(notes, noteDuration);
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
