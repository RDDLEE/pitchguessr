import React from "react";
import { ActionIcon, Flex, Modal } from "@mantine/core";
import { FaCogs } from "react-icons/fa";
import { UseDisclosureReturn } from "../../../hooks/solo/useSoloSettingsModal";

export interface SoloSettingsModal_Props extends UseDisclosureReturn {
  modalBody: JSX.Element;
  modalButtons: JSX.Element;
}

export default function SoloSettingsModal(props: SoloSettingsModal_Props): JSX.Element | null {
  return (
    <React.Fragment>
      <Flex
        justify="flex-end"
        align="flex-end"
        direction="row"
        wrap="wrap"
        w="100%"
      >
        <ActionIcon
          variant="subtle"
          size="md"
          aria-label="Settings Button"
          radius="xl"
          onClick={props.disclosureHandlers.open}
        >
          <FaCogs />
        </ActionIcon>
      </Flex>
      <Modal
        closeOnClickOutside={false}
        opened={props.isOpened}
        onClose={props.disclosureHandlers.close}
        size="xs"
        title="Settings"
        zIndex={1000}
      >
        {props.modalBody}
        <Flex
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          {props.modalButtons}
        </Flex>
      </Modal>
    </React.Fragment>
  );
}
