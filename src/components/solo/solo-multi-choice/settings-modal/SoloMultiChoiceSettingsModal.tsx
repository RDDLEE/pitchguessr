import { Divider, Slider, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useCallback, useState } from "react";

import useSoloSettingsModal from "../../../../hooks/solo/useSoloSettingsModal";
import type { BaseSoloSettings, SoloMultiChoiceSettings } from "../../../../utils/GameStateUtils";
import GameStateUtils from "../../../../utils/GameStateUtils";
import SoloSettingsModal from "../../../shared/solo-settings-modal/SoloSettingsModal";

export interface SoloMultiChoiceSettingsModal_Props {
  settings: SoloMultiChoiceSettings;
  setGameSettings: React.Dispatch<React.SetStateAction<SoloMultiChoiceSettings>>;
  onNewRound: (_settings: SoloMultiChoiceSettings, _shouldResetScore: boolean) => void;
}

export default function SoloMultiChoiceSettingsModal(props: SoloMultiChoiceSettingsModal_Props): JSX.Element {
  const [isModalOpened, modalHandlers] = useDisclosure();

  const NUM_ANSWER_CHOICES_MIN = 2;
  const NUM_ANSWER_CHOICES_MAX = 12;

  const [numAnswerChoices, setNumAnswerChoices] = useState<number>(props.settings.numAnswerChoices);

  const onClick_ApplySettingsButton = useCallback((newBaseSettings: BaseSoloSettings): SoloMultiChoiceSettings => {
    const newGameSettings = {
      ...newBaseSettings,
      numAnswerChoices: numAnswerChoices,
    };
    props.setGameSettings(newGameSettings);
    return newGameSettings;
  }, [numAnswerChoices, props]);

  const onClick_ResetSettingsButton = useCallback((): void => {
    setNumAnswerChoices(GameStateUtils.DEFAULT_SOLO_MULTI_CHOICE_SETTINGS.numAnswerChoices);
  }, []);

  const settingsModal = useSoloSettingsModal<SoloMultiChoiceSettings>({
    settings: props.settings,
    defaultSettings: GameStateUtils.DEFAULT_SOLO_MULTI_CHOICE_SETTINGS,
    onClick_ApplySettingsButton: onClick_ApplySettingsButton,
    onClick_ResetSettingsButton: onClick_ResetSettingsButton,
    onNewRound: props.onNewRound,
    closeModal: modalHandlers.close,
  });

  const onChange_NumAnswerChoicesSlider = useCallback((value: number): void => {
    settingsModal.setFormState({ isDirty: true, shouldResetGame: true });
    setNumAnswerChoices(value);
  }, [settingsModal]);

  const renderNumAnswerChoicesSlider = (): JSX.Element => {
    return (
      <React.Fragment>
        <Text size="md" fw="medium">
          {`# Answer Choices: ${numAnswerChoices}`}
        </Text>
        <Slider
          defaultValue={props.settings.numAnswerChoices}
          min={NUM_ANSWER_CHOICES_MIN}
          max={NUM_ANSWER_CHOICES_MAX}
          step={1}
          onChange={onChange_NumAnswerChoicesSlider}
          value={numAnswerChoices}
        />
        <Divider />
      </React.Fragment>
    );
  };

  const renderModalBody = (): JSX.Element => {
    return (
      <React.Fragment>
        {settingsModal.renderAppVolumeSlider()}
        {settingsModal.renderNoteDurationSlider()}
        {renderNumAnswerChoicesSlider()}
        {settingsModal.renderOctaveRangeSlider()}
        {settingsModal.renderNoteTypeRadio()}
      </React.Fragment>
    );
  };

  return (
    <SoloSettingsModal
      modalBody={renderModalBody()}
      modalButtons={settingsModal.renderModalButtons()}
      isOpened={isModalOpened}
      disclosureHandlers={modalHandlers}
    />
  );
}
