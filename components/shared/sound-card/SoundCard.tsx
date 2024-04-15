"use client";

import { Card, CardBody, CardFooter, CircularProgress, Divider, Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaPlay } from "react-icons/fa";
import useSoundPlayer from "../../../hooks/useSoundPlayer";
import { NoteOctave } from "../../../utils/NoteUtils";

export interface SoundCard_Props {
  noteOctave: NoteOctave | null;
  onClick_PlayButton?: () => void;
}

export default function SoundCard(props: SoundCard_Props): JSX.Element {
  const soundPlayer = useSoundPlayer();

  const onClick_PlayButton = (): void => {
    soundPlayer.playNote(props.noteOctave);
    if (props.onClick_PlayButton) {
      props.onClick_PlayButton();
    }
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
          onClick={onClick_PlayButton}
        />
      </CardFooter>
    </Card>
  );
}
