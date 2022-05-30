import React from "react";
import { Box, Button, Collapse, useDisclosure } from "@chakra-ui/react";
import CategoryForm from "./CategoryForm";

const CreateForm = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button colorScheme="teal" onClick={onToggle}>
        Create new category
      </Button>

      <Collapse in={isOpen} animateOpacity>
        <Box
          p="40px"
          mt="4"
          bg="transparent"
          rounded="md"
          shadow="md"
          border="2px solid teal"
        >
          <CategoryForm />
          <Button mt={4} onClick={onToggle}>
            Cancel
          </Button>
        </Box>
      </Collapse>
    </>
  );
};

export default CreateForm;
