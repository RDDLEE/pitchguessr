import React, { useCallback, useMemo } from "react";

import useSoundPlayer from "@/hooks/useSoundPlayer";
import type { MusicalOctave, NoteOctave } from "@/utils/NoteUtils";
import NoteUtils from "@/utils/NoteUtils";

import type { IPianoContext } from "./PianoContext";
import { PianoContext } from "./PianoContext";
import PianoKey from "./PianoKey/PianoKey";

interface Piano_props {
  startOctave: MusicalOctave;
  endOctave: MusicalOctave;
  postPlay_PianoKey?: (noteOctave: NoteOctave) => void;
}

export default function Piano(props: Piano_props): JSX.Element {
  const startOctave = props.startOctave;
  const endOctave = props.endOctave;

  const soundPlayer = useSoundPlayer();

  const renderPianoKeys = (): JSX.Element[] => {
    const pianoKeys: JSX.Element[] = [];
    const noteOctaves = NoteUtils.getNoteOctavesInOctaveRange(startOctave, endOctave);
    for (const noteOctave of noteOctaves) {
      pianoKeys.push((
        <PianoKey key={NoteUtils.convertNoteOctaveToString(noteOctave)} noteOctave={noteOctave} />
      ));
    }
    return pianoKeys;
  };

  const onPlay_PianoKey = useCallback((noteOctave: NoteOctave): void => {
    soundPlayer.playNote([noteOctave], 0.05);
    if (props.postPlay_PianoKey) {
      props.postPlay_PianoKey(noteOctave);
    }
  }, [props, soundPlayer]);

  const pianoContext = useMemo<IPianoContext>(() => {
    return {
      onPlay_PianoKey: onPlay_PianoKey,
    };
  }, [onPlay_PianoKey]);

  return (
    <div className="w-full max-w-full overflow-x-auto">
      <div className="flex flex-row flex-nowrap items-start justify-start gap-0" style={{ height: "100px" }}>
        <PianoContext.Provider value={pianoContext}>
          {renderPianoKeys()}
        </PianoContext.Provider>
      </div>
    </div>
  );
}
