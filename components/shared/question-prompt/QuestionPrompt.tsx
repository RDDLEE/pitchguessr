import { Text } from "@chakra-ui/react";
import React from "react";

export interface QuestionPrompt_Props {
  text: string;
}

export default function QuestionPrompt(props: QuestionPrompt_Props): JSX.Element {
  return (
    <Text fontSize="sm">
      {props.text}
    </Text>
  );
}
