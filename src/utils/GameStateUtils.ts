import type { Dispatch, SetStateAction } from "react";

import type { GenerateNoteOctaveOptions } from "./NoteUtils";
import type { UseScoreTracker_Return } from "./ScoreTrackerUtils";

export interface BaseGameState {
  hasPlayed: boolean;
  isRoundOver: boolean;
}

export interface BaseGameSettings {
  generateNoteOctaveOptions: GenerateNoteOctaveOptions;
  noteDuration: number;
}

export interface BaseGameContext<State, Settings> {
  gameState: State;
  setGameState?: Dispatch<SetStateAction<State>>;
  gameSettings: Settings;
  setGameSettings?: Dispatch<SetStateAction<Settings>>;
  scoreTracker: UseScoreTracker_Return;
  onNewRound?: (settings: Settings, shouldResetScore: boolean) => void;
  onPlay?: () => void;
}

export default class GameStateUtils {
  public static readonly BASE_GAME_STATE_DEFAULT = {
    hasPlayed: false,
    isRoundOver: false,
  };

  public static readonly NOTE_DURATION_SETTING_MIN = 0.25;

  public static readonly NOTE_DURATION_SETTING_MAX = 2.0;

  public static readonly NOTE_DURATION_SETTING_DEFAULT = 0.5;
}
