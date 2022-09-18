import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { isEmpty, set } from "lodash";
import axios from "axios";
import { FormikHelpers } from "formik/dist/types";

interface ContactFormFields {
  email: string;
  message: string;
}

const ContactForm = () => {
  const initialValues: ContactFormFields = { email: "", message: "" };
  const onValidate = (contactFormFields: ContactFormFields) => {
    const errors = {};

    if (isEmpty(contactFormFields.email)) {
      set(errors, "email", "Required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(contactFormFields.email)
    ) {
      set(errors, "email", "Invalid email address");
    }

    if (isEmpty(contactFormFields.message)) {
      set(errors, "message", "Required");
    }

    return errors;
  };

  const onSubmit = async (
    contactFormFields: ContactFormFields,
    { setSubmitting, resetForm }: FormikHelpers<ContactFormFields>
  ) => {
    await axios.post(`${process.env.apiURL}/api/contact`, contactFormFields);
    
    setSubmitting(false);
    resetForm();
  };

  return (
    <Box p={5}>
      <Formik
        validate={onValidate}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="email">
              {({ field, form }: Record<string, any>) => (
                <FormControl
                  isRequired
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    {...field}
                    id="email"
                    type={"email"}
                    placeholder="email"
                  />
                  <FormHelperText>
                    We&apos;ll never share your email.
                  </FormHelperText>
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Box h={3}></Box>
            <Field name="message">
              {({ field, form }: Record<string, any>) => (
                <FormControl
                  isRequired
                  isInvalid={form.errors.message && form.touched.message}
                >
                  <FormLabel htmlFor="message">Message</FormLabel>
                  <Textarea
                    {...field}
                    id="message"
                    placeholder="Type your message here..."
                  />
                  <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ContactForm;
