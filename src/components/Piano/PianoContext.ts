import { createContext } from "react";

import type { NoteOctave } from "@/utils/NoteUtils";

export interface IPianoContext {
  onPlay_PianoKey?: (noteOctave: NoteOctave) => void;
}

export const PianoContext = createContext<IPianoContext>({

});
