"use client";

import React, { useCallback, useState } from "react";
import { Stack } from "@chakra-ui/react";
import SoundCard from "../../shared/sound-card/SoundCard";
import AnswerChoiceButton from "../../shared/answer-choice/AnswerChoiceButton";
import NextRoundButton from "../../shared/next-round-button/NextRoundButton";
import useScoreTracker from "../../../hooks/useScoreTracker";
import ScoreTracker from "../../shared/score-tracker/ScoreTracker";
import NoteUtils, { GenerateNoteOctaveOptions, MusicalNote, NoteOctave, NoteTypes } from "../../../utils/NoteUtils";
import { BaseSoloGameState } from "../../../utils/SoloGameStateUtils";
import MathUtils from "../../../utils/MathUtils";

export interface SoloMultiChoiceOptions {
  noteDuration: number;
  numberOfChoices: number;
  noteRangeMin: number;
  noteRangeMax: number;
}

export interface SoloMultiChoiceState extends BaseSoloGameState {
  correctNoteOctave: NoteOctave;
  noteGroup: MusicalNote[];
  answerChoices: MusicalNote[];
}

export interface SoloMultiChoiceSettings {
  numAnswerChoices: number;
  generateNoteOctaveOptions: GenerateNoteOctaveOptions;
}

export default function SoloMultiChoiceContainer(): JSX.Element {
  const [gameSettings, setGameSettings] = useState<SoloMultiChoiceSettings>({
    numAnswerChoices: 5,
    generateNoteOctaveOptions: {
      octaveOptions: {
        min: 3,
        max: 5,
      },
      noteOptions: {
        noteType: NoteTypes.NATURAL,
      },
    },
  });

  const generateAnswerChoices = (correctNote: MusicalNote, noteGroup: MusicalNote[]): MusicalNote[] => {
    const filteredNotes = noteGroup.filter(
      (note: string) => {
        if (note !== correctNote) {
          return true;
        }
        return false;
      },
    );
    filteredNotes.sort(() => { return Math.random() - 0.5; });
    const range = MathUtils.clamp(gameSettings.numAnswerChoices - 1, 1, filteredNotes.length);
    const items = [correctNote].concat(filteredNotes.slice(0, range));
    items.sort(() => { return Math.random() - 0.5; });
    return items;
  };

  const generateNewGameState = (): SoloMultiChoiceState => {
    const generateResult = NoteUtils.generateNoteOctave(gameSettings.generateNoteOctaveOptions);
    const noteOctave = generateResult.noteOctave;
    const noteGroup = generateResult.noteGroup;
    const answerChoices = generateAnswerChoices(noteOctave.note, noteGroup);
    return {
      correctNoteOctave: noteOctave,
      noteGroup: noteGroup,
      answerChoices: answerChoices,
      isRoundOver: false,
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
        if (prevState.isRoundOver === true) {
          return prevState;
        }
        return {
          correctNoteOctave: {
            note: prevState.correctNoteOctave.note,
            octave: prevState.correctNoteOctave.octave,
          },
          noteGroup: [...prevState.noteGroup],
          answerChoices: [...prevState.answerChoices],
          hasPlayed: prevState.hasPlayed,
          isRoundOver: true,
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

  const onClick_PlayButton = useCallback((): void => {
    setGameState(
      (prevState) => {
        if (prevState.hasPlayed === true) {
          return prevState;
        }
        return {
          correctNoteOctave: {
            note: prevState.correctNoteOctave.note,
            octave: prevState.correctNoteOctave.octave,
          },
          noteGroup: [...prevState.noteGroup],
          answerChoices: [...prevState.answerChoices],
          hasPlayed: true,
          isRoundOver: prevState.isRoundOver,
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
      {renderSoundCard()}
      {renderAnswerChoiceButtons()}
      {renderNextRoundButton()}
    </React.Fragment>
  );
}
