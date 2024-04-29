import React, { useCallback } from "react";
import { useDisclosure } from "@chakra-ui/react";
import GameStateUtils, { BaseSoloSettings, SoloDirectionSettings, SoloSliderSettings } from "../../../../utils/GameStateUtils";
import useSoloSettingsModal from "../../../../hooks/solo/useSoloSettingsModal";
import SoloSettingsModal from "../../../shared/solo-settings-modal/SoloSettingsModal";

export interface SoloSliderSettingsModal_Props {
  settings: SoloSliderSettings;
  setGameSettings: React.Dispatch<React.SetStateAction<SoloSliderSettings>>;
  onNewRound: (_settings: SoloSliderSettings, _shouldResetScore: boolean) => void;
}

export default function SoloSliderSettingsModal(props: SoloSliderSettingsModal_Props): JSX.Element {
  const modalDisclosure = useDisclosure();

  const onClick_ApplySettingsButton = useCallback((newBaseSettings: BaseSoloSettings): SoloSliderSettings => {
    const newGameSettings = {
      ...newBaseSettings,
    };
    props.setGameSettings(newGameSettings);
    return newGameSettings;
  }, [props]);

  const onClick_ResetSettingsButton = useCallback((): void => {}, []);

  const settingsModal = useSoloSettingsModal<SoloDirectionSettings>({
    settings: props.settings,
    defaultSettings: GameStateUtils.DEFAULT_SOLO_DIRECTIONAL_SETTINGS,
    onClick_ApplySettingsButton: onClick_ApplySettingsButton,
    onClick_ResetSettingsButton: onClick_ResetSettingsButton,
    onNewRound: props.onNewRound,
    closeModal: modalDisclosure.onClose,
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
    <SoloSettingsModal
      modalBody={renderModalBody()}
      modalButtons={settingsModal.renderModalButtons()}
      modalDisclosure={modalDisclosure}
    />
  );
}
