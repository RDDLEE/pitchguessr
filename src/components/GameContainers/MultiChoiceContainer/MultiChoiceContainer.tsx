import { Group } from "@mantine/core";
import React, { useCallback, useContext } from "react";

import { MultiChoiceContext } from "@/contexts/MultiChoiceContext";

import StyleUtils from "../../../utils/StyleUtils";
import AnswerChoiceButton from "../../AnswerChoice/AnswerChoiceButton";
import NextRoundButton from "../../NextRoundButton/NextRoundButton";
import QuestionPrompt from "../../QuestionPrompt/QuestionPrompt";
import ScoreTracker from "../../ScoreTracker/ScoreTracker";
import SoundCard from "../../SoundCard/SoundCard";
import GameContainer from "../GameContainer/GameContainer";
import MultiChoiceSettingsModal from "./SettingsModal/MultiChoiceSettingsModal";

export default function MultiChoiceContainer(): JSX.Element {
  const multiChoiceContext = useContext(MultiChoiceContext);

  const gameState = multiChoiceContext.gameState;
  const gameSettings = multiChoiceContext.gameSettings;

  const renderAnswerChoiceButtons = (): JSX.Element => {
    const buttons: JSX.Element[] = [];
    for (let i = 0; i < gameState.answerChoices.length; i++) {
      const answerChoice = gameState.answerChoices[i];
      let isCorrect: boolean = false;
      if (answerChoice === gameState.correctNoteOctave.note) {
        isCorrect = true;
      }
      buttons.push((
        <AnswerChoiceButton
          key={answerChoice}
          id={answerChoice}
          text={answerChoice}
          onClick_Button={multiChoiceContext.submitAnswer}
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
        noteOctave={gameState.correctNoteOctave}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={multiChoiceContext.onPlay}
        width={StyleUtils.STANDARD_GAMEPLAY_ITEM_WIDTH}
        hasPlayed={gameState.hasPlayed}
      />
    );
  };

  const onClick_NextRoundButton = useCallback((): void => {
    if (multiChoiceContext.onNewRound === undefined) {
      return;
    }
    multiChoiceContext.onNewRound(gameSettings, false);
  }, [gameSettings, multiChoiceContext]);

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
      <ScoreTracker scoreStats={multiChoiceContext.scoreTracker.scoreStats} />
      {renderSoundCard()}
      <QuestionPrompt
        text="What note was played?"
      />
      {renderAnswerChoiceButtons()}
      {renderNextRoundButton()}
    </GameContainer>
  );
}
