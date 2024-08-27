import { Group } from "@mantine/core";
import React, { useContext } from "react";

import AnswerChoiceButton from "@/components/AnswerChoice/AnswerChoiceButton";
import NextRoundButton from "@/components/NextRoundButton/NextRoundButton";
import QuestionPrompt from "@/components/QuestionPrompt/QuestionPrompt";
import ScoreTracker from "@/components/ScoreTracker/ScoreTracker";
import SoundCard from "@/components/SoundCard/SoundCard";
import { DirectionalContext } from "@/contexts/DirectionalContext";
import NoteUtils from "@/utils/NoteUtils";

import GameContainer from "../GameContainer/GameContainer";
import DirectionalSettingsModal from "./SettingsModal/DirectionalSettingsModal";

export default function DirectionalContainer(): JSX.Element {
  const directionalContext = useContext(DirectionalContext);

  const gameState = directionalContext.gameState;
  const gameSettings = directionalContext.gameSettings;

  const renderFirstSoundCard = (): JSX.Element => {
    return (
      <SoundCard
        noteOctave={gameState.firstNoteOctave}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={directionalContext.onPlay}
        hasPlayed={gameState.hasPlayed}
        tooltipText="Play Me First!"
      />
    );
  };

  const renderSecondSoundCard = (): JSX.Element => {
    return (
      <SoundCard
        noteOctave={gameState.secondNoteOctave}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={directionalContext.onPlaySecond}
        hasPlayed={gameState.hasPlayedSecond}
        tooltipText="Play Me Second!"
        disabled={!gameState.hasPlayed}
      />
    );
  };

  const renderAnswerChoiceButtons = (): JSX.Element => {
    const buttons: JSX.Element[] = [];
    const choices = NoteUtils.PITCH_DIRECTIONS;
    for (let i = 0; i < choices.length; i++) {
      const answerChoice = choices[i];
      let isCorrect: boolean = false;
      if (answerChoice === gameState.correctDirection) {
        isCorrect = true;
      }
      buttons.push((
        <AnswerChoiceButton
          key={answerChoice}
          id={answerChoice.toString()}
          text={NoteUtils.convertPitchDirectionToText(answerChoice)}
          onClick_Button={directionalContext.submitAnswer}
          isCorrect={isCorrect}
          hasPlayed={gameState.hasPlayed && gameState.hasPlayedSecond}
          isRoundOver={gameState.isRoundOver}
        />
      ));
    }
    return (
      <Group>
        {buttons}
      </Group>
    );
  };

  const onClick_NextRoundButton = (): void => {
    if (directionalContext.onNewRound === undefined) {
      return;
    }
    directionalContext.onNewRound(gameSettings, false);
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
    <GameContainer>
      <DirectionalSettingsModal />
      <ScoreTracker scoreStats={directionalContext.scoreTracker.scoreStats} />
      <Group className="w-full" gap="xs">
        {renderFirstSoundCard()}
        {renderSecondSoundCard()}
      </Group>
      <QuestionPrompt
        text="Is the second note higher, lower, or equal to the first note?"
      />
      {renderAnswerChoiceButtons()}
      {renderNextRoundButton()}
    </GameContainer>
  );
}
