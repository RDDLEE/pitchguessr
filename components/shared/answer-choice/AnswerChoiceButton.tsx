"use client";

import { Button } from "@chakra-ui/react";
import React from "react";

export interface AnswerChoiceButton_Params {
  id: string;
  text: string;
  onClick_Button: (_answerChoice: string) => void;
  isCorrect: boolean;
  hasPlayed: boolean;
  isRoundOver: boolean;
}

export default function AnswerChoiceButton(params: AnswerChoiceButton_Params): JSX.Element {
  const onClick_Button = (): void => {
    params.onClick_Button(params.id);
  };

  const determineColorScheme = (): string => {
    if (params.isRoundOver === false) {
      return "teal";
    }
    if (params.isCorrect === true) {
      return "green";
    }
    return "red";
  };

  const determineVariant = (): string => {
    if (params.isRoundOver === true && params.isCorrect === true) {
      return "solid";
    }
    return "outline";
  };

  return (
    <Button
      colorScheme={determineColorScheme()}
      variant={determineVariant()}
      onClick={onClick_Button}
      isDisabled={params.isRoundOver === true || params.hasPlayed === false}
    >
      {params.text}
    </Button>
  );
}
