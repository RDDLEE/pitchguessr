import React, { useCallback, useState } from "react";
import { Button, Divider, Radio, RadioGroup, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Stack, Text } from "@chakra-ui/react";
import NoteUtils, { MusicalOctave, NoteTypes } from "../../utils/NoteUtils";
import { BaseSoloSettings } from "../../utils/GameStateUtils";

interface OctaveMinMax {
  min: MusicalOctave;
  max: MusicalOctave;
}

interface SettingsFormState {
  isDirty: boolean;
  shouldResetGame: boolean;
}

export interface UseSoloSettingsModal_Params<S extends BaseSoloSettings> {
  settings: S;
  defaultSettings: S;
  onClick_ApplySettingsButton: (_newBaseSettings: BaseSoloSettings) => S;
  onClick_ResetSettingsButton: () => void;
  onNewRound: (_settings: S, _shouldResetScore: boolean) => void;
  closeModal: () => void;
}

export interface UseSoloSettingsModal_Return {
  formState: SettingsFormState;
  setFormState: React.Dispatch<React.SetStateAction<SettingsFormState>>;
  octaveMinMax: OctaveMinMax;
  setOctaveMinMax: React.Dispatch<React.SetStateAction<OctaveMinMax>>;
  noteType: NoteTypes;
  setNoteType: React.Dispatch<React.SetStateAction<NoteTypes>>;
  renderOctaveRange: () => JSX.Element;
  renderNoteType: () => JSX.Element;
  renderModalButtons: () => JSX.Element;
}

const useSoloSettingsModal = <S extends BaseSoloSettings>
  (params: UseSoloSettingsModal_Params<S>): UseSoloSettingsModal_Return => {
  const [formState, setFormState] = useState<SettingsFormState>({ isDirty: false, shouldResetGame: false });

  const [octaveMinMax, setOctaveMinMax] = useState<OctaveMinMax>({
    min: params.settings.generateNoteOctaveOptions.octaveOptions.min,
    max: params.settings.generateNoteOctaveOptions.octaveOptions.max,
  });

  const [noteType, setNoteType] = useState<NoteTypes>(params.settings.generateNoteOctaveOptions.noteOptions.noteType);

  const onChangeEnd_OctaveMinMax = useCallback((value: number[]): void => {
    setFormState({ isDirty: true, shouldResetGame: true });
    setOctaveMinMax({
      min: value[0] as MusicalOctave,
      max: value[1] as MusicalOctave,
    });
  }, [setFormState, setOctaveMinMax]);

  const onChange_NoteType = useCallback((nextValue: NoteTypes): void => {
    setFormState({ isDirty: true, shouldResetGame: true });
    setNoteType(nextValue);
  }, [setFormState, setNoteType]);

  const renderOctaveRange = (): JSX.Element => {
    return (
      <React.Fragment>
        <Text fontSize="md" fontWeight="medium">
          {`Octave Range: ${octaveMinMax.min} - ${octaveMinMax.max}`}
        </Text>
        <RangeSlider
          // eslint-disable-next-line jsx-a11y/aria-proptypes
          aria-label={["min", "max"]}
          onChange={onChangeEnd_OctaveMinMax}
          defaultValue={[
            params.settings.generateNoteOctaveOptions.octaveOptions.min,
            params.settings.generateNoteOctaveOptions.octaveOptions.max,
          ]}
          value={[
            octaveMinMax.min,
            octaveMinMax.max,
          ]}
          min={NoteUtils.OCTAVE_MIN}
          max={NoteUtils.OCTAVE_MAX}
          step={1}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <Divider />
      </React.Fragment>
    );
  };

  const renderNoteType = (): JSX.Element => {
    return (
      <React.Fragment>
        <Text fontSize="md" fontWeight="medium">Notes:</Text>
        <RadioGroup onChange={onChange_NoteType} value={noteType}>
          <Stack direction="column" ml={4}>
            <Radio value={NoteTypes.NATURAL} size="sm">Naturals only</Radio>
            <Radio value={NoteTypes.SHARPS} size="sm">Naturals + Sharps</Radio>
            <Radio value={NoteTypes.FLATS} size="sm">Naturals + Flats</Radio>
          </Stack>
        </RadioGroup>
      </React.Fragment>
    );
  };

  const onClick_ApplySettingsButton = useCallback((): void => {
    const newBaseSettings = {
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
    const newSettings = params.onClick_ApplySettingsButton(newBaseSettings);
    if (formState.shouldResetGame === true) {
      params.onNewRound(newSettings, true);
    }
    setFormState({ isDirty: false, shouldResetGame: false });
    params.closeModal();
  }, [formState.shouldResetGame, noteType, octaveMinMax.max, octaveMinMax.min, params]);

  const onClick_ResetSettingsButton = useCallback((): void => {
    setFormState({ isDirty: true, shouldResetGame: true });
    setOctaveMinMax({
      min: params.defaultSettings.generateNoteOctaveOptions.octaveOptions.min,
      max: params.defaultSettings.generateNoteOctaveOptions.octaveOptions.max,
    });
    setNoteType(params.defaultSettings.generateNoteOctaveOptions.noteOptions.noteType);
    params.onClick_ResetSettingsButton();
  }, [params, setFormState, setOctaveMinMax, setNoteType]);

  const renderModalButtons = (): JSX.Element => {
    return (
      <React.Fragment>
        <Button mt={4} mr={4} colorScheme="teal" variant="solid" onClick={onClick_ApplySettingsButton} isDisabled={formState.isDirty === false}>
          Apply
        </Button>
        <Button mt={4} colorScheme="gray" variant="outline" onClick={onClick_ResetSettingsButton}>
          Reset
        </Button>
      </React.Fragment>
    );
  };

  return {
    formState: formState,
    setFormState: setFormState,
    octaveMinMax: octaveMinMax,
    setOctaveMinMax: setOctaveMinMax,
    noteType: noteType,
    setNoteType: setNoteType,
    renderOctaveRange: renderOctaveRange,
    renderNoteType: renderNoteType,
    renderModalButtons: renderModalButtons,
  };
};

export default useSoloSettingsModal;
