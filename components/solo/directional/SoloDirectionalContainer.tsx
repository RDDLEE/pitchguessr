"use client";

import React, { useCallback, useState } from "react";
import { HStack, Stack } from "@chakra-ui/react";
import useScoreTracker from "../../../hooks/useScoreTracker";
import ScoreTracker from "../../shared/score-tracker/ScoreTracker";
import SoundCard from "../../shared/sound-card/SoundCard";
import NoteUtils, { NoteOctave, PitchDirection } from "../../../utils/NoteUtils";
import AnswerChoiceButton from "../../shared/answer-choice/AnswerChoiceButton";
import NextRoundButton from "../../shared/next-round-button/NextRoundButton";

export interface NoteOctavePair {
  firstNoteOctave: NoteOctave;
  secondNoteOctave: NoteOctave;
}

export interface SoloDirectionalState {
  noteOctavePair: NoteOctavePair;
  correctDirection: PitchDirection;
  hasPlayed: boolean;
  // FIXME: Rename to isRoundFinished. Extract to common state.
  isRevealingAnswers: boolean;
}

export default function SoloDirectionalContainer(): JSX.Element {
  const scoreTracker = useScoreTracker();

  const generateNewState = (): SoloDirectionalState => {
    const newFirstNoteOctave = NoteUtils.generateNoteOctave({});
    const newSecondNoteOctave = NoteUtils.generateNoteOctave({});
    const correctPitchDirection = NoteUtils.compareNoteOctaveValues(newFirstNoteOctave, newSecondNoteOctave);
    return {
      noteOctavePair: {
        firstNoteOctave: newFirstNoteOctave,
        secondNoteOctave: newSecondNoteOctave,
      },
      correctDirection: correctPitchDirection,
      isRevealingAnswers: false,
      hasPlayed: false,
    };
  };
  const [gameState, setGameState] = useState<SoloDirectionalState>(generateNewState());

  const onNewRound = (): void => {
    const newState = generateNewState();
    setGameState(newState);
  };

  const onClick_PlayButton = useCallback((): void => {
    setGameState(
      (prevState) => {
        if (prevState.hasPlayed === true) {
          return prevState;
        }
        return {
          noteOctavePair: prevState.noteOctavePair,
          correctDirection: prevState.correctDirection,
          hasPlayed: true,
          isRevealingAnswers: prevState.isRevealingAnswers,
        };
      },
    );
  }, [setGameState]);

  const renderFirstSoundCard = (): JSX.Element => {
    return (
      <SoundCard
        noteOctave={gameState.noteOctavePair.firstNoteOctave}
        onClick_PlayButton={onClick_PlayButton}
      />
    );
  };

  const renderSecondSoundCard = (): JSX.Element => {
    return (
      <SoundCard
        noteOctave={gameState.noteOctavePair.secondNoteOctave}
        onClick_PlayButton={onClick_PlayButton}
      />
    );
  };

  const onClick_AnswerChoice = useCallback((answerChoice: string): void => {
    setGameState(
      (prevState) => {
        return {
          noteOctavePair: prevState.noteOctavePair,
          correctDirection: prevState.correctDirection,
          hasPlayed: prevState.hasPlayed,
          isRevealingAnswers: true,
        };
      },
    );
    if (Number(answerChoice) === gameState.correctDirection) {
      scoreTracker.incrementNumCorrect();
    } else {
      scoreTracker.incrementNumIncorrect();
    }
  }, [gameState, scoreTracker]);

  const renderAnswerChoiceButtons = (): JSX.Element => {
    const buttons: JSX.Element[] = [];
    const choices = NoteUtils.pitchDirections;
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
          onClick_Button={onClick_AnswerChoice}
          isCorrect={isCorrect}
          hasPlayed={gameState.hasPlayed}
          isRevealing={gameState.isRevealingAnswers}
        />
      ));
    }
    return (
      <Stack direction="row" spacing={4} align="center">
        {buttons}
      </Stack>
    );
  };

  const onClick_NextRoundButton = (): void => {
    onNewRound();
  };

  const renderNextRoundButton = (): JSX.Element | null => {
    if (gameState.isRevealingAnswers === false) {
      return null;
    }
    return (
      <NextRoundButton onClick_NextRoundButton={onClick_NextRoundButton} />
    );
  };

  return (
    <React.Fragment>
      <ScoreTracker scoreStats={scoreTracker.scoreStats} />
      <HStack>
        {renderFirstSoundCard()}
        {renderSecondSoundCard()}
      </HStack>
      {renderAnswerChoiceButtons()}
      {renderNextRoundButton()}
    </React.Fragment>
  );
}
