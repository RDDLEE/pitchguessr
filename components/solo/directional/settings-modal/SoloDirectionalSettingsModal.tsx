import React, { useCallback } from "react";
import { useDisclosure } from "@chakra-ui/react";
import GameStateUtils, { BaseSoloSettings, SoloDirectionSettings } from "../../../../utils/GameStateUtils";
import useSoloSettingsModal from "../../../../hooks/solo/useSoloSettingsModal";
import SoloSettingsModal from "../../../shared/solo-settings-modal/SoloSettingsModal";

export interface SoloDirectionalSettingsModal_Props {
  settings: SoloDirectionSettings;
  setGameSettings: React.Dispatch<React.SetStateAction<SoloDirectionSettings>>;
  onNewRound: (_settings: SoloDirectionSettings, _shouldResetScore: boolean) => void;
}

export default function SoloDirectionalSettingsModal(props: SoloDirectionalSettingsModal_Props): JSX.Element {
  const modalDisclosure = useDisclosure();

  const onClick_ApplySettingsButton = useCallback((newBaseSettings: BaseSoloSettings): SoloDirectionSettings => {
    const newGameSettings = {
      ...newBaseSettings,
    };
    props.setGameSettings(newGameSettings);
    return newGameSettings;
  }, [props]);

  const onClick_ResetSettingsButton = useCallback((): void => {
    // TODO: With pitch difference, etc.
  }, []);

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
