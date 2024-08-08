import React, { useCallback, useContext } from "react";

import NextRoundButton from "@/components/NextRoundButton/NextRoundButton";
import ScoreTracker from "@/components/ScoreTracker/ScoreTracker";
import SoundCard from "@/components/SoundCard/SoundCard";
import { DistanceContext } from "@/contexts/DistanceContext";
import StyleUtils from "@/utils/StyleUtils";

import GameContainer from "../GameContainer/GameContainer";
import DistanceSlider from "./DistanceSlider/DistanceSlider";
import DistanceSettingsModal from "./SettingsModal/DistanceSettingsModal";

export default function DistanceContainer(): JSX.Element {
  const distanceContext = useContext(DistanceContext);

  const renderFirstSoundCard = useCallback((): JSX.Element => {
    const noteOctave = distanceContext.gameState.firstNoteOctave;
    return (
      <SoundCard
        noteOctave={noteOctave}
        noteDuration={distanceContext.gameSettings.noteDuration}
        onClick_PlayButton={distanceContext.onPlay}
        width={StyleUtils.STANDARD_GAMEPLAY_ITEM_WIDTH}
        hasPlayed={distanceContext.gameState.hasPlayed}
      />
    );
  }, [distanceContext.gameSettings.noteDuration, distanceContext.gameState.firstNoteOctave, distanceContext.gameState.hasPlayed, distanceContext.onPlay]);

  const onClick_NextRoundButton = useCallback((): void => {
    if (distanceContext.onNewRound === undefined) {
      return;
    }
    distanceContext.onNewRound(distanceContext.gameSettings, false);
  }, [distanceContext]);

  const renderNextRoundButton = useCallback((): JSX.Element | null => {
    if (distanceContext.gameState.isRoundOver === false) {
      return null;
    }
    return (
      <NextRoundButton onClick_NextRoundButton={onClick_NextRoundButton} />
    );
  }, [distanceContext.gameState.isRoundOver, onClick_NextRoundButton]);

  return (
    <GameContainer>
      <DistanceSettingsModal />
      {/* FIXME: Extract scoreStats from context. */}
      <ScoreTracker scoreStats={distanceContext.scoreTracker.scoreStats} />
      {/* Sound card extract values from context. */}
      {renderFirstSoundCard()}
      <DistanceSlider />
      {renderNextRoundButton()}
    </GameContainer>
  );
}
