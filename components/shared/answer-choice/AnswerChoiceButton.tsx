import { Button } from "@chakra-ui/react";
import React from "react";

export interface AnswerChoiceButton_Props {
  id: string;
  text: string;
  onClick_Button: (_answerChoice: string) => void;
  isCorrect: boolean;
  hasPlayed: boolean;
  isRoundOver: boolean;
}

export default function AnswerChoiceButton(props: AnswerChoiceButton_Props): JSX.Element {
  const onClick_Button = (): void => {
    props.onClick_Button(props.id);
  };

  const determineColorScheme = (): string => {
    if (props.isRoundOver === false) {
      return "teal";
    }
    if (props.isCorrect === true) {
      return "green";
    }
    return "red";
  };

  const determineVariant = (): string => {
    if (props.isRoundOver === true && props.isCorrect === true) {
      return "solid";
    }
    return "outline";
  };

  return (
    <Button
      colorScheme={determineColorScheme()}
      variant={determineVariant()}
      onClick={onClick_Button}
      isDisabled={props.isRoundOver === true || props.hasPlayed === false}
    >
      {props.text}
    </Button>
  );
}
