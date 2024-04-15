"use client";

import React, { useCallback, useState } from "react";
import { Stack } from "@chakra-ui/react";
import SoundCard from "../../shared/sound-card/SoundCard";
import AnswerChoiceButton from "../../shared/answer-choice/AnswerChoiceButton";
import NextRoundButton from "../../shared/next-round-button/NextRoundButton";
import useScoreTracker from "../../../hooks/useScoreTracker";
import ScoreTracker from "../../shared/score-tracker/ScoreTracker";
import NoteUtils, { NoteOctave } from "../../../utils/NoteUtils";

export interface SoloMultiChoiceOptions {
  noteDuration: number;
  numberOfChoices: number;
  noteRangeMin: number;
  noteRangeMax: number;
}

export interface SoloMultiChoiceState {
  correctNoteOctave: NoteOctave;
  answerChoices: string[];
  hasPlayed: boolean;
  // FIXME: Rename to isRoundFinished. Extract to common state.
  isRevealingAnswers: boolean;
}

export default function SoloMultiChoiceContainer(): JSX.Element {
  const generateAnswerChoices = (correctNote: string): string[] => {
    // TODO: Answers choices depend on settings per mode.
    // TODO: Handle accidentals.
    const filteredNotes = NoteUtils.naturalNotes.filter(
      (note: string) => {
        if (note !== correctNote) {
          return true;
        }
        return false;
      },
    );
    filteredNotes.sort(() => { return Math.random() - 0.5; });
    const n = 4;
    const items: string[] = [correctNote].concat(filteredNotes.slice(0, n));
    items.sort(() => { return Math.random() - 0.5; });
    return items;
  };

  const generateNewGameState = (): SoloMultiChoiceState => {
    const newNoteOctave = NoteUtils.generateNoteOctave({});
    const answerChoices = generateAnswerChoices(newNoteOctave.note);
    return {
      correctNoteOctave: newNoteOctave,
      answerChoices: answerChoices,
      isRevealingAnswers: false,
      hasPlayed: false,
    };
  };
  const [gameState, setGameState] = useState<SoloMultiChoiceState>(generateNewGameState());

  const scoreTracker = useScoreTracker();

  const onNewRound = (): void => {
    const newState = generateNewGameState();
    setGameState(newState);
  };

  const onClick_AnswerChoice = useCallback((answerChoice: string): void => {
    setGameState(
      (prevState) => {
        return {
          correctNoteOctave: prevState.correctNoteOctave,
          answerChoices: [...prevState.answerChoices],
          hasPlayed: prevState.hasPlayed,
          isRevealingAnswers: true,
        };
      },
    );
    if (answerChoice === gameState.correctNoteOctave.note) {
      scoreTracker.incrementNumCorrect();
    } else {
      scoreTracker.incrementNumIncorrect();
    }
  }, [gameState, scoreTracker]);

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

  const onClick_PlayButton = useCallback((): void => {
    setGameState(
      (prevState) => {
        if (prevState.hasPlayed === true) {
          return prevState;
        }
        return {
          correctNoteOctave: prevState.correctNoteOctave,
          answerChoices: [...prevState.answerChoices],
          hasPlayed: true,
          isRevealingAnswers: prevState.isRevealingAnswers,
        };
      },
    );
  }, [setGameState]);

  const renderSoundCard = (): JSX.Element => {
    const noteOctave = gameState.correctNoteOctave;
    return (
      <SoundCard
        noteOctave={noteOctave}
        onClick_PlayButton={onClick_PlayButton}
      />
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
      {renderSoundCard()}
      {renderAnswerChoiceButtons()}
      {renderNextRoundButton()}
    </React.Fragment>
  );
}
