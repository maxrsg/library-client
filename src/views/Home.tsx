import React from "react";
import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import ShowItems from "../components/items/ShowItems";
import SideMenu from "../components/SideMenu";

const Home = () => {
  return (
    <Grid
      h="100%"
      w="100%"
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem rowSpan={1} colSpan={12} bg="gray.900">
        <Flex w="20%" p="1em">
          <Text fontSize="4xl" color="#fff">
            Library
          </Text>
        </Flex>
      </GridItem>
      <GridItem colSpan={2} rowSpan={12}>
        <SideMenu />
      </GridItem>
      <GridItem rowStart={2} rowEnd={13} colStart={3} colEnd={13}>
        <Flex w="80%" h="80%" justifyContent="center" alignItems="center">
          <ShowItems />
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Home;
