import { NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import GetResumeBtn from "./components/resume";

const About: NextPage = () => {
  const router = useRouter();

  return (
    <Container maxW="container.md">
      <Head>
        <title>Career - Cristian Sierra</title>
      </Head>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={() => router.push("/")}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="teal.500">Career</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box height={"50px"}></Box>
      <Heading size="2xl" color="teal.500">
        Cristian&amp;apos;s Software Engineer career development
      </Heading>
      <Box height={"20px"}></Box>
      <Text fontSize="2xl" color={"gray.300"}>
        Experienced software engineer and web developer with more than 7 years
        of experience working in big projects for Colombian and multinational
        companies. He has expertise in technologies such as NodeJS, Typescript,
        MongoDB, PHP and Java.{" "}
      </Text>
      <Box height={"20px"}></Box>
      <Heading fontSize="xl">{"Education"}</Heading>
      <Box height={"20px"}></Box>
      <Box ml="5">
        <Heading fontSize="xl">{"Senior Software Engineer"}</Heading>
        <Text mt={1}>{"Cafeto Software · Full-time"}</Text>
        <Text fontSize="sm">Sep 2021 - Present · 8 mos</Text>
        <Text fontSize="sm">United States</Text>
        <Box height={"20px"}></Box>
      </Box>
      <Heading fontSize="xl">{"Courses"}</Heading>
      <Box height={"20px"}></Box>
      <Box ml="5">
        <Heading fontSize="xl">{"Senior Software Engineer"}</Heading>
        <Text mt={1}>{"Cafeto Software · Full-time"}</Text>
        <Text fontSize="sm">Sep 2021 - Present · 8 mos</Text>
        <Text fontSize="sm">United States</Text>
        <Box height={"20px"}></Box>
      </Box>
      <Box height={"20px"}></Box>
      <GetResumeBtn />
    </Container>
  );
};

export default About;
