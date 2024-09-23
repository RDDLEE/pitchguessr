import { useDisclosure } from "@mantine/hooks";
import React, { useCallback, useContext } from "react";

import SettingsModal from "@/components/SettingsModal/SettingsModal";
import useSettingsModal from "@/hooks/useSettingsModal";
import type { BaseGameSettings } from "@/utils/GameStateUtils";

import type { DirectionalGameSettings } from "./DirectionalContext";
import { DIRECTIONAL_GAME_SETTINGS_DEFAULT, DirectionalContext } from "./DirectionalContext";

type TGameSettings = DirectionalGameSettings;
const GAME_CONTEXT = DirectionalContext;

export default function DirectionalSettingsModal(): JSX.Element {
  const directionalContext = useContext(GAME_CONTEXT);

  const [isModalOpened, modalHandlers] = useDisclosure();

  const applyExtendedSettings = useCallback((newBaseSettings: BaseGameSettings): TGameSettings => {
    const newGameSettings = {
      ...newBaseSettings,
    };
    if (directionalContext.setGameSettings) {
      directionalContext.setGameSettings(newGameSettings);
    }
    return newGameSettings;
  }, [directionalContext]);

  const settingsModal = useSettingsModal<TGameSettings>({
    settings: directionalContext.gameSettings,
    defaultSettings: DIRECTIONAL_GAME_SETTINGS_DEFAULT,
    applyExtendedSettings: applyExtendedSettings,
    onNewRound: directionalContext.onNewRound,
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
