import React from "react";
import {
  Box,
  Button,
  Collapse,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, FieldInputProps, Form, Formik, FormikProps } from "formik";
import { ICategory } from "../../utils/interfaces/category";
import { createCategory } from "../../utils/api/category";

const CreateForm = () => {
  const { isOpen, onToggle } = useDisclosure();

  const validateRequired = (value: string) => {
    let error;
    if (value == undefined) {
      error = "This field is required";
    }
    return error;
  };

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
          <Formik
            initialValues={{ CategoryName: undefined }}
            onSubmit={async (values: any) => {
              const response = await createCategory(values.CategoryName);
            }}
          >
            {(props) => (
              <Form>
                <Field name="CategoryName" validate={validateRequired}>
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<ICategory>;
                  }) => (
                    <FormControl
                      isInvalid={
                        form.errors.CategoryName != undefined &&
                        form.touched.CategoryName
                      }
                      mb="1em"
                    >
                      <FormLabel htmlFor="CategoryName">
                        Category name
                      </FormLabel>
                      <Input {...field} id="CategoryName" placeholder="..." />
                      <FormErrorMessage>
                        {form.errors.CategoryName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Flex>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Create
                  </Button>
                  <Spacer />
                  <Button mt={4} onClick={onToggle}>
                    Cancel
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Collapse>
    </>
  );
};

export default CreateForm;
