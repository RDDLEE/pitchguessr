import React, { useState } from "react";
import NoteUtils, { GenerateOctaveOptions, NoteOctave } from "../../../../utils/NoteUtils";
import useSoundPlayer from "../../../../hooks/useSoundPlayer";
import { Button, Flex, Slider } from "@mantine/core";

export interface FrequencySlider_Props {
  octaveOptions: GenerateOctaveOptions;
  isRoundOver: boolean;
  hasPlayed: boolean;
  onClick_SubmitButton: (_sliderAnswerHz: number) => void;
}

export default function FrequencySlider(props: FrequencySlider_Props): JSX.Element {
  const soundPlayer = useSoundPlayer();

  const minNoteOctave: NoteOctave = {
    note: "C",
    octave: props.octaveOptions.min,
  };
  const maxNoteOctave: NoteOctave = {
    note: "B",
    octave: props.octaveOptions.max,
  };
  const minFreq = NoteUtils.convertNoteOctaveToFrequency(minNoteOctave);
  const maxFreq = NoteUtils.convertNoteOctaveToFrequency(maxNoteOctave);
  const initSliderAnswer = (): number => {
    return Math.floor((minFreq + maxFreq) / 2);
  };

  const [sliderAnswerHz, setSliderAnswerHz] = useState<number>(initSliderAnswer());

  const onChange_AnswerSlider = (value: number): void => {
    setSliderAnswerHz(value);
  };

  const onChangeEnd_AnswerSlider = (value: number): void => {
    soundPlayer.playFreq(value, 0.25);
  };

  const onClick_SubmitButton = (): void => {
    props.onClick_SubmitButton(sliderAnswerHz);
  };

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
      />
      <Button
        color="teal"
        variant="filled"
        onClick={onClick_SubmitButton}
        disabled={props.isRoundOver === true || props.hasPlayed === false}
      >
        Submit
      </Button>
    </Flex>
  );
}
