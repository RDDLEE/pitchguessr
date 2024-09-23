import { Group } from "@mantine/core";
import React, { useContext } from "react";

import AnswerChoiceButton from "@/components/AnswerChoice/AnswerChoiceButton";
import NextRoundButton from "@/components/NextRoundButton/NextRoundButton";
import QuestionPrompt from "@/components/QuestionPrompt/QuestionPrompt";
import ScoreTracker from "@/components/ScoreTracker/ScoreTracker";
import SoundCard from "@/components/SoundCard/SoundCard";
import NoteUtils from "@/utils/NoteUtils";

import GameContainer from "../GameContainer/GameContainer";
import { DirectionalContext } from "./DirectionalContext";
import DirectionalSettingsModal from "./DirectionalSettingsModal";

const GAME_CONTEXT = DirectionalContext;

export default function DirectionalContainer(): JSX.Element {
  const gameContext = useContext(GAME_CONTEXT);

  const gameState = gameContext.gameState;
  const gameSettings = gameContext.gameSettings;

  const renderFirstSoundCard = (): JSX.Element => {
    return (
      <SoundCard
        noteOctave={[gameState.firstNoteOctave]}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={gameContext.onPlay}
        hasPlayed={gameState.hasPlayed}
        tooltipText="Play Me First!"
      />
    );
  };

  const renderSecondSoundCard = (): JSX.Element => {
    return (
      <SoundCard
        noteOctave={[gameState.secondNoteOctave]}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={gameContext.onPlaySecond}
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
        <AnswerChoiceButton<string>
          key={answerChoice}
          payload={answerChoice.toString()}
          text={NoteUtils.convertPitchDirectionToText(answerChoice)}
          onClick_Button={gameContext.submitAnswer}
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
    if (gameContext.onNewRound === undefined) {
      return;
    }
    gameContext.onNewRound(gameSettings, false);
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
      <ScoreTracker scoreStats={gameContext.scoreTracker.scoreStats} />
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
