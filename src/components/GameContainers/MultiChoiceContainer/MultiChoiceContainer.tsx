import { Group } from "@mantine/core";
import React, { useCallback, useContext } from "react";

import AnswerChoiceButton from "../../AnswerChoice/AnswerChoiceButton";
import NextRoundButton from "../../NextRoundButton/NextRoundButton";
import QuestionPrompt from "../../QuestionPrompt/QuestionPrompt";
import ScoreTracker from "../../ScoreTracker/ScoreTracker";
import SoundCard from "../../SoundCard/SoundCard";
import GameContainer from "../GameContainer/GameContainer";
import { MultiChoiceContext } from "./MultiChoiceContext";
import MultiChoiceSettingsModal from "./MultiChoiceSettingsModal";

const GAME_CONTEXT = MultiChoiceContext;

export default function MultiChoiceContainer(): JSX.Element {
  const gameContext = useContext(GAME_CONTEXT);

  const gameState = gameContext.gameState;
  const gameSettings = gameContext.gameSettings;

  const renderAnswerChoiceButtons = (): JSX.Element => {
    const buttons: JSX.Element[] = [];
    for (let i = 0; i < gameState.answerChoices.length; i++) {
      const answerChoice = gameState.answerChoices[i];
      let isCorrect: boolean = false;
      if (answerChoice === gameState.correctNoteOctave.note) {
        isCorrect = true;
      }
      buttons.push((
        <AnswerChoiceButton<string>
          key={answerChoice}
          text={answerChoice}
          payload={answerChoice}
          onClick_Button={gameContext.submitAnswer}
          isCorrect={isCorrect}
          hasPlayed={gameState.hasPlayed}
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

  return (
    <GameContainer>
      <MultiChoiceSettingsModal />
      <ScoreTracker scoreStats={gameContext.scoreTracker.scoreStats} />
      {renderSoundCard()}
      <QuestionPrompt text="What note was played?" />
      {renderAnswerChoiceButtons()}
      {renderNextRoundButton()}
    </GameContainer>
  );
}
