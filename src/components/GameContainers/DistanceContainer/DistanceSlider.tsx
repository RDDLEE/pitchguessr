import { Button, Flex, Slider } from "@mantine/core";
import React, { useCallback, useContext, useState } from "react";

import { DistanceContext } from "./DistanceContext";

const GAME_CONTEXT = DistanceContext;

export default function DistanceSlider(): JSX.Element {
  const distanceContext = useContext(GAME_CONTEXT);

  const [distance, setDistance] = useState<number>(0);

  const onChange_AnswerSlider = useCallback((value: number): void => {
    setDistance(value);
  }, []);

  const onClick_SubmitButton = useCallback((): void => {
    if (distanceContext.submitAnswer === undefined) {
      return;
    }
    distanceContext.submitAnswer(distance);
  }, [distance, distanceContext]);

  const renderSlider = (): JSX.Element => {
    const minOctave = distanceContext.gameSettings.generateNoteOctaveOptions.octaveOptions.min;
    const maxOcatve = distanceContext.gameSettings.generateNoteOctaveOptions.octaveOptions.max;
    const octaveDist = Math.abs(minOctave - maxOcatve);
    const maxSteps = (octaveDist + 1) * 12;
    return (
      <Slider
        defaultValue={0}
        min={0}
        max={maxSteps}
        step={1}
        onChange={onChange_AnswerSlider}
        value={distance}
        size="lg"
        w="100%"
        mb="md"
      />
    );
  };

  return (
    <Flex
      justify="flex-start"
      align="center"
      direction="column"
      wrap="wrap"
      w="100%"
    >
      {renderSlider()}
      <Button
        color="teal"
        variant="filled"
        onClick={onClick_SubmitButton}
        disabled={
          distanceContext.gameState.isRoundOver === true
          || !(distanceContext.gameState.hasPlayed && distanceContext.gameState.hasPlayedSecond)
        }
      >
        Submit
      </Button>
    </Flex>
  );
}
