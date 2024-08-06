"use client";

import { Text } from "@mantine/core";
import { produce } from "immer";
import React, { useCallback, useState } from "react";

import useScoreTracker from "../../../hooks/useScoreTracker";
import type { BaseSoloGameState, SoloSliderSettings } from "../../../utils/GameStateUtils";
import GameStateUtils from "../../../utils/GameStateUtils";
import type { NoteOctave } from "../../../utils/NoteUtils";
import NoteUtils from "../../../utils/NoteUtils";
import StyleUtils from "../../../utils/StyleUtils";
import NextRoundButton from "../../shared/next-round-button/NextRoundButton";
import QuestionPrompt from "../../shared/question-prompt/QuestionPrompt";
import ScoreTracker from "../../shared/score-tracker/ScoreTracker";
import SoundCard from "../../shared/sound-card/SoundCard";
import GameContainer from "../game-container/GameContainer";
import FrequencySlider from "./frequency-slider/FrequencySlider";
import SoloSliderSettingsModal from "./settings-modal/SoloSliderSettingsModal";

export interface SoloSliderState extends BaseSoloGameState {
  correctNoteOctave: NoteOctave;
}

export default function SoloSliderContainer(): JSX.Element {
  const [gameSettings, setGameSettings] = useState<SoloSliderSettings>(GameStateUtils.DEFAULT_SOLO_SLIDER_SETTINGS);

  const generateNewGameState = (settings: SoloSliderSettings): SoloSliderState => {
    const generateResult = NoteUtils.generateNoteOctave(settings.generateNoteOctaveOptions);
    const noteOctave = generateResult.noteOctave;
    return {
      correctNoteOctave: noteOctave,
      isRoundOver: false,
      hasPlayed: false,
    };
  };
  const [gameState, setGameState] = useState<SoloSliderState>(generateNewGameState(gameSettings));

  const scoreTracker = useScoreTracker();

  const onNewRound = (settings: SoloSliderSettings, shouldResetScore: boolean): void => {
    scoreTracker.onNewRound(shouldResetScore);
    const newState = generateNewGameState(settings);
    setGameState(newState);
  };

  const onClick_PlayButton = useCallback((): void => {
    setGameState(
      produce(gameState, (draft): void => {
        if (draft.hasPlayed === true) {
          return;
        }
        draft.hasPlayed = true;
      })
    );
  }, [gameState]);

  const renderSoundCard = (): JSX.Element => {
    const noteOctave = gameState.correctNoteOctave;
    return (
      <SoundCard
        noteOctave={noteOctave}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={onClick_PlayButton}
        width={StyleUtils.STANDARD_GAMEPLAY_ITEM_WIDTH}
        hasPlayed={gameState.hasPlayed}
      />
    );
  };

  const onClick_SliderAnswerSubmit = useCallback((sliderAnswerHz: number): void => {
    setGameState(
      produce(gameState, (draft): void => {
        if (draft.isRoundOver) {
          return;
        }
        draft.isRoundOver = true;
      })
    );
    const correctHz = NoteUtils.convertNoteOctaveToFrequency(gameState.correctNoteOctave);
    // Converting from NoteOctave to Freq to Tone.Unit.Note.
    const correctNote = NoteUtils.convertFrequencyToNoteOctave(correctHz);
    const chosenNote = NoteUtils.convertFrequencyToNoteOctave(sliderAnswerHz);
    // FIXME: Display correct slider value.
    if (chosenNote === correctNote) {
      scoreTracker.incrementNumCorrect();
    } else {
      scoreTracker.incrementNumIncorrect();
    }
  }, [gameState, scoreTracker]);

  const renderSoundSlider = (): JSX.Element => {
    return (
      <FrequencySlider
        octaveOptions={gameSettings.generateNoteOctaveOptions.octaveOptions}
        onClick_SubmitButton={onClick_SliderAnswerSubmit}
        hasPlayed={gameState.hasPlayed}
        isRoundOver={gameState.isRoundOver}
      />
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

  const renderCorrectAnswerText = (): JSX.Element | null => {
    if (!gameState.isRoundOver) {
      return null;
    }
    const correctHz = NoteUtils.convertNoteOctaveToFrequency(gameState.correctNoteOctave);
    return (
      <Text size="sm">
        {`The correct note was: ${gameState.correctNoteOctave.note}${gameState.correctNoteOctave.octave} at ${Math.round(correctHz)} Hz.`}
      </Text>
    );
  };

  return (
    <GameContainer>
      <SoloSliderSettingsModal
        settings={gameSettings}
        setGameSettings={setGameSettings}
        onNewRound={onNewRound}
      />
      <ScoreTracker scoreStats={scoreTracker.scoreStats} />
      {renderSoundCard()}
      <QuestionPrompt
        text="Use the slider to match the note."
      />
      {renderSoundSlider()}
      {renderCorrectAnswerText()}
      {renderNextRoundButton()}
    </GameContainer>
  );
}
