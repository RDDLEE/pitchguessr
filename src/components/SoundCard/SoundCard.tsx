import { ActionIcon, Card, Center, Tooltip } from "@mantine/core";
import React, { useCallback } from "react";
import { FaPlay } from "react-icons/fa";

import useSoundPlayer from "../../hooks/useSoundPlayer";
import type { NoteOctave } from "../../utils/NoteUtils";

interface SoundCard_Props {
  noteOctave: NoteOctave | null;
  noteDuration: number;
  onClick_PlayButton?: () => void;
  hasPlayed: boolean;
  tooltipText?: string;
  disabled?: boolean;
}

export default function SoundCard(props: SoundCard_Props): JSX.Element {
  const soundPlayer = useSoundPlayer();

  const onClick_PlayButton = useCallback((): void => {
    soundPlayer.playNote(props.noteOctave, props.noteDuration);
    if (props.onClick_PlayButton) {
      props.onClick_PlayButton();
    }
  }, [props, soundPlayer]);

  const getToolTipText = (): string => {
    const tooltipText = props.tooltipText;
    if (tooltipText === undefined) {
      return "Play Me!";
    }
    return tooltipText;
  };

  const isButtonDisabled = (): boolean => {
    const isDisabled = props.disabled;
    if (isDisabled === undefined) {
      return false;
    }
    return isDisabled;
  };

  return (
    <Card
      className="w-full flex-1"
      withBorder={true}
    >
      <Center>
        <Tooltip
          label={getToolTipText()}
          position="top"
          withArrow={true}
          opened={props.hasPlayed === false}
        >
          <ActionIcon
            variant="gradient"
            size="xl"
            aria-label="Play Button"
            gradient={{ from: "blue", to: "cyan", deg: 0 }}
            onClick={onClick_PlayButton}
            radius="xl"
            disabled={isButtonDisabled()}
          >
            <FaPlay />
          </ActionIcon>
        </Tooltip>
      </Center>
    </Card>
  );
}
