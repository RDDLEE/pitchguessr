import { useDisclosure } from "@mantine/hooks";
import React, { useCallback } from "react";

import SettingsModal from "@/components/SettingsModal/SettingsModal";
import useSettingsModal from "@/hooks/useSettingsModal";
import type { BaseSettings, DirectionSettings } from "@/utils/GameStateUtils";
import GameStateUtils from "@/utils/GameStateUtils";

interface DirectionalSettingsModal_Props {
  settings: DirectionSettings;
  setGameSettings: React.Dispatch<React.SetStateAction<DirectionSettings>>;
  onNewRound: (_settings: DirectionSettings, _shouldResetScore: boolean) => void;
}

export default function DirectionalSettingsModal(props: DirectionalSettingsModal_Props): JSX.Element {
  const [isModalOpened, modalHandlers] = useDisclosure();

  const onClick_ApplySettingsButton = useCallback((newBaseSettings: BaseSettings): DirectionSettings => {
    const newGameSettings = {
      ...newBaseSettings,
    };
    props.setGameSettings(newGameSettings);
    return newGameSettings;
  }, [props]);

  const onClick_ResetSettingsButton = useCallback((): void => {
    // TODO: With pitch difference, etc.
  }, []);

  const settingsModal = useSettingsModal<DirectionSettings>({
    settings: props.settings,
    defaultSettings: GameStateUtils.DEFAULT_DIRECTIONAL_SETTINGS,
    onClick_ApplySettingsButton: onClick_ApplySettingsButton,
    onClick_ResetSettingsButton: onClick_ResetSettingsButton,
    onNewRound: props.onNewRound,
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
