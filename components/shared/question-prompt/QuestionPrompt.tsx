import { Text } from "@mantine/core";
import React from "react";

export interface QuestionPrompt_Props {
  text: string;
}

export default function QuestionPrompt(props: QuestionPrompt_Props): JSX.Element {
  return (
    <Text size="sm">
      {props.text}
    </Text>
  );
}
