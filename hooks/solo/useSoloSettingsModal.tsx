import React, { useCallback, useContext, useState } from "react";
import {
  Button, Divider, Radio, RadioGroup, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb,
  RangeSliderTrack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Text,
} from "@chakra-ui/react";
import NoteUtils, { MusicalOctave, NoteTypes } from "../../utils/NoteUtils";
import GameStateUtils, { BaseSoloSettings } from "../../utils/GameStateUtils";
import { AppSettingsContext } from "../../components/global/AppSettingsProvider";
import AppSettingUtils from "../../utils/AppSettingUtils";
import { produce } from "immer";

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
  setFormState: React.Dispatch<React.SetStateAction<SettingsFormState>>;
  renderAppVolumeSlider: () => JSX.Element;
  renderNoteDurationSlider: () => JSX.Element;
  renderOctaveRangeSlider: () => JSX.Element;
  renderNoteTypeRadio: () => JSX.Element;
  renderModalButtons: () => JSX.Element;
}

const useSoloSettingsModal = <S extends BaseSoloSettings>(params: UseSoloSettingsModal_Params<S>): UseSoloSettingsModal_Return => {
  const appSettings = useContext(AppSettingsContext);

  const [formState, setFormState] = useState<SettingsFormState>({ isDirty: false, shouldResetGame: false });

  const [appVolume, setAppVolume] = useState<number>(appSettings.volume);

  const [noteDuration, setNoteDuration] = useState<number>(params.settings.noteDuration);

  const [octaveMinMax, setOctaveMinMax] = useState<OctaveMinMax>({
    min: params.settings.generateNoteOctaveOptions.octaveOptions.min,
    max: params.settings.generateNoteOctaveOptions.octaveOptions.max,
  });

  const [noteType, setNoteType] = useState<NoteTypes>(params.settings.generateNoteOctaveOptions.noteOptions.noteType);

  const onChange_AppVolumeSlider = useCallback((value: number): void => {
    setFormState(
      produce(formState, (draft): void => {
        draft.isDirty = true;
        draft.shouldResetGame = draft.shouldResetGame || false;
      })
    );
    setAppVolume(value);
  }, [formState]);

  const renderAppVolumeSlider = (): JSX.Element => {
    let appVolumeText: string = `${appVolume} dB`;
    if (appVolume === AppSettingUtils.VOLUME_SETTING_MUTE) {
      appVolumeText = "None";
    }
    return (
      <React.Fragment>
        <Text fontSize="md" fontWeight="medium">
          {`Volume: ${appVolumeText}`}
        </Text>
        <Slider
          defaultValue={appVolume}
          min={AppSettingUtils.VOLUME_SETTING_MIN}
          max={AppSettingUtils.VOLUME_SETTING_MAX}
          step={1}
          onChange={onChange_AppVolumeSlider}
          value={appVolume}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Divider />
      </React.Fragment>
    );
  };

  const onChange_NoteDurationSlider = useCallback((value: number): void => {
    setFormState(
      produce(formState, (draft): void => {
        draft.isDirty = true;
        draft.shouldResetGame = draft.shouldResetGame || false;
      })
    );
    setNoteDuration(value);
  }, [formState]);

  const renderNoteDurationSlider = (): JSX.Element => {
    return (
      <React.Fragment>
        <Text fontSize="md" fontWeight="medium">
          {`Note Duration: ${noteDuration}s`}
        </Text>
        <Slider
          defaultValue={params.defaultSettings.noteDuration}
          min={GameStateUtils.NOTE_DURATION_SETTING_MIN}
          max={GameStateUtils.NOTE_DURATION_SETTING_MAX}
          step={0.25}
          onChange={onChange_NoteDurationSlider}
          value={noteDuration}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Divider />
      </React.Fragment>
    );
  };

  const onChangeEnd_OctaveRangeSlider = useCallback((value: number[]): void => {
    setFormState({ isDirty: true, shouldResetGame: true });
    setOctaveMinMax({
      min: value[0] as MusicalOctave,
      max: value[1] as MusicalOctave,
    });
  }, []);

  const renderOctaveRangeSlider = (): JSX.Element => {
    return (
      <React.Fragment>
        <Text fontSize="md" fontWeight="medium">
          {`Octave Range: ${octaveMinMax.min} - ${octaveMinMax.max}`}
        </Text>
        <RangeSlider
          // eslint-disable-next-line jsx-a11y/aria-proptypes
          aria-label={["min", "max"]}
          onChange={onChangeEnd_OctaveRangeSlider}
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

  const onChange_NoteTypeRadio = useCallback((nextValue: NoteTypes): void => {
    setFormState({ isDirty: true, shouldResetGame: true });
    setNoteType(nextValue);
  }, []);

  const renderNoteTypeRadio = (): JSX.Element => {
    return (
      <React.Fragment>
        <Text fontSize="md" fontWeight="medium">Notes:</Text>
        <RadioGroup onChange={onChange_NoteTypeRadio} value={noteType}>
          <Stack direction="column" ml={4}>
            <Radio value={NoteTypes.NATURAL} size="sm">Naturals only</Radio>
            <Radio value={NoteTypes.SHARPS} size="sm">Naturals + Sharps</Radio>
            <Radio value={NoteTypes.FLATS} size="sm">Naturals + Flats</Radio>
          </Stack>
        </RadioGroup>
        <Divider />
      </React.Fragment>
    );
  };

  const onClick_ApplySettingsButton = useCallback((): void => {
    if (appSettings.setVolume !== undefined) {
      appSettings.setVolume(appVolume);
    }
    const newBaseSettings: BaseSoloSettings = {
      noteDuration: noteDuration,
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
    // Could reset form state on close.
    params.closeModal();
  }, [
    appSettings, appVolume, formState.shouldResetGame,
    noteDuration, noteType, octaveMinMax.max, octaveMinMax.min, params,
  ]);

  const onClick_ResetSettingsButton = useCallback((): void => {
    setFormState({ isDirty: true, shouldResetGame: true });
    setAppVolume(AppSettingUtils.VOLUME_SETTING_DEFAULT);
    setNoteDuration(params.defaultSettings.noteDuration);
    setOctaveMinMax({
      min: params.defaultSettings.generateNoteOctaveOptions.octaveOptions.min,
      max: params.defaultSettings.generateNoteOctaveOptions.octaveOptions.max,
    });
    setNoteType(params.defaultSettings.generateNoteOctaveOptions.noteOptions.noteType);
    params.onClick_ResetSettingsButton();
  }, [params]);

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
    setFormState: setFormState,
    renderAppVolumeSlider: renderAppVolumeSlider,
    renderNoteDurationSlider: renderNoteDurationSlider,
    renderOctaveRangeSlider: renderOctaveRangeSlider,
    renderNoteTypeRadio: renderNoteTypeRadio,
    renderModalButtons: renderModalButtons,
  };
};

export default useSoloSettingsModal;
