import { useRouter } from "next/router";
import { NextPage } from "next";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  Tag,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { MdCheckCircle } from "react-icons/md";
import { useEffect, useState } from "react";

const Work: NextPage = () => {
  const router = useRouter();
  const [pageId, setPageId] = useState("");

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (!id) return null;
      setPageId(id.toString());
    }
  }, [pageId, router.isReady, router.query]);

  const companyNameCapitalized =
    pageId.charAt(0).toUpperCase() + pageId.slice(1);

  return (
    <Container maxW="container.md">
      <Head>
        <title>Work - Cristian Sierra</title>
      </Head>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => router.push("/")}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => router.push("/work")}>
            Work
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink color="teal.500">
            {companyNameCapitalized}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box height={"50px"}></Box>
      <Heading size="2xl" color="teal.500">
        {companyNameCapitalized}
      </Heading>
      <Box height={"20px"}></Box>
      <Box>
        <Box ml="5">
          <Heading fontSize="xl">{"Senior Software Engineer"}</Heading>
          <Text mt={1}>{"Cafeto Software · Full-time"}</Text>
          <Text fontSize="sm">Sep 2021 - Present · 8 mos</Text>
          <Text fontSize="sm">United States</Text>
          <Box height={"20px"}></Box>
          <Heading fontSize="xl">{"Commitments"}</Heading>
          <Box height={"20px"}></Box>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Assumenda, quia temporibus eveniet a libero incidunt suscipit
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
            </ListItem>
            {/* You can also use custom icons from react-icons */}
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
            </ListItem>
          </List>
          <Box height={"20px"}></Box>
          <Heading fontSize="xl">{"Technologies"}</Heading>
          <Box height={"20px"}></Box>
          <HStack spacing={4}>
            <Tag size={"md"} variant="solid" colorScheme="teal">
              TypeScript
            </Tag>
          </HStack>
        </Box>
      </Box>
    </Container>
  );
};

export default Work;
