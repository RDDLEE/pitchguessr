"use client";

import { AppShell, Burger, Anchor, Text, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavShell({ children }: Readonly<{ children: React.ReactNode; }>): JSX.Element | null {
  const pathName = usePathname();

  const [opened, { toggle }] = useDisclosure();

  if (pathName === "/") {
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
          <Anchor href="/" c={LINK_COLOR}>
            <Text fw={1000}>PitchGuessr</Text>
          </Anchor>
        </Flex>
      </AppShell.Header>
      {/* zIndex of 201 to put infront of button Tooltips. */}
      <AppShell.Navbar p="md" zIndex={201}>
        <Flex
          justify="flex-start"
          align="center"
          direction="column"
          wrap="wrap"
          w="100%"
          h="100%"
          gap="md"
        >
          <Anchor href="/solo/directional" underline="never" c={LINK_COLOR}>
            <Text fw={LINK_WEIGHT}>Directional</Text>
          </Anchor>
          <Anchor href="/solo/multi-choice" underline="never" c={LINK_COLOR}>
            <Text fw={LINK_WEIGHT}>Multi-Choice</Text>
          </Anchor>
          <Anchor href="/solo/slider" underline="never" c={LINK_COLOR}>
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
