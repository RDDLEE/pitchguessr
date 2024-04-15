"use client";

import React, { useCallback, useState } from "react";
import { Stack } from "@chakra-ui/react";
import SoundCard from "../../shared/sound-card/SoundCard";
import AnswerChoiceButton from "../../shared/answer-choice/AnswerChoice";
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

  const generateNewState = (): SoloMultiChoiceState => {
    const newNoteOctave = NoteUtils.generateNoteOctave({});
    const answerChoices = generateAnswerChoices(newNoteOctave.note);
    return {
      correctNoteOctave: newNoteOctave,
      answerChoices: answerChoices,
      isRevealingAnswers: false,
      hasPlayed: false,
    };
  };
  const [soloMultiChoiceState, setSoloMultiChoiceState] = useState<SoloMultiChoiceState>(generateNewState());

  const scoreTracker = useScoreTracker();

  const onNewRound = (): void => {
    const newState = generateNewState();
    setSoloMultiChoiceState(newState);
  };

  const onClick_AnswerChoice = useCallback((answerChoice: string): void => {
    setSoloMultiChoiceState(
      (prevState) => {
        return {
          correctNoteOctave: prevState.correctNoteOctave,
          answerChoices: [...prevState.answerChoices],
          hasPlayed: prevState.hasPlayed,
          isRevealingAnswers: true,
        };
      },
    );
    if (answerChoice === soloMultiChoiceState.correctNoteOctave.note) {
      scoreTracker.incrementNumCorrect();
    } else {
      scoreTracker.incrementNumIncorrect();
    }
  }, [soloMultiChoiceState, scoreTracker]);

  const renderAnswerChoiceButtons = (): JSX.Element => {
    const buttons: JSX.Element[] = [];
    for (let i = 0; i < soloMultiChoiceState.answerChoices.length; i++) {
      const answerChoice = soloMultiChoiceState.answerChoices[i];
      let isCorrect: boolean = false;
      if (answerChoice === soloMultiChoiceState.correctNoteOctave.note) {
        isCorrect = true;
      }
      buttons.push((
        <AnswerChoiceButton
          key={answerChoice}
          text={answerChoice}
          onClick_Button={onClick_AnswerChoice}
          isCorrect={isCorrect}
          hasPlayed={soloMultiChoiceState.hasPlayed}
          isRevealing={soloMultiChoiceState.isRevealingAnswers}
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
    setSoloMultiChoiceState(
      (prevState) => {
        return {
          correctNoteOctave: prevState.correctNoteOctave,
          answerChoices: [...prevState.answerChoices],
          hasPlayed: true,
          isRevealingAnswers: prevState.isRevealingAnswers,
        };
      },
    );
  }, [setSoloMultiChoiceState]);

  const renderSoundCard = (): JSX.Element => {
    const noteOctave = soloMultiChoiceState.correctNoteOctave;
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
    if (soloMultiChoiceState.isRevealingAnswers === false) {
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
