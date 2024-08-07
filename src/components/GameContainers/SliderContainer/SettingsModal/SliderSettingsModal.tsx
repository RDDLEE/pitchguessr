import { useDisclosure } from "@mantine/hooks";
import React, { useCallback } from "react";

import SettingsModal from "@/components/SettingsModal/SettingsModal";
import useSettingsModal from "@/hooks/useSettingsModal";
import type { BaseSettings, DirectionSettings, SliderSettings } from "@/utils/GameStateUtils";
import GameStateUtils from "@/utils/GameStateUtils";

interface SliderSettingsModal_Props {
  settings: SliderSettings;
  setGameSettings: React.Dispatch<React.SetStateAction<SliderSettings>>;
  onNewRound: (_settings: SliderSettings, _shouldResetScore: boolean) => void;
}

export default function SliderSettingsModal(props: SliderSettingsModal_Props): JSX.Element {
  const [isModalOpened, modalHandlers] = useDisclosure();

  const onClick_ApplySettingsButton = useCallback((newBaseSettings: BaseSettings): SliderSettings => {
    const newGameSettings = {
      ...newBaseSettings,
    };
    props.setGameSettings(newGameSettings);
    return newGameSettings;
  }, [props]);

  const onClick_ResetSettingsButton = useCallback((): void => {}, []);

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
