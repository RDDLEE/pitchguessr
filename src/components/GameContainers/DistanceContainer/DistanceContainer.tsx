import { Group, Text } from "@mantine/core";
import React, { useCallback, useContext } from "react";

import NextRoundButton from "@/components/NextRoundButton/NextRoundButton";
import QuestionPrompt from "@/components/QuestionPrompt/QuestionPrompt";
import ScoreTracker from "@/components/ScoreTracker/ScoreTracker";
import SoundCard from "@/components/SoundCard/SoundCard";
import { DistanceContext } from "@/contexts/DistanceContext";

import GameContainer from "../GameContainer/GameContainer";
import DistanceSlider from "./DistanceSlider/DistanceSlider";
import DistanceSettingsModal from "./SettingsModal/DistanceSettingsModal";

export default function DistanceContainer(): JSX.Element {
  const distanceContext = useContext(DistanceContext);

  const gameState = distanceContext.gameState;
  const gameSettings = distanceContext.gameSettings;

  const renderFirstSoundCard = useCallback((): JSX.Element => {
    const noteOctave = gameState.firstNoteOctave;
    return (
      <SoundCard
        noteOctave={[noteOctave]}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={distanceContext.onPlay}
        hasPlayed={gameState.hasPlayed}
      />
    );
  }, [distanceContext.onPlay, gameSettings.noteDuration, gameState.firstNoteOctave, gameState.hasPlayed]);

  const renderSecondSoundCard = useCallback((): JSX.Element => {
    const noteOctave = gameState.secondNoteOctave;
    return (
      <SoundCard
        noteOctave={[noteOctave]}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={distanceContext.onPlaySecond}
        hasPlayed={gameState.hasPlayedSecond}
      />
    );
  }, [distanceContext.onPlaySecond, gameSettings.noteDuration, gameState.hasPlayedSecond, gameState.secondNoteOctave]);

  const onClick_NextRoundButton = useCallback((): void => {
    if (distanceContext.onNewRound === undefined) {
      return;
    }
    distanceContext.onNewRound(distanceContext.gameSettings, false);
  }, [distanceContext]);

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
      <ScoreTracker scoreStats={distanceContext.scoreTracker.scoreStats} />
      <Group className="w-full" gap="xs">
        {renderFirstSoundCard()}
        {renderSecondSoundCard()}
      </Group>
      <QuestionPrompt
        text="How many half-steps are between the two notes?"
      />
      <DistanceSlider />
      {renderCorrectAnswerText()}
      {renderNextRoundButton()}
    </GameContainer>
  );
}
