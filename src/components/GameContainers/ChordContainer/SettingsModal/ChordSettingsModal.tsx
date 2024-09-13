import { useDisclosure } from "@mantine/hooks";
import React, { useCallback, useContext } from "react";

import SettingsModal from "@/components/SettingsModal/SettingsModal";
import type { ChordGameSettings } from "@/contexts/ChordContext";
import { CHORD_GAME_SETTINGS_DEFAULT, ChordContext } from "@/contexts/ChordContext";
import useSettingsModal from "@/hooks/useSettingsModal";
import type { BaseGameSettings } from "@/utils/GameStateUtils";

export default function ChordSettingsModal(): JSX.Element {
  const chordContext = useContext(ChordContext);

  const [isModalOpened, modalHandlers] = useDisclosure();

  const applyExtendedSettings = useCallback((newBaseSettings: BaseGameSettings): ChordGameSettings => {
    const newGameSettings = {
      ...newBaseSettings,
    };
    if (chordContext.setGameSettings) {
      chordContext.setGameSettings(newGameSettings);
    }
    return newGameSettings;
  }, [chordContext]);

  const settingsModal = useSettingsModal<ChordGameSettings>({
    settings: chordContext.gameSettings,
    defaultSettings: CHORD_GAME_SETTINGS_DEFAULT,
    applyExtendedSettings: applyExtendedSettings,
    onNewRound: chordContext.onNewRound,
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
