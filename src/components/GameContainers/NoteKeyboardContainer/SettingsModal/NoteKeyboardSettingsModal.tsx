import { useDisclosure } from "@mantine/hooks";
import React, { useCallback, useContext } from "react";

import SettingsModal from "@/components/SettingsModal/SettingsModal";
import { DISTANCE_SETTINGS_DEFAULT } from "@/contexts/DistanceContext";
import type { NoteKeyboardGameSettings } from "@/contexts/NoteKeyboardContext";
import { NoteKeyboardContext } from "@/contexts/NoteKeyboardContext";
import useSettingsModal from "@/hooks/useSettingsModal";
import type { BaseGameSettings } from "@/utils/GameStateUtils";

type TGameSettings = NoteKeyboardGameSettings;

export default function NoteKeyboardSettingsModal(): JSX.Element {
  const gameContext = useContext(NoteKeyboardContext);

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
        {settingsModal.renderOctaveRangeSlider()}
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
