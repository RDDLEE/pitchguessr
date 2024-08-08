import { Button } from "@mantine/core";
import React from "react";

export interface AnswerChoiceButton_Props {
  id: string;
  text: string;
  onClick_Button?: (_answerChoice: string) => void;
  isCorrect: boolean;
  hasPlayed: boolean;
  isRoundOver: boolean;
}

export default function AnswerChoiceButton(props: AnswerChoiceButton_Props): JSX.Element {
  const onClick_Button = (): void => {
    const disabled = props.isRoundOver === true || props.hasPlayed === false;
    if (disabled) {
      return;
    }
    if (props.onClick_Button) {
      props.onClick_Button(props.id);
    }
  };

  const calcColorScheme = (): string => {
    if (props.isRoundOver === false) {
      return "teal.7";
    }
    if (props.isCorrect === true) {
      return "green.7";
    }
    return "red.7";
  };

  const calcVariant = (): string => {
    if (props.isRoundOver === true && props.isCorrect === true) {
      return "filled";
    }
    return "outline";
  };

  return (
    <Button
      color={calcColorScheme()}
      variant={calcVariant()}
      onClick={onClick_Button}
      disabled={props.hasPlayed === false}
    >
      {props.text}
    </Button>
  );
}
