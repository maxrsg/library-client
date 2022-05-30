import React, { useEffect, useState } from "react";
import {
  Flex,
  Icon,
  Spinner,
  Table,
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
import Borrow from "./Borrow";

const ShowItems = () => {
  const [itemData, setItemData] = useState<ILibraryItem[]>();
  const storageOrderBy: boolean = JSON.parse(
    localStorage.getItem("orderByType") || "false"
  );
  const [orderByType, setOrderByType] = useState(storageOrderBy);

  const getItems = async () => {
    const data = await getAllItems(orderByType);
    setItemData(data);
    console.log(data);
  };

  useEffect(() => {
    getItems();
  }, [orderByType]);

  const callDeleteItem = async (id: number | undefined) => {
    if (id) {
      const response = await deleteItem(id);
      await getItems();
      console.log(response);
    }
  };

  const displayTitleWithAcronym = (title: string) => {
    const acronym = title.match(/\b(\w)/g);
    return title + " (" + acronym?.join("").toUpperCase() + ")";
  };

  const updateOrderBy = (type: boolean) => {
    localStorage.setItem("orderByType", type.toString());
    setOrderByType(type);
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
              <Th
                textDecoration="underline"
                cursor="pointer"
                onClick={() => updateOrderBy(false)}
              >
                Category
              </Th>
              <Th
                textDecoration="underline"
                cursor="pointer"
                onClick={() => updateOrderBy(true)}
              >
                Type
              </Th>
              <Th>Borrower</Th>
              <Th>Borrow date</Th>
              <Th>Check out/in</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {itemData.map((item: ILibraryItem, i) => {
              return (
                <Tr key={i}>
                  <Td> {displayTitleWithAcronym(item.Title)}</Td>
                  <Td>{item.CategoryName}</Td>
                  <Td>{item.Type}</Td>
                  <Td>{item.Borrower}</Td>
                  <Td>
                    {item.BorrowDate
                      ? new Date(item.BorrowDate).toLocaleDateString()
                      : null}
                  </Td>
                  <Td>
                    {item.IsBorrowable ? (
                      <Borrow
                        id={item.Id}
                        borrower={item.Borrower}
                        title={item.Title}
                        borrowDate={item.BorrowDate}
                      />
                    ) : null}
                  </Td>
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
