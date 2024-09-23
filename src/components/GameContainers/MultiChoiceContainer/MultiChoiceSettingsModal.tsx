import { Divider, Slider, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useCallback, useContext, useState } from "react";

import SettingsModal from "@/components/SettingsModal/SettingsModal";
import useSettingsModal from "@/hooks/useSettingsModal";
import type { BaseGameSettings } from "@/utils/GameStateUtils";

import type { MultiChoiceGameSettings } from "./MultiChoiceContext";
import { MULTI_CHOICE_GAME_SETTINGS_DEFAULT, MultiChoiceContext } from "./MultiChoiceContext";

type TGameSettings = MultiChoiceGameSettings;
const GAME_CONTEXT = MultiChoiceContext;

export default function MultiChoiceSettingsModal(): JSX.Element {
  const gameContext = useContext(GAME_CONTEXT);
  const gameSettings = gameContext.gameSettings;

  const [numAnswerChoices, setNumAnswerChoices] = useState<number>(gameSettings.numAnswerChoices);

  const [isModalOpened, modalHandlers] = useDisclosure();

  const NUM_ANSWER_CHOICES_MIN = 2;
  const NUM_ANSWER_CHOICES_MAX = 12;

  const applyExtendedSettings = useCallback((newBaseSettings: BaseGameSettings): TGameSettings => {
    const newGameSettings = {
      ...newBaseSettings,
      numAnswerChoices: numAnswerChoices,
    };
    if (gameContext.setGameSettings) {
      gameContext.setGameSettings(newGameSettings);
    }
    return newGameSettings;
  }, [gameContext, numAnswerChoices]);

  const resetExtendedSettings = useCallback((): void => {
    setNumAnswerChoices(MULTI_CHOICE_GAME_SETTINGS_DEFAULT.numAnswerChoices);
  }, []);

  const settingsModal = useSettingsModal<TGameSettings>({
    settings: gameSettings,
    defaultSettings: MULTI_CHOICE_GAME_SETTINGS_DEFAULT,
    applyExtendedSettings: applyExtendedSettings,
    resetExtendedSettings: resetExtendedSettings,
    onNewRound: gameContext.onNewRound,
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
          defaultValue={gameSettings.numAnswerChoices}
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
    <SettingsModal
      modalBody={renderModalBody()}
      modalButtons={settingsModal.renderModalButtons()}
      isOpened={isModalOpened}
      disclosureHandlers={modalHandlers}
    />
  );
}
