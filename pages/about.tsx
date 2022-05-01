import { GetServerSideProps, NextPage } from "next";
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
import { GetServerSidePropsResult } from "next/types";
import db from "../utils/db";

type AboutPageProps = {
  aboutData: AboutData;
};

export interface Social {
  github: string;
  linkedin: string;
  email: string;
  twitter: string;
}

export interface FbDateFormat {
  _seconds: number;
  _nanoseconds: number;
}

export interface Education {
  country: string;
  institution: string;
  credential: string;
  endDate: FbDateFormat;
  startDate: FbDateFormat;
  title: string;
  delivery: string;
}

export interface Certification {
  issuedAt: FbDateFormat;
  issuingOrganization: string;
  title: string;
}

export interface AboutData {
  id: string;
  social: Social;
  education: Education[];
  summary: string;
  certifications: Certification[];
  currentLocation: string;
  citizenship: string;
  resumeUrl: string;
  fullName: string;
  dateOfBirth: FbDateFormat;
}

const About: NextPage<AboutPageProps> = ({ aboutData }: AboutPageProps) => {
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
        Cristian&apos;s Software Engineer career development
      </Heading>
      <Box height={"20px"}></Box>
      <Text fontSize="2xl" color={"gray.300"}>
        {aboutData.summary}{" "}
      </Text>
      <Box height={"20px"}></Box>
      <Heading fontSize="xl">{"Education"}</Heading>
      <Box height={"20px"}></Box>
      {(aboutData.education || []).map(
        (education: Education, index: number) => (
          <Box ml="5" key={index}>
            <Heading fontSize="xl">{education.institution}</Heading>
            <Text mt={1}>
              {education.title} · {education.delivery}
            </Text>
            <Text fontSize="sm">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
              }).format(education.startDate._seconds)}{" "}
              -{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
              }).format(education.endDate._seconds)}
            </Text>
            <Text mt={1}>{education.country}</Text>
          </Box>
        )
      )}
      <Box height={"20px"}></Box>
      <Heading fontSize="xl">{"Courses and Certifications"}</Heading>
      <Box height={"20px"}></Box>
      {(aboutData.certifications || []).map(
        (certification: Certification, index: number) => (
          <Box ml="5" key={index}>
            <Heading fontSize="xl">{certification.title}</Heading>
            <Text mt={1}>{certification.title}</Text>
            <Text fontSize="sm">
              {" "}
              Issued at{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
              }).format(certification.issuedAt._seconds)}
            </Text>
          </Box>
        )
      )}
      <Box height={"20px"}></Box>
      <GetResumeBtn resumeUrl={aboutData.resumeUrl} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<AboutPageProps>
> => {
  const aboutPageProps = await db.collection("about").get();
  const [aboutData] = aboutPageProps.docs.map((doc) => doc.data());

  return {
    props: {
      aboutData: JSON.parse(JSON.stringify(aboutData)),
    },
  };
};

export default About;
