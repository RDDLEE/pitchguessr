"use client";

import { Anchor, AppShell, Burger, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import PathUtils from "@/utils/PathUtils";

export default function NavShell({ children }: Readonly<{ children: React.ReactNode; }>): JSX.Element | null {
  const pathName = usePathname();

  const [opened, { toggle }] = useDisclosure();

  if (pathName === PathUtils.HOME_PATH) {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }

  const LINK_COLOR = "green.7";
  const LINK_WEIGHT = 700;

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
        <Flex
          gap="xs"
          justify="flex-start"
          align="center"
          direction="row"
          wrap="wrap"
          h="100%"
          pl="md"
        >
          <Burger
            opened={opened}
            onClick={toggle}
            /* hiddenFrom="sm" */
            size="sm"
          />
          <Anchor href={PathUtils.HOME_PATH} c={LINK_COLOR} component={NextLink}>
            <Text fw={1000}>PitchGuessr</Text>
          </Anchor>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md" zIndex={900}>
        <Flex
          justify="flex-start"
          align="center"
          direction="column"
          wrap="wrap"
          w="100%"
          h="100%"
          gap="md"
        >
          <Anchor href={PathUtils.DIRECTIONAL_PATH} underline="never" c={LINK_COLOR} component={NextLink}>
            <Text fw={LINK_WEIGHT}>Directional</Text>
          </Anchor>
          <Anchor href={PathUtils.DISTANCE_PATH} underline="never" c={LINK_COLOR} component={NextLink}>
            <Text fw={LINK_WEIGHT}>Distance</Text>
          </Anchor>
          <Anchor href={PathUtils.MULTI_CHOICE_PATH} underline="never" c={LINK_COLOR} component={NextLink}>
            <Text fw={LINK_WEIGHT}>Multi-Choice</Text>
          </Anchor>
          <Anchor href={PathUtils.SLIDER_PATH} underline="never" c={LINK_COLOR} component={NextLink}>
            <Text fw={LINK_WEIGHT}>Slider</Text>
          </Anchor>
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
