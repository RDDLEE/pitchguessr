"use client";

import { AbsoluteCenter, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Divider, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

export default function HomePage(): JSX.Element {
  const CARD_WIDTH = 250;
  const CARD_HEIGHT = 350;
  const BOX_DIVIDER_PADDING = 8;
  const CARD_SHADOW = "0px 5px 10px 0px rgba(0,0,0,0.1);";
  const TEXT_DIFFICULTY_FONT_WEIGHT = 500;


  return (
    <main>
      <Center>
        <Heading fontSize="4xl">PitchGuessr</Heading>
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
          <Flex gap={2} wrap="wrap" align="center" justifyContent="center">
            <Card
              variant="outline"
              align="center"
              w={CARD_WIDTH}
              maxWidth={CARD_WIDTH}
              h={CARD_HEIGHT}
              boxShadow={CARD_SHADOW}
            >
              <CardHeader>
                <Center>
                  <VStack>
                    <Heading size="md">Directional</Heading>
                    <Text fontSize="sm" color="green.500" fontWeight={TEXT_DIFFICULTY_FONT_WEIGHT}>
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
                  <Button as="a" colorScheme="teal" variant="solid" size="sm">
                    Play
                  </Button>
                </NextLink>
              </CardFooter>
            </Card>

            <Card
              variant="outline"
              align="center"
              w={CARD_WIDTH}
              maxWidth={CARD_WIDTH}
              h={CARD_HEIGHT}
              boxShadow={CARD_SHADOW}
            >
              <CardHeader>
                <Center>
                  <VStack>
                    <Heading size="md">Multi-Choice</Heading>
                    <Text fontSize="sm" color="orange.500" fontWeight={TEXT_DIFFICULTY_FONT_WEIGHT}>
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
                  <Button as="a" colorScheme="teal" variant="solid" size="sm">
                    Play
                  </Button>
                </NextLink>
              </CardFooter>
            </Card>

            <Card
              variant="outline"
              align="center"
              w={CARD_WIDTH}
              maxWidth={CARD_WIDTH}
              h={CARD_HEIGHT}
              boxShadow={CARD_SHADOW}
            >
              <CardHeader>
                <Center>
                  <VStack>
                    <Heading size="md">Slider</Heading>
                    <Text fontSize="sm" color="red.500" fontWeight={TEXT_DIFFICULTY_FONT_WEIGHT}>
                      (Hard)
                    </Text>
                  </VStack>
                </Center>
              </CardHeader>
              <CardBody>
                <Center>
                  <Text fontSize="sm">
                    Use the slider to match the note.
                  </Text>
                </Center>
              </CardBody>
              <CardFooter>
                <NextLink href="/solo/slider" passHref={true} legacyBehavior={true}>
                  <Button as="a" colorScheme="teal" variant="solid" size="sm">
                    Play
                  </Button>
                </NextLink>
              </CardFooter>
            </Card>

          </Flex>
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
          <Card
            variant="outline"
            align="center"
            w={CARD_WIDTH}
            maxWidth={CARD_WIDTH}
            h={CARD_HEIGHT}
            boxShadow={CARD_SHADOW}
          >
            <CardBody>
              <Text fontSize="sm">Coming Soon!</Text>
            </CardBody>
          </Card>
        </VStack>
      </Center>
    </main>
  );
}
