"use client";

import React, { useCallback, useState } from "react";
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
import { produce } from "immer";
import { Group } from "@mantine/core";
import GameContainer from "../game-container/GameContainer";

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
      produce(gameState, (draft): void => {
        if (draft.hasPlayed === true) {
          return;
        }
        draft.hasPlayed = true;
      })
    );
  }, [gameState]);

  const onClick_PlayButtonSecond = useCallback((): void => {
    setGameState(
      produce(gameState, (draft): void => {
        if (draft.hasPlayedSecond === true) {
          return;
        }
        draft.hasPlayedSecond = true;
      })
    );
  }, [gameState]);

  const renderFirstSoundCard = (): JSX.Element => {
    return (
      <SoundCard
        noteOctave={gameState.noteOctavePair.firstNoteOctave}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={onClick_PlayButtonFirst}
        width={SOUND_CARD_WIDTH}
        hasPlayed={gameState.hasPlayed}
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
        hasPlayed={gameState.hasPlayedSecond}
      />
    );
  };

  const onClick_AnswerChoice = useCallback((answerChoice: string): void => {
    setGameState(
      produce(gameState, (draft): void => {
        draft.isRoundOver = true;
      })
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
      <Group>
        {buttons}
      </Group>
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
    <GameContainer>
      <SoloDirectionalSettingsModal
        settings={gameSettings}
        setGameSettings={setGameSettings}
        onNewRound={onNewRound}
      />
      <ScoreTracker scoreStats={scoreTracker.scoreStats} />
      <Group gap="xs">
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
