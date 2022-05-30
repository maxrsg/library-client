import React, { useContext } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
} from "@chakra-ui/react";
import BorrowForm from "./BorrowForm";
import { borrowItem } from "../../utils/api/items";
import { UpdateItemsContext } from "../../utils/contexts/updateItems";

interface IBorrow {
  id?: number;
  borrower?: string;
  borrowDate?: Date;
  title?: string;
}

const Borrow = (props: IBorrow) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(props.borrower);
  const isBorrowed = props.borrower !== null;
  const { updateItems } = useContext(UpdateItemsContext);

  const checkInItem = async () => {
    const response = await borrowItem({ Id: props.id, Borrower: null });
    onClose();
    updateItems();
  };
  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        {isBorrowed ? "Check in " : "Check out "}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isBorrowed ? "Check in item: " : "Check out item: "}
            {props.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {isBorrowed ? (
              <Box>
                <Text>Borrwed by: {props.borrower}</Text>
                <Text mt="1em">
                  Borrow date:
                  {" " + new Date(props.borrowDate || 0).toLocaleDateString()}
                </Text>
                <Button mt="1em" colorScheme="teal" onClick={checkInItem}>
                  Check in item
                </Button>
              </Box>
            ) : (
              <BorrowForm id={props.id || 1} closeParent={onClose} />
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

export default Borrow;
