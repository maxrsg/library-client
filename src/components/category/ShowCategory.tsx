import React, { useEffect, useState } from "react";
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
  Th,
  Thead,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Spinner,
  Flex,
  Collapse,
} from "@chakra-ui/react";
import { ICategory } from "../../utils/interfaces/category";
import { getAllCategories } from "../../utils/api/category";
import { MdDelete } from "react-icons/md";
import CreateForm from "./CreateForm";

const ShowCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categories, setCategories] = useState<ICategory[]>();

  useEffect(() => {
    const getCategories = async () => {
      const data = await getAllCategories();
      setCategories(data);
      console.log(data);
    };
    getCategories();
  }, []);

  if (!categories) {
    return (
      <Flex
        w="100%"
        h="100%"
        justifyContent="center"
        alignItems="center"
        bgColor="transparent"
      >
        <Spinner color="blue.500" />
      </Flex>
    );
  }

  return (
    <>
      <Box
        onClick={onOpen}
        fontSize="xl"
        maxH="2em"
        display="inline-block"
        p="0.5em"
        textDecoration="underline"
        _hover={{ color: "teal.400", cursor: "pointer" }}
      >
        Categories
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Categories</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* <CreateForm/> */}
            {}
            <CreateForm />
            <TableContainer mt="2em">
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {categories.map((item: ICategory, i) => {
                    return (
                      <Tr key={i}>
                        <Td>{item.CategoryName}</Td>
                        <Td>
                          {/* <CreateItem isEditing={true} item={item} /> */}
                        </Td>
                        <Td>
                          <Icon
                            as={MdDelete}
                            w="1.5em"
                            h="1.5em"
                            color="red.600"
                            cursor="pointer"
                            // onClick={() => callDeleteItem(item.Id)}
                          />
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShowCategory;
