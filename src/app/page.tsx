import { Button, Card, Text, Title } from "@mantine/core";
import NextLink from "next/link";
import React from "react";

import type { GameData } from "@/utils/PathUtils";
import PathUtils, { EGameDifficultyTypes } from "@/utils/PathUtils";
import StyleUtils from "@/utils/StyleUtils";

import classes from "./page.module.css";

export default function HomePage(): JSX.Element {
  const renderGameCard = (gameData: GameData): JSX.Element => {
    return (
      <Card
        key={gameData.name}
        className={classes["game-card"]}
        shadow="xl"
        withBorder={true}
      >
        <Title order={3} ta="center">
          {gameData.name}
        </Title>
        <Text c={StyleUtils.getDifficultyColor(gameData.difficulty)} ta="center" size="sm">
          {gameData.difficulty}
        </Text>
        <div className="flex size-full flex-col flex-wrap items-center justify-center gap-0">
          <Text size="sm">
            {gameData.description}
          </Text>
        </div>
        <NextLink href={gameData.link} passHref={true} legacyBehavior={true}>
          <Button component="a" variant="filled" size="md" color="green.7">
            Play
          </Button>
        </NextLink>
      </Card>
    );
  };

  const renderGameCardsByDifficulty = (difficulty: EGameDifficultyTypes): JSX.Element[] => {
    const gamesJSX: JSX.Element[] = [];
    PathUtils.games.forEach((value: GameData) => {
      if (value.difficulty === difficulty) {
        gamesJSX.push(renderGameCard(value));
      }
    });
    return gamesJSX;
  };

  const renderGameSection = (title: string, difficulty: EGameDifficultyTypes): JSX.Element => {
    const baseColor = StyleUtils.getDifficultyColor(difficulty);
    const finalColor = `${baseColor.substring(0, baseColor.length - 1)}9`;
    return (
      <React.Fragment>
        <Text
          className="my-4"
          size="xl"
          fw={700}
          variant="gradient"
          gradient={{ from: baseColor, to: finalColor, deg: 90 }}
          ta="center"
        >
          {title}
        </Text>
        <div className="mx-4 flex flex-row flex-wrap items-center justify-center gap-4">
          {renderGameCardsByDifficulty(difficulty)}
        </div>
      </React.Fragment>
    );
  };

  return (
    <main className="pb-12">
      <div className="flex w-full flex-col flex-wrap items-center justify-center gap-0">
        <Title order={1} mt="xl" c="green.7" fw={900}>
          PitchGuessr
        </Title>
        <Text size="md" mb="md">
          Train your pitch perception.
        </Text>
      </div>
      {renderGameSection("Easy", EGameDifficultyTypes.EASY)}
      {renderGameSection("Medium", EGameDifficultyTypes.MEDIUM)}
      {renderGameSection("Hard", EGameDifficultyTypes.HARD)}
    </main>
  );
}
