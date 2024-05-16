import React from "react";
import { FaPlay } from "react-icons/fa";
import useSoundPlayer from "../../../hooks/useSoundPlayer";
import { NoteOctave } from "../../../utils/NoteUtils";
import { ActionIcon, Card, Center, Tooltip } from "@mantine/core";

export interface SoundCard_Props {
  noteOctave: NoteOctave | null;
  noteDuration: number;
  onClick_PlayButton?: () => void;
  width: number;
  hasPlayed: boolean;
}

export default function SoundCard(props: SoundCard_Props): JSX.Element {
  const soundPlayer = useSoundPlayer();

  const onClick_PlayButton = (): void => {
    soundPlayer.playNote(props.noteOctave, props.noteDuration);
    if (props.onClick_PlayButton) {
      props.onClick_PlayButton();
    }
  };

  return (
    <Card
      w={props.width}
      withBorder={true}
    >
      <Center>
        <Tooltip
          label="Play Me!"
          position="top"
          withArrow={true}
          opened={props.hasPlayed === false}
          // zIndex: 199 to be behind modal's 200.
          zIndex={199}
        >
          <ActionIcon
            variant="gradient"
            size="xl"
            aria-label="Play Button"
            gradient={{ from: "blue", to: "cyan", deg: 0 }}
            onClick={onClick_PlayButton}
            radius="xl"
          >
            <FaPlay />
          </ActionIcon>
        </Tooltip>
      </Center>
    </Card>
  );
}
