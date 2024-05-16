import { Button } from "@mantine/core";
import React from "react";

export interface NextRoundButton_Props {
  onClick_NextRoundButton: () => void;
}

export default function NextRoundButton(props: NextRoundButton_Props): JSX.Element {
  return (
    <Button
      color="teal.7"
      variant="filled"
      onClick={props.onClick_NextRoundButton}
      mt={2}
    >
      Next Round
    </Button>
  );
}
