import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Social from "./social";

interface ContactFormFields {
  email: string;
  message: string;
}

const ContactForm = () => {
  const initialValues: ContactFormFields = { email: "", message: "" };
  const onValidate = (contactFormFields: ContactFormFields) => {
    const errors = {};

    if (!contactFormFields.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(contactFormFields.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!contactFormFields.message) {
      errors.message = "Required";
    }

    return errors;
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Center>
        {" "}
        <Heading fontSize="xl">Ping me in</Heading>
      </Center>
      <Box height={"20px"}></Box>
      <Social />
      <Box height={"20px"}></Box>
      <Center>Or</Center>
      <Box height={"20px"}></Box>
      <Formik
        validate={onValidate}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="name">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    {...field}
                    id="name"
                    type={"email"}
                    placeholder="email"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="message">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.message && form.touched.message}
                >
                  <FormLabel htmlFor="email">Message</FormLabel>
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
