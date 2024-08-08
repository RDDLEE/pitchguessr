import { useDisclosure } from "@mantine/hooks";
import React, { useCallback, useContext } from "react";

import SettingsModal from "@/components/SettingsModal/SettingsModal";
import type { DirectionalGameSettings } from "@/contexts/DirectionalContext";
import { DIRECTIONAL_GAME_SETTINGS_DEFAULT, DirectionalContext } from "@/contexts/DirectionalContext";
import useSettingsModal from "@/hooks/useSettingsModal";
import type { BaseGameSettings } from "@/utils/GameStateUtils";

export default function DirectionalSettingsModal(): JSX.Element {
  const directionalContext = useContext(DirectionalContext);

  const [isModalOpened, modalHandlers] = useDisclosure();

  const onClick_ApplySettingsButton = useCallback((newBaseSettings: BaseGameSettings): DirectionalGameSettings => {
    const newGameSettings = {
      ...newBaseSettings,
    };
    if (directionalContext.setGameSettings) {
      directionalContext.setGameSettings(newGameSettings);
    }
    return newGameSettings;
  }, [directionalContext]);

  const onClick_ResetSettingsButton = useCallback((): void => {
    // TODO: With pitch difference, etc.
  }, []);

  const settingsModal = useSettingsModal<DirectionalGameSettings>({
    settings: directionalContext.gameSettings,
    defaultSettings: DIRECTIONAL_GAME_SETTINGS_DEFAULT,
    onClick_ApplySettingsButton: onClick_ApplySettingsButton,
    onClick_ResetSettingsButton: onClick_ResetSettingsButton,
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
