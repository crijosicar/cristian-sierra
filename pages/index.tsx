import type { NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Container,
  Heading,
  Link,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Feature from "./components/feature";
import { useRouter } from "next/router";
import Social from "./components/social";
import GetResumeBtn from "./components/resume";
import ContactForm from "./components/contactForm";

const Home: NextPage = () => {
  const router = useRouter();
  const direction = useBreakpointValue({ base: "column", md: "row" });

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
          Cristian Sierra.
        </Link>
      </Heading>
      <Box height={"20px"}></Box>
      <Text fontSize="2xl" color={"gray.300"}>
        Experienced software engineer and web developer with more than 7 years
        of experience working in big projects for Colombian and multinational
        companies. He has expertise in technologies such as NodeJS, Typescript,
        MongoDB, PHP and Java.{" "}
      </Text>
      <Box height={"50px"}></Box>
      <Heading size="2xl">
        <Link color="teal.500" onClick={() => router.push("work")}>
          Work
        </Link>
      </Heading>
      <Box height={"20px"}></Box>
      <Stack direction={direction}>
        <Feature
          title="Cafeto Software"
          desc="You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings on your own terms with our completely automated process"
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
      <GetResumeBtn />
      <Box height={"50px"}></Box>
      <Heading size="2xl">
        <Link color="teal.500" onClick={() => router.push("/contact")}>
          Get in Touch
        </Link>
      </Heading>
      <Box height={"20px"}></Box>
      <Social includeLabels={true} />
      <ContactForm />
    </Container>
  );
};

export default Home;
