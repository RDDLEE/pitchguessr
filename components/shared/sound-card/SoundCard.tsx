"use client";

import { Box, Card, CardFooter, Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaPlay } from "react-icons/fa";
import useSoundPlayer from "../../../hooks/useSoundPlayer";
import { NoteOctave } from "../../../utils/NoteUtils";

export interface SoundCard_Props {
  noteOctave: NoteOctave | null;
  noteDuration: number;
  onClick_PlayButton?: () => void;
  width: number;
}

export default function SoundCard(props: SoundCard_Props): JSX.Element {
  const soundPlayer = useSoundPlayer();

  const onClick_PlayButton = (): void => {
    soundPlayer.playNote(props.noteOctave, props.noteDuration);
    if (props.onClick_PlayButton) {
      props.onClick_PlayButton();
    }
  };

  // TODO: Placeholder sound graphic.
  return (
    <Box>
      <Card variant="outline" align="center" w={props.width} maxWidth="350px">
        <CardFooter>
          <IconButton
            isRound={true}
            variant="solid"
            colorScheme="teal"
            aria-label="Play"
            fontSize="25px"
            icon={<Icon as={FaPlay} />}
            onClick={onClick_PlayButton}
            size="lg"
          />
        </CardFooter>
      </Card>
    </Box>
  );
}
