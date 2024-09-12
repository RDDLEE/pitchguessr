import { Text } from "@mantine/core";
import React from "react";

interface QuestionPrompt_Props {
  text: string;
}

export default function QuestionPrompt(props: QuestionPrompt_Props): JSX.Element {
  return (
    <Text className="text-center" size="sm">
      {props.text}
    </Text>
  );
}
