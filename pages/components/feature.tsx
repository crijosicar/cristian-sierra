import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

interface WorkItemPage {
  title: string;
  desc: string;
}

const WorkItem = ({ title, desc }: WorkItemPage) => {
  const router = useRouter();

  return (
    <Box p={5}>
      <Heading
        as="a"
        color="teal.400"
        fontWeight="bold"
        fontSize="xl"
        onClick={() => router.push(`/work/${title.toLocaleLowerCase()}`)}
      >
        {title}
      </Heading>
      <Text mt={4}>{desc}</Text>
      <Link color="teal.400" href={`/work/${title.toLocaleLowerCase()}`}>
        More <ArrowForwardIcon />
      </Link>
    </Box>
  );
};

export default WorkItem;
