import { NextPage } from "next";
import Head from "next/head";
import { Button, Center, Container, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Custom500: NextPage = () => {
  const router = useRouter();

  return (
    <Container maxW="container.md">
      <Head>
        <title>Not found - Cristian Sierra</title>
        <meta
          name="description"
          content="Cristian Sierra - Software Engineer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
        <Heading size="2xl">Well, that is everything</Heading>{" "}
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => router.push("/")}
        >
          Go home
        </Button>
      </Center>
    </Container>
  );
};

export default Custom500;
