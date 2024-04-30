"use client";

import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader,
  DrawerBody, DrawerFooter, useDisclosure, IconButton, Link, VStack, Divider, Text,
  HStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavDrawer(): JSX.Element | null {
  const pathName = usePathname();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = React.useRef<HTMLButtonElement>(null);

  if (pathName === "/") {
    return null;
  }

  return (
    <React.Fragment>
      <HStack gap={0}>
        <IconButton
          variant="ghost"
          colorScheme="teal"
          aria-label="open menu"
          icon={<HamburgerIcon />}
          ref={btnRef}
          onClick={onOpen}
        />
        <Link href="/" fontWeight={700}>
          <Text>PitchGuessr</Text>
        </Link>
      </HStack>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Link as={NextLink} href="/" onClick={onClose}>
              Home
            </Link>
          </DrawerHeader>
          <DrawerBody>
            <VStack align="flex-start">
              <Text>
                Solo
              </Text>
              <Divider />
              <Link
                as={NextLink}
                href="/solo/directional"
                onClick={onClose}
                ml={8}
              >
                Directional
              </Link>
              <Link
                as={NextLink}
                href="/solo/multi-choice"
                onClick={onClose}
                ml={8}
              >
                Multi-Choice
              </Link>
              <Link
                as={NextLink}
                href="/solo/slider"
                onClick={onClose}
                ml={8}
              >
                Slider
              </Link>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            {/* TODO: Links, footer content. */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
}
