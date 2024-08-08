import { useDisclosure } from "@mantine/hooks";
import React, { useCallback, useContext } from "react";

import SettingsModal from "@/components/SettingsModal/SettingsModal";
import type { SliderGameSettings } from "@/contexts/SliderContext";
import { SLIDER_GAME_SETTINGS_DEFAULT, SliderContext } from "@/contexts/SliderContext";
import useSettingsModal from "@/hooks/useSettingsModal";
import type { BaseGameSettings } from "@/utils/GameStateUtils";

export default function SliderSettingsModal(): JSX.Element {
  const sliderContext = useContext(SliderContext);

  const [isModalOpened, modalHandlers] = useDisclosure();

  const applyExtendedSettings = useCallback((newBaseSettings: BaseGameSettings): SliderGameSettings => {
    const newGameSettings = {
      ...newBaseSettings,
    };
    if (sliderContext.setGameSettings) {
      sliderContext.setGameSettings(newGameSettings);
    }
    return newGameSettings;
  }, [sliderContext]);

  const settingsModal = useSettingsModal<SliderGameSettings>({
    settings: sliderContext.gameSettings,
    defaultSettings: SLIDER_GAME_SETTINGS_DEFAULT,
    applyExtendedSettings: applyExtendedSettings,
    onNewRound: sliderContext.onNewRound,
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
