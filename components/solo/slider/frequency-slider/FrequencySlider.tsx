import React, { useState } from "react";
import { Button, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
import NoteUtils, { GenerateOctaveOptions, NoteOctave } from "../../../../utils/NoteUtils";
import useSoundPlayer from "../../../../hooks/useSoundPlayer";

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

  return (
    <React.Fragment>
      <Slider
        defaultValue={initSliderAnswer()}
        min={minFreq}
        max={maxFreq}
        step={1}
        onChange={onChange_AnswerSlider}
        onChangeEnd={onChangeEnd_AnswerSlider}
        value={sliderAnswerHz}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Button
        colorScheme="teal"
        variant="solid"
        onClick={onClick_SubmitButton}
        isDisabled={props.isRoundOver === true || props.hasPlayed === false}
      >
        Submit
      </Button>
    </React.Fragment>

  );
}
