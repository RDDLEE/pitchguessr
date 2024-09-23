import { Group, Text } from "@mantine/core";
import React, { useCallback, useContext } from "react";

import NextRoundButton from "@/components/NextRoundButton/NextRoundButton";
import QuestionPrompt from "@/components/QuestionPrompt/QuestionPrompt";
import ScoreTracker from "@/components/ScoreTracker/ScoreTracker";
import SoundCard from "@/components/SoundCard/SoundCard";

import GameContainer from "../GameContainer/GameContainer";
import { DistanceContext } from "./DistanceContext";
import DistanceSettingsModal from "./DistanceSettingsModal";
import DistanceSlider from "./DistanceSlider";

const GAME_CONTEXT = DistanceContext;

export default function DistanceContainer(): JSX.Element {
  const gameContext = useContext(GAME_CONTEXT);

  const gameState = gameContext.gameState;
  const gameSettings = gameContext.gameSettings;

  const renderFirstSoundCard = useCallback((): JSX.Element => {
    const noteOctave = gameState.firstNoteOctave;
    return (
      <SoundCard
        noteOctave={[noteOctave]}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={gameContext.onPlay}
        hasPlayed={gameState.hasPlayed}
      />
    );
  }, [gameContext.onPlay, gameSettings.noteDuration, gameState.firstNoteOctave, gameState.hasPlayed]);

  const renderSecondSoundCard = useCallback((): JSX.Element => {
    const noteOctave = gameState.secondNoteOctave;
    return (
      <SoundCard
        noteOctave={[noteOctave]}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={gameContext.onPlaySecond}
        hasPlayed={gameState.hasPlayedSecond}
      />
    );
  }, [gameContext.onPlaySecond, gameSettings.noteDuration, gameState.hasPlayedSecond, gameState.secondNoteOctave]);

  const onClick_NextRoundButton = useCallback((): void => {
    if (gameContext.onNewRound === undefined) {
      return;
    }
    gameContext.onNewRound(gameContext.gameSettings, false);
  }, [gameContext]);

  const renderCorrectAnswerText = useCallback((): JSX.Element | null => {
    if (!gameState.isRoundOver) {
      return null;
    }
    return (
      <Text size="sm">
        {`The number of half-steps was: ${gameState.correctDistance}.`}
      </Text>
    );
  }, [gameState.correctDistance, gameState.isRoundOver]);

  const renderNextRoundButton = useCallback((): JSX.Element | null => {
    if (gameState.isRoundOver === false) {
      return null;
    }
    return (
      <NextRoundButton onClick_NextRoundButton={onClick_NextRoundButton} />
    );
  }, [gameState.isRoundOver, onClick_NextRoundButton]);

  return (
    <GameContainer>
      <DistanceSettingsModal />
      <ScoreTracker scoreStats={gameContext.scoreTracker.scoreStats} />
      <Group className="w-full" gap="xs">
        {renderFirstSoundCard()}
        {renderSecondSoundCard()}
      </Group>
      <QuestionPrompt text="How many half-steps are between the two notes?" />
      <DistanceSlider />
      {renderCorrectAnswerText()}
      {renderNextRoundButton()}
    </GameContainer>
  );
}
