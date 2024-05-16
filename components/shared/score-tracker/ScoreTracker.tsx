import React from "react";
import { ScoreTrackerState } from "../../../hooks/useScoreTracker";
import StyleUtils from "../../../utils/StyleUtils";
import { Card, Flex, Text } from "@mantine/core";

export interface ScoreTracker_Props {
  scoreStats: ScoreTrackerState;
}

export default function ScoreTracker(props: ScoreTracker_Props): JSX.Element {
  return (
    <Card
      withBorder={true}
      w={StyleUtils.STANDARD_GAMEPLAY_ITEM_WIDTH}
    >
      <Flex
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
        w="100%"
      >
        <Text>{`${props.scoreStats.numCorrect} correct`}</Text>
        <Text>{`${props.scoreStats.numIncorrect} incorrect`}</Text>
      </Flex>
    </Card>
  );
}
