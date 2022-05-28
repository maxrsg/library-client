import { Box, Center, Flex } from "@chakra-ui/react";
import React from "react";
import ShowCategory from "./category/ShowCategory";
import CreateItem from "./items/CreateItem";

const SideMenu = () => {
  return (
    <Box
      w="100%"
      h="100%"
      boxShadow="2xl"
      fontWeight="bold"
      justifyContent="center"
      pt="2em"
    >
      <Center>
        <CreateItem isEditing={false} />
      </Center>
      <Center>
        <ShowCategory />
      </Center>
    </Box>
  );
};

export default SideMenu;
