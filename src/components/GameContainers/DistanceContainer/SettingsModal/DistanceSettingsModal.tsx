import { useDisclosure } from "@mantine/hooks";
import React, { useCallback, useContext } from "react";

import SettingsModal from "@/components/SettingsModal/SettingsModal";
import type { DistanceGameSettings } from "@/contexts/DistanceContext";
import { DISTANCE_SETTINGS_DEFAULT, DistanceContext } from "@/contexts/DistanceContext";
import useSettingsModal from "@/hooks/useSettingsModal";
import type { BaseGameSettings } from "@/utils/GameStateUtils";

export default function DistanceSettingsModal(): JSX.Element {
  const distanceContext = useContext(DistanceContext);

  const [isModalOpened, modalHandlers] = useDisclosure();

  const applyExtendedSettings = useCallback((newBaseSettings: BaseGameSettings): DistanceGameSettings => {
    const newGameSettings = {
      ...newBaseSettings,
    };
    if (distanceContext.setGameSettings) {
      distanceContext.setGameSettings(newGameSettings);
    }
    return newGameSettings;
  }, [distanceContext]);

  const settingsModal = useSettingsModal<DistanceGameSettings>({
    settings: distanceContext.gameSettings,
    defaultSettings: DISTANCE_SETTINGS_DEFAULT,
    applyExtendedSettings: applyExtendedSettings,
    onNewRound: distanceContext.onNewRound,
    closeModal: modalHandlers.close,
  });

  const renderModalBody = useCallback((): JSX.Element => {
    return (
      <React.Fragment>
        {settingsModal.renderAppVolumeSlider()}
        {settingsModal.renderNoteDurationSlider()}
        {/* TODO: Implement Distance octaves. */}
        {/* {settingsModal.renderOctaveRangeSlider()} */}
        {settingsModal.renderNoteTypeRadio()}
      </React.Fragment>
    );
  }, [settingsModal]);

  return (
    <SettingsModal
      modalBody={renderModalBody()}
      modalButtons={settingsModal.renderModalButtons()}
      isOpened={isModalOpened}
      disclosureHandlers={modalHandlers}
    />
  );
}
