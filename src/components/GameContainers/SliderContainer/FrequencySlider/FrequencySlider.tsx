import { Button, Flex, Slider } from "@mantine/core";
import React, { useCallback, useContext, useState } from "react";

import { SliderContext } from "@/contexts/SliderContext";

import useSoundPlayer from "../../../../hooks/useSoundPlayer";
import type { NoteOctave } from "../../../../utils/NoteUtils";
import NoteUtils from "../../../../utils/NoteUtils";

export default function FrequencySlider(): JSX.Element {
  const sliderContext = useContext(SliderContext);

  const soundPlayer = useSoundPlayer();

  const minNoteOctave: NoteOctave = {
    note: "C",
    octave: sliderContext.gameSettings.generateNoteOctaveOptions.octaveOptions.min,
  };
  const maxNoteOctave: NoteOctave = {
    note: "B",
    octave: sliderContext.gameSettings.generateNoteOctaveOptions.octaveOptions.max,
  };
  const minFreq = NoteUtils.convertNoteOctaveToFrequency(minNoteOctave);
  const maxFreq = NoteUtils.convertNoteOctaveToFrequency(maxNoteOctave);
  const initSliderAnswer = (): number => {
    return Math.floor((minFreq + maxFreq) / 2);
  };
  const [sliderAnswerHz, setSliderAnswerHz] = useState<number>(initSliderAnswer());

  // NOTE: If this is wrapped with useCallback, MantineUI's slider won't update.
  const onChange_AnswerSlider = (value: number): void => {
    setSliderAnswerHz(value);
  };

  const onChangeEnd_AnswerSlider = useCallback((value: number): void => {
    soundPlayer.playFreq(value, 0.25);
  }, [soundPlayer]);

  const onClick_SubmitButton = useCallback((): void => {
    if (sliderContext.submitAnswer) {
      sliderContext.submitAnswer(sliderAnswerHz);
    }
  }, [sliderAnswerHz, sliderContext]);

  // FIXME: Slider/Container max width.
  return (
    <Flex
      justify="flex-start"
      align="center"
      direction="column"
      wrap="wrap"
      w="100%"
    >
      <Slider
        defaultValue={initSliderAnswer()}
        min={minFreq}
        max={maxFreq}
        step={1}
        onChange={onChange_AnswerSlider}
        onChangeEnd={onChangeEnd_AnswerSlider}
        value={sliderAnswerHz}
        size="lg"
        w="100%"
        mb="md"
      />
      <Button
        color="teal"
        variant="filled"
        onClick={onClick_SubmitButton}
        disabled={sliderContext.gameState.isRoundOver === true || sliderContext.gameState.hasPlayed === false}
      >
        Submit
      </Button>
    </Flex>
  );
}
