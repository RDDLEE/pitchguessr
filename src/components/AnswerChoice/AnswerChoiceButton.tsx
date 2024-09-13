import { Button } from "@mantine/core";
import React, { useCallback } from "react";

import StyleUtils from "@/utils/StyleUtils";

interface AnswerChoiceButton_Props<P> {
  text: string;
  payload: P;
  onClick_Button?: (_payload: P) => void;
  isCorrect: boolean;
  hasPlayed: boolean;
  isRoundOver: boolean;
}

export default function AnswerChoiceButton<P>(props: AnswerChoiceButton_Props<P>): JSX.Element {
  const onClick_Button = useCallback((): void => {
    const isDisabled = props.isRoundOver === true || props.hasPlayed === false;
    if (isDisabled) {
      return;
    }
    if (props.onClick_Button) {
      props.onClick_Button(props.payload);
    }
  }, [props]);

  return (
    <Button
      color={StyleUtils.getAnswerChoiceColorScheme(props.isRoundOver, props.isCorrect, null)}
      variant={StyleUtils.getAnswerChoiceVariant(props.isRoundOver, props.isCorrect, null)}
      onClick={onClick_Button}
      disabled={props.hasPlayed === false}
    >
      {props.text}
    </Button>
  );
}
