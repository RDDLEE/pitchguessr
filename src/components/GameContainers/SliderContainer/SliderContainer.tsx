import { Text } from "@mantine/core";
import React, { useCallback, useContext } from "react";

import NextRoundButton from "@/components/NextRoundButton/NextRoundButton";
import QuestionPrompt from "@/components/QuestionPrompt/QuestionPrompt";
import ScoreTracker from "@/components/ScoreTracker/ScoreTracker";
import SoundCard from "@/components/SoundCard/SoundCard";
import { SliderContext } from "@/contexts/SliderContext";
import NoteUtils from "@/utils/NoteUtils";

import GameContainer from "../GameContainer/GameContainer";
import FrequencySlider from "./FrequencySlider/FrequencySlider";
import SliderSettingsModal from "./SettingsModal/SliderSettingsModal";

export default function SliderContainer(): JSX.Element {
  const sliderContext = useContext(SliderContext);

  const gameState = sliderContext.gameState;
  const gameSettings = sliderContext.gameSettings;

  const renderSoundCard = (): JSX.Element => {
    return (
      <SoundCard
        noteOctave={gameState.correctNoteOctave}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={sliderContext.onPlay}
        hasPlayed={gameState.hasPlayed}
      />
    );
  };

  const onClick_NextRoundButton = useCallback((): void => {
    if (sliderContext.onNewRound === undefined) {
      return;
    }
    sliderContext.onNewRound(gameSettings, false);
  }, [gameSettings, sliderContext]);

  const renderNextRoundButton = useCallback((): JSX.Element | null => {
    if (gameState.isRoundOver === false) {
      return null;
    }
    return (
      <NextRoundButton onClick_NextRoundButton={onClick_NextRoundButton} />
    );
  }, [gameState.isRoundOver, onClick_NextRoundButton]);

  const renderCorrectAnswerText = useCallback((): JSX.Element | null => {
    if (!gameState.isRoundOver) {
      return null;
    }
    const correctHz = NoteUtils.convertNoteOctaveToFrequency(gameState.correctNoteOctave);
    return (
      <Text size="sm">
        {`The correct note was: ${gameState.correctNoteOctave.note}${gameState.correctNoteOctave.octave} at ${Math.round(correctHz)} Hz.`}
      </Text>
    );
  }, [gameState.correctNoteOctave, gameState.isRoundOver]);

  return (
    <GameContainer>
      <SliderSettingsModal />
      <ScoreTracker scoreStats={sliderContext.scoreTracker.scoreStats} />
      {renderSoundCard()}
      <QuestionPrompt
        text="Use the slider to match the note."
      />
      <FrequencySlider />
      {renderCorrectAnswerText()}
      {renderNextRoundButton()}
    </GameContainer>
  );
}
