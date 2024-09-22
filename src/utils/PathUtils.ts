export enum EGameDifficultyTypes {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

export interface GameData {
  name: string;
  difficulty: EGameDifficultyTypes,
  description: string;
  link: string;
}

export default class PathUtils {
  public static readonly HOME_PATH = "/";

  public static readonly NOTE_KEYBOARD_PATH = "/note-keyboard";

  public static readonly DIRECTIONAL_PATH = "/directional";

  public static readonly CHORD_PATH = "/chord";

  public static readonly DISTANCE_PATH = "/distance";

  public static readonly MULTI_CHOICE_PATH = "/multi-choice";

  public static readonly SLIDER_PATH = "/slider";

  public static readonly games: GameData[] = [
    {
      name: "Note (Piano)",
      difficulty: EGameDifficultyTypes.EASY,
      description: "Recommended for beginners. Match the played note with the piano/keyboard.",
      link: PathUtils.NOTE_KEYBOARD_PATH,
    },
    {
      name: "Directional",
      difficulty: EGameDifficultyTypes.EASY,
      description: "Is the second note lower, equal or higher to the first note?",
      link: PathUtils.DIRECTIONAL_PATH,
    },
    {
      name: "Distance",
      difficulty: EGameDifficultyTypes.MEDIUM,
      description: "How many half-steps are between two notes?",
      link: PathUtils.DISTANCE_PATH,
    },
    {
      name: "Multi-Choice",
      difficulty: EGameDifficultyTypes.MEDIUM,
      description: "Given a set of choices, guess what note was played.",
      link: PathUtils.MULTI_CHOICE_PATH,
    },
    {
      name: "Chord",
      difficulty: EGameDifficultyTypes.HARD,
      description: "Guess the notes in the chord.",
      link: PathUtils.CHORD_PATH,
    },
    {
      name: "Slider",
      difficulty: EGameDifficultyTypes.HARD,
      description: "Use the slider to match the note.",
      link: PathUtils.SLIDER_PATH,
    },
  ];
}
