"use client";

import { Anchor, AppShell, Burger, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback } from "react";

import PathUtils, { EGameDifficultyTypes, type GameData } from "@/utils/PathUtils";
import StyleUtils from "@/utils/StyleUtils";

const LINK_COLOR = "green.7";

export default function NavShell({ children }: Readonly<{ children: React.ReactNode; }>): JSX.Element | null {
  const pathName = usePathname();

  const [opened, { close, toggle }] = useDisclosure();

  const onClick_Anchor = useCallback((): void => {
    close();
  }, [close]);

  if (pathName === PathUtils.HOME_PATH) {
    if (opened) {
      close();
    }
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }

  const renderAnchor = (gameData: GameData): JSX.Element => {
    return (
      <div key={gameData.link}>
        <Anchor href={gameData.link} underline="never" c={LINK_COLOR} component={NextLink} onClick={onClick_Anchor}>
          <Text>{gameData.name}</Text>
        </Anchor>
      </div>
    );
  };

  const renderAnchors = (difficulty: EGameDifficultyTypes): JSX.Element[] => {
    const anchorsJSX: JSX.Element[] = [];
    PathUtils.games.forEach((value: GameData) => {
      if (value.difficulty === difficulty) {
        anchorsJSX.push(renderAnchor(value));
      }
    });
    return anchorsJSX;
  };

  const renderAnchorsByDifficulty = (title: string, difficulty: EGameDifficultyTypes): JSX.Element => {
    const baseColor = StyleUtils.getDifficultyColor(difficulty);
    const finalColor = `${baseColor.substring(0, baseColor.length - 1)}9`;
    return (
      <React.Fragment>
        <Text
          size="md"
          fw={500}
          variant="gradient"
          gradient={{ from: baseColor, to: finalColor, deg: 90 }}
          ta="left"
        >
          {title}
        </Text>
        <div className="flex w-full flex-col flex-wrap items-center justify-center gap-2">
          {renderAnchors(difficulty)}
        </div>
      </React.Fragment>
    );
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: {
          mobile: !opened,
          desktop: !opened,
        },
      }}
      padding="md"
    >
      <AppShell.Header>
        <div className="flex h-full flex-row flex-wrap items-center justify-start gap-2 pl-2">
          <Burger
            opened={opened}
            onClick={toggle}
            /* hiddenFrom="sm" */
            size="sm"
          />
          <Anchor href={PathUtils.HOME_PATH} c={LINK_COLOR} component={NextLink}>
            <Text fw={1000}>PitchGuessr</Text>
          </Anchor>
        </div>
      </AppShell.Header>
      <AppShell.Navbar p="md" zIndex={900}>
        <div className="flex w-full flex-col flex-wrap items-center justify-center gap-4">
          {renderAnchorsByDifficulty("Easy", EGameDifficultyTypes.EASY)}
          {renderAnchorsByDifficulty("Medium", EGameDifficultyTypes.MEDIUM)}
          {renderAnchorsByDifficulty("Hard", EGameDifficultyTypes.HARD)}
        </div>
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
