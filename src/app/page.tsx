"use client";

import { AbsoluteCenter, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Divider, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import Image from "next/image";

export default function HomePage(): JSX.Element {
  const CARD_WIDTH = 250;

  const CARD_HEIGHT = 350;

  const BOX_DIVIDER_PADDING = 8;

  return (
    <main>
      <Center>
        <HStack gap={1}>
          <Image
            src="/logo/logo_sq_white.png"
            width={50}
            height={50}
            alt="PitchGuessr Logo."
          />
          <Heading fontSize="4xl">PitchGuessr</Heading>
        </HStack>
      </Center>
      <Box position="relative" padding={BOX_DIVIDER_PADDING}>
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          <Heading fontSize="3xl">Solo</Heading>
        </AbsoluteCenter>
      </Box>
      <Center>
        <VStack>
          <Text fontSize="sm">Train your pitch perception.</Text>
          <HStack>
            <Card variant="outline" align="center" w={CARD_WIDTH} maxWidth={CARD_WIDTH} h={CARD_HEIGHT}>
              <CardHeader>
                <Center>
                  <VStack>
                    <Heading size="md">Directional</Heading>
                    <Text fontSize="sm" color="green">
                      (Easy)
                    </Text>
                  </VStack>
                </Center>
              </CardHeader>
              <CardBody>
                <Center>
                  <Text fontSize="sm">
                    Is the second note lower, equal or higher to the first note?
                  </Text>
                </Center>
              </CardBody>
              <CardFooter>
                <NextLink href="/solo/directional" passHref={true} legacyBehavior={true}>
                  <Button as="a" colorScheme="teal" variant="solid">
                    Play
                  </Button>
                </NextLink>
              </CardFooter>
            </Card>
            <Card variant="outline" align="center" w={CARD_WIDTH} maxWidth={CARD_WIDTH} h={CARD_HEIGHT}>
              <CardHeader>
                <Center>
                  <VStack>
                    <Heading size="md">Multi-Choice</Heading>
                    <Text fontSize="sm" color="orangeRed">
                      (Medium)
                    </Text>
                  </VStack>
                </Center>
              </CardHeader>
              <CardBody>
                <Center>
                  <Text fontSize="sm">
                    Given a set of choices, guess what note was played.
                  </Text>
                </Center>
              </CardBody>
              <CardFooter>
                <NextLink href="/solo/multi-choice" passHref={true} legacyBehavior={true}>
                  <Button as="a" colorScheme="teal" variant="solid">
                    Play
                  </Button>
                </NextLink>
              </CardFooter>
            </Card>
          </HStack>
        </VStack>
      </Center>

      <Box position="relative" padding={BOX_DIVIDER_PADDING}>
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          <Heading fontSize="3xl">Battle</Heading>
        </AbsoluteCenter>
      </Box>
      <Center>
        <VStack>
          <Text fontSize="sm">Play against your friends.</Text>
          <Card variant="outline" align="center" w={CARD_WIDTH} maxWidth={CARD_WIDTH} h={CARD_HEIGHT}>
            <CardBody>
              <Text fontSize="sm">Coming Soon!</Text>
            </CardBody>
          </Card>
        </VStack>
      </Center>
    </main>
  );
}
