import { Text } from "@mantine/core";
import React, { useCallback, useContext } from "react";

import NextRoundButton from "@/components/NextRoundButton/NextRoundButton";
import QuestionPrompt from "@/components/QuestionPrompt/QuestionPrompt";
import ScoreTracker from "@/components/ScoreTracker/ScoreTracker";
import SoundCard from "@/components/SoundCard/SoundCard";
import NoteUtils from "@/utils/NoteUtils";

import GameContainer from "../GameContainer/GameContainer";
import FrequencySlider from "./FrequencySlider";
import { SliderContext } from "./SliderContext";
import SliderSettingsModal from "./SliderSettingsModal";

const GAME_CONTEXT = SliderContext;

export default function SliderContainer(): JSX.Element {
  const gameContext = useContext(GAME_CONTEXT);

  const gameState = gameContext.gameState;
  const gameSettings = gameContext.gameSettings;

  const renderSoundCard = (): JSX.Element => {
    return (
      <SoundCard
        noteOctave={[gameState.correctNoteOctave]}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={gameContext.onPlay}
        hasPlayed={gameState.hasPlayed}
      />
    );
  };

  const onClick_NextRoundButton = useCallback((): void => {
    if (gameContext.onNewRound === undefined) {
      return;
    }
    gameContext.onNewRound(gameSettings, false);
  }, [gameSettings, gameContext]);

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
      <ScoreTracker scoreStats={gameContext.scoreTracker.scoreStats} />
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
