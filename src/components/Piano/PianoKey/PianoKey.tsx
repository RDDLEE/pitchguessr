import React, { useCallback, useContext } from "react";

import type { NoteOctave } from "@/utils/NoteUtils";

import { PianoContext } from "../PianoContext";

interface PianoKey_Props {
  noteOctave: NoteOctave;
}

export default function PianoKey(props: PianoKey_Props): JSX.Element {
  const pianoContext = useContext(PianoContext);

  const noteOctave = props.noteOctave;
  const note = noteOctave.note;

  let isWhiteKey = true;
  if (note.endsWith("b") || note.endsWith("#")) {
    isWhiteKey = false;
  }

  const makeKeyStyle = (): React.CSSProperties => {
    // TOD: Make width based on size.
    const commonStyles = {
      border: "2px solid black",
      borderRadius: "0 0 6px 6px",
      boxShadow: "0 8px 6px -3px rgba(0, 0, 0, 0.5)",
      margin: "0",
      transition: "box-shadow 0.3s ease",
    };
    if (isWhiteKey) {
      return {
        ...commonStyles,
        height: "100%",
        backgroundColor: "white",
        width: "30px",
      };
    }
    return {
      ...commonStyles,
      position: "relative",
      height: "70%",
      backgroundColor: "black",
      width: "15px",
      marginLeft: "-7.5px",
      marginRight: "-7.5px",
    };
  };

  const onClick_PianoKey = useCallback(() => {
    if (pianoContext.onPlay_PianoKey) {
      pianoContext.onPlay_PianoKey(noteOctave);
    }
  }, [noteOctave, pianoContext]);

  return (
    <button
      type="button"
      aria-label={`Play ${noteOctave.note}${noteOctave.octave}`}
      className="shrink-0"
      style={makeKeyStyle()}
      onClick={onClick_PianoKey}
    />
  );
}
