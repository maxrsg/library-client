import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  Icon,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiFillEdit } from "react-icons/ai";
import { ILibraryItem } from "../../utils/interfaces/items";
import CreateForm from "./CreateForm";

interface ICreateItemProps {
  isEditing: boolean;
  item?: ILibraryItem;
}

const CreateItem = (props: ICreateItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {props.isEditing ? (
        <Icon
          as={AiFillEdit}
          w="1.5em"
          h="1.5em"
          color="gray.900"
          cursor="pointer"
          onClick={onOpen}
          _hover={{ color: "teal.500", cursor: "pointer" }}
        />
      ) : (
        <Box
          onClick={onOpen}
          fontSize="xl"
          maxH="2em"
          display="inline-block"
          p="0.5em"
          textDecoration="underline"
          _hover={{ color: "teal.400", cursor: "pointer" }}
        >
          Create item
        </Box>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {props.isEditing ? "Edit item" : "Create a new item"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {props.isEditing ? (
              <CreateForm item={props.item} />
            ) : (
              <CreateForm />
            )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateItem;
