import React from "react";
import { Card, CardBody, Divider, Text } from "@chakra-ui/react";
import { ScoreTrackerState } from "../../../hooks/useScoreTracker";

export interface ScoreTracker_Props {
  scoreStats: ScoreTrackerState;
}

export default function ScoreTracker(props: ScoreTracker_Props): JSX.Element {
  return (
    <Card variant="outline" align="center" maxWidth="350px">
      <CardBody>
        <Text fontSize="2xl" color="green">{`${props.scoreStats.numCorrect} correct`}</Text>
        <Divider />
        <Text fontSize="2xl" color="red">{`${props.scoreStats.numIncorrect} incorrect`}</Text>

      </CardBody>
    </Card>
  );
}
