import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { Field, FieldInputProps, Form, Formik, FormikProps } from "formik";
import { ILibraryItem } from "../../utils/interfaces/items";
import { createItem } from "../../utils/api/items";

interface IFormValues {
  CategoryId?: number;
  Title?: string;
  Author?: string;
  Pages?: number;
  RunTimeMinutes?: number;
  Type?: string;
  IsBorrowable?: boolean;
}

interface ICreateFormProps {
  item?: ILibraryItem;
}

const CreateForm = (props: ICreateFormProps) => {
  const [type, setType] = useState("Book");
  const isEditing = props.item != undefined;

  let initialValues: IFormValues = {
    CategoryId: undefined,
    Title: undefined,
    Author: undefined,
    Pages: undefined,
    RunTimeMinutes: undefined,
    IsBorrowable: true,
    Type: "Book",
  };

  const validateRequired = (value: string) => {
    let error;
    if (value == undefined) {
      error = "This field is required";
    }
    return error;
  };

  const changeType = (value: string) => {
    let error = validateRequired(value);
    if (value) {
      setType(value);
    }
    return error;
  };

  if (props.item) {
    initialValues = {
      CategoryId: props.item.CategoryId,
      Title: props.item.Title,
      Author: props.item.Author,
      Pages: props.item.Pages,
      RunTimeMinutes: props.item.RunTimeMinutes,
      IsBorrowable: props.item.IsBorrowable,
      Type: props.item.Type,
    };
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values: any, actions) => {
        console.log(values);
        const response = await createItem(values);
        console.log(response);
      }}
    >
      {(props) => (
        <Form>
          <Field name="Type" validate={changeType}>
            {({
              field,
              form,
            }: {
              field: FieldInputProps<string>;
              form: FormikProps<ILibraryItem>;
            }) => (
              <FormControl mb="1em" isInvalid={form.errors.Type != undefined}>
                <FormLabel>Type</FormLabel>
                <Select {...field} id="Type" placeholder="Select Type">
                  <option>Book</option>
                  <option>DVD</option>
                  <option>Audio Book</option>
                  <option>Reference Book</option>
                </Select>
                <FormErrorMessage>{form.errors.Type}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="Title" validate={validateRequired}>
            {({
              field,
              form,
            }: {
              field: FieldInputProps<string>;
              form: FormikProps<ILibraryItem>;
            }) => (
              <FormControl
                isInvalid={form.errors.Title != undefined && form.touched.Title}
                mb="1em"
              >
                <FormLabel htmlFor="Title">Title</FormLabel>
                <Input {...field} id="Title" placeholder="Title" />
                <FormErrorMessage>{form.errors.Title}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="Author" validate={validateRequired}>
            {({
              field,
              form,
            }: {
              field: FieldInputProps<string>;
              form: FormikProps<ILibraryItem>;
            }) => (
              <FormControl
                isInvalid={
                  form.errors.Author != undefined && form.touched.Author
                }
                mb="1em"
              >
                <FormLabel htmlFor="Author">Author</FormLabel>
                <Input {...field} id="Author" placeholder="Author" />
                <FormErrorMessage>{form.errors.Author}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="CategoryId" validate={validateRequired}>
            {({
              field,
              form,
            }: {
              field: FieldInputProps<string>;
              form: FormikProps<ILibraryItem>;
            }) => (
              <FormControl
                isInvalid={
                  form.errors.CategoryId != undefined && form.touched.CategoryId
                }
                mb="1em"
              >
                <FormLabel>Category</FormLabel>
                <Select
                  {...field}
                  id="CategoryId"
                  placeholder="Select category"
                >
                  <option value="1">Fantasy</option>
                  <option value="2">Horror</option>
                  <option value="3">Action</option>
                  <option value="4">Mystery</option>
                </Select>
                <FormErrorMessage>{form.errors.CategoryId}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          {type === "Book" || type === "Reference Book" ? (
            <Field name="Pages" validate={validateRequired}>
              {({
                field,
                form,
              }: {
                field: FieldInputProps<number>;
                form: FormikProps<ILibraryItem>;
              }) => (
                <FormControl
                  isInvalid={
                    form.errors.Pages != undefined && form.touched.Pages
                  }
                  mb="1em"
                >
                  <FormLabel htmlFor="Pages">Pages</FormLabel>
                  <NumberInput min={0}>
                    <NumberInputField {...field} id="Pages" placeholder="0" />
                  </NumberInput>
                  <FormErrorMessage>{form.errors.Pages}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          ) : null}
          {type === "Audio Book" || type === "DVD" ? (
            <Field name="RunTimeMinutes" validate={validateRequired}>
              {({
                field,
                form,
              }: {
                field: FieldInputProps<number>;
                form: FormikProps<ILibraryItem>;
              }) => (
                <FormControl
                  isInvalid={
                    form.errors.RunTimeMinutes != undefined &&
                    form.touched.RunTimeMinutes
                  }
                  mb="1em"
                >
                  <FormLabel htmlFor="RunTimeMinutes">
                    Run time in minutes
                  </FormLabel>
                  <NumberInput min={0}>
                    <NumberInputField
                      {...field}
                      id="RunTimeMinutes"
                      placeholder="0"
                    />
                  </NumberInput>
                  <FormErrorMessage>
                    {form.errors.RunTimeMinutes}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
          ) : null}

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            {isEditing ? "Save" : "Create"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateForm;
