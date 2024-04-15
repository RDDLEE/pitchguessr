import React from "react";
import {
  IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader,
  ModalOverlay,
  ModalFooter,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";

export interface SoloSettingsModal_Props {
  modalBody: JSX.Element;
  modalButtons: JSX.Element;
  modalDisclosure: UseDisclosureReturn;
}

export default function SoloSettingsModal(props: SoloSettingsModal_Props): JSX.Element {
  return (
    <React.Fragment>
      <IconButton
        aria-label="Settings"
        icon={<SettingsIcon />}
        variant="ghost"
        onClick={props.modalDisclosure.onOpen}
      />
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
