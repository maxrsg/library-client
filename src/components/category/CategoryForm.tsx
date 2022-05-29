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
import { createCategory, editCategory } from "../../utils/api/category";

interface ICreateForm {
  category?: ICategory;
  setIsEditing?: (set: boolean) => void;
}

const CategoryForm = (props: ICreateForm) => {
  const isEditing = props.category != undefined;

  const validateRequired = (value: string) => {
    let error;
    if (value == undefined) {
      error = "This field is required";
    }
    return error;
  };

  return (
    <Formik
      initialValues={{ CategoryName: props.category?.CategoryName }}
      onSubmit={async (values: any) => {
        if (isEditing) {
          const response = await editCategory(
            props.category?.Id,
            values.CategoryName
          );
          if (props.setIsEditing) {
            props.setIsEditing(false);
          }
        } else {
          const response = await createCategory(values.CategoryName);
        }
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
                <FormLabel htmlFor="CategoryName">Category name</FormLabel>
                <Input {...field} id="CategoryName" placeholder="..." />
                <FormErrorMessage>{form.errors.CategoryName}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            {isEditing ? "Save changes" : "Create"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;
function editCateory(Id: number | undefined, CategoryName: any) {
  throw new Error("Function not implemented.");
}
