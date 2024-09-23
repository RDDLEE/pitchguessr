import { useDisclosure } from "@mantine/hooks";
import React, { useCallback, useContext } from "react";

import SettingsModal from "@/components/SettingsModal/SettingsModal";
import useSettingsModal from "@/hooks/useSettingsModal";
import type { BaseGameSettings } from "@/utils/GameStateUtils";

import type { DistanceGameSettings } from "./DistanceContext";
import { DISTANCE_SETTINGS_DEFAULT, DistanceContext } from "./DistanceContext";

type TGameSettings = DistanceGameSettings;
const GAME_CONTEXT = DistanceContext;

export default function DistanceSettingsModal(): JSX.Element {
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

  const settingsModal = useSettingsModal<DistanceGameSettings>({
    settings: gameContext.gameSettings,
    defaultSettings: DISTANCE_SETTINGS_DEFAULT,
    applyExtendedSettings: applyExtendedSettings,
    onNewRound: gameContext.onNewRound,
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
