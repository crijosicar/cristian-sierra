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
import GetResumeBtn from "../components/resume";
import firebase from "../utils/firebase";
import { formatDate, formatFieldsDate } from "../utils/date";
import { GetServerSidePropsResult } from "next/types";
import { MdCheckCircle } from "react-icons/md";
import { orderBy } from "lodash";
import { About } from "../entities/about";
import { Certification } from "../entities/certification";
import { Education } from "../entities/education";

type AboutPageProps = {
  aboutData: About;
};

const AboutPage: NextPage<AboutPageProps> = ({ aboutData }: AboutPageProps) => {
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
          <BreadcrumbLink color="teal.500">About</BreadcrumbLink>
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
      <Box height={"15px"}></Box>
      {aboutData.education.map((education: Education, index: number) => (
        <Box display="flex" alignItems="baseline" key={index}>
          <Box as={MdCheckCircle} color="teal"></Box>
          <Box ml="2" mb={"5"}>
            <Heading fontSize="md">{education.institution}</Heading>
            <Text mt={1}>
              {education.title} · {education.credential}
            </Text>
            <Text>
              {formatDate(education.startDate)} -{" "}
              {education.endDate ? formatDate(education.endDate) : "Ongoing"}
            </Text>
            <Text fontSize="sm">{education.country}</Text>
          </Box>
        </Box>
      ))}
      <Box height={"10px"}></Box>
      <Heading fontSize="xl">{"Courses and Certifications"}</Heading>
      <Box height={"15px"}></Box>
      {aboutData.certifications.map(
        (certification: Certification, index: number) => (
          <Box display="flex" alignItems="baseline" key={index}>
            <Box as={MdCheckCircle} color="teal"></Box>
            <Box ml="2" mb={"5"}>
              <Heading fontSize="md">{certification.title}</Heading>
              <Text mt={1}>{certification.issuingOrganization}</Text>
              <Text> Issued at {formatDate(certification.issuedAt)} </Text>
              <Text fontSize="sm">{certification.country}</Text>
            </Box>
          </Box>
        )
      )}
      <Box height={"20px"}></Box>
      <GetResumeBtn />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<AboutPageProps>
> => {
  const aboutPageProps = await firebase.db.collection("about").get();

  const [aboutData] = aboutPageProps.docs.map((doc) => {
    return formatFieldsDate(doc.data());
  });

  const sortedEducationData = orderBy(
    aboutData.education,
    ["endDate", "startDate"],
    ["desc", "desc"]
  );
  const sortedCertifications = orderBy(
    aboutData.certifications,
    ["endDate", "startDate"],
    ["desc", "desc"]
  );

  return {
    props: {
      aboutData: JSON.parse(
        JSON.stringify({
          ...aboutData,
          education: sortedEducationData,
          certifications: sortedCertifications,
        })
      ),
    },
  };
};

export default AboutPage;
