"use client";

import { Card, Flex } from "@mantine/core";
import React from "react";

export default function GameContainer({ children }: Readonly<{ children: React.ReactNode; }>): JSX.Element {
  return (
    <Flex
      justify="flex-start"
      align="center"
      direction="column"
      wrap="wrap"
      w="100%"
    >
      <Card
        withBorder={true}
        shadow="xl"
        w={400}
        p="md"
      >
        <Flex
          justify="flex-start"
          align="center"
          direction="column"
          wrap="wrap"
          w="100%"
          gap="xs"
        >
          {children}
        </Flex>
      </Card>
    </Flex>
  );
}
