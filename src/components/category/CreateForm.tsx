import React from "react";
import {
  Box,
  Button,
  Collapse,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, FieldInputProps, Form, Formik, FormikProps } from "formik";
import { ICategory } from "../../utils/interfaces/category";
import { createCategory } from "../../utils/api/category";
import { AiFillEdit } from "react-icons/ai";
import CategoryForm from "./CategoryForm";

interface ICreateForm {
  category?: ICategory;
  isEditing?: boolean;
  openBox?: boolean;
}

const CreateForm = (props: ICreateForm) => {
  const { isOpen, onToggle } = useDisclosure();
  const isEditing = props.category != undefined;

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
