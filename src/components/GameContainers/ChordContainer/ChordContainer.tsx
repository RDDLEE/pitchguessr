import { Button, Group } from "@mantine/core";
import React, { useCallback, useContext } from "react";

import AnswerChoiceToggleable from "@/components/AnswerChoiceToggleable/AnswerChoiceToggleable";
import NextRoundButton from "@/components/NextRoundButton/NextRoundButton";
import QuestionPrompt from "@/components/QuestionPrompt/QuestionPrompt";
import ScoreTracker from "@/components/ScoreTracker/ScoreTracker";
import SoundCard from "@/components/SoundCard/SoundCard";
import { ChordContext } from "@/contexts/ChordContext";
import type { MusicalNote, NoteOctave } from "@/utils/NoteUtils";
import NoteUtils from "@/utils/NoteUtils";

import GameContainer from "../GameContainer/GameContainer";
import ChordSettingsModal from "./SettingsModal/ChordSettingsModal";

export default function ChordContainer(): JSX.Element {
  const chordContext = useContext(ChordContext);

  const gameState = chordContext.gameState;
  const gameSettings = chordContext.gameSettings;

  const renderFirstSoundCard = useCallback((): JSX.Element => {
    return (
      <SoundCard
        noteOctave={gameState.correctNotes}
        noteDuration={gameSettings.noteDuration}
        onClick_PlayButton={chordContext.onPlay}
        hasPlayed={gameState.hasPlayed}
      />
    );
  }, [chordContext.onPlay, gameSettings.noteDuration, gameState.hasPlayed, gameState.correctNotes]);

  const onClick_AnswerChoice = useCallback((payload: MusicalNote): void => {
    if (gameState.selectedNotes.includes(payload)) {
      // If already selected, remove.
      if (chordContext.removeSelectedNote) {
        chordContext.removeSelectedNote(payload);
      }
    } else {
      // If not selected, add.
      if (chordContext.addSelectedNote) {
        chordContext.addSelectedNote(payload);
      }
    }
  }, [chordContext, gameState.selectedNotes]);

  const renderAnswerChoices = (): JSX.Element => {
    const buttons: JSX.Element[] = [];
    const noteGroup = NoteUtils.chooseNoteGroup({
      noteType: gameSettings.generateNoteOctaveOptions.noteOptions.noteType,
    });
    for (let i = 0; i < noteGroup.length; i++) {
      const note = noteGroup[i];
      let isCorrect: boolean = false;
      if (gameState.correctNotes.some((noteOctave: NoteOctave) => {
        if (noteOctave.note === note) {
          return true;
        }
        return false;
      })) {
        isCorrect = true;
      }
      buttons.push((
        <AnswerChoiceToggleable<MusicalNote>
          key={note}
          text={note}
          payload={note}
          onClick_Button={onClick_AnswerChoice}
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

  const onClick_NextRoundButton = useCallback((): void => {
    if (chordContext.onNewRound === undefined) {
      return;
    }
    chordContext.onNewRound(chordContext.gameSettings, false);
  }, [chordContext]);

  const onClick_SubmitButton = useCallback((): void => {
    if (chordContext.submitAnswer) {
      chordContext.submitAnswer();
    }
  }, [chordContext]);

  const renderSubmitButton = useCallback((): JSX.Element => {
    return (
      <Button
        color="teal"
        variant="filled"
        onClick={onClick_SubmitButton}
        disabled={
          chordContext.gameState.isRoundOver === true
          || gameState.hasPlayed === false
          || gameState.selectedNotes.length === 0
        }
      >
        Submit
      </Button>
    );
  }, [chordContext.gameState.isRoundOver, gameState.hasPlayed, gameState.selectedNotes.length, onClick_SubmitButton]);

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
      <ChordSettingsModal />
      <ScoreTracker scoreStats={chordContext.scoreTracker.scoreStats} />
      {renderFirstSoundCard()}
      <QuestionPrompt
        text="Which notes were played in the chord?"
      />
      {renderAnswerChoices()}
      {renderSubmitButton()}
      {renderNextRoundButton()}
    </GameContainer>
  );
}
