import type { NextPage } from "next";
import Head from "next/head";
import { Box, Container, Heading, Link, Stack, Text } from "@chakra-ui/react";
import Feature from "./components/feature";
import ContactForm from "./components/contactForm";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Container maxW="container.md">
      <Head>
        <title>Cristian Sierra</title>
        <meta
          name="description"
          content="Cristian Sierra - Software Engineer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading size="4xl">
        Hi, I am{" "}
        <Link color="teal.500" onClick={() => router.push("/about")}>
          Cristian Sierra
        </Link>
      </Heading>
      <Box height={"20px"}></Box>
      <Text fontSize="2xl" color={"gray.300"}>
        Experienced software engineering specialist and developer with more than
        6+ years working as a software developer for Colombian and multinational
        companies.{" "}
      </Text>
      <Box height={"20px"}></Box>
      <Heading size="2xl">
        <Link color="teal.500" onClick={() => router.push("work")}>
          Work
        </Link>
      </Heading>
      <Box height={"10px"}></Box>
      <Stack spacing={8} direction="row">
        <Feature
          title="Cafeto Software"
          desc="The future can be even brighter but a goal without a plan is just a wish"
        />
        <Feature
          title="Globant"
          desc="You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings on your own terms with our completely automated process"
        />
        <Feature
          title="DXC Technology"
          desc="You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings on your own terms with our completely automated process"
        />
      </Stack>
      <Box height={"20px"}></Box>
      <Heading size="2xl">
        <Link color="teal.500" onClick={() => router.push("/contact")}>
          Get in Touch
        </Link>
      </Heading>
      <Box height={"10px"}></Box>
      <ContactForm />
    </Container>
  );
};

export default Home;
