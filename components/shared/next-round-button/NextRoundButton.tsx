import React from "react";
import { Button } from "@chakra-ui/react";

export interface NextRoundButton_Params {
  onClick_NextRoundButton: () => void;
}

export default function NextRoundButton(params: NextRoundButton_Params): JSX.Element {
  return (
    <Button
      colorScheme="teal"
      variant="solid"
      onClick={params.onClick_NextRoundButton}
    >
      Next Round
    </Button>
  );
}
