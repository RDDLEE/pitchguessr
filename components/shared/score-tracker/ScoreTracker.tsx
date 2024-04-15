import React from "react";
import { Card, CardBody, Divider, Text } from "@chakra-ui/react";
import { ScoreTrackerState } from "../../../hooks/useScoreTracker";

export interface ScoreTracker_Params {
  scoreStats: ScoreTrackerState;
}

export default function ScoreTracker(params: ScoreTracker_Params): JSX.Element {
  return (
    <Card variant="outline" align="center" maxWidth="350px">
      <CardBody>
        <Text fontSize="2xl" color="green">{`${params.scoreStats.numCorrect} correct`}</Text>
        <Divider />
        <Text fontSize="2xl" color="red">{`${params.scoreStats.numIncorrect} incorrect`}</Text>

      </CardBody>
    </Card>
  );
}
