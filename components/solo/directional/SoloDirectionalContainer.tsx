"use client";

import React, { useCallback, useState } from "react";
import { Center, HStack, Stack, VStack } from "@chakra-ui/react";
import useScoreTracker from "../../../hooks/useScoreTracker";
import ScoreTracker from "../../shared/score-tracker/ScoreTracker";
import SoundCard from "../../shared/sound-card/SoundCard";
import NoteUtils, { NoteOctave, PitchDirection } from "../../../utils/NoteUtils";
import AnswerChoiceButton from "../../shared/answer-choice/AnswerChoiceButton";
import NextRoundButton from "../../shared/next-round-button/NextRoundButton";
import GameStateUtils, { BaseSoloGameState, SoloDirectionSettings } from "../../../utils/GameStateUtils";
import SoloDirectionalSettingsModal from "./settings-modal/SoloDirectionalSettingsModal";
import StyleUtils from "../../../utils/StyleUtils";
import QuestionPrompt from "../../shared/question-prompt/QuestionPrompt";

export interface NoteOctavePair {
  firstNoteOctave: NoteOctave;
  secondNoteOctave: NoteOctave;
}

export interface SoloDirectionalState extends BaseSoloGameState {
  hasPlayedSecond: boolean;
  noteOctavePair: NoteOctavePair;
  correctDirection: PitchDirection;
}

export default function SoloDirectionalContainer(): JSX.Element {
  const [gameSettings, setGameSettings] = useState<SoloDirectionSettings>(GameStateUtils.DEFAULT_SOLO_DIRECTIONAL_SETTINGS);

  const scoreTracker = useScoreTracker();

  const SOUND_CARD_HSTACK_GAP_WIDTH = 2;

  const SOUND_CARD_WIDTH = (StyleUtils.STANDARD_GAMEPLAY_ITEM_WIDTH - (SOUND_CARD_HSTACK_GAP_WIDTH * 4)) / 2;

  const generateNewState = (settings: SoloDirectionSettings): SoloDirectionalState => {
    const newFirstNoteOctave = NoteUtils.generateNoteOctave(settings.generateNoteOctaveOptions).noteOctave;
    const newSecondNoteOctave = NoteUtils.generateNoteOctave(settings.generateNoteOctaveOptions).noteOctave;
    const correctPitchDirection = NoteUtils.compareNoteOctaveValues(newFirstNoteOctave, newSecondNoteOctave);
    return {
      noteOctavePair: {
        firstNoteOctave: newFirstNoteOctave,
        secondNoteOctave: newSecondNoteOctave,
      },
      correctDirection: correctPitchDirection,
      isRoundOver: false,
      hasPlayed: false,
      hasPlayedSecond: false,
    };
  };
  const [gameState, setGameState] = useState<SoloDirectionalState>(generateNewState(gameSettings));

  const onNewRound = (settings: SoloDirectionSettings, shouldResetScore: boolean): void => {
    if (shouldResetScore === true) {
      scoreTracker.resetScore();
    }
    const newState = generateNewState(settings);
    setGameState(newState);
  };

  const onClick_PlayButtonFirst = useCallback((): void => {
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
          hasPlayedSecond: prevState.hasPlayedSecond,
          isRoundOver: prevState.isRoundOver,
        };
      },
    );
  }, []);

  const onClick_PlayButtonSecond = useCallback((): void => {
    setGameState(
      (prevState) => {
        if (prevState.hasPlayedSecond === true) {
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
          hasPlayed: prevState.hasPlayed,
          hasPlayedSecond: true,
          isRoundOver: prevState.isRoundOver,
        };
      },
    );
  }, []);

  const renderFirstSoundCard = (): JSX.Element => {
    return (
      <SoundCard
        noteOctave={gameState.noteOctavePair.firstNoteOctave}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={onClick_PlayButtonFirst}
        width={SOUND_CARD_WIDTH}
      />
    );
  };

  const renderSecondSoundCard = (): JSX.Element => {
    return (
      <SoundCard
        noteOctave={gameState.noteOctavePair.secondNoteOctave}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={onClick_PlayButtonSecond}
        width={SOUND_CARD_WIDTH}
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
          hasPlayedSecond: prevState.hasPlayedSecond,
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
          hasPlayed={gameState.hasPlayed && gameState.hasPlayedSecond}
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
    onNewRound(gameSettings, false);
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
    <Center>
      <VStack>
        <SoloDirectionalSettingsModal
          settings={gameSettings}
          setGameSettings={setGameSettings}
          onNewRound={onNewRound}
        />
        <ScoreTracker scoreStats={scoreTracker.scoreStats} />
        <HStack gap={2}>
          {renderFirstSoundCard()}
          {renderSecondSoundCard()}
        </HStack>
        <QuestionPrompt
          text="Is the second note higher, lower, or equal to the first note?"
        />
        {renderAnswerChoiceButtons()}
        {renderNextRoundButton()}
      </VStack>
    </Center>
  );
}
