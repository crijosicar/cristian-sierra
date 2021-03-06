import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Container,
  Heading,
  Link,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import WorkHome from "../components/workHome";
import { useRouter } from "next/router";
import GetResumeBtn from "../components/resume";
import ContactForm from "../components/contactForm";
import { GetServerSidePropsResult } from "next/types";
import firebase from "../utils/firebase";
import { About } from "./about";
import { orderBy } from "lodash";
import { DocumentData, Timestamp } from "@google-cloud/firestore";
import { Work } from "../entities/work";

type HomePageProps = {
  aboutData: About;
  workData: Work[];
};

const Home: NextPage<HomePageProps> = ({
  aboutData,
  workData,
}: HomePageProps) => {
  const router = useRouter();
  const direction = useBreakpointValue({
    base: "column" as any,
    md: "row" as any,
  });
  const sortedWorkData = orderBy(
    workData,
    ["endDate", "startDate"],
    ["desc", "desc"]
  );

  return (
    <Container maxW="container.md">
      <Head>
        <title>Cristian Sierra</title>
        <meta
          name="description"
          content="Cristian Sierra - Software Engineer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading size="4xl">
        Hi, I am{" "}
        <Link color="teal.500" onClick={() => router.push("/about")}>
          Cristian Sierra.
        </Link>
      </Heading>
      <Box height={"20px"}></Box>
      <Text fontSize="2xl" color={"gray.300"}>
        {aboutData.summary}{" "}
      </Text>
      <Box height={"50px"}></Box>
      <Heading size="2xl">
        <Link color="teal.500" onClick={() => router.push("work")}>
          Work
        </Link>
      </Heading>
      <Box height={"20px"}></Box>
      <Stack direction={direction}>
        {sortedWorkData.map((work: Work, index: number) => (
          <WorkHome key={index} work={work} />
        ))}
      </Stack>
      <Box height={"20px"}></Box>
      <GetResumeBtn />
      <Box height={"50px"}></Box>
      <Heading size="2xl">
        <Link color="teal.500" onClick={() => router.push("/contact")}>
          Get in Touch
        </Link>
      </Heading>
      <Box height={"20px"}></Box>
      <ContactForm />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}): Promise<GetServerSidePropsResult<HomePageProps>> => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
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
  const aboutPageProps = await firebase.db.collection("about").get();
  const [aboutData] = aboutPageProps.docs.map((doc) => doc.data());
  const workPageProps = await firebase.db.collection("work").limit(3).get();
  const workData = workPageProps.docs.map((doc) =>
    formatFieldsDate(doc.data())
  );

  return {
    props: {
      aboutData: JSON.parse(JSON.stringify(aboutData)),
      workData: JSON.parse(JSON.stringify(workData)),
    },
  };
};

export default Home;
