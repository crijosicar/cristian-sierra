import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Flex,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { MdCheckCircle } from "react-icons/md";
import { GetServerSidePropsResult } from "next/types";
import db from "../../utils/db";
import { Work } from "./[id]";
import { calculateElapsedTime, formatDate } from "../../utils/date";
import { DocumentData, Timestamp } from "@google-cloud/firestore";

type WorkPageProps = {
  workData: Work[];
};

const Index: NextPage<WorkPageProps> = ({ workData }: WorkPageProps) => {
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
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="teal.500">Work</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box height={"50px"}></Box>
      <Heading size="2xl" color="teal.500">
        Work
      </Heading>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {(workData || []).map((work: Work, index: number) => (
          <Flex p={5} key={index}>
            <Avatar
              name={work.companyName}
              size="xl"
              loading={"lazy"}
              src={work.companyIcon}
            />
            <Box ml="3">
              <Link
                fontSize="xl"
                as="a"
                href={`/work/${encodeURIComponent(work.slug)}`}
              >
                {work.position}
              </Link>
              <Text mt={1}>{`${work.companyName} · Full-time`}</Text>
              <Text fontSize="sm">
                {formatDate(work.startDate)} -{" "}
                {work.endDate ? formatDate(work.endDate) : " Present"} ·{" "}
                {`${calculateElapsedTime(work)} Months`}
              </Text>
              <Text fontSize="sm">{work.location}</Text>
              <Box height={"20px"}></Box>
              <List spacing={3}>
                {(work.commitments || []).map(
                  (commitment: string, index: number) => (
                    <ListItem key={index}>
                      <ListIcon as={MdCheckCircle} color="green.500" />
                      {commitment}
                    </ListItem>
                  )
                )}
              </List>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<WorkPageProps>
> => {
  const formatFieldsDate1 = (documentData: DocumentData) => {
    const data = documentData;
    Object.keys(documentData).forEach((key) => {
      if (data[key] instanceof Timestamp) {
        data[key] = data[key].toDate();
      } else if (typeof data[key] === "object") {
        formatFieldsDate1(data[key]);
      }
    });
    return data;
  };
  const workPageProps = await db.collection("work").orderBy("startDate").get();
  const workData = workPageProps.docs.map((doc) => {
    return formatFieldsDate1(doc.data());
  });

  return {
    props: {
      workData: JSON.parse(JSON.stringify(workData)),
    },
  };
};

export default Index;
