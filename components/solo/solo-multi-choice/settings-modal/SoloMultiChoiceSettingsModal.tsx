import React, { useCallback, useState } from "react";
import { Text, Slider, useDisclosure, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
import GameStateUtils, { BaseSoloSettings, SoloMultiChoiceSettings } from "../../../../utils/GameStateUtils";
import useSoloSettingsModal from "../../../../hooks/solo/useSoloSettingsModal";
import SoloSettingsModal from "../../../shared/solo-settings-modal/SoloSettingsModal";

export interface SoloMultiChoiceSettingsModal_Props {
  settings: SoloMultiChoiceSettings;
  setGameSettings: React.Dispatch<React.SetStateAction<SoloMultiChoiceSettings>>;
  onNewRound: (_settings: SoloMultiChoiceSettings, _shouldResetScore: boolean) => void;
}

export default function SoloMultiChoiceSettingsModal(props: SoloMultiChoiceSettingsModal_Props): JSX.Element {
  const modalDisclosure = useDisclosure();

  const NUM_ANSWER_CHOICES_MIN = 2;
  const NUM_ANSWER_CHOICES_MAX = 12;

  const [numAnswerChoices, setNumAnswerChoices] = useState<number>(props.settings.numAnswerChoices);

  const onClick_ApplySettingsButton = useCallback((newBaseSettings: BaseSoloSettings): SoloMultiChoiceSettings => {
    const newGameSettings = {
      ...newBaseSettings,
      numAnswerChoices: numAnswerChoices,
    };
    props.setGameSettings(newGameSettings);
    return newGameSettings;
  }, [numAnswerChoices, props]);

  const onClick_ResetSettingsButton = useCallback((): void => {
    setNumAnswerChoices(GameStateUtils.INITIAL_SOLO_MULTI_CHOICE_SETTINGS.numAnswerChoices);
  }, []);

  const settingsModal = useSoloSettingsModal<SoloMultiChoiceSettings>({
    settings: props.settings,
    defaultSettings: GameStateUtils.INITIAL_SOLO_MULTI_CHOICE_SETTINGS,
    onClick_ApplySettingsButton: onClick_ApplySettingsButton,
    onClick_ResetSettingsButton: onClick_ResetSettingsButton,
    onNewRound: props.onNewRound,
    closeModal: modalDisclosure.onClose,
  });

  const onChangeEnd_NumAnswerChoices = useCallback((value: number): void => {
    settingsModal.setFormState({ isDirty: true, shouldResetGame: true });
    setNumAnswerChoices(value);
  }, [settingsModal]);

  const renderNumAnswerChoices = (): JSX.Element => {
    return (
      <React.Fragment>
        <Text fontSize="md" fontWeight="medium">
          {`# Answer Choices: ${numAnswerChoices}`}
        </Text>
        <Slider
          defaultValue={props.settings.numAnswerChoices}
          min={NUM_ANSWER_CHOICES_MIN}
          max={NUM_ANSWER_CHOICES_MAX}
          step={1}
          onChange={onChangeEnd_NumAnswerChoices}
          value={numAnswerChoices}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </React.Fragment>
    );
  };

  const renderModalBody = (): JSX.Element => {
    return (
      <React.Fragment>
        {renderNumAnswerChoices()}
        {settingsModal.renderOctaveRange()}
        {settingsModal.renderNoteType()}
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
