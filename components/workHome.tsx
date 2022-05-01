import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { Work } from "../pages/work/[slug]";

const WorkHome = ({ work }: { work: Work }) => {
  const router = useRouter();

  return (
    <Box p={5}>
      <Heading
        style={{ cursor: "pointer" }}
        color="teal.400"
        fontWeight="bold"
        fontSize="xl"
        onClick={() =>
          router.push(`/work/${encodeURIComponent(work.companyName)}`)
        }
      >
        {work.companyName}
      </Heading>
      <Text mt={4}>{work.summary}</Text>
      <Link
        color="teal.400"
        href={`/work/${encodeURIComponent(work.companyName)}`}
      >
        More <ArrowForwardIcon />
      </Link>
    </Box>
  );
};

export default WorkHome;
