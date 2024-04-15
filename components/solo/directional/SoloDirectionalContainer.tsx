"use client";

import React, { useCallback, useState } from "react";
import { HStack, Stack } from "@chakra-ui/react";
import useScoreTracker from "../../../hooks/useScoreTracker";
import ScoreTracker from "../../shared/score-tracker/ScoreTracker";
import SoundCard from "../../shared/sound-card/SoundCard";
import NoteUtils, { NoteOctave, NoteTypes, PitchDirection } from "../../../utils/NoteUtils";
import AnswerChoiceButton from "../../shared/answer-choice/AnswerChoiceButton";
import NextRoundButton from "../../shared/next-round-button/NextRoundButton";
import { BaseSoloGameState } from "../../../utils/GameStateUtils";

export interface NoteOctavePair {
  firstNoteOctave: NoteOctave;
  secondNoteOctave: NoteOctave;
}

export interface SoloDirectionalState extends BaseSoloGameState {
  noteOctavePair: NoteOctavePair;
  correctDirection: PitchDirection;
}

export default function SoloDirectionalContainer(): JSX.Element {
  const scoreTracker = useScoreTracker();

  const generateNewState = (): SoloDirectionalState => {
    const newFirstNoteOctave = NoteUtils.generateNoteOctave({
      noteOptions: {
        noteType: NoteTypes.NATURAL,
      },
      octaveOptions: {
        min: 4,
        max: 4,
      },
    }).noteOctave;
    const newSecondNoteOctave = NoteUtils.generateNoteOctave({
      noteOptions: {
        noteType: NoteTypes.NATURAL,
      },
      octaveOptions: {
        min: 4,
        max: 4,
      },
    }).noteOctave;
    const correctPitchDirection = NoteUtils.compareNoteOctaveValues(newFirstNoteOctave, newSecondNoteOctave);
    return {
      noteOctavePair: {
        firstNoteOctave: newFirstNoteOctave,
        secondNoteOctave: newSecondNoteOctave,
      },
      correctDirection: correctPitchDirection,
      isRoundOver: false,
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
          noteOctavePair: {
            firstNoteOctave: {
              note: prevState.noteOctavePair.firstNoteOctave.note,
              octave: prevState.noteOctavePair.firstNoteOctave.octave,
            },
            secondNoteOctave: {
              note: prevState.noteOctavePair.secondNoteOctave.note,
              octave: prevState.noteOctavePair.secondNoteOctave.octave,
            },
          },
          correctDirection: prevState.correctDirection,
          hasPlayed: true,
          isRoundOver: prevState.isRoundOver,
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
          noteOctavePair: {
            firstNoteOctave: {
              note: prevState.noteOctavePair.firstNoteOctave.note,
              octave: prevState.noteOctavePair.firstNoteOctave.octave,
            },
            secondNoteOctave: {
              note: prevState.noteOctavePair.secondNoteOctave.note,
              octave: prevState.noteOctavePair.secondNoteOctave.octave,
            },
          },
          correctDirection: prevState.correctDirection,
          hasPlayed: prevState.hasPlayed,
          isRoundOver: true,
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
          onClick_Button={onClick_AnswerChoice}
          isCorrect={isCorrect}
          hasPlayed={gameState.hasPlayed}
          isRoundOver={gameState.isRoundOver}
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
    if (gameState.isRoundOver === false) {
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
