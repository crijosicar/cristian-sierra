import { NextPage } from "next";
import Head from "next/head";
import { Box, Button, Center, Container, Heading, useBreakpointValue } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const Custom404: NextPage = () => {
  const variant = useBreakpointValue({ base: "solid", md: "outline" });

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
      <Box p='5'>
        <Box>
          <Heading size="2xl">Ops! There is not anything here.</Heading>{" "}
        </Box>
        <Center>
          <Button
            leftIcon={<ArrowBackIcon />}
            as="a"
            href={'/'}
            colorScheme="teal"
            size="md"
            border="2px"
            variant={variant}
          >
            Go to Main
          </Button>
        </Center>
      </Box>
    </Container>
  );
};

export default Custom404;
