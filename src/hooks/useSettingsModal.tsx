import type { RangeSliderValue } from "@mantine/core";
import { Button, Divider, Radio, RangeSlider, Slider, Text } from "@mantine/core";
import { produce } from "immer";
import React, { useCallback, useContext, useState } from "react";

import { AppSettingsContext } from "@/components/AppSettingsProvider/AppSettingsContext";
import AppSettingUtils from "@/utils/AppSettingUtils";
import type { BaseGameSettings } from "@/utils/GameStateUtils";
import GameStateUtils from "@/utils/GameStateUtils";
import type { MusicalOctave } from "@/utils/NoteUtils";
import NoteUtils, { NoteTypes } from "@/utils/NoteUtils";

export interface UseDisclosureHandlers {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export interface UseDisclosureReturn {
  isOpened: boolean;
  disclosureHandlers: UseDisclosureHandlers;
}

interface OctaveMinMax {
  min: MusicalOctave;
  max: MusicalOctave;
}

interface SettingsFormState {
  isDirty: boolean;
  shouldResetGame: boolean;
}

export interface UseSettingsModal_Params<S extends BaseGameSettings> {
  settings: S;
  defaultSettings: S;
  applyExtendedSettings: (_newBaseSettings: BaseGameSettings) => S;
  resetExtendedSettings?: () => void;
  onNewRound?: (_settings: S, _shouldResetScore: boolean) => void;
  closeModal: () => void;
}

export interface UseSettingsModal_Return {
  setFormState: React.Dispatch<React.SetStateAction<SettingsFormState>>;
  renderAppVolumeSlider: () => JSX.Element;
  renderNoteDurationSlider: () => JSX.Element;
  renderOctaveRangeSlider: () => JSX.Element;
  renderNoteTypeRadio: () => JSX.Element;
  renderModalButtons: () => JSX.Element;
}

const useSettingsModal = <S extends BaseGameSettings>(params: UseSettingsModal_Params<S>): UseSettingsModal_Return => {
  const appSettings = useContext(AppSettingsContext);

  const [formState, setFormState] = useState<SettingsFormState>(
    { isDirty: false, shouldResetGame: false }
  );

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

  const renderAppVolumeSlider = useCallback((): JSX.Element => {
    let appVolumeText: string = `${appVolume} dB`;
    if (appVolume === AppSettingUtils.VOLUME_SETTING_MUTE) {
      appVolumeText = "None";
    }
    return (
      <React.Fragment>
        <Text>
          {`Volume: ${appVolumeText}`}
        </Text>
        <Slider
          defaultValue={appVolume}
          min={AppSettingUtils.VOLUME_SETTING_MIN}
          max={AppSettingUtils.VOLUME_SETTING_MAX}
          step={1}
          onChange={onChange_AppVolumeSlider}
          value={appVolume}
        />
        <Divider mt="xs" mb="xs" />
      </React.Fragment>
    );
  }, [appVolume, onChange_AppVolumeSlider]);

  const onChange_NoteDurationSlider = useCallback((value: number): void => {
    setFormState(
      produce(formState, (draft): void => {
        draft.isDirty = true;
        draft.shouldResetGame = draft.shouldResetGame || false;
      })
    );
    setNoteDuration(value);
  }, [formState]);

  const renderNoteDurationSlider = useCallback((): JSX.Element => {
    return (
      <React.Fragment>
        <Text>
          {`Note Duration: ${noteDuration}s`}
        </Text>
        <Slider
          defaultValue={params.defaultSettings.noteDuration}
          min={GameStateUtils.NOTE_DURATION_SETTING_MIN}
          max={GameStateUtils.NOTE_DURATION_SETTING_MAX}
          step={0.25}
          onChange={onChange_NoteDurationSlider}
          value={noteDuration}
        />
        <Divider mt="xs" mb="xs" />
      </React.Fragment>
    );
  }, [noteDuration, onChange_NoteDurationSlider, params.defaultSettings.noteDuration]);

  const onChange_OctaveRangeSlider = useCallback((value: RangeSliderValue): void => {
    setFormState({ isDirty: true, shouldResetGame: true });
    setOctaveMinMax({
      min: value[0] as MusicalOctave,
      max: value[1] as MusicalOctave,
    });
  }, []);

  const renderOctaveRangeSlider = useCallback((): JSX.Element => {
    return (
      <React.Fragment>
        <Text>
          {`Octave Range: ${octaveMinMax.min} - ${octaveMinMax.max}`}
        </Text>
        <RangeSlider
          onChange={onChange_OctaveRangeSlider}
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
          minRange={0}
          step={1}
        />
        <Divider mt="xs" mb="xs" />
      </React.Fragment>
    );
  }, [octaveMinMax.max, octaveMinMax.min, onChange_OctaveRangeSlider, params.settings.generateNoteOctaveOptions.octaveOptions.max, params.settings.generateNoteOctaveOptions.octaveOptions.min]);

  const onChange_NoteTypeRadio = useCallback((nextValue: NoteTypes): void => {
    setFormState({ isDirty: true, shouldResetGame: true });
    setNoteType(nextValue);
  }, []);

  const renderNoteTypeRadio = useCallback((): JSX.Element => {
    return (
      <React.Fragment>
        <Text>Notes:</Text>
        <Radio.Group
          value={noteType}
          onChange={onChange_NoteTypeRadio as (_: string) => void}
        >
          <Radio value={NoteTypes.NATURAL} size="sm" label="Naturals only" />
          <Radio value={NoteTypes.SHARPS} size="sm" label="Naturals + Sharps" />
          <Radio value={NoteTypes.FLATS} size="sm" label="Naturals + Flats" />
        </Radio.Group>
        <Divider mt="xs" mb="xs" />
      </React.Fragment>
    );
  }, [noteType, onChange_NoteTypeRadio]);

  // NOTE: Common settings are applied here.
  // - To override, use params.applyExtendedSettings.
  const onClick_ApplySettingsButton = useCallback((): void => {
    if (appSettings.setVolume !== undefined) {
      appSettings.setVolume(appVolume);
    }
    const newBaseSettings: BaseGameSettings = {
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
    const newSettings = params.applyExtendedSettings(newBaseSettings);
    if (formState.shouldResetGame === true) {
      if (params.onNewRound) {
        params.onNewRound(newSettings, true);
      }
    }
    setFormState({ isDirty: false, shouldResetGame: false });
    // Could reset form state on close.
    params.closeModal();
  }, [
    appSettings, appVolume, formState.shouldResetGame,
    noteDuration, noteType, octaveMinMax.max, octaveMinMax.min, params,
  ]);

  // NOTE: Common settings are handled here.
  // - For resetting extended settings, use params.resetExtendedSettings;
  const onClick_ResetSettingsButton = useCallback((): void => {
    setFormState({ isDirty: true, shouldResetGame: true });
    setAppVolume(AppSettingUtils.VOLUME_SETTING_DEFAULT);
    setNoteDuration(params.defaultSettings.noteDuration);
    setOctaveMinMax({
      min: params.defaultSettings.generateNoteOctaveOptions.octaveOptions.min,
      max: params.defaultSettings.generateNoteOctaveOptions.octaveOptions.max,
    });
    setNoteType(params.defaultSettings.generateNoteOctaveOptions.noteOptions.noteType);
    if (params.resetExtendedSettings) {
      params.resetExtendedSettings();
    }
  }, [params]);

  const renderModalButtons = useCallback((): JSX.Element => {
    return (
      <React.Fragment>
        <Button mt={4} mr={4} color="teal" variant="filled" onClick={onClick_ApplySettingsButton} disabled={formState.isDirty === false}>
          Apply
        </Button>
        <Button mt={4} color="gray" variant="outline" onClick={onClick_ResetSettingsButton}>
          Reset
        </Button>
      </React.Fragment>
    );
  }, [formState.isDirty, onClick_ApplySettingsButton, onClick_ResetSettingsButton]);

  return {
    setFormState: setFormState,
    renderAppVolumeSlider: renderAppVolumeSlider,
    renderNoteDurationSlider: renderNoteDurationSlider,
    renderOctaveRangeSlider: renderOctaveRangeSlider,
    renderNoteTypeRadio: renderNoteTypeRadio,
    renderModalButtons: renderModalButtons,
  };
};

export default useSettingsModal;
