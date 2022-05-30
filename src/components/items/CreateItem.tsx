import React, { useContext } from "react";
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
import { UpdateItemsContext } from "../../utils/contexts/updateItems";
interface ICreateItemProps {
  isEditing: boolean;
  item?: ILibraryItem;
}

const CreateItem = (props: ICreateItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateItems } = useContext(UpdateItemsContext);
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
        <Button onClick={onOpen} fontSize="lg" colorScheme="teal">
          Create item
        </Button>
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
              <CreateForm item={props.item} closeParent={onClose} />
            ) : (
              <CreateForm closeParent={onClose} />
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                onClose();
                updateItems();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateItem;
