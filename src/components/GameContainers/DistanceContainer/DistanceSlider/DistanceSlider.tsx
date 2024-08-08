import { Button, Flex, Slider } from "@mantine/core";
import React, { useCallback, useContext, useState } from "react";

import { DistanceContext } from "@/contexts/DistanceContext";

export default function DistanceSlider(): JSX.Element {
  const distanceContext = useContext(DistanceContext);

  const minDist = 0;
  const maxDist = 12;

  const [distance, setDistance] = useState<number>(0);

  const onChange_AnswerSlider = (value: number): void => {
    setDistance(value);
  };

  const onClick_SubmitButton = useCallback((): void => {
    if (distanceContext.submitAnswer === undefined) {
      return;
    }
    distanceContext.submitAnswer(distance);
  }, [distance, distanceContext]);

  return (
    <Flex
      justify="flex-start"
      align="center"
      direction="column"
      wrap="wrap"
      w="100%"
    >
      <Slider
        defaultValue={0}
        min={minDist}
        max={maxDist}
        step={1}
        onChange={onChange_AnswerSlider}
        value={distance}
        size="lg"
        w="100%"
        mb="md"
      />
      <Button
        color="teal"
        variant="filled"
        onClick={onClick_SubmitButton}
        disabled={distanceContext.gameState.isRoundOver === true || distanceContext.gameState.hasPlayed === false}
      >
        Submit
      </Button>
    </Flex>
  );
}
