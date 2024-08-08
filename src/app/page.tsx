import { Button, Card, Flex, Text, Title } from "@mantine/core";
import NextLink from "next/link";
import React from "react";

import PathUtils from "@/utils/PathUtils";

enum GameDifficultyTypes {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

interface GameData {
  name: string;
  difficulty: GameDifficultyTypes,
  description: string;
  link: string;
}

export default function HomePage(): JSX.Element {
  const CARD_WIDTH = 225;
  const CARD_HEIGHT = 300;

  const games: GameData[] = [
    {
      name: "Directional",
      difficulty: GameDifficultyTypes.EASY,
      description: "Is the second note lower, equal or higher to the first note?",
      link: PathUtils.DIRECTIONAL_PATH,
    },
    {
      name: "Multi-Choice",
      difficulty: GameDifficultyTypes.MEDIUM,
      description: "Given a set of choices, guess what note was played.",
      link: PathUtils.MULTI_CHOICE_PATH,
    },
    {
      name: "Slider",
      difficulty: GameDifficultyTypes.HARD,
      description: "Use the slider to match the note.",
      link: PathUtils.SLIDER_PATH,
    },
  ];

  const getDifficultyColor = (difficulty: GameDifficultyTypes): string => {
    if (difficulty === GameDifficultyTypes.EASY) {
      return "green.7";
    }
    if (difficulty === GameDifficultyTypes.MEDIUM) {
      return "orange.7";
    }
    if (difficulty === GameDifficultyTypes.HARD) {
      return "red.7";
    }
    return "red.7";
  };

  const renderGameCard = (gameData: GameData): JSX.Element => {
    return (
      <Card
        key={gameData.name}
        w={CARD_WIDTH}
        h={CARD_HEIGHT}
        shadow="xl"
        withBorder={true}
      >
        <Title order={3} ta="center">
          {gameData.name}
        </Title>
        <Text c={getDifficultyColor(gameData.difficulty)} ta="center" size="sm">
          {gameData.difficulty}
        </Text>
        <Flex
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
          w="100%"
          h="100%"
        >
          <Text size="sm">
            {gameData.description}
          </Text>
        </Flex>
        <NextLink href={gameData.link} passHref={true} legacyBehavior={true}>
          <Button component="a" variant="filled" size="sm" color="green.7">
            Play
          </Button>
        </NextLink>
      </Card>
    );
  };

  const renderGameCards = (): JSX.Element[] => {
    const gamesJSX: JSX.Element[] = [];
    games.forEach((value: GameData) => {
      gamesJSX.push(renderGameCard(value));
    });
    return gamesJSX;
  };

  return (
    <main>
      <Flex
        justify="flex-start"
        align="center"
        direction="column"
        wrap="wrap"
        w="100%"
      >
        <Title order={1} mt="xl" c="green.7">
          PitchGuessr
        </Title>
        <Text size="md" mb="xl">
          Train your pitch perception.
        </Text>
        <Flex
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
          w="100%"
          gap="md"
        >
          {renderGameCards()}
        </Flex>
      </Flex>
    </main>
  );
}
