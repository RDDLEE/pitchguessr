"use client";

import React, { useCallback, useState } from "react";
import { Center, VStack } from "@chakra-ui/react";
import SoundCard from "../../shared/sound-card/SoundCard";
import NextRoundButton from "../../shared/next-round-button/NextRoundButton";
import useScoreTracker from "../../../hooks/useScoreTracker";
import ScoreTracker from "../../shared/score-tracker/ScoreTracker";
import NoteUtils, { NoteOctave } from "../../../utils/NoteUtils";
import GameStateUtils, { BaseSoloGameState, SoloSliderSettings } from "../../../utils/GameStateUtils";
import StyleUtils from "../../../utils/StyleUtils";
import QuestionPrompt from "../../shared/question-prompt/QuestionPrompt";
import SoloSliderSettingsModal from "./settings-modal/SoloSliderSettingsModal";
import FrequencySlider from "./frequency-slider/FrequencySlider";

export interface SoloSliderState extends BaseSoloGameState {
  correctNoteOctave: NoteOctave;
}

export default function SoloSliderContainer(): JSX.Element {
  const [gameSettings, setGameSettings] = useState<SoloSliderSettings>(GameStateUtils.DEFAULT_SOLO_SLIDER_SETTINGS);

  const generateNewGameState = (settings: SoloSliderSettings): SoloSliderState => {
    const generateResult = NoteUtils.generateNoteOctave(settings.generateNoteOctaveOptions);
    const noteOctave = generateResult.noteOctave;
    return {
      correctNoteOctave: noteOctave,
      isRoundOver: false,
      hasPlayed: false,
    };
  };
  const [gameState, setGameState] = useState<SoloSliderState>(generateNewGameState(gameSettings));

  const scoreTracker = useScoreTracker();

  const onNewRound = (settings: SoloSliderSettings, shouldResetScore: boolean): void => {
    if (shouldResetScore === true) {
      scoreTracker.resetScore();
    }
    const newState = generateNewGameState(settings);
    setGameState(newState);
  };

  const onClick_PlayButton = useCallback((): void => {
    setGameState(
      (prevState) => {
        if (prevState.hasPlayed === true) {
          return prevState;
        }
        return {
          correctNoteOctave: {
            note: prevState.correctNoteOctave.note,
            octave: prevState.correctNoteOctave.octave,
          },
          hasPlayed: true,
          isRoundOver: prevState.isRoundOver,
        };
      },
    );
  }, []);

  const renderSoundCard = (): JSX.Element => {
    const noteOctave = gameState.correctNoteOctave;
    return (
      <SoundCard
        noteOctave={noteOctave}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={onClick_PlayButton}
        width={StyleUtils.STANDARD_GAMEPLAY_ITEM_WIDTH}
        hasPlayed={gameState.hasPlayed}
      />
    );
  };

  const onClick_SliderAnswerSubmit = useCallback((sliderAnswerHz: number): void => {
    setGameState(
      (prevState) => {
        if (prevState.isRoundOver === true) {
          return prevState;
        }
        return {
          correctNoteOctave: {
            note: prevState.correctNoteOctave.note,
            octave: prevState.correctNoteOctave.octave,
          },
          hasPlayed: prevState.hasPlayed,
          isRoundOver: true,
        };
      },
    );
    const correctHz = NoteUtils.convertNoteOctaveToFrequency(gameState.correctNoteOctave);
    // Converting from NoteOctave to Freq to Tone.Unit.Note.
    const correctNote = NoteUtils.convertFrequencyToNoteOctave(correctHz);
    const chosenNote = NoteUtils.convertFrequencyToNoteOctave(sliderAnswerHz);
    if (chosenNote === correctNote) {
      scoreTracker.incrementNumCorrect();
    } else {
      scoreTracker.incrementNumIncorrect();
    }
  }, [gameState, scoreTracker]);

  const renderSoundSlider = (): JSX.Element => {
    return (
      <FrequencySlider
        octaveOptions={gameSettings.generateNoteOctaveOptions.octaveOptions}
        onClick_SubmitButton={onClick_SliderAnswerSubmit}
        hasPlayed={gameState.hasPlayed}
        isRoundOver={gameState.isRoundOver}
      />
    );
  };

  const onClick_NextRoundButton = (): void => {
    onNewRound(gameSettings, false);
  };

  const renderNextRoundButton = (): JSX.Element | null => {
    if (gameState.isRoundOver === false) {
      return null;
    }
    return (
      <NextRoundButton onClick_NextRoundButton={onClick_NextRoundButton} />
    );
  };

  return (
    <Center>
      <VStack>
        <SoloSliderSettingsModal
          settings={gameSettings}
          setGameSettings={setGameSettings}
          onNewRound={onNewRound}
        />
        <ScoreTracker scoreStats={scoreTracker.scoreStats} />
        {renderSoundCard()}
        <QuestionPrompt
          text="Use the slider to match the note."
        />
        {renderSoundSlider()}
        {renderNextRoundButton()}
      </VStack>
    </Center>
  );
}
