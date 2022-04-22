import { NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Container,
  Heading,
  Tag,
  TagLabel,
  Tooltip,
} from "@chakra-ui/react";
import ContactForm from "./components/contactForm";
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";

const Contact: NextPage = () => {
  const router = useRouter();

  return (
    <Container maxW="container.md">
      <Head>
        <title>Contact - Cristian Sierra</title>
        <meta
          name="description"
          content="Cristian Sierra - Software Engineer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tooltip hasArrow label="Go back" bg="red.600">
        <Tag
          as="a"
          color="teal.400"
          href="#"
          size="lg"
          onClick={() => router.push("/")}
        >
          <ArrowBackIcon />
          <TagLabel>Back</TagLabel>
        </Tag>
      </Tooltip>
      <Box height={"10px"}></Box>
      <Heading size="2xl">Get in touch</Heading>
      <Box height={"10px"}></Box>
      <ContactForm />
    </Container>
  );
};

export default Contact;
