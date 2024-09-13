import { Button } from "@mantine/core";
import React, { useCallback, useContext } from "react";

import { ChordContext } from "@/contexts/ChordContext";
import type { MusicalNote } from "@/utils/NoteUtils";
import StyleUtils from "@/utils/StyleUtils";

interface AnswerChoiceToggleable_Props<P> {
  text: string;
  payload: P;
  onClick_Button?: (_payload: P) => void;
  isCorrect: boolean;
  hasPlayed: boolean;
  isRoundOver: boolean;
}

export default function AnswerChoiceToggleable<P>(props: AnswerChoiceToggleable_Props<P>): JSX.Element {
  // TODO: This should just take a context that implements AnswerChoiceContext.
  const chordContext = useContext(ChordContext);
  const isSelected = chordContext.gameState.selectedNotes.some((note: MusicalNote) => {
    if (note === props.payload) {
      return true;
    }
    return false;
  });

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
      color={StyleUtils.getAnswerChoiceColorScheme(props.isRoundOver, props.isCorrect, isSelected)}
      variant={StyleUtils.getAnswerChoiceVariant(props.isRoundOver, props.isCorrect, isSelected)}
      onClick={onClick_Button}
      disabled={props.hasPlayed === false}
    >
      {props.text}
    </Button>
  );
}
