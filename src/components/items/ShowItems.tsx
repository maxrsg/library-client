import React, { useEffect, useState } from "react";
import {
  Flex,
  Icon,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { deleteItem, getAllItems } from "../../utils/api/items";
import { ILibraryItem } from "../../utils/interfaces/items";
import { MdDelete } from "react-icons/md";
import CreateItem from "./CreateItem";

const ShowItems = () => {
  const [itemData, setItemData] = useState<ILibraryItem[]>();

  const getItems = async () => {
    const data = await getAllItems();
    setItemData(data);
    console.log(data);
  };
  useEffect(() => {
    getItems();
  }, []);

  const callDeleteItem = async (id: number | undefined) => {
    if (id) {
      const response = await deleteItem(id);
      await getItems();
      console.log(response);
    }
  };

  if (!itemData) {
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
    <Flex w="100%" h="100%" justifyContent="center" bgColor="transparent">
      <TableContainer mt="2em">
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Type</Th>
              <Th>Borrower</Th>
              <Th>Borrow date</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {itemData.map((item: ILibraryItem, i) => {
              return (
                <Tr key={i}>
                  <Td>{item.Title}</Td>
                  <Td>{item.CategoryName}</Td>
                  <Td>{item.Type}</Td>
                  <Td>{item.Borrower}</Td>
                  <Td>{new Date(item.BorrowDate).toLocaleDateString()}</Td>
                  <Td>
                    <CreateItem isEditing={true} item={item} />
                  </Td>
                  <Td>
                    <Icon
                      as={MdDelete}
                      w="1.5em"
                      h="1.5em"
                      color="red.600"
                      cursor="pointer"
                      onClick={() => callDeleteItem(item.Id)}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default ShowItems;
