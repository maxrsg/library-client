import React, { useContext } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Text,
} from "@chakra-ui/react";
import { Field, FieldInputProps, Form, Formik, FormikProps } from "formik";
import { ILibraryItem } from "../../utils/interfaces/items";
import { borrowItem } from "../../utils/api/items";
import { UpdateItemsContext } from "../../utils/contexts/updateItems";

interface IFormValues {
  Borrower?: string;
  BorrowDate?: Date;
}

interface IBorrowForm {
  id: number;
  closeParent: (close: boolean) => void;
}
const BorrowForm = (props: IBorrowForm) => {
  const { updateItems } = useContext(UpdateItemsContext);
  let initialValues: IFormValues = {
    Borrower: undefined,
  };

  const validateRequired = (value: string) => {
    let error;
    if (value == undefined) {
      error = "This field is required";
    }
    return error;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values: any, actions) => {
        console.log(values);
        const response = await borrowItem({
          Id: props.id,
          Borrower: values.Borrower,
        });
        props.closeParent(true);
        updateItems();
      }}
    >
      {(props) => (
        <Form>
          <Field name="Borrower" validate={validateRequired}>
            {({
              field,
              form,
            }: {
              field: FieldInputProps<string>;
              form: FormikProps<ILibraryItem>;
            }) => (
              <FormControl
                isInvalid={
                  form.errors.Borrower != undefined && form.touched.Borrower
                }
                mb="1em"
              >
                <FormLabel htmlFor="Borrower">Borrower</FormLabel>
                <Input {...field} id="Borrower" placeholder="Borrower" />
                <FormErrorMessage>{form.errors.Borrower}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Text>Current date: {new Date().toLocaleDateString()}</Text>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Check out item
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default BorrowForm;
