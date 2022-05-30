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
} from "@chakra-ui/react";
import { ICategory } from "../../utils/interfaces/category";
import { deleteCategory, getAllCategories } from "../../utils/api/category";
import { MdDelete } from "react-icons/md";
import CreateForm from "./CreateForm";
import { AiFillEdit } from "react-icons/ai";
import CategoryForm from "./CategoryForm";

const ShowCategory = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<ICategory>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categories, setCategories] = useState<ICategory[]>();

  useEffect(() => {
    const getCategories = async () => {
      const data = await getAllCategories();
      setCategories(data);
      console.log(data);
    };

    if (!isEditing) {
      getCategories();
    }
  }, [isEditing]);

  const callDeleteCategory = async (id: number | undefined) => {
    if (id) {
      const response = await deleteCategory(id);
      console.log(response);
    }
  };

  const handleEditing = async (category: ICategory) => {
    setIsEditing(true);
    setCategoryToEdit(category);
  };

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
      <Button onClick={onOpen} fontSize="lg" colorScheme="teal" ml="1em">
        Show categories
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Categories</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
                  {isEditing ? (
                    <Box>
                      <CategoryForm
                        category={categoryToEdit}
                        setIsEditing={setIsEditing}
                      />
                      <Button onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </Box>
                  ) : (
                    <>
                      {categories.map((category: ICategory, i) => {
                        return (
                          <Tr key={i}>
                            <Td>{category.CategoryName}</Td>
                            <Td>
                              <Icon
                                as={AiFillEdit}
                                w="1.5em"
                                h="1.5em"
                                color="gray.900"
                                cursor="pointer"
                                onClick={() => handleEditing(category)}
                                _hover={{
                                  color: "teal.500",
                                  cursor: "pointer",
                                }}
                              />
                            </Td>
                            <Td>
                              <Icon
                                as={MdDelete}
                                w="1.5em"
                                h="1.5em"
                                color="red.600"
                                cursor="pointer"
                                onClick={() => callDeleteCategory(category.Id)}
                              />
                            </Td>
                          </Tr>
                        );
                      })}
                    </>
                  )}
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
