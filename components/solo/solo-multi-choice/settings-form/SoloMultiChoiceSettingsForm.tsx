import {
  Input, Button, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, RadioGroup, Radio, Stack,
  Divider,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { MusicalOctave, NoteTypes } from "../../../../utils/NoteUtils";
import { SoloMultiChoiceSettings } from "../SoloMultiChoiceTypes";

export interface SoloMultiChoiceSettings_Props {
  settings: SoloMultiChoiceSettings;
  setGameSettings: React.Dispatch<React.SetStateAction<SoloMultiChoiceSettings>>;
  closeModal: () => void;
  onNewRound: (_settings: SoloMultiChoiceSettings, _shouldResetScore: boolean) => void;
}

interface OctaveMinMax {
  min: MusicalOctave;
  max: MusicalOctave;
}

export default function SoloMultiChoiceSettingsForm(props: SoloMultiChoiceSettings_Props): JSX.Element {
  // FIXME: Use constant.
  const [numAnswerChoices, setNumAnswerChoices] = useState<number>(props.settings.numAnswerChoices);

  const [octaveMinMax, setOctaveMinMax] = useState<OctaveMinMax>({
    min: props.settings.generateNoteOctaveOptions.octaveOptions.min,
    max: props.settings.generateNoteOctaveOptions.octaveOptions.max,
  });

  const [noteType, setNoteType] = useState<NoteTypes>(props.settings.generateNoteOctaveOptions.noteOptions.noteType);

  const [isDirty, setIsDirty] = useState<boolean>(false);

  const onChange_AnswerChoicesInput = useCallback((event: React.FormEvent<HTMLInputElement>): void => {
    setIsDirty(true);
    setNumAnswerChoices(Number(event.currentTarget.value));
  }, [setNumAnswerChoices]);

  const onChangeEnd_OctaveMinMax = useCallback((value: number[]): void => {
    setIsDirty(true);
    setOctaveMinMax({
      min: value[0] as MusicalOctave,
      max: value[1] as MusicalOctave,
    });
  }, [setOctaveMinMax]);

  const onChange_NoteType = useCallback((nextValue: NoteTypes): void => {
    setIsDirty(true);
    setNoteType(nextValue);
  }, [setNoteType]);

  const onSaveSettings = useCallback((): void => {
    const newGameSettings = {
      numAnswerChoices: numAnswerChoices,
      generateNoteOctaveOptions: {
        noteOptions: {
          noteType: noteType,
        },
        octaveOptions: {
          min: octaveMinMax.min,
          max: octaveMinMax.max,
        },
      },
    };
    props.setGameSettings(newGameSettings);
    props.onNewRound(newGameSettings, true);
    props.closeModal();
  }, [noteType, numAnswerChoices, octaveMinMax.max, octaveMinMax.min, props]);

  return (
    <React.Fragment>
      <Text fontSize="md" fontWeight="medium"># Answer Choices:</Text>
      <Input
        variant="outline"
        placeholder="#"
        value={numAnswerChoices}
        onChange={onChange_AnswerChoicesInput}
        htmlSize={2}
        width="auto"
      />
      <Divider pt={2} />
      <Text fontSize="md" fontWeight="medium">Octave Range:</Text>
      <RangeSlider
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-label={["min", "max"]}
        onChangeEnd={onChangeEnd_OctaveMinMax}
        // FIXME: Use constants.
        defaultValue={[
          props.settings.generateNoteOctaveOptions.octaveOptions.min,
          props.settings.generateNoteOctaveOptions.octaveOptions.max,
        ]}
        min={0}
        max={8}
        step={1}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
      <Divider />
      <Text fontSize="md" fontWeight="medium">Notes:</Text>
      <RadioGroup onChange={onChange_NoteType} value={noteType}>
        <Stack direction="column">
          <Radio value={NoteTypes.NATURAL} size="sm">Naturals only</Radio>
          <Radio value={NoteTypes.SHARPS} size="sm">Naturals + Sharps</Radio>
          <Radio value={NoteTypes.FLATS} size="sm">Naturals + Flats</Radio>
        </Stack>
      </RadioGroup>
      <Button mt={4} colorScheme="teal" onClick={onSaveSettings} isDisabled={isDirty === false}>
        Submit
      </Button>
    </React.Fragment>
  );
}
