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
import moment from "moment";
import { Timestamp } from "@google-cloud/firestore";

type WorkPageProps = {
  workData: Work[];
};

export interface Work {
  id: string;
  clients: any[];
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

const Index: NextPage<WorkPageProps> = ({ workData }: WorkPageProps) => {
  const router = useRouter();

  const formatDate = (date: Date): string => {
    return moment(date).format("MMM yyyy");
  };

  const calculateElapsedTime = (work: Work): string => {
    const startDate = moment(work.startDate);
    const endDate = moment(work.endDate ? work.endDate : new Date());

    return moment.duration(endDate.diff(startDate)).asMonths().toFixed(0);
  };

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
                href={`/work/${encodeURIComponent(work.companyName)}`}
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
  const workPageProps = await db.collection("work").orderBy("startDate").get();
  const workData = workPageProps.docs.map((doc) => {
    const data = doc.data();
    Object.keys(doc.data())
      .filter((key) => data[key] instanceof Timestamp)
      .forEach((key) => (data[key] = data[key].toDate()));
    return data;
  });

  return {
    props: {
      workData: JSON.parse(JSON.stringify(workData)),
    },
  };
};

export default Index;
