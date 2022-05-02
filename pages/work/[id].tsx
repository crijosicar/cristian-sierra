import { useRouter } from "next/router";
import { GetStaticPropsResult, NextPage } from "next";
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
import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
} from "next/types";
import db from "../../utils/db";
import { firestore } from "firebase-admin";
import { calculateElapsedTime, formatDate } from "../../utils/date";
import { Timestamp } from "@google-cloud/firestore";
import DocumentData = firestore.DocumentData;

type WorkPageProps = {
  work: Work;
};

export interface Project {
  startDate: Date;
  technologies: string[];
  endDate: Date;
  commitments: string[];
  projectName: string;
}

export interface Client {
  startDate: Date;
  clientName: string;
  endDate: Date;
  projects: Project[];
}

export interface Work {
  id: string;
  slug: string;
  clients: Client[];
  summary: string;
  contractType: string;
  companyIcon: string;
  startDate: Date;
  endDate: Date;
  position: string;
  commitments: string[];
  companyName: string;
  location: string;
}

const WorkPage: NextPage<WorkPageProps> = ({ work }: WorkPageProps) => {
  const router = useRouter();

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
          <BreadcrumbLink color="teal.500">{work.companyName}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box height={"50px"}></Box>
      <Heading size="2xl" color="teal.500">
        {work.companyName}
      </Heading>
      <Box height={"20px"}></Box>
      <Box ml="5">
        <Heading fontSize="xl">{work.position}</Heading>
        <Text mt={1}>{`${work.companyName} · Full-time`}</Text>
        <Text fontSize="sm">
          {formatDate(work.startDate)} -{" "}
          {work.endDate ? formatDate(work.endDate) : " Present"} ·{" "}
          {`${calculateElapsedTime(work)} Months`}
        </Text>
        <Text fontSize="sm">United States</Text>
        <Box height={"20px"}></Box>
        <Heading fontSize="xl">{"Commitments"}</Heading>
        <Box height={"20px"}></Box>
        <List spacing={3}>
          {(work.commitments || []).map((commitment: string, index: number) => (
            <ListItem key={index}>
              <ListIcon as={MdCheckCircle} color="green.500" />
              {commitment}
            </ListItem>
          ))}
        </List>
        <Box height={"20px"}></Box>
        <Heading fontSize="xl">{"Projects"}</Heading>
        <HStack spacing={4}>
          {(work.clients || []).map((client: Client, index: number) => (
            <Box key={index}>
              {(client.projects || []).map(
                (project: Project, pindex: number) => (
                  <Box key={pindex}>
                    <Text mt={1} as="em">
                      {client.clientName} {project.projectName}
                    </Text>
                    <Text fontSize="sm">United States</Text>
                    <Tag
                      key={pindex}
                      size={"md"}
                      variant="solid"
                      colorScheme="teal"
                    ></Tag>
                  </Box>
                )
              )}
            </Box>
          ))}
        </HStack>
      </Box>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths =
  async (): Promise<GetStaticPathsResult> => {
    const workPageProps = await db.collection("work").get();
    const workData = workPageProps.docs.map((doc) => doc.data());

    const paths = workData.map((work: DocumentData) => ({
      params: { id: work.slug },
    }));

    return { paths, fallback: false };
  };

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<{ work: Work }>> => {
  const formatFieldsDate = (documentData: DocumentData) => {
    const data = documentData;
    Object.keys(documentData).forEach((key) => {
      if (data[key] instanceof Timestamp) {
        data[key] = data[key].toDate();
      } else if (typeof data[key] === "object") {
        formatFieldsDate(documentData[key]);
      }
    });
    return data;
  };
  const workPageProps = await db
    .collection("work")
    .where("slug", "==", params!.id)
    .get();

  const [workData] = workPageProps.docs.map((doc) => {
    return formatFieldsDate(doc.data());
  });

  return { props: { work: JSON.parse(JSON.stringify(workData)) } };
};

export default WorkPage;
