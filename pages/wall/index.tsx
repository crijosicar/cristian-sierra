import Head from "next/head";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Flex,
  Heading,
  Link,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { NextPage } from "next";

const Index: NextPage = () => {
  const router = useRouter();

  return (
    <Container maxW="container.md">
      <Head>
        <title>Wall - Cristian Sierra</title>
      </Head>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => router.push("/")}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink color="teal.500">Wall</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box height={"50px"}></Box>
      <Heading size="2xl" color="teal.500">
        Wall
      </Heading>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <Flex>
          <Box>
            <Link fontSize="xl" as="a" href={`/wall/Cafeto Software`}>
              {"Senior Software Engineer"}
            </Link>
            <Text mt={1}>{"Cafeto Software · Full-time"}</Text>
            <Text fontSize="sm">Sep 2021 - Present · 8 mos</Text>
            <Text fontSize="sm">United States</Text>
            <Box height={"20px"}></Box>
          </Box>
        </Flex>
      </VStack>
    </Container>
  );
};

export default Index;
