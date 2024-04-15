import React from "react";
import { Button } from "@chakra-ui/react";

export interface NextRoundButton_Props {
  onClick_NextRoundButton: () => void;
}

export default function NextRoundButton(props: NextRoundButton_Props): JSX.Element {
  return (
    <Button
      colorScheme="teal"
      variant="solid"
      onClick={props.onClick_NextRoundButton}
    >
      Next Round
    </Button>
  );
}
