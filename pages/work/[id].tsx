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
  StackDivider,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { MdCheckCircle } from "react-icons/md";
import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
} from "next/types";
import firebase from "../../utils/firebase";
import { firestore } from "firebase-admin";
import { calculateElapsedTime, formatDate } from "../../utils/date";
import { Timestamp } from "@google-cloud/firestore";
import { Work } from "../../entities/work";
import { Client } from "../../entities/client";
import { Project } from "../../entities/project";
import { isEmpty, orderBy } from "lodash";
import DocumentData = firestore.DocumentData;

type WorkPageProps = {
  work: Work;
};

const sortClientsWorkDataByDate = (clients: Client[]): Client[] => {
  return orderBy(clients, ["endDate", "startDate"], ["desc", "desc"]).map(
    (sortedClientData: Client) => (
      {
        ...sortedClientData,
        projects: orderBy(
          sortedClientData.projects,
          ["endDate", "startDate"],
          ["desc", "desc"]
        )
      }
    )
  );
};

const WorkPage: NextPage<WorkPageProps> = ({ work }: WorkPageProps) => {
  const router = useRouter();
  const sortedWorkClientsData = sortClientsWorkDataByDate(work.clients);
  // console.log(work);
  console.log(sortedWorkClientsData);

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
      <Box height={"10px"}></Box>
      <Box>
        <Heading fontSize="xl">{work.position}</Heading>
        <Text fontSize="sm">
          {formatDate(work.startDate)} -{" "}
          {work.endDate ? formatDate(work.endDate) : " Present"} ·{" "}
          {`${calculateElapsedTime(work)} Months`}
        </Text>
        <Text fontSize="sm">{work.location}</Text>
        <Box height={"20px"}></Box>
        <Heading fontSize="xl">{"Summary"}</Heading>
        <Box height={"10px"}></Box>
        <Text>{work.summary}</Text>
        {!isEmpty(work.commitments) && (
          <>
            <Box height={"20px"}></Box>
            <Heading fontSize="xl">{"Commitments"}</Heading>
            <Box height={"10px"}></Box>
            <List spacing={3}>
              {(work.commitments || []).map(
                (commitment: string, index: number) => (
                  <ListItem key={index}>
                    <ListIcon as={MdCheckCircle} color="teal" />
                    {commitment}
                  </ListItem>
                )
              )}
            </List>
          </>
        )}
        <Box height={"20px"}></Box>
        <Heading fontSize="xl">{"Projects"}</Heading>
        {(sortedWorkClientsData || []).map(
          (client: Client, clientIndex: number) => (
            <VStack
              key={clientIndex}
              divider={<StackDivider borderColor="teal.100" />}
              spacing={4}
              align="stretch"
            >
              {(client.projects || []).map(
                (project: Project, projectIndex: number) => (
                  <Box key={projectIndex}>
                    <Text
                      mt={1}
                    >{`${project.projectName} · ${client.clientName}`}</Text>
                    <Text fontSize="sm">
                      {formatDate(project.startDate)} -{" "}
                      {project.endDate
                        ? formatDate(project.endDate)
                        : " Present"}
                    </Text>
                    <Box height={"10px"}></Box>
                    <Box>
                      <List spacing={3}>
                        {(project.commitments || []).map(
                          (commitment: string, commitmentIndex: number) => (
                            <ListItem key={commitmentIndex}>
                              <ListIcon as={MdCheckCircle} color="teal" />
                              {commitment}
                            </ListItem>
                          )
                        )}
                      </List>
                    </Box>
                    <Box height={"10px"}></Box>
                    <Box>
                      <Text>Skills: </Text>
                      <HStack spacing={4}>
                        {(project.technologies || []).map(
                          (technology: string, technologyIndex: number) => (
                            <Tag
                              key={technologyIndex}
                              size={"md"}
                              variant="solid"
                              colorScheme="teal"
                            >
                              {technology}
                            </Tag>
                          )
                        )}
                      </HStack>
                    </Box>
                  </Box>
                )
              )}
            </VStack>
          )
        )}
      </Box>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths =
  async (): Promise<GetStaticPathsResult> => {
    const workPageProps = await firebase.db.collection("work").get();

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

  const workPageProps = await firebase.db
    .collection("work")
    .where("slug", "==", params!.id)
    .get();

  const [workData] = workPageProps.docs.map((doc) => {
    return formatFieldsDate(doc.data());
  });

  return { props: { work: JSON.parse(JSON.stringify(workData)) } };
};

export default WorkPage;
