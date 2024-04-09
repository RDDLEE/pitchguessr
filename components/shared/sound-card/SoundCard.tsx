"use client";

import {
  Card, CardBody, CardFooter, CircularProgress, Divider, Icon, IconButton,
} from "@chakra-ui/react";
import React from "react";
import { FaPlay } from "react-icons/fa";
import useSoundManager from "../../../hooks/useSoundManager";

function SoundCard() {
  const soundManager = useSoundManager({});

  const onClickPlayButton = (): void => {
    // TODO: Implement produceSound options.
    soundManager.produceSound({});
  };

  return (
    <Card variant="outline" align="center" maxWidth="350px">
      <CardBody>
        {/* TODO: Placeholder sound graphic. */}
        <CircularProgress isIndeterminate={true} size="150px" />
      </CardBody>
      <Divider />
      <CardFooter>
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="teal"
          aria-label="Play"
          fontSize="20px"
          icon={<Icon as={FaPlay} />}
          onClick={onClickPlayButton}
        />
      </CardFooter>
    </Card>
  );
}

export default SoundCard;
