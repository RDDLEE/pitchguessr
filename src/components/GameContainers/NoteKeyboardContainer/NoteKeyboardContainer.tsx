import { Button } from "@mantine/core";
import React, { useCallback, useContext } from "react";

import Piano from "@/components/Piano/Piano";
import type { NoteOctave } from "@/utils/NoteUtils";

import NextRoundButton from "../../NextRoundButton/NextRoundButton";
import QuestionPrompt from "../../QuestionPrompt/QuestionPrompt";
import ScoreTracker from "../../ScoreTracker/ScoreTracker";
import SoundCard from "../../SoundCard/SoundCard";
import GameContainer from "../GameContainer/GameContainer";
import { NoteKeyboardContext } from "./NoteKeyboardContext";
import NoteKeyboardSettingsModal from "./NoteKeyboardSettingsModal";

const GAME_CONTEXT = NoteKeyboardContext;

export default function NoteKeyboardContainer(): JSX.Element {
  const gameContext = useContext(GAME_CONTEXT);

  const gameState = gameContext.gameState;
  const gameSettings = gameContext.gameSettings;

  const renderSoundCard = (): JSX.Element => {
    return (
      <SoundCard
        noteOctave={[gameState.correctNote]}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={gameContext.onPlay}
        hasPlayed={gameState.hasPlayed}
      />
    );
  };

  const postPlay_PianoKey = useCallback((noteOctave: NoteOctave): void => {
    if (gameContext.selectNoteOctave) {
      gameContext.selectNoteOctave(noteOctave);
    }
  }, [gameContext]);

  const renderPiano = (): JSX.Element => {
    const minOctave = gameSettings.generateNoteOctaveOptions.octaveOptions.min;
    const maxOctave = gameSettings.generateNoteOctaveOptions.octaveOptions.max;
    return (
      <Piano startOctave={minOctave} endOctave={maxOctave} postPlay_PianoKey={postPlay_PianoKey} />
    );
  };

  const onClick_SubmitButton = useCallback((): void => {
    if (gameContext.submitAnswer) {
      gameContext.submitAnswer();
    }
  }, [gameContext]);

  const renderSelectedNote = useCallback((): JSX.Element | null => {
    const selectedNoteOctave = gameState.selectedNote;
    if (selectedNoteOctave === null) {
      return null;
    }
    return (
      <div>
        {`You selected ${selectedNoteOctave.note}${selectedNoteOctave.octave}.`}
      </div>
    );
  }, [gameState.selectedNote]);

  const renderSubmitButton = useCallback((): JSX.Element | null => {
    if (gameState.isRoundOver === true) {
      return null;
    }
    return (
      <Button
        color="teal"
        variant="filled"
        onClick={onClick_SubmitButton}
        disabled={gameState.hasPlayed === false || gameState.selectedNote === null}
      >
        Submit
      </Button>
    );
  }, [gameState.hasPlayed, gameState.isRoundOver, gameState.selectedNote, onClick_SubmitButton]);

  const renderCorrectNoteText = useCallback((): JSX.Element | null => {
    if (gameState.isRoundOver === false) {
      return null;
    }
    const correctNoteOctave = gameState.correctNote;
    return (
      <div>
        {`The correct note was: ${correctNoteOctave.note}${correctNoteOctave.octave}.`}
      </div>
    );
  }, [gameState.correctNote, gameState.isRoundOver]);

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
      <NoteKeyboardSettingsModal />
      <ScoreTracker scoreStats={gameContext.scoreTracker.scoreStats} />
      {renderSoundCard()}
      <QuestionPrompt text="What note was played?" />
      {renderPiano()}
      {renderSelectedNote()}
      {renderSubmitButton()}
      {renderCorrectNoteText()}
      {renderNextRoundButton()}
    </GameContainer>
  );
}
