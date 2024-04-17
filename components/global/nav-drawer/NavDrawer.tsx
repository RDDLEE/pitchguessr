"use client";

import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader,
  DrawerBody, DrawerFooter, useDisclosure, IconButton, Link,
  VStack,
  Divider,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export default function NavDrawer(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <React.Fragment>
      <IconButton
        variant="ghost"
        colorScheme="teal"
        aria-label="open menu"
        icon={<HamburgerIcon />}
        ref={btnRef}
        onClick={onOpen}
      />
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
              Pitchguessr
            </Link>
          </DrawerHeader>
          <DrawerBody>
            <VStack align="flex-start">
              <Link as={NextLink} href="/home" onClick={onClose}>
                Solo
              </Link>
              <Divider />
              <Link
                as={NextLink}
                href="/home"
                onClick={onClose}
                ml={8}
              >
                Directional
              </Link>
              <Link
                as={NextLink}
                href="/home"
                onClick={onClose}
                ml={8}
              >
                Multi-Choice
              </Link>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
}
