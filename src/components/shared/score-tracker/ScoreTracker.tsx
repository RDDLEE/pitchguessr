import { Card, Flex, Text, Tooltip } from "@mantine/core";
import React from "react";

import type { ScoreTrackerState } from "../../../hooks/useScoreTracker";
import StyleUtils from "../../../utils/StyleUtils";

export interface ScoreTracker_Props {
  scoreStats: ScoreTrackerState;
}

export default function ScoreTracker(props: ScoreTracker_Props): JSX.Element {
  const isCorrectTooltipOpen = (): boolean => {
    const scoreStats = props.scoreStats;
    if (scoreStats.didAnswer) {
      if (scoreStats.wasCorrect) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const isIncorrectTooltipOpen = (): boolean => {
    const scoreStats = props.scoreStats;
    if (scoreStats.didAnswer) {
      if (scoreStats.wasCorrect) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

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
        <Tooltip
          label="😃"
          opened={isCorrectTooltipOpen()}
          position="left-start"
          withArrow={true}
          arrowOffset={14}
          arrowSize={8}
          offset={10}
        >
          <Text c="green.7">
            {`${props.scoreStats.numCorrect} correct`}
          </Text>
        </Tooltip>
        <Tooltip
          label="😭"
          opened={isIncorrectTooltipOpen()}
          position="left-start"
          withArrow={true}
          arrowOffset={14}
          arrowSize={8}
          offset={10}
        >
          <Text c="red.7">
            {`${props.scoreStats.numIncorrect} incorrect`}
          </Text>
        </Tooltip>
      </Flex>
    </Card>
  );
}
