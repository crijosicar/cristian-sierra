import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface WorkItemPage {
  title: string;
  desc: string;
}

const WorkItem = ({ title, desc }: WorkItemPage) => {
  return (
    <Box p={5}>
      <Heading color="teal.400" fontWeight="bold" fontSize="xl">
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
