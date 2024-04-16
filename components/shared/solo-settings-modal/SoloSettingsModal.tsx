import React from "react";
import {
  IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader,
  ModalOverlay,
  ModalFooter,
  UseDisclosureReturn,
  Flex,
  Box,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import StyleUtils from "../../../utils/StyleUtils";

export interface SoloSettingsModal_Props {
  modalBody: JSX.Element;
  modalButtons: JSX.Element;
  modalDisclosure: UseDisclosureReturn;
}

export default function SoloSettingsModal(props: SoloSettingsModal_Props): JSX.Element | null {
  return (
    <React.Fragment>
      <Box w={StyleUtils.STANDARD_GAMEPLAY_ITEM_WIDTH}>
        <Flex>
          <IconButton
            aria-label="Settings"
            icon={<SettingsIcon />}
            variant="ghost"
            onClick={props.modalDisclosure.onOpen}
            ml="auto"
            mr={0}
          />
        </Flex>
      </Box>
      <Modal
        closeOnOverlayClick={false}
        isOpen={props.modalDisclosure.isOpen}
        onClose={props.modalDisclosure.onClose}
        size="xs"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={2}>
            {props.modalBody}
          </ModalBody>
          <ModalFooter>
            {props.modalButtons}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}
