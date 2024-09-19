import { EGameDifficultyTypes } from "./PathUtils";

export default class StyleUtils {
  private static readonly DIFFICULTY_EASY_COLOR = "green.7";

  private static readonly DIFFICULTY_MEDIUM_COLOR = "orange.7";

  private static readonly DIFFICULTY_HARD_COLOR = "red.7";

  private static readonly ANSWER_CHOICE_DISABLED_COLOR = "teal.7";

  private static readonly ANSWER_CHOICE_SELECTED_COLOR = "blue.7";

  private static readonly ANSWER_CHOICE_CORRECT_COLOR = "green.7";

  private static readonly ANSWER_CHOICE_INCORRECT_COLOR = "red.7";

  private static readonly ANSWER_CHOICE_NEUTRAL_VARIANT = "outline";

  private static readonly ANSWER_CHOICE_DISABLED_VARIANT = "filled";

  private static readonly ANSWER_CHOICE_SELECTED_VARIANT = "filled";

  public static readonly getDifficultyColor = (difficulty: EGameDifficultyTypes): string => {
    if (difficulty === EGameDifficultyTypes.EASY) {
      return StyleUtils.DIFFICULTY_EASY_COLOR;
    }
    if (difficulty === EGameDifficultyTypes.MEDIUM) {
      return StyleUtils.DIFFICULTY_MEDIUM_COLOR;
    }
    if (difficulty === EGameDifficultyTypes.HARD) {
      return StyleUtils.DIFFICULTY_HARD_COLOR;
    }
    return StyleUtils.DIFFICULTY_HARD_COLOR;
  };

  public static readonly getAnswerChoiceColorScheme = (isRoundOver: boolean, isCorrect: boolean, isSelected: null | boolean): string => {
    if (isRoundOver === false) {
      return StyleUtils.ANSWER_CHOICE_DISABLED_COLOR;
    }
    if (isCorrect === true) {
      return StyleUtils.ANSWER_CHOICE_CORRECT_COLOR;
    }
    if (isSelected === true) {
      return StyleUtils.ANSWER_CHOICE_SELECTED_COLOR;
    }
    return StyleUtils.ANSWER_CHOICE_INCORRECT_COLOR;
  };

  public static readonly getAnswerChoiceVariant = (isRoundOver: boolean, isCorrect: boolean, isSelected: null | boolean): string => {
    if (isRoundOver === true && isCorrect === true) {
      return StyleUtils.ANSWER_CHOICE_DISABLED_VARIANT;
    }
    if (isSelected === true) {
      return StyleUtils.ANSWER_CHOICE_SELECTED_VARIANT;
    }
    return StyleUtils.ANSWER_CHOICE_NEUTRAL_VARIANT;
  };
}
