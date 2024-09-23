import { useDisclosure } from "@mantine/hooks";
import React, { useCallback, useContext } from "react";

import SettingsModal from "@/components/SettingsModal/SettingsModal";
import useSettingsModal from "@/hooks/useSettingsModal";
import type { BaseGameSettings } from "@/utils/GameStateUtils";

import type { SliderGameSettings } from "./SliderContext";
import { SLIDER_GAME_SETTINGS_DEFAULT, SliderContext } from "./SliderContext";

type TGameSettings = SliderGameSettings;
const GAME_CONTEXT = SliderContext;

export default function SliderSettingsModal(): JSX.Element {
  const gameContext = useContext(GAME_CONTEXT);

  const [isModalOpened, modalHandlers] = useDisclosure();

  const applyExtendedSettings = useCallback((newBaseSettings: BaseGameSettings): TGameSettings => {
    const newGameSettings = {
      ...newBaseSettings,
    };
    if (gameContext.setGameSettings) {
      gameContext.setGameSettings(newGameSettings);
    }
    return newGameSettings;
  }, [gameContext]);

  const settingsModal = useSettingsModal<TGameSettings>({
    settings: gameContext.gameSettings,
    defaultSettings: SLIDER_GAME_SETTINGS_DEFAULT,
    applyExtendedSettings: applyExtendedSettings,
    onNewRound: gameContext.onNewRound,
    closeModal: modalHandlers.close,
  });

  const renderModalBody = (): JSX.Element => {
    return (
      <React.Fragment>
        {settingsModal.renderAppVolumeSlider()}
        {settingsModal.renderNoteDurationSlider()}
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
